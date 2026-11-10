import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { InstagramIcon, TwitterIcon } from './SocialIcons';

export const NewsletterBanner: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white py-12 px-4 sm:px-6 lg:px-8 my-10 rounded-3xl max-w-7xl mx-auto shadow-xl relative overflow-hidden">
      
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-black/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Thursday Weekend Drop</span>
        </div>

        <h3 className="text-2xl sm:text-4xl font-black tracking-tight">
          Never Miss What’s Happening in Tricity
        </h3>
        
        <p className="mt-2 text-sm sm:text-base text-orange-100 max-w-xl mx-auto font-normal">
          Every Thursday, get curated concert tickets, secret cafe recommendations, weekend road trip plans, and new openings delivered to your inbox.
        </p>

        {!subscribed ? (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
            <div className="relative w-full">
              <input
                type="email"
                required
                placeholder="Enter your personal email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white text-stone-900 text-xs sm:text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-stone-900 shadow-md"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-stone-900 hover:bg-black text-white text-xs sm:text-sm font-bold rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <span>Join 50k+ Readers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="mt-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-white font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-300" />
            <span>You're on the VIP list! Welcome to the Chandigarh Adda family.</span>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-white/20 flex flex-wrap items-center justify-center gap-6 text-xs text-orange-100">
          <span>Follow our live stories on social:</span>
          <a
            href="https://instagram.com/chandigarhadda"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-bold hover:text-white transition-colors"
          >
            <InstagramIcon className="w-4 h-4" /> @chandigarhadda
          </a>
          <a
            href="https://twitter.com/chandigarhadda"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-bold hover:text-white transition-colors"
          >
            <TwitterIcon className="w-4 h-4" /> @chandigarhadda
          </a>
        </div>

      </div>
    </div>
  );
};
