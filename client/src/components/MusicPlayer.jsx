import React, { useState, useRef, useEffect } from "react";
import { HiPlay, HiPause, HiChevronRight, HiChevronLeft } from "react-icons/hi";

const TRACKS = [
  { id: 1, title: "Protect Ya Neck", artist: "Wu-Tang Clan", src: "/audio/Wu-Tang-Clan-Protect-Ya-Neck.mp3" },
  { id: 2, title: "C.R.E.A.M.", artist: "Wu-Tang Clan", src: "/audio/Wu-Tang-Clan-C.R.E.A.M..mp3" },
  { id: 3, title: "Method Man", artist: "Wu-Tang Clan", src: "/audio/Wu-Tang-Clan-Method-Man.mp3" },
];

const MusicPlayer = ({ isMuted, isPlaying, setIsPlaying }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const currentTrack = TRACKS[currentTrackIndex];

  // Logic to calculate progress bar width
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const { currentTime, duration } = audioRef.current;
      if (duration) setProgress((currentTime / duration) * 100);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const nextTrack = () => {
    setProgress(0);
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  const prevTrack = () => {
    setProgress(0);
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  // Keep Audio Sync'd with Track Changes
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentTrackIndex]);

  // Keep Audio Sync'd with Mute Toggle
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted;
  }, [isMuted]);

  return (
    <div className="fixed bottom-6 right-6 z-100 group">
      <div className="bg-black border-2 border-spider-magenta p-4 rounded-lg shadow-[8px_8px_0px_#ff00ff] w-64 transition-transform hover:-translate-y-2 relative overflow-hidden bg-spider-dots text-white/10">
        
        <div className="mb-3 relative z-10">
          {isMuted && (
            <span className="absolute -top-2 -right-2 bg-spider-magenta text-white text-[8px] px-1 animate-pulse">MUTED</span>
          )}
          <p className="text-[10px] text-spider-cyan font-mono uppercase tracking-widest mb-1">
            System: Active / Earth-{currentTrack.id}16
          </p>
          <h4 className="text-white font-comic-title text-lg truncate uppercase">{currentTrack.title}</h4>
          <p className="text-spider-yellow font-comic-hand text-xs">{currentTrack.artist}</p>
        </div>

        <audio 
          ref={audioRef} 
          src={currentTrack.src} 
          onTimeUpdate={handleTimeUpdate}
          onEnded={nextTrack} 
        />

        <div className="flex items-center justify-between gap-2 border-t border-white/20 pt-3 relative z-10">
          <button onClick={prevTrack} className="text-white hover:text-spider-cyan transition-all active:scale-90"><HiChevronLeft size={24} /></button>
          
          <button onClick={togglePlay} className="bg-spider-magenta p-2 rounded-full text-white shadow-[0_0_10px_#ff00ff] hover:scale-110 active:scale-95 transition-all">
            {isPlaying ? <HiPause size={28} /> : <HiPlay size={28} />}
          </button>

          <button onClick={nextTrack} className="text-white hover:text-spider-cyan transition-all active:scale-90"><HiChevronRight size={24} /></button>
        </div>

        <div className="w-full h-1 bg-white/10 mt-4 overflow-hidden rounded-full relative z-10">
          <div 
            className="h-full bg-spider-cyan transition-all duration-100 ease-linear shadow-[0_0_8px_#00ffff]" 
            style={{ width: `${progress}%` }} 
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;