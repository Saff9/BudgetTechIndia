/**
 * Local Storage Implementation
 * JSON file-based storage for product management
 * 
 * @module utils/storage/localStorage
 * @version 1.0.0
 */

import fs from 'fs';
import path from 'path';
import type { Product } from '../interfaces';
import type { StorageSystem } from './index';

const DATA_DIR = path.join(process.cwd(), 'src/data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

/**
 * Read data from a JSON file
 */
function readJSONFile(filePath: string, defaultValue: any = null): any {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
    return defaultValue;
  } catch (error) {
    console.error(`[LocalStorage] Error reading file ${filePath}:`, error);
    return defaultValue;
  }
}

/**
 * Write data to a JSON file
 */
function writeJSONFile(filePath: string, data: any): boolean {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`[LocalStorage] Error writing file ${filePath}:`, error);
    return false;
  }
}

export class LocalStorage implements StorageSystem {
  /**
   * Get all products from local JSON file
   */
  async getAllProducts(): Promise<Product[]> {
    try {
      const data = readJSONFile(PRODUCTS_FILE, { products: [] });
      return data.products || [];
    } catch (error) {
      console.error('[LocalStorage] Error getting products:', error);
      return [];
    }
  }

  /**
   * Get a single product by ID
   */
  async getProductById(id: string): Promise<Product | null> {
    try {
      const products = await this.getAllProducts();
      return products.find((product) => product.id === id) || null;
    } catch (error) {
      console.error('[LocalStorage] Error getting product:', error);
      return null;
    }
  }

  /**
   * Get products by category
   */
  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const products = await this.getAllProducts();
      return products.filter((product) => product.category === category);
    } catch (error) {
      console.error('[LocalStorage] Error getting products by category:', error);
      return [];
    }
  }

  /**
   * Add a new product to local JSON file
   */
  async addProduct(product: Omit<Product, 'id'>): Promise<string | null> {
    try {
      const products = await this.getAllProducts();
      const newProduct: Product = {
        ...product,
        id: Date.now().toString(),
        lastUpdated: new Date().toISOString(),
      };

      products.push(newProduct);
      const success = writeJSONFile(PRODUCTS_FILE, { products });

      return success ? newProduct.id : null;
    } catch (error) {
      console.error('[LocalStorage] Error adding product:', error);
      return null;
    }
  }

  /**
   * Update an existing product
   */
  async updateProduct(id: string, product: Partial<Product>): Promise<boolean> {
    try {
      const products = await this.getAllProducts();
      const index = products.findIndex((p) => p.id === id);

      if (index === -1) {
        return false;
      }

      products[index] = {
        ...products[index],
        ...product,
        lastUpdated: new Date().toISOString(),
      };

      return writeJSONFile(PRODUCTS_FILE, { products });
    } catch (error) {
      console.error('[LocalStorage] Error updating product:', error);
      return false;
    }
  }

  /**
   * Delete a product from local JSON file
   */
  async deleteProduct(id: string): Promise<boolean> {
    try {
      const products = await this.getAllProducts();
      const filteredProducts = products.filter((product) => product.id !== id);

      return writeJSONFile(PRODUCTS_FILE, { products: filteredProducts });
    } catch (error) {
      console.error('[LocalStorage] Error deleting product:', error);
      return false;
    }
  }

  /**
   * Get all categories from local JSON file
   */
  async getAllCategories(): Promise<any[]> {
    try {
      const data = readJSONFile(CATEGORIES_FILE, { categories: [] });
      return data.categories || [];
    } catch (error) {
      console.error('[LocalStorage] Error getting categories:', error);
      return [];
    }
  }

  /**
   * Get a single category by ID
   */
  async getCategoryById(id: string): Promise<any | null> {
    try {
      const categories = await this.getAllCategories();
      return categories.find((category) => category.id === id) || null;
    } catch (error) {
      console.error('[LocalStorage] Error getting category:', error);
      return null;
    }
  }

  /**
   * Add a new category to local JSON file
   */
  async addCategory(category: any): Promise<string | null> {
    try {
      const categories = await this.getAllCategories();
      const newCategory = {
        ...category,
        id: Date.now().toString(),
        productCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      categories.push(newCategory);
      const success = writeJSONFile(CATEGORIES_FILE, { categories });

      return success ? newCategory.id : null;
    } catch (error) {
      console.error('[LocalStorage] Error adding category:', error);
      return null;
    }
  }

  /**
   * Update an existing category
   */
  async updateCategory(id: string, category: any): Promise<boolean> {
    try {
      const categories = await this.getAllCategories();
      const index = categories.findIndex((c) => c.id === id);

      if (index === -1) {
        return false;
      }

      categories[index] = {
        ...categories[index],
        ...category,
        updatedAt: new Date().toISOString(),
      };

      return writeJSONFile(CATEGORIES_FILE, { categories });
    } catch (error) {
      console.error('[LocalStorage] Error updating category:', error);
      return false;
    }
  }

  /**
   * Delete a category from local JSON file
   */
  async deleteCategory(id: string): Promise<boolean> {
    try {
      const categories = await this.getAllCategories();
      const filteredCategories = categories.filter((category) => category.id !== id);

      return writeJSONFile(CATEGORIES_FILE, { categories: filteredCategories });
    } catch (error) {
      console.error('[LocalStorage] Error deleting category:', error);
      return false;
    }
  }

  /**
   * Get all content items from local JSON file
   */
  async getAllContent(): Promise<any[]> {
    try {
      const data = readJSONFile(CONTENT_FILE, { content: [] });
      return data.content || [];
    } catch (error) {
      console.error('[LocalStorage] Error getting content:', error);
      return [];
    }
  }

  /**
   * Get a single content item by ID
   */
  async getContentById(id: string): Promise<any | null> {
    try {
      const content = await this.getAllContent();
      return content.find((item) => item.id === id) || null;
    } catch (error) {
      console.error('[LocalStorage] Error getting content:', error);
      return null;
    }
  }

  /**
   * Add a new content item to local JSON file
   */
  async addContent(content: any): Promise<string | null> {
    try {
      const contentItems = await this.getAllContent();
      const newContent = {
        ...content,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      contentItems.push(newContent);
      const success = writeJSONFile(CONTENT_FILE, { content: contentItems });

      return success ? newContent.id : null;
    } catch (error) {
      console.error('[LocalStorage] Error adding content:', error);
      return null;
    }
  }

  /**
   * Update an existing content item
   */
  async updateContent(id: string, content: any): Promise<boolean> {
    try {
      const contentItems = await this.getAllContent();
      const index = contentItems.findIndex((item) => item.id === id);

      if (index === -1) {
        return false;
      }

      contentItems[index] = {
        ...contentItems[index],
        ...content,
        updatedAt: new Date().toISOString(),
      };

      return writeJSONFile(CONTENT_FILE, { content: contentItems });
    } catch (error) {
      console.error('[LocalStorage] Error updating content:', error);
      return false;
    }
  }

  /**
   * Delete a content item from local JSON file
   */
  async deleteContent(id: string): Promise<boolean> {
    try {
      const contentItems = await this.getAllContent();
      const filteredContent = contentItems.filter((item) => item.id !== id);

      return writeJSONFile(CONTENT_FILE, { content: filteredContent });
    } catch (error) {
      console.error('[LocalStorage] Error deleting content:', error);
      return false;
    }
  }

  /**
   * Get settings from local JSON file
   */
  async getSettings(): Promise<any> {
    try {
      const settings = readJSONFile(SETTINGS_FILE, null);
      return settings;
    } catch (error) {
      console.error('[LocalStorage] Error getting settings:', error);
      return null;
    }
  }

  /**
   * Update settings in local JSON file
   */
  async updateSettings(id: string, settings: any): Promise<boolean> {
    try {
      const existingSettings = await this.getSettings();
      const updatedSettings = {
        ...existingSettings,
        ...settings,
        id,
        updatedAt: new Date().toISOString(),
      };

      return writeJSONFile(SETTINGS_FILE, updatedSettings);
    } catch (error) {
      console.error('[LocalStorage] Error updating settings:', error);
      return false;
    }
  }

  /**
   * Export all data from local JSON files
   */
  async exportData(): Promise<string> {
    try {
      const [products, categories, content, settings] = await Promise.all([
        this.getAllProducts(),
        this.getAllCategories(),
        this.getAllContent(),
        this.getSettings(),
      ]);

      const data = {
        products,
        categories,
        content,
        settings,
        exportedAt: new Date().toISOString(),
      };

      return JSON.stringify(data, null, 2);
    } catch (error) {
      console.error('[LocalStorage] Error exporting data:', error);
      return '';
    }
  }

  /**
   * Import data into local JSON files
   */
  async importData(data: string): Promise<boolean> {
    try {
      const parsedData = JSON.parse(data);

      // Import products
      if (parsedData.products) {
        writeJSONFile(PRODUCTS_FILE, { products: parsedData.products });
      }

      // Import categories
      if (parsedData.categories) {
        writeJSONFile(CATEGORIES_FILE, { categories: parsedData.categories });
      }

      // Import content
      if (parsedData.content) {
        writeJSONFile(CONTENT_FILE, { content: parsedData.content });
      }

      // Import settings
      if (parsedData.settings) {
        writeJSONFile(SETTINGS_FILE, parsedData.settings);
      }

      return true;
    } catch (error) {
      console.error('[LocalStorage] Error importing data:', error);
      return false;
    }
  }

  /**
   * Get storage system information
   */
  getStorageInfo(): {
    type: string;
    name: string;
    description: string;
    isConfigured: boolean;
    lastSync?: Date;
  } {
    return {
      type: 'local',
      name: 'Local JSON Files',
      description: 'File-based storage using JSON files (no external dependencies)',
      isConfigured: true,
    };
  }
}
