/**
 * Database Service
 * Firebase Firestore integration for managing products
 * 
 * @module utils/database
 * @version 1.0.0
 */

import { db } from './firebase';
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
import type { Product } from './interfaces';

// Firestore collections
const PRODUCTS_COLLECTION = 'products';
const CATEGORIES_COLLECTION = 'categories';
const CONTENT_COLLECTION = 'content';
const SETTINGS_COLLECTION = 'settings';

/**
 * Get all products from Firestore
 * @returns Promise with array of products
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const q = query(productsRef, orderBy('name', 'asc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  } catch (error) {
    console.error('[Database] Error getting products:', error);
    return [];
  }
}

/**
 * Get a single product by ID
 * @param id - Product ID
 * @returns Promise with product data or null
 */
export async function getProductById(id: string): Promise<Product | null> {
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
    console.error('[Database] Error getting product:', error);
    return null;
  }
}

/**
 * Get products by category
 * @param category - Category name
 * @returns Promise with array of products
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const q = query(productsRef, where('category', '==', category), orderBy('name', 'asc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  } catch (error) {
    console.error('[Database] Error getting products by category:', error);
    return [];
  }
}

/**
 * Add a new product to Firestore
 * @param product - Product data
 * @returns Promise with the new product ID
 */
export async function addProduct(product: Omit<Product, 'id'>): Promise<string | null> {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION);
    const docRef = await addDoc(productsRef, {
      ...product,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    return docRef.id;
  } catch (error) {
    console.error('[Database] Error adding product:', error);
    return null;
  }
}

/**
 * Update an existing product
 * @param id - Product ID
 * @param product - Updated product data
 * @returns Promise with success status
 */
export async function updateProduct(id: string, product: Partial<Product>): Promise<boolean> {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await updateDoc(docRef, {
      ...product,
      updatedAt: new Date(),
    });
    
    return true;
  } catch (error) {
    console.error('[Database] Error updating product:', error);
    return false;
  }
}

/**
 * Delete a product from Firestore
 * @param id - Product ID
 * @returns Promise with success status
 */
export async function deleteProduct(id: string): Promise<boolean> {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await deleteDoc(docRef);
    
    return true;
  } catch (error) {
    console.error('[Database] Error deleting product:', error);
    return false;
  }
}

/**
 * Get all categories from Firestore
 * @returns Promise with array of categories
 */
export async function getAllCategories(): Promise<any[]> {
  try {
    const categoriesRef = collection(db, CATEGORIES_COLLECTION);
    const q = query(categoriesRef, orderBy('name', 'asc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('[Database] Error getting categories:', error);
    return [];
  }
}

/**
 * Get a single category by ID
 * @param id - Category ID
 * @returns Promise with category data or null
 */
export async function getCategoryById(id: string): Promise<any | null> {
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
    console.error('[Database] Error getting category:', error);
    return null;
  }
}

/**
 * Add a new category to Firestore
 * @param category - Category data
 * @returns Promise with the new category ID
 */
export async function addCategory(category: any): Promise<string | null> {
  try {
    const categoriesRef = collection(db, CATEGORIES_COLLECTION);
    const docRef = await addDoc(categoriesRef, {
      ...category,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    return docRef.id;
  } catch (error) {
    console.error('[Database] Error adding category:', error);
    return null;
  }
}

/**
 * Update an existing category
 * @param id - Category ID
 * @param category - Updated category data
 * @returns Promise with success status
 */
export async function updateCategory(id: string, category: any): Promise<boolean> {
  try {
    const docRef = doc(db, CATEGORIES_COLLECTION, id);
    await updateDoc(docRef, {
      ...category,
      updatedAt: new Date(),
    });
    
    return true;
  } catch (error) {
    console.error('[Database] Error updating category:', error);
    return false;
  }
}

/**
 * Delete a category from Firestore
 * @param id - Category ID
 * @returns Promise with success status
 */
export async function deleteCategory(id: string): Promise<boolean> {
  try {
    const docRef = doc(db, CATEGORIES_COLLECTION, id);
    await deleteDoc(docRef);
    
    return true;
  } catch (error) {
    console.error('[Database] Error deleting category:', error);
    return false;
  }
}

/**
 * Get all content items from Firestore
 * @returns Promise with array of content items
 */
export async function getAllContent(): Promise<any[]> {
  try {
    const contentRef = collection(db, CONTENT_COLLECTION);
    const q = query(contentRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('[Database] Error getting content:', error);
    return [];
  }
}

/**
 * Get a single content item by ID
 * @param id - Content item ID
 * @returns Promise with content data or null
 */
export async function getContentById(id: string): Promise<any | null> {
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
    console.error('[Database] Error getting content:', error);
    return null;
  }
}

/**
 * Add a new content item to Firestore
 * @param content - Content data
 * @returns Promise with the new content ID
 */
export async function addContent(content: any): Promise<string | null> {
  try {
    const contentRef = collection(db, CONTENT_COLLECTION);
    const docRef = await addDoc(contentRef, {
      ...content,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    return docRef.id;
  } catch (error) {
    console.error('[Database] Error adding content:', error);
    return null;
  }
}

/**
 * Update an existing content item
 * @param id - Content item ID
 * @param content - Updated content data
 * @returns Promise with success status
 */
export async function updateContent(id: string, content: any): Promise<boolean> {
  try {
    const docRef = doc(db, CONTENT_COLLECTION, id);
    await updateDoc(docRef, {
      ...content,
      updatedAt: new Date(),
    });
    
    return true;
  } catch (error) {
    console.error('[Database] Error updating content:', error);
    return false;
  }
}

/**
 * Delete a content item from Firestore
 * @param id - Content item ID
 * @returns Promise with success status
 */
export async function deleteContent(id: string): Promise<boolean> {
  try {
    const docRef = doc(db, CONTENT_COLLECTION, id);
    await deleteDoc(docRef);
    
    return true;
  } catch (error) {
    console.error('[Database] Error deleting content:', error);
    return false;
  }
}

/**
 * Get all settings from Firestore
 * @returns Promise with array of settings
 */
export async function getSettings(): Promise<any> {
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
    console.error('[Database] Error getting settings:', error);
    return null;
  }
}

/**
 * Update settings
 * @param id - Settings document ID
 * @param settings - Updated settings data
 * @returns Promise with success status
 */
export async function updateSettings(id: string, settings: any): Promise<boolean> {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, id);
    await updateDoc(docRef, {
      ...settings,
      updatedAt: new Date(),
    });
    
    return true;
  } catch (error) {
    console.error('[Database] Error updating settings:', error);
    return false;
  }
}
