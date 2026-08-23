import React from 'react';
import { Volume2, Mic, Battery, Zap, Award } from 'lucide-react';

interface MetricItem {
  label: string;
  score: number; // 0 - 100
  icon: any;
  color: string;
}

export const SpecVisualizer: React.FC<{
  category?: string;
  rating?: number;
  price?: number;
}> = ({ category = 'bluetooth-earbuds', rating = 4.5, price = 999 }) => {
  
  // Compute contextual benchmark scores
  const isAudio = category.includes('earbud') || category.includes('headphone');
  const isPower = category.includes('power') || category.includes('charger');
  const isWatch = category.includes('watch');

  const metrics: MetricItem[] = isAudio
    ? [
        { label: 'Bass & Acoustic Punch', score: 92, icon: Volume2, color: 'bg-amber-400' },
        { label: 'Calling Mic Voice Clarity', score: 84, icon: Mic, color: 'bg-emerald-400' },
        { label: 'Battery Playtime Endurance', score: 95, icon: Battery, color: 'bg-blue-400' },
        { label: 'Price-to-Value Quotient', score: 96, icon: Award, color: 'bg-purple-400' },
      ]
    : isPower
    ? [
        { label: 'Actual Usable Output Efficiency', score: 94, icon: Zap, color: 'bg-emerald-400' },
        { label: 'Fast Charge Protocol (PD/QC)', score: 91, icon: Zap, color: 'bg-amber-400' },
        { label: 'Thermal Stability & Circuit Safety', score: 96, icon: Battery, color: 'bg-blue-400' },
        { label: 'Portability & Build Resilience', score: 88, icon: Award, color: 'bg-purple-400' },
      ]
    : [
        { label: 'Display Brightness & Refresh', score: 89, icon: Zap, color: 'bg-blue-400' },
        { label: 'Bluetooth Calling Voice Quality', score: 86, icon: Mic, color: 'bg-emerald-400' },
        { label: 'Sensors & Health Precision', score: 87, icon: Award, color: 'bg-amber-400' },
        { label: 'Overall Value Quotient', score: 95, icon: Award, color: 'bg-purple-400' },
      ];

  return (
    <div className="p-6 rounded-3xl bg-[#0B0F19] border border-white/5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-[#FFB800]" /> Lab Benchmark Scores
        </h3>
        <span className="text-[11px] font-bold text-[#00F5A0] bg-[#00F5A0]/10 px-2.5 py-0.5 rounded-full border border-[#00F5A0]/20">
          Ranked Top Tier
        </span>
      </div>

      <div className="space-y-3 pt-2">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <Icon className="w-3.5 h-3.5 text-slate-400" />
                  {m.label}
                </span>
                <span className="font-mono font-bold text-white">{m.score}/100</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className={`h-full ${m.color} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${m.score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
