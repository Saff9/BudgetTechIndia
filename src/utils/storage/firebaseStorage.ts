/**
 * Firebase Storage Implementation
 * Firestore integration for product management
 * 
 * @module utils/storage/firebaseStorage
 * @version 1.0.0
 */

import { db } from '../firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import type { Product } from '../interfaces';
import type { StorageSystem } from './index';

const PRODUCTS_COLLECTION = 'products';
const CATEGORIES_COLLECTION = 'categories';
const CONTENT_COLLECTION = 'content';
const SETTINGS_COLLECTION = 'settings';

export class FirebaseStorage implements StorageSystem {
  /**
   * Get all products from Firestore
   */
  async getAllProducts(): Promise<Product[]> {
    try {
      const productsRef = collection(db, PRODUCTS_COLLECTION);
      const q = query(productsRef, orderBy('name', 'asc'));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
    } catch (error) {
      console.error('[FirebaseStorage] Error getting products:', error);
      return [];
    }
  }

  /**
   * Get a single product by ID
   */
  async getProductById(id: string): Promise<Product | null> {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION, id);
      const snapshot = await getDoc(docRef);
      
      if (snapshot.exists()) {
        return {
          id: snapshot.id,
          ...snapshot.data(),
        } as Product;
      }
      
      return null;
    } catch (error) {
      console.error('[FirebaseStorage] Error getting product:', error);
      return null;
    }
  }

  /**
   * Get products by category
   */
  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const productsRef = collection(db, PRODUCTS_COLLECTION);
      const q = query(productsRef, where('category', '==', category), orderBy('name', 'asc'));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
    } catch (error) {
      console.error('[FirebaseStorage] Error getting products by category:', error);
      return [];
    }
  }

  /**
   * Add a new product to Firestore
   */
  async addProduct(product: Omit<Product, 'id'>): Promise<string | null> {
    try {
      const productsRef = collection(db, PRODUCTS_COLLECTION);
      const docRef = await addDoc(productsRef, {
        ...product,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      return docRef.id;
    } catch (error) {
      console.error('[FirebaseStorage] Error adding product:', error);
      return null;
    }
  }

  /**
   * Update an existing product
   */
  async updateProduct(id: string, product: Partial<Product>): Promise<boolean> {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION, id);
      await updateDoc(docRef, {
        ...product,
        updatedAt: new Date(),
      });
      
      return true;
    } catch (error) {
      console.error('[FirebaseStorage] Error updating product:', error);
      return false;
    }
  }

  /**
   * Delete a product from Firestore
   */
  async deleteProduct(id: string): Promise<boolean> {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION, id);
      await deleteDoc(docRef);
      
      return true;
    } catch (error) {
      console.error('[FirebaseStorage] Error deleting product:', error);
      return false;
    }
  }

  /**
   * Get all categories from Firestore
   */
  async getAllCategories(): Promise<any[]> {
    try {
      const categoriesRef = collection(db, CATEGORIES_COLLECTION);
      const q = query(categoriesRef, orderBy('name', 'asc'));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('[FirebaseStorage] Error getting categories:', error);
      return [];
    }
  }

  /**
   * Get a single category by ID
   */
  async getCategoryById(id: string): Promise<any | null> {
    try {
      const docRef = doc(db, CATEGORIES_COLLECTION, id);
      const snapshot = await getDoc(docRef);
      
      if (snapshot.exists()) {
        return {
          id: snapshot.id,
          ...snapshot.data(),
        };
      }
      
      return null;
    } catch (error) {
      console.error('[FirebaseStorage] Error getting category:', error);
      return null;
    }
  }

  /**
   * Add a new category to Firestore
   */
  async addCategory(category: any): Promise<string | null> {
    try {
      const categoriesRef = collection(db, CATEGORIES_COLLECTION);
      const docRef = await addDoc(categoriesRef, {
        ...category,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      return docRef.id;
    } catch (error) {
      console.error('[FirebaseStorage] Error adding category:', error);
      return null;
    }
  }

  /**
   * Update an existing category
   */
  async updateCategory(id: string, category: any): Promise<boolean> {
    try {
      const docRef = doc(db, CATEGORIES_COLLECTION, id);
      await updateDoc(docRef, {
        ...category,
        updatedAt: new Date(),
      });
      
      return true;
    } catch (error) {
      console.error('[FirebaseStorage] Error updating category:', error);
      return false;
    }
  }

  /**
   * Delete a category from Firestore
   */
  async deleteCategory(id: string): Promise<boolean> {
    try {
      const docRef = doc(db, CATEGORIES_COLLECTION, id);
      await deleteDoc(docRef);
      
      return true;
    } catch (error) {
      console.error('[FirebaseStorage] Error deleting category:', error);
      return false;
    }
  }

  /**
   * Get all content items from Firestore
   */
  async getAllContent(): Promise<any[]> {
    try {
      const contentRef = collection(db, CONTENT_COLLECTION);
      const q = query(contentRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('[FirebaseStorage] Error getting content:', error);
      return [];
    }
  }

  /**
   * Get a single content item by ID
   */
  async getContentById(id: string): Promise<any | null> {
    try {
      const docRef = doc(db, CONTENT_COLLECTION, id);
      const snapshot = await getDoc(docRef);
      
      if (snapshot.exists()) {
        return {
          id: snapshot.id,
          ...snapshot.data(),
        };
      }
      
      return null;
    } catch (error) {
      console.error('[FirebaseStorage] Error getting content:', error);
      return null;
    }
  }

  /**
   * Add a new content item to Firestore
   */
  async addContent(content: any): Promise<string | null> {
    try {
      const contentRef = collection(db, CONTENT_COLLECTION);
      const docRef = await addDoc(contentRef, {
        ...content,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      return docRef.id;
    } catch (error) {
      console.error('[FirebaseStorage] Error adding content:', error);
      return null;
    }
  }

  /**
   * Update an existing content item
   */
  async updateContent(id: string, content: any): Promise<boolean> {
    try {
      const docRef = doc(db, CONTENT_COLLECTION, id);
      await updateDoc(docRef, {
        ...content,
        updatedAt: new Date(),
      });
      
      return true;
    } catch (error) {
      console.error('[FirebaseStorage] Error updating content:', error);
      return false;
    }
  }

  /**
   * Delete a content item from Firestore
   */
  async deleteContent(id: string): Promise<boolean> {
    try {
      const docRef = doc(db, CONTENT_COLLECTION, id);
      await deleteDoc(docRef);
      
      return true;
    } catch (error) {
      console.error('[FirebaseStorage] Error deleting content:', error);
      return false;
    }
  }

  /**
   * Get all settings from Firestore
   */
  async getSettings(): Promise<any> {
    try {
      const settingsRef = collection(db, SETTINGS_COLLECTION);
      const snapshot = await getDocs(settingsRef);
      
      if (!snapshot.empty) {
        return {
          id: snapshot.docs[0].id,
          ...snapshot.docs[0].data(),
        };
      }
      
      return null;
    } catch (error) {
      console.error('[FirebaseStorage] Error getting settings:', error);
      return null;
    }
  }

  /**
   * Update settings in Firestore
   */
  async updateSettings(id: string, settings: any): Promise<boolean> {
    try {
      const docRef = doc(db, SETTINGS_COLLECTION, id);
      await updateDoc(docRef, {
        ...settings,
        updatedAt: new Date(),
      });
      
      return true;
    } catch (error) {
      console.error('[FirebaseStorage] Error updating settings:', error);
      return false;
    }
  }

  /**
   * Export all data from Firestore
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
      console.error('[FirebaseStorage] Error exporting data:', error);
      return '';
    }
  }

  /**
   * Import data into Firestore
   */
  async importData(data: string): Promise<boolean> {
    try {
      const parsedData = JSON.parse(data);

      // Import products
      if (parsedData.products) {
        for (const product of parsedData.products) {
          const { id, ...productData } = product;
          if (id) {
            await this.updateProduct(id, productData);
          } else {
            await this.addProduct(productData);
          }
        }
      }

      // Import categories
      if (parsedData.categories) {
        for (const category of parsedData.categories) {
          const { id, ...categoryData } = category;
          if (id) {
            await this.updateCategory(id, categoryData);
          } else {
            await this.addCategory(categoryData);
          }
        }
      }

      // Import content
      if (parsedData.content) {
        for (const contentItem of parsedData.content) {
          const { id, ...contentData } = contentItem;
          if (id) {
            await this.updateContent(id, contentData);
          } else {
            await this.addContent(contentData);
          }
        }
      }

      // Import settings
      if (parsedData.settings) {
        const { id, ...settingsData } = parsedData.settings;
        if (id) {
          await this.updateSettings(id, settingsData);
        }
      }

      return true;
    } catch (error) {
      console.error('[FirebaseStorage] Error importing data:', error);
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
      type: 'firebase',
      name: 'Firebase Firestore',
      description: 'Cloud-based NoSQL database with real-time synchronization',
      isConfigured: !!(
        import.meta.env.PUBLIC_FIREBASE_API_KEY &&
        import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN &&
        import.meta.env.PUBLIC_FIREBASE_PROJECT_ID
      ),
    };
  }
}
