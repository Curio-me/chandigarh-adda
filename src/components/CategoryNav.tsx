import React from 'react';
import { 
  Sparkles, 
  Ticket, 
  UtensilsCrossed, 
  Landmark, 
  Mountain, 
  HeartHandshake, 
  Briefcase, 
  Newspaper 
} from 'lucide-react';
import { CategoryType } from '../types';

interface CategoryNavProps {
  activeCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory
}) => {
  const items: { id: CategoryType; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'all', label: 'All Curations', icon: <Sparkles className="w-4 h-4" />, desc: 'Trending across Tricity' },
    { id: 'events', label: 'Events & What’s On', icon: <Ticket className="w-4 h-4" />, desc: 'Concerts, comedy & gigs' },
    { id: 'food', label: 'Food & Dining', icon: <UtensilsCrossed className="w-4 h-4" />, desc: 'Cafes, bars & street trails' },
    { id: 'guides', label: 'City Guides', icon: <Landmark className="w-4 h-4" />, desc: 'Sectors, heritage & parks' },
    { id: 'escapes', label: 'Weekend Escapes', icon: <Mountain className="w-4 h-4" />, desc: 'Kasauli, Chail & Morni' },
    { id: 'lifestyle', label: 'Lifestyle & Wellness', icon: <HeartHandshake className="w-4 h-4" />, desc: 'Fitness, fashion & culture' },
    { id: 'startups', label: 'Startups & Business', icon: <Briefcase className="w-4 h-4" />, desc: 'Founders & brands' },
    { id: 'news', label: 'City Updates', icon: <Newspaper className="w-4 h-4" />, desc: 'Civic pulse & metro' },
  ];

  return (
    <div className="bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2.5">
          {items.map((item) => {
            const isActive = activeCategory === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectCategory(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-orange-500'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
