import React, { useState, useRef, useEffect } from "react";
import { HiPlay, HiPause, HiChevronRight, HiChevronLeft, HiX } from "react-icons/hi";

const TRACKS = [
  { id: 1, title: "Protect Ya Neck", artist: "Wu-Tang Clan", src: "/audio/Wu-Tang-Clan-Protect-Ya-Neck.mp3",  color: "#ff00ff" },
  { id: 2, title: "C.R.E.A.M.",      artist: "Wu-Tang Clan", src: "/audio/Wu-Tang-Clan-C.R.E.A.M..mp3",      color: "#00ffff" },
  { id: 3, title: "Method Man",      artist: "Wu-Tang Clan", src: "/audio/Wu-Tang-Clan-Method-Man.mp3",      color: "#facc15" },
];

const MusicPlayer = ({ isMuted, isPlaying, setIsPlaying }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress]                   = useState(0);
  const [isMinimized, setIsMinimized]             = useState(true);

  const audioRef    = useRef(null);
  const currentTrack = TRACKS[currentTrackIndex];

  // Sync play/pause + track changes
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      // .play() returns a Promise — must catch rejections or React will warn
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  // Sync mute toggle
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted;
  }, [isMuted]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const { currentTime, duration } = audioRef.current;
    if (duration) setProgress((currentTime / duration) * 100);
  };

  const togglePlay = (e) => {
    e?.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const nextTrack = (e) => {
    e?.stopPropagation();
    setProgress(0);
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  const prevTrack = (e) => {
    e?.stopPropagation();
    setProgress(0);
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
        preload="auto"
      />

      {isMinimized ? (
        /* ── MINIMIZED VINYL ── */
        <button
          onClick={() => setIsMinimized(false)}
          className="relative flex items-center justify-center w-16 h-16 transition-transform hover:scale-110 active:scale-95"
        >
          <div
            className="absolute inset-0 rounded-full blur-md opacity-40 animate-pulse"
            style={{ backgroundColor: currentTrack.color }}
          />
          <div
            className={`w-full h-full rounded-full border-4 border-black bg-neutral-900 flex items-center justify-center relative overflow-hidden ${isPlaying ? "animate-spin-slow" : ""}`}
            style={{ boxShadow: `0 0 15px ${currentTrack.color}66` }}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{ backgroundImage: "repeating-radial-gradient(circle, #fff, #fff 1px, transparent 1px, transparent 4px)" }}
            />
            <div
              className="w-6 h-6 rounded-full border-2 border-black z-10 transition-colors duration-500"
              style={{ backgroundColor: currentTrack.color }}
            />
          </div>
          {/* Mini play/pause indicator */}
          <div className="absolute -bottom-1 -right-1 bg-black border border-white/20 rounded-full p-1 text-white z-20">
            {isPlaying ? <HiPause size={12} /> : <HiPlay size={12} />}
          </div>
        </button>
      ) : (
        /* ── EXPANDED PLAYER ── */
        <div className="bg-black border-2 border-white/20 p-4 rounded-lg shadow-[8px_8px_0px_#000] w-64 relative overflow-hidden animate-in fade-in zoom-in duration-300">
          {/* Color glow bg */}
          <div
            className="absolute top-0 right-0 w-32 h-32 blur-[50px] -z-10 opacity-20 transition-colors duration-700"
            style={{ backgroundColor: currentTrack.color }}
          />

          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="z-10">
              <p
                className="text-[10px] font-mono uppercase tracking-widest mb-1"
                style={{ color: currentTrack.color }}
              >
                // Incoming_Signal
              </p>
              <h4 className="text-white font-bold text-base truncate uppercase w-40 tracking-tighter">
                {currentTrack.title}
              </h4>
              <p className="text-white/60 text-[10px] font-medium">{currentTrack.artist}</p>
            </div>
            <button
              onClick={() => setIsMinimized(true)}
              className="text-white/40 hover:text-white transition-colors"
            >
              <HiX size={20} />
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-4 py-2 border-t border-white/10 mt-2 relative z-10">
            <button onClick={prevTrack} className="text-white/60 hover:text-white transition-colors">
              <HiChevronLeft size={28} />
            </button>
            <button
              onClick={togglePlay}
              className="p-3 rounded-full text-black shadow-lg hover:scale-105 active:scale-95 transition-all"
              style={{ backgroundColor: currentTrack.color }}
            >
              {isPlaying ? <HiPause size={24} /> : <HiPlay size={24} />}
            </button>
            <button onClick={nextTrack} className="text-white/60 hover:text-white transition-colors">
              <HiChevronRight size={28} />
            </button>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1 bg-white/10 mt-4 overflow-hidden rounded-full relative z-10">
            <div
              className="h-full transition-all duration-300 ease-out rounded-full"
              style={{
                width: `${progress}%`,
                backgroundColor: currentTrack.color,
                boxShadow: `0 0 10px ${currentTrack.color}`,
              }}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
      `}</style>
    </div>
  );
};

export default MusicPlayer;