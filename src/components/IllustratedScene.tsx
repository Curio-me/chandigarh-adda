import React from 'react';
import { MapPin, Sparkles } from 'lucide-react';

export const IllustratedScene: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
      
      {/* 1. Base Painterly Warm Dusk Canvas (Exact high-res artwork from truckplaylist.wtf) */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/truck-bg.jpg')` }}
      />

      {/* 2. Atmospheric Golden Sunset Gradient Overlay so text & landmarks pop */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent via-40% to-black/75 pointer-events-none" />

      {/* 3. Famous Chandigarh Landmarks Silhouette Overlay */}
      <svg
        className="absolute bottom-0 w-full h-[65%] min-w-[1280px] object-cover pointer-events-none opacity-85"
        viewBox="0 0 1440 600"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shivalik Mountain Foothills on the Horizon */}
        <path
          d="M0,260 Q180,180 360,220 T720,170 T1080,210 T1440,180 L1440,600 L0,600 Z"
          fill="#1c0722"
          fillOpacity="0.75"
        />

        {/* FAMOUS LANDMARK 1: THE OPEN HAND MONUMENT (Sector 1) */}
        <g transform="translate(1080, 160) scale(1.1)" fill="#ffd166">
          {/* Concrete Pedestal */}
          <rect x="52" y="105" width="22" height="55" fill="#150417" />
          <polygon points="38,160 88,160 78,172 48,172" fill="#150417" />
          {/* Glowing Open Hand Silhouette */}
          <path
            d="M 63,22 C 56,22 51,30 51,42 C 51,52 48,66 40,74 C 32,82 16,86 13,94 C 9,102 14,111 23,113 C 35,115 52,113 63,113 C 75,113 98,113 110,106 C 118,101 123,90 118,80 C 113,70 100,72 92,74 C 86,61 83,46 83,34 C 83,24 75,22 69,22 Z"
            fill="#120317"
            stroke="#ffc300"
            strokeWidth="2"
          />
          <circle cx="63" cy="105" r="4" fill="#ffc300" />
        </g>

        {/* FAMOUS LANDMARK 2: SECTOR 17 PLAZA FOUNTAIN (Left) */}
        <g transform="translate(130, 260)" fill="#1c0721">
          {/* Modernist Concrete Bridges */}
          <rect x="0" y="80" width="180" height="10" fill="#120317" />
          <rect x="20" y="90" width="8" height="40" fill="#120317" />
          <rect x="60" y="90" width="8" height="40" fill="#120317" />
          <rect x="100" y="90" width="8" height="40" fill="#120317" />
          <rect x="140" y="90" width="8" height="40" fill="#120317" />

          {/* Glowing Plaza Fountain with Amber Water Jets */}
          <ellipse cx="230" cy="120" rx="35" ry="10" fill="#2d0f36" />
          <path d="M230,120 Q230,70 228,60 Q230,70 232,120" stroke="#ffd166" strokeWidth="2.5" opacity="0.9" />
          <path d="M230,120 Q220,85 216,75 Q224,95 230,120" stroke="#f2790f" strokeWidth="2" opacity="0.8" />
          <path d="M230,120 Q240,85 244,75 Q236,95 230,120" stroke="#f2790f" strokeWidth="2" opacity="0.8" />
        </g>

        {/* FAMOUS LANDMARK 3: SUKHNA LAKE WATERS & BOATS (Center) */}
        <ellipse cx="720" cy="380" rx="360" ry="25" fill="#fba834" fillOpacity="0.2" />
        <ellipse cx="720" cy="410" rx="460" ry="18" fill="#ffd166" fillOpacity="0.15" />

        {/* Paddle Boats floating on lake */}
        <g transform="translate(680, 370) scale(0.85)">
          <path d="M 0,16 L 42,16 L 50,4 L -8,4 Z" fill="#0d0210" stroke="#ffc300" strokeWidth="1.5" />
          <polygon points="14,4 20,-12 28,4" fill="#ffd166" opacity="0.9" />
        </g>
        <g transform="translate(800, 380) scale(0.65)">
          <path d="M 0,16 L 42,16 L 50,4 L -8,4 Z" fill="#0d0210" stroke="#f2790f" strokeWidth="1.5" />
          <polygon points="14,4 20,-12 28,4" fill="#f2790f" opacity="0.9" />
        </g>
      </svg>

      {/* 4. Famous Landmark Locator Badges */}
      <div className="absolute inset-0 pointer-events-auto z-10 hidden sm:block">
        
        {/* Open Hand Monument Badge */}
        <div className="absolute top-[32%] left-[78%] transform -translate-x-1/2">
          <div className="flex items-center gap-1.5 bg-black/65 backdrop-blur-md border border-[#ffc300]/50 px-3 py-1 rounded-full text-[11px] font-bold text-[#ffd166] shadow-xl hover:scale-105 transition-transform cursor-default">
            <MapPin className="w-3.5 h-3.5 text-[#f2790f]" />
            <span>Open Hand Monument • Sector 1</span>
          </div>
        </div>

        {/* Sukhna Lake Promenade Badge */}
        <div className="absolute top-[52%] left-[48%] transform -translate-x-1/2">
          <div className="flex items-center gap-1.5 bg-black/65 backdrop-blur-md border border-[#ffc300]/50 px-3 py-1 rounded-full text-[11px] font-bold text-[#ffd166] shadow-xl hover:scale-105 transition-transform cursor-default">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd166]" />
            <span>Sukhna Lake Promenade</span>
          </div>
        </div>

        {/* Sector 17 Plaza Badge */}
        <div className="absolute top-[46%] left-[18%] transform -translate-x-1/2">
          <div className="flex items-center gap-1.5 bg-black/65 backdrop-blur-md border border-[#ffc300]/50 px-3 py-1 rounded-full text-[11px] font-bold text-[#ffd166] shadow-xl hover:scale-105 transition-transform cursor-default">
            <MapPin className="w-3.5 h-3.5 text-[#f2790f]" />
            <span>Sector 17 Heritage Plaza</span>
          </div>
        </div>

      </div>

    </div>
  );
};
