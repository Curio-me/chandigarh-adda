import React from 'react';
import { MapPin, Sparkles } from 'lucide-react';
import { NeonBillboard } from './NeonBillboard';

interface IllustratedSceneProps {
  onOpenPartnerModal?: () => void;
}

export const IllustratedScene: React.FC<IllustratedSceneProps> = ({ onOpenPartnerModal }) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
      
      {/* 1. Original Bespoke Illustrative Artwork of Chandigarh Famous Places */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-1000 scale-[1.02]"
        style={{ backgroundImage: `url('/chandigarh-landmarks-bg.jpg')` }}
      />

      {/* 2. Soft Twilight Vignette Overlay for Text Readability & Golden Hour Ambiance */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 via-45% to-black/75 pointer-events-none" />

      {/* 3. Interactive Floating Landmark Badges & Illustrated Neon Billboard */}
      <div className="absolute inset-0 pointer-events-auto z-10 hidden md:block">
        
        {/* Sector 17 Rooftop Neon Billboard (Live Sponsor Ad Example) */}
        <div className="absolute top-[20%] left-[13%] transform -translate-x-1/2">
          <NeonBillboard onOpenPartnerModal={onOpenPartnerModal} />
        </div>

        {/* Open Hand Monument Badge */}
        <div className="absolute top-[28%] left-[78%] transform -translate-x-1/2">
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-[#ffd166]/40 px-3 py-1 rounded-full text-[11px] font-bold text-[#ffd166] shadow-xl hover:scale-105 transition-transform cursor-default">
            <MapPin className="w-3.5 h-3.5 text-[#f97316]" />
            <span>Open Hand Monument • Sector 1</span>
          </div>
        </div>

        {/* Sukhna Lake Promenade Badge */}
        <div className="absolute top-[52%] left-[48%] transform -translate-x-1/2">
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-[#ffd166]/40 px-3 py-1 rounded-full text-[11px] font-bold text-[#ffd166] shadow-xl hover:scale-105 transition-transform cursor-default">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd166]" />
            <span>Sukhna Lake Promenade</span>
          </div>
        </div>

        {/* Sector 17 Plaza Badge */}
        <div className="absolute top-[44%] left-[16%] transform -translate-x-1/2">
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-[#ffd166]/40 px-3 py-1 rounded-full text-[11px] font-bold text-[#ffd166] shadow-xl hover:scale-105 transition-transform cursor-default">
            <MapPin className="w-3.5 h-3.5 text-[#f97316]" />
            <span>Sector 17 Heritage Plaza</span>
          </div>
        </div>

      </div>

    </div>
  );
};
