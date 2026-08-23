'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Headphones, 
  BatteryCharging, 
  Watch, 
  Zap, 
  Laptop, 
  Sparkles, 
  Flame, 
  Award, 
  BookOpen,
  ArrowRightLeft,
  ShoppingBag
} from 'lucide-react';
import { useCompare } from '../compare/CompareContext';

const CATEGORIES = [
  { name: 'Bluetooth Earbuds', slug: 'bluetooth-earbuds', icon: Headphones, desc: 'TWS under ₹2,000 with ANC & low latency' },
  { name: 'Power Banks', slug: 'power-banks', icon: BatteryCharging, desc: '10000mAh & 20000mAh fast-charging packs' },
  { name: 'Smartwatches', slug: 'smartwatches', icon: Watch, desc: 'BT calling & AMOLED displays under ₹2k' },
  { name: 'Fast Chargers & Cables', slug: 'fast-chargers-cables', icon: Zap, desc: 'GaN adapters & durable braided Type-C cords' },
  { name: 'Laptop Accessories', slug: 'laptop-accessories', icon: Laptop, desc: 'Stands, hubs, wireless mice & keyboards' },
  { name: 'Gadgets Under ₹999', slug: 'budget-gadgets-under-999', icon: Sparkles, desc: 'Extreme-value budget tech gifts' },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { compareList, setIsDrawerOpen } = useCompare();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoriesOpen(false);
  }, [pathname]);

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-[#06080F]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3' 
        : 'bg-[#06080F]/80 backdrop-blur-md border-b border-white/5 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF7A00] to-[#FFE500] p-0.5 shadow-glow-gold flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#06080F] rounded-[14px] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-[#FFB800]" />
              </div>
            </div>
            <div className="flex items-center tracking-tight font-black text-xl">
              <span className="text-white">Budget</span>
              <span className="gradient-text-gold ml-1">Tech</span>
              <span className="ml-1.5 px-2 py-0.5 text-[10px] uppercase font-black tracking-widest rounded-md bg-[#00F5A0]/10 text-[#00F5A0] border border-[#00F5A0]/20">
                India
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                pathname === '/' ? 'text-[#FFB800] bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </Link>

            {/* Categories Dropdown Mega Menu */}
            <div className="relative group">
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                onMouseEnter={() => setCategoriesOpen(true)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                  pathname.startsWith('/categories') ? 'text-[#FFB800] bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Categories</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${categoriesOpen ? 'rotate-180 text-[#FFB800]' : ''}`} />
              </button>

              {/* Mega Dropdown */}
              {categoriesOpen && (
                <div
                  onMouseLeave={() => setCategoriesOpen(false)}
                  className="absolute top-full left-0 w-96 p-4 rounded-3xl bg-[#0B0F19] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(255,184,0,0.15)] animate-in fade-in slide-in-from-top-2 duration-200 grid grid-cols-1 gap-2"
                >
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-3 pt-1 pb-2 border-b border-white/5 flex items-center justify-between">
                    <span>Curated Product Hubs</span>
                    <Link href="/categories" className="text-[#FFB800] hover:underline">View All</Link>
                  </div>
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <Link
                        key={cat.slug}
                        href={`/categories/${cat.slug}`}
                        className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-white/5 transition-colors group/item"
                      >
                        <div className="p-2 rounded-xl bg-white/5 group-hover/item:bg-[#FFB800]/10 text-slate-300 group-hover/item:text-[#FFB800] transition-colors shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover/item:text-[#FFB800] transition-colors">
                            {cat.name}
                          </div>
                          <div className="text-[11px] text-slate-400 leading-tight">
                            {cat.desc}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              href="/top-5"
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                pathname.startsWith('/top-5') ? 'text-[#FFB800] bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-[#FFB800]" />
              <span>Top 5 Lists</span>
            </Link>

            <Link
              href="/reviews"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                pathname.startsWith('/reviews') ? 'text-[#FFB800] bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Reviews
            </Link>

            <Link
              href="/blog"
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                pathname.startsWith('/blog') ? 'text-[#FFB800] bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Buying Guides
            </Link>
          </nav>

          {/* Right Action Icons: Search & Compare & Menu Toggle */}
          <div className="flex items-center gap-3">
            
            {/* Compare Pill Trigger */}
            {compareList.length > 0 && (
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] text-xs font-bold flex items-center gap-1.5 hover:bg-[#FFB800]/20 transition-all"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>Compare ({compareList.length})</span>
              </button>
            )}

            {/* Instant Search Button */}
            <Link
              href="/search"
              aria-label="Open product search"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-[#FFB800] border border-white/5 transition-all flex items-center gap-2 text-xs"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline font-semibold">Search Deals</span>
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2.5 rounded-xl bg-white/5 text-slate-300 hover:text-white border border-white/5 lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 pb-6 border-t border-white/10 animate-in fade-in duration-200 space-y-3">
            <Link
              href="/"
              className="block px-4 py-2.5 rounded-xl text-sm font-bold text-white hover:bg-white/5"
            >
              Home
            </Link>
            <Link
              href="/categories"
              className="block px-4 py-2.5 rounded-xl text-sm font-bold text-white hover:bg-white/5"
            >
              All Categories
            </Link>
            <Link
              href="/top-5"
              className="block px-4 py-2.5 rounded-xl text-sm font-bold text-[#FFB800] hover:bg-white/5"
            >
              🏆 Top 5 Ranked Lists
            </Link>
            <Link
              href="/reviews"
              className="block px-4 py-2.5 rounded-xl text-sm font-bold text-white hover:bg-white/5"
            >
              Editorial Reviews
            </Link>
            <Link
              href="/blog"
              className="block px-4 py-2.5 rounded-xl text-sm font-bold text-white hover:bg-white/5"
            >
              Buying Guides
            </Link>
            <Link
              href="/search"
              className="block px-4 py-2.5 rounded-xl text-sm font-bold text-[#00F5A0] hover:bg-white/5"
            >
              🔍 Search All Products
            </Link>
          </div>
        )}

      </div>
    </header>
  );
};
