import React from 'react';
import { Sparkles, ExternalLink, ArrowUpRight } from 'lucide-react';

interface Sector17WallBillboardProps {
  onOpenPartnerModal?: () => void;
}

export const Sector17WallBillboard: React.FC<Sector17WallBillboardProps> = ({ onOpenPartnerModal }) => {
  return (
    <div 
      onClick={onOpenPartnerModal}
      className="group relative cursor-pointer select-none transition-all duration-300"
      title="Click to reserve this Sector 17 Plaza Billboard"
      style={{
        transform: 'perspective(900px) rotateY(6deg) rotateX(1deg) skewY(-1.5deg)',
        transformOrigin: 'top left',
      }}
    >
      {/* 1. Vintage Overhead Gooseneck Lamps */}
      <div className="absolute -top-4 left-0 right-0 flex justify-around px-3 pointer-events-none z-20">
        {/* Lamp 1 */}
        <div className="flex flex-col items-center">
          <div className="w-1 h-3 bg-stone-700 rounded-t" />
          <div className="w-4 h-1.5 bg-stone-800 rounded-full border border-stone-600 shadow-sm" />
          <div className="w-8 h-8 -mt-1 bg-amber-400/10 group-hover:bg-amber-400/25 blur-md rounded-full transition-all duration-300" />
        </div>
        {/* Lamp 2 */}
        <div className="flex flex-col items-center">
          <div className="w-1 h-3 bg-stone-700 rounded-t" />
          <div className="w-4 h-1.5 bg-stone-800 rounded-full border border-stone-600 shadow-sm" />
          <div className="w-8 h-8 -mt-1 bg-amber-400/10 group-hover:bg-amber-400/25 blur-md rounded-full transition-all duration-300" />
        </div>
      </div>

      {/* 2. Outer Weathered Architectural Iron Frame */}
      <div className="relative bg-stone-950/90 group-hover:bg-black border-2 border-stone-600/80 group-hover:border-amber-400/90 rounded-md p-2.5 sm:p-3 shadow-[0_8px_25px_rgba(0,0,0,0.85)] group-hover:shadow-[0_0_30px_rgba(251,191,36,0.35)] backdrop-blur-sm transition-all duration-300 w-[175px] sm:w-[205px]">
        
        {/* Corner Rivet Screws */}
        <span className="absolute top-1 left-1 w-1 h-1 rounded-full bg-stone-400 shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)]" />
        <span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-stone-400 shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)]" />
        <span className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-stone-400 shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)]" />
        <span className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-stone-400 shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)]" />

        {/* Top Header Tag */}
        <div className="flex items-center justify-between border-b border-white/10 pb-1 mb-1.5 text-[8px] font-mono tracking-widest text-amber-300/90 uppercase">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span>SEC-17 WALL #01</span>
          </div>
          <span className="bg-amber-500/20 text-amber-300 px-1 py-0.5 rounded font-bold">
            AVAILABLE
          </span>
        </div>

        {/* Main Billboard Headline */}
        <div className="py-1 text-center space-y-0.5">
          <div className="font-black text-xs sm:text-sm tracking-tight text-white group-hover:text-amber-200 transition-colors uppercase leading-tight font-sans drop-shadow-sm">
            Spotlight Your
          </div>
          <div className="font-extrabold text-sm sm:text-base tracking-wider text-amber-400 group-hover:text-amber-300 uppercase leading-none font-yatra drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            Brand Here
          </div>
          <div className="text-[9px] text-stone-300/80 font-medium pt-0.5">
            Chandigarh Plaza Hoarding
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center justify-between">
          <span className="text-[9px] font-mono text-stone-400">
            50K+ Monthly Reach
          </span>
          <div className="flex items-center gap-0.5 bg-amber-400 group-hover:bg-amber-300 text-stone-950 px-2 py-0.5 rounded text-[9px] font-black tracking-wide shadow transition-all group-hover:scale-105">
            <span>Book Wall</span>
            <ArrowUpRight className="w-2.5 h-2.5 stroke-[3]" />
          </div>
        </div>

      </div>

      {/* Subtle Shadow Cast on Concrete Wall */}
      <div className="absolute -bottom-2 left-2 right-2 h-2 bg-black/60 blur-sm rounded pointer-events-none" />

    </div>
  );
};
