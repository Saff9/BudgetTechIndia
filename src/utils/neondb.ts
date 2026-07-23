/**
 * Neon DB Storage Service (PostgreSQL)
 * Integration for BudgetTechIndia using @neondatabase/serverless
 * Features:
 * - Ultra-fast in-memory TTL cache (prevents duplicate DB roundtrips)
 * - Direct HTTP serverless querying
 * - Automatic table initialization
 * - Automatic 7-day data retention & auto-expiry purge
 */

import { neon } from '@neondatabase/serverless';
import type { Product } from './interfaces';

export function getNeonSql() {
  const connectionString = import.meta.env.NEON_DATABASE_URL || process.env.NEON_DATABASE_URL;
  if (!connectionString) {
    throw new Error('[NeonDB Error] NEON_DATABASE_URL environment variable is not defined. Please set NEON_DATABASE_URL in your .env file.');
  }
  return neon(connectionString);
}

let isInitialized = false;

// Ultra-fast In-Memory Cache (TTL: 60 seconds)
let cachedProducts: Product[] | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 60 seconds

export function clearNeonCache() {
  cachedProducts = null;
  lastCacheTime = 0;
}

/**
 * Initialize PostgreSQL table for products with created_at & expires_at columns
 */
export async function initNeonDB(): Promise<boolean> {
  if (isInitialized) return true;
  try {
    const sql = getNeonSql();
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(255) PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        name TEXT NOT NULL,
        brand VARCHAR(255),
        category VARCHAR(255) NOT NULL,
        price NUMERIC NOT NULL,
        mrp NUMERIC,
        affiliate_url TEXT NOT NULL,
        image_url TEXT,
        description TEXT,
        rating NUMERIC DEFAULT 4.5,
        review_count INTEGER DEFAULT 1,
        in_stock BOOLEAN DEFAULT true,
        is_active BOOLEAN DEFAULT true,
        features JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP + INTERVAL '7 days')
      );
    `;
    isInitialized = true;
    console.log('[NeonDB] Table initialized successfully');
    return true;
  } catch (error) {
    console.error('[NeonDB] Error initializing database:', error);
    return false;
  }
}

/**
 * Automatically purge products older than 7 days or past expires_at date
 */
export async function purgeExpiredProducts(): Promise<number> {
  try {
    await initNeonDB();
    const sql = getNeonSql();
    const result = await sql`
      DELETE FROM products 
      WHERE created_at < (NOW() - INTERVAL '7 days') 
         OR expires_at < NOW();
    `;
    clearNeonCache();
    console.log('[NeonDB] Purged expired products');
    return result.length || 0;
  } catch (error) {
    console.error('[NeonDB] Error purging expired products:', error);
    return 0;
  }
}

/**
 * Get all active and non-expired products (Cached in-memory for lightning speed)
 */
export async function getAllNeonProducts(forceRefresh = false): Promise<Product[]> {
  const now = Date.now();
  if (!forceRefresh && cachedProducts && (now - lastCacheTime < CACHE_TTL_MS)) {
    return cachedProducts;
  }

  try {
    await purgeExpiredProducts();
    const sql = getNeonSql();
    const rows = await sql`
      SELECT * FROM products 
      WHERE is_active = true 
        AND created_at >= (NOW() - INTERVAL '7 days')
        AND (expires_at IS NULL OR expires_at >= NOW())
      ORDER BY created_at DESC;
    `;
    cachedProducts = rows.map(mapRowToProduct);
    lastCacheTime = now;
    return cachedProducts;
  } catch (error) {
    console.error('[NeonDB] Error getting products:', error);
    return cachedProducts || [];
  }
}

/**
 * Get single product by slug or id
 */
export async function getNeonProductBySlug(slugOrId: string): Promise<Product | null> {
  const products = await getAllNeonProducts();
  const match = products.find((p) => p.slug === slugOrId || p.id === slugOrId);
  if (match) return match;

  try {
    const sql = getNeonSql();
    const rows = await sql`
      SELECT * FROM products 
      WHERE (slug = ${slugOrId} OR id = ${slugOrId})
        AND is_active = true 
        AND created_at >= (NOW() - INTERVAL '7 days')
      LIMIT 1;
    `;
    if (rows.length > 0) {
      return mapRowToProduct(rows[0]);
    }
  } catch (error) {
    console.error('[NeonDB] Error fetching product by slug:', error);
  }
  return null;
}

/**
 * Add or update product in Neon DB with auto 7-day retention
 */
export async function addNeonProduct(productData: Partial<Product>, retentionDays = 7): Promise<Product | null> {
  try {
    await initNeonDB();
    const sql = getNeonSql();

    const slug = productData.slug || (productData.name ? productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : `product-${Date.now()}`);
    const id = productData.id || slug;
    const name = productData.name || 'Budget Tech Deal';
    const brand = productData.brand || 'Generic';
    const category = productData.category || 'budget-gadgets-under-999';
    const price = productData.price || 999;
    const mrp = productData.mrp || price * 1.5;
    const affiliateUrl = productData.affiliateUrl || productData.affiliate_url || `https://www.amazon.in/dp/${slug}?tag=budgettechpro-21`;
    const imageUrl = productData.imageUrl || productData.image_url || 'https://m.media-amazon.com/images/I/61K-84k5wEL._SL1500_.jpg';
    const description = productData.description || 'Awesome budget tech product with high rating.';
    const rating = productData.rating || 4.5;
    const reviewCount = productData.reviewCount || productData.review_count || 100;
    const features = JSON.stringify(productData.features || {});

    const rows = await sql`
      INSERT INTO products (
        id, slug, name, brand, category, price, mrp, affiliate_url, image_url, description, rating, review_count, in_stock, is_active, features, created_at, expires_at
      ) VALUES (
        ${id}, ${slug}, ${name}, ${brand}, ${category}, ${price}, ${mrp}, ${affiliateUrl}, ${imageUrl}, ${description}, ${rating}, ${reviewCount}, true, true, ${features}::jsonb, NOW(), NOW() + (${retentionDays} || ' days')::INTERVAL
      )
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        price = EXCLUDED.price,
        mrp = EXCLUDED.mrp,
        affiliate_url = EXCLUDED.affiliate_url,
        image_url = EXCLUDED.image_url,
        description = EXCLUDED.description,
        expires_at = NOW() + (${retentionDays} || ' days')::INTERVAL
      RETURNING *;
    `;

    clearNeonCache();
    if (rows.length > 0) {
      return mapRowToProduct(rows[0]);
    }
  } catch (error) {
    console.error('[NeonDB] Error adding product:', error);
  }
  return null;
}

/**
 * Delete product from Neon DB
 */
export async function deleteNeonProduct(idOrSlug: string): Promise<boolean> {
  try {
    await initNeonDB();
    const sql = getNeonSql();
    await sql`
      DELETE FROM products WHERE id = ${idOrSlug} OR slug = ${idOrSlug};
    `;
    clearNeonCache();
    return true;
  } catch (error) {
    console.error('[NeonDB] Error deleting product:', error);
    return false;
  }
}

function mapRowToProduct(row: any): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.brand || '',
    category: row.category,
    price: Number(row.price),
    mrp: Number(row.mrp || row.price),
    affiliateUrl: row.affiliate_url,
    imageUrl: row.image_url || '',
    description: row.description || '',
    rating: Number(row.rating || 4.5),
    reviewCount: Number(row.review_count || 0),
    inStock: Boolean(row.in_stock),
    isActive: Boolean(row.is_active),
    features: typeof row.features === 'string' ? JSON.parse(row.features) : (row.features || {}),
    createdAt: row.created_at,
    expiresAt: row.expires_at,
  };
}
