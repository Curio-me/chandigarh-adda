import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { tricityHighlights } from '../data/mockData';
import { TricityZone } from '../types';

interface TricityZonesGridProps {
  activeZone: TricityZone;
  onSelectZone: (zone: TricityZone) => void;
}

export const TricityZonesGrid: React.FC<TricityZonesGridProps> = ({
  activeZone,
  onSelectZone
}) => {
  const getZoneKey = (name: string): TricityZone => {
    if (name.toLowerCase().includes('chandigarh')) return 'chandigarh';
    if (name.toLowerCase().includes('mohali')) return 'mohali';
    if (name.toLowerCase().includes('panchkula')) return 'panchkula';
    return 'escapes';
  };

  return (
    <div className="py-12 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-orange-600 text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>One Tricity, Three Personalities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
              Explore By Region
            </h2>
          </div>
          <p className="text-xs text-stone-500 max-w-md mt-2 sm:mt-0">
            Tailor your discoveries across sectors, phases, and scenic foothill getaways.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tricityHighlights.map((zone) => {
            const zoneKey = getZoneKey(zone.name);
            const isSelected = activeZone === zoneKey;

            return (
              <div
                key={zone.name}
                onClick={() => onSelectZone(zoneKey)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col justify-between border ${
                  isSelected 
                    ? 'bg-stone-900 text-white shadow-xl scale-[1.02] border-stone-800 ring-2 ring-orange-500' 
                    : 'bg-white hover:bg-stone-50 text-stone-900 border-stone-200/80 shadow-xs hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      isSelected ? 'bg-orange-500 text-white' : 'bg-stone-100 text-stone-600'
                    }`}>
                      {zone.count}
                    </span>
                    <span className="text-xs opacity-60">📍</span>
                  </div>

                  <h3 className="text-xl font-black mt-3">{zone.name}</h3>
                  <p className={`text-xs font-semibold mt-0.5 ${isSelected ? 'text-orange-400' : 'text-orange-600'}`}>
                    {zone.tagline}
                  </p>

                  <p className={`text-xs mt-2 leading-relaxed ${isSelected ? 'text-stone-300' : 'text-stone-600'}`}>
                    {zone.description}
                  </p>
                </div>

                <div className={`mt-5 pt-3 border-t text-xs font-bold flex items-center justify-between ${
                  isSelected ? 'border-stone-800 text-orange-400' : 'border-stone-100 text-stone-700'
                }`}>
                  <span>{isSelected ? 'Currently Viewing' : 'Explore Guides'}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
