import React from 'react';
import { Sun, Wind, Flame, Bell } from 'lucide-react';
import { liveWeather } from '../data/mockData';

export const TricityWeatherTicker: React.FC = () => {
  return (
    <div className="bg-amber-50/80 border-b border-amber-200/60 py-2 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-stone-700 gap-2">
        
        {/* Left: Live Vibe */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar w-full md:w-auto">
          <div className="flex items-center gap-1.5 bg-amber-100/80 text-amber-900 px-2.5 py-0.5 rounded-full font-semibold flex-shrink-0">
            <Flame className="w-3.5 h-3.5 text-amber-600 animate-bounce" />
            <span>Tricity Pulse</span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 text-stone-600">
            <span className="flex items-center gap-1">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <strong className="text-stone-900">{liveWeather.temp}°C</strong> {liveWeather.condition}
            </span>
            <span className="text-stone-300">•</span>
            <span className="flex items-center gap-1">
              <Wind className="w-3.5 h-3.5 text-emerald-600" />
              AQI: <strong className="text-emerald-700">{liveWeather.aqi}</strong> ({liveWeather.aqiStatus})
            </span>
          </div>
        </div>

        {/* Right: Recommendation Ticker */}
        <div className="flex items-center gap-2 text-stone-600 w-full md:w-auto justify-start md:justify-end">
          <Bell className="w-3.5 h-3.5 text-orange-500 flex-shrink-0 hidden sm:inline" />
          <span className="truncate">
            <span className="font-semibold text-stone-800">Adda Weekend Pick:</span> {liveWeather.weekendHighlight}
          </span>
        </div>

      </div>
    </div>
  );
};
