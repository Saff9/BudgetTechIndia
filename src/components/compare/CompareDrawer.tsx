'use client';

import React from 'react';
import { useCompare } from './CompareContext';
import { 
  X, 
  ArrowRightLeft, 
  Trash2, 
  ShoppingCart, 
  ArrowUpRight, 
  Star, 
  Check, 
  Minus,
  Sparkles
} from 'lucide-react';

export const CompareDrawer: React.FC = () => {
  const { 
    compareList, 
    removeFromCompare, 
    clearCompare, 
    isDrawerOpen, 
    setIsDrawerOpen 
  } = useCompare();

  if (compareList.length === 0) return null;

  return (
    <>
      {/* Floating Bottom Pill Bar */}
      {!isDrawerOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center gap-4 px-5 py-3.5 rounded-2xl bg-[#0B0F19]/95 backdrop-blur-2xl border border-[#FFB800]/40 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(255,184,0,0.25)]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#FFB800] text-black font-black text-xs flex items-center justify-center">
                {compareList.length}
              </div>
              <span className="text-xs font-bold text-white hidden sm:inline">
                {compareList.length === 1 ? 'Product selected' : 'Products ready to compare'}
              </span>
            </div>

            {/* Thumbnail Avatars */}
            <div className="flex items-center -space-x-2">
              {compareList.map((prod) => (
                <div 
                  key={prod.id} 
                  className="w-8 h-8 rounded-full bg-[#06080F] border-2 border-[#1E293B] overflow-hidden p-1"
                  title={prod.name}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={prod.imageUrl || '/images/placeholder-product.svg'}
                    alt={prod.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FFB800] to-[#FF7A00] text-black text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                Compare Now
              </button>

              <button
                onClick={clearCompare}
                title="Clear all"
                aria-label="Clear all compared products"
                className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Modal Comparison Matrix */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="w-full max-w-6xl max-h-[90vh] bg-[#0B0F19] rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden">
            
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#FFB800]/10 text-[#FFB800]">
                  <ArrowRightLeft className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white">Side-by-Side Spec Showdown</h2>
                  <p className="text-xs text-slate-400">Comparing {compareList.length} budget products</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={clearCompare}
                  className="text-xs text-rose-400 hover:underline font-bold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  aria-label="Close comparison window"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Comparison Table Body */}
            <div className="p-6 overflow-x-auto overflow-y-auto flex-1 divide-y divide-white/5">
              <div className="grid grid-cols-[140px_repeat(auto-fit,minmax(200px,1fr))] gap-4 min-w-[700px]">
                
                {/* Product Card Row */}
                <div className="font-bold text-xs uppercase tracking-wider text-slate-400 self-center">
                  Product
                </div>
                {compareList.map((p) => (
                  <div key={p.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 relative flex flex-col justify-between">
                    <button
                      onClick={() => removeFromCompare(p.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-slate-400 hover:text-rose-400"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="w-full h-28 flex items-center justify-center p-2 mb-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.imageUrl || '/images/placeholder-product.svg'}
                        alt={p.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="text-xs font-bold text-white line-clamp-2 mb-2">{p.name}</div>
                    <div className="text-base font-black text-[#FFB800] mb-3">₹{p.price.toLocaleString('en-IN')}</div>
                    <a
                      href={p.affiliateUrl}
                      target="_blank"
                      rel="nofollow sponsored"
                      className="w-full py-2 rounded-xl bg-[#FFB800] text-black font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md hover:scale-105 transition-transform"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Buy on Amazon
                    </a>
                  </div>
                ))}

                {/* Rating Row */}
                <div className="py-4 font-bold text-xs text-slate-400 self-center">Rating</div>
                {compareList.map((p) => (
                  <div key={p.id} className="py-4 flex items-center gap-1.5 text-xs font-bold text-white">
                    <Star className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                    <span>{p.rating || 4.4} / 5.0</span>
                    {p.reviewCount && (
                      <span className="text-[10px] text-slate-500">({p.reviewCount.toLocaleString('en-IN')} reviews)</span>
                    )}
                  </div>
                ))}

                {/* Category & Brand Row */}
                <div className="py-4 font-bold text-xs text-slate-400 self-center">Brand & Type</div>
                {compareList.map((p) => (
                  <div key={p.id} className="py-4 text-xs">
                    <span className="font-bold text-white block">{p.brand || 'Featured Brand'}</span>
                    <span className="text-slate-400 text-[11px] capitalize">{p.category.replace(/-/g, ' ')}</span>
                  </div>
                ))}

                {/* Discount Row */}
                <div className="py-4 font-bold text-xs text-slate-400 self-center">Savings</div>
                {compareList.map((p) => {
                  const discount = p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;
                  return (
                    <div key={p.id} className="py-4 text-xs">
                      {discount > 0 ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                          {discount}% OFF (Save ₹{(p.mrp - p.price).toLocaleString('en-IN')})
                        </span>
                      ) : (
                        <span className="text-slate-400">Regular Deal</span>
                      )}
                    </div>
                  );
                })}

                {/* Top Specs */}
                <div className="py-4 font-bold text-xs text-slate-400 self-center">Key Features</div>
                {compareList.map((p) => (
                  <div key={p.id} className="py-4 text-xs space-y-1.5 text-slate-300">
                    {p.features && Object.keys(p.features).length > 0 ? (
                      Object.entries(p.features).slice(0, 3).map(([k, v]) => (
                        <div key={k} className="flex items-baseline gap-1 text-[11px]">
                          <span className="text-slate-500 font-medium">{k}:</span>
                          <span className="text-white font-semibold">{String(v)}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-slate-500 text-[11px]">Standard budget specs</span>
                    )}
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
