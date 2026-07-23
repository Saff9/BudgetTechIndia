import type { APIRoute } from 'astro';
import { deleteNeonProduct, purgeExpiredProducts } from '../../../utils/neondb';
import { verifyWebhookPassword } from '../../../utils/webhookAuth';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  return handleDelete(request);
};

export const DELETE: APIRoute = async ({ request }) => {
  return handleDelete(request);
};

async function handleDelete(request: Request) {
  try {
    let bodyData: any = {};
    try {
      bodyData = await request.json();
    } catch (e) {
      bodyData = {};
    }

    if (!verifyWebhookPassword(request, bodyData)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Unauthorized: Invalid or missing webhook password.' 
        }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const url = new URL(request.url);
    const id = bodyData.id || bodyData.slug || url.searchParams.get('id') || url.searchParams.get('slug');
    const action = bodyData.action || url.searchParams.get('action');

    if (action === 'purge' || !id) {
      const purgedCount = await purgeExpiredProducts();
      return new Response(
        JSON.stringify({
          success: true,
          message: `Purge completed. Expired products older than 7 days deleted.`,
          purgedCount,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const deleted = await deleteNeonProduct(id);
    if (!deleted) {
      return new Response(
        JSON.stringify({ success: false, error: `Failed to delete product with ID/slug: ${id}` }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Product ${id} deleted successfully from Neon DB.`,
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
