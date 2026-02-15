// @ts-check
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx}'],
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
         // Midnight Teal - Primary Background
        midnight: {
          DEFAULT: '#0F1F24',
          light: '#1a3640',
          dark: '#0a1619',
          50: '#1a3640',
          100: '#162e37',
          200: '#132a33',
          300: '#10262f',
          400: '#0d2229',
          500: '#0F1F24',
          600: '#0a1619',
          700: '#081214',
          800: '#050e10',
          900: '#030809',
        },
        // Deep Slate - Secondary Sections
        slate: {
          DEFAULT: '#1A2E35',
          light: '#243d46',
          dark: '#142228',
          50: '#243d46',
          100: '#213941',
          200: '#1e353d',
          300: '#1b3139',
          400: '#182d34',
          500: '#1A2E35',
          600: '#142228',
          700: '#101b20',
          800: '#0c1418',
          900: '#080d0f',
        },
        // Warm Off-White - Main Text
        cream: {
          DEFAULT: '#F4F1EA',
          dark: '#e8e4db',
          light: '#faf8f3',
          50: '#faf8f3',
          100: '#F4F1EA',
          200: '#e8e4db',
          300: '#dcd7cc',
          400: '#d0cabd',
          500: '#c4bdae',
          600: '#b8b09f',
          700: '#aca390',
          800: '#a09681',
          900: '#948972',
        },
        // Burnt Copper - Accent / CTA
        copper: {
          DEFAULT: '#C46A3A',
          light: '#d4834f',
          dark: '#a55a30',
          50: '#f5e6dc',
          100: '#f0d7c8',
          200: '#e6b89e',
          300: '#dc9a74',
          400: '#d4834f',
          500: '#C46A3A',
          600: '#a55a30',
          700: '#864a27',
          800: '#67391d',
          900: '#482814',
        },
        // Soft Sand - Subtle Highlight
        sand: {
          DEFAULT: '#E8D8C3',
          dark: '#d4c0a5',
          light: '#f2e8d9',
          50: '#f2e8d9',
          100: '#E8D8C3',
          200: '#d4c0a5',
          300: '#c0a887',
          400: '#ac9069',
          500: '#98784b',
          600: '#7a603c',
          700: '#5c482d',
          800: '#3e301e',
          900: '#20180f',
        },
        // Surface Colors for Dark Theme
        surface: {
          primary: '#0F1F24',
          secondary: '#1A2E35',
          tertiary: '#243d46',
          elevated: '#1A2E35',
          overlay: 'rgba(15, 31, 36, 0.95)',
        },
        // Border Colors
        border: {
          DEFAULT: '#2a4450',
          light: '#3a5a68',
          dark: '#1a3640',
          subtle: '#2a4450',
        },
        // Muted Text
        muted: {
          DEFAULT: '#a8b5ba',
          light: '#b8c5ca',
          dark: '#8a9a9f',
        },
        // Status Colors - Adapted for Dark Theme
        success: {
          50: '#0d2818',
          100: '#0f2e1b',
          200: '#133e24',
          300: '#174e2d',
          400: '#1b5e36',
          500: '#00b207',
          600: '#009906',
          700: '#007705',
          800: '#005504',
          900: '#003302',
        },
        error: {
          50: '#2d0a0a',
          100: '#3d0f0f',
          200: '#5a1616',
          300: '#781d1d',
          400: '#962424',
          500: '#df0000',
          600: '#c20000',
          700: '#a50000',
          800: '#880000',
          900: '#6b0000',
        },
        warning: {
          50: '#2d1f0a',
          100: '#3d2a0f',
          200: '#5a3f16',
          300: '#78541d',
          400: '#966924',
          500: '#ff9f00',
          600: '#e68a00',
          700: '#cc7a00',
          800: '#b36a00',
          900: '#995a00',
        },
        info: {
          50: '#0a1a2d',
          100: '#0f233d',
          200: '#16355a',
          300: '#1d4778',
          400: '#245996',
          500: '#4a90c2',
          600: '#3a7ab0',
          700: '#2a6a9e',
          800: '#1a5a8c',
          900: '#0a4a7a',
        },
        // Star Rating Gold - Adapted
        star: {
          gold: '#ffa41c',
          'gold-light': '#ffb84d',
          empty: '#3a5a68',
        },
        // Deal/Sale Colors
        deal: {
          green: '#00b207',
          copper: '#C46A3A',
          red: '#df0000',
        },
      },
      fontFamily: {
        // Clean, modern sans-serif
        sans: ['Inter', 'Segoe UI', 'Roboto', 'system-ui', 'sans-serif'],
        // Headings
        heading: ['Inter', 'Segoe UI', 'sans-serif'],
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
        // Dark theme shadows
        'soft': '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
        'soft-md': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'soft-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
        'soft-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
        // Card shadows for dark theme
        'card': '0 2px 8px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 20px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(0, 0, 0, 0.4)',
        'card-active': '0 12px 28px rgba(0, 0, 0, 0.6), 0 6px 12px rgba(0, 0, 0, 0.5)',
        // Button shadows
        'btn': '0 1px 2px rgba(0, 0, 0, 0.3)',
        'btn-hover': '0 2px 4px rgba(0, 0, 0, 0.4)',
        'btn-active': '0 1px 2px rgba(0, 0, 0, 0.5) inset',
        // CTA shadow (Copper button)
        'cta': '0 2px 5px rgba(196, 106, 58, 0.4)',
        'cta-hover': '0 4px 12px rgba(196, 106, 58, 0.5)',
        // Glow effects for dark theme
        'glow-copper': '0 0 20px rgba(196, 106, 58, 0.4)',
        'glow-sand': '0 0 20px rgba(232, 216, 195, 0.2)',
        'glow-success': '0 0 20px rgba(0, 178, 7, 0.4)',
        // Inset shadow
        'inset-soft': 'inset 0 1px 2px rgba(0, 0, 0, 0.2)',
        // Elevated card glow
        'elevated': '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(196, 106, 58, 0.05)',
      },
      backgroundImage: {
        // Copper gradient for CTAs
        'gradient-cta': 'linear-gradient(to bottom, #d4834f 0%, #C46A3A 100%)',
        'gradient-cta-hover': 'linear-gradient(to bottom, #C46A3A 0%, #a55a30 100%)',
        // Midnight Teal gradient
        'gradient-primary': 'linear-gradient(to bottom, #1a3640 0%, #0F1F24 100%)',
        'gradient-primary-hover': 'linear-gradient(to bottom, #243d46 0%, #1a3640 100%)',
        // Hero gradient (Dark premium)
        'gradient-hero': 'linear-gradient(180deg, #0F1F24 0%, #1A2E35 50%, #0F1F24 100%)',
        'gradient-hero-radial': 'radial-gradient(ellipse at top, #1a3640 0%, #0F1F24 70%)',
        // Card gradient for dark theme
        'gradient-card': 'linear-gradient(180deg, #1A2E35 0%, #162e37 100%)',
        // Shine effect for dark theme
        'gradient-shine': 'linear-gradient(120deg, transparent 30%, rgba(232, 216, 195, 0.1) 50%, transparent 70%)',
        // Header gradient
        'gradient-header': 'linear-gradient(180deg, #0F1F24 0%, #0a1619 100%)',
        // Mesh gradient for subtle backgrounds
        'mesh-gradient': 'radial-gradient(at 40% 20%, rgba(196, 106, 58, 0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(232, 216, 195, 0.05) 0px, transparent 50%)',
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
