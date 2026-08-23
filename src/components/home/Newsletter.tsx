'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, Flame, Bell } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSubscribed(true);
    }
  };

  return (
    <section className="py-16 bg-[#06080F]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0B0F19] via-[#111827] to-[#06080F] border border-[#FFB800]/30 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(255,184,0,0.1)] overflow-hidden">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFB800]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/20 text-[#FFB800] text-xs font-bold">
              <Bell className="w-3.5 h-3.5" /> Deal Drop Alerts
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Never Miss a Tech Price Drop Under ₹2,000
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Get notified the moment flagship earbuds, power banks, or smartwatches hit their lowest recorded price on Amazon India. No spam, only genuine discounts.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>You are subscribed! We will notify you when top deals drop.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-2 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#06080F] border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#FFB800] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl btn-primary text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2"
                >
                  <Flame className="w-3.5 h-3.5 fill-black" /> Get Alerts
                </button>
              </form>
            )}

            <div className="text-[10px] text-slate-500 pt-2">
              🔒 We respect your privacy. Unsubscribe anytime with 1-click.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
