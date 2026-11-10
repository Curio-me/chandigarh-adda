import React from 'react';
import { Search, Compass, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { InstagramIcon, TwitterIcon } from './SocialIcons';

interface HeroProps {
  onSearchSelect: (term: string) => void;
  onExploreClick: () => void;
  onOpenSubmit: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearchSelect,
  onExploreClick,
  onOpenSubmit
}) => {
  const trendingTags = [
    'Book Concerts',
    'Sector 26 Cafes',
    'Sukhna Lake Dawn',
    'Phase 3B2 Food Street',
    'Kasauli Day Trip',
    'Sector 8 Roasters'
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 text-white py-12 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-stone-800">
      
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Tricity Cultural Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/90 border border-stone-700/80 text-stone-200 text-xs font-semibold mb-6 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
          <span className="tracking-wide font-medium">ਚੰਡੀਗੜ੍ਹ • ਮੋਹਾਲੀ • ਪੰਚਕੂਲਾ</span>
          <span className="text-stone-500">|</span>
          <span className="text-amber-400 font-bold">The City Beautiful</span>
          <span className="hidden sm:inline text-stone-500">|</span>
          <span className="hidden sm:inline text-emerald-400 font-medium">📻 CH-01 Jukebox Live</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight sm:leading-none">
          Discover, Explore & Experience <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
            The City Beautiful
          </span>
        </h1>

        {/* Mission Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-stone-300 max-w-3xl mx-auto leading-relaxed font-normal">
          Chandigarh’s premier city guide and lifestyle platform — your trusted companion for everything happening across the tricity of Chandigarh, Mohali, and Panchkula. From food and culture to concerts, weekend trips, and lifestyle stories.
        </p>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onExploreClick}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm px-6 py-3 rounded-full shadow-lg shadow-orange-600/30 transition-all hover:scale-105"
          >
            <Compass className="w-4 h-4" />
            Explore Tricity Curations
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenSubmit}
            className="flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium text-sm px-5 py-3 rounded-full border border-stone-700 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-orange-400" />
            Feature Your Brand / Event
          </button>
        </div>

        {/* Trending Tags Bar */}
        <div className="mt-8 pt-6 border-t border-stone-800/80 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-stone-400 font-semibold mr-1">Trending across Tricity:</span>
          {trendingTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onSearchSelect(tag)}
              className="bg-stone-800/90 hover:bg-orange-950/60 hover:text-orange-300 hover:border-orange-500/50 text-stone-300 px-3 py-1 rounded-full border border-stone-700 transition-all"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Social Follow Badges */}
        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-stone-400">
          <span className="flex items-center gap-1.5">
            Join the community:
          </span>
          <a
            href="https://instagram.com/chandigarhadda"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-stone-300 hover:text-orange-400 font-semibold transition-colors"
          >
            <InstagramIcon className="w-4 h-4 text-orange-500" />
            Instagram @chandigarhadda
          </a>
          <a
            href="https://twitter.com/chandigarhadda"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-stone-300 hover:text-sky-400 font-semibold transition-colors"
          >
            <TwitterIcon className="w-4 h-4 text-sky-400" />
            Twitter @chandigarhadda
          </a>
        </div>

      </div>
    </div>
  );
};
