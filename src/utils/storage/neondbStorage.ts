/**
 * Neon DB Storage Implementation
 * PostgreSQL Serverless storage provider for BudgetTechIndia
 */

import type { StorageSystem } from './index';
import type { Product } from '../interfaces';
import {
  getAllNeonProducts,
  getNeonProductBySlug,
  addNeonProduct,
  deleteNeonProduct,
  purgeExpiredProducts
} from '../neondb';
import productsData from '../../data/products.json';
import categoriesData from '../../data/categories.json';

export class NeonDbStorage implements StorageSystem {
  async getAllProducts(): Promise<Product[]> {
    try {
      const dbProducts = await getAllNeonProducts();
      if (dbProducts.length === 0) {
        return productsData.products as Product[];
      }
      return dbProducts;
    } catch (e) {
      console.error('[NeonDbStorage] Error getting all products:', e);
      return productsData.products as Product[];
    }
  }

  async getProductById(id: string): Promise<Product | null> {
    try {
      const prod = await getNeonProductBySlug(id);
      if (prod) return prod;
      return (productsData.products as Product[]).find(p => p.id === id || p.slug === id) || null;
    } catch (e) {
      return (productsData.products as Product[]).find(p => p.id === id || p.slug === id) || null;
    }
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const all = await this.getAllProducts();
      return all.filter(p => p.category.toLowerCase() === category.toLowerCase());
    } catch (e) {
      return [];
    }
  }

  async addProduct(product: Omit<Product, 'id'>): Promise<string | null> {
    try {
      const res = await addNeonProduct(product as any, 7);
      return res ? res.id : null;
    } catch (e) {
      console.error('[NeonDbStorage] Error adding product:', e);
      return null;
    }
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<boolean> {
    try {
      const res = await addNeonProduct({ ...product, id } as any, 7);
      return !!res;
    } catch (e) {
      return false;
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    return await deleteNeonProduct(id);
  }

  async getAllCategories(): Promise<any[]> {
    return categoriesData.categories;
  }

  async getCategoryById(id: string): Promise<any | null> {
    return categoriesData.categories.find(c => c.id === id || c.slug === id) || null;
  }

  async addCategory(category: any): Promise<string | null> {
    return category.id || `cat_${Date.now()}`;
  }

  async updateCategory(id: string, category: any): Promise<boolean> {
    return true;
  }

  async deleteCategory(id: string): Promise<boolean> {
    return true;
  }

  async getAllContent(): Promise<any[]> {
    return [];
  }

  async getContentById(id: string): Promise<any | null> {
    return null;
  }

  async addContent(content: any): Promise<string | null> {
    return `cnt_${Date.now()}`;
  }

  async updateContent(id: string, content: any): Promise<boolean> {
    return true;
  }

  async deleteContent(id: string): Promise<boolean> {
    return true;
  }

  async getSettings(): Promise<any> {
    return {};
  }

  async updateSettings(id: string, settings: any): Promise<boolean> {
    return true;
  }

  async exportData(): Promise<string> {
    const products = await this.getAllProducts();
    return JSON.stringify({ products, categories: categoriesData.categories }, null, 2);
  }

  async importData(data: string): Promise<boolean> {
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed.products)) {
        for (const p of parsed.products) {
          await addNeonProduct(p, 7);
        }
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  getStorageInfo() {
    return {
      type: 'neondb',
      name: 'Neon DB (PostgreSQL Serverless)',
      description: 'Serverless PostgreSQL Database with 7-Day Automated Auto-Purge Content Rotation',
      isConfigured: true,
      lastSync: new Date(),
    };
  }
}
