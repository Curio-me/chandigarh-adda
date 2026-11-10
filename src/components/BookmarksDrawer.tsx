import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, MapPin } from 'lucide-react';
import { ItemData } from '../types';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedItems: ItemData[];
  onRemoveItem: (id: string) => void;
  onSelectItem: (item: ItemData) => void;
  onClearAll: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  savedItems,
  onRemoveItem,
  onSelectItem,
  onClearAll
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
              <Bookmark className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm">Your Saved Adda</h3>
              <p className="text-[11px] text-stone-500">{savedItems.length} curated places saved</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedItems.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-[11px] text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
                title="Clear all bookmarks"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Saved Items List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {savedItems.length === 0 ? (
            <div className="text-center py-16 text-stone-400">
              <Bookmark className="w-12 h-12 mx-auto stroke-1 mb-2 text-stone-300" />
              <p className="text-sm font-semibold text-stone-700">No saved spots yet</p>
              <p className="text-xs text-stone-400 max-w-xs mx-auto mt-1">
                Click the bookmark icon on any concert, cafe guide, or getaway to build your personal Tricity wishlist!
              </p>
            </div>
          ) : (
            savedItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectItem(item);
                  onClose();
                }}
                className="group p-3 rounded-2xl border border-stone-200 hover:border-orange-300 bg-stone-50 hover:bg-orange-50/40 transition-all flex gap-3 cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 truncate group-hover:text-orange-600">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-orange-500" />
                      {item.sectorOrArea}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1">
                    <span className="uppercase font-bold text-orange-700 bg-orange-100 px-1.5 py-0.5 rounded">
                      {item.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveItem(item.id);
                      }}
                      className="text-stone-400 hover:text-rose-600 p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-stone-200 bg-stone-50">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
};
