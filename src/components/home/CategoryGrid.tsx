import React from 'react';
import Link from 'next/link';
import { 
  Headphones, 
  BatteryCharging, 
  Watch, 
  Zap, 
  Laptop, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const CATEGORIES = [
  {
    title: 'Bluetooth Earbuds',
    slug: 'bluetooth-earbuds',
    description: 'TWS with active noise cancellation, deep bass drivers, and low latency for gaming.',
    count: 12,
    startingPrice: '₹799',
    icon: Headphones,
    color: 'from-amber-500/20 to-orange-500/10',
    border: 'hover:border-amber-500/40',
  },
  {
    title: 'Power Banks',
    slug: 'power-banks',
    description: '10000mAh & 20000mAh packs with 22.5W Power Delivery and multi-device fast charge.',
    count: 8,
    startingPrice: '₹899',
    icon: BatteryCharging,
    color: 'from-emerald-500/20 to-teal-500/10',
    border: 'hover:border-emerald-500/40',
  },
  {
    title: 'Smartwatches',
    slug: 'smartwatches',
    description: 'HD/AMOLED Bluetooth calling watches with heart rate, SpO2 & sleep tracking sensors.',
    count: 10,
    startingPrice: '₹1,199',
    icon: Watch,
    color: 'from-cyan-500/20 to-blue-500/10',
    border: 'hover:border-cyan-500/40',
  },
  {
    title: 'Fast Chargers & Cables',
    slug: 'fast-chargers-cables',
    description: 'Multi-port GaN power adapters, braided Type-C cables, and safe fast charge kits.',
    count: 6,
    startingPrice: '₹299',
    icon: Zap,
    color: 'from-yellow-500/20 to-amber-500/10',
    border: 'hover:border-yellow-500/40',
  },
  {
    title: 'Laptop Accessories',
    slug: 'laptop-accessories',
    description: 'Ergonomic aluminum laptop stands, wireless mice, keyboards, and USB hubs.',
    count: 7,
    startingPrice: '₹499',
    icon: Laptop,
    color: 'from-purple-500/20 to-indigo-500/10',
    border: 'hover:border-purple-500/40',
  },
  {
    title: 'Gadgets Under ₹999',
    slug: 'budget-gadgets-under-999',
    description: 'Extreme-value budget tech gifts, cleaning kits, OTG adapters, and desk utilities.',
    count: 9,
    startingPrice: '₹199',
    icon: Sparkles,
    color: 'from-rose-500/20 to-pink-500/10',
    border: 'hover:border-rose-500/40',
  },
];

export const CategoryGrid: React.FC = () => {
  return (
    <section className="py-16 bg-[#06080F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#FFB800] mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Curated Categories
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Explore Tech by Category
            </h2>
          </div>
          <Link
            href="/categories"
            className="text-xs font-bold text-[#FFB800] hover:underline flex items-center gap-1 self-start md:self-auto"
          >
            View All Categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className={`group p-6 rounded-3xl bg-[#0B0F19] border border-white/5 ${cat.border} transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${cat.color} border border-white/5 text-white group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-[#FFB800]" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-300">
                      From {cat.startingPrice}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white group-hover:text-[#FFB800] transition-colors mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold">
                  <span className="text-[#00F5A0]">{cat.count} Curated Deals</span>
                  <span className="text-slate-400 group-hover:text-white flex items-center gap-1 transition-colors">
                    Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};
