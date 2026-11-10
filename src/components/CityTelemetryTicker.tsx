import React, { useState, useEffect } from 'react';
import { Radio, Navigation, Compass } from 'lucide-react';

const TRICITY_TELEMETRY = [
  {
    tag: 'GEDI ROUTE',
    status: 'SECTOR 8 · 9 · 10 · 11',
    info: 'CRUISING ACTIVE • BASS FULL VOLUME',
    color: 'text-amber-400',
  },
  {
    tag: 'SUKHNA LAKE',
    status: 'PROMENADE & GOLF COURSE',
    info: '24°C COOL BREEZE • GOLDEN HOUR CHAI',
    color: 'text-emerald-400',
  },
  {
    tag: 'NH-5 EXPRESSWAY',
    status: 'KALKA - KASAULI HIGHWAY',
    info: 'CLEAR ROADS • SHIVALIK MIST ROLLING IN',
    color: 'text-sky-400',
  },
  {
    tag: 'CITY AQI',
    status: 'SECTOR 22 CAAQMS MONITOR',
    info: 'AQI 118 (MODERATE) • SHIVALIK AIRFLOW',
    color: 'text-amber-400',
  },
  {
    tag: 'NIGHT ADDA',
    status: 'SECTOR 35 & 26 PLAZA',
    info: 'DHABA CHAI • FOOD & NIGHTLIFE OPEN',
    color: 'text-orange-400',
  },
];

export const CityTelemetryTicker: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TRICITY_TELEMETRY.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = TRICITY_TELEMETRY[index];

  return (
    <div className="mt-2.5 mx-auto max-w-md px-3 animate-in fade-in duration-300">
      <div className="flex items-center justify-between gap-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-3.5 py-1 shadow-lg text-[10px] sm:text-[11px] font-mono text-stone-300">
        
        {/* Live Pulse LED & Tag */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shadow-[0_0_4px_#34d399]" />
          <span className={`font-bold tracking-wider ${current.color}`}>
            [{current.tag}]
          </span>
        </div>

        {/* Dynamic Telemetry Status */}
        <div className="truncate text-center text-stone-200">
          <span className="text-amber-300/90 font-medium">{current.status}</span>
          <span className="hidden sm:inline text-stone-500 mx-1.5">•</span>
          <span className="hidden sm:inline text-stone-400">{current.info}</span>
        </div>

        {/* Radio Freq Tag */}
        <div className="hidden sm:flex items-center gap-1 text-[9px] text-stone-400 shrink-0 font-bold tracking-widest uppercase">
          <Radio className="w-2.5 h-2.5 text-amber-400" />
          <span>93.5 FM</span>
        </div>

      </div>
    </div>
  );
};
