/**
 * Image Optimization Utilities for BudgetTechIndia
 * Provides helper functions for image handling and optimization
 */

import { siteConfig } from './siteConfig';

/**
 * Image size presets for different use cases
 */
export const imagePresets = {
  // Product images
  productThumbnail: { width: 200, height: 200 },
  productCard: { width: 400, height: 400 },
  productDetail: { width: 800, height: 800 },
  productGallery: { width: 1200, height: 1200 },
  
  // Article images
  articleThumbnail: { width: 300, height: 200 },
  articleCard: { width: 600, height: 400 },
  articleHero: { width: 1200, height: 630 },
  articleFull: { width: 1600, height: 900 },
  
  // Category images
  categoryThumbnail: { width: 150, height: 150 },
  categoryCard: { width: 400, height: 300 },
  categoryHero: { width: 1200, height: 400 },
  
  // Open Graph images
  ogImage: { width: 1200, height: 630 },
  twitterImage: { width: 1200, height: 630 },
  
  // Logo and icons
  logo: { width: 200, height: 60 },
  logoSmall: { width: 100, height: 30 },
  favicon: { width: 32, height: 32 },
  appleTouchIcon: { width: 180, height: 180 },
  
  // Placeholder
  placeholder: { width: 100, height: 100 },
} as const;

/**
 * Image format options
 */
export type ImageFormat = 'webp' | 'avif' | 'jpg' | 'png' | 'svg';

/**
 * Image quality settings
 */
export const imageQuality = {
  thumbnail: 70,
  card: 75,
  detail: 80,
  hero: 85,
  gallery: 90,
} as const;

/**
 * Generate optimized image URL with parameters
 */
export function getOptimizedImageUrl(
  src: string,
  options: {
    width?: number;
    height?: number;
    format?: ImageFormat;
    quality?: number;
    fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  } = {}
): string {
  const {
    width,
    height,
    format = 'webp',
    quality = imageQuality.card,
    fit = 'cover',
  } = options;

  // If it's an external URL, return as is (or use a CDN proxy)
  if (src.startsWith('http')) {
    return src;
  }

  // For Astro's built-in image optimization, return the path
  // The actual optimization happens at build time
  const params = new URLSearchParams();
  if (width) params.set('w', width.toString());
  if (height) params.set('h', height.toString());
  if (quality !== imageQuality.card) params.set('q', quality.toString());
  if (format !== 'webp') params.set('f', format);
  if (fit !== 'cover') params.set('fit', fit);

  const queryString = params.toString();
  return queryString ? `${src}?${queryString}` : src;
}

/**
 * Generate srcset for responsive images
 */
export function generateSrcSet(
  src: string,
  widths: number[],
  options: {
    format?: ImageFormat;
    quality?: number;
  } = {}
): string {
  const { format = 'webp', quality = imageQuality.card } = options;

  return widths
    .map((width) => {
      const url = getOptimizedImageUrl(src, { width, format, quality });
      return `${url} ${width}w`;
    })
    .join(', ');
}

/**
 * Generate sizes attribute for responsive images
 */
export function generateSizes(breakpoints: { maxWidth?: string; size: string }[]): string {
  return breakpoints
    .map(({ maxWidth, size }) => (maxWidth ? `(max-width: ${maxWidth}) ${size}` : size))
    .join(', ');
}

/**
 * Common sizes configurations
 */
export const commonSizes = {
  articleCard: generateSizes([
    { maxWidth: '640px', size: '100vw' },
    { maxWidth: '1024px', size: '50vw' },
    { size: '33vw' },
  ]),
  productCard: generateSizes([
    { maxWidth: '640px', size: '50vw' },
    { maxWidth: '1024px', size: '25vw' },
    { size: '20vw' },
  ]),
  heroImage: generateSizes([
    { maxWidth: '640px', size: '100vw' },
    { size: '100vw' },
  ]),
  thumbnail: generateSizes([
    { maxWidth: '640px', size: '100px' },
    { size: '150px' },
  ]),
};

/**
 * Get placeholder image URL
 */
export function getPlaceholderImage(
  width: number = 100,
  height: number = 100,
  text: string = 'Image'
): string {
  // Using a simple placeholder service
  return `https://placehold.co/${width}x${height}/e2e8f0/64748b?text=${encodeURIComponent(text)}`;
}

/**
 * Generate blur data URL for image placeholder
 */
export function generateBlurDataURL(width: number = 10, height: number = 10): string {
  // Simple gray blur placeholder
  const canvas = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Crect fill='%23e2e8f0' width='${width}' height='${height}'/%3E%3C/svg%3E`;
  return canvas;
}

/**
 * Image alt text generator helper
 */
export function generateAltText(
  productName: string,
  context: 'product' | 'hero' | 'thumbnail' | 'gallery' = 'product'
): string {
  const contexts = {
    product: `${productName} - Product Image`,
    hero: `${productName} - Hero Image`,
    thumbnail: `${productName} - Thumbnail`,
    gallery: `${productName} - Gallery Image`,
  };
  return contexts[context];
}

/**
 * Check if image URL is valid
 */
export function isValidImageUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url, siteConfig.siteUrl);
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg'];
    const hasValidExtension = validExtensions.some((ext) => 
      parsedUrl.pathname.toLowerCase().endsWith(ext)
    );
    return hasValidExtension || parsedUrl.pathname.includes('/images/');
  } catch {
    return false;
  }
}

/**
 * Get image dimensions from URL (for known patterns)
 */
export function getImageDimensions(
  url: string
): { width: number; height: number } | null {
  // Extract dimensions from URL patterns like /400x300/image.jpg
  const dimensionMatch = url.match(/\/(\d+)x(\d+)\//);
  if (dimensionMatch) {
    return {
      width: parseInt(dimensionMatch[1], 10),
      height: parseInt(dimensionMatch[2], 10),
    };
  }
  return null;
}

/**
 * Calculate aspect ratio
 */
export function calculateAspectRatio(width: number, height: number): number {
  return width / height;
}

/**
 * Get image preset by name
 */
export function getImagePreset(preset: keyof typeof imagePresets) {
  return imagePresets[preset];
}

/**
 * Lazy loading threshold configuration
 */
export const lazyLoadingConfig = {
  rootMargin: '50px 0px',
  threshold: 0.01,
};

/**
 * Preload critical images
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Get responsive image props for Astro Image component
 */
export function getResponsiveImageProps(
  src: string,
  preset: keyof typeof imagePresets,
  options: {
    alt: string;
    loading?: 'lazy' | 'eager';
    class?: string;
  }
) {
  const { width, height } = imagePresets[preset];
  return {
    src,
    width,
    height,
    alt: options.alt,
    loading: options.loading || 'lazy',
    class: options.class,
    format: 'webp',
  };
}

export default {
  imagePresets,
  imageQuality,
  getOptimizedImageUrl,
  generateSrcSet,
  generateSizes,
  commonSizes,
  getPlaceholderImage,
  generateBlurDataURL,
  generateAltText,
  isValidImageUrl,
  getImageDimensions,
  calculateAspectRatio,
  getImagePreset,
  lazyLoadingConfig,
  preloadImage,
  getResponsiveImageProps,
};
