import type { APIRoute } from 'astro';
import { getAllNeonProducts, purgeExpiredProducts } from '../../../utils/neondb';
import { verifyWebhookPassword } from '../../../utils/webhookAuth';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  return handleList(request);
};

export const POST: APIRoute = async ({ request }) => {
  return handleList(request);
};

async function handleList(request: Request) {
  try {
    let bodyData: any = null;
    if (request.method === 'POST') {
      try {
        bodyData = await request.json();
      } catch (e) {
        bodyData = null;
      }
    }

    // Verify Password Authentication
    if (!verifyWebhookPassword(request, bodyData)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Unauthorized: Invalid or missing webhook password.' 
        }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Automatically purge expired items older than 7 days
    const purgedCount = await purgeExpiredProducts();
    const products = await getAllNeonProducts();

    return new Response(
      JSON.stringify({
        success: true,
        count: products.length,
        purgedCount,
        products,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message || 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
