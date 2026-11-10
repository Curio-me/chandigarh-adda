import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Repeat
} from 'lucide-react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface CassetteTrack {
  id: string; // YouTube video ID
  title: string;
  artist: string;
  side: 'SIDE A' | 'SIDE B';
  famousLyric: string;
  tag: string;
}

const CHANDIGARH_CASSETTE_TRACKS: CassetteTrack[] = [
  {
    id: 'QLUDWeBTixE',
    title: 'Yaari Chandigarh Waliye',
    artist: 'Ranjit Bawa',
    side: 'SIDE A',
    famousLyric: '“Yaari Chandigarh waliye ni teri... kar gayi khali jatt di pocket!”',
    tag: 'Tricity Classic'
  },
  {
    id: 'PjHsB7ed1uM',
    title: 'Chandigarh Rehn Waaliye',
    artist: 'Jenny Johal ft. Raftaar',
    side: 'SIDE B',
    famousLyric: '“Chandigarh rehn waliye, dil lutt ke le gayi!”',
    tag: 'Geri Route Rap'
  }
];

export const AddaJukebox: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [statusText, setStatusText] = useState('Yaari Chandigarh Waliye');

  const playerRef = useRef<any>(null);
  const timerRef = useRef<number | null>(null);

  const currentTrack = CHANDIGARH_CASSETTE_TRACKS[currentIdx];

  // Load YouTube Iframe API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }

    const handleStartGedi = () => {
      if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
        playerRef.current.playVideo();
        setIsPlaying(true);
      } else {
        let attempts = 0;
        const interval = setInterval(() => {
          attempts++;
          if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
            playerRef.current.playVideo();
            setIsPlaying(true);
            clearInterval(interval);
          } else if (attempts > 20) {
            clearInterval(interval);
          }
        }, 250);
      }
    };

    window.addEventListener('start-gedi', handleStartGedi);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      window.removeEventListener('start-gedi', handleStartGedi);
    };
  }, []);

  const initPlayer = () => {
    try {
      playerRef.current = new window.YT.Player('yt-cassette-audio', {
        videoId: CHANDIGARH_CASSETTE_TRACKS[0].id,
        playerVars: {
          controls: 0,
          disablekb: 1,
          playsinline: 1,
          rel: 0,
          modestbranding: 1
        },
        events: {
          onReady: () => {
            setIsPlayerReady(true);
            setStatusText(CHANDIGARH_CASSETTE_TRACKS[0].title);
          },
          onError: (e: any) => {
            console.warn('Track error, switching side:', e);
            goToTrack((currentIdx + 1) % CHANDIGARH_CASSETTE_TRACKS.length);
          },
          onStateChange: (e: any) => {
            const state = e.data;
            const playing = state === window.YT.PlayerState.PLAYING;
            setIsPlaying(playing);

            if (playing) {
              startProgressTimer();
              if (playerRef.current) {
                setDuration(playerRef.current.getDuration() || 240);
              }
            } else {
              if (timerRef.current) clearInterval(timerRef.current);
            }

            if (state === window.YT.PlayerState.ENDED) {
              // Flip cassette to other side
              goToTrack((currentIdx + 1) % CHANDIGARH_CASSETTE_TRACKS.length);
            }
          }
        }
      });
    } catch (e) {
      console.warn('YT player initialization:', e);
    }
  };

  const startProgressTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        const cur = playerRef.current.getCurrentTime();
        const dur = playerRef.current.getDuration();
        setCurrentTime(cur);
        if (dur && dur > 0) setDuration(dur);
      }
    }, 500);
  };

  const goToTrack = (idx: number) => {
    const nextIndex = ((idx % CHANDIGARH_CASSETTE_TRACKS.length) + CHANDIGARH_CASSETTE_TRACKS.length) % CHANDIGARH_CASSETTE_TRACKS.length;
    setCurrentIdx(nextIndex);
    setCurrentTime(0);

    const song = CHANDIGARH_CASSETTE_TRACKS[nextIndex];
    setStatusText(song.title);

    if (playerRef.current && isPlayerReady) {
      playerRef.current.loadVideoById(song.id);
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (!playerRef.current || !isPlayerReady) return;
    try {
      const state = playerRef.current.getPlayerState();
      if (state === window.YT.PlayerState.PLAYING) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    } catch (e) {
      playerRef.current.loadVideoById(currentTrack.id);
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
      playerRef.current.seekTo(seekTime, true);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs <= 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full max-w-[420px] mx-auto select-none font-sans drop-shadow-2xl px-2 sm:px-0">
      
      {/* ======================================================== */}
      {/* COMPACT VINTAGE 90s SMOKY TRANSLUCENT CASSETTE TAPE SHELL */}
      {/* ======================================================== */}
      <div className="relative bg-[#1e1b17]/80 backdrop-blur-md border-[3px] border-[#4a423a]/75 rounded-2xl p-2.5 sm:p-3.5 shadow-[0_16px_40px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
        
        {/* Corner Cassette Screws */}
        <div className="absolute top-1.5 left-2 w-2 h-2 rounded-full bg-[#524b45]/90 border border-black/80 flex items-center justify-center">
          <div className="w-1 h-0.5 bg-[#2b2723]" />
        </div>
        <div className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-[#524b45]/90 border border-black/80 flex items-center justify-center">
          <div className="w-1 h-0.5 bg-[#2b2723]" />
        </div>
        <div className="absolute bottom-1.5 left-2 w-2 h-2 rounded-full bg-[#524b45]/90 border border-black/80 flex items-center justify-center">
          <div className="w-1 h-0.5 bg-[#2b2723]" />
        </div>
        <div className="absolute bottom-1.5 right-2 w-2 h-2 rounded-full bg-[#524b45]/90 border border-black/80 flex items-center justify-center">
          <div className="w-1 h-0.5 bg-[#2b2723]" />
        </div>

        {/* Paper Label (Vintage Cassette Inlay - Soft Translucent) */}
        <div className="bg-[#f6eee3]/85 backdrop-blur-sm rounded-lg p-2 sm:p-2.5 text-[#1a1816] shadow-inner border border-[#d6c7b2]/80">
          
          {/* Top Brand Banner Strip */}
          <div className="flex items-center justify-between border-b-2 border-[#d94828] pb-1 mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="bg-[#d94828] text-white text-[9px] font-black px-1.5 py-0.2 rounded tracking-widest font-mono">
                {currentTrack.side}
              </span>
              <span className="font-yatra text-xs sm:text-sm text-[#1a1816] font-bold tracking-wider">
                CH-01 CASSETTE
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[8.5px] font-mono font-bold text-[#786b59]">
              <span className="hidden sm:inline">93.5 FM</span>
              <span className="hidden sm:inline">•</span>
              <span>DOLBY B-NR</span>
              <span>•</span>
              <span className="text-[#d94828]">320K</span>
            </div>
          </div>

          {/* Lined Notepaper Area with Handwritten Track Name */}
          <div className="bg-white/80 backdrop-blur-xs border border-[#e2d5c3]/90 rounded-md px-2 py-1 mb-2 flex items-center justify-between shadow-2xs">
            <div className="truncate mr-2 text-left">
              <h3 className="font-bold text-xs sm:text-sm text-[#111] truncate tracking-tight">
                {currentTrack.title}
              </h3>
              <p className="text-[10px] text-[#635746] truncate">
                {currentTrack.artist}
              </p>
            </div>

            {/* Flip Tape Button */}
            <button
              onClick={() => goToTrack(currentIdx === 0 ? 1 : 0)}
              className="px-2 py-0.5 bg-[#1a1816]/90 hover:bg-[#d94828] text-[#f6eee3] text-[9px] font-mono font-bold rounded transition-colors flex-shrink-0 flex items-center gap-1 shadow-2xs"
              title="Flip to other side"
            >
              <Repeat className="w-2.5 h-2.5" />
              <span>Flip to {currentIdx === 0 ? 'B' : 'A'}</span>
            </button>
          </div>

          {/* ======================================================== */}
          {/* CASSETTE TRANSPARENT SMOKY WINDOW WITH SPINNING REELS */}
          {/* ======================================================== */}
          <div className="relative bg-black/65 backdrop-blur-md border border-[#5a4f44]/60 rounded-lg py-1 px-3 overflow-hidden shadow-inner flex items-center justify-around">
            
            {/* Magnetic Tape Ribbon connecting the two wheels */}
            <div className="absolute top-1/2 left-8 right-8 h-2.5 bg-[#331c14] -translate-y-1/2 z-0 border-y border-[#1f100a]" />

            {/* Left Cogged Spool (Spins when playing) */}
            <div className="relative z-10 flex flex-col items-center">
              <div 
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f4ebd9] border-[3px] border-[#331c14] flex items-center justify-center shadow-xs transition-transform ${
                  isPlaying ? 'animate-[spin_2.8s_linear_infinite]' : ''
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-[#1a1816] border border-[#7a6f62] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#f4ebd9] rounded-xs" />
                </div>
              </div>
            </div>

            {/* Center Time Counter, Frequency Equalizer & Audio Engine */}
            <div className="relative z-10 flex flex-col items-center text-center px-2 min-w-[110px]">
              
              {/* Dynamic Retro Audio Frequency Equalizer (VU Bands) */}
              <div className="flex items-end justify-center gap-1 h-4 mb-1 px-2 py-0.5 rounded bg-black/75 border border-[#524b45]/70 backdrop-blur-xs">
                {[
                  { id: 1, anim: 'animate-eq-1', color: 'bg-emerald-400' },
                  { id: 2, anim: 'animate-eq-2', color: 'bg-emerald-400' },
                  { id: 3, anim: 'animate-eq-3', color: 'bg-emerald-400' },
                  { id: 4, anim: 'animate-eq-4', color: 'bg-[#fde047]' },
                  { id: 5, anim: 'animate-eq-5', color: 'bg-[#fde047]' },
                  { id: 6, anim: 'animate-eq-6', color: 'bg-[#fde047]' },
                  { id: 7, anim: 'animate-eq-7', color: 'bg-orange-400' },
                  { id: 8, anim: 'animate-eq-8', color: 'bg-orange-400' },
                  { id: 9, anim: 'animate-eq-9', color: 'bg-red-500' },
                  { id: 10, anim: 'animate-eq-10', color: 'bg-red-500' },
                ].map((bar) => (
                  <span
                    key={bar.id}
                    className={`w-[2.5px] h-3.5 rounded-t-xs transition-all duration-300 ${bar.color} ${
                      isPlaying 
                        ? `${bar.anim} opacity-95 shadow-[0_0_4px_currentColor]` 
                        : 'scale-y-[0.15] opacity-30 origin-bottom'
                    }`}
                  />
                ))}
              </div>

              {/* Time display with STEREO pulse pill */}
              <div className="flex items-center gap-1 font-mono text-[9px] font-bold text-[#fde047] tracking-wider bg-black/80 px-2 py-0.5 rounded border border-[#524b45]/80 shadow-inner">
                {isPlaying && (
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_3px_#34d399]" />
                )}
                <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
              </div>

              {/* Hidden 1px YouTube Screen Driving Real Master Audio */}
              <div className="w-1 h-1 overflow-hidden opacity-0 pointer-events-none">
                <div id="yt-cassette-audio" />
              </div>
            </div>

            {/* Right Cogged Spool (Spins when playing) */}
            <div className="relative z-10 flex flex-col items-center">
              <div 
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f4ebd9] border-[3px] border-[#331c14] flex items-center justify-center shadow-xs transition-transform ${
                  isPlaying ? 'animate-[spin_2.8s_linear_infinite]' : ''
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-[#1a1816] border border-[#7a6f62] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#f4ebd9] rounded-xs" />
                </div>
              </div>
            </div>

          </div>

          {/* Scrubber Ribbon Slider */}
          <div className="mt-1.5">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-[#d6c7b2] accent-[#d94828] rounded-lg cursor-pointer"
            />
            <div className="flex justify-between items-center text-[10px] text-[#524534] font-medium italic pt-0.5">
              <span className="truncate">{currentTrack.famousLyric}</span>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* COMPACT MECHANICAL CASSETTE DECK BUTTONS */}
        {/* ======================================================== */}
        <div className="mt-2 flex items-center justify-between gap-2 px-1">
          
          {/* Side Selector Pills */}
          <div className="flex items-center gap-1">
            {CHANDIGARH_CASSETTE_TRACKS.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => goToTrack(idx)}
                className={`px-2 py-1 rounded text-[10px] font-mono font-bold transition-all ${
                  currentIdx === idx
                    ? 'bg-[#fde047] text-[#1a1816] font-black shadow-xs'
                    : 'bg-[#2b2723]/80 hover:bg-[#38332e] text-[#d6c7b2] backdrop-blur-xs'
                }`}
              >
                {t.side}
              </button>
            ))}
          </div>

          {/* Mechanical Transport Controls (Rewind, Play, Forward) */}
          <div className="flex items-center gap-1.5">
            
            {/* Rewind */}
            <button
              onClick={() => goToTrack(0)}
              className="w-7 h-7 rounded bg-[#2b2723]/80 hover:bg-[#38332e] text-[#f6eee3] flex items-center justify-center active:translate-y-0.5 shadow-xs transition-all backdrop-blur-xs"
              title="Side A"
            >
              <SkipBack className="w-3.5 h-3.5 fill-current" />
            </button>

            {/* Play / Pause Tactile Button */}
            <button
              onClick={togglePlay}
              className={`w-9 h-9 rounded-lg flex items-center justify-center font-black transition-all active:translate-y-0.5 shadow-md ${
                isPlaying
                  ? 'bg-[#d94828] text-white'
                  : 'bg-[#fde047] hover:bg-[#facc15] text-[#1a1816]'
              }`}
              title={isPlaying ? "Stop Tape" : "Play Tape"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>

            {/* Fast Forward */}
            <button
              onClick={() => goToTrack(1)}
              className="w-7 h-7 rounded bg-[#2b2723]/80 hover:bg-[#38332e] text-[#f6eee3] flex items-center justify-center active:translate-y-0.5 shadow-xs transition-all backdrop-blur-xs"
              title="Side B"
            >
              <SkipForward className="w-3.5 h-3.5 fill-current" />
            </button>

          </div>

          {/* Mute Toggle */}
          <div className="flex items-center gap-1 text-[#f6eee3]">
            <button 
              onClick={toggleMute}
              className="p-1 rounded bg-[#2b2723]/80 hover:bg-[#38332e] text-[#fde047] transition-colors backdrop-blur-xs"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>

        </div>

      </div>

      {/* Hanging Mudflaps below cassette deck */}
      <div className="flex justify-between px-6 sm:px-10 -mt-0.5 pointer-events-none">
        <div className="bg-[#111]/80 backdrop-blur-xs border border-stone-800/80 text-[#fff3dc] font-yatra text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-b-md shadow-lg tracking-wider">
          ਬੁਰੀ ਨਜ਼ਰ / बुरी नज़र
        </div>
        <div className="bg-[#111]/80 backdrop-blur-xs border border-stone-800/80 text-[#fff3dc] font-yatra text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-b-md shadow-lg tracking-wider">
          ਵਾਲੇ ਤੇਰਾ ਮੂੰਹ ਕਾਲਾ 🌸
        </div>
      </div>

    </div>
  );
};
