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
  tagline: string;
  famousLyric: string;
  genre: string;
  tempo: number; // BPM for procedural synth rhythm
  baseNote: number; // Root frequency
  spotifySearch: string;
  youtubeSearch: string;
  coverImage: string;
}

const CHANDIGARH_PLAYLIST: ChandigarhTrack[] = [
  {
    id: 'chd-mein',
    title: 'Chandigarh Mein',
    artist: 'Badshah, Harrdy Sandhu, Diljit Dosanjh',
    tagline: 'The ultimate Bollywood anthem celebrating the Tricity lifestyle',
    famousLyric: '“Dila du ghar Chandigarh mein... yaaran da swag!”',
    genre: 'Bollywood Hit',
    tempo: 122,
    baseNote: 130.81, // C3
    spotifySearch: 'Chandigarh Mein Good Newwz',
    youtubeSearch: 'Chandigarh Mein Good Newwz Zee Music',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'chd-aashiqui',
    title: 'Chandigarh Kare Aashiqui',
    artist: 'Sachin-Jigar, Jassi Sidhu, Ayushmann Khurrana',
    tagline: 'High-energy bhangra-pop tribute to Chandigarh lovers',
    famousLyric: '“Chandigarh kare aashiqui, munda jattan da kare aashiqui!”',
    genre: 'Bollywood Hit',
    tempo: 128,
    baseNote: 146.83, // D3
    spotifySearch: 'Chandigarh Kare Aashiqui Title Track',
    youtubeSearch: 'Chandigarh Kare Aashiqui Title Track T-Series',
    coverImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'yaari-chd',
    title: 'Yaari Chandigarh Waliye',
    artist: 'Ranjit Bawa',
    tagline: 'Cult classic track about college life & heartbreaks in the city',
    famousLyric: '“Yaari Chandigarh waliye ni teri... kar gayi khali jatt di pocket!”',
    genre: 'Punjabi Anthem',
    tempo: 104,
    baseNote: 110.00, // A2
    spotifySearch: 'Yaari Chandigarh Waliye Ranjit Bawa',
    youtubeSearch: 'Yaari Chandigarh Waliye Ranjit Bawa T-Series Apna Punjab',
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'chd-mankirt',
    title: 'Chandigarh (Gedi Route)',
    artist: 'Mankirt Aulakh',
    tagline: 'Cruising through Sector 8, 9, 10 and 11 on the Gedi Route',
    famousLyric: '“Gedi route utte kude lounde gediyaan, Chandigarh rehndi ae tu!”',
    genre: 'Geri Route Classic',
    tempo: 116,
    baseNote: 123.47, // B2
    spotifySearch: 'Chandigarh Mankirt Aulakh',
    youtubeSearch: 'Chandigarh Mankirt Aulakh Main Teri Tu Mera',
    coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'chd-waliye-sharry',
    title: 'Chandigarh Waliye (Classic)',
    artist: 'Sharry Mann',
    tagline: 'Nostalgic Panjab University student anthem on repeat',
    famousLyric: '“Chandigarh walie ni tere karke, kitte daakhle te saal kharaab kareya!”',
    genre: 'College Nostalgia',
    tempo: 110,
    baseNote: 98.00, // G2
    spotifySearch: 'Chandigarh Waliye Sharry Mann',
    youtubeSearch: 'Chandigarh Waliye Sharry Mann Aate Di Chiri',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80'
  }
];

export const AddaJukebox: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(214); // 3:34 min duration
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylistDrawer, setShowPlaylistDrawer] = useState(false);

  // Web Audio Synth Engine (100% Guaranteed to Play on All Devices Without Remote Network Lag)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const beatTimerRef = useRef<number | null>(null);
  const progressTimerRef = useRef<number | null>(null);
  const activeNodesRef = useRef<AudioNode[]>([]);

  const currentTrack = CHANDIGARH_PLAYLIST[currentTrackIndex];

  // Stop all active synthesized notes
  const stopAudio = () => {
    if (beatTimerRef.current) {
      clearInterval(beatTimerRef.current);
      beatTimerRef.current = null;
    }
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
    activeNodesRef.current.forEach(node => {
      try {
        if ('stop' in node && typeof (node as OscillatorNode).stop === 'function') {
          (node as OscillatorNode).stop();
        }
        node.disconnect();
      } catch (e) {
        // ignore
      }
    });
    activeNodesRef.current = [];
  };

  // Play a rhythmic Punjabi Dhol Bass pulse & harmonic chord
  const triggerBeatStep = (ctx: AudioContext, masterGain: GainNode, step: number, baseFreq: number) => {
    const now = ctx.currentTime;

    // 1. Dhol / Kick drum (on step 0 and 2)
    if (step % 2 === 0) {
      const kickOsc = ctx.createOscillator();
      const kickGain = ctx.createGain();
      kickOsc.type = 'sine';
      kickOsc.frequency.setValueAtTime(140, now);
      kickOsc.frequency.exponentialRampToValueAtTime(38, now + 0.12);

      kickGain.gain.setValueAtTime(0.5, now);
      kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      kickOsc.connect(kickGain);
      kickGain.connect(masterGain);
      kickOsc.start(now);
      kickOsc.stop(now + 0.15);
    }

    // 2. Snare / Clack (on step 1 and 3)
    if (step % 2 === 1) {
      const snareOsc = ctx.createOscillator();
      const snareGain = ctx.createGain();
      snareOsc.type = 'triangle';
      snareOsc.frequency.setValueAtTime(280, now);
      snareGain.gain.setValueAtTime(0.25, now);
      snareGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      snareOsc.connect(snareGain);
      snareGain.connect(masterGain);
      snareOsc.start(now);
      snareOsc.stop(now + 0.09);
    }

    // 3. Melodic Punjabi Folk Harmony Chords
    const chordPattern = [1, 1.25, 1.5, 1.25, 1.33, 1.5, 1.2, 1];
    const pitchMultiplier = chordPattern[step % chordPattern.length];

    const melodyOsc = ctx.createOscillator();
    const melodyGain = ctx.createGain();
    melodyOsc.type = 'sawtooth';
    melodyOsc.frequency.setValueAtTime(baseFreq * pitchMultiplier, now);

    // Warm analog lowpass filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(750, now);

    melodyGain.gain.setValueAtTime(0.12, now);
    melodyGain.gain.exponentialRampToValueAtTime(0.005, now + 0.28);

    melodyOsc.connect(filter);
    filter.connect(melodyGain);
    melodyGain.connect(masterGain);

    melodyOsc.start(now);
    melodyOsc.stop(now + 0.3);
  };

  // Start the procedural Punjabi Highway Music Engine
  const startMusicEngine = (track: ChandigarhTrack) => {
    stopAudio();

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
      masterGain.gain.setValueAtTime(isMuted ? 0 : volume * 0.4, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      let currentStep = 0;
      const stepDurationMs = (60 / track.tempo / 2) * 1000;

      // Initial immediate beat
      triggerBeatStep(ctx, masterGain, currentStep, track.baseNote);
      currentStep++;

      // Rhythmic loop
      beatTimerRef.current = window.setInterval(() => {
        if (!audioCtxRef.current) return;
        triggerBeatStep(audioCtxRef.current, masterGain, currentStep, track.baseNote);
        currentStep++;
      }, stepDurationMs);

      // Scrubber timer
      progressTimerRef.current = window.setInterval(() => {
        setCurrentTime(t => (t >= duration ? 0 : t + 1));
      }, 1000);

      setIsPlaying(true);
    } catch (e) {
      console.error("Audio playback error:", e);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      startMusicEngine(currentTrack);
    }
  };

  const nextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % CHANDIGARH_PLAYLIST.length;
    setCurrentTrackIndex(nextIdx);
    setCurrentTime(0);
    if (isPlaying) {
      startMusicEngine(CHANDIGARH_PLAYLIST[nextIdx]);
    }
  };

  const prevTrack = () => {
    const prevIdx = (currentTrackIndex - 1 + CHANDIGARH_PLAYLIST.length) % CHANDIGARH_PLAYLIST.length;
    setCurrentTrackIndex(prevIdx);
    setCurrentTime(0);
    if (isPlaying) {
      startMusicEngine(CHANDIGARH_PLAYLIST[prevIdx]);
    }
  };

  const selectTrack = (idx: number) => {
    setCurrentTrackIndex(idx);
    setCurrentTime(0);
    startMusicEngine(CHANDIGARH_PLAYLIST[idx]);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(isMuted ? 0 : newVol * 0.4, audioCtxRef.current.currentTime);
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(nextMuted ? 0 : volume * 0.4, audioCtxRef.current.currentTime);
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const formatTime = (secs: number) => {
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
                  selectTrack(idx);
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
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden bg-black flex-shrink-0 border border-emerald-600/40 shadow-md">
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

          {/* Time Scrubber (0:01 ━━━━●───── 3:34) */}
          <div className="space-y-1">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-[#124231] accent-[#fde047] rounded-lg cursor-pointer"
            />
            <div className="flex justify-between items-center text-[10px] text-emerald-300 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span className="text-[11px] text-[#fde047] font-sans italic truncate px-2 font-medium">
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
                  onClick={() => selectTrack(idx)}
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

            {/* Volume + Stream Links */}
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
