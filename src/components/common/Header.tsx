'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  Search, 
  Headphones, 
  BatteryCharging, 
  Watch, 
  Zap, 
  Laptop, 
  Sparkles, 
  ChevronDown, 
  TrendingUp, 
  Award, 
  BookOpen 
} from 'lucide-react';

const CATEGORIES = [
  { name: 'Bluetooth Earbuds', slug: 'bluetooth-earbuds', icon: Headphones, desc: 'TWS & Neckbands under ₹2000' },
  { name: 'Power Banks', slug: 'power-banks', icon: BatteryCharging, desc: '10000mAh & 20000mAh fast charge' },
  { name: 'Smartwatches', slug: 'smartwatches', icon: Watch, desc: 'Calling watches & fitness trackers' },
  { name: 'Fast Chargers & Cables', slug: 'fast-chargers-cables', icon: Zap, desc: 'GaN chargers & Type-C cables' },
  { name: 'Laptop Accessories', slug: 'laptop-accessories', icon: Laptop, desc: 'Stands, mice & hubs' },
  { name: 'Gadgets Under ₹999', slug: 'budget-gadgets-under-999', icon: Sparkles, desc: 'High value affordable picks' },
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoryDropdownOpen(false);
  }, [pathname]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#06080F]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3' : 'bg-[#06080F]/60 backdrop-blur-md py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FFB800] via-[#FF7A00] to-[#FFE500] p-[2px] shadow-lg group-hover:shadow-[0_0_20px_rgba(255,184,0,0.4)] transition-all">
              <div className="w-full h-full bg-[#06080F] rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FFB800] to-[#FFE500] text-xl">B</span>
              </div>
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white block leading-none">
                BudgetTech<span className="text-[#FFB800]">India</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
                Best Gadgets Under ₹2000
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link 
              href="/" 
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === '/' ? 'text-[#FFB800] bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </Link>

            {/* Categories Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setCategoryDropdownOpen(true)}
              onMouseLeave={() => setCategoryDropdownOpen(false)}
            >
              <button 
                className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 flex items-center gap-1.5 transition-colors"
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              >
                Categories
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${categoryDropdownOpen ? 'rotate-180 text-[#FFB800]' : ''}`} />
              </button>

              {/* Mega Menu Dropdown */}
              {categoryDropdownOpen && (
                <div className="absolute top-full left-0 w-80 pt-2 z-50">
                  <div className="glass-panel p-3 rounded-2xl shadow-2xl border border-white/10 bg-[#0B0F19]/95 backdrop-blur-2xl">
                    <div className="grid gap-1">
                      {CATEGORIES.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <Link
                            key={cat.slug}
                            href={`/categories/${cat.slug}`}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all group"
                          >
                            <div className="p-2 rounded-lg bg-white/5 text-[#FFB800] group-hover:bg-[#FFB800] group-hover:text-black transition-colors mt-0.5">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-white group-hover:text-[#FFB800] transition-colors">
                                {cat.name}
                              </div>
                              <div className="text-xs text-slate-400 leading-snug">
                                {cat.desc}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="mt-2 pt-2 border-t border-white/5 text-center">
                      <Link href="/categories" className="text-xs text-[#FFB800] hover:underline font-semibold">
                        View All Categories →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link 
              href="/top-5" 
              className={`px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors ${
                pathname.startsWith('/top-5') ? 'text-[#FFB800] bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Award className="w-4 h-4 text-[#FFB800]" />
              Top 5 Picks
            </Link>

            <Link 
              href="/reviews" 
              className={`px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors ${
                pathname.startsWith('/reviews') ? 'text-[#FFB800] bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-[#00F5A0]" />
              Reviews
            </Link>

            <Link 
              href="/blog" 
              className={`px-3.5 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors ${
                pathname.startsWith('/blog') ? 'text-[#FFB800] bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-4 h-4 text-purple-400" />
              Guides
            </Link>
          </nav>

          {/* Right Action Icons & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <Link
              href="/search"
              aria-label="Search deals"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/5 flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-[#FFB800]" />
              <span className="hidden sm:inline text-xs text-slate-400">Search gadgets...</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/5"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#FFB800]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-6 pt-2 border-t border-white/10 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="grid gap-2">
              <Link 
                href="/" 
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/5 flex items-center justify-between"
              >
                Home
              </Link>
              <Link 
                href="/categories" 
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/5 flex items-center justify-between"
              >
                All Categories
              </Link>

              {/* Sub-categories in Mobile */}
              <div className="pl-4 pr-2 grid gap-1 border-l-2 border-[#FFB800]/30 my-1">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    className="py-1.5 px-2 text-xs text-slate-400 hover:text-[#FFB800]"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>

              <Link 
                href="/top-5" 
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/5 flex items-center gap-2"
              >
                <Award className="w-4 h-4 text-[#FFB800]" />
                Top 5 Ranked Lists
              </Link>
              <Link 
                href="/reviews" 
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/5 flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4 text-[#00F5A0]" />
                In-Depth Reviews
              </Link>
              <Link 
                href="/blog" 
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/5 flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-purple-400" />
                Buying Guides
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
