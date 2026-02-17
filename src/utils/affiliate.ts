/**
 * Affiliate Link Management System
 * Centralized system for managing and tracking affiliate links
 * 
 * @module utils/affiliate
 * @version 1.0.0
 */

import affiliateData from '../data/affiliate-links.json';

// Types for the affiliate system
export type StoreType = 'amazon' | 'flipkart';

export interface AffiliateLink {
  url: string;
  asin?: string;
  productId?: string;
  inStock?: boolean;
}

/**
 * Validate an affiliate link
 * @param url - Affiliate URL to validate
 * @param store - Target store type
 * @returns Object with validation results
 */
export function validateAffiliateLink(url: string, store: StoreType): {
  isValid: boolean;
  error?: string;
  productId?: string;
  asin?: string;
} {
  try {
    // Validate URL format
    const urlObj = new URL(url);
    
    if (store === 'amazon') {
      // Amazon URL validation
      const isAmazon = urlObj.hostname.includes('amazon') || urlObj.hostname.includes('amzn');
      if (!isAmazon) {
        return {
          isValid: false,
          error: 'Not a valid Amazon URL',
        };
      }
      
      // Extract ASIN from URL
      // Amazon URLs can have formats like:
      // - https://www.amazon.in/dp/B07H5R1L1X
      // - https://www.amazon.in/Product-Name/dp/B07H5R1L1X
      // - https://amzn.in/d/B07H5R1L1X
      
      const dpMatch = urlObj.pathname.match(/\/dp\/([A-Z0-9]{10})/);
      const asinMatch = urlObj.pathname.match(/\/[A-Z0-9]{10}/);
      
      const asin = dpMatch ? dpMatch[1] : (asinMatch ? asinMatch[0].replace('/', '') : null);
      
      if (!asin) {
        return {
          isValid: false,
          error: 'Could not extract ASIN from Amazon URL',
        };
      }
      
      return {
        isValid: true,
        asin,
      };
      
    } else if (store === 'flipkart') {
      // Flipkart URL validation
      const isFlipkart = urlObj.hostname.includes('flipkart');
      if (!isFlipkart) {
        return {
          isValid: false,
          error: 'Not a valid Flipkart URL',
        };
      }
      
      // Extract product ID from Flipkart URL
      // Flipkart URLs can have formats like:
      // - https://www.flipkart.com/product/p/abc123
      // - https://www.flipkart.com/.../p/abc123?param=value
      
      const productMatch = urlObj.pathname.match(/\/p\/([\w-]+)/);
      
      if (!productMatch) {
        return {
          isValid: false,
          error: 'Could not extract product ID from Flipkart URL',
        };
      }
      
      return {
        isValid: true,
        productId: productMatch[1],
      };
    }
    
    return {
      isValid: false,
      error: 'Unsupported store type',
    };
    
  } catch (error) {
    return {
      isValid: false,
      error: 'Invalid URL format',
    };
  }
}

/**
 * Extract product details from affiliate link
 * @param url - Affiliate URL to extract details from
 * @param store - Target store type
 * @returns Object with extracted product details
 */
export async function extractProductDetails(url: string, store: StoreType): Promise<{
  success: boolean;
  data?: {
    title: string;
    price: number;
    mrp: number;
    image: string;
    rating: number;
    reviewCount: number;
    brand?: string;
    category?: string;
    features?: Record<string, string>;
  };
  error?: string;
}> {
  try {
    // Validate URL first
    const validation = validateAffiliateLink(url, store);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.error,
      };
    }
    
    // In a real application, this would make an API call to the store's product information API
    // For now, we'll return mock data
    return {
      success: true,
      data: {
        title: 'Sample Product',
        price: 999,
        mrp: 1499,
        image: '/images/placeholder-product.jpg',
        rating: 4.2,
        reviewCount: 12500,
        brand: 'Sample Brand',
        category: 'bluetooth-earbuds',
        features: {
          'Battery Life': '8 hours',
          'Connectivity': 'Bluetooth 5.0',
          'Driver Size': '10mm',
          'Microphone': 'Yes',
        },
      },
    };
    
  } catch (error) {
    console.error('[Affiliate] Error extracting product details:', error);
    return {
      success: false,
      error: 'Could not extract product details',
    };
  }
}

export interface ProductAffiliateData {
  title: string;
  price: number;
  mrp: number;
  currency: string;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  links: Record<StoreType, AffiliateLink>;
  features: Record<string, string>;
  pros: string[];
  cons: string[];
  isActive: boolean;
  lastUpdated: string;
}

export interface AffiliateConfig {
  defaultStore: StoreType;
  trackClicks: boolean;
  fallbackImage: string;
}

// Default configuration
const defaultConfig: AffiliateConfig = {
  defaultStore: 'amazon',
  trackClicks: true,
  fallbackImage: '/images/placeholder-product.jpg',
};

/**
 * Get all products from the affiliate data
 * @returns Record of product slug to product data
 */
export function getAllProducts(): Record<string, ProductAffiliateData> {
  return affiliateData.products as Record<string, ProductAffiliateData>;
}

/**
 * Get a specific product by slug
 * @param slug - Product slug/identifier
 * @returns Product data or null if not found
 */
export function getProductBySlug(slug: string): ProductAffiliateData | null {
  const products = getAllProducts();
  return products[slug] || null;
}

/**
 * Get affiliate link for a product from a specific store
 * @param slug - Product slug/identifier
 * @param store - Store type (amazon or flipkart)
 * @returns Affiliate URL or fallback
 */
export function getAffiliateLink(slug: string, store: StoreType = 'amazon'): string {
  const product = getProductBySlug(slug);
  
  if (!product) {
    console.warn(`[Affiliate] Product not found: ${slug}`);
    return '#';
  }
  
  const link = product.links[store];
  
  if (!link || !link.url) {
    console.warn(`[Affiliate] No ${store} link found for product: ${slug}`);
    // Fallback to other store
    const fallbackStore = store === 'amazon' ? 'flipkart' : 'amazon';
    const fallbackLink = product.links[fallbackStore];
    return fallbackLink?.url || '#';
  }
  
  return link.url;
}

/**
 * Get the primary affiliate link (Amazon by default)
 * @param slug - Product slug/identifier
 * @returns Primary affiliate URL
 */
export function getPrimaryAffiliateLink(slug: string): string {
  return getAffiliateLink(slug, defaultConfig.defaultStore);
}

/**
 * Get all available affiliate links for a product
 * @param slug - Product slug/identifier
 * @returns Object with all store links
 */
export function getAllAffiliateLinks(slug: string): Record<StoreType, string> {
  const product = getProductBySlug(slug);
  
  if (!product) {
    return { amazon: '#', flipkart: '#' };
  }
  
  return {
    amazon: product.links.amazon?.url || '#',
    flipkart: product.links.flipkart?.url || '#',
  };
}

/**
 * Check if a product is in stock at a specific store
 * @param slug - Product slug/identifier
 * @param store - Store type
 * @returns Boolean indicating stock status
 */
export function isInStock(slug: string, store: StoreType = 'amazon'): boolean {
  const product = getProductBySlug(slug);
  
  if (!product || !product.links[store]) {
    return false;
  }
  
  return product.links[store].inStock !== false;
}

/**
 * Get product price information
 * @param slug - Product slug/identifier
 * @returns Price information object
 */
export function getProductPrice(slug: string): {
  price: number;
  mrp: number;
  discount: number;
  savings: number;
  currency: string;
} | null {
  const product = getProductBySlug(slug);
  
  if (!product) {
    return null;
  }
  
  const discount = product.mrp > product.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;
  
  const savings = product.mrp > product.price 
    ? product.mrp - product.price
    : 0;
  
  return {
    price: product.price,
    mrp: product.mrp,
    discount,
    savings,
    currency: product.currency,
  };
}

/**
 * Generate an Amazon affiliate URL from ASIN
 * @param asin - Amazon ASIN
 * @param affiliateTag - Optional custom affiliate tag
 * @returns Complete Amazon affiliate URL
 */
export function generateAmazonUrl(asin: string, affiliateTag?: string): string {
  const tag = affiliateTag || affiliateData.defaultAffiliateTag;
  return `https://www.amazon.in/dp/${asin}?tag=${tag}`;
}

/**
 * Generate a Flipkart affiliate URL from product ID
 * @param productId - Flipkart product ID
 * @param affiliateId - Optional custom affiliate ID
 * @returns Complete Flipkart affiliate URL
 */
export function generateFlipkartUrl(productId: string, affiliateId?: string): string {
  const affId = affiliateId || 'budgettech';
  return `https://www.flipkart.com/product/p/${productId}?affid=${affId}`;
}

/**
 * Track affiliate link click (for analytics)
 * In production, this would send data to an analytics service
 * @param slug - Product slug
 * @param store - Store type
 * @param url - The affiliate URL clicked
 */
export function trackAffiliateClick(slug: string, store: StoreType, url: string): void {
  if (typeof window === 'undefined') return;
  
  // Log click event (in production, send to analytics)
  const clickEvent = {
    type: 'affiliate_click',
    product: slug,
    store,
    url,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    referrer: document.referrer,
  };
  
  // Store in localStorage for basic tracking
  try {
    const clicks = JSON.parse(localStorage.getItem('affiliate_clicks') || '[]');
    clicks.push(clickEvent);
    // Keep only last 100 clicks
    if (clicks.length > 100) clicks.shift();
    localStorage.setItem('affiliate_clicks', JSON.stringify(clicks));
  } catch (e) {
    console.warn('[Affiliate] Could not store click data:', e);
  }
  
  // Log to console in development
  if (import.meta.env?.DEV) {
    console.log('[Affiliate Click]', clickEvent);
  }
}

/**
 * Create a tracked affiliate link that logs clicks
 * @param slug - Product slug
 * @param store - Store type
 * @returns Object with URL and click handler
 */
export function createTrackedLink(slug: string, store: StoreType = 'amazon'): {
  url: string;
  onClick: () => void;
  store: StoreType;
} {
  const url = getAffiliateLink(slug, store);
  
  return {
    url,
    store,
    onClick: () => trackAffiliateClick(slug, store, url),
  };
}

/**
 * Get products by category
 * @param category - Category slug
 * @returns Array of products in the category
 */
export function getProductsByCategory(category: string): ProductAffiliateData[] {
  const products = getAllProducts();
  return Object.entries(products)
    .filter(([_, product]) => product.category === category && product.isActive)
    .map(([slug, product]) => ({ slug, ...product }));
}

/**
 * Get products by brand
 * @param brand - Brand name
 * @returns Array of products from the brand
 */
export function getProductsByBrand(brand: string): ProductAffiliateData[] {
  const products = getAllProducts();
  return Object.entries(products)
    .filter(([_, product]) => product.brand.toLowerCase() === brand.toLowerCase() && product.isActive)
    .map(([slug, product]) => ({ slug, ...product }));
}

/**
 * Get top-rated products
 * @param limit - Maximum number of products to return
 * @returns Array of top-rated products
 */
export function getTopRatedProducts(limit: number = 10): (ProductAffiliateData & { slug: string })[] {
  const products = getAllProducts();
  return Object.entries(products)
    .filter(([_, product]) => product.isActive)
    .sort(([_, a], [__, b]) => b.rating - a.rating)
    .slice(0, limit)
    .map(([slug, product]) => ({ slug, ...product }));
}

/**
 * Get products with best discounts
 * @param limit - Maximum number of products to return
 * @returns Array of products with highest discounts
 */
export function getBestDeals(limit: number = 10): (ProductAffiliateData & { slug: string; discountPercent: number })[] {
  const products = getAllProducts();
  return Object.entries(products)
    .filter(([_, product]) => product.isActive && product.mrp > product.price)
    .map(([slug, product]) => ({
      slug,
      ...product,
      discountPercent: Math.round(((product.mrp - product.price) / product.mrp) * 100),
    }))
    .sort((a, b) => b.discountPercent - a.discountPercent)
    .slice(0, limit);
}

/**
 * Search products by name or features
 * @param query - Search query
 * @returns Array of matching products
 */
export function searchProducts(query: string): (ProductAffiliateData & { slug: string })[] {
  const products = getAllProducts();
  const searchTerms = query.toLowerCase().split(' ');
  
  return Object.entries(products)
    .filter(([_, product]) => {
      if (!product.isActive) return false;
      
      const searchText = [
        product.title,
        product.brand,
        product.category,
        ...Object.values(product.features),
      ].join(' ').toLowerCase();
      
      return searchTerms.every(term => searchText.includes(term));
    })
    .map(([slug, product]) => ({ slug, ...product }));
}

/**
 * Get product image with fallback
 * @param slug - Product slug
 * @returns Image URL or fallback
 */
export function getProductImage(slug: string): string {
  const product = getProductBySlug(slug);
  return product?.image || defaultConfig.fallbackImage;
}

/**
 * Format price for display
 * @param price - Price in INR
 * @returns Formatted price string
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Get store information
 * @param store - Store type
 * @returns Store information object
 */
export function getStoreInfo(store: StoreType): {
  name: string;
  baseUrl: string;
  affiliateParam: string;
} {
  return affiliateData.stores[store];
}

// Export the affiliate data for direct access if needed
export { affiliateData };
