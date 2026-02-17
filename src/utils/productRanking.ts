/**
 * Product Ranking and Sorting
 * ========================================
 * Comprehensive product sorting and ranking logic
 * 
 * Sorting Options:
 * - Newest products first (default)
 * - Price: low to high, high to low
 * - Ratings: highest rated first
 * - Popularity: most viewed/clicked
 * - Deals: highest discount first
 */

import type { Product } from './interfaces';

/**
 * Sort types available for product listings
 */
export type SortType = 'newest' | 'price-low' | 'price-high' | 'rating' | 'popularity' | 'deals';

/**
 * Sort option interface for UI components
 */
export interface SortOption {
  value: SortType;
  label: string;
  direction: 'asc' | 'desc';
}

/**
 * Available sorting options for product grids
 */
export const SORT_OPTIONS: SortOption[] = [
  { value: 'newest', label: 'Newest First', direction: 'desc' },
  { value: 'price-low', label: 'Price: Low to High', direction: 'asc' },
  { value: 'price-high', label: 'Price: High to Low', direction: 'desc' },
  { value: 'rating', label: 'Highest Rated', direction: 'desc' },
  { value: 'popularity', label: 'Most Popular', direction: 'desc' },
  { value: 'deals', label: 'Best Deals', direction: 'desc' }
];

/**
 * Sort products based on the specified sort type
 */
export function sortProducts(products: Product[], sortType: SortType = 'newest'): Product[] {
  const sortedProducts = [...products];
  
  switch (sortType) {
    case 'newest':
      return sortedProducts.sort((a, b) => 
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      );
      
    case 'price-low':
      return sortedProducts.sort((a, b) => a.price - b.price);
      
    case 'price-high':
      return sortedProducts.sort((a, b) => b.price - a.price);
      
    case 'rating':
      return sortedProducts.sort((a, b) => {
        // Combine rating and review count for more accurate ranking
        const aScore = (a.rating * 0.7) + (Math.log10(a.reviewCount) * 0.3);
        const bScore = (b.rating * 0.7) + (Math.log10(b.reviewCount) * 0.3);
        return bScore - aScore;
      });
      
    case 'popularity':
      return sortedProducts.sort((a, b) => {
        // Popularity based on review count and rating
        const aScore = (Math.log10(a.reviewCount) * 0.6) + (a.rating * 0.4);
        const bScore = (Math.log10(b.reviewCount) * 0.6) + (b.rating * 0.4);
        return bScore - aScore;
      });
      
    case 'deals':
      return sortedProducts.sort((a, b) => {
        const aDiscount = 1 - (a.price / a.mrp);
        const bDiscount = 1 - (b.price / b.mrp);
        
        // Combine discount with rating for better deals
        const aScore = (aDiscount * 0.8) + (a.rating / 5 * 0.2);
        const bScore = (bDiscount * 0.8) + (b.rating / 5 * 0.2);
        
        return bScore - aScore;
      });
      
    default:
      return sortedProducts;
  }
}

/**
 * Get products with highest discounts (best deals)
 */
export function getBestDeals(products: Product[], limit: number = 8): Product[] {
  return sortProducts(products, 'deals').slice(0, limit);
}

/**
 * Get newest products
 */
export function getNewestProducts(products: Product[], limit: number = 8): Product[] {
  return sortProducts(products, 'newest').slice(0, limit);
}

/**
 * Get top rated products
 */
export function getTopRatedProducts(products: Product[], limit: number = 8): Product[] {
  return sortProducts(products, 'rating').slice(0, limit);
}

/**
 * Get most popular products
 */
export function getMostPopularProducts(products: Product[], limit: number = 8): Product[] {
  return sortProducts(products, 'popularity').slice(0, limit);
}

/**
 * Filter products by price range
 */
export function filterByPriceRange(products: Product[], minPrice: number, maxPrice: number): Product[] {
  return products.filter(product => product.price >= minPrice && product.price <= maxPrice);
}

/**
 * Filter products by category
 */
export function filterByCategory(products: Product[], category: string): Product[] {
  return products.filter(product => product.category === category);
}

/**
 * Filter products by brand
 */
export function filterByBrand(products: Product[], brand: string): Product[] {
  return products.filter(product => product.brand.toLowerCase() === brand.toLowerCase());
}

/**
 * Search products by name, brand, or features
 */
export function searchProducts(products: Product[], searchTerm: string): Product[] {
  if (!searchTerm) return products;
  
  const term = searchTerm.toLowerCase();
  
  return products.filter(product => 
    product.name.toLowerCase().includes(term) ||
    product.brand.toLowerCase().includes(term) ||
    Object.values(product.features).some(feature => 
      feature.toLowerCase().includes(term)
    )
  );
}

/**
 * Calculate price range from products
 */
export function getPriceRange(products: Product[]): { min: number; max: number } {
  if (products.length === 0) return { min: 0, max: 0 };
  
  const prices = products.map(product => product.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
}

/**
 * Get unique brands from products
 */
export function getUniqueBrands(products: Product[]): string[] {
  const brands = new Set(products.map(product => product.brand));
  return Array.from(brands).sort();
}

/**
 * Get unique categories from products
 */
export function getUniqueCategories(products: Product[]): string[] {
  const categories = new Set(products.map(product => product.category));
  return Array.from(categories).sort();
}

/**
 * Paginate products
 */
export function paginateProducts(products: Product[], page: number, perPage: number = 12): Product[] {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  return products.slice(startIndex, endIndex);
}
