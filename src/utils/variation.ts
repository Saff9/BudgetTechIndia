import variations from '../data/variations.json';

export type VariationType = 'dark' | 'light';

export interface VariationConfig {
  name: string;
  description: string;
  colorScheme: 'dark' | 'light';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
  };
  features: {
    glassEffects: boolean;
    animations: boolean;
    gradientBackgrounds: boolean;
  };
  styles: string;
}

// Get default variation from environment variable
export const getDefaultVariation = (): VariationType => {
  return import.meta.env.PUBLIC_DEFAULT_VARIATION as VariationType || 'dark';
};

// Get active variation from localStorage or default
export const getActiveVariation = (): VariationType => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('variation');
    if (stored && (stored === 'dark' || stored === 'light')) {
      return stored as VariationType;
    }
  }
  return getDefaultVariation();
};

// Set active variation
export const setActiveVariation = (variation: VariationType): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('variation', variation);
    // Dispatch event to notify components
    window.dispatchEvent(new CustomEvent('variationchange', { detail: variation }));
  }
};

// Get variation configuration
export const getVariationConfig = (variation: VariationType = getActiveVariation()): VariationConfig => {
  return variations[variation] as VariationConfig;
};

// Toggle between variations
export const toggleVariation = (): VariationType => {
  const current = getActiveVariation();
  const next = current === 'dark' ? 'light' : 'dark';
  setActiveVariation(next);
  return next;
};

// Check if dark theme is active
export const isDarkTheme = (): boolean => {
  return getActiveVariation() === 'dark';
};

// Check if light theme is active
export const isLightTheme = (): boolean => {
  return getActiveVariation() === 'light';
};