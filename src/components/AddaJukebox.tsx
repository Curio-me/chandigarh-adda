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

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
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
              // Flip cassette to other side!
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
    <div className="w-full max-w-xl mx-auto select-none font-sans drop-shadow-2xl px-2 sm:px-0">
      
      {/* ======================================================== */}
      {/* VINTAGE 90s AUDIO CASSETTE TAPE SHELL */}
      {/* ======================================================== */}
      <div className="relative bg-[#201d1a] border-[5px] border-[#3a3530] rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] ring-2 ring-black/80">
        
        {/* Corner Cassette Screws (Authentic Hardware Details) */}
        <div className="absolute top-2 left-2.5 w-2.5 h-2.5 rounded-full bg-[#524b45] border border-black/80 flex items-center justify-center">
          <div className="w-1.5 h-0.5 bg-[#2b2723]" />
        </div>
        <div className="absolute top-2 right-2.5 w-2.5 h-2.5 rounded-full bg-[#524b45] border border-black/80 flex items-center justify-center">
          <div className="w-1.5 h-0.5 bg-[#2b2723]" />
        </div>
        <div className="absolute bottom-2 left-2.5 w-2.5 h-2.5 rounded-full bg-[#524b45] border border-black/80 flex items-center justify-center">
          <div className="w-1.5 h-0.5 bg-[#2b2723]" />
        </div>
        <div className="absolute bottom-2 right-2.5 w-2.5 h-2.5 rounded-full bg-[#524b45] border border-black/80 flex items-center justify-center">
          <div className="w-1.5 h-0.5 bg-[#2b2723]" />
        </div>

        {/* Paper Label (Vintage Cassette Inlay) */}
        <div className="bg-[#f6eee3] rounded-xl p-3 sm:p-4 text-[#1a1816] shadow-inner border border-[#d6c7b2]">
          
          {/* Top Brand Banner Strip */}
          <div className="flex items-center justify-between border-b-2 border-[#d94828] pb-1.5 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="bg-[#d94828] text-white text-[10px] font-black px-1.5 py-0.5 rounded tracking-widest font-mono">
                {currentTrack.side}
              </span>
              <span className="font-yatra text-sm sm:text-base text-[#1a1816] font-bold tracking-wider">
                CH-01 STEREO CASSETTE
              </span>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[#786b59]">
              <span>DOLBY B-NR</span>
              <span className="hidden sm:inline">• 60 MIN</span>
            </div>
          </div>

          {/* Lined Notepaper Area with Handwritten Track Name */}
          <div className="bg-white/80 border border-[#e2d5c3] rounded-lg p-2.5 mb-3 flex items-center justify-between shadow-xs">
            <div className="truncate mr-2 text-left">
              <span className="text-[10px] font-mono font-bold text-[#d94828] uppercase tracking-wider block">
                NOW PLAYING • {currentTrack.tag}
              </span>
              <h3 className="font-bold text-sm sm:text-base text-[#111] truncate tracking-tight">
                {currentTrack.title}
              </h3>
              <p className="text-[11px] text-[#635746] truncate">
                {currentTrack.artist}
              </p>
            </div>

            {/* Flip Tape Button */}
            <button
              onClick={() => goToTrack(currentIdx === 0 ? 1 : 0)}
              className="px-2.5 py-1 bg-[#1a1816] hover:bg-[#d94828] text-[#f6eee3] text-[10px] font-mono font-bold rounded-md transition-colors flex-shrink-0 flex items-center gap-1 shadow-sm"
              title="Flip to other side"
            >
              <Repeat className="w-3 h-3" />
              <span>Flip to {currentIdx === 0 ? 'Side B' : 'Side A'}</span>
            </button>
          </div>

          {/* ======================================================== */}
          {/* CASSETTE TRANSPARENT WINDOW WITH SPINNING REELS & TAPE */}
          {/* ======================================================== */}
          <div className="relative bg-[#1a1816] border-2 border-[#473e35] rounded-xl p-3 sm:p-4 overflow-hidden shadow-inner flex items-center justify-around">
            
            {/* Magnetic Tape Ribbon connecting the two wheels */}
            <div className="absolute top-1/2 left-12 right-12 h-3 bg-[#331c14] -translate-y-1/2 z-0 border-y border-[#1f100a]" />

            {/* Left Cogged Spool (Spins when playing) */}
            <div className="relative z-10 flex flex-col items-center">
              <div 
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#f4ebd9] border-4 border-[#331c14] flex items-center justify-center shadow-md transition-transform ${
                  isPlaying ? 'animate-[spin_3s_linear_infinite]' : ''
                }`}
              >
                {/* Center cog teeth */}
                <div className="w-6 h-6 rounded-full bg-[#1a1816] border-2 border-[#7a6f62] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-[#f4ebd9] rounded-sm" />
                </div>
              </div>
            </div>

            {/* Center Time Counter & Hidden Tiny YouTube Screen */}
            <div className="relative z-10 flex flex-col items-center text-center px-2">
              
              {/* Tape Level Meter Ruler Lines */}
              <div className="flex gap-1 mb-1 opacity-70">
                <div className="w-0.5 h-3 bg-[#f6eee3]" />
                <div className="w-0.5 h-2 bg-[#f6eee3]" />
                <div className="w-0.5 h-2 bg-[#f6eee3]" />
                <div className="w-0.5 h-4 bg-[#d94828]" />
                <div className="w-0.5 h-2 bg-[#f6eee3]" />
                <div className="w-0.5 h-2 bg-[#f6eee3]" />
                <div className="w-0.5 h-3 bg-[#f6eee3]" />
              </div>

              {/* Time display */}
              <div className="font-mono text-xs font-bold text-[#fde047] tracking-widest bg-black/60 px-2.5 py-0.5 rounded border border-[#524b45]">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>

              {/* Hidden 1px YouTube Screen Driving Real Master Audio */}
              <div className="w-1 h-1 overflow-hidden opacity-0 pointer-events-none">
                <div id="yt-cassette-audio" />
              </div>
            </div>

            {/* Right Cogged Spool (Spins when playing) */}
            <div className="relative z-10 flex flex-col items-center">
              <div 
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#f4ebd9] border-4 border-[#331c14] flex items-center justify-center shadow-md transition-transform ${
                  isPlaying ? 'animate-[spin_3s_linear_infinite]' : ''
                }`}
              >
                {/* Center cog teeth */}
                <div className="w-6 h-6 rounded-full bg-[#1a1816] border-2 border-[#7a6f62] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-[#f4ebd9] rounded-sm" />
                </div>
              </div>
            </div>

          </div>

          {/* Scrubber Ribbon Slider */}
          <div className="mt-3">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-[#d6c7b2] accent-[#d94828] rounded-lg cursor-pointer"
            />
            <div className="flex justify-between items-center text-[11px] text-[#524534] font-medium italic pt-1">
              <span className="truncate">{currentTrack.famousLyric}</span>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* RETRO MECHANICAL CASSETTE DECK BUTTONS */}
        {/* ======================================================== */}
        <div className="mt-3 pt-2 flex items-center justify-between gap-2 px-1 sm:px-2">
          
          {/* Side Selector Pills */}
          <div className="flex items-center gap-1.5">
            {CHANDIGARH_CASSETTE_TRACKS.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => goToTrack(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all shadow-sm ${
                  currentIdx === idx
                    ? 'bg-[#fde047] text-[#1a1816] border-2 border-black/60 shadow-md font-black scale-105'
                    : 'bg-[#2b2723] text-[#d6c7b2] hover:bg-[#38332e] border border-black/40'
                }`}
              >
                {t.side}
              </button>
            ))}
          </div>

          {/* Mechanical Transport Controls (Rewind, Play, Forward) */}
          <div className="flex items-center gap-2">
            
            {/* Rewind */}
            <button
              onClick={() => goToTrack(0)}
              className="w-9 h-9 rounded-lg bg-[#2b2723] hover:bg-[#38332e] text-[#f6eee3] flex items-center justify-center border-t border-[#4f4841] border-b-2 border-black active:translate-y-0.5 shadow-md transition-all"
              title="Side A"
            >
              <SkipBack className="w-4 h-4 fill-current" />
            </button>

            {/* Play / Pause Tactile Button */}
            <button
              onClick={togglePlay}
              className={`w-12 h-12 rounded-xl flex items-center justify-center font-black transition-all active:translate-y-1 shadow-lg ${
                isPlaying
                  ? 'bg-[#d94828] text-white border-t border-[#f06e51] border-b-4 border-[#85230d]'
                  : 'bg-[#fde047] hover:bg-[#facc15] text-[#1a1816] border-t border-[#fff] border-b-4 border-[#ab8a0d]'
              }`}
              title={isPlaying ? "Stop Tape" : "Play Tape"}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-0.5" />
              )}
            </button>

            {/* Fast Forward */}
            <button
              onClick={() => goToTrack(1)}
              className="w-9 h-9 rounded-lg bg-[#2b2723] hover:bg-[#38332e] text-[#f6eee3] flex items-center justify-center border-t border-[#4f4841] border-b-2 border-black active:translate-y-0.5 shadow-md transition-all"
              title="Side B"
            >
              <SkipForward className="w-4 h-4 fill-current" />
            </button>

          </div>

          {/* Mute Toggle */}
          <div className="flex items-center gap-1 text-[#f6eee3]">
            <button 
              onClick={toggleMute}
              className="p-1.5 rounded-lg bg-[#2b2723] hover:bg-[#38332e] border border-black/40 text-[#fde047] transition-colors"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

        </div>

      </div>

      {/* Hanging Mudflaps below cassette deck */}
      <div className="flex justify-between px-6 sm:px-12 -mt-1 pointer-events-none">
        <div className="bg-[#111] border border-stone-800 text-[#fff3dc] font-yatra text-[10px] sm:text-[11px] px-3 py-1 rounded-b-lg shadow-xl tracking-wider">
          ਬੁਰੀ ਨਜ਼ਰ / बुरी नज़र
        </div>
        <div className="bg-[#111] border border-stone-800 text-[#fff3dc] font-yatra text-[10px] sm:text-[11px] px-3 py-1 rounded-b-lg shadow-xl tracking-wider">
          ਵਾਲੇ ਤੇਰਾ ਮੂੰਹ ਕਾਲਾ 🌸
        </div>
      </div>

    </div>
  );
};
