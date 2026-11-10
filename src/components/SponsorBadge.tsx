import React, { useState } from 'react';
import { Sparkles, ArrowRight, X, Flame } from 'lucide-react';

interface SponsorBadgeProps {
  onOpenPartnerModal?: () => void;
}

export const SponsorBadge: React.FC<SponsorBadgeProps> = ({ onOpenPartnerModal }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return (
      <div className="mt-3 flex items-center justify-center">
        <button
          onClick={() => setIsVisible(true)}
          className="text-[10px] text-amber-300/70 hover:text-amber-200 underline font-mono tracking-wider transition-colors"
        >
          [+ Show Partner Spotlight]
        </button>
      </div>
    );
  }

  return (
    <div className="mt-3 sm:mt-4 mx-auto max-w-xl px-4 animate-in fade-in duration-300">
      <div className="relative group bg-stone-900/90 hover:bg-stone-900 border-2 border-amber-500/50 hover:border-amber-400 rounded-xl px-3.5 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all">
        
        {/* Subtle retro rivet bolts in corners */}
        <span className="absolute top-1 left-1.5 w-1 h-1 rounded-full bg-amber-400/60 shadow-[0_0_2px_#ffb703]" />
        <span className="absolute top-1 right-1.5 w-1 h-1 rounded-full bg-amber-400/60 shadow-[0_0_2px_#ffb703]" />
        <span className="absolute bottom-1 left-1.5 w-1 h-1 rounded-full bg-amber-400/60 shadow-[0_0_2px_#ffb703]" />
        <span className="absolute bottom-1 right-1.5 w-1 h-1 rounded-full bg-amber-400/60 shadow-[0_0_2px_#ffb703]" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 text-left">
          
          {/* Badge & Prompt Info */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {/* Retro Spotlight Tag */}
            <div className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-600 text-stone-950 font-black text-[9px] sm:text-[10px] px-2 py-0.5 rounded uppercase tracking-wider shadow-sm shrink-0">
              <Flame className="w-3 h-3 fill-stone-950" />
              <span>Spotlight</span>
            </div>

            {/* Prompt details */}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={onOpenPartnerModal}
                  className="font-bold text-xs sm:text-sm text-amber-300 hover:text-amber-200 transition-colors text-left"
                >
                  Spotlight Your Brand Here
                </button>
                <span className="text-[10px] text-stone-400 font-mono">
                  • Tricity Exclusive
                </span>
              </div>
              <p className="text-[11px] text-stone-300/80 truncate max-w-[280px] sm:max-w-[340px]">
                Reach thousands of Chandigarh locals daily • Cafes, Lounges, Events & Startups
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            <button
              onClick={onOpenPartnerModal}
              className="flex items-center gap-1 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 font-black text-xs px-3.5 py-1.5 rounded-md shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              <span>Get Featured</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            {/* Dismiss button */}
            <button
              onClick={() => setIsVisible(false)}
              className="text-stone-400 hover:text-stone-200 p-1 rounded hover:bg-white/10 transition-colors"
              title="Hide spotlight"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Mini bottom bar */}
        <div className="mt-1.5 pt-1.5 border-t border-white/5 flex items-center justify-between text-[10px] text-stone-400">
          <span className="font-mono text-[9px] text-stone-400/90">
            Official Partner Slot • Chandigarh, Mohali & Panchkula
          </span>
          {onOpenPartnerModal && (
            <button
              onClick={onOpenPartnerModal}
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              <Sparkles className="w-2.5 h-2.5" />
              <span>Claim this spot →</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
