import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Bookmark, 
  Share2, 
  Sparkles, 
  Check, 
  ArrowUpRight, 
  Calendar,
  Ticket,
  Star
} from 'lucide-react';
import { ItemData } from '../types';

interface DetailModalProps {
  item: ItemData | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  item,
  onClose,
  isSaved,
  onToggleSave
}) => {
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    item.sectorOrArea + ' ' + item.title
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-100 flex flex-col my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-md transition-all shadow-lg"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Image */}
        <div className="relative aspect-[16/9] w-full bg-stone-900 flex-shrink-0">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* Badges on image */}
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {item.category.toUpperCase()}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                {item.sectorOrArea}
              </span>
              {item.rating && (
                <span className="bg-amber-400 text-stone-950 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> {item.rating.toFixed(1)}
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-3xl font-black leading-tight text-white">
              {item.title}
            </h2>

            {item.subtitle && (
              <p className="mt-1 text-xs sm:text-sm text-stone-200 font-medium">
                {item.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Quick Info Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 border border-stone-200/80 p-3.5 rounded-2xl text-xs">
            {item.dateBadge && (
              <div>
                <span className="text-stone-400 block font-medium">Date / Time</span>
                <span className="font-bold text-stone-800 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-orange-600" />
                  {item.dateBadge}
                </span>
              </div>
            )}
            {item.timing && (
              <div>
                <span className="text-stone-400 block font-medium">Timings</span>
                <span className="font-bold text-stone-800 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-orange-600" />
                  {item.timing}
                </span>
              </div>
            )}
            {item.priceOrCost && (
              <div>
                <span className="text-stone-400 block font-medium">Cost / Entry</span>
                <span className="font-bold text-stone-800 mt-0.5 block">
                  {item.priceOrCost}
                </span>
              </div>
            )}
            <div>
              <span className="text-stone-400 block font-medium">Curated by</span>
              <span className="font-bold text-stone-800 mt-0.5 block">
                {item.author || 'Chandigarh Adda Desk'}
              </span>
            </div>
          </div>

          {/* Adda Insider Tip Callout */}
          {item.insiderTip && (
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-2xl">
              <div className="flex items-center gap-2 text-orange-900 font-bold text-sm mb-1">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span>Chandigarh Adda Insider Tip</span>
              </div>
              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                {item.insiderTip}
              </p>
            </div>
          )}

          {/* Detailed Content */}
          <div className="prose prose-stone max-w-none text-stone-700 text-sm sm:text-base leading-relaxed space-y-4">
            <p className="font-medium text-stone-900 text-base sm:text-lg">
              {item.summary}
            </p>
            <p className="text-stone-600">
              {item.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {item.tags.map(tag => (
              <span key={tag} className="text-xs bg-stone-100 text-stone-600 px-3 py-1 rounded-full font-medium">
                #{tag}
              </span>
            ))}
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleSave(item.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isSaved
                    ? 'bg-orange-600 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                {isSaved ? 'Saved in My Adda' : 'Save to Favorites'}
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                {copied ? 'Link Copied!' : 'Share Guide'}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={mapSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                <MapPin className="w-4 h-4 text-orange-400" />
                Directions
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {item.ticketUrl && (
                <button
                  onClick={() => alert(`Redirecting to ticket booking for "${item.title}". You will be notified on your official Chandigarh Adda booking channel!`)}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-xl text-xs font-bold shadow-md shadow-orange-500/30 transition-all hover:scale-105"
                >
                  <Ticket className="w-4 h-4" />
                  Book / RSVP Now
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
