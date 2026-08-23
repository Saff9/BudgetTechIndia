'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Star, 
  ShoppingCart, 
  ArrowUpRight, 
  ArrowRightLeft, 
  Share2, 
  Check, 
  Sparkles, 
  Flame,
  ShieldCheck
} from 'lucide-react';
import { useCompare } from '../compare/CompareContext';

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
  const [copied, setCopied] = useState(false);
  const { addToCompare, isInCompare } = useCompare();

  const isCompared = isInCompare(product.id);

  const discount = product.mrp > product.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100) 
    : 0;

  const productUrl = `/products/${product.slug || product.id}`;

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}${productUrl}` : product.affiliateUrl;
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {}
  };

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCompare(product);
  };

  return (
    <div className="group relative bg-[#0B0F19] rounded-3xl border border-white/5 hover:border-[#FFB800]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-[0_16px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(255,184,0,0.18)]">
      
      {/* Top Badges & Micro-Actions */}
      <div className="p-4 pb-0 flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5">
          {discount > 0 ? (
            <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFB800] text-black text-[11px] font-black uppercase tracking-wider shadow-md">
              {discount}% OFF
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold flex items-center gap-1">
              <Flame className="w-3 h-3 fill-emerald-400" /> Hot Deal
            </span>
          )}

          {product.brand && (
            <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5 text-[10px] font-semibold">
              {product.brand}
            </span>
          )}
        </div>

        {/* Action Buttons: Compare & Share */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleCompareToggle}
            title={isCompared ? 'Remove from compare' : 'Add to compare'}
            className={`p-1.5 rounded-xl border transition-all ${
              isCompared 
                ? 'bg-[#FFB800] text-black border-[#FFB800]' 
                : 'bg-white/5 text-slate-400 hover:text-white border-white/5 hover:bg-white/10'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleShare}
            title="Copy deal link"
            className="p-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Product Image Frame */}
      <div className="relative w-full pt-[75%] bg-gradient-to-b from-white/[0.02] to-transparent overflow-hidden">
        <Link href={productUrl} className="absolute inset-0 flex items-center justify-center p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt={product.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgSrc('/images/placeholder-product.svg')}
            className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-110 drop-shadow-2xl"
          />
        </Link>
      </div>

      {/* Card Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Tag & Rating */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#00F5A0]">
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
            <Link href={productUrl}>
              {product.name}
            </Link>
          </h3>

          {/* Key Feature Highlight Badges */}
          {product.features && Object.keys(product.features).length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {Object.entries(product.features).slice(0, 2).map(([key, val]) => (
                <span key={key} className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.03] text-slate-300 border border-white/5">
                  {String(val)}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Dual CTA */}
        <div className="pt-3 border-t border-white/5 mt-auto space-y-3">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.mrp > product.price && (
                <span className="text-xs line-through text-slate-500">
                  ₹{product.mrp.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#00F5A0] font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Verified
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={productUrl}
              className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs flex items-center justify-center transition-all border border-white/10"
            >
              Specs & Score
            </Link>
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="nofollow sponsored"
              className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#FFB800] to-[#FF7A00] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_4px_15px_rgba(255,184,0,0.3)] hover:scale-105 transition-all"
            >
              <ShoppingCart className="w-3.5 h-3.5" /> Buy
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
