import React from 'react';
import { MapPin, Sparkles } from 'lucide-react';
import { Sector17WallBillboard } from './Sector17WallBillboard';

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

      {/* 2b. Subtle Analog 90s Film Grain Texture (Inspired by Mazdoor Radio) */}
      <div 
        className="absolute inset-0 opacity-[0.045] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px'
        }}
      />

      {/* 2c. Ultra-Subtle CRT Scanlines for Vintage Doordarshan / VHS Tape Vibe */}
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.45) 50%)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* 2d. Cinematic Lens Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />

      {/* 3. Interactive Floating Landmark Badges & Sector 17 Wall Billboard */}
      <div className="absolute inset-0 pointer-events-auto z-10 hidden sm:block">
        
        {/* Sector 17 Rooftop Concrete Wall Panel (Exact match from the crop) */}
        <div className="absolute top-[16%] left-[2.8%] sm:left-[3.2%] md:left-[3.6%] lg:left-[4%] hidden md:block">
          <Sector17WallBillboard onOpenPartnerModal={onOpenPartnerModal} />
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
        <div className="absolute top-[48%] left-[12%] transform -translate-x-1/2">
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-[#ffd166]/40 px-3 py-1 rounded-full text-[11px] font-bold text-[#ffd166] shadow-xl hover:scale-105 transition-transform cursor-default">
            <MapPin className="w-3.5 h-3.5 text-[#f97316]" />
            <span>Sector 17 Heritage Plaza</span>
          </div>
        </div>

      </div>

    </div>
  );
};
