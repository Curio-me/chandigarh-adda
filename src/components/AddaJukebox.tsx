import React, { useState } from 'react';
import { 
  Play, 
  ExternalLink, 
  Disc3,
  ListMusic,
  Music2,
  Sparkles
} from 'lucide-react';

interface ChandigarhSong {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  spotifySearch: string;
  tagline: string;
  famousLyric: string;
  genre: 'Bollywood Hit' | 'Punjabi Anthem' | 'Geri Route Classic' | 'College Nostalgia';
}

const CHANDIGARH_SONGS: ChandigarhSong[] = [
  {
    id: 'chd-mein',
    title: 'Chandigarh Mein',
    artist: 'Badshah, Harrdy Sandhu, Diljit Dosanjh (Good Newwz)',
    youtubeId: 'A3W_o55w6gU',
    spotifySearch: 'Chandigarh Mein Good Newwz',
    tagline: 'The ultimate Bollywood anthem celebrating the Tricity lifestyle',
    famousLyric: '“Dila du ghar Chandigarh mein... yaaran da swag!”',
    genre: 'Bollywood Hit'
  },
  {
    id: 'chd-aashiqui',
    title: 'Chandigarh Kare Aashiqui (Title Track)',
    artist: 'Sachin-Jigar, Jassi Sidhu, Ayushmann Khurrana',
    youtubeId: 'ERsUcf5RkS8',
    spotifySearch: 'Chandigarh Kare Aashiqui Title Track',
    tagline: 'High-energy bhangra-pop tribute to Chandigarh lovers',
    famousLyric: '“Chandigarh kare aashiqui, munda jattan da kare aashiqui!”',
    genre: 'Bollywood Hit'
  },
  {
    id: 'yaari-chd',
    title: 'Yaari Chandigarh Waliye',
    artist: 'Ranjit Bawa (T-Series Apna Punjab)',
    youtubeId: 'QLUDWeBTixE',
    spotifySearch: 'Yaari Chandigarh Waliye Ranjit Bawa',
    tagline: 'Cult classic track about college life & heartbreaks in the city',
    famousLyric: '“Yaari Chandigarh waliye ni teri... kar gayi khali jatt di pocket!”',
    genre: 'Punjabi Anthem'
  },
  {
    id: 'chd-mankirt',
    title: 'Chandigarh',
    artist: 'Mankirt Aulakh (Main Teri Tu Mera)',
    youtubeId: 'FZTVr3MAgPf3',
    spotifySearch: 'Chandigarh Mankirt Aulakh',
    tagline: 'Cruising through Sector 8, 9, 10 and 11 on the Gedi Route',
    famousLyric: '“Gedi route utte kude lounde gediyaan, Chandigarh rehndi ae tu!”',
    genre: 'Geri Route Classic'
  },
  {
    id: 'chd-waliye-sharry',
    title: 'Chandigarh Waliye (Classic)',
    artist: 'Sharry Mann (Aate Di Chiri)',
    youtubeId: 'QLUDWeBTixE',
    spotifySearch: 'Chandigarh Waliye Sharry Mann',
    tagline: 'Nostalgic Panjab University student anthem on repeat',
    famousLyric: '“Chandigarh walie ni tere karke, kitte daakhle te saal kharaab kareya!”',
    genre: 'College Nostalgia'
  }
];

export const AddaJukebox: React.FC = () => {
  const [selectedSongIndex, setSelectedSongIndex] = useState(0);
  const [showPlaylistDrawer, setShowPlaylistDrawer] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);

  const currentSong = CHANDIGARH_SONGS[selectedSongIndex];

  return (
    <div className="w-full max-w-xl mx-auto select-none font-sans drop-shadow-2xl px-2 sm:px-0">
      
      {/* Outer Dashboard / Truck Plate Audio Player */}
      <div className="bg-[#174d38] border-4 border-[#f9a646] rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl relative">
        
        {/* Top Header Plate (Like HORN OK PLEASE on truckplaylist.wtf) */}
        <div className="flex items-center justify-between px-2 mb-2">
          <span className="text-[#ffd460] font-black text-xs sm:text-sm tracking-[0.25em] uppercase font-mono drop-shadow">
            CHANDIGARH <span className="text-[#ff6e40]">OK</span> ADDA
          </span>

          <button
            onClick={() => setShowPlaylistDrawer(!showPlaylistDrawer)}
            className="flex items-center gap-1.5 text-[10px] font-bold bg-[#0b1f17] hover:bg-[#123326] text-amber-300 border border-emerald-600/70 px-2.5 py-1 rounded-full transition-colors"
          >
            <ListMusic className="w-3.5 h-3.5" />
            <span>{showPlaylistDrawer ? 'Hide Songs' : `Chandigarh Songs (${CHANDIGARH_SONGS.length})`}</span>
          </button>
        </div>

        {/* Playlist Selector Dropdown (When toggled open) */}
        {showPlaylistDrawer && (
          <div className="mb-3 bg-[#081711] border border-emerald-700/60 rounded-xl p-2 max-h-52 overflow-y-auto space-y-1 text-left animate-fade-in">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider px-2 block mb-1">
              Select A Chandigarh Track to Play:
            </span>
            {CHANDIGARH_SONGS.map((song, idx) => (
              <button
                key={song.id}
                onClick={() => {
                  setSelectedSongIndex(idx);
                  setAutoPlay(true);
                  setShowPlaylistDrawer(false);
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                  selectedSongIndex === idx
                    ? 'bg-amber-400 text-stone-950 font-bold'
                    : 'text-stone-200 hover:bg-[#123326]'
                }`}
              >
                <div className="truncate mr-2">
                  <span className="block truncate font-semibold">{song.title}</span>
                  <span className={`text-[10px] block truncate ${selectedSongIndex === idx ? 'text-stone-800' : 'text-emerald-300/70'}`}>
                    {song.artist}
                  </span>
                </div>
                <span className="text-[9px] uppercase px-1.5 py-0.5 rounded font-mono bg-black/30">
                  {song.genre}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Inner Console */}
        <div className="bg-[#0b1f17] rounded-xl sm:rounded-2xl p-2.5 sm:p-3 border border-emerald-700/50 flex flex-col gap-2.5">
          
          {/* Song Lyrics Banner */}
          <div className="bg-[#122b21] border border-emerald-600/40 rounded-xl px-3 py-1.5 flex items-center justify-between text-xs text-amber-300">
            <span className="italic font-medium truncate text-[11px] sm:text-xs">
              {currentSong.famousLyric}
            </span>
            <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider bg-black/40 px-2 py-0.5 rounded ml-2 flex-shrink-0">
              {currentSong.genre}
            </span>
          </div>

          {/* Official Full Audio / Video Embed (Always Works Worldwide - 100% Free & Legal) */}
          <div className="rounded-xl overflow-hidden bg-black aspect-[16/9] max-h-56 w-full shadow-lg border border-emerald-800/60">
            <iframe 
              src={`https://www.youtube-nocookie.com/embed/${currentSong.youtubeId}?autoplay=${autoPlay ? 1 : 0}&modestbranding=1&rel=0&playsinline=1`}
              width="100%" 
              height="100%" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              title={currentSong.title}
            />
          </div>

          {/* Song Switcher Quick Buttons */}
          <div className="flex items-center justify-between pt-1 text-xs">
            
            {/* Quick Song Selector Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {CHANDIGARH_SONGS.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedSongIndex(idx);
                    setAutoPlay(true);
                  }}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-bold whitespace-nowrap transition-all ${
                    selectedSongIndex === idx
                      ? 'bg-amber-400 text-stone-950 shadow-md scale-105'
                      : 'bg-[#153a2c] text-emerald-200 hover:bg-[#1b4b39]'
                  }`}
                >
                  {s.title.split(' (')[0]}
                </button>
              ))}
            </div>

            {/* Direct Open in Spotify App Link */}
            <a
              href={`https://open.spotify.com/search/${encodeURIComponent(currentSong.spotifySearch)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-black text-amber-300 hover:text-white flex items-center gap-1 bg-[#153a2c] hover:bg-[#1d523e] px-2.5 py-1 rounded-md border border-emerald-600/50 flex-shrink-0 ml-2 shadow-xs"
              title="Open track on Spotify"
            >
              <span>Spotify</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>

          </div>

        </div>

      </div>

      {/* Hanging Truck Mudguards / Tricity Flaps (Authentic Desi Humour) */}
      <div className="flex justify-between px-6 sm:px-12 -mt-1 pointer-events-none">
        <div className="bg-[#0b1f17] border border-amber-500/60 text-[#ffd460] text-[9px] sm:text-[10px] font-black px-2.5 py-1 rounded-b-lg shadow-xl tracking-wider">
          ਬੁਰੀ ਨਜ਼ਰ / बुरी नज़र
        </div>
        <div className="bg-[#0b1f17] border border-amber-500/60 text-[#ffd460] text-[9px] sm:text-[10px] font-black px-2.5 py-1 rounded-b-lg shadow-xl tracking-wider">
          ਵਾਲੇ ਤੇਰਾ ਮੂੰਹ ਕਾਲਾ 🌸
        </div>
      </div>

    </div>
  );
};
