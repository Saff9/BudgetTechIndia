/**
 * Site Configuration
 * Central configuration file for BudgetTechIndia
 * Contains all site-wide settings, SEO defaults, and social media links
 */

export const siteConfig = {
  // Basic Site Information
  name: 'BudgetTechIndia',
  shortName: 'BTI',
  tagline: 'Best Budget Tech Products in India',
  description: 'Your trusted source for budget-friendly tech product reviews, comparisons, and buying guides in India. Find the best gadgets under ₹500, ₹1000, ₹2000, and more.',
  
  // URLs
  siteUrl: 'https://budgettechindia.com',
  siteName: 'BudgetTechIndia',
  
  // Contact Information
  contact: {
    email: 'contact@budgettechindia.com',
    supportEmail: 'support@budgettechindia.com',
    businessEmail: 'business@budgettechindia.com',
  },
  
  // Social Media Links
  social: {
    twitter: {
      handle: '@BudgetTechIndia',
      url: 'https://twitter.com/BudgetTechIndia',
    },
    facebook: {
      handle: 'BudgetTechIndia',
      url: 'https://facebook.com/BudgetTechIndia',
    },
    instagram: {
      handle: '@budgettechindia',
      url: 'https://instagram.com/budgettechindia',
    },
    youtube: {
      handle: 'BudgetTechIndia',
      url: 'https://youtube.com/@BudgetTechIndia',
    },
    telegram: {
      handle: 'BudgetTechIndia',
      url: 'https://t.me/BudgetTechIndia',
    },
    linkedin: {
      handle: 'BudgetTechIndia',
      url: 'https://linkedin.com/company/budgettechindia',
    },
  },
  
  // Author Information
  author: {
    name: 'BudgetTechIndia Team',
    email: 'team@budgettechindia.com',
  },
  
  // Default SEO Values
  seo: {
    defaultTitle: 'BudgetTechIndia - Best Budget Tech Products in India',
    titleTemplate: '%s | BudgetTechIndia',
    defaultDescription: 'Your trusted source for budget-friendly tech product reviews, comparisons, and buying guides in India. Find the best gadgets under ₹500, ₹1000, ₹2000, and more.',
    defaultKeywords: [
      'budget tech india',
      'tech reviews india',
      'budget gadgets india',
      'best earbuds under 1000',
      'best power bank under 1500',
      'budget smartphones india',
      'tech buying guide india',
      'product comparison india',
      'affordable gadgets',
      'indian tech reviews',
    ],
    defaultOgImage: '/images/og/default-og-image.png',
    twitterCard: 'summary_large_image',
    twitterSite: '@BudgetTechIndia',
    language: 'en-IN',
    locale: 'en_IN',
    robots: 'index, follow',
  },
  
  // Site Settings
  settings: {
    postsPerPage: 12,
    productsPerPage: 10,
    searchResultsPerPage: 20,
    cacheMaxAge: 3600, // 1 hour
    dateFormat: 'DD MMMM YYYY',
    currency: 'INR',
    currencySymbol: '₹',
  },
  
  // Navigation
  navigation: {
    main: [
      { name: 'Home', href: '/' },
      { name: 'Reviews', href: '/reviews/' },
      { name: 'Categories', href: '/categories/' },
      { name: 'Top 5 Lists', href: '/top-5/' },
      { name: 'Blog', href: '/blog/' },
      { name: 'About', href: '/about/' },
    ],
    footer: [
      { name: 'About Us', href: '/about/' },
      { name: 'Contact', href: '/contact/' },
      { name: 'Privacy Policy', href: '/privacy-policy/' },
      { name: 'Terms & Conditions', href: '/terms-conditions/' },
      { name: 'Affiliate Disclosure', href: '/affiliate-disclosure/' },
    ],
    social: [
      { name: 'Twitter', href: 'https://twitter.com/BudgetTechIndia', icon: 'twitter' },
      { name: 'Facebook', href: 'https://facebook.com/BudgetTechIndia', icon: 'facebook' },
      { name: 'Instagram', href: 'https://instagram.com/budgettechindia', icon: 'instagram' },
      { name: 'YouTube', href: 'https://youtube.com/@BudgetTechIndia', icon: 'youtube' },
      { name: 'Telegram', href: 'https://t.me/BudgetTechIndia', icon: 'telegram' },
    ],
  },
  
  // Categories
  categories: {
    earbuds: {
      name: 'Earbuds',
      slug: 'earbuds',
      description: 'Best budget wireless earbuds in India',
      icon: 'headphones',
    },
    smartwatches: {
      name: 'Smartwatches',
      slug: 'smartwatches',
      description: 'Best budget smartwatches in India',
      icon: 'watch',
    },
    powerBanks: {
      name: 'Power Banks',
      slug: 'power-banks',
      description: 'Best budget power banks in India',
      icon: 'battery',
    },
    speakers: {
      name: 'Speakers',
      slug: 'speakers',
      description: 'Best budget Bluetooth speakers in India',
      icon: 'speaker',
    },
    headphones: {
      name: 'Headphones',
      slug: 'headphones',
      description: 'Best budget headphones in India',
      icon: 'headphones',
    },
    accessories: {
      name: 'Accessories',
      slug: 'accessories',
      description: 'Best budget tech accessories in India',
      icon: 'cable',
    },
  },
  
  // Price Ranges
  priceRanges: [
    { label: 'Under ₹500', min: 0, max: 500, slug: 'under-500' },
    { label: 'Under ₹1000', min: 0, max: 1000, slug: 'under-1000' },
    { label: 'Under ₹1500', min: 0, max: 1500, slug: 'under-1500' },
    { label: 'Under ₹2000', min: 0, max: 2000, slug: 'under-2000' },
    { label: 'Under ₹3000', min: 0, max: 3000, slug: 'under-3000' },
    { label: 'Under ₹5000', min: 0, max: 5000, slug: 'under-5000' },
  ],
  
  // Affiliate Settings
  affiliate: {
    amazonAssociateId: 'budgettechindia-21',
    flipkartAffiliateId: 'budgettechindia',
    disclaimer: 'We may earn a commission when you buy through links on our site.',
  },
  
  // Analytics
  analytics: {
    googleAnalyticsId: 'G-XXXXXXXXXX',
    googleTagManagerId: 'GTM-XXXXXXX',
    microsoftClarityId: 'xxxxxxxxxx',
  },
  
  // Features
  features: {
    newsletter: true,
    search: true,
    darkMode: true,
    printFriendly: true,
  },
  
  // Theme Colors
  theme: {
    primaryColor: '#2563eb',
    secondaryColor: '#1e40af',
    accentColor: '#f59e0b',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    darkMode: {
      primaryColor: '#3b82f6',
      secondaryColor: '#60a5fa',
      accentColor: '#fbbf24',
      backgroundColor: '#111827',
      textColor: '#f9fafb',
    },
  },
} as const;

// Export individual sections for convenience
export const {
  name,
  shortName,
  tagline,
  description,
  siteUrl,
  contact,
  social,
  author,
  seo,
  settings,
  navigation,
  categories,
  priceRanges,
  affiliate,
  analytics,
  features,
  theme,
} = siteConfig;

// Helper functions
export function getFullUrl(path: string = ''): string {
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function getPageTitle(title: string): string {
  return seo.titleTemplate.replace('%s', title);
}

export function getSocialLink(platform: keyof typeof social): string {
  return social[platform]?.url || '';
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: settings.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d);
}

export function getKeywordsString(keywords: string[]): string {
  return keywords.join(', ');
}

export default siteConfig;
