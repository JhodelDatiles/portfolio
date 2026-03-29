import React, { useState, useRef } from "react";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi"; // Using react-icons for a pro look

function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.error("Autoplay blocked or file missing:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center">
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef} 
        src="/audio/Wu-Tang-Clan-Protect-Ya-Neck.mp3" 
        autoPlay 
        loop 
      />

      {/* The Button */}
      <button 
        onClick={toggleMusic}
        className={`p-3 rounded-full transition-all duration-300 border-2 
          ${isPlaying ? 'bg-spider-magenta border-white' : 'bg-transparent border-spider-magenta text-spider-magenta'}
          hover:scale-110 active:scale-95 shadow-lg`}
        aria-label={isPlaying ? "Mute Music" : "Play Music"}
      >
        {isPlaying ? (
          <HiVolumeUp className="text-xl text-white animate-pulse" />
        ) : (
          <HiVolumeOff className="text-xl" />
        )}
      </button>
    </div>
  );
}

export default MusicToggle;