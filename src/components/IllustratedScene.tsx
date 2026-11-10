import React from 'react';

export const IllustratedScene: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
      
      {/* 1. Dramatic Sunset Gradient Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2b1055] via-[#75225b] via-40% via-[#b93b44] via-65% via-[#e66d3b] to-[#f9a646]" />

      {/* 2. Soft Sunset Sun & Twilight Glow */}
      <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-gradient-to-t from-[#ffd460] to-[#ff6e40] opacity-80 blur-2xl transform -translate-y-12" />
      <div className="absolute top-[34%] left-1/2 -translate-x-1/2 w-[160px] h-[160px] rounded-full bg-[#fff4cc] opacity-90 blur-md" />

      {/* 3. Shivalik Foothills / Mountain Layers (SVG) */}
      <svg
        className="absolute bottom-0 w-full h-[65%] min-w-[1200px] object-cover"
        viewBox="0 0 1440 600"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Distant Mountain Range (Soft Purple Silhouette) */}
        <path
          d="M0,320 Q180,240 360,280 T720,230 T1080,270 T1440,240 L1440,600 L0,600 Z"
          fill="#5a2254"
          fillOpacity="0.85"
        />

        {/* Mid-range Shivaliks (Warm Burgundy Silhouette) */}
        <path
          d="M0,360 Q220,300 480,340 T960,310 T1440,350 L1440,600 L0,600 Z"
          fill="#3b1539"
          fillOpacity="0.92"
        />

        {/* Le Corbusier Open Hand Monument Silhouette (Right ridge) */}
        <g transform="translate(1080, 260) scale(0.65)" fill="#240c26">
          {/* Base pedestal */}
          <rect x="75" y="110" width="18" height="50" rx="3" />
          <polygon points="60,160 108,160 98,175 70,175" />
          {/* Open Hand contour */}
          <path d="M 84,30 C 78,30 74,38 74,48 C 74,58 72,70 65,76 C 58,82 45,86 42,92 C 38,98 42,106 50,108 C 60,110 75,108 85,108 C 95,108 115,108 125,102 C 132,98 136,88 132,80 C 128,72 118,74 110,76 C 105,65 102,52 102,42 C 102,32 96,30 90,30 Z" />
        </g>

        {/* Sukhna Lake Water Mirror */}
        <path
          d="M0,420 Q360,400 720,415 T1440,410 L1440,600 L0,600 Z"
          fill="#1c0a20"
        />
        {/* Water Gold Reflection Shimmer */}
        <ellipse cx="720" cy="450" rx="280" ry="25" fill="#f9a646" fillOpacity="0.25" />
        <ellipse cx="720" cy="475" rx="360" ry="18" fill="#e66d3b" fillOpacity="0.18" />
        <ellipse cx="720" cy="505" rx="440" ry="12" fill="#ffd460" fillOpacity="0.12" />

        {/* Silhouette Lakeside Promenade & Pine / Willow Trees */}
        <g fill="#140618">
          {/* Tree cluster left */}
          <ellipse cx="80" cy="440" rx="55" ry="70" />
          <ellipse cx="140" cy="450" rx="45" ry="60" />
          <ellipse cx="210" cy="460" rx="40" ry="50" />
          <rect x="75" y="480" width="10" height="60" />
          <rect x="135" y="490" width="8" height="50" />

          {/* Tree cluster right */}
          <ellipse cx="1280" cy="430" rx="60" ry="75" />
          <ellipse cx="1350" cy="440" rx="50" ry="65" />
          <ellipse cx="1410" cy="445" rx="45" ry="55" />
          <rect x="1275" y="480" width="12" height="60" />

          {/* Romantic Sukhna Paddle Boat Silhouettes */}
          <g transform="translate(620, 435) scale(0.7)">
            <path d="M 0,15 L 35,15 L 42,5 L -7,5 Z" />
            <polygon points="12,5 18,-10 22,5" />
            <line x1="18" y1="-10" x2="18" y2="5" stroke="#140618" strokeWidth="2" />
          </g>
          <g transform="translate(760, 445) scale(0.55)">
            <path d="M 0,15 L 35,15 L 42,5 L -7,5 Z" />
            <polygon points="12,5 18,-10 22,5" />
          </g>

          {/* Foreground Street Level / Promenade Line */}
          <path d="M0,520 Q720,510 1440,520 L1440,600 L0,600 Z" fill="#0d0310" />
        </g>
      </svg>

      {/* 4. Left Foreground: Vintage CH-01 Open Jeep / Vespa Silhouette with Warm Headlight Glow */}
      <div className="absolute bottom-6 left-2 sm:left-8 w-48 sm:w-64 opacity-90 pointer-events-none">
        <svg viewBox="0 0 200 120" fill="none" className="w-full">
          {/* Headlight Warm Beam */}
          <polygon points="160,82 280,60 280,110 160,95" fill="url(#headlightBeam)" opacity="0.4" />
          <defs>
            <linearGradient id="headlightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fff3bf" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffb703" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Vintage Open Jeep Silhouette */}
          <path d="M20,95 L170,95 L170,75 L150,70 L140,50 L95,50 L85,70 L30,70 L20,80 Z" fill="#120417" />
          {/* Windshield frame */}
          <line x1="95" y1="50" x2="135" y2="50" stroke="#120417" strokeWidth="3" />
          {/* Roll cage */}
          <path d="M70,70 L70,35 L120,35 L120,50" stroke="#120417" strokeWidth="3.5" fill="none" />
          {/* Wheels */}
          <circle cx="50" cy="95" r="16" fill="#1b0821" stroke="#0d0310" strokeWidth="4" />
          <circle cx="140" cy="95" r="16" fill="#1b0821" stroke="#0d0310" strokeWidth="4" />
          <circle cx="50" cy="95" r="7" fill="#ffb703" opacity="0.7" />
          <circle cx="140" cy="95" r="7" fill="#ffb703" opacity="0.7" />
          {/* Headlight yellow orb */}
          <circle cx="168" cy="80" r="5" fill="#fff3bf" />
        </svg>
      </div>

      {/* 5. Right Foreground: Roadside Adda Dhaba Chai Tapri Pergola with Glowing Fairy Bulbs */}
      <div className="absolute bottom-4 right-0 sm:right-6 w-56 sm:w-72 pointer-events-none">
        <svg viewBox="0 0 220 180" fill="none" className="w-full">
          {/* Wooden Shed Pergola Pillars */}
          <rect x="25" y="30" width="8" height="150" fill="#17061d" />
          <rect x="180" y="30" width="8" height="150" fill="#17061d" />
          {/* Crossbeam */}
          <line x1="10" y1="35" x2="200" y2="35" stroke="#17061d" strokeWidth="6" />
          {/* Wire for hanging bulbs */}
          <path d="M25,38 Q65,55 105,42 Q145,55 185,40" stroke="#ffb703" strokeWidth="1.5" fill="none" opacity="0.6" />

          {/* Steaming Chai Kettle on rustic counter */}
          <rect x="70" y="115" width="75" height="45" fill="#120417" rx="3" />
          <ellipse cx="108" cy="115" rx="35" ry="5" fill="#200a29" />
          {/* Kettle */}
          <path d="M100,105 L120,105 L125,115 L95,115 Z" fill="#ffb703" opacity="0.9" />
          <circle cx="110" cy="95" r="10" fill="#17061d" />
          <path d="M104,85 Q110,80 116,85" stroke="#17061d" strokeWidth="3" fill="none" />
          {/* Glasses */}
          <rect x="80" y="105" width="6" height="10" fill="#ffd460" opacity="0.8" rx="1" />
          <rect x="90" y="105" width="6" height="10" fill="#ffd460" opacity="0.8" rx="1" />
          <rect x="130" y="105" width="6" height="10" fill="#ffd460" opacity="0.8" rx="1" />
        </svg>

        {/* Glowing Hanging Incandescent Bulbs (CSS Glow Animation) */}
        <div className="absolute top-[38px] left-[65px] flex flex-col items-center">
          <div className="w-3.5 h-3.5 rounded-full bg-amber-300 shadow-[0_0_18px_6px_rgba(251,191,36,0.9)] animate-pulse" />
        </div>
        <div className="absolute top-[42px] left-[145px] flex flex-col items-center">
          <div className="w-3.5 h-3.5 rounded-full bg-amber-300 shadow-[0_0_20px_7px_rgba(245,158,11,0.95)] animate-pulse" />
        </div>
      </div>

      {/* 6. Ambient Flying Birds & Fireflies Particles */}
      <div className="absolute top-[22%] left-[18%] w-1.5 h-1.5 rounded-full bg-amber-300 opacity-70 blur-[0.5px] animate-ping" />
      <div className="absolute top-[32%] right-[24%] w-1.5 h-1.5 rounded-full bg-amber-300 opacity-60 blur-[0.5px] animate-pulse" />
      <div className="absolute top-[45%] left-[45%] w-2 h-2 rounded-full bg-orange-400 opacity-50 blur-[1px] animate-bounce" />

      {/* 7. Subtle Grain & Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/15 to-black/60 pointer-events-none" />
    </div>
  );
};
