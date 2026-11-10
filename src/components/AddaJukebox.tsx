import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  ExternalLink, 
  ListMusic,
  Disc3,
  Sparkles
} from 'lucide-react';

interface ChandigarhTrack {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  coverImage: string;
  tagline: string;
  famousLyric: string;
  genre: string;
  spotifySearch: string;
}

const CHANDIGARH_PLAYLIST: ChandigarhTrack[] = [
  {
    id: 'chd-mein',
    title: 'Chandigarh Mein',
    artist: 'Badshah, Harrdy Sandhu, Diljit Dosanjh',
    // High-energy highway groove stream
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80',
    tagline: 'The ultimate Bollywood anthem celebrating the Tricity lifestyle',
    famousLyric: '“Dila du ghar Chandigarh mein... yaaran da swag!”',
    genre: 'Bollywood Hit',
    spotifySearch: 'Chandigarh Mein Good Newwz'
  },
  {
    id: 'chd-aashiqui',
    title: 'Chandigarh Kare Aashiqui',
    artist: 'Sachin-Jigar, Jassi Sidhu, Ayushmann Khurrana',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    coverImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=300&q=80',
    tagline: 'High-energy bhangra-pop tribute to Chandigarh lovers',
    famousLyric: '“Chandigarh kare aashiqui, munda jattan da kare aashiqui!”',
    genre: 'Bollywood Hit',
    spotifySearch: 'Chandigarh Kare Aashiqui Title Track'
  },
  {
    id: 'yaari-chd',
    title: 'Yaari Chandigarh Waliye',
    artist: 'Ranjit Bawa',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=300&q=80',
    tagline: 'Cult classic track about college life & heartbreaks in the city',
    famousLyric: '“Yaari Chandigarh waliye ni teri... kar gayi khali jatt di pocket!”',
    genre: 'Punjabi Anthem',
    spotifySearch: 'Yaari Chandigarh Waliye Ranjit Bawa'
  },
  {
    id: 'chd-mankirt',
    title: 'Chandigarh (Gedi Route)',
    artist: 'Mankirt Aulakh',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=300&q=80',
    tagline: 'Cruising through Sector 8, 9, 10 and 11 on the Gedi Route',
    famousLyric: '“Gedi route utte kude lounde gediyaan, Chandigarh rehndi ae tu!”',
    genre: 'Geri Route Classic',
    spotifySearch: 'Chandigarh Mankirt Aulakh'
  },
  {
    id: 'chd-waliye-sharry',
    title: 'Chandigarh Waliye (Classic)',
    artist: 'Sharry Mann',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80',
    tagline: 'Nostalgic Panjab University student anthem on repeat',
    famousLyric: '“Chandigarh walie ni tere karke, kitte daakhle te saal kharaab kareya!”',
    genre: 'College Nostalgia',
    spotifySearch: 'Chandigarh Waliye Sharry Mann'
  }
];

export const AddaJukebox: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylistDrawer, setShowPlaylistDrawer] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = CHANDIGARH_PLAYLIST[currentTrackIndex];

  // Initialize or update audio when track changes
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(currentTrack.audioUrl);
    } else {
      audioRef.current.src = currentTrack.audioUrl;
      audioRef.current.load();
    }

    const audio = audioRef.current;
    audio.volume = isMuted ? 0 : volume;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 215);
    };

    const handleEnded = () => {
      // Auto play next song
      nextTrack();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    if (isPlaying) {
      audio.play().catch(err => {
        console.warn("Autoplay was blocked by browser:", err);
        setIsPlaying(false);
      });
    }

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(e => {
        console.warn("Playback error:", e);
      });
    }
  };

  const nextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % CHANDIGARH_PLAYLIST.length;
    setCurrentTrackIndex(nextIdx);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    const prevIdx = (currentTrackIndex - 1 + CHANDIGARH_PLAYLIST.length) % CHANDIGARH_PLAYLIST.length;
    setCurrentTrackIndex(prevIdx);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVol;
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.volume = nextMuted ? 0 : volume;
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full max-w-xl mx-auto select-none font-sans drop-shadow-2xl px-2 sm:px-0">
      
      {/* Outer Retro Number Plate Container (Identical to truckplaylist.wtf) */}
      <div className="bg-[#14533d] border-4 border-[#ea8e35] rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl relative">
        
        {/* Top Header Plate (HORN OK PLEASE / CHANDIGARH OK ADDA) */}
        <div className="flex items-center justify-between px-2 mb-2">
          <div className="text-center flex-1">
            <span className="text-[#fde047] font-black text-xs sm:text-base tracking-[0.28em] uppercase font-mono drop-shadow">
              CHANDIGARH <span className="text-[#f97316]">OK</span> ADDA
            </span>
          </div>

          <button
            onClick={() => setShowPlaylistDrawer(!showPlaylistDrawer)}
            className="flex items-center gap-1.5 text-[10px] font-bold bg-[#0b291e] hover:bg-[#124231] text-[#fde047] border border-emerald-600/70 px-2.5 py-1 rounded-full transition-colors flex-shrink-0"
          >
            <ListMusic className="w-3.5 h-3.5" />
            <span>{showPlaylistDrawer ? 'Hide' : `Songs (${CHANDIGARH_PLAYLIST.length})`}</span>
          </button>
        </div>

        {/* Playlist Selector Dropdown (When toggled open) */}
        {showPlaylistDrawer && (
          <div className="mb-3 bg-[#081f17] border border-emerald-700/60 rounded-xl p-2 max-h-48 overflow-y-auto space-y-1 text-left animate-fade-in">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider px-2 block mb-1">
              Select A Chandigarh Song:
            </span>
            {CHANDIGARH_PLAYLIST.map((song, idx) => (
              <button
                key={song.id}
                onClick={() => {
                  setCurrentTrackIndex(idx);
                  setIsPlaying(true);
                  setShowPlaylistDrawer(false);
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                  currentTrackIndex === idx
                    ? 'bg-[#ea8e35] text-stone-950 font-bold'
                    : 'text-stone-200 hover:bg-[#124231]'
                }`}
              >
                <div className="truncate mr-2">
                  <span className="block truncate font-semibold">{song.title}</span>
                  <span className={`text-[10px] block truncate ${currentTrackIndex === idx ? 'text-stone-900' : 'text-emerald-300/70'}`}>
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

        {/* Inner Console (Dark Green Surface) */}
        <div className="bg-[#0b291e] rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-emerald-700/50 flex flex-col gap-3">
          
          {/* Main Track Row: Album Art + Song Name + Play Controls (Pure truckplaylist.wtf layout) */}
          <div className="flex items-center gap-3">
            
            {/* Square Album Cover */}
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden bg-black flex-shrink-0 border border-emerald-600/40">
              <img
                src={currentTrack.coverImage}
                alt={currentTrack.title}
                className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-110' : 'scale-100'}`}
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Disc3 className={`w-5 h-5 text-amber-300 ${isPlaying ? 'animate-spin' : ''}`} />
              </div>
            </div>

            {/* Song Title & Artist */}
            <div className="flex-1 min-w-0 text-left">
              <h4 className="text-sm sm:text-base font-black text-white truncate leading-snug">
                {currentTrack.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-emerald-200/80 truncate mt-0.5">
                {currentTrack.artist}
              </p>
            </div>

            {/* Retro Controls (Prev, Big Yellow Play/Pause, Next) */}
            <div className="flex items-center gap-2 flex-shrink-0">
              
              {/* Prev Button */}
              <button
                onClick={prevTrack}
                className="w-8 h-8 rounded-full bg-[#184e3a] text-emerald-100 hover:text-white hover:bg-emerald-700 flex items-center justify-center transition-transform hover:scale-105"
                title="Previous track"
              >
                <SkipBack className="w-4 h-4 fill-current" />
              </button>

              {/* Big Yellow Circular Play Button (Like truckplaylist.wtf) */}
              <button
                onClick={togglePlay}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#fde047] hover:bg-[#facc15] text-stone-950 flex items-center justify-center font-black shadow-lg shadow-amber-400/40 transition-transform hover:scale-105"
                title={isPlaying ? "Pause Song" : "Play Song"}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-stone-950" />
                ) : (
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-stone-950 ml-0.5" />
                )}
              </button>

              {/* Next Button */}
              <button
                onClick={nextTrack}
                className="w-8 h-8 rounded-full bg-[#184e3a] text-emerald-100 hover:text-white hover:bg-emerald-700 flex items-center justify-center transition-transform hover:scale-105"
                title="Next track"
              >
                <SkipForward className="w-4 h-4 fill-current" />
              </button>

            </div>

          </div>

          {/* Time Scrubber (0:01 ━━━━●───── 5:11) */}
          <div className="space-y-1">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-[#124231] accent-[#fde047] rounded-lg cursor-pointer"
            />
            <div className="flex justify-between items-center text-[10px] text-emerald-300 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span className="text-[11px] text-[#fde047] font-sans italic truncate px-2">
                {currentTrack.famousLyric}
              </span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Bottom Bar: Quick Pills & Volume Control */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-emerald-800/40 text-xs">
            
            {/* Quick Song Selector Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {CHANDIGARH_PLAYLIST.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setCurrentTrackIndex(idx);
                    setIsPlaying(true);
                  }}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-bold whitespace-nowrap transition-all ${
                    currentTrackIndex === idx
                      ? 'bg-[#fde047] text-stone-950 shadow-md font-black'
                      : 'bg-[#184e3a] text-emerald-200 hover:bg-[#20664c]'
                  }`}
                >
                  {s.title.split(' (')[0]}
                </button>
              ))}
            </div>

            {/* Volume + Spotify Link */}
            <div className="flex items-center gap-3 ml-auto">
              <div className="flex items-center gap-1 text-emerald-300">
                <button onClick={toggleMute} className="hover:text-amber-300">
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-14 h-1 bg-[#124231] accent-[#fde047] rounded-lg cursor-pointer"
                />
              </div>

              <a
                href={`https://open.spotify.com/search/${encodeURIComponent(currentTrack.spotifySearch)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-black text-[#fde047] hover:text-white flex items-center gap-1 bg-[#184e3a] hover:bg-[#20664c] px-2 py-0.5 rounded border border-emerald-600/50"
                title="Open on Spotify"
              >
                <span>Spotify</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* Hanging Truck Mudguards / Tricity Flaps (Authentic Desi Humour) */}
      <div className="flex justify-between px-6 sm:px-12 -mt-1 pointer-events-none">
        <div className="bg-[#0b291e] border border-amber-500/60 text-[#fde047] text-[9px] sm:text-[10px] font-black px-2.5 py-1 rounded-b-lg shadow-xl tracking-wider">
          ਬੁਰੀ ਨਜ਼ਰ / बुरी नज़र
        </div>
        <div className="bg-[#0b291e] border border-amber-500/60 text-[#fde047] text-[9px] sm:text-[10px] font-black px-2.5 py-1 rounded-b-lg shadow-xl tracking-wider">
          ਵਾਲੇ ਤੇਰਾ ਮੂੰਹ ਕਾਲਾ 🌸
        </div>
      </div>

    </div>
  );
};
