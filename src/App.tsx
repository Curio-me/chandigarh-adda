import React, { useState, useEffect } from 'react';
import { IllustratedScene } from './components/IllustratedScene';
import { AddaJukebox } from './components/AddaJukebox';
import { DirectoryDrawer } from './components/DirectoryDrawer';
import { DetailModal } from './components/DetailModal';
import { SubmitModal } from './components/SubmitModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { InstagramIcon, TwitterIcon } from './components/SocialIcons';
import { allItems } from './data/mockData';
import { ItemData, CategoryType } from './types';
import { PlusCircle } from 'lucide-react';

export const App: React.FC = () => {
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [selectedItem, setSelectedItem] = useState<ItemData | null>(null);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  // Current live time for top bar
  const [timeStr, setTimeStr] = useState('');

  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('chandigarh_adda_saved');
      return stored ? JSON.parse(stored) : ['event-1', 'food-1', 'escape-1'];
    } catch {
      return ['event-1', 'food-1', 'escape-1'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('chandigarh_adda_saved', JSON.stringify(savedIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedIds]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const toggleSave = (id: string) => {
    setSavedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const openPillar = (cat: CategoryType) => {
    setActiveCategory(cat);
    setIsDirectoryOpen(true);
  };

  const savedItems = allItems.filter(item => savedIds.includes(item.id));

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden select-none bg-stone-950 font-sans text-white">
      
      {/* 1. Rich Illustrated Painterly Sunset Background */}
      <IllustratedScene />

      {/* 2. Top Header Bar (Clock, Social Links, Directory & Submit CTAs) */}
      <header className="relative z-30 w-full px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between">
        
        {/* Left: Live Time & Sunset Status */}
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-xs font-medium text-stone-200 shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono font-bold text-amber-300">{timeStr || '5:31 PM'}</span>
          <span className="text-stone-400">•</span>
          <span className="hidden sm:inline text-stone-300">Sukhna Lake Sunset</span>
        </div>

        {/* Center: Subtle City Badge */}
        <div className="hidden md:flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-[#ffd460] uppercase shadow-md">
          <span>THE CITY BEAUTIFUL</span>
          <span className="text-stone-400">•</span>
          <span className="text-orange-400">CHANDIGARH ADDA</span>
        </div>

        {/* Right: Social & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://instagram.com/chandigarhadda"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-orange-600 border border-white/10 flex items-center justify-center text-stone-200 hover:text-white transition-all shadow-md"
            title="Instagram @chandigarhadda"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>

          <a
            href="https://twitter.com/chandigarhadda"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-sky-500 border border-white/10 flex items-center justify-center text-stone-200 hover:text-white transition-all shadow-md"
            title="Twitter @chandigarhadda"
          >
            <TwitterIcon className="w-4 h-4" />
          </a>

          {/* Feature Your Brand */}
          <button
            onClick={() => setIsSubmitOpen(true)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg shadow-orange-600/30 transition-transform hover:scale-105"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Feature Your Brand</span>
          </button>
        </div>

      </header>

      {/* 3. Centerpiece: Stylized Retro Truck-Art Typography & Jukebox Player */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 py-4 sm:py-8 my-auto">
        
        {/* Giant Retro Shadowed Heading (Exact typography from truckplaylist.wtf) */}
        <div className="max-w-4xl mx-auto space-y-1 sm:space-y-2 mb-4 sm:mb-6">
          
          <h1 className="font-yatra text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#fff3dc] drop-shadow-[4px_4px_0_#d62828] filter drop-shadow-[8px_8px_0_rgba(0,0,0,0.55)] leading-none select-none">
            ਚੰਡੀਗੜ੍ਹ ਅੱਡਾ
          </h1>

          <div className="font-yatra text-lg sm:text-2xl md:text-3xl text-[#ffc300] tracking-wider uppercase drop-shadow-[2px_2px_0_rgba(0,0,0,0.6)] pt-1">
            चंडीगढ़ अड्डा • CHANDIGARH ADDA
          </div>

          {/* Poetic Subtitle */}
          <p className="font-mukta text-xs sm:text-base md:text-lg text-[#ffc300] max-w-xl mx-auto font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] leading-relaxed pt-1">
            Songs that play on Gedi Route. Sukhna Lake sunset. Night highway to Kasauli. Dhaba chai. Full volume.
          </p>

        </div>

        {/* The Retro CH-01 Adda Jukebox Audio Player */}
        <div className="w-full">
          <AddaJukebox />
        </div>

      </main>

      {/* 4. Minimal Footer (Clean & unobtrusive like truckplaylist.wtf) */}
      <footer className="relative z-30 pb-3 sm:pb-4 px-4 text-center">
        <div className="text-[11px] sm:text-xs text-stone-300/80 drop-shadow flex items-center justify-center gap-4">
          <span className="font-mono">chandigarhadda.com</span>
          <span>•</span>
          <span>The City Beautiful</span>
          <span>•</span>
          <a 
            href="https://instagram.com/chandigarhadda" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-[#ffd166] transition-colors"
          >
            @chandigarhadda
          </a>
        </div>
      </footer>

      {/* Directory Slider Drawer for all 7 Pillars */}
      <DirectoryDrawer
        isOpen={isDirectoryOpen}
        onClose={() => setIsDirectoryOpen(false)}
        initialCategory={activeCategory}
        onSelectItem={(item) => setSelectedItem(item)}
        savedIds={savedIds}
        onToggleSave={toggleSave}
      />

      {/* Article & Venue Reader Modal */}
      <DetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        isSaved={selectedItem ? savedIds.includes(selectedItem.id) : false}
        onToggleSave={toggleSave}
      />

      {/* Submit / Partner Modal */}
      <SubmitModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
      />

      {/* Bookmarks Wishlist Drawer */}
      <BookmarksDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedItems={savedItems}
        onRemoveItem={toggleSave}
        onSelectItem={(item) => setSelectedItem(item)}
        onClearAll={() => setSavedIds([])}
      />

    </div>
  );
};

export default App;
