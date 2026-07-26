/**
 * Utility Functions for BudgetTechIndia
 * ======================================
 * This file contains helper functions used throughout the application.
 */

import type { PriceInfo, BreadcrumbItem } from './interfaces';

/* ========================================
   Price Formatting Utilities
   ======================================== */

/**
 * Format a number as Indian Rupees (INR)
 * @param amount - The amount to format
 * @param options - Intl.NumberFormat options
 * @returns Formatted price string (e.g., "â¹1,999")
 */
export function formatPrice(
  amount: number,
  options: Intl.NumberFormatOptions = {}
): string {
  const defaultOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...options,
  };

  return new Intl.NumberFormat('en-IN', defaultOptions).format(amount);
}

/**
 * Format price with compact notation for large numbers
 * @param amount - The amount to format
 * @returns Compact formatted string (e.g., "â¹1.5L")
 */
export function formatPriceCompact(amount: number): string {
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `â¹${lakhs.toFixed(1)}L`;
  }
  if (amount >= 1000) {
    const thousands = amount / 1000;
    return `â¹${thousands.toFixed(1)}K`;
  }
  return formatPrice(amount);
}

/**
 * Calculate discount percentage
 * @param price - Current price
 * @param mrp - Original MRP
 * @returns Discount percentage (0-100)
 */
export function calculateDiscount(price: number, mrp: number): number {
  if (mrp <= 0 || price >= mrp) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

/**
 * Get complete price information
 * @param price - Current price
 * @param mrp - Original MRP
 * @returns PriceInfo object with formatted values
 */
export function getPriceInfo(price: number, mrp: number): PriceInfo {
  return {
    price,
    mrp,
    currency: 'INR',
    discount: calculateDiscount(price, mrp),
    formatted: formatPrice(price),
    formattedMrp: formatPrice(mrp),
  };
}

/**
 * Check if price is within budget range (under â¹2000)
 * @param price - Price to check
 * @returns True if price is under â¹2000
 */
export function isBudgetPrice(price: number): boolean {
  return price > 0 && price <= 2000;
}

/* ========================================
   Date Formatting Utilities
   ======================================== */

/**
 * Format a date for display
 * @param date - Date to format (Date object or ISO string)
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string (e.g., "February 15, 2026")
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {}
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };

  return new Intl.DateTimeFormat('en-IN', defaultOptions).format(dateObj);
}

/**
 * Format a date in relative time (e.g., "2 days ago")
 * @param date - Date to format
 * @returns Relative time string
 */
export function formatRelativeDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 0) {
    return 'Coming soon';
  }
  if (diffInDays === 0) {
    return 'Today';
  }
  if (diffInDays === 1) {
    return 'Yesterday';
  }
  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  }
  if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
  }
  if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return months === 1 ? '1 month ago' : `${months} months ago`;
  }
  const years = Math.floor(diffInDays / 365);
  return years === 1 ? '1 year ago' : `${years} years ago`;
}

/**
 * Format date for ISO string (schema.org)
 * @param date - Date to format
 * @returns ISO date string (e.g., "2026-02-15")
 */
export function formatISODate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString().split('T')[0];
}

/* ========================================
   Slug Generation Utilities
   ======================================== */

/**
 * Generate a URL-friendly slug from a string
 * @param text - Text to convert to slug
 * @returns URL-friendly slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Generate a slug with prefix
 * @param text - Text to convert to slug
 * @param prefix - Prefix to add (e.g., "reviews")
 * @returns Prefixed slug path
 */
export function generateSlugWithPrefix(text: string, prefix: string): string {
  const slug = generateSlug(text);
  return prefix ? `/${prefix}/${slug}` : `/${slug}`;
}

/* ========================================
   Affiliate Link Utilities
   ======================================== */

/**
 * Generate Amazon India affiliate link
 * @param asin - Amazon Standard Identification Number
 * @param tag - Affiliate tag (defaults to environment variable)
 * @returns Complete Amazon affiliate URL
 */
export function generateAmazonAffiliateUrl(asin: string, tag?: string): string {
  const affiliateTag = tag || import.meta.env.AMAZON_AFFILIATE_TAG || 'budgettechin-21';
  return `https://www.amazon.in/dp/${asin}?tag=${affiliateTag}`;
}

/**
 * Add UTM parameters to a URL
 * @param url - Base URL
 * @param params - UTM parameters
 * @returns URL with UTM parameters
 */
export function addUtmParams(
  url: string,
  params: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
  }
): string {
  const urlObj = new URL(url);
  
  if (params.source) urlObj.searchParams.set('utm_source', params.source);
  if (params.medium) urlObj.searchParams.set('utm_medium', params.medium);
  if (params.campaign) urlObj.searchParams.set('utm_campaign', params.campaign);
  if (params.content) urlObj.searchParams.set('utm_content', params.content);

  return urlObj.toString();
}

/**
 * Generate affiliate link with tracking
 * @param url - Base product URL
 * @param productId - Product identifier for tracking
 * @param options - Additional options
 * @returns Tracked affiliate URL
 */
export function generateAffiliateLink(
  url: string,
  productId: string,
  options: {
    source?: string;
    medium?: string;
    campaign?: string;
  } = {}
): string {
  const { source = 'website', medium = 'affiliate', campaign = 'product-link' } = options;
  
  return addUtmParams(url, {
    source,
    medium,
    campaign,
    content: productId,
  });
}

/* ========================================
   String Utilities
   ======================================== */

/**
 * Truncate text to a specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix to add (default: "...")
 * @returns Truncated text
 */
export function truncateText(
  text: string,
  maxLength: number,
  suffix: string = '...'
): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length).trim() + suffix;
}

/**
 * Capitalize first letter of a string
 * @param text - Text to capitalize
 * @returns Capitalized text
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Convert string to title case
 * @param text - Text to convert
 * @returns Title case text
 */
export function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
}

/* ========================================
   Array Utilities
   ======================================== */

/**
 * Sort products by price (low to high)
 */
export function sortByPriceLowToHigh<T extends { price: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.price - b.price);
}

/**
 * Sort products by price (high to low)
 */
export function sortByPriceHighToLow<T extends { price: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => b.price - a.price);
}

/**
 * Sort products by rating (high to low)
 */
export function sortByRating<T extends { rating: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => b.rating - a.rating);
}

/**
 * Filter products by price range
 */
export function filterByPriceRange<T extends { price: number }>(
  items: T[],
  min: number,
  max: number
): T[] {
  return items.filter(item => item.price >= min && item.price <= max);
}

/**
 * Filter products by category
 */
export function filterByCategory<T extends { category: string }>(
  items: T[],
  category: string
): T[] {
  return items.filter(item => item.category === category);
}

/* ========================================
   Breadcrumb Utilities
   ======================================== */

/**
 * Generate breadcrumb items from a path
 * @param path - URL path
 * @param labels - Custom labels for path segments
 * @returns Array of breadcrumb items
 */
export function generateBreadcrumbs(
  path: string,
  labels: Record<string, string> = {}
): BreadcrumbItem[] {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', url: '/' }
  ];

  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;
    
    breadcrumbs.push({
      name: labels[segment] || toTitleCase(segment.replace(/-/g, ' ')),
      url: isLast ? undefined : currentPath,
    });
  });

  return breadcrumbs;
}

/* ========================================
   Rating Utilities
   ======================================== */

/**
 * Generate star rating array
 * @param rating - Rating value (0-5)
 * @returns Array of boolean values (true = filled star)
 */
export function getStarRating(rating: number): boolean[] {
  const stars: boolean[] = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(true);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(true); // Treat half star as filled for simplicity
    } else {
      stars.push(false);
    }
  }

  return stars;
}

/**
 * Format rating for display
 * @param rating - Rating value
 * @returns Formatted rating string (e.g., "4.5")
 */
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

/* ========================================
   URL Utilities
   ======================================== */

/**
 * Get the full URL for a path
 * @param path - URL path
 * @returns Full URL with site origin
 */
export function getFullUrl(path: string): string {
  const siteUrl = import.meta.env.SITE_URL || 'https://budget-tech-india.vercel.app';
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
}

/**
 * Check if URL is external
 * @param url - URL to check
 * @returns True if URL is external
 */
export function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

/* ========================================
   Validation Utilities
   ======================================== */

/**
 * Validate email format
 * @param email - Email to validate
 * @returns True if email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate ASIN format
 * @param asin - ASIN to validate
 * @returns True if ASIN is valid
 */
export function isValidAsin(asin: string): boolean {
  const asinRegex = /^[A-Z0-9]{10}$/;
  return asinRegex.test(asin);
}

/* ========================================
   Image Utilities
   ======================================== */

/**
 * Get optimized image URL with parameters
 * @param src - Original image source
 * @param width - Desired width
 * @param format - Image format
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(
  src: string,
  width: number = 640,
  format: 'webp' | 'avif' | 'jpeg' = 'webp'
): string {
  // For Astro's image service, this would be handled by the Image component
  // This is a placeholder for manual URL construction if needed
  if (src.startsWith('/')) {
    return src; // Local images are handled by Astro
  }
  return src; // External images
}

/**
 * Generate srcset for responsive images
 * @param src - Image source
 * @param widths - Array of widths
 * @returns srcset string
 */
export function generateSrcSet(src: string, widths: number[] = [320, 640, 1024]): string {
  return widths
    .map(width => `${getOptimizedImageUrl(src, width)} ${width}w`)
    .join(', ');
}