import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Key } from 'lucide-react';

interface GediEntranceOverlayProps {
  onStartGedi: () => void;
  onEnterSilent: () => void;
  temp?: number;
  aqi?: number;
  aqiLabel?: string;
}

export const GediEntranceOverlay: React.FC<GediEntranceOverlayProps> = ({
  onStartGedi,
  onEnterSilent,
  temp = 22,
  aqi = 120,
  aqiLabel = 'MODERATE',
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  // Check if user already dismissed in this session
  useEffect(() => {
    if (sessionStorage.getItem('chandigarh_adda_entered') === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleStart = () => {
    sessionStorage.setItem('chandigarh_adda_entered', 'true');
    setIsFading(true);
    onStartGedi();
    setTimeout(() => {
      setIsVisible(false);
    }, 600);
  };

  const handleSilent = () => {
    sessionStorage.setItem('chandigarh_adda_entered', 'true');
    setIsFading(true);
    onEnterSilent();
    setTimeout(() => {
      setIsVisible(false);
    }, 600);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-10 bg-black/90 backdrop-blur-2xl transition-opacity duration-700 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Subtle Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px'
        }}
      />

      {/* Top Bar: Telemetry */}
      <div className="w-full flex items-center justify-between text-[10px] sm:text-xs font-mono text-stone-400 tracking-widest uppercase relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>CH-01 • GEDISTREAM 93.5 FM</span>
        </div>
        <div className="hidden sm:block text-amber-400/80">
          SUKHNA LAKE • {temp}°C • AQI {aqi} ({aqiLabel})
        </div>
      </div>

      {/* Center Content: Big Retro Adda Branding & Ignition Button */}
      <div className="relative z-10 max-w-xl mx-auto text-center space-y-4 sm:space-y-6 my-auto">
        
        {/* Animated Radio / Key Icon */}
        <div className="text-4xl sm:text-5xl animate-bounce duration-1000">
          📻
        </div>

        {/* Giant Retro Title */}
        <div className="space-y-1">
          <h1 className="font-yatra text-5xl sm:text-7xl md:text-8xl text-[#fff3dc] drop-shadow-[4px_4px_0_#d62828] filter drop-shadow-[8px_8px_0_rgba(0,0,0,0.7)] leading-none select-none">
            ਚੰਡੀਗੜ੍ਹ ਅੱਡਾ
          </h1>
          <div className="font-yatra text-base sm:text-xl md:text-2xl text-[#ffc300] tracking-wider uppercase pt-1 drop-shadow-md">
            चंडीगढ़ अड्डा • CHANDIGARH ADDA
          </div>
        </div>

        {/* Poetic Subtitle */}
        <p className="font-mukta text-stone-300 text-sm sm:text-base md:text-lg max-w-md mx-auto font-medium leading-relaxed drop-shadow">
          Gedi Route beats. Sukhna Lake sunset. Night highway to Kasauli. Dhaba chai. Full volume.
        </p>

        {/* The Ignition / Start The Gedi Button */}
        <div className="pt-2 sm:pt-4 flex flex-col items-center gap-3">
          
          <button
            onClick={handleStart}
            className="group relative px-8 sm:px-12 py-3.5 sm:py-4 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 hover:from-orange-500 hover:to-amber-400 text-stone-950 font-black text-sm sm:text-base tracking-[0.2em] uppercase rounded-xl shadow-[0_0_35px_rgba(249,115,22,0.5)] hover:shadow-[0_0_50px_rgba(245,158,11,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 border border-amber-300"
          >
            {/* Retro Industrial Corner Brackets */}
            <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-white/80 -translate-x-1 -translate-y-1" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-white/80 translate-x-1 -translate-y-1" />
            <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-white/80 -translate-x-1 translate-y-1" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-white/80 translate-x-1 translate-y-1" />

            <Volume2 className="w-5 h-5 text-stone-950 group-hover:animate-pulse" />
            <span>START THE GEDI • ਗੇੜੀ ਸ਼ੁਰੂ ਕਰੋ</span>
          </button>

          {/* Silent Enter Option */}
          <button
            onClick={handleSilent}
            className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-200 transition-colors pt-2 font-mono tracking-wider"
          >
            <VolumeX className="w-3.5 h-3.5" />
            <span>or browse quietly without music</span>
          </button>

        </div>

      </div>

      {/* Bottom Footer Telemetry */}
      <div className="w-full flex items-center justify-between text-[10px] font-mono text-stone-500 tracking-widest uppercase relative z-10 pt-4 border-t border-white/5">
        <span>AUTHENTIC CH-01 CASSETTE</span>
        <span className="text-amber-500/80 font-bold">100% UNINTERRUPTED STEREO</span>
        <span>THE CITY BEAUTIFUL</span>
      </div>

    </div>
  );
};
