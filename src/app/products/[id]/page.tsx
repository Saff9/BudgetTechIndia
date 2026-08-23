import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { ProductCard } from '@/components/products/ProductCard';
import { getAllNeonProducts } from '@/utils/neondb';
import productsData from '@/data/products.json';
import { 
  Star, 
  ShoppingCart, 
  ArrowUpRight, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Zap,
  ArrowLeft
} from 'lucide-react';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const allProds = (productsData as any).products || [];
  const prod = allProds.find((p: any) => p.slug === params.id || p.id === params.id);
  if (!prod) return { title: 'Product Not Found' };

  return {
    title: `${prod.name} Review & Best Price in India`,
    description: `Check out ${prod.name} specifications, pros & cons, customer ratings, and current lowest deal price of ₹${prod.price} on Amazon India.`,
    openGraph: {
      title: `${prod.name} Review & Lowest Price (₹${prod.price})`,
      description: prod.description || `Special deal on ${prod.name} on Amazon India.`,
      url: `https://budget-tech-india.vercel.app/products/${params.id}`,
      images: [{ url: prod.imageUrl || '/images/placeholder-product.svg' }],
    },
    alternates: {
      canonical: `https://budget-tech-india.vercel.app/products/${params.id}`,
    },
  };
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
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

  const product = allProducts.find((p) => p.slug === params.id || p.id === params.id);
  if (!product) {
    notFound();
  }

  const discount = product.mrp > product.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100) 
    : 0;

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="py-12">
      <JsonLd type="product" data={product} />
      <JsonLd
        type="breadcrumbs"
        data={{
          items: [
            { name: 'Home', url: '/' },
            { name: 'Categories', url: '/categories' },
            { name: product.category, url: `/categories/${product.category}` },
            { name: product.name, url: `/products/${product.slug || product.id}` },
          ],
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link
          href={`/categories/${product.category}`}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#FFB800] mb-8 font-semibold transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to {product.category.replace(/-/g, ' ')}
        </Link>

        {/* Main Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-[#0B0F19] rounded-3xl border border-white/5 p-6 sm:p-10 mb-16 shadow-2xl">
          
          {/* Col 1: Product Image */}
          <div className="lg:col-span-5 flex items-center justify-center p-8 bg-black/40 rounded-2xl border border-white/5 relative group">
            {discount > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#FF7A00] text-black text-xs font-black uppercase tracking-wider shadow-lg">
                {discount}% OFF
              </span>
            )}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.imageUrl || '/images/placeholder-product.svg'}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="max-h-[360px] w-auto object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-2xl"
            />
          </div>

          {/* Col 2: Product Overview & Buy Box */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#00F5A0]/10 text-[#00F5A0] text-xs font-bold uppercase tracking-wider">
                  {product.category.replace(/-/g, ' ')}
                </span>
                {product.brand && (
                  <span className="px-2.5 py-0.5 rounded-md bg-white/5 text-slate-300 text-xs font-semibold">
                    {product.brand}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-4">
                {product.name}
              </h1>

              {/* Rating & Review Summary */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/5">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[#FFD700]">
                  <Star className="w-4 h-4 fill-[#FFD700]" />
                  <span className="font-bold text-sm text-white">{product.rating || 4.4}</span>
                </div>
                <span className="text-xs text-slate-400">
                  Based on verified Amazon customer reviews
                </span>
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 mb-6">
                <div className="text-xs text-slate-400 font-semibold mb-1">Deal Price</div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-white">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.mrp > product.price && (
                    <span className="text-sm line-through text-slate-500">
                      ₹{product.mrp.toLocaleString('en-IN')}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="text-xs font-bold text-[#00F5A0]">
                      Save ₹{(product.mrp - product.price).toLocaleString('en-IN')} ({discount}%)
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* CTA Buy Buttons & Trust Badges */}
            <div className="space-y-4 pt-4">
              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="nofollow sponsored"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FFB800] via-[#FF9E00] to-[#FF7A00] text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-[0_4px_25px_rgba(255,184,0,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                View Latest Deal on Amazon India
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-semibold text-slate-400 pt-2">
                <div className="p-2 rounded-xl bg-white/[0.02] flex items-center justify-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#00F5A0]" />
                  <span>Amazon Fulfilled</span>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.02] flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FFB800]" />
                  <span>100% Original</span>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.02] flex items-center justify-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-purple-400" />
                  <span>7-Day Replacement</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Specifications & Pros/Cons Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Key Specs */}
          {product.features && Object.keys(product.features).length > 0 && (
            <div className="glass-card p-6 sm:p-8 rounded-2xl">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#FFB800]" /> Key Specifications
              </h2>
              <div className="divide-y divide-white/5">
                {Object.entries(product.features).map(([key, val]) => (
                  <div key={key} className="py-3 flex items-center justify-between text-sm">
                    <span className="text-slate-400 font-medium">{key}</span>
                    <span className="text-white font-bold">{String(val)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pros & Cons */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-white mb-6">Expert Verdict</h2>
              
              {/* Pros */}
              {product.pros && product.pros.length > 0 && (
                <div className="mb-6">
                  <div className="text-xs uppercase font-bold text-[#00F5A0] tracking-wider mb-3">
                    Why You Should Buy It
                  </div>
                  <ul className="space-y-2">
                    {product.pros.map((pro: string, i: number) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-[#00F5A0] shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Cons */}
              {product.cons && product.cons.length > 0 && (
                <div>
                  <div className="text-xs uppercase font-bold text-rose-400 tracking-wider mb-3">
                    Points to Consider
                  </div>
                  <ul className="space-y-2">
                    {product.cons.map((con: string, i: number) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white mb-6">
              More Deals in {product.category.replace(/-/g, ' ')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
