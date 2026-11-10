import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Radio, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  Music,
  Headphones,
  Sparkles
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
  baseFreq: number;
}

const VIBE_TRACKS: VibeTrack[] = [
  {
    id: 'gedi-route',
    name: 'Geri Route Cruising 808s',
    artist: 'Tricity Bass & Punjabi Folk Beats',
    mood: 'Cruising',
    vibeTag: '🚗 Geri Route • Sector 8-11',
    tagline: 'Windows rolled down. Sector 10 rotary. Sunset beats on repeat.',
    spotifyQuery: 'Punjabi+Cruising+Hits',
    ytMusicQuery: 'punjabi+car+cruising+playlist',
    baseFreq: 110,
  },
  {
    id: 'sukhna-dawn',
    name: 'Sukhna Lake Sunrise & Birdsong',
    artist: 'Morning Lo-Fi & Shivalik Ambient',
    mood: 'Tranquil',
    vibeTag: '🌅 Sukhna Lake • Sector 1',
    tagline: 'Gentle water ripples, migratory birds, misty hills & morning stillness.',
    spotifyQuery: 'Morning+Lofi+Beats',
    ytMusicQuery: 'morning+lofi+ambient+birds',
    baseFreq: 220,
  },
  {
    id: 'cafe-vibes',
    name: 'Sector 8 Bougainvillea & Jazz',
    artist: 'Acoustic Coffeehouse Sessions',
    mood: 'Chill',
    vibeTag: '☕ Sector 8 & 9 • Cafe Trail',
    tagline: 'Freshly poured Chemex, vinyl crackle, cozy corner book nook.',
    spotifyQuery: 'Coffeehouse+Acoustic',
    ytMusicQuery: 'cafe+acoustic+chill+lofi',
    baseFreq: 165,
  },
  {
    id: 'kasauli-drive',
    name: 'Himalayan Highway to Kasauli',
    artist: 'Mountain Indie & Pine Breeze',
    mood: 'Adventure',
    vibeTag: '🏔️ Timber Trail • Himalayan Expressway',
    tagline: 'Crisp mountain air, winding hairpins, 90s highway cassette nostalgia.',
    spotifyQuery: 'Indian+Indie+Highway',
    ytMusicQuery: 'indian+highway+roadtrip+indie',
    baseFreq: 146,
  }
];

export const AddaJukebox: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(214); // 3:34 min pseudo duration

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

  // Start ambient audio synthesis (soothing lo-fi ambient chord)
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
      masterGain.gain.setValueAtTime(isMuted ? 0 : volume * 0.12, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Create warm harmonic chord (Root, Major Third, Fifth, Octave)
      const intervals = [1, 1.25, 1.5, 2];
      intervals.forEach((interval, idx) => {
        const osc = ctx.createOscillator();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq * interval, ctx.currentTime);

        // Subtle slow frequency vibrato for vintage cassette tape warmth
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.2 + idx * 0.1; // slow modulation
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
      console.warn("Web Audio not allowed without user interaction yet:", e);
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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(isMuted ? 0 : newVol * 0.12, audioCtxRef.current.currentTime);
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(newMuted ? 0 : volume * 0.12, audioCtxRef.current.currentTime);
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
    <div className="fixed bottom-4 left-4 z-40 max-w-sm w-[calc(100vw-2rem)] sm:w-96 select-none font-sans drop-shadow-2xl">
      
      {/* Outer Number Plate / Dashboard Box */}
      <div className="bg-stone-900 border-2 border-emerald-600/90 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/80">
        
        {/* Top Plate Bar (Mimicking Chandigarh CH-01 Plate) */}
        <div className="bg-emerald-800 text-amber-300 px-3 py-1.5 flex items-center justify-between text-[11px] font-black tracking-wider uppercase border-b border-emerald-700">
          <div className="flex items-center gap-1.5">
            <span className="bg-white text-stone-950 font-black px-1.5 py-0.2 rounded text-[9px] shadow-xs">
              IND
            </span>
            <span className="text-amber-300 font-extrabold tracking-widest">
              CH-01 • ADDA RADIO
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isPlaying && (
              <span className="flex items-center gap-1 text-[10px] text-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                ON AIR
              </span>
            )}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-emerald-200 hover:text-white p-0.5 rounded transition-colors"
              title={isMinimized ? "Expand Player" : "Minimize Player"}
            >
              {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Player Body */}
        {!isMinimized ? (
          <div className="p-3.5 space-y-3 bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 text-white">
            
            {/* Track Info & Visualizer */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-amber-400 tracking-wide uppercase block">
                  {currentTrack.vibeTag}
                </span>
                <h4 className="text-sm font-bold text-white truncate leading-tight mt-0.5">
                  {currentTrack.name}
                </h4>
                <p className="text-[11px] text-stone-400 truncate mt-0.5">
                  {currentTrack.artist}
                </p>
              </div>

              {/* Animated Equalizer Bars */}
              <div className="flex items-end gap-1 h-7 pt-1 flex-shrink-0 px-2 bg-stone-950/70 rounded-lg border border-stone-800">
                <span className={`w-1 bg-amber-400 rounded-full transition-all duration-300 ${isPlaying ? 'h-5 animate-pulse' : 'h-1.5'}`} />
                <span className={`w-1 bg-orange-500 rounded-full transition-all duration-200 ${isPlaying ? 'h-6 animate-bounce' : 'h-2'}`} />
                <span className={`w-1 bg-emerald-400 rounded-full transition-all duration-400 ${isPlaying ? 'h-4 animate-pulse' : 'h-1'}`} />
                <span className={`w-1 bg-amber-300 rounded-full transition-all duration-150 ${isPlaying ? 'h-6 animate-bounce' : 'h-2.5'}`} />
              </div>
            </div>

            {/* Tagline / Vibe quote */}
            <div className="bg-stone-950/90 border border-stone-800/80 rounded-xl p-2 text-[10px] text-stone-300 italic flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-400 flex-shrink-0" />
              <span className="truncate">{currentTrack.tagline}</span>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="w-full bg-stone-800 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-stone-400 mt-1 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between pt-1">
              
              {/* Volume / Mute */}
              <div className="flex items-center gap-1.5 text-stone-400">
                <button 
                  onClick={toggleMute}
                  className="hover:text-amber-400 transition-colors p-1"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-14 h-1 bg-stone-700 accent-amber-400 rounded-lg cursor-pointer"
                />
              </div>

              {/* Main Playback Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevTrack}
                  className="p-1.5 rounded-full text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
                  title="Previous Vibe"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={togglePlay}
                  className="w-9 h-9 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 flex items-center justify-center font-bold shadow-md hover:scale-105 transition-transform"
                  title={isPlaying ? "Pause Ambient" : "Play Ambient Vibe"}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>

                <button
                  onClick={nextTrack}
                  className="p-1.5 rounded-full text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
                  title="Next Vibe"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Stream Full Playlist Out */}
              <div className="flex items-center gap-1">
                <a
                  href={`https://open.spotify.com/search/${currentTrack.spotifyQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 px-2 py-1 rounded-md flex items-center gap-1 font-semibold transition-colors"
                  title="Stream on Spotify"
                >
                  <Headphones className="w-3 h-3" />
                  <span>Spotify</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </div>

            </div>

          </div>
        ) : (
          /* Minimized compact pill */
          <div 
            onClick={() => setIsMinimized(false)}
            className="p-2.5 bg-stone-900 flex items-center justify-between cursor-pointer hover:bg-stone-850"
          >
            <div className="flex items-center gap-2 min-w-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="w-7 h-7 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center font-bold flex-shrink-0"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
              </button>
              <div className="truncate text-xs">
                <span className="font-bold text-white block truncate">{currentTrack.name}</span>
                <span className="text-[10px] text-amber-400 block truncate">{currentTrack.vibeTag}</span>
              </div>
            </div>

            <span className="text-[10px] text-stone-400 underline ml-2 flex-shrink-0">
              Expand
            </span>
          </div>
        )}

      </div>

      {/* Humorous Mudguard Flaps (Truck / Chandigarh style) */}
      {!isMinimized && (
        <div className="flex justify-between px-6 -mt-0.5 pointer-events-none">
          <div className="bg-stone-950 border border-stone-800 text-amber-400 text-[9px] font-bold px-2 py-0.5 rounded-b-md shadow-md uppercase tracking-wider">
            🌸 CH-01 GEDI ROUTE
          </div>
          <div className="bg-stone-950 border border-stone-800 text-amber-400 text-[9px] font-bold px-2 py-0.5 rounded-b-md shadow-md uppercase tracking-wider">
            NO HONKING • CITY BEAUTIFUL 🌿
          </div>
        </div>
      )}

    </div>
  );
};
