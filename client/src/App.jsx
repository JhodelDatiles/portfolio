import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import ProjectDocumentation from "./components/pages-section/ProjectsSection.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted]     = useState(false);

  // Autoplay unlock — fires once on first user interaction anywhere
  useEffect(() => {
    const unlock = () => {
      setIsPlaying(true);
      window.removeEventListener("click",      unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("keydown",    unlock);
    };

    window.addEventListener("click",      unlock);
    window.addEventListener("touchstart", unlock);
    window.addEventListener("keydown",    unlock);

    return () => {
      window.removeEventListener("click",      unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("keydown",    unlock);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              isMuted={isMuted}
              setIsMuted={setIsMuted}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          }
        />
        <Route path="/projects/:projectId" element={<ProjectDocumentation />} />
      </Routes>

      {/* MusicPlayer is outside Routes so it persists across page navigations */}
      <MusicPlayer
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isMuted={isMuted}
      />
    </div>
  );
}

export default App;