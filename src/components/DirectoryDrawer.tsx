import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  MapPin, 
  Bookmark, 
  Sparkles, 
  ArrowUpRight,
  Filter,
  Compass
} from 'lucide-react';
import { ItemData, CategoryType, TricityZone } from '../types';
import { allItems } from '../data/mockData';
import { ItemCard } from './ItemCard';

interface DirectoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: CategoryType;
  onSelectItem: (item: ItemData) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

export const DirectoryDrawer: React.FC<DirectoryDrawerProps> = ({
  isOpen,
  onClose,
  initialCategory = 'all',
  onSelectItem,
  savedIds,
  onToggleSave
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(initialCategory);
  const [selectedZone, setSelectedZone] = useState<TricityZone>('all');
  const [search, setSearch] = useState('');

  // Keep synced if opened with a specific pillar
  React.useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const categories: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'All Curations' },
    { id: 'events', label: 'Events & Gigs' },
    { id: 'food', label: 'Food & Cafes' },
    { id: 'guides', label: 'City Guides' },
    { id: 'escapes', label: 'Weekend Escapes' },
    { id: 'lifestyle', label: 'Lifestyle' },
    { id: 'startups', label: 'Startups' },
    { id: 'news', label: 'City Updates' }
  ];

  const zones: { id: TricityZone; label: string }[] = [
    { id: 'all', label: 'All Tricity' },
    { id: 'chandigarh', label: 'Chandigarh' },
    { id: 'mohali', label: 'Mohali' },
    { id: 'panchkula', label: 'Panchkula' },
    { id: 'escapes', label: 'Escapes' }
  ];

  const filtered = useMemo(() => {
    return allItems.filter(item => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      if (selectedZone !== 'all') {
        if (selectedZone === 'escapes' && item.zone !== 'escapes') return false;
        if (selectedZone !== 'escapes' && item.zone !== selectedZone) return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.sectorOrArea.toLowerCase().includes(q) ||
          item.tags.some(t => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [selectedCategory, selectedZone, search]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md flex justify-end animate-fade-in">
      <div 
        className="w-full max-w-4xl bg-stone-900 text-stone-100 h-full shadow-2xl flex flex-col justify-between border-l border-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-6 border-b border-stone-800 flex items-center justify-between bg-stone-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold shadow-lg shadow-orange-600/30">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-lg text-white tracking-tight">
                Tricity Guide & Living Directory
              </h3>
              <p className="text-xs text-stone-400">
                Chandigarh • Mohali • Panchkula • Weekend Escapes
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 sm:p-6 border-b border-stone-800 bg-stone-900/90 space-y-3">
          
          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search Sector 26 cafes, Sukhna Lake, Kasauli, comedy shows..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-stone-950 text-xs sm:text-sm text-stone-100 rounded-xl border border-stone-700 focus:outline-none focus:border-orange-500"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Categories Horizontal Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === c.id
                    ? 'bg-orange-600 text-white shadow'
                    : 'bg-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-700'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Zones */}
          <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-800/60">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-stone-500 font-semibold mr-1">Zone:</span>
              {zones.map(z => (
                <button
                  key={z.id}
                  onClick={() => setSelectedZone(z.id)}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all ${
                    selectedZone === z.id
                      ? 'bg-stone-200 text-stone-900 font-bold'
                      : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
                  }`}
                >
                  {z.label}
                </button>
              ))}
            </div>

            <span className="text-stone-500 text-[11px] hidden sm:inline">
              {filtered.length} curations found
            </span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-stone-950/40">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-stone-500">
              <Compass className="w-12 h-12 mx-auto stroke-1 mb-2 text-stone-600" />
              <p className="font-bold text-sm text-stone-300">No curations matched your filters</p>
              <p className="text-xs text-stone-500 mt-1">Try resetting search or zone filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map(item => (
                <ItemCard
                  key={item.id}
                  item={item}
                  isSaved={savedIds.includes(item.id)}
                  onToggleSave={onToggleSave}
                  onSelect={(selected) => {
                    onSelectItem(selected);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-950 flex justify-between items-center text-xs text-stone-400">
          <span>chandigarhadda.com • The City Beautiful</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-white rounded-lg font-bold"
          >
            Close Directory
          </button>
        </div>

      </div>
    </div>
  );
};
