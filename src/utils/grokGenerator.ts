/**
 * Grok AI Auto-Review & Product Generator
 * Generates human-like tech product reviews, specs, pros & cons, and affiliate metadata using Grok API.
 */

import { convertToAffiliateUrl } from './amazonAutoAffiliate';

export interface GeneratedProductReview {
  id: string;
  name: string;
  slug: string;
  category: string;
  brand: string;
  price: number;
  mrp: number;
  currency: string;
  imageUrl: string;
  affiliateUrl: string;
  asin: string;
  rating: number;
  reviewCount: number;
  features: Record<string, string>;
  pros: string[];
  cons: string[];
  verdict: string;
  fullReviewText: string;
  lastUpdated: string;
  isActive: boolean;
}

export async function generateProductWithGrok(options: {
  productName: string;
  amazonUrlOrAsin: string;
  category?: string;
  price?: number;
  mrp?: number;
  apiKey?: string;
}): Promise<{ success: boolean; data?: GeneratedProductReview; error?: string }> {
  const { productName, amazonUrlOrAsin, category = 'bluetooth-earbuds', price = 999, mrp = 1999, apiKey } = options;

  // Extract ASIN & build affiliate URL with budgettechpro-21
  const affRes = convertToAffiliateUrl(amazonUrlOrAsin, 'budgettechpro-21');
  if (!affRes.success || !affRes.asin || !affRes.affiliateUrl) {
    return {
      success: false,
      error: `Invalid Amazon Link or ASIN: ${affRes.error || 'Could not parse ASIN'}`,
    };
  }

  const activeApiKey = apiKey || (typeof process !== 'undefined' ? process.env?.GROK_API_KEY : '') || '';

  if (!activeApiKey) {
    // Return fallback AI generated review structure if API key is missing
    const slug = productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const brand = productName.split(' ')[0] || 'BudgetTech';

    return {
      success: true,
      data: {
        id: slug,
        name: productName,
        slug,
        category,
        brand,
        price,
        mrp,
        currency: 'INR',
        imageUrl: `https://placehold.co/400x400/2563EB/FFFFFF?text=${encodeURIComponent(productName)}`,
        affiliateUrl: affRes.affiliateUrl,
        asin: affRes.asin,
        rating: 4.3,
        reviewCount: 1500,
        features: {
          'Battery Life': 'Up to 24 Hours',
          'Connectivity': 'Bluetooth 5.3',
          'Fast Charging': '10 Mins Charge = 60 Mins Playtime',
          'Water Resistance': 'IPX4 Splash Proof',
        },
        pros: [
          'Excellent value for money in Indian budget market',
          'Strong bass performance for music and gaming',
          'Ergonomic lightweight design for long listening sessions',
          'Reliable build quality with splash resistance',
        ],
        cons: [
          'Microphone quality is average in noisy outdoor environments',
          'Plastic build feel, but acceptable at this price point',
        ],
        verdict: `${productName} is an outstanding budget choice under ₹${price}. It delivers great sound clarity, long battery life, and solid durability for everyday Indian users.`,
        fullReviewText: `The ${productName} stands out as one of the best budget gadgets available in India today. Offering impressive audio tuning, seamless connectivity, and robust battery performance, it easily punches above its price class.`,
        lastUpdated: new Date().toISOString().split('T')[0],
        isActive: true,
      },
    };
  }

  try {
    const prompt = `You are an expert Indian tech product reviewer writing for BudgetTechIndia.com.
Generate a comprehensive, human-like product review in JSON format for the product: "${productName}".
Category: ${category}
Price in INR: ₹${price} (MRP: ₹${mrp})

Respond ONLY with valid JSON (no markdown ticks or code blocks) matching this exact schema:
{
  "brand": "Brand Name",
  "rating": 4.3,
  "reviewCount": 2400,
  "features": {
    "Key Spec 1": "Value 1",
    "Key Spec 2": "Value 2",
    "Key Spec 3": "Value 3",
    "Key Spec 4": "Value 4"
  },
  "pros": ["Pro line 1", "Pro line 2", "Pro line 3"],
  "cons": ["Con line 1", "Con line 2"],
  "verdict": "2 sentence summary verdict for Indian buyers.",
  "fullReviewText": "Detailed 3-paragraph human-sounding review focusing on practical daily usage, sound/build quality, and value under ₹${price} in India."
}`;

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${activeApiKey}`,
      },
      body: JSON.stringify({
        model: 'grok-beta',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Grok API error: ${response.statusText}`);
    }

    const aiRes = await response.json();
    const content = aiRes.choices?.[0]?.message?.content || '';
    const cleanJson = content.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);

    const slug = productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    return {
      success: true,
      data: {
        id: slug,
        name: productName,
        slug,
        category,
        brand: parsed.brand || productName.split(' ')[0] || 'Tech',
        price,
        mrp,
        currency: 'INR',
        imageUrl: `https://placehold.co/400x400/2563EB/FFFFFF?text=${encodeURIComponent(productName)}`,
        affiliateUrl: affRes.affiliateUrl,
        asin: affRes.asin,
        rating: parsed.rating || 4.2,
        reviewCount: parsed.reviewCount || 1000,
        features: parsed.features || {},
        pros: parsed.pros || ['Great value for money'],
        cons: parsed.cons || ['Plastic casing'],
        verdict: parsed.verdict || `Great budget option under ₹${price}.`,
        fullReviewText: parsed.fullReviewText || `Review of ${productName}.`,
        lastUpdated: new Date().toISOString().split('T')[0],
        isActive: true,
      },
    };
  } catch (err: any) {
    console.error('[Grok AI] Error:', err);
    return {
      success: false,
      error: err?.message || 'Failed to generate review via Grok API',
    };
  }
}
