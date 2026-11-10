import React, { useState } from 'react';
import { MapPin, Sparkles } from 'lucide-react';

export const IllustratedScene: React.FC = () => {
  const [activeLandmark, setActiveLandmark] = useState<string | null>(null);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
      
      {/* 1. Dramatic Sunset & Twilight Sky (Deep Violet to Sunset Gold) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1c0836] via-[#4d164d] via-35% via-[#8c2a49] via-55% via-[#d95338] via-75% to-[#fba834]" />

      {/* 2. Golden Sunset Sun Glow behind Shivalik Hills */}
      <div className="absolute top-[22%] left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-t from-[#ffd166] via-[#f78c6b] to-transparent opacity-75 blur-3xl transform -translate-y-16" />
      <div className="absolute top-[32%] left-[48%] -translate-x-1/2 w-[180px] h-[180px] rounded-full bg-[#fffbeb] opacity-90 blur-md" />

      {/* Subtle Twilight Cloud Bands */}
      <div className="absolute top-[28%] left-[-10%] w-[120%] h-12 bg-gradient-to-r from-transparent via-[#f78c6b]/30 to-transparent blur-xl" />
      <div className="absolute top-[36%] left-[-10%] w-[120%] h-16 bg-gradient-to-r from-transparent via-[#ffd166]/20 to-transparent blur-lg" />

      {/* 3. Landmark Badges (Interactive Subtle Highlights) */}
      <div className="absolute inset-0 pointer-events-auto z-10 hidden sm:block">
        
        {/* Open Hand Monument Tag */}
        <div className="absolute top-[38%] left-[76%] transform -translate-x-1/2">
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-amber-400/40 px-2.5 py-1 rounded-full text-[10px] font-bold text-amber-300 shadow-lg cursor-pointer hover:scale-105 transition-transform">
            <MapPin className="w-3 h-3 text-orange-400" />
            <span>Open Hand Monument • Sec 1</span>
          </div>
        </div>

        {/* Sukhna Lake Tag */}
        <div className="absolute top-[58%] left-[48%] transform -translate-x-1/2">
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-amber-400/40 px-2.5 py-1 rounded-full text-[10px] font-bold text-amber-300 shadow-lg cursor-pointer hover:scale-105 transition-transform">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Sukhna Lake Promenade</span>
          </div>
        </div>

        {/* Sector 17 Plaza Tag */}
        <div className="absolute top-[52%] left-[18%] transform -translate-x-1/2">
          <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-amber-400/40 px-2.5 py-1 rounded-full text-[10px] font-bold text-amber-300 shadow-lg cursor-pointer hover:scale-105 transition-transform">
            <MapPin className="w-3 h-3 text-orange-400" />
            <span>Sector 17 Heritage Plaza</span>
          </div>
        </div>

      </div>

      {/* 4. Detailed Landmark Vector Canvas (SVG) */}
      <svg
        className="absolute bottom-0 w-full h-[72%] min-w-[1280px] object-cover"
        viewBox="0 0 1440 680"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Deep Shivalik Foothills (Background Mountains) */}
        <path
          d="M0,280 Q160,200 340,240 T700,190 T1060,230 T1440,200 L1440,680 L0,680 Z"
          fill="#441740"
          fillOpacity="0.85"
        />

        {/* Mid-range Shivaliks & Foothills Ridge */}
        <path
          d="M0,320 Q200,260 440,300 T900,270 T1440,310 L1440,680 L0,680 Z"
          fill="#2b0d2b"
          fillOpacity="0.95"
        />

        {/* ======================================================== */}
        {/* FAMOUS LANDMARK 1: THE OPEN HAND MONUMENT (Sector 1) */}
        {/* ======================================================== */}
        <g transform="translate(1060, 200) scale(1.15)" fill="#1a061c">
          {/* Base Geometric Pedestal (Le Corbusier Concrete Trench) */}
          <rect x="52" y="115" width="26" height="65" rx="3" fill="#150417" />
          <polygon points="36,180 94,180 82,195 48,195" fill="#150417" />
          <line x1="65" y1="115" x2="65" y2="180" stroke="#fba834" strokeWidth="1" opacity="0.3" />

          {/* Iconic Open Hand Contour */}
          <path
            d="M 65,22 C 58,22 53,30 53,42 C 53,52 50,66 42,74 C 34,82 18,86 15,94 C 11,102 16,111 25,113 C 37,115 54,113 65,113 C 77,113 100,113 112,106 C 120,101 125,90 120,80 C 115,70 102,72 94,74 C 88,61 85,46 85,34 C 85,24 77,22 71,22 Z"
            fill="#1f0724"
            stroke="#fba834"
            strokeWidth="1.2"
            strokeOpacity="0.5"
          />
          {/* Rotating Bearing pivot circle */}
          <circle cx="65" cy="115" r="5" fill="#ffd166" opacity="0.7" />
        </g>

        {/* ======================================================== */}
        {/* FAMOUS LANDMARK 2: SECTOR 17 PLAZA & FOUNTAIN (Left) */}
        {/* ======================================================== */}
        <g transform="translate(140, 310)" fill="#1c0721">
          {/* Modernist Concrete Bridge / Colonnades (Le Corbusier Grid) */}
          <rect x="0" y="80" width="220" height="12" fill="#240a2a" />
          <rect x="15" y="92" width="10" height="50" fill="#150418" />
          <rect x="55" y="92" width="10" height="50" fill="#150418" />
          <rect x="95" y="92" width="10" height="50" fill="#150418" />
          <rect x="135" y="92" width="10" height="50" fill="#150418" />
          <rect x="175" y="92" width="10" height="50" fill="#150418" />

          {/* Building Facades with Signature Chandigarh Brise-Soleil / Cutouts */}
          <rect x="10" y="30" width="90" height="50" fill="#18051e" />
          <rect x="110" y="20" width="100" height="60" fill="#16041c" />
          {/* Windows / Grids */}
          <rect x="20" y="40" width="15" height="15" fill="#ffd166" opacity="0.6" rx="2" />
          <rect x="45" y="40" width="15" height="15" fill="#ffd166" opacity="0.4" rx="2" />
          <rect x="70" y="40" width="15" height="15" fill="#fba834" opacity="0.5" rx="2" />
          <rect x="125" y="35" width="20" height="18" fill="#ffd166" opacity="0.7" rx="2" />
          <rect x="160" y="35" width="20" height="18" fill="#ffd166" opacity="0.5" rx="2" />

          {/* Iconic Sector 17 Central Plaza Water Fountain */}
          <ellipse cx="260" cy="130" rx="45" ry="12" fill="#2d0f36" />
          {/* Vertical Fountain Water Jets (Illuminated in Amber/Cyan) */}
          <path d="M260,130 Q260,70 258,60 Q260,70 262,130" stroke="#ffd166" strokeWidth="2.5" opacity="0.8" />
          <path d="M260,130 Q250,85 245,75 Q252,95 260,130" stroke="#fba834" strokeWidth="2" opacity="0.7" />
          <path d="M260,130 Q270,85 275,75 Q268,95 260,130" stroke="#fba834" strokeWidth="2" opacity="0.7" />
          <ellipse cx="260" cy="130" rx="35" ry="8" fill="#ffd166" opacity="0.25" />
        </g>

        {/* ======================================================== */}
        {/* FAMOUS LANDMARK 3: NEK CHAND ROCK GARDEN ARCHES (Mid-Left) */}
        {/* ======================================================== */}
        <g transform="translate(430, 340)" fill="#18051f">
          {/* Characteristic Rock Garden Mosaic Wall with Stepped Arches */}
          <path d="M0,70 Q25,30 50,70 Q75,30 100,70 Q125,30 150,70 L150,110 L0,110 Z" fill="#230829" />
          <circle cx="25" cy="50" r="10" fill="#0e0212" />
          <circle cx="75" cy="50" r="10" fill="#0e0212" />
          <circle cx="125" cy="50" r="10" fill="#0e0212" />
          {/* Mosaic decorative stones */}
          <circle cx="25" cy="50" r="3" fill="#ffd166" opacity="0.7" />
          <circle cx="75" cy="50" r="3" fill="#fba834" opacity="0.7" />
          <circle cx="125" cy="50" r="3" fill="#ffd166" opacity="0.7" />
        </g>

        {/* ======================================================== */}
        {/* FAMOUS LANDMARK 4: SUKHNA LAKE & SHORELINE (Center Water) */}
        {/* ======================================================== */}
        {/* Lake Water Surface */}
        <path
          d="M0,450 Q360,430 720,445 T1440,435 L1440,680 L0,680 Z"
          fill="#130417"
        />
        {/* Water Golden Shimmer Waves */}
        <ellipse cx="720" cy="475" rx="320" ry="22" fill="#fba834" fillOpacity="0.32" />
        <ellipse cx="720" cy="505" rx="420" ry="16" fill="#ffd166" fillOpacity="0.22" />
        <ellipse cx="720" cy="535" rx="520" ry="12" fill="#d95338" fillOpacity="0.18" />

        {/* Iconic Sukhna Lake Paddle Boats (Two Romantic Swan/Pedal Boats) */}
        <g transform="translate(680, 460) scale(0.9)" fill="#0d0210">
          <path d="M 0,16 L 42,16 L 50,4 L -8,4 Z" fill="#1c0722" stroke="#fba834" strokeWidth="1" strokeOpacity="0.5" />
          {/* Canopy & Pedalers */}
          <polygon points="14,4 20,-12 28,4" fill="#ffd166" opacity="0.8" />
          <circle cx="12" cy="0" r="3.5" fill="#ffd166" />
          <circle cx="28" cy="0" r="3.5" fill="#ffd166" />
        </g>
        <g transform="translate(820, 470) scale(0.7)" fill="#0d0210">
          <path d="M 0,16 L 42,16 L 50,4 L -8,4 Z" fill="#1c0722" stroke="#ffd166" strokeWidth="1" strokeOpacity="0.4" />
          <polygon points="14,4 20,-12 28,4" fill="#fba834" opacity="0.7" />
        </g>

        {/* Promenade Tree Canopy (Sukhna Weeping Willows & Kikar Trees) */}
        <g fill="#0e0212">
          {/* Left promenade trees */}
          <ellipse cx="60" cy="460" rx="65" ry="85" />
          <ellipse cx="120" cy="470" rx="55" ry="75" />
          <ellipse cx="190" cy="485" rx="50" ry="65" />
          <rect x="55" y="520" width="12" height="70" />
          <rect x="115" y="530" width="10" height="60" />

          {/* Right promenade trees */}
          <ellipse cx="1260" cy="450" rx="70" ry="90" />
          <ellipse cx="1340" cy="460" rx="60" ry="80" />
          <ellipse cx="1410" cy="470" rx="50" ry="70" />
          <rect x="1255" y="520" width="14" height="70" />

          {/* Foreground Promenade Walkway Line */}
          <path d="M0,560 Q720,545 1440,560 L1440,680 L0,680 Z" fill="#08010a" />
        </g>
      </svg>

      {/* 5. Left Foreground: Gedi Route Vintage Open Vehicle with Warm Headlights */}
      <div className="absolute bottom-6 left-2 sm:left-10 w-52 sm:w-72 pointer-events-none">
        <svg viewBox="0 0 220 130" fill="none" className="w-full">
          {/* Headlight Warm Beam */}
          <polygon points="180,90 320,65 320,120 180,105" fill="url(#headlightGlow)" opacity="0.45" />
          <defs>
            <linearGradient id="headlightGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fffbeb" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#fba834" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Retro Open Thar / Gypsy Silhouette */}
          <path d="M20,100 L190,100 L190,80 L165,75 L155,50 L105,50 L95,75 L30,75 L20,85 Z" fill="#0c020e" />
          <line x1="105" y1="50" x2="150" y2="50" stroke="#0c020e" strokeWidth="4" />
          <path d="M75,75 L75,35 L130,35 L130,50" stroke="#0c020e" strokeWidth="4" fill="none" />
          {/* Wheels with Chrome Hubcaps */}
          <circle cx="55" cy="100" r="18" fill="#18041c" stroke="#08010a" strokeWidth="4" />
          <circle cx="155" cy="100" r="18" fill="#18041c" stroke="#08010a" strokeWidth="4" />
          <circle cx="55" cy="100" r="8" fill="#ffd166" opacity="0.8" />
          <circle cx="155" cy="100" r="8" fill="#ffd166" opacity="0.8" />
          {/* Headlamp Orb */}
          <circle cx="188" cy="88" r="6" fill="#fffbeb" />
        </svg>
      </div>

      {/* 6. Right Foreground: Roadside Adda Dhaba Chai Tapri with Glowing Filament Bulbs */}
      <div className="absolute bottom-5 right-0 sm:right-8 w-60 sm:w-80 pointer-events-none">
        <svg viewBox="0 0 240 190" fill="none" className="w-full">
          {/* Wooden Pergola Shed Frame */}
          <rect x="30" y="30" width="10" height="160" fill="#100314" />
          <rect x="200" y="30" width="10" height="160" fill="#100314" />
          <line x1="15" y1="35" x2="225" y2="35" stroke="#100314" strokeWidth="7" />
          {/* Wire for hanging bulbs */}
          <path d="M30,40 Q75,60 120,44 Q165,60 205,42" stroke="#ffd166" strokeWidth="1.5" fill="none" opacity="0.7" />

          {/* Steaming Chai Counter */}
          <rect x="75" y="120" width="85" height="50" fill="#0d0210" rx="3" />
          <ellipse cx="117" cy="120" rx="40" ry="6" fill="#1b0521" />
          {/* Kettle */}
          <path d="M108,110 L128,110 L134,122 L102,122 Z" fill="#ffd166" opacity="0.9" />
          <circle cx="118" cy="98" r="11" fill="#100314" />
          <path d="M112,87 Q118,82 124,87" stroke="#100314" strokeWidth="3" fill="none" />
          {/* Chai Glasses on Wooden Bench */}
          <rect x="85" y="110" width="7" height="11" fill="#fba834" opacity="0.85" rx="1" />
          <rect x="96" y="110" width="7" height="11" fill="#fba834" opacity="0.85" rx="1" />
          <rect x="142" y="110" width="7" height="11" fill="#fba834" opacity="0.85" rx="1" />
        </svg>

        {/* Real CSS Glowing Filament Bulbs */}
        <div className="absolute top-[42px] left-[78px] flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-amber-300 shadow-[0_0_24px_8px_rgba(251,191,36,0.95)] animate-pulse" />
        </div>
        <div className="absolute top-[46px] left-[165px] flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-amber-300 shadow-[0_0_26px_9px_rgba(245,158,11,1)] animate-pulse" />
        </div>
      </div>

    </div>
  );
};
