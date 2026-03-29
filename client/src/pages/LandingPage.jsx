import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/pages-section/HeroSection";
import TechStackSection from "../components/pages-section/TechStackSection";
import ExperienceTimeline from "../components/pages-section/WorkExperienceSection";
import ProjectCard from "../components/cards/ProjectCard";
import ContactSection from "../components/pages-section/ContactSection";
import MusicPlayer from "../components/MusicPlayer";

// Assets
import imgEko from "../assets/ekomers-preview.png";
import imgIpaskil from '../assets/ipaskil-preview.png';

const SECTION_CLASS = "flex flex-col min-h-screen items-center justify-center relative overflow-hidden";

function LandingPage() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // 1. Improved Scroll Observer Logic
  useEffect(() => {
    const sectionIds = ["home", "stack", "experience", "projects", "contact"];
    
    const observerOptions = {
      // Adjusted margins to trigger more naturally as the section hits the middle
      rootMargin: "-30% 0px -30% 0px", 
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // 2. Audio "Unlock" Logic
  // Browser policy requires user interaction before audio plays.
  useEffect(() => {
    const unlockAudio = () => {
      setIsPlaying(true); // Setting this triggers the play() in your MusicPlayer component
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };

    window.addEventListener("click", unlockAudio);
    window.addEventListener("keydown", unlockAudio);
    
    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, []);

  return (
    <div className="bg-base-100 text-base-content min-h-screen transition-colors duration-500 selection:bg-spider-yellow selection:text-black relative">
      <Navbar
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Background Overlays - Fixed and Z-indexed */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="brick-overlay-halftone opacity-30" />
        <div className="brick-overlay-grid opacity-20" />
        <div className="brick-overlay-glitch opacity-10" />
      </div>

      <main className="relative z-10 w-full flex flex-col">
        
        <section id="home" className={`${SECTION_CLASS} scroll-mt-20`}>
          <HeroSection />
        </section>

        <section id="stack" className={`${SECTION_CLASS} py-20`}>
          <TechStackSection />
        </section>

        <section id="experience" className={`${SECTION_CLASS}`}>
          <ExperienceTimeline />
        </section>

        <section id="projects" className={`${SECTION_CLASS} py-24 px-6`}>
          <SectionTitle text="Project Evidence" />
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-stretch">
            <ProjectCard
              to="/projects/ekomers"
              title="EKOMERS"
              description="A secure MERN-stack e-commerce architecture."
              stack={["React", "MongoDB", "Node.js"]}
              image={imgEko}
            />
            <ProjectCard
              to="/projects/ipaskil"
              title="iPaskil"
              description="Digital bulletin board for art sharing."
              stack={["React", "Express", "Node.js"]}
              image={imgIpaskil}
            />
            <ProjectCard
              to="/projects/ipaskil"
              title="Espyreal"
              description="Currency Identifier for visually impaired."
              stack={["React Native", "TensorFlow"]}
              image={imgIpaskil}
            />
          </div>
        </section>

        <section id="contact" className={`${SECTION_CLASS} px-6 py-20`}>
          <ContactSection />
        </section>
      </main>

      <MusicPlayer
        isMuted={isMuted}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
}

export const SectionTitle = ({ text, className = "" }) => (
  // Use w-full to ensure the container spans the section
  // Use text-center to align the inline-block h3
  <div className={`w-full text-center my-10 ${className}`}>
    <h3 className="font-comic-title text-4xl md:text-5xl uppercase tracking-tighter text-white relative inline-block">
      <span className="relative z-10">{text}</span>
      
      {/* Glitch Layers */}
      <span className="absolute top-1 left-1 text-spider-magenta -z-10 opacity-70 italic whitespace-nowrap" aria-hidden="true">
        {text}
      </span>
      <span className="absolute -top-1 -left-1 text-spider-cyan -z-20 opacity-70 whitespace-nowrap" aria-hidden="true">
        {text}
      </span>
    </h3>
  </div>
);

export default LandingPage;