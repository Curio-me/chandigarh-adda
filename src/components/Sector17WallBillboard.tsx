import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface Sector17WallBillboardProps {
  onOpenPartnerModal?: () => void;
}

export const Sector17WallBillboard: React.FC<Sector17WallBillboardProps> = ({ onOpenPartnerModal }) => {
  return (
    <div 
      onClick={onOpenPartnerModal}
      className="group relative cursor-pointer select-none transition-all duration-300 w-[106px] sm:w-[114px]"
      title="Click to reserve this Sector 17 Plaza Billboard"
      style={{
        transform: 'perspective(600px) rotateY(3deg) skewY(-0.5deg)',
        transformOrigin: 'center center',
      }}
    >
      {/* Outer Weathered Architectural Iron Frame - Exact fit for the rooftop concrete block */}
      <div className="relative bg-stone-950/95 group-hover:bg-black border border-stone-600/90 group-hover:border-amber-400 rounded p-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.9)] group-hover:shadow-[0_0_18px_rgba(251,191,36,0.35)] backdrop-blur-sm transition-all duration-200">
        
        {/* Corner Rivet Screws */}
        <span className="absolute top-0.5 left-0.5 w-0.5 h-0.5 rounded-full bg-stone-400 shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)]" />
        <span className="absolute top-0.5 right-0.5 w-0.5 h-0.5 rounded-full bg-stone-400 shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)]" />
        <span className="absolute bottom-0.5 left-0.5 w-0.5 h-0.5 rounded-full bg-stone-400 shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)]" />
        <span className="absolute bottom-0.5 right-0.5 w-0.5 h-0.5 rounded-full bg-stone-400 shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)]" />

        {/* Top Header Tag */}
        <div className="flex items-center justify-between border-b border-white/10 pb-0.5 mb-1 text-[6.5px] font-mono tracking-wider text-amber-300 uppercase">
          <div className="flex items-center gap-0.5">
            <span className="w-1 h-1 rounded-full bg-orange-500 animate-pulse" />
            <span>SEC-17 WALL</span>
          </div>
          <span className="bg-amber-500/20 text-amber-300 px-0.5 rounded font-bold text-[6px]">
            AD SLOT
          </span>
        </div>

        {/* Main Billboard Headline */}
        <div className="py-0.5 text-center space-y-0.5">
          <div className="font-black text-[8px] sm:text-[8.5px] tracking-tight text-white group-hover:text-amber-200 uppercase leading-none font-sans drop-shadow-sm">
            Spotlight Your
          </div>
          <div className="font-extrabold text-[10px] sm:text-[11px] tracking-wide text-amber-400 group-hover:text-amber-300 uppercase leading-tight font-yatra drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
            Brand Here
          </div>
          <div className="text-[6.5px] text-stone-300/80 font-medium">
            Sector 17 Hoarding
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-1 pt-0.5 border-t border-white/10 flex items-center justify-between">
          <span className="text-[6.5px] font-mono text-stone-400">
            50K+ Views
          </span>
          <div className="flex items-center gap-0.5 bg-amber-400 group-hover:bg-amber-300 text-stone-950 px-1 py-0.5 rounded text-[7px] font-black tracking-wide shadow transition-all group-hover:scale-105">
            <span>Book</span>
            <ArrowUpRight className="w-1.5 h-1.5 stroke-[3]" />
          </div>
        </div>

      </div>

      {/* Subtle Shadow Cast on Concrete Wall */}
      <div className="absolute -bottom-1 left-1 right-1 h-1 bg-black/60 blur-[2px] rounded pointer-events-none" />

    </div>
  );
};
