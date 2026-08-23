'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';

export interface ProductProps {
  id: string;
  name: string;
  slug?: string;
  category: string;
  brand?: string;
  price: number;
  mrp: number;
  imageUrl?: string;
  affiliateUrl: string;
  rating?: number;
  reviewCount?: number;
  features?: Record<string, string>;
  pros?: string[];
  cons?: string[];
  description?: string;
}

export const ProductCard: React.FC<{ product: ProductProps }> = ({ product }) => {
  const [imgSrc, setImgSrc] = useState(product.imageUrl || '/images/placeholder-product.svg');
  
  const discount = product.mrp > product.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100) 
    : 0;

  const productUrl = product.slug ? `/products/${product.slug}` : `/products/${product.id}`;

  return (
    <div className="group relative bg-[#0B0F19] rounded-2xl border border-white/5 hover:border-[#FFB800]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-[0_16px_36px_rgba(0,0,0,0.8),0_0_25px_rgba(255,184,0,0.15)]">
      
      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
        {discount > 0 ? (
          <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFB800] text-black text-xs font-black shadow-md uppercase tracking-wider">
            {discount}% OFF
          </span>
        ) : (
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
            Best Deal
          </span>
        )}

        {product.brand && (
          <span className="px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-slate-300 border border-white/10 text-[11px] font-semibold">
            {product.brand}
          </span>
        )}
      </div>

      {/* Image Container */}
      <div className="relative w-full pt-[85%] bg-gradient-to-b from-white/[0.03] to-transparent overflow-hidden">
        <a 
          href={product.affiliateUrl} 
          target="_blank" 
          rel="nofollow sponsored"
          className="absolute inset-0 flex items-center justify-center p-6"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt={product.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgSrc('/images/placeholder-product.svg')}
            className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-110 drop-shadow-xl"
          />
        </a>
      </div>

      {/* Product Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Tag & Rating */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#00F5A0]">
              {product.category.replace(/-/g, ' ')}
            </span>

            <div className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
              <Star className="w-3.5 h-3.5 fill-[#FFD700] text-[#FFD700]" />
              <span className="text-xs font-bold text-white">{product.rating || 4.4}</span>
              {product.reviewCount && (
                <span className="text-[10px] text-slate-400">({product.reviewCount > 1000 ? `${(product.reviewCount/1000).toFixed(1)}k` : product.reviewCount})</span>
              )}
            </div>
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-bold text-white group-hover:text-[#FFB800] transition-colors line-clamp-2 mb-3 leading-snug">
            <a href={product.affiliateUrl} target="_blank" rel="nofollow sponsored">
              {product.name}
            </a>
          </h3>

          {/* Key Feature Highlight */}
          {product.features && Object.keys(product.features).length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {Object.entries(product.features).slice(0, 2).map(([key, val]) => (
                <span key={key} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                  {String(val)}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & CTA Button */}
        <div className="pt-3 border-t border-white/5 mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl font-black text-white">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.mrp > product.price && (
              <span className="text-xs line-through text-slate-500">
                ₹{product.mrp.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="nofollow sponsored"
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FFB800] via-[#FF9E00] to-[#FF7A00] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(255,184,0,0.3)] hover:shadow-[0_6px_25px_rgba(255,184,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
            Check Price on Amazon
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
