import React from 'react';
import { Compass, Heart, MapPin, Mail, ArrowUpRight } from 'lucide-react';
import { InstagramIcon, TwitterIcon } from './SocialIcons';
import { CategoryType } from '../types';

interface FooterProps {
  onSelectCategory: (cat: CategoryType) => void;
  onOpenSubmit: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenSubmit }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold shadow-md">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">
                  CHANDIGARH <span className="text-orange-500">ADDA</span>
                </span>
                <p className="text-xs text-stone-400 font-medium">chandigarhadda.com</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 max-w-sm leading-relaxed">
              Chandigarh’s premier city guide and lifestyle platform — your trusted companion for everything happening across the tricity of Chandigarh, Mohali, and Panchkula.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/chandigarhadda"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 hover:bg-orange-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                title="Chandigarh Adda Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/chandigarhadda"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 hover:bg-sky-500 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                title="Chandigarh Adda Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:hello@chandigarhadda.com"
                className="w-9 h-9 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                title="Contact Editorial Desk"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: What We Cover */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              What We Cover
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => onSelectCategory('events')} className="hover:text-orange-400 transition-colors">
                  Events & Concerts
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('food')} className="hover:text-orange-400 transition-colors">
                  Food & Dining Guides
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('guides')} className="hover:text-orange-400 transition-colors">
                  City & Sector Guides
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('lifestyle')} className="hover:text-orange-400 transition-colors">
                  Lifestyle & Wellness
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('startups')} className="hover:text-orange-400 transition-colors">
                  Local Startups & Brands
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('escapes')} className="hover:text-orange-400 transition-colors">
                  Travel & Weekend Escapes
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('news')} className="hover:text-orange-400 transition-colors">
                  News & Civic Updates
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Tricity Zones */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Tricity Coverage
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                <span>Chandigarh (Sectors 1-60)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                <span>Mohali (Phases 1-11 & IT Park)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                <span>Panchkula (Sectors 1-32 & MDC)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                <span>Kasauli, Chail & Morni Hills</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                <span>Zirakpur & Kharar Hubs</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Partnerships */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Collaborate
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <p className="leading-relaxed">
                Are you an event organizer, cafe owner, or local creator in Chandigarh, Mohali, or Panchkula?
              </p>
              <button
                onClick={onOpenSubmit}
                className="w-full py-2 px-3 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-1"
              >
                <span>Partner With Us</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <p className="text-[11px] text-stone-500 pt-1">
                Press & media kits: <br />
                <a href="mailto:press@chandigarhadda.com" className="text-stone-300 hover:underline">press@chandigarhadda.com</a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Chandigarh Adda (chandigarhadda.com). All rights reserved.</p>
          <p className="flex items-center gap-1 text-stone-400">
            Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> for The City Beautiful
          </p>
        </div>

      </div>
    </footer>
  );
};
