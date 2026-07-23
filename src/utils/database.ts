/**
 * Database Service
 * Neon DB (PostgreSQL Serverless) integration for managing products
 */

import type { Product } from './interfaces';
import {
  getAllNeonProducts,
  getNeonProductBySlug,
  addNeonProduct,
  deleteNeonProduct,
} from './neondb';
import productsData from '../data/products.json';

export async function getAllProducts(): Promise<Product[]> {
  try {
    const products = await getAllNeonProducts();
    if (products.length === 0) {
      return productsData.products as Product[];
    }
    return products;
  } catch (error) {
    return productsData.products as Product[];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const product = await getNeonProductBySlug(id);
    if (product) return product;
    return (productsData.products as Product[]).find((p) => p.id === id || p.slug === id) || null;
  } catch (error) {
    return (productsData.products as Product[]).find((p) => p.id === id || p.slug === id) || null;
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const products = await getAllProducts();
    return products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  } catch (error) {
    return [];
  }
}

export async function addProduct(product: Omit<Product, 'id'>): Promise<string | null> {
  try {
    const created = await addNeonProduct(product as any, 7);
    return created ? created.id : null;
  } catch (error) {
    return null;
  }
}

export async function updateProduct(id: string, productData: Partial<Product>): Promise<boolean> {
  try {
    const updated = await addNeonProduct({ ...productData, id } as any, 7);
    return !!updated;
  } catch (error) {
    return false;
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  return await deleteNeonProduct(id);
}
