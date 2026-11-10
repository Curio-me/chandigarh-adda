import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Search, 
  Bookmark, 
  PlusCircle, 
  Menu, 
  X,
  Sparkles
} from 'lucide-react';
import { InstagramIcon, TwitterIcon } from './SocialIcons';
import { TricityZone, CategoryType } from '../types';

interface HeaderProps {
  activeCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  activeZone: TricityZone;
  onSelectZone: (zone: TricityZone) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenSubmit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  activeZone,
  onSelectZone,
  searchQuery,
  onSearchChange,
  savedCount,
  onOpenSaved,
  onOpenSubmit
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const zones: { id: TricityZone; label: string }[] = [
    { id: 'all', label: 'All Tricity' },
    { id: 'chandigarh', label: 'Chandigarh' },
    { id: 'mohali', label: 'Mohali' },
    { id: 'panchkula', label: 'Panchkula' },
    { id: 'escapes', label: 'Weekend Escapes' }
  ];

  const categories: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'Discover All' },
    { id: 'events', label: 'Events & What’s On' },
    { id: 'food', label: 'Food & Dining' },
    { id: 'guides', label: 'City Guides' },
    { id: 'escapes', label: 'Weekend Escapes' },
    { id: 'lifestyle', label: 'Lifestyle' },
    { id: 'startups', label: 'Startups & Business' },
    { id: 'news', label: 'City Updates' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all">
      {/* Top micro-bar */}
      <div className="bg-stone-900 text-stone-200 text-xs py-1.5 px-4 sm:px-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-orange-400 font-semibold tracking-wide uppercase text-[11px]">
            <Sparkles className="w-3 h-3 animate-pulse" /> chandigarhadda.com
          </span>
          <span className="hidden sm:inline text-stone-400">|</span>
          <span className="hidden sm:inline text-stone-300">
            The Tricity's Trusted Living & Culture Platform
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="https://instagram.com/chandigarhadda" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-orange-400 transition-colors"
            title="Follow Chandigarh Adda on Instagram"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
            <span className="hidden md:inline">@chandigarhadda</span>
          </a>
          <a 
            href="https://twitter.com/chandigarhadda" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-sky-400 transition-colors"
            title="Follow Chandigarh Adda on Twitter / X"
          >
            <TwitterIcon className="w-3.5 h-3.5" />
            <span className="hidden md:inline">@chandigarhadda</span>
          </a>
          <button 
            onClick={onOpenSubmit}
            className="hidden md:flex items-center gap-1 bg-orange-600 hover:bg-orange-500 text-white px-2.5 py-0.5 rounded text-[11px] font-medium transition-colors"
          >
            <PlusCircle className="w-3 h-3" /> Feature Your Business / Event
          </button>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div 
            onClick={() => { onSelectCategory('all'); onSelectZone('all'); }}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-stone-900 group-hover:text-orange-600 transition-colors">
                  CHANDIGARH <span className="text-orange-600">ADDA</span>
                </span>
                <span className="text-[10px] bg-orange-100 text-orange-800 font-bold px-1.5 py-0.5 rounded uppercase">
                  Tricity
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium tracking-wide">
                Chandigarh • Mohali • Panchkula
              </p>
            </div>
          </div>

          {/* Quick Search */}
          <div className="hidden lg:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search events, Sector 26 cafes, Kasauli trips, live gigs..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-stone-100 focus:bg-white text-sm text-stone-800 rounded-full border border-stone-200 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange('')} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenSaved}
              className="relative p-2 text-stone-600 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors"
              title="Saved Places & Guides"
            >
              <Bookmark className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-scale-in">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenSubmit}
              className="flex md:hidden items-center justify-center p-2 text-stone-700 hover:text-orange-600 hover:bg-stone-100 rounded-lg"
              title="Submit Business or Event"
            >
              <PlusCircle className="w-5 h-5 text-orange-600" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Zone Selector Pills */}
        <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between overflow-x-auto no-scrollbar gap-2">
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-xs text-stone-400 flex items-center gap-1 mr-1">
              <MapPin className="w-3.5 h-3.5 text-stone-400" /> Zone:
            </span>
            {zones.map((z) => (
              <button
                key={z.id}
                onClick={() => onSelectZone(z.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeZone === z.id
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {z.label}
              </button>
            ))}
          </div>

          <div className="hidden xl:flex items-center text-xs text-stone-500 font-medium">
            <span>✨ Live Updates & Handpicked Recommendations</span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 py-4 space-y-3 animate-fade-in">
          <div className="relative w-full mb-3">
            <input
              type="text"
              placeholder="Search Tricity guides, cafes, gigs..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-stone-100 text-sm rounded-lg border border-stone-200 focus:outline-none focus:border-orange-500"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Explore Pillars</p>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-xs px-3 py-2 rounded-lg font-medium transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-orange-50 text-orange-700 font-semibold border border-orange-200'
                    : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-200 flex justify-between items-center text-xs">
            <span className="text-stone-500">Connect with us:</span>
            <div className="flex gap-3 text-stone-700">
              <a href="https://instagram.com/chandigarhadda" target="_blank" rel="noreferrer" className="flex items-center gap-1 font-semibold text-orange-600">
                <InstagramIcon className="w-4 h-4" /> Instagram
              </a>
              <a href="https://twitter.com/chandigarhadda" target="_blank" rel="noreferrer" className="flex items-center gap-1 font-semibold text-sky-600">
                <TwitterIcon className="w-4 h-4" /> Twitter
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
