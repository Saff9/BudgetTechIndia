/**
 * Analytics and Event Tracking
 * ========================================
 * Helper functions for tracking user interactions and events
 * 
 * Tracks:
 * - Page views
 * - Product interactions
 * - Search events
 * - Filter usage
 * - Sorting behavior
 */

import { trackProductView, trackProductClick, trackProductPurchase } from './userBehavior';

// Analytics configuration
const ANALYTICS_ENABLED = import.meta.env.PROD;

/**
 * Track page view
 */
export function trackPageView(pageName: string, url: string): void {
  if (!ANALYTICS_ENABLED) return;
  
  console.log('[Analytics] Page View:', {
    pageName,
    url,
    timestamp: new Date().toISOString()
  });
  
  // In a real implementation, you would send this data to your analytics service
  // e.g., Google Analytics, Mixpanel, or Amplitude
}

/**
 * Track product view
 */
export function trackProductViewEvent(productId: string, productName: string, category: string): void {
  if (!ANALYTICS_ENABLED) {
    trackProductView(productId);
    return;
  }
  
  trackProductView(productId);
  
  console.log('[Analytics] Product View:', {
    productId,
    productName,
    category,
    timestamp: new Date().toISOString()
  });
}

/**
 * Track product click
 */
export function trackProductClickEvent(productId: string, productName: string, category: string, position: number): void {
  if (!ANALYTICS_ENABLED) {
    trackProductClick(productId);
    return;
  }
  
  trackProductClick(productId);
  
  console.log('[Analytics] Product Click:', {
    productId,
    productName,
    category,
    position,
    timestamp: new Date().toISOString()
  });
}

/**
 * Track product purchase
 */
export function trackProductPurchaseEvent(productId: string, productName: string, category: string, price: number): void {
  if (!ANALYTICS_ENABLED) {
    trackProductPurchase(productId);
    return;
  }
  
  trackProductPurchase(productId);
  
  console.log('[Analytics] Product Purchase:', {
    productId,
    productName,
    category,
    price,
    currency: 'INR',
    timestamp: new Date().toISOString()
  });
}

/**
 * Track search event
 */
export function trackSearchEvent(searchTerm: string, resultsCount: number): void {
  if (!ANALYTICS_ENABLED) return;
  
  console.log('[Analytics] Search:', {
    searchTerm,
    resultsCount,
    timestamp: new Date().toISOString()
  });
}

/**
 * Track filter event
 */
export function trackFilterEvent(filterType: string, filterValue: string, resultsCount: number): void {
  if (!ANALYTICS_ENABLED) return;
  
  console.log('[Analytics] Filter:', {
    filterType,
    filterValue,
    resultsCount,
    timestamp: new Date().toISOString()
  });
}

/**
 * Track sort event
 */
export function trackSortEvent(sortType: string, resultsCount: number): void {
  if (!ANALYTICS_ENABLED) return;
  
  console.log('[Analytics] Sort:', {
    sortType,
    resultsCount,
    timestamp: new Date().toISOString()
  });
}

/**
 * Track category view
 */
export function trackCategoryView(categorySlug: string, categoryName: string, productCount: number): void {
  if (!ANALYTICS_ENABLED) return;
  
  console.log('[Analytics] Category View:', {
    categorySlug,
    categoryName,
    productCount,
    timestamp: new Date().toISOString()
  });
}

/**
 * Track article view
 */
export function trackArticleView(slug: string, title: string, type: 'review' | 'top5' | 'blog'): void {
  if (!ANALYTICS_ENABLED) return;
  
  console.log('[Analytics] Article View:', {
    slug,
    title,
    type,
    timestamp: new Date().toISOString()
  });
}

/**
 * Track affiliate link click
 */
export function trackAffiliateClick(productId: string, productName: string, affiliateUrl: string): void {
  if (!ANALYTICS_ENABLED) {
    trackProductClick(productId);
    return;
  }
  
  trackProductClick(productId);
  
  console.log('[Analytics] Affiliate Click:', {
    productId,
    productName,
    affiliateUrl,
    timestamp: new Date().toISOString()
  });
}

/**
 * Track social share
 */
export function trackSocialShare(contentType: string, contentId: string, platform: string): void {
  if (!ANALYTICS_ENABLED) return;
  
  console.log('[Analytics] Social Share:', {
    contentType,
    contentId,
    platform,
    timestamp: new Date().toISOString()
  });
}

/**
 * Track user engagement time
 */
export function trackEngagementTime(pageName: string, timeSeconds: number): void {
  if (!ANALYTICS_ENABLED) return;
  
  console.log('[Analytics] Engagement Time:', {
    pageName,
    timeSeconds,
    timestamp: new Date().toISOString()
  });
}

/**
 * Track error
 */
export function trackError(error: Error, context: string): void {
  if (!ANALYTICS_ENABLED) {
    console.error('[Error]', context, error);
    return;
  }
  
  console.error('[Analytics] Error:', {
    context,
    error: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString()
  });
}

/**
 * Initialize analytics
 */
export function initializeAnalytics(): void {
  if (!ANALYTICS_ENABLED) return;
  
  console.log('[Analytics] Initialized');
  
  // Track initial page view
  trackPageView(document.title, window.location.href);
  
  // Track time on page
  const startTime = Date.now();
  const beforeUnload = () => {
    const timeSeconds = Math.floor((Date.now() - startTime) / 1000);
    trackEngagementTime(document.title, timeSeconds);
  };
  
  window.addEventListener('beforeunload', beforeUnload);
}
