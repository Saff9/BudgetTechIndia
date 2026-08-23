import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/products/ProductCard';
import { JsonLd } from '@/components/seo/JsonLd';
import { getAllNeonProducts } from '@/utils/neondb';
import productsData from '@/data/products.json';
import { Headphones, BatteryCharging, Watch, Zap, Laptop, Sparkles, Filter } from 'lucide-react';

const CATEGORY_MAP: Record<string, { name: string; title: string; desc: string; icon: any }> = {
  'bluetooth-earbuds': {
    name: 'Bluetooth Earbuds',
    title: 'Best Bluetooth Earbuds & TWS Under ₹2,000 in India (2026)',
    desc: 'Compare the highest rated true wireless earbuds (TWS) and neckbands with low latency, active noise cancellation, and 40+ hours battery life.',
    icon: Headphones,
  },
  'power-banks': {
    name: 'Power Banks',
    title: 'Best 10000mAh & 20000mAh Power Banks Under ₹1,500 in India',
    desc: 'Tested high-capacity fast charging power banks with 22.5W Power Delivery and integrated cables from Ambrane, Mi, and URBN.',
    icon: BatteryCharging,
  },
  'smartwatches': {
    name: 'Smartwatches',
    title: 'Best Bluetooth Calling Smartwatches Under ₹2,000 in India',
    desc: 'Feature-packed smartwatches with vibrant AMOLED/HD displays, clear Bluetooth calling, and comprehensive health monitoring sensors.',
    icon: Watch,
  },
  'fast-chargers-cables': {
    name: 'Fast Chargers & Cables',
    title: 'Best Fast Chargers, GaN Adapters & Type-C Cables Under ₹1,000',
    desc: 'Durable braided fast charging cables and multi-port GaN power adapters for iPhone, Android, and laptops.',
    icon: Zap,
  },
  'laptop-accessories': {
    name: 'Laptop Accessories',
    title: 'Best Budget Laptop Accessories Under ₹1,000 in India',
    desc: 'Ergonomic aluminum laptop stands, wireless mice, keyboards, and USB hubs to upgrade your work-from-home setup.',
    icon: Laptop,
  },
  'budget-gadgets-under-999': {
    name: 'Gadgets Under ₹999',
    title: 'Top Extreme-Value Tech Gadgets Under ₹999 in India',
    desc: 'Super affordable tech gifts, cables, earphones, and desk accessories under ₹999 that punch well above their weight.',
    icon: Sparkles,
  },
  'work-from-home-essentials': {
    name: 'Work From Home Essentials',
    title: 'Best Work From Home & Desk Setup Tech Under ₹2,000',
    desc: 'Essential productivity gadgets including desk mats, cable organizers, mice, and laptop stands for remote workers.',
    icon: Laptop,
  },
  'books': {
    name: 'Books & Self-Mastery',
    title: 'Best Tech, Psychology & Strategy Books in India',
    desc: 'Curated psychological masterworks, tech guides, and strategy books on Amazon India.',
    icon: Sparkles,
  },
};

export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cat = CATEGORY_MAP[params.slug];
  if (!cat) return { title: 'Category Not Found' };

  return {
    title: cat.title,
    description: cat.desc,
    openGraph: {
      title: cat.title,
      description: cat.desc,
      url: `https://budget-tech-india.vercel.app/categories/${params.slug}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://budget-tech-india.vercel.app/categories/${params.slug}`,
    },
  };
}

export const revalidate = 60; // ISR revalidation

export default async function CategoryDetailPage({ params }: { params: { slug: string } }) {
  const cat = CATEGORY_MAP[params.slug];
  if (!cat) {
    notFound();
  }

  const Icon = cat.icon;

  // Fetch all products
  let allProducts: any[] = [];
  try {
    const neonProds = await getAllNeonProducts();
    if (neonProds && neonProds.length > 0) {
      allProducts = neonProds;
    } else {
      allProducts = (productsData as any).products || [];
    }
  } catch (e) {
    allProducts = (productsData as any).products || [];
  }

  // Filter for this category or related category matches
  const categoryProducts = allProducts.filter((p) => {
    if (p.category === params.slug) return true;
    if (params.slug === 'laptop-accessories' && p.category === 'accessories') return true;
    if (params.slug === 'budget-gadgets-under-999' && p.price < 1000) return true;
    return false;
  });

  return (
    <div className="py-12">
      <JsonLd
        type="breadcrumbs"
        data={{
          items: [
            { name: 'Home', url: '/' },
            { name: 'Categories', url: '/categories' },
            { name: cat.name, url: `/categories/${params.slug}` },
          ],
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Hero Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0B0F19] to-[#06080F] border border-white/5 relative overflow-hidden mb-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFB800]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#FFB800] text-xs font-bold mb-4">
              <Icon className="w-3.5 h-3.5" /> Category Guide
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              {cat.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              {cat.desc}
            </p>
          </div>
        </div>

        {/* Products Results Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#00F5A0]" />
            <span className="text-sm font-bold text-white">
              Showing {categoryProducts.length} Verified Deals
            </span>
          </div>
          <span className="text-xs text-slate-400">
            Real-time Amazon deal pricing
          </span>
        </div>

        {/* Product Cards Grid */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#0B0F19] rounded-2xl border border-white/5">
            <p className="text-slate-400 text-sm mb-4">
              No active deals found in this category right now.
            </p>
            <a
              href={`https://www.amazon.in/s?k=${encodeURIComponent(cat.name)}&tag=budgettechpro-21`}
              target="_blank"
              rel="nofollow sponsored"
              className="px-5 py-2.5 rounded-xl bg-[#FFB800] text-black font-bold text-xs inline-flex items-center gap-2 shadow-lg"
            >
              Browse Amazon Deals in {cat.name}
            </a>
          </div>
        )}

      </div>
    </div>
  );
}
