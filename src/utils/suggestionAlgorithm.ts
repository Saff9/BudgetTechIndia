/**
 * Product Suggestion Algorithm
 * ========================================
 * Content-based filtering recommendation system for product suggestions
 * 
 * Key Features:
 * - Category matching
 * - Price range similarity
 * - Feature overlap analysis
 * - Rating-based recommendations
 * - Discount-based suggestions
 * - User behavior personalization
 */

import type { Product } from './interfaces';

// Weighting factors for different recommendation features
const WEIGHTS = {
  categoryMatch: 0.4,
  priceSimilarity: 0.2,
  featureOverlap: 0.2,
  ratingScore: 0.1,
  discountScore: 0.1
};

// Price range categories (in INR)
const PRICE_RANGES = {
  '0-500': { min: 0, max: 500 },
  '501-1000': { min: 501, max: 1000 },
  '1001-2000': { min: 1001, max: 2000 },
  '2001-3000': { min: 2001, max: 3000 },
  '3001-5000': { min: 3001, max: 5000 },
  '5000+': { min: 5001, max: Infinity }
};

/**
 * Get price range category for a product
 */
function getPriceRange(price: number): string {
  for (const [range, { min, max }] of Object.entries(PRICE_RANGES)) {
    if (price >= min && price <= max) {
      return range;
    }
  }
  return '5000+';
}

/**
 * Calculate category match score
 */
function calculateCategoryScore(product: Product, targetProduct: Product): number {
  return product.category === targetProduct.category ? 1 : 0;
}

/**
 * Calculate price similarity score
 */
function calculatePriceScore(product: Product, targetProduct: Product): number {
  const productRange = getPriceRange(product.price);
  const targetRange = getPriceRange(targetProduct.price);
  
  if (productRange === targetRange) {
    return 1;
  }
  
  // Calculate price proximity for adjacent ranges
  const productPrice = product.price;
  const targetPrice = targetProduct.price;
  const maxPrice = Math.max(productPrice, targetPrice);
  const minPrice = Math.min(productPrice, targetPrice);
  
  return Math.max(0, 1 - (maxPrice - minPrice) / maxPrice);
}

/**
 * Calculate feature overlap score
 */
function calculateFeatureScore(product: Product, targetProduct: Product): number {
  const productFeatures = new Set(Object.values(product.features));
  const targetFeatures = new Set(Object.values(targetProduct.features));
  
  const commonFeatures = Array.from(productFeatures).filter(feature => targetFeatures.has(feature));
  const totalFeatures = Math.max(productFeatures.size, targetFeatures.size);
  
  return totalFeatures > 0 ? commonFeatures.length / totalFeatures : 0;
}

/**
 * Calculate rating score
 */
function calculateRatingScore(product: Product): number {
  return product.rating / 5; // Normalize to 0-1 range
}

/**
 * Calculate discount score
 */
function calculateDiscountScore(product: Product): number {
  const discount = 1 - (product.price / product.mrp);
  return Math.min(discount, 1); // Cap at 100% discount
}

/**
 * Calculate affinity score based on user behavior
 */
function calculateBehaviorScore(product: Product, userBehavior: { viewed: string[]; clicked: string[]; purchased?: string[] }): number {
  let score = 1;
  
  // Boost score for products from brands the user has shown interest in
  const viewedProducts = userBehavior.viewed;
  const clickedProducts = userBehavior.clicked;
  const purchasedProducts = userBehavior.purchased || [];
  
  const allInteractions = [...new Set([...viewedProducts, ...clickedProducts, ...purchasedProducts])];
  
  if (allInteractions.length > 0) {
    // This would require access to product data for interacted items
    // For simplicity, we'll assume similar brands get a slight boost
    score = 1.1; // Slight boost for all products (can be enhanced with brand data)
  }
  
  return score;
}

/**
 * Calculate overall similarity score between two products
 */
function calculateSimilarityScore(
  product: Product, 
  targetProduct: Product, 
  userBehavior: { viewed: string[]; clicked: string[]; purchased?: string[] }
): number {
  const categoryScore = calculateCategoryScore(product, targetProduct) * WEIGHTS.categoryMatch;
  const priceScore = calculatePriceScore(product, targetProduct) * WEIGHTS.priceSimilarity;
  const featureScore = calculateFeatureScore(product, targetProduct) * WEIGHTS.featureOverlap;
  const ratingScore = calculateRatingScore(product) * WEIGHTS.ratingScore;
  const discountScore = calculateDiscountScore(product) * WEIGHTS.discountScore;
  
  const behaviorScore = calculateBehaviorScore(product, userBehavior);
  
  const totalScore = (categoryScore + priceScore + featureScore + ratingScore + discountScore) * behaviorScore;
  
  return totalScore;
}

/**
 * Get related products based on target product and user behavior
 */
export function getRelatedProducts(
  targetProduct: Product, 
  allProducts: Product[], 
  userBehavior: { viewed: string[]; clicked: string[]; purchased?: string[] },
  limit: number = 8
): Product[] {
  // Filter out the target product itself
  const otherProducts = allProducts.filter(product => product.id !== targetProduct.id && product.isActive);
  
  // Calculate similarity scores for all other products
  const productsWithScores = otherProducts.map(product => ({
    product,
    score: calculateSimilarityScore(product, targetProduct, userBehavior)
  }));
  
  // Sort products by score descending
  const sortedProducts = productsWithScores.sort((a, b) => b.score - a.score);
  
  // Return top N products
  return sortedProducts.slice(0, limit).map(item => item.product);
}

/**
 * Get personalized product recommendations based on user behavior
 */
export function getPersonalizedRecommendations(
  userBehavior: { viewed: string[]; clicked: string[]; purchased?: string[] },
  allProducts: Product[],
  limit: number = 8
): Product[] {
  const activeProducts = allProducts.filter(product => product.isActive);
  
  // If user has no behavior data, return popular products
  if (userBehavior.viewed.length === 0 && userBehavior.clicked.length === 0) {
    return getPopularProducts(activeProducts, limit);
  }
  
  // Calculate personalized scores for all products
  const productsWithScores = activeProducts.map(product => {
    let score = 0;
    
    // Boost products from categories of viewed/clicked products
    score += calculateBehaviorScore(product, userBehavior);
    
    // Boost highly rated products
    score += product.rating / 5;
    
    // Boost products with good discounts
    const discount = 1 - (product.price / product.mrp);
    score += discount * 0.5;
    
    return { product, score };
  });
  
  // Sort and filter
  return productsWithScores
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.product);
}

/**
 * Get popular products (highest rating and review count)
 */
export function getPopularProducts(products: Product[], limit: number = 8): Product[] {
  return [...products]
    .sort((a, b) => {
      const ratingWeight = 0.7;
      const reviewCountWeight = 0.3;
      
      const aScore = (a.rating * ratingWeight) + (Math.log10(a.reviewCount) * reviewCountWeight);
      const bScore = (b.rating * ratingWeight) + (Math.log10(b.reviewCount) * reviewCountWeight);
      
      return bScore - aScore;
    })
    .slice(0, limit);
}

/**
 * Get trending products (newest and most reviewed)
 */
export function getTrendingProducts(products: Product[], limit: number = 8): Product[] {
  return [...products]
    .sort((a, b) => {
      const dateWeight = 0.6;
      const reviewCountWeight = 0.4;
      
      const dateScore = new Date(a.lastUpdated || a.createdAt || 0).getTime() - new Date(b.lastUpdated || b.createdAt || 0).getTime();
      const reviewScore = Math.log10(a.reviewCount) - Math.log10(b.reviewCount);
      
      return (dateScore * dateWeight) + (reviewScore * reviewCountWeight);
    })
    .slice(0, limit);
}

/**
 * Get products with best deals (highest discount)
 */
export function getBestDeals(products: Product[], limit: number = 8): Product[] {
  return [...products]
    .sort((a, b) => {
      const aDiscount = 1 - (a.price / a.mrp);
      const bDiscount = 1 - (b.price / b.mrp);
      
      return bDiscount - aDiscount;
    })
    .slice(0, limit);
}
