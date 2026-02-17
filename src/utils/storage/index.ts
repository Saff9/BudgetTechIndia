/**
 * Storage System Factory
 * Dual storage system with Firebase and local JSON file options
 * 
 * @module utils/storage
 * @version 1.0.0
 */

import type { Product } from '../interfaces';

/**
 * Storage system interface for product management
 */
export interface StorageSystem {
  /**
   * Get all products from storage
   */
  getAllProducts(): Promise<Product[]>;

  /**
   * Get a single product by ID
   */
  getProductById(id: string): Promise<Product | null>;

  /**
   * Get products by category
   */
  getProductsByCategory(category: string): Promise<Product[]>;

  /**
   * Add a new product to storage
   */
  addProduct(product: Omit<Product, 'id'>): Promise<string | null>;

  /**
   * Update an existing product
   */
  updateProduct(id: string, product: Partial<Product>): Promise<boolean>;

  /**
   * Delete a product from storage
   */
  deleteProduct(id: string): Promise<boolean>;

  /**
   * Get all categories from storage
   */
  getAllCategories(): Promise<any[]>;

  /**
   * Get a single category by ID
   */
  getCategoryById(id: string): Promise<any | null>;

  /**
   * Add a new category to storage
   */
  addCategory(category: any): Promise<string | null>;

  /**
   * Update an existing category
   */
  updateCategory(id: string, category: any): Promise<boolean>;

  /**
   * Delete a category from storage
   */
  deleteCategory(id: string): Promise<boolean>;

  /**
   * Get all content items from storage
   */
  getAllContent(): Promise<any[]>;

  /**
   * Get a single content item by ID
   */
  getContentById(id: string): Promise<any | null>;

  /**
   * Add a new content item to storage
   */
  addContent(content: any): Promise<string | null>;

  /**
   * Update an existing content item
   */
  updateContent(id: string, content: any): Promise<boolean>;

  /**
   * Delete a content item from storage
   */
  deleteContent(id: string): Promise<boolean>;

  /**
   * Get settings from storage
   */
  getSettings(): Promise<any>;

  /**
   * Update settings in storage
   */
  updateSettings(id: string, settings: any): Promise<boolean>;

  /**
   * Export all data from storage
   */
  exportData(): Promise<string>;

  /**
   * Import data into storage
   */
  importData(data: string): Promise<boolean>;

  /**
   * Get storage system information
   */
  getStorageInfo(): {
    type: string;
    name: string;
    description: string;
    isConfigured: boolean;
    lastSync?: Date;
  };
}

/**
 * Storage type configuration
 */
export type StorageType = 'firebase' | 'local';

/**
 * Get storage system instance based on environment configuration
 * @param type Optional storage type override
 * @returns Storage system instance
 */
export async function getStorageSystem(type?: StorageType): Promise<StorageSystem> {
  const storageType = type || (import.meta.env.PUBLIC_STORAGE_TYPE as StorageType) || 'local';

  switch (storageType) {
    case 'firebase':
      try {
        const { FirebaseStorage } = await import('./firebaseStorage');
        return new FirebaseStorage();
      } catch (error) {
        console.error('[Storage] Failed to initialize Firebase storage, falling back to local storage:', error);
        const { LocalStorage } = await import('./localStorage');
        return new LocalStorage();
      }

    case 'local':
    default:
      const { LocalStorage } = await import('./localStorage');
      return new LocalStorage();
  }
}

/**
 * Check if Firebase storage is configured
 */
export function isFirebaseConfigured(): boolean {
  return !!(
    import.meta.env.PUBLIC_FIREBASE_API_KEY &&
    import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN &&
    import.meta.env.PUBLIC_FIREBASE_PROJECT_ID
  );
}

/**
 * Check if local storage is configured (always true for JSON files)
 */
export function isLocalConfigured(): boolean {
  return true;
}
