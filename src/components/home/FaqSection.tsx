'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { JsonLd } from '../seo/JsonLd';

const FAQS = [
  {
    question: 'How do you test and select budget tech products?',
    answer: 'We rigorously evaluate build quality, real-world battery performance, sound stage, software stability, customer ratings, and warranty support across top brands like boAt, Noise, Realme, Xiaomi, Ambrane, and Portronics before recommending them.',
  },
  {
    question: 'Are product prices on BudgetTechIndia updated in real time?',
    answer: 'Yes! Our backend continuously monitors and syncs real-time Amazon deal pricing. We also automatically verify discounts and purge expired promotions every 7 days.',
  },
  {
    question: 'Do you charge any extra fees when I buy through your links?',
    answer: 'Never! When you purchase through our links, Amazon may pay us a small referral commission at zero additional cost to you. You get the exact same deal price (or lower with verified coupons).',
  },
  {
    question: 'What is the maximum price limit for products on this site?',
    answer: 'Our core focus is strictly budget gadgets under ₹2,000 in India, with special curated lists for extreme-value picks under ₹500 and under ₹1,000.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 border-t border-white/5">
      <JsonLd type="faq" data={{ faqs: FAQS }} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-[#FFB800] text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Everything You Need To Know
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div 
                key={i} 
                className="rounded-2xl bg-[#0B0F19] border border-white/5 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-[#FFB800] transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#FFB800]' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-3 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
