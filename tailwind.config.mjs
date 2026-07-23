// @ts-check
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.astro', './src/**/*.ts', './src/**/*.tsx'],
  theme: {
    // Perfect responsive breakpoints for all devices
    screens: {
      'xs': '360px',      // Extra small phones (Galaxy Fold, etc.)
      'sm': '640px',      // Small tablets
      'md': '768px',      // Tablets
      'lg': '1024px',     // Laptops
      'xl': '1280px',     // Desktops
      '2xl': '1536px',    // Large screens
      '3xl': '1920px',    // Full HD screens
    },
    extend: {
       colors: {
         // Light Theme Colors
         light: {
           // Blue - Primary
           primary: '#3B82F6',
           'primary-light': '#60A5FA',
           'primary-dark': '#2563EB',
           // Purple - Secondary
           secondary: '#8B5CF6',
           'secondary-light': '#A78BFA',
           'secondary-dark': '#7C3AED',
           // Green - Accent
           accent: '#10B981',
           'accent-light': '#34D399',
           'accent-dark': '#059669',
           // Background
           background: '#FFFFFF',
           surface: '#F9FAFB',
           'surface-light': '#F3F4F6',
           'surface-dark': '#E5E7EB',
           // Text Colors
           text: '#1F2937',
           'text-secondary': '#6B7280',
           'text-tertiary': '#9CA3AF',
           'text-inverse': '#FFFFFF',
           // Border Colors
           border: '#E5E7EB',
           'border-light': '#F3F4F6',
           'border-dark': '#D1D5DB',
           // Status Colors
           success: '#10B981',
           warning: '#F59E0B',
           error: '#EF4444',
           info: '#3B82F6',
         },
        // Premium Dark Theme - Core Palette
        midnight: {
          DEFAULT: '#06080F',
          light: '#0B0F19',
          dark: '#030408',
          50: '#1E293B',
          100: '#151D2A',
          200: '#0F172A',
          300: '#0B0F19',
          400: '#080C14',
          500: '#06080F',
          600: '#04060A',
          700: '#030408',
          800: '#020305',
          900: '#010103',
        },
        // Slate Teal - Secondary Sections
        slate: {
          DEFAULT: '#0F172A',
          light: '#1E293B',
          dark: '#0A0F1D',
          50: '#334155',
          100: '#1E293B',
          200: '#151E2E',
          300: '#0F172A',
          400: '#0B1120',
          500: '#0F172A',
          600: '#0A0F1D',
          700: '#070A14',
          800: '#04060B',
          900: '#020305',
        },
        // Warm Off-White - Main Text
        cream: {
          DEFAULT: '#F8FAFC',
          dark: '#E2E8F0',
          light: '#FFFFFF',
          50: '#FFFFFF',
          100: '#F8FAFC',
          200: '#F1F5F9',
          300: '#E2E8F0',
          400: '#CBD5E1',
          500: '#94A3B8',
          600: '#64748B',
          700: '#475569',
          800: '#334155',
          900: '#1E293B',
        },
        // Electric Gold & Copper - Accent / CTA
        copper: {
          DEFAULT: '#FFB800',
          light: '#FFE500',
          dark: '#FF7A00',
          50: '#FFFBE6',
          100: '#FFF3B3',
          200: '#FFE680',
          300: '#FFD700',
          400: '#FFB800',
          500: '#FF9900',
          600: '#FF7A00',
          700: '#CC5E00',
          800: '#994400',
          900: '#662B00',
        },
        // Hyper Cyan & Emerald Highlight
        sand: {
          DEFAULT: '#00F5A0',
          dark: '#00D084',
          light: '#3BFFB6',
          50: '#E6FFF5',
          100: '#B3FFE0',
          200: '#80FFCC',
          300: '#3BFFB6',
          400: '#00F5A0',
          500: '#00D084',
          600: '#00B06F',
          700: '#008C58',
          800: '#006640',
          900: '#004028',
        },
        // Cyber Violet & Indigo Accent
        violet: {
          DEFAULT: '#8B5CF6',
          light: '#A78BFA',
          dark: '#7C3AED',
          glow: '#6366F1',
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        // Surface Colors for Dark Theme
        surface: {
          primary: '#06080F',
          secondary: '#0B0F19',
          tertiary: '#111827',
          elevated: 'rgba(17, 24, 39, 0.75)',
          overlay: 'rgba(6, 8, 15, 0.92)',
        },
        // Border Colors
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          light: 'rgba(255, 255, 255, 0.15)',
          dark: 'rgba(255, 255, 255, 0.04)',
          subtle: 'rgba(255, 255, 255, 0.06)',
          glow: 'rgba(255, 184, 0, 0.3)',
        },
        // Muted Text
        muted: {
          DEFAULT: '#94A3B8',
          light: '#CBD5E1',
          dark: '#64748B',
        },
        // Status Colors - Adapted for Dark Theme
        success: {
          50: '#E6FFF5',
          100: '#CCFFEA',
          200: '#99FFD6',
          300: '#66FFC2',
          400: '#33FFB8',
          500: '#00F5A0',
          600: '#00D084',
          700: '#00A36B',
          800: '#008254',
          900: '#00613D',
        },
        error: {
          50: '#FFE6EB',
          100: '#FFCCD6',
          200: '#FF99AE',
          300: '#FF6685',
          400: '#FF335C',
          500: '#FF0055',
          600: '#DB0048',
          700: '#B8003C',
          800: '#940030',
          900: '#700024',
        },
        warning: {
          50: '#FEF3C7',
          100: '#FDE68A',
          200: '#FCD34D',
          300: '#FBBF24',
          400: '#FFB800',
          500: '#FF9900',
          600: '#FF7A00',
          700: '#92400E',
          800: '#78350F',
          900: '#451A03',
        },
        info: {
          50: '#E6F0FF',
          100: '#CCE0FF',
          200: '#99C2FF',
          300: '#66A3FF',
          400: '#3385FF',
          500: '#00E5FF',
          600: '#00B8D4',
          700: '#008B8B',
          800: '#005E5E',
          900: '#003333',
        },
        // Star Rating Gold - Adapted
        star: {
          gold: '#FFD700',
          'gold-light': '#FFE500',
          empty: '#334155',
        },
        // Deal/Sale Colors
        deal: {
          green: '#00F5A0',
          copper: '#FFB800',
          red: '#FF0055',
        },
      },
      fontFamily: {
        // Clean, modern sans-serif
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        // Headings
        heading: ['Space Grotesk', 'Outfit', 'sans-serif'],
        // Monospace for code/prices
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        // Display sizes
        'display-2xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '700' }],
        'display-sm': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        // Heading sizes
        h1: ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '700' }],
        h2: ['2rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        h3: ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.005em', fontWeight: '600' }],
        h4: ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        h5: ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
        h6: ['1rem', { lineHeight: '1.5', fontWeight: '600' }],
        // Body sizes
        'body-xl': ['1.25rem', { lineHeight: '1.75' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
        'body-md': ['1rem', { lineHeight: '1.75' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'body-xs': ['0.75rem', { lineHeight: '1.5' }],
        // Legacy support
        display: ['3rem', { lineHeight: '1.1', fontWeight: '700' }],
        small: ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
      },
      borderRadius: {
        'sm': '0.25rem',
        'DEFAULT': '0.5rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        // Dark theme shadows - Ultra-luxurious
        'soft': '0 4px 20px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.2)',
        'soft-md': '0 8px 30px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'soft-lg': '0 15px 40px rgba(0, 0, 0, 0.6), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
        'soft-xl': '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        // Card shadows for dark theme
        'card': '0 4px 15px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 12px 30px rgba(0, 0, 0, 0.7), 0 8px 12px rgba(0, 0, 0, 0.5)',
        'card-active': '0 16px 40px rgba(0, 0, 0, 0.8), 0 10px 16px rgba(0, 0, 0, 0.6)',
        // Button shadows
        'btn': '0 2px 8px rgba(0, 0, 0, 0.4)',
        'btn-hover': '0 4px 12px rgba(0, 0, 0, 0.6)',
        'btn-active': '0 1px 2px rgba(0, 0, 0, 0.5) inset',
        // CTA shadow (Copper Gold button)
        'cta': '0 4px 15px rgba(245, 158, 11, 0.3)',
        'cta-hover': '0 8px 25px rgba(245, 158, 11, 0.5)',
        // Glow effects for dark theme
        'glow-copper': '0 0 25px rgba(245, 158, 11, 0.4)',
        'glow-sand': '0 0 25px rgba(0, 230, 153, 0.3)',
        'glow-success': '0 0 25px rgba(0, 230, 153, 0.4)',
        // Inset shadow
        'inset-soft': 'inset 0 1px 2px rgba(0, 0, 0, 0.3)',
        // Elevated card glow
        'elevated': '0 4px 25px rgba(0, 0, 0, 0.6), 0 0 50px rgba(245, 158, 11, 0.08)',
      },
      backgroundImage: {
        // Copper Gold gradient for CTAs
        'gradient-cta': 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
        'gradient-cta-hover': 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        // Deep Obsidian gradient
        'gradient-primary': 'linear-gradient(135deg, #0E1821 0%, #070B0E 100%)',
        'gradient-primary-hover': 'linear-gradient(135deg, #152431 0%, #0E1821 100%)',
        // Hero gradient (Dark premium)
        'gradient-hero': 'linear-gradient(180deg, #070B0E 0%, #0E1821 50%, #070B0E 100%)',
        'gradient-hero-radial': 'radial-gradient(ellipse at top, #152431 0%, #070B0E 70%)',
        // Card gradient for dark theme
        'gradient-card': 'linear-gradient(180deg, #0E1821 0%, #070B0E 100%)',
        // Shine effect for glassmorphism
        'gradient-shine': 'linear-gradient(120deg, transparent 30%, rgba(245, 158, 11, 0.15) 50%, transparent 70%)',
        // Header gradient
        'gradient-header': 'linear-gradient(180deg, #070B0E 0%, #030506 100%)',
        // Mesh gradient for subtle backgrounds
        'mesh-gradient': 'radial-gradient(at 40% 20%, rgba(245, 158, 11, 0.1) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(0, 230, 153, 0.08) 0px, transparent 50%)',
        // Subtle noise texture overlay
        'noise-overlay': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-in-up': 'fadeInUp 0.4s ease-out',
        'fade-in-down': 'fadeInDown 0.4s ease-out',
        'slide-in-left': 'slideInLeft 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-soft': 'bounceSoft 0.4s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'hover-lift': 'hoverLift 0.2s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        hoverLift: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-2px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(196, 106, 58, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(196, 106, 58, 0.5)' },
        },
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'smooth-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [typography, forms],
};
