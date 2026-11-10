import React, { useState } from 'react';
import { 
  Play, 
  ExternalLink, 
  Disc3,
  Music2,
  Sparkles,
  Volume2,
  Radio,
  ListMusic,
  Check
} from 'lucide-react';

interface ChandigarhSong {
  id: string;
  title: string;
  artist: string;
  spotifyId: string;
  tagline: string;
  famousLyric: string;
  genre: 'Bollywood Hit' | 'Punjabi Anthem' | 'Geri Route Classic' | 'College Nostalgia';
}

const CHANDIGARH_SONGS: ChandigarhSong[] = [
  {
    id: 'chd-mein',
    title: 'Chandigarh Mein',
    artist: 'Badshah, Harrdy Sandhu, Neha Kakkar (Good Newwz)',
    spotifyId: '3X1050ZkEKYzXoGCl495Q3',
    tagline: 'The ultimate party anthem celebrating the Tricity lifestyle',
    famousLyric: '“Dila du ghar Chandigarh mein... yaaran da swag!”',
    genre: 'Bollywood Hit'
  },
  {
    id: 'chd-aashiqui',
    title: 'Chandigarh Kare Aashiqui (Title Track)',
    artist: 'Sachin-Jigar, Jassi Sidhu, IP Singh',
    spotifyId: '1Tg2tWrv71bvzxoBPMwwmW',
    tagline: 'High-energy bhangra-pop tribute to Chandigarh lovers',
    famousLyric: '“Chandigarh kare aashiqui, munda jattan da kare aashiqui!”',
    genre: 'Bollywood Hit'
  },
  {
    id: 'yaari-chd',
    title: 'Yaari Chandigarh Waliye',
    artist: 'Ranjit Bawa',
    spotifyId: '5v6q2P17aF7uG7L1b1k9Qv',
    tagline: 'Cult classic track about college life & heartbreaks in the city',
    famousLyric: '“Yaari Chandigarh waliye ni teri... kar gayi khali jatt di pocket!”',
    genre: 'Punjabi Anthem'
  },
  {
    id: 'chd-rehn-waliye',
    title: 'Chandigarh Rehn Waaliye',
    artist: 'Jenny Johal ft. Raftaar',
    spotifyId: '3X1050ZkEKYzXoGCl495Q3', // Fallback stream
    tagline: 'Urban Punjabi beats with fierce rap verse by Raftaar',
    famousLyric: '“Chandigarh rehn waliye, dil lutt ke le gayi!”',
    genre: 'Geri Route Classic'
  },
  {
    id: 'chd-waliye-sharry',
    title: 'Chandigarh Waliye',
    artist: 'Sharry Mann',
    spotifyId: '1Tg2tWrv71bvzxoBPMwwmW',
    tagline: 'Nostalgic Panjab University student anthem on repeat',
    famousLyric: '“Chandigarh walie ni tere karke, kitte daakhle te saal kharaab kareya!”',
    genre: 'College Nostalgia'
  },
  {
    id: 'chd-mankirt',
    title: 'Chandigarh',
    artist: 'Mankirt Aulakh',
    spotifyId: '3X1050ZkEKYzXoGCl495Q3',
    tagline: 'Cruising through Sector 8, 9, 10 and 11 on the Gedi Route',
    famousLyric: '“Gedi route utte kude lounde gediyaan, Chandigarh rehndi ae tu!”',
    genre: 'Geri Route Classic'
  }
];

export const AddaJukebox: React.FC = () => {
  const [selectedSongIndex, setSelectedSongIndex] = useState(0);
  const [showPlaylistDrawer, setShowPlaylistDrawer] = useState(false);

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
            <span>{showPlaylistDrawer ? 'Hide Tracklist' : 'All Chandigarh Songs (6)'}</span>
          </button>
        </div>

        {/* Playlist Selector Dropdown (When toggled open) */}
        {showPlaylistDrawer && (
          <div className="mb-3 bg-[#081711] border border-emerald-700/60 rounded-xl p-2 max-h-48 overflow-y-auto space-y-1 text-left animate-fade-in">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider px-2 block mb-1">
              Select A Chandigarh Song:
            </span>
            {CHANDIGARH_SONGS.map((song, idx) => (
              <button
                key={song.id}
                onClick={() => {
                  setSelectedSongIndex(idx);
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

          {/* Official Embedded Spotify Player */}
          <div className="rounded-xl overflow-hidden bg-black/90 shadow-md">
            <iframe 
              style={{ borderRadius: '12px' }} 
              src={`https://open.spotify.com/embed/track/${currentSong.spotifyId}?utm_source=generator&theme=0`} 
              width="100%" 
              height="80" 
              frameBorder="0" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
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
                  onClick={() => setSelectedSongIndex(idx)}
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
              href={`https://open.spotify.com/search/${encodeURIComponent(currentSong.title + ' ' + currentSong.artist)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-black text-amber-300 hover:text-white flex items-center gap-1 bg-[#153a2c] hover:bg-[#1d523e] px-2.5 py-1 rounded-md border border-emerald-600/50 flex-shrink-0 ml-2 shadow-xs"
              title="Open full track in Spotify"
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
