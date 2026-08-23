'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  Flame, 
  Clock, 
  ShoppingCart, 
  ArrowUpRight, 
  Star,
  Search
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  // Countdown Timer for FOMO / live deal drop
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 42, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-6 pb-16 overflow-hidden">
      
      {/* Live Deals Marquee Ticker */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#0B0F19] border border-white/10 shadow-lg text-xs overflow-hidden">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FFB800] text-black font-black uppercase tracking-wider shrink-0 shadow-sm">
            <Flame className="w-3.5 h-3.5 fill-black" /> Live Drops
          </div>
          <div className="flex-1 overflow-x-auto whitespace-nowrap text-slate-300 scrollbar-none flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <strong className="text-white">boAt Airdopes 141:</strong> ₹999 <span className="text-emerald-400 font-bold">(67% OFF)</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-2">
              <strong className="text-white">Ambrane 20000mAh Type-C:</strong> ₹1,599 <span className="text-emerald-400 font-bold">(47% OFF)</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-2">
              <strong className="text-white">Noise ColorFit Pulse 2:</strong> ₹1,299 <span className="text-emerald-400 font-bold">(78% OFF)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Split-Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-[#FFB800]" />
              <span className="text-xs font-bold text-slate-200">
                Editorial Reviews & Verified Deals Under ₹2,000
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.08]">
              Tested Budget Tech. <br />
              <span className="gold-gradient-text">Honest Lab Scores.</span> <br />
              Zero Marketing Fluff.
            </h1>

            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl">
              We tear down audio curves, test real battery discharge times, and track live price drops on Amazon India so you never waste money on overhyped tech.
            </p>

            {/* Quick Search & Filter Trigger */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/search"
                className="px-6 py-4 rounded-2xl bg-[#0B0F19] hover:bg-[#1E293B] text-slate-300 hover:text-white border border-white/10 flex items-center gap-3 text-sm shadow-xl transition-all w-full sm:w-auto"
              >
                <Search className="w-4 h-4 text-[#FFB800]" />
                <span>Search by brand, category, or budget...</span>
                <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-slate-400">⌘K</kbd>
              </Link>

              <Link
                href="/top-5"
                className="px-6 py-4 rounded-2xl bg-gradient-to-r from-[#FFB800] to-[#FF7A00] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(255,184,0,0.35)] hover:scale-105 transition-transform flex items-center gap-2"
              >
                Explore Top 5 Ranked <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Micro-Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 max-w-lg border-t border-white/5 text-[11px] font-bold text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00F5A0]" />
                <span>Tested in India</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#FFB800]" />
                <span>Live Deal Sync</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Strict ₹2000 Cap</span>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Deal of the Day Card */}
          <div className="lg:col-span-5">
            <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0B0F19] to-[#030408] border border-[#FFB800]/30 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(255,184,0,0.15)] overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFB800]/15 rounded-full blur-3xl pointer-events-none" />

              {/* Deal Header */}
              <div className="flex items-center justify-between gap-2 mb-6">
                <span className="px-3 py-1 rounded-full bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/30 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 fill-[#FFB800]" /> Deal of the Day
                </span>
                
                {/* Live Countdown */}
                <div className="flex items-center gap-1 text-xs font-mono font-bold text-slate-300 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                  <Clock className="w-3.5 h-3.5 text-[#00F5A0]" />
                  <span>
                    {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Spotlight Product Image Frame */}
              <div className="w-full h-48 flex items-center justify-center p-4 bg-black/40 rounded-2xl border border-white/5 mb-6 relative">
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-[#FF7A00] text-black text-[11px] font-black uppercase tracking-wider">
                  67% OFF
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://m.media-amazon.com/images/I/61K-84k5wEL._SL1500_.jpg"
                  alt="boAt Airdopes 141 TWS Earbuds"
                  className="max-h-full max-w-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#00F5A0] font-extrabold uppercase tracking-wider">Bluetooth Earbuds</span>
                  <div className="flex items-center gap-1 text-[#FFD700] font-bold">
                    <Star className="w-3.5 h-3.5 fill-[#FFD700]" />
                    <span>4.5 (182k reviews)</span>
                  </div>
                </div>

                <h3 className="text-lg font-black text-white leading-snug">
                  boAt Airdopes 141 ANC (42H Playtime, ENx Calling)
                </h3>
              </div>

              {/* Price & Buy Button */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Flash Deal Price</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white">₹999</span>
                    <span className="text-xs line-through text-slate-500">₹2,990</span>
                  </div>
                </div>

                <a
                  href="https://www.amazon.in/dp/B09N3ZNHTY?tag=budgettechpro-21"
                  target="_blank"
                  rel="nofollow sponsored"
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#FFB800] to-[#FF7A00] text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_4px_20px_rgba(255,184,0,0.4)] hover:scale-105 transition-all"
                >
                  <ShoppingCart className="w-4 h-4" /> Grab Deal <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
