import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  ExternalLink, 
  Disc3
} from 'lucide-react';

interface VibeTrack {
  id: string;
  name: string;
  artist: string;
  mood: string;
  vibeTag: string;
  tagline: string;
  spotifyQuery: string;
  ytMusicQuery: string;
  coverImage: string;
  baseFreq: number;
}

const VIBE_TRACKS: VibeTrack[] = [
  {
    id: 'gedi-route',
    name: 'Gedi Route Cruising 808s',
    artist: 'Sidhu, AP Dhillon, Diljit & Punjabi Bass',
    mood: 'Cruising',
    vibeTag: '🚗 Geri Route • Sector 8 to 11',
    tagline: 'Windows rolled down. Sector 10 rotary. Sunset beats on repeat.',
    spotifyQuery: 'Punjabi+Cruising+Hits',
    ytMusicQuery: 'punjabi+car+cruising+playlist',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80',
    baseFreq: 110,
  },
  {
    id: 'sukhna-dawn',
    name: 'Sukhna Lake Sunrise & Lo-Fi',
    artist: 'Morning Ambient, Water Ripples & Flute',
    mood: 'Tranquil',
    vibeTag: '🌅 Sukhna Lake • Sector 1',
    tagline: 'Misty Shivalik hills, migratory birds, tranquil rowing waters.',
    spotifyQuery: 'Morning+Lofi+Beats',
    ytMusicQuery: 'morning+lofi+ambient+birds',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    baseFreq: 220,
  },
  {
    id: 'cafe-vibes',
    name: 'Sector 8 Bougainvillea & Jazz',
    artist: 'Acoustic Coffeehouse & Vinyl Warmth',
    mood: 'Chill',
    vibeTag: '☕ Sector 8 & 9 • Cafe Trail',
    tagline: 'Fresh Chemex pour-over, almond babka, cozy corner nook.',
    spotifyQuery: 'Coffeehouse+Acoustic',
    ytMusicQuery: 'cafe+acoustic+chill+lofi',
    coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80',
    baseFreq: 165,
  },
  {
    id: 'kasauli-drive',
    name: 'Himalayan Highway to Kasauli',
    artist: 'Kumar Sanu, Lucky Ali & Pine Indie',
    mood: 'Adventure',
    vibeTag: '🏔️ Timber Trail • Himalayan Expressway',
    tagline: 'Hairpin turns, chilly pine breeze, hot cutting chai dhaba.',
    spotifyQuery: 'Indian+Indie+Highway',
    ytMusicQuery: 'indian+highway+roadtrip+indie',
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80',
    baseFreq: 146,
  }
];

export const AddaJukebox: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(214); // 3:34 min duration

  // Web Audio ambient synthesizer reference
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);
  const timerRef = useRef<number | null>(null);

  const currentTrack = VIBE_TRACKS[currentTrackIndex];

  // Stop ambient synth
  const stopAmbientAudio = () => {
    oscNodesRef.current.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {
        // ignore
      }
    });
    oscNodesRef.current = [];
  };

  // Start ambient audio synthesis (warm harmonic chord with analog vibrato)
  const startAmbientAudio = (freq: number) => {
    stopAmbientAudio();

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : volume * 0.14, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      const intervals = [1, 1.25, 1.5, 2];
      intervals.forEach((interval, idx) => {
        const osc = ctx.createOscillator();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq * interval, ctx.currentTime);

        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.2 + idx * 0.1;
        lfoGain.gain.value = 1.5;
        lfo.connect(osc.frequency);
        lfo.start();

        const noteGain = ctx.createGain();
        noteGain.gain.setValueAtTime(0.2 / intervals.length, ctx.currentTime);
        osc.connect(noteGain);
        noteGain.connect(masterGain);

        osc.start();
        oscNodesRef.current.push(osc);
      });
    } catch (e) {
      console.warn("Web Audio setup:", e);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAmbientAudio();
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      startAmbientAudio(currentTrack.baseFreq);
      setIsPlaying(true);
      timerRef.current = window.setInterval(() => {
        setCurrentTime(t => (t >= duration ? 0 : t + 1));
      }, 1000);
    }
  };

  const nextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % VIBE_TRACKS.length;
    setCurrentTrackIndex(nextIdx);
    setCurrentTime(0);
    if (isPlaying) {
      startAmbientAudio(VIBE_TRACKS[nextIdx].baseFreq);
    }
  };

  const prevTrack = () => {
    const prevIdx = (currentTrackIndex - 1 + VIBE_TRACKS.length) % VIBE_TRACKS.length;
    setCurrentTrackIndex(prevIdx);
    setCurrentTime(0);
    if (isPlaying) {
      startAmbientAudio(VIBE_TRACKS[prevIdx].baseFreq);
    }
  };

  const selectTrack = (idx: number) => {
    setCurrentTrackIndex(idx);
    setCurrentTime(0);
    if (isPlaying) {
      startAmbientAudio(VIBE_TRACKS[idx].baseFreq);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(isMuted ? 0 : newVol * 0.14, audioCtxRef.current.currentTime);
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(newMuted ? 0 : volume * 0.14, audioCtxRef.current.currentTime);
    }
  };

  useEffect(() => {
    return () => {
      stopAmbientAudio();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full max-w-xl mx-auto select-none font-sans drop-shadow-2xl px-2 sm:px-0">
      
      {/* Outer Dashboard / Truck Plate Audio Player */}
      <div className="bg-[#174d38] border-4 border-[#f9a646] rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl relative">
        
        {/* Top Header Plate (Like HORN OK PLEASE on truckplaylist.wtf) */}
        <div className="text-center mb-2.5">
          <span className="text-[#ffd460] font-black text-xs sm:text-sm tracking-[0.25em] uppercase font-mono drop-shadow">
            CHANDIGARH <span className="text-[#ff6e40]">OK</span> ADDA
          </span>
        </div>

        {/* Inner Dark Instrument Console */}
        <div className="bg-[#0b1f17] rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-emerald-700/50 flex flex-col gap-3">
          
          {/* Track Display with Album Art & Animated Equalizer */}
          <div className="flex items-center gap-3">
            
            {/* Album Vinyl / Art */}
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-black flex-shrink-0 border border-emerald-500/40">
              <img
                src={currentTrack.coverImage}
                alt={currentTrack.name}
                className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-110' : 'scale-100'}`}
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Disc3 className={`w-5 h-5 text-amber-300 ${isPlaying ? 'animate-spin' : ''}`} />
              </div>
            </div>

            {/* Song Info */}
            <div className="flex-1 min-w-0">
              <span className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase tracking-wider block">
                {currentTrack.vibeTag}
              </span>
              <h4 className="text-sm sm:text-base font-black text-white truncate leading-snug">
                {currentTrack.name}
              </h4>
              <p className="text-[11px] text-emerald-200/70 truncate">
                {currentTrack.artist}
              </p>
            </div>

            {/* Controls: Prev, Play, Next */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              <button
                onClick={prevTrack}
                className="w-8 h-8 rounded-full bg-[#1b3d2f] text-emerald-100 hover:text-white hover:bg-emerald-700 flex items-center justify-center transition-colors"
                title="Previous track"
              >
                <SkipBack className="w-3.5 h-3.5 fill-current" />
              </button>

              <button
                onClick={togglePlay}
                className="w-11 h-11 rounded-full bg-[#f9a646] hover:bg-[#ffb703] text-stone-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/30 transition-transform hover:scale-105"
                title={isPlaying ? "Pause Ambient Vibe" : "Play Ambient Vibe"}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>

              <button
                onClick={nextTrack}
                className="w-8 h-8 rounded-full bg-[#1b3d2f] text-emerald-100 hover:text-white hover:bg-emerald-700 flex items-center justify-center transition-colors"
                title="Next track"
              >
                <SkipForward className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>

          </div>

          {/* Time Scrubber */}
          <div className="space-y-1">
            <div className="w-full bg-[#102b20] rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 h-full rounded-full transition-all duration-300"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] text-emerald-300/80 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span className="text-[11px] text-amber-300 font-sans tracking-wide italic truncate px-2">
                "{currentTrack.tagline}"
              </span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Bottom Bar: Mood Channels & Volume */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-emerald-800/40 text-xs">
            
            {/* Channels Switcher Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {VIBE_TRACKS.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => selectTrack(idx)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold whitespace-nowrap transition-all ${
                    currentTrackIndex === idx
                      ? 'bg-amber-400 text-stone-950 shadow-sm'
                      : 'bg-[#153a2c] text-emerald-200 hover:bg-[#1b4b39]'
                  }`}
                >
                  {t.mood}
                </button>
              ))}
            </div>

            {/* Volume + Stream Link */}
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
                  className="w-12 sm:w-16 h-1 bg-emerald-950 accent-amber-400 rounded-lg cursor-pointer"
                />
              </div>

              <a
                href={`https://open.spotify.com/search/${currentTrack.spotifyQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold text-amber-300 hover:text-white flex items-center gap-1 bg-[#153a2c] px-2 py-0.5 rounded border border-emerald-600/50"
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
