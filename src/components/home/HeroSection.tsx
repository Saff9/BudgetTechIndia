'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, ArrowRight, Zap, TrendingUp } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden">
      {/* Background Ambient Glowing Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#FFB800]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-[#00F5A0]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 animate-pulse">
          <Sparkles className="w-4 h-4 text-[#FFB800]" />
          <span className="text-xs font-bold text-slate-200">
            Updated Daily: Handpicked Tech Deals Under ₹2,000
          </span>
          <span className="w-2 h-2 rounded-full bg-[#00F5A0] animate-ping" />
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-4xl mx-auto mb-6">
          Find the <span className="gold-gradient-text">Best Budget Tech</span> in India Without the Guesswork.
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          We test and curate the highest rated TWS earbuds, fast power banks, calling smartwatches, and work-from-home essentials under ₹2,000 on Amazon India.
        </p>

        {/* Quick CTA Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Link
            href="/categories/bluetooth-earbuds"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FFB800] to-[#FF7A00] text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_4px_20px_rgba(255,184,0,0.35)] hover:scale-105 transition-transform flex items-center gap-2"
          >
            Explore Top Earbuds
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/top-5"
            className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm border border-white/10 backdrop-blur-md transition-all flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4 text-[#00F5A0]" />
            View Top 5 Ranked Lists
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 border-t border-white/5 text-xs font-semibold text-slate-400">
          <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-white/[0.02]">
            <ShieldCheck className="w-4 h-4 text-[#00F5A0]" />
            <span>100% Honest Testing</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-white/[0.02]">
            <Zap className="w-4 h-4 text-[#FFB800]" />
            <span>Real-Time Deal Prices</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-white/[0.02]">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Strict Under ₹2000 Cap</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-white/[0.02]">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Amazon Verified Deals</span>
          </div>
        </div>

      </div>
    </section>
  );
};
