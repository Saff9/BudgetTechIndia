import React from 'react';
import Link from 'next/link';
import { 
  Headphones, 
  BatteryCharging, 
  Watch, 
  Zap, 
  Laptop, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';

const CATEGORIES = [
  {
    name: 'Bluetooth Earbuds',
    slug: 'bluetooth-earbuds',
    icon: Headphones,
    count: 'Top 10 Picks',
    price: 'From ₹399',
    color: 'from-amber-500/20 to-orange-500/10',
    border: 'hover:border-amber-500/40',
  },
  {
    name: 'Power Banks',
    slug: 'power-banks',
    icon: BatteryCharging,
    count: '10000 & 20000mAh',
    price: 'From ₹899',
    color: 'from-emerald-500/20 to-teal-500/10',
    border: 'hover:border-emerald-500/40',
  },
  {
    name: 'Smartwatches',
    slug: 'smartwatches',
    icon: Watch,
    count: 'Calling & Fitness',
    price: 'From ₹1,099',
    color: 'from-blue-500/20 to-cyan-500/10',
    border: 'hover:border-blue-500/40',
  },
  {
    name: 'Fast Chargers & Cables',
    slug: 'fast-chargers-cables',
    icon: Zap,
    count: 'GaN & 65W PD',
    price: 'From ₹299',
    color: 'from-yellow-500/20 to-amber-500/10',
    border: 'hover:border-yellow-500/40',
  },
  {
    name: 'Laptop Accessories',
    slug: 'laptop-accessories',
    icon: Laptop,
    count: 'Stands & Mice',
    price: 'From ₹499',
    color: 'from-purple-500/20 to-indigo-500/10',
    border: 'hover:border-purple-500/40',
  },
  {
    name: 'Gadgets Under ₹999',
    slug: 'budget-gadgets-under-999',
    icon: Sparkles,
    count: 'Extreme Value',
    price: 'Under ₹999',
    color: 'from-pink-500/20 to-rose-500/10',
    border: 'hover:border-pink-500/40',
  },
];

export const CategoryGrid: React.FC = () => {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#00F5A0] block mb-2">
              Browse By Category
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Featured Budget Categories
            </h2>
          </div>
          <Link 
            href="/categories" 
            className="text-xs text-[#FFB800] hover:underline font-bold flex items-center gap-1 self-start sm:self-auto"
          >
            All Categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className={`group relative p-5 rounded-2xl bg-[#0B0F19] border border-white/5 ${cat.border} transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-xl hover:-translate-y-1`}
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${cat.color} rounded-full blur-2xl pointer-events-none -z-0`} />

                <div className="p-3 rounded-xl bg-white/5 text-[#FFB800] group-hover:bg-[#FFB800] group-hover:text-black transition-colors w-fit mb-4">
                  <Icon className="w-5 h-5" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#FFB800] transition-colors leading-snug mb-1">
                    {cat.name}
                  </h3>
                  <div className="text-[11px] text-slate-400 font-medium">{cat.count}</div>
                  <div className="text-[10px] text-[#00F5A0] font-bold mt-2">{cat.price}</div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};
