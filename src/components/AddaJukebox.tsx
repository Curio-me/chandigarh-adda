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

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface SongItem {
  id: string; // YouTube video ID (exact match)
  title: string;
  artist: string;
  famousLyric: string;
  tag: string;
}

const CHANDIGARH_SONGS: SongItem[] = [
  {
    id: 'A3W_o55w6gU',
    title: 'Chandigarh Mein',
    artist: 'Badshah, Harrdy Sandhu, Diljit Dosanjh',
    famousLyric: '“Dila du ghar Chandigarh mein... yaaran da swag!”',
    tag: 'Bollywood Hit'
  },
  {
    id: 'ERsUcf5RkS8',
    title: 'Chandigarh Kare Aashiqui',
    artist: 'Sachin-Jigar, Jassi Sidhu, Ayushmann Khurrana',
    famousLyric: '“Chandigarh kare aashiqui, munda jattan da kare aashiqui!”',
    tag: 'Bhangra Pop'
  },
  {
    id: 'QLUDWeBTixE',
    title: 'Yaari Chandigarh Waliye',
    artist: 'Ranjit Bawa',
    famousLyric: '“Yaari Chandigarh waliye ni teri... kar gayi khali jatt di pocket!”',
    tag: 'Punjabi Anthem'
  },
  {
    id: 'IJNR_UVLDhs',
    title: 'Main Nikla Gaddi Leke',
    artist: 'Udit Narayan (Gadar Truck Anthem)',
    famousLyric: '“Main nikla o gaddi leke... raste par ek mod aaya!”',
    tag: 'Highway Classic'
  },
  {
    id: '5MIGQBpVeqs',
    title: 'Mujhse Mohabbat Ka',
    artist: 'Kumar Sanu (Dhaba Classic)',
    famousLyric: '“Mujhse mohabbat ka izhaar karti... kaash koi ladki mujhe pyar karti”',
    tag: '90s Highway Hit'
  },
  {
    id: 'd7MDzmchS50',
    title: 'Yeh Dil Deewana',
    artist: 'Sonu Nigam (Pardes Highway Cruising)',
    famousLyric: '“Yeh dil deewana, deewana hai yeh dil!”',
    tag: 'Night Drive'
  },
  {
    id: 'xKb6lP3JxrA',
    title: 'Pardesi Pardesi',
    artist: 'Udit Narayan & Alka Yagnik',
    famousLyric: '“Pardesi pardesi jaana nahi, mujhe chhod ke!”',
    tag: 'All-Time Classic'
  }
];

export const AddaJukebox: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [statusText, setStatusText] = useState('Press play, driver saab');

  const playerRef = useRef<any>(null);
  const timerRef = useRef<number | null>(null);

  const currentSong = CHANDIGARH_SONGS[currentIdx];

  // Load YouTube Iframe API script once
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
      playerRef.current = new window.YT.Player('yt-player-embed', {
        videoId: CHANDIGARH_SONGS[0].id,
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
            setStatusText(CHANDIGARH_SONGS[0].title);
          },
          onError: (e: any) => {
            console.warn('Track blocked or unavailable, skipping to next:', e);
            setStatusText('Skipping blocked track…');
            setTimeout(() => {
              goToTrack((currentIdx + 1) % CHANDIGARH_SONGS.length);
            }, 1000);
          },
          onStateChange: (e: any) => {
            const state = e.data;
            const playing = state === window.YT.PlayerState.PLAYING;
            setIsPlaying(playing);

            if (playing) {
              startProgressTimer();
              if (playerRef.current) {
                setDuration(playerRef.current.getDuration() || 215);
              }
            } else {
              if (timerRef.current) clearInterval(timerRef.current);
            }

            // Auto-advance to next song when finished
            if (state === window.YT.PlayerState.ENDED) {
              goToTrack((currentIdx + 1) % CHANDIGARH_SONGS.length);
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
    const nextIndex = ((idx % CHANDIGARH_SONGS.length) + CHANDIGARH_SONGS.length) % CHANDIGARH_SONGS.length;
    setCurrentIdx(nextIndex);
    setCurrentTime(0);

    const song = CHANDIGARH_SONGS[nextIndex];
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
      playerRef.current.loadVideoById(currentSong.id);
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
      
      {/* Outer Retro Number Plate Container (100% Identical to truckplaylist.wtf) */}
      <div className="bg-[#1e7a46] border-[6px] border-[#f2790f] rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-[0_18px_40px_rgba(0,0,0,0.6)] relative">
        
        {/* Blinking indicator lights */}
        <div className={`hidden sm:block absolute -left-4 top-1/2 -translate-y-1/2 w-4 h-6 rounded-md border-2 border-black/40 ${isPlaying ? 'bg-[#ffc300] shadow-[0_0_12px_#ffc300] animate-pulse' : 'bg-[#6b4a00]'}`} />
        <div className={`hidden sm:block absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-6 rounded-md border-2 border-black/40 ${isPlaying ? 'bg-[#ffc300] shadow-[0_0_12px_#ffc300] animate-pulse' : 'bg-[#6b4a00]'}`} />

        {/* Top Header Plate (HORN OK PLEASE / CHANDIGARH OK ADDA in Yatra One font) */}
        <div className="flex items-center justify-between px-2 mb-2">
          <div className="text-center flex-1">
            <span className="font-yatra text-[#fff3dc] text-sm sm:text-lg tracking-[0.2em] uppercase drop-shadow-[2px_2px_0_rgba(0,0,0,0.4)]">
              CHANDIGARH <span className="text-[#ffc300]">OK</span> ADDA
            </span>
          </div>

          <button
            onClick={() => setShowPlaylist(!showPlaylist)}
            className="flex items-center gap-1 text-[10px] font-bold bg-[#14213d] hover:bg-[#1a2d54] text-[#ffc300] border border-[#f2790f]/60 px-2.5 py-1 rounded-full transition-colors flex-shrink-0"
          >
            <ListMusic className="w-3.5 h-3.5" />
            <span>{showPlaylist ? 'Hide' : `Tracklist (${CHANDIGARH_SONGS.length})`}</span>
          </button>
        </div>

        {/* Playlist Selector Dropdown */}
        {showPlaylist && (
          <div className="mb-3 bg-[#0d1627] border border-[#f2790f]/50 rounded-xl p-2 max-h-52 overflow-y-auto space-y-1 text-left animate-fade-in shadow-xl">
            <span className="text-[10px] font-bold text-[#ffc300] uppercase tracking-wider px-2 block mb-1">
              Select A Bollywood / Chandigarh Hit:
            </span>
            {CHANDIGARH_SONGS.map((song, idx) => (
              <button
                key={song.id}
                onClick={() => {
                  goToTrack(idx);
                  setShowPlaylist(false);
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                  currentIdx === idx
                    ? 'bg-[#ffc300] text-stone-950 font-bold'
                    : 'text-stone-200 hover:bg-[#1e2d4a]'
                }`}
              >
                <div className="truncate mr-2">
                  <span className="block truncate font-semibold">{song.title}</span>
                  <span className={`text-[10px] block truncate ${currentIdx === idx ? 'text-stone-900' : 'text-stone-400'}`}>
                    {song.artist}
                  </span>
                </div>
                <span className="text-[9px] uppercase px-1.5 py-0.5 rounded font-mono bg-black/40 text-stone-300">
                  {song.tag}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Inner Console */}
        <div className="bg-[#14213d] rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-[#f2790f]/30 flex flex-col gap-2.5 shadow-inner">
          
          {/* Main Track Row: Tiny 64x64 Screen + Meta + Play Controls (Pure truckplaylist.wtf layout) */}
          <div className="flex items-center gap-3">
            
            {/* 64x64 YouTube Screen Box (Acting as moving Album Art just like truckplaylist.wtf) */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-black flex-shrink-0 border-2 border-[#f2790f] shadow-[0_0_0_2px_#fff3dc,0_3px_8px_rgba(0,0,0,0.5)]">
              <div id="yt-player-embed" className="w-full h-full object-cover" />
              {!isPlayerReady && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <Disc3 className="w-5 h-5 text-[#ffc300] animate-spin" />
                </div>
              )}
            </div>

            {/* Song Title & Artist */}
            <div className="flex-1 min-w-0 text-left">
              <h4 className="text-sm sm:text-base font-bold text-[#fff3dc] truncate leading-tight">
                {currentSong.title}
              </h4>
              <p className="text-xs text-stone-300 truncate mt-0.5">
                {currentSong.artist}
              </p>
            </div>

            {/* Controls (Prev, Big Yellow Play/Pause, Next) */}
            <div className="flex items-center gap-2 flex-shrink-0">
              
              {/* Prev */}
              <button
                onClick={() => goToTrack(currentIdx - 1)}
                className="w-9 h-9 rounded-full bg-[#fff3dc] text-stone-900 hover:bg-white flex items-center justify-center shadow-[0_3px_0_rgba(0,0,0,0.4)] active:translate-y-0.5 transition-all"
                title="Previous track"
              >
                <SkipBack className="w-4 h-4 fill-current" />
              </button>

              {/* Big Yellow Play/Pause (54px on truckplaylist.wtf) */}
              <button
                onClick={togglePlay}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#ffc300] hover:bg-[#ffb700] text-stone-950 flex items-center justify-center font-black shadow-[0_4px_0_rgba(0,0,0,0.5)] active:translate-y-0.5 transition-all"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-current text-stone-950" />
                ) : (
                  <Play className="w-6 h-6 fill-current text-stone-950 ml-0.5" />
                )}
              </button>

              {/* Next */}
              <button
                onClick={() => goToTrack(currentIdx + 1)}
                className="w-9 h-9 rounded-full bg-[#fff3dc] text-stone-900 hover:bg-white flex items-center justify-center shadow-[0_3px_0_rgba(0,0,0,0.4)] active:translate-y-0.5 transition-all"
                title="Next track"
              >
                <SkipForward className="w-4 h-4 fill-current" />
              </button>

            </div>

          </div>

          {/* Time Scrubber (0:00 ━━━━●───── 4:12) */}
          <div className="space-y-1">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-black/40 accent-[#ffc300] rounded-lg cursor-pointer"
            />
            <div className="flex justify-between items-center text-[10px] text-stone-400 font-mono">
              <span>{formatTime(currentTime)}</span>
              <span className="text-[11px] text-[#ffc300] font-sans italic truncate px-2">
                {currentSong.famousLyric}
              </span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Bottom Bar: Quick Pills & Mute */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-white/10 text-xs">
            
            {/* Quick Song Selector Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {CHANDIGARH_SONGS.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => goToTrack(idx)}
                  className={`px-2.5 py-1 rounded-md text-[10px] font-bold whitespace-nowrap transition-all ${
                    currentIdx === idx
                      ? 'bg-[#ffc300] text-stone-950 shadow-md font-black'
                      : 'bg-black/30 text-stone-300 hover:bg-black/50'
                  }`}
                >
                  {s.title.split(' (')[0]}
                </button>
              ))}
            </div>

            {/* Mute toggle */}
            <div className="flex items-center gap-2 ml-auto">
              <button 
                onClick={toggleMute} 
                className="text-stone-300 hover:text-[#ffc300] p-1 transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <a
                href={`https://music.youtube.com/search?q=${encodeURIComponent(currentSong.title + ' ' + currentSong.artist)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold text-[#ffc300] hover:text-white flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded border border-[#f2790f]/40"
                title="YT Music"
              >
                <span>YT Music</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* Hanging Mudflaps (Exact font and style of truckplaylist.wtf) */}
      <div className="flex justify-between px-6 sm:px-12 -mt-1 pointer-events-none">
        <div className="bg-[#111] border border-stone-800 text-[#fff3dc] font-yatra text-[11px] sm:text-xs px-3 py-1.5 rounded-b-lg shadow-xl tracking-wider">
          बुरी नज़र
        </div>
        <div className="bg-[#111] border border-stone-800 text-[#fff3dc] font-yatra text-[11px] sm:text-xs px-3 py-1.5 rounded-b-lg shadow-xl tracking-wider text-center">
          वाले तेरा मुँह काला 🌸
        </div>
      </div>

    </div>
  );
};
