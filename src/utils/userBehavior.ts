/**
 * User Behavior Tracking
 * ========================================
 * Track user interactions with products using localStorage
 * 
 * Tracked Behaviors:
 * - Viewed products
 * - Clicked products
 * - Purchase intent
 * 
 * Storage Structure:
 * {
 *   viewed: [{ id: string, timestamp: number }],
 *   clicked: [{ id: string, timestamp: number }],
 *   purchased: [{ id: string, timestamp: number }]
 * }
 */

const STORAGE_KEY = 'budgettechindia-user-behavior';

// Maximum number of items to track per category
const MAX_TRACKED_ITEMS = 50;

// Expiry time for tracked items (30 days in milliseconds)
const ITEM_EXPIRY = 30 * 24 * 60 * 60 * 1000;

/**
 * User behavior data structure
 */
export interface UserBehavior {
  viewed: Array<{ id: string; timestamp: number }>;
  clicked: Array<{ id: string; timestamp: number }>;
  purchased?: Array<{ id: string; timestamp: number }>;
}

/**
 * Get user behavior data from localStorage
 * Note: This should only be called from client-side code
 */
export function getUserBehavior(): UserBehavior {
  // Check if we're in a browser environment
  if (typeof localStorage === 'undefined') {
    return {
      viewed: [],
      clicked: [],
      purchased: []
    };
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const behavior = JSON.parse(stored) as UserBehavior;
      return {
        viewed: behavior.viewed || [],
        clicked: behavior.clicked || [],
        purchased: behavior.purchased || []
      };
    }
  } catch (error) {
    console.error('Error reading user behavior:', error);
  }
  
  return {
    viewed: [],
    clicked: [],
    purchased: []
  };
}

/**
 * Save user behavior data to localStorage
 */
export function saveUserBehavior(behavior: UserBehavior): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(behavior));
  } catch (error) {
    console.error('Error saving user behavior:', error);
  }
}

/**
 * Track a product view
 */
export function trackProductView(productId: string): void {
  const behavior = getUserBehavior();
  
  // Remove any existing entry for this product
  behavior.viewed = behavior.viewed.filter(item => item.id !== productId);
  
  // Add new entry
  behavior.viewed.unshift({
    id: productId,
    timestamp: Date.now()
  });
  
  // Limit the number of tracked items
  if (behavior.viewed.length > MAX_TRACKED_ITEMS) {
    behavior.viewed = behavior.viewed.slice(0, MAX_TRACKED_ITEMS);
  }
  
  saveUserBehavior(behavior);
}

/**
 * Track a product click
 */
export function trackProductClick(productId: string): void {
  const behavior = getUserBehavior();
  
  // Remove any existing entry for this product
  behavior.clicked = behavior.clicked.filter(item => item.id !== productId);
  
  // Add new entry
  behavior.clicked.unshift({
    id: productId,
    timestamp: Date.now()
  });
  
  // Limit the number of tracked items
  if (behavior.clicked.length > MAX_TRACKED_ITEMS) {
    behavior.clicked = behavior.clicked.slice(0, MAX_TRACKED_ITEMS);
  }
  
  saveUserBehavior(behavior);
}

/**
 * Track a product purchase
 */
export function trackProductPurchase(productId: string): void {
  const behavior = getUserBehavior();
  
  // Remove any existing entry for this product
  behavior.purchased = (behavior.purchased || []).filter(item => item.id !== productId);
  
  // Add new entry
  behavior.purchased!.unshift({
    id: productId,
    timestamp: Date.now()
  });
  
  // Limit the number of tracked items
  if (behavior.purchased!.length > MAX_TRACKED_ITEMS) {
    behavior.purchased = behavior.purchased!.slice(0, MAX_TRACKED_ITEMS);
  }
  
  saveUserBehavior(behavior);
}

/**
 * Get unique viewed product IDs
 */
export function getViewedProductIds(): string[] {
  return getUserBehavior().viewed.map(item => item.id);
}

/**
 * Get unique clicked product IDs
 */
export function getClickedProductIds(): string[] {
  return getUserBehavior().clicked.map(item => item.id);
}

/**
 * Get unique purchased product IDs
 */
export function getPurchasedProductIds(): string[] {
  return (getUserBehavior().purchased || []).map(item => item.id);
}

/**
 * Get recent viewed products (last N days)
 */
export function getRecentViewedProducts(days: number = 7): string[] {
  const behavior = getUserBehavior();
  const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);
  
  return behavior.viewed
    .filter(item => item.timestamp > cutoff)
    .map(item => item.id);
}

/**
 * Get product affinity scores based on user behavior
 */
export function getProductAffinityScores(): Record<string, number> {
  const behavior = getUserBehavior();
  const scores: Record<string, number> = {};
  
  // Calculate scores based on interactions
  // View: 1 point
  // Click: 3 points (stronger intent)
  // Purchase: 10 points (strongest intent)
  
  behavior.viewed.forEach(item => {
    scores[item.id] = (scores[item.id] || 0) + 1;
  });
  
  behavior.clicked.forEach(item => {
    scores[item.id] = (scores[item.id] || 0) + 3;
  });
  
  behavior.purchased?.forEach(item => {
    scores[item.id] = (scores[item.id] || 0) + 10;
  });
  
  return scores;
}

/**
 * Clear all user behavior data
 */
export function clearUserBehavior(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing user behavior:', error);
  }
}

/**
 * Clean up expired behavior data
 */
export function cleanupExpiredBehavior(): void {
  const behavior = getUserBehavior();
  const cutoff = Date.now() - ITEM_EXPIRY;
  
  const cleaned = {
    viewed: behavior.viewed.filter(item => item.timestamp > cutoff),
    clicked: behavior.clicked.filter(item => item.timestamp > cutoff),
    purchased: behavior.purchased?.filter(item => item.timestamp > cutoff)
  };
  
  saveUserBehavior(cleaned as UserBehavior);
}

/**
 * Initialize user behavior tracking
 */
export function initializeUserBehaviorTracking(): void {
  // Clean up expired data on initialization
  cleanupExpiredBehavior();
}

/**
 * Get user behavior summary for analytics
 */
export function getUserBehaviorSummary() {
  const behavior = getUserBehavior();
  
  return {
    totalViewed: behavior.viewed.length,
    totalClicked: behavior.clicked.length,
    totalPurchased: behavior.purchased?.length || 0,
    recentViewed: getRecentViewedProducts().length,
    mostViewedProduct: behavior.viewed.length > 0 
      ? behavior.viewed[0].id 
      : null,
    lastInteraction: behavior.viewed.length > 0 
      ? new Date(behavior.viewed[0].timestamp) 
      : null
  };
}
