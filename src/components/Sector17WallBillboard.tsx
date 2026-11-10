import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface Sector17WallBillboardProps {
  onOpenPartnerModal?: () => void;
}

export const Sector17WallBillboard: React.FC<Sector17WallBillboardProps> = ({ onOpenPartnerModal }) => {
  return (
    <div 
      onClick={onOpenPartnerModal}
      className="group relative cursor-pointer select-none transition-all duration-300 w-[122px] sm:w-[132px]"
      title="Click to reserve this Sector 17 Plaza Billboard"
      style={{
        transform: 'perspective(600px) rotateY(4deg) skewY(-0.8deg)',
        transformOrigin: 'center center',
      }}
    >
      {/* Outer Weathered Architectural Iron Frame - Sized to fit 100% inside the concrete panel */}
      <div className="relative bg-stone-950/92 group-hover:bg-black border border-stone-600/90 group-hover:border-amber-400 rounded p-1.5 sm:p-2 shadow-[0_4px_16px_rgba(0,0,0,0.85)] group-hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] backdrop-blur-sm transition-all duration-200">
        
        {/* Corner Rivet Screws (flush mounted on the wall) */}
        <span className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-stone-400 shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)]" />
        <span className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full bg-stone-400 shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)]" />
        <span className="absolute bottom-0.5 left-0.5 w-1 h-1 rounded-full bg-stone-400 shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)]" />
        <span className="absolute bottom-0.5 right-0.5 w-1 h-1 rounded-full bg-stone-400 shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)]" />

        {/* Top Header Tag */}
        <div className="flex items-center justify-between border-b border-white/10 pb-0.5 mb-1 text-[7px] font-mono tracking-wider text-amber-300/90 uppercase">
          <div className="flex items-center gap-0.5">
            <span className="w-1 h-1 rounded-full bg-orange-500 animate-pulse" />
            <span>SEC-17 WALL</span>
          </div>
          <span className="bg-amber-500/20 text-amber-300 px-0.5 py-0.2 rounded font-bold text-[6px]">
            AD SLOT
          </span>
        </div>

        {/* Main Billboard Headline */}
        <div className="py-0.5 text-center space-y-0.5">
          <div className="font-black text-[9px] sm:text-[10px] tracking-tight text-white group-hover:text-amber-200 uppercase leading-none font-sans drop-shadow-sm">
            Spotlight Your
          </div>
          <div className="font-extrabold text-[11px] sm:text-[12px] tracking-wide text-amber-400 group-hover:text-amber-300 uppercase leading-tight font-yatra drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
            Brand Here
          </div>
          <div className="text-[7.5px] text-stone-300/80 font-medium">
            Sector 17 Hoarding
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-1 pt-1 border-t border-white/10 flex items-center justify-between">
          <span className="text-[7px] font-mono text-stone-400">
            50K+ Views
          </span>
          <div className="flex items-center gap-0.5 bg-amber-400 group-hover:bg-amber-300 text-stone-950 px-1.5 py-0.5 rounded text-[7.5px] font-black tracking-wide shadow transition-all group-hover:scale-105">
            <span>Book</span>
            <ArrowUpRight className="w-2 h-2 stroke-[3]" />
          </div>
        </div>

      </div>

      {/* Subtle Shadow Cast directly on Concrete Wall */}
      <div className="absolute -bottom-1 left-1 right-1 h-1 bg-black/50 blur-[2px] rounded pointer-events-none" />

    </div>
  );
};
