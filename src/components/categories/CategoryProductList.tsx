'use client';

import React, { useState, useMemo } from 'react';
import { ProductProps, ProductCard } from '../products/ProductCard';
import { Filter, SlidersHorizontal, ArrowUpDown, Sparkles } from 'lucide-react';

export const CategoryProductList: React.FC<{
  initialProducts: ProductProps[];
  categoryName: string;
}> = ({ initialProducts, categoryName }) => {
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('discount');

  // Extract unique brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(initialProducts.map((p) => p.brand).filter(Boolean)));
    return ['all', ...list];
  }, [initialProducts]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        const matchesPrice = p.price <= maxPrice;
        const matchesBrand = selectedBrand === 'all' || p.brand === selectedBrand;
        return matchesPrice && matchesBrand;
      })
      .sort((a, b) => {
        if (sortBy === 'discount') {
          const discA = a.mrp > a.price ? (a.mrp - a.price) / a.mrp : 0;
          const discB = b.mrp > b.price ? (b.mrp - b.price) / b.mrp : 0;
          return discB - discA;
        }
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return 0;
      });
  }, [initialProducts, maxPrice, selectedBrand, sortBy]);

  return (
    <div className="space-y-8">
      
      {/* Interactive Filter Bar */}
      <div className="p-6 rounded-3xl bg-[#0B0F19] border border-white/5 space-y-4 shadow-xl">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#FFB800]" />
            <span className="text-xs font-black uppercase tracking-wider text-white">
              Instant Filter & Sort
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#06080F] border border-white/10 text-white rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#FFB800]"
            >
              <option value="discount">Highest Discount %</option>
              <option value="rating">Top Customer Rating</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Budget Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 mr-2">Budget Cap:</span>
          {[500, 1000, 1500, 2000].map((cap) => (
            <button
              key={cap}
              onClick={() => setMaxPrice(cap)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                maxPrice === cap
                  ? 'bg-[#FFB800] text-black shadow-md'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
              }`}
            >
              Under ₹{cap.toLocaleString('en-IN')}
            </button>
          ))}
        </div>

        {/* Brand Filters */}
        {brands.length > 2 && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-semibold text-slate-400 mr-2">Brand:</span>
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBrand(b as string)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedBrand === b
                    ? 'bg-[#00F5A0] text-black font-bold'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {b === 'all' ? 'All Brands' : b}
              </button>
            ))}
          </div>
        )}

      </div>

      {/* Results Bar */}
      <div className="flex items-center justify-between px-1">
        <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#00F5A0]" />
          Showing {filteredProducts.length} Verified Deals under ₹{maxPrice}
        </div>
        <span className="text-[11px] text-slate-500">Live Amazon prices</span>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#0B0F19] rounded-3xl border border-white/5">
          <p className="text-sm text-slate-300 font-bold mb-2">
            No products matched your exact filter criteria.
          </p>
          <button
            onClick={() => {
              setMaxPrice(2000);
              setSelectedBrand('all');
            }}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#FFB800] text-xs font-bold border border-white/10"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};
