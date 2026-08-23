'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Search, 
  ArrowRight, 
  Star,
  CheckCircle,
  Zap,
  TrendingDown
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() || selectedCategory) {
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.set('q', searchQuery.trim());
      if (selectedCategory) params.set('category', selectedCategory);
      router.push(`/search?${params.toString()}`);
    } else {
      router.push('/search');
    }
  };

  const trustBadges = [
    {
      title: '100% Genuine Deals',
      desc: 'Direct Amazon India Links',
      icon: ShieldCheck,
      color: 'text-[#00F5A0]',
      bg: 'bg-[#00F5A0]/10',
    },
    {
      title: 'Lab Tested & Reviewed',
      desc: 'Acoustics & Battery Benchmarks',
      icon: Star,
      color: 'text-[#FFB800]',
      bg: 'bg-[#FFB800]/10',
    },
    {
      title: 'Strict ₹2,000 Cap',
      desc: 'Maximum Value for Money',
      icon: TrendingDown,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      title: 'Daily Price Drops',
      desc: 'Real-time Live Sync',
      icon: Zap,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
  ];

  return (
    <section className="relative pt-8 pb-16 overflow-hidden bg-gradient-to-b from-[#06080F] via-[#0B0F19] to-[#06080F]">
      
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#FFB800]/10 via-[#00F5A0]/5 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Top Benchmark Tag Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B0F19] border border-[#FFB800]/30 shadow-[0_0_15px_rgba(255,184,0,0.15)] mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB800] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFB800]"></span>
          </span>
          <span className="text-[11px] font-mono font-bold tracking-wider text-slate-200 uppercase">
            ENGINEERING BENCHMARKS • TAG: <span className="text-[#FFB800]">budgettechpro-21</span>
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-4 max-w-4xl mx-auto">
          Best Budget Tech Products Under <span className="gradient-text-gold">₹2,000</span> in India
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl font-bold text-[#00F5A0] mb-4">
          Honest Reviews, In-Depth Comparisons & Curated Deals
        </p>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
          We test frequency response curves, verify actual battery life, and curate verified daily price drops so you get the highest quality tech on a budget.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Link
            href="/top-5"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl btn-primary text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2"
          >
            Explore Top 5 Ranked <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/categories"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl btn-secondary text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2"
          >
            Browse Categories
          </Link>
        </div>

        {/* High-Performance Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <form
            onSubmit={handleSearch}
            className="relative flex shadow-2xl rounded-2xl overflow-hidden border border-white/10 bg-[#0B0F19]/90 backdrop-blur-xl hover:border-[#FFB800]/40 transition-all"
          >
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="hidden sm:block px-4 py-4 text-xs bg-transparent text-slate-300 border-r border-white/10 focus:outline-none focus:bg-[#111827] cursor-pointer"
            >
              <option value="">All Categories</option>
              <option value="bluetooth-earbuds">Earbuds</option>
              <option value="power-banks">Power Banks</option>
              <option value="smartwatches">Smartwatches</option>
              <option value="fast-chargers-cables">Chargers & Cables</option>
              <option value="laptop-accessories">Laptop Accessories</option>
            </select>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, reviews, guides..."
              className="flex-1 px-5 py-4 text-xs sm:text-sm text-white bg-transparent focus:outline-none placeholder:text-slate-500"
            />

            <button
              type="submit"
              className="px-6 py-4 bg-gradient-to-r from-[#FFE500] via-[#FFB800] to-[#FF7A00] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:opacity-95 transition-opacity"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline">Search</span>
            </button>
          </form>

          {/* Quick Search Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-slate-400">
            <span className="text-slate-500 font-medium">Popular:</span>
            <Link href="/categories/bluetooth-earbuds" className="text-slate-300 hover:text-[#FFB800] transition-colors">
              Earbuds under ₹1000
            </Link>
            <span className="text-slate-600">•</span>
            <Link href="/categories/smartwatches" className="text-slate-300 hover:text-[#FFB800] transition-colors">
              Smartwatches under ₹2000
            </Link>
            <span className="text-slate-600">•</span>
            <Link href="/categories/power-banks" className="text-slate-300 hover:text-[#FFB800] transition-colors">
              Power Banks 20000mAh
            </Link>
          </div>
        </div>

        {/* 4 Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {trustBadges.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <div
                key={i}
                className="p-4 rounded-2xl bg-[#0B0F19]/80 border border-white/5 hover:border-[#FFB800]/30 transition-all flex flex-col items-center justify-center text-center shadow-lg hover:-translate-y-1"
              >
                <div className={`w-10 h-10 rounded-xl ${badge.bg} ${badge.color} flex items-center justify-center mb-2`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-white mb-0.5">{badge.title}</div>
                <div className="text-[11px] text-slate-400">{badge.desc}</div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Decorative Golden Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFB800]/30 to-transparent" />
    </section>
  );
};
