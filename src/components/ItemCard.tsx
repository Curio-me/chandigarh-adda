import React from 'react';
import { Bookmark, MapPin, Clock, ArrowUpRight, Star, Sparkles, Ticket } from 'lucide-react';
import { ItemData } from '../types';

interface ItemCardProps {
  item: ItemData;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelect: (item: ItemData) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  isSaved,
  onToggleSave,
  onSelect,
}) => {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'events':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'food':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'guides':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'escapes':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'lifestyle':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'startups':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'news':
        return 'bg-stone-100 text-stone-800 border-stone-200';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-200';
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'events': return 'Events & Gigs';
      case 'food': return 'Food & Dining';
      case 'guides': return 'City Guide';
      case 'escapes': return 'Weekend Escape';
      case 'lifestyle': return 'Lifestyle';
      case 'startups': return 'Local Startup';
      case 'news': return 'City News';
      default: return cat;
    }
  };

  return (
    <div 
      onClick={() => onSelect(item)}
      className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md shadow-sm uppercase tracking-wide ${getCategoryColor(item.category)}`}>
            {getCategoryLabel(item.category)}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(item.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              isSaved
                ? 'bg-orange-600 text-white shadow-md'
                : 'bg-black/40 text-white hover:bg-black/60'
            }`}
            title={isSaved ? "Saved to your list" : "Save for later"}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Sector / Location pill */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <span className="flex items-center gap-1 font-semibold bg-black/50 px-2.5 py-1 rounded-lg backdrop-blur-sm">
            <MapPin className="w-3.5 h-3.5 text-orange-400" />
            {item.sectorOrArea}
          </span>

          {item.dateBadge && (
            <span className="bg-orange-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow">
              {item.dateBadge}
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Subtitle / category tag */}
          {item.rating && (
            <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mb-1">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{item.rating.toFixed(1)}</span>
              <span className="text-stone-400 font-normal ml-1">• Verified Pick</span>
            </div>
          )}

          <h3 className="text-lg font-bold text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
            {item.title}
          </h3>

          <p className="mt-2 text-stone-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {item.summary}
          </p>

          {/* Insider Tip Badge */}
          {item.insiderTip && (
            <div className="mt-3 bg-stone-50 border border-stone-200/80 rounded-xl p-2.5 flex items-start gap-2 text-xs text-stone-700">
              <Sparkles className="w-3.5 h-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
              <p className="line-clamp-2">
                <strong className="text-stone-900">Adda Tip:</strong> {item.insiderTip}
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2">
            {item.readTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                {item.readTime}
              </span>
            )}
            {item.priceOrCost && (
              <span className="font-semibold text-stone-700">
                • {item.priceOrCost}
              </span>
            )}
          </div>

          <span className="flex items-center gap-1 text-orange-600 font-bold group-hover:translate-x-0.5 transition-transform">
            {item.ticketUrl ? 'Book / RSVP' : 'View Guide'}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>

      </div>
    </div>
  );
};
