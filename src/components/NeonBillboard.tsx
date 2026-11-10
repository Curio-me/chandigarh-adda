import React from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';

interface NeonBillboardProps {
  onOpenPartnerModal?: () => void;
}

export const NeonBillboard: React.FC<NeonBillboardProps> = ({ onOpenPartnerModal }) => {
  return (
    <div className="relative group cursor-pointer" onClick={onOpenPartnerModal}>
      
      {/* 1. Metal Scaffolding & Truss Frame supporting the billboard */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-32 flex justify-between px-4 pointer-events-none opacity-80">
        {/* Left Truss Leg */}
        <div className="w-1.5 h-6 bg-gradient-to-b from-stone-500 via-stone-700 to-stone-900 border-x border-stone-400" />
        {/* Cross Bracing */}
        <div className="w-12 h-0.5 bg-stone-600 mt-3 self-center rotate-12" />
        {/* Right Truss Leg */}
        <div className="w-1.5 h-6 bg-gradient-to-b from-stone-500 via-stone-700 to-stone-900 border-x border-stone-400" />
      </div>

      {/* 2. Neon Ambient Backlight / Atmospheric Fog Glow */}
      <div className="absolute inset-0 bg-pink-500/25 blur-xl rounded-2xl group-hover:bg-cyan-500/35 transition-all duration-700 pointer-events-none" />

      {/* 3. The Neon Billboard Sign Case */}
      <div className="relative bg-black/85 backdrop-blur-md border-2 border-[#ff2a85] group-hover:border-[#00f0ff] rounded-lg p-2.5 sm:p-3 shadow-[0_0_20px_rgba(255,42,133,0.6),inset_0_0_12px_rgba(255,42,133,0.3)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.7),inset_0_0_15px_rgba(0,240,255,0.4)] transition-all duration-500 transform group-hover:scale-105">
        
        {/* Top Mini Neon Ticker */}
        <div className="flex items-center justify-between gap-2 border-b border-[#ff2a85]/40 group-hover:border-[#00f0ff]/40 pb-1 mb-1.5">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a85] group-hover:bg-[#00f0ff] animate-ping" />
            <span className="font-mono text-[8px] tracking-widest text-[#ff80bf] group-hover:text-[#80f8ff] uppercase font-bold drop-shadow-[0_0_4px_#ff2a85]">
              ★ SEC-17 NEON BILLBOARD ★
            </span>
          </div>
          <span className="font-mono text-[8px] bg-[#ff2a85]/20 group-hover:bg-[#00f0ff]/20 text-[#ff80bf] group-hover:text-[#80f8ff] px-1 rounded uppercase">
            LIVE AD
          </span>
        </div>

        {/* Main Brand Headline in Glowing Neon Typography */}
        <div className="text-center py-0.5">
          <div className="font-black text-sm sm:text-base tracking-wider text-white uppercase drop-shadow-[0_0_8px_#ff2a85] group-hover:drop-shadow-[0_0_10px_#00f0ff] transition-all">
            YOUR BRAND HERE
          </div>
          <div className="text-[9px] sm:text-[10px] text-[#ffe600] tracking-wide font-bold drop-shadow-[0_0_6px_#ffe600] mt-0.5">
            ⚡ 50,000+ TRICITY VIEWS / MO ⚡
          </div>
        </div>

        {/* Bottom Tagline / CTA */}
        <div className="mt-1.5 pt-1 border-t border-[#ff2a85]/30 group-hover:border-[#00f0ff]/30 flex items-center justify-between text-[8px] text-stone-300">
          <span className="font-mono text-stone-400 group-hover:text-cyan-200">
            Sector 17 Rooftop Space
          </span>
          <span className="flex items-center gap-0.5 text-[#ff80bf] group-hover:text-[#80f8ff] font-bold">
            <span>Claim Space</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </span>
        </div>

        {/* Hanging Neon Pull-Chain / Cable Accent */}
        <div className="absolute -bottom-3 right-4 w-0.5 h-3 bg-stone-500">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 -ml-[2px] mt-2 shadow-[0_0_4px_#f59e0b]" />
        </div>

      </div>

      {/* Floating Tooltip hint on hover */}
      <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-black/90 text-[10px] text-amber-300 px-2 py-0.5 rounded border border-amber-500/40 shadow-lg">
        Click to book this Neon Billboard slot
      </div>

    </div>
  );
};
