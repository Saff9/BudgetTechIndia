import React from 'react';
import Link from 'next/link';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FaqSection } from '@/components/home/FaqSection';
import { ProductCard } from '@/components/products/ProductCard';
import { getAllNeonProducts } from '@/utils/neondb';
import productsData from '@/data/products.json';
import { Award, TrendingUp, BookOpen, ArrowRight, Zap, Flame } from 'lucide-react';

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

export default async function HomePage() {
  let products: any[] = [];
  try {
    const neonProds = await getAllNeonProducts();
    if (neonProds && neonProds.length > 0) {
      products = neonProds;
    } else {
      products = (productsData as any).products || [];
    }
  } catch (e) {
    products = (productsData as any).products || [];
  }

  const topDeals = products.slice(0, 8);

  return (
    <div className="space-y-16">
      
      {/* Hero Section */}
      <HeroSection />

      {/* Categories Grid */}
      <CategoryGrid />

      {/* Latest Curated Deals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB800]/10 text-[#FFB800] text-xs font-bold mb-2 border border-[#FFB800]/20">
              <Flame className="w-3.5 h-3.5 fill-[#FFB800]" /> Verified Today
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Trending Deals Under ₹2,000
            </h2>
          </div>
          <Link
            href="/categories"
            className="text-xs text-[#FFB800] hover:underline font-bold flex items-center gap-1"
          >
            Explore All Categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topDeals.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* Top 5 Ranked Guides Section */}
      <section className="bg-[#0B0F19] border-y border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#FFB800] block mb-2">
              Expertly Ranked
            </span>
            <h2 className="text-3xl font-black text-white mb-4">
              Top 5 Comparison Lists
            </h2>
            <p className="text-sm text-slate-400">
              We rank every product against its closest competitors based on real testing metrics, sound profiles, battery endurance, and value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Guide 1 */}
            <div className="glass-card p-6 rounded-2xl flex flex-col justify-between group">
              <div>
                <div className="p-3 rounded-xl bg-[#FFB800]/10 text-[#FFB800] w-fit mb-4 font-bold text-xs flex items-center gap-2">
                  <Award className="w-4 h-4" /> Ranked #1 Guide
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#FFB800] transition-colors mb-2">
                  Top 5 Best TWS Earbuds Under ₹1,000
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Detailed comparison of boAt Airdopes 141, Noise Buds VS104, pTron Bassbuds, and Mivi Duopods.
                </p>
              </div>
              <Link
                href="/top-5/best-budget-earbuds-2026"
                className="text-xs font-bold text-[#FFB800] hover:underline flex items-center gap-1.5 pt-4 border-t border-white/5"
              >
                Read Complete Ranked List <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Guide 2 */}
            <div className="glass-card p-6 rounded-2xl flex flex-col justify-between group">
              <div>
                <div className="p-3 rounded-xl bg-[#00F5A0]/10 text-[#00F5A0] w-fit mb-4 font-bold text-xs flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Battery Champions
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#FFB800] transition-colors mb-2">
                  Top 5 Power Banks Under ₹1,500
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Tested 20000mAh vs 10000mAh units with Power Delivery and integrated cables from Ambrane, Mi, and URBN.
                </p>
              </div>
              <Link
                href="/top-5/best-fast-chargers-2026"
                className="text-xs font-bold text-[#00F5A0] hover:underline flex items-center gap-1.5 pt-4 border-t border-white/5"
              >
                Read Complete Ranked List <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Guide 3 */}
            <div className="glass-card p-6 rounded-2xl flex flex-col justify-between group">
              <div>
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 w-fit mb-4 font-bold text-xs flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Calling & Displays
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#FFB800] transition-colors mb-2">
                  Top 5 Smartwatches Under ₹2,000
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Comparing display nits, calling clarity, and health sensors on Noise Pulse 2 Max, Fire-Boltt, and boAt Wave.
                </p>
              </div>
              <Link
                href="/top-5/top-smartwatches-under-2000"
                className="text-xs font-bold text-purple-400 hover:underline flex items-center gap-1.5 pt-4 border-t border-white/5"
              >
                Read Complete Ranked List <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection />

    </div>
  );
}
