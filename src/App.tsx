import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Header 
} from './components/Header';
import { TricityWeatherTicker } from './components/TricityWeatherTicker';
import { CategoryNav } from './components/CategoryNav';
import { Hero } from './components/Hero';
import { TricityZonesGrid } from './components/TricityZonesGrid';
import { ItemCard } from './components/ItemCard';
import { DetailModal } from './components/DetailModal';
import { SubmitModal } from './components/SubmitModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { NewsletterBanner } from './components/NewsletterBanner';
import { Footer } from './components/Footer';
import { allItems } from './data/mockData';
import { CategoryType, TricityZone, ItemData } from './types';
import { 
  Compass, 
  Sparkles, 
  Ticket, 
  UtensilsCrossed, 
  Landmark, 
  Mountain, 
  Briefcase, 
  Newspaper,
  ArrowRight,
  Filter
} from 'lucide-react';

export const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [activeZone, setActiveZone] = useState<TricityZone>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<ItemData | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('chandigarh_adda_saved');
      return stored ? JSON.parse(stored) : ['event-1', 'food-1', 'escape-1'];
    } catch {
      return ['event-1', 'food-1', 'escape-1'];
    }
  });
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const feedRef = useRef<HTMLDivElement>(null);

  // Sync saved bookmarks with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('chandigarh_adda_saved', JSON.stringify(savedIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedIds]);

  const toggleSave = (id: string) => {
    setSavedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const clearAllSaved = () => {
    setSavedIds([]);
  };

  const savedItems = useMemo(() => {
    return allItems.filter(item => savedIds.includes(item.id));
  }, [savedIds]);

  // Filtered Items logic
  const filteredItems = useMemo(() => {
    return allItems.filter(item => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Zone filter
      if (activeZone !== 'all') {
        if (activeZone === 'escapes' && item.zone !== 'escapes') return false;
        if (activeZone !== 'escapes' && item.zone !== activeZone) return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchSubtitle = item.subtitle?.toLowerCase().includes(query) ?? false;
        const matchSummary = item.summary.toLowerCase().includes(query);
        const matchArea = item.sectorOrArea.toLowerCase().includes(query);
        const matchTag = item.tags.some(t => t.toLowerCase().includes(query));
        return matchTitle || matchSubtitle || matchSummary || matchArea || matchTag;
      }
      return true;
    });
  }, [activeCategory, activeZone, searchQuery]);

  const scrollToFeed = () => {
    feedRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearchSelect = (term: string) => {
    setSearchQuery(term);
    scrollToFeed();
  };

  // Section helper for the home discovery feed
  const renderCategorySection = (
    title: string, 
    subtitle: string, 
    catKey: CategoryType, 
    icon: React.ReactNode, 
    limit: number = 3
  ) => {
    const items = allItems.filter(i => i.category === catKey);
    if (items.length === 0) return null;

    return (
      <section className="mb-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-orange-600 text-xs font-bold uppercase tracking-wider mb-1">
              {icon}
              <span>{title}</span>
            </div>
            <h3 className="text-2xl font-black text-stone-900 tracking-tight">
              {subtitle}
            </h3>
          </div>

          <button
            onClick={() => {
              setActiveCategory(catKey);
              scrollToFeed();
            }}
            className="mt-2 sm:mt-0 text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 group"
          >
            <span>View All {title}</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.slice(0, limit).map(item => (
            <ItemCard
              key={item.id}
              item={item}
              isSaved={savedIds.includes(item.id)}
              onToggleSave={toggleSave}
              onSelect={setSelectedItem}
            />
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col selection:bg-orange-500 selection:text-white">
      
      {/* 1. Header with brand, search, saved drawer, and social links */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToFeed();
        }}
        activeZone={activeZone}
        onSelectZone={(zone) => {
          setActiveZone(zone);
          scrollToFeed();
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        savedCount={savedIds.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onOpenSubmit={() => setIsSubmitModalOpen(true)}
      />

      {/* 2. Tricity Weather & Vibe Ticker */}
      <TricityWeatherTicker />

      {/* 3. Category Bar Navigation */}
      <CategoryNav
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToFeed();
        }}
      />

      {/* 4. Hero Section */}
      <Hero
        onSearchSelect={handleSearchSelect}
        onExploreClick={scrollToFeed}
        onOpenSubmit={() => setIsSubmitModalOpen(true)}
      />

      {/* 5. Tricity Regions Grid (Chandigarh, Mohali, Panchkula, Escapes) */}
      <TricityZonesGrid
        activeZone={activeZone}
        onSelectZone={(zone) => {
          setActiveZone(zone);
          scrollToFeed();
        }}
      />

      {/* 6. Main Content Area */}
      <main ref={feedRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        
        {/* Active Filters Bar if filtered */}
        {(activeCategory !== 'all' || activeZone !== 'all' || searchQuery.trim() !== '') && (
          <div className="mb-8 p-4 bg-white rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs">
              <Filter className="w-4 h-4 text-orange-600" />
              <span className="font-bold text-stone-900">Filtered by:</span>

              {activeCategory !== 'all' && (
                <span className="bg-orange-100 text-orange-800 font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  Category: {activeCategory.toUpperCase()}
                  <button onClick={() => setActiveCategory('all')} className="hover:text-stone-900">×</button>
                </span>
              )}

              {activeZone !== 'all' && (
                <span className="bg-stone-900 text-white font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  Zone: {activeZone.toUpperCase()}
                  <button onClick={() => setActiveZone('all')} className="hover:text-stone-300">×</button>
                </span>
              )}

              {searchQuery.trim() && (
                <span className="bg-amber-100 text-amber-900 font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-stone-900">×</button>
                </span>
              )}

              <span className="text-stone-400 font-medium ml-2">
                ({filteredItems.length} results found)
              </span>
            </div>

            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveZone('all');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-stone-500 hover:text-stone-900 underline"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Dynamic Display */}
        {activeCategory !== 'all' || activeZone !== 'all' || searchQuery.trim() !== '' ? (
          /* Focused Grid View */
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-black text-stone-900">
                {activeCategory !== 'all' 
                  ? activeCategory.toUpperCase().replace('-', ' ') 
                  : 'Curated Results'}
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Showing {filteredItems.length} verified curations for {activeZone === 'all' ? 'The Entire Tricity' : activeZone.toUpperCase()}.
              </p>
            </div>

            {filteredItems.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-stone-200">
                <Compass className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-stone-800">No curations matched your search</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
                  Try searching with broader terms like "Sector 26", "Coffee", "Concert", or "Kasauli".
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setActiveZone('all');
                    setSearchQuery('');
                  }}
                  className="mt-5 px-5 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-xl"
                >
                  Show All Tricity Guides
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    isSaved={savedIds.includes(item.id)}
                    onToggleSave={toggleSave}
                    onSelect={setSelectedItem}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Curated Thematic Showcase for Chandigarh Adda */
          <div>
            
            {/* Top Trending Picks */}
            <section className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-1.5 text-orange-600 text-xs font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-4 h-4" />
                    <span>Trending in Chandigarh, Mohali & Panchkula</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                    This Week’s Top Curations
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allItems.filter(i => i.trending).slice(0, 3).map(item => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    isSaved={savedIds.includes(item.id)}
                    onToggleSave={toggleSave}
                    onSelect={setSelectedItem}
                  />
                ))}
              </div>
            </section>

            {/* 1. Events & What's On */}
            {renderCategorySection(
              "Events & What's On",
              "Concerts, Nightlife & Live Shows in Tricity",
              "events",
              <Ticket className="w-4 h-4" />
            )}

            {/* 2. Food & Dining */}
            {renderCategorySection(
              "Food & Dining",
              "Top Cafes, Breweries & Street Food Trails",
              "food",
              <UtensilsCrossed className="w-4 h-4" />
            )}

            {/* In-Between Newsletter Drop */}
            <NewsletterBanner />

            {/* 3. City Guides & Heritage */}
            {renderCategorySection(
              "City Guides",
              "The City Beautiful: Parks, Architecture & Sectors",
              "guides",
              <Landmark className="w-4 h-4" />
            )}

            {/* 4. Travel & Weekend Escapes */}
            {renderCategorySection(
              "Travel & Escapes",
              "Hill Stations & Day Trips from Chandigarh",
              "escapes",
              <Mountain className="w-4 h-4" />
            )}

            {/* 5. Startups & Business */}
            {renderCategorySection(
              "Startups & Business",
              "Innovators & Brands Shaping the Tricity",
              "startups",
              <Briefcase className="w-4 h-4" />
            )}

            {/* 6. City News & Infrastructure */}
            {renderCategorySection(
              "City News & Updates",
              "Civic Stories & Developments That Matter",
              "news",
              <Newspaper className="w-4 h-4" />
            )}

          </div>
        )}

      </main>

      {/* 7. Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToFeed();
        }}
        onOpenSubmit={() => setIsSubmitModalOpen(true)}
      />

      {/* Detail Modal */}
      <DetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        isSaved={selectedItem ? savedIds.includes(selectedItem.id) : false}
        onToggleSave={toggleSave}
      />

      {/* Submit / Partner Modal */}
      <SubmitModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      />

      {/* Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedItems={savedItems}
        onRemoveItem={toggleSave}
        onSelectItem={setSelectedItem}
        onClearAll={clearAllSaved}
      />

    </div>
  );
};

export default App;
