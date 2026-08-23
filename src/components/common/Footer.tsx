import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Heart, ExternalLink, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#030408] border-t border-white/5 pt-16 pb-12 mt-20 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FFB800] to-[#FF7A00] p-[2px]">
                <div className="w-full h-full bg-[#06080F] rounded-[10px] flex items-center justify-center font-bold text-[#FFB800]">
                  B
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                BudgetTech<span className="text-[#FFB800]">India</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Your definitive guide for honest reviews, specs comparisons, and curated tech gadget deals under ₹2,000 in India. Handpicked, tested, and updated daily.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Tested & Verified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFB800]/10 text-[#FFB800] text-xs font-semibold border border-[#FFB800]/20">
                <Zap className="w-3.5 h-3.5" /> Real-Time Deals
              </span>
            </div>
          </div>

          {/* Col 2: Top Categories */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Top Categories</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/categories/bluetooth-earbuds" className="hover:text-[#FFB800] transition-colors">TWS Bluetooth Earbuds</Link></li>
              <li><Link href="/categories/power-banks" className="hover:text-[#FFB800] transition-colors">Fast Power Banks</Link></li>
              <li><Link href="/categories/smartwatches" className="hover:text-[#FFB800] transition-colors">Calling Smartwatches</Link></li>
              <li><Link href="/categories/fast-chargers-cables" className="hover:text-[#FFB800] transition-colors">GaN Fast Chargers</Link></li>
              <li><Link href="/categories/laptop-accessories" className="hover:text-[#FFB800] transition-colors">Laptop Accessories</Link></li>
            </ul>
          </div>

          {/* Col 3: Best Picks */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Ranked Lists</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/top-5/best-budget-earbuds-2026" className="hover:text-[#FFB800] transition-colors">Best Earbuds Under ₹1000</Link></li>
              <li><Link href="/top-5/top-smartwatches-under-2000" className="hover:text-[#FFB800] transition-colors">Best Smartwatches Under ₹2000</Link></li>
              <li><Link href="/top-5/best-fast-chargers-2026" className="hover:text-[#FFB800] transition-colors">Best 65W GaN Chargers</Link></li>
              <li><Link href="/reviews" className="hover:text-[#FFB800] transition-colors">All Product Reviews</Link></li>
              <li><Link href="/blog" className="hover:text-[#FFB800] transition-colors">Tech Buying Guides</Link></li>
            </ul>
          </div>

          {/* Col 4: Trust & Legal */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Company & Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-[#FFB800] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#FFB800] transition-colors">Contact & Support</Link></li>
              <li><Link href="/affiliate-disclosure" className="hover:text-[#FFB800] transition-colors">Affiliate Disclosure</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-[#FFB800] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-conditions" className="hover:text-[#FFB800] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Amazon Affiliate Disclaimer Box */}
        <div className="py-6 border-b border-white/5 text-xs leading-relaxed text-slate-500">
          <p>
            <strong className="text-slate-400">Amazon Associates Disclosure:</strong> BudgetTechIndia is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.in. When you purchase through our links, we may earn an affiliate commission at zero additional cost to you. Product prices and availability are accurate as of the date/time indicated and are subject to change.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} BudgetTechIndia. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for budget tech enthusiasts in India.
          </p>
        </div>
      </div>
    </footer>
  );
};
