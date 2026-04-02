import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/pages-section/HeroSection";
import TechStackSection from "../components/pages-section/TechStackSection";
import WorkExperienceSection from "../components/pages-section/WorkExperienceSection";
import ProjectCard from "../components/cards/ProjectCard";
import ContactSection from "../components/pages-section/ContactSection";
import Footer from "../components/pages-section/Footer";

// Assets
import imgEko from "../assets/ekomers-preview.png";
import imgIpaskil from "../assets/ipaskil-preview.png";
import imgNote from "../assets/note-webapp-preview.png";

const SECTION_CLASS =
  "flex flex-col min-h-screen items-center justify-center relative overflow-hidden";
const SECTION_SPACING_DIVIDER =
  "xs:scroll-mt-0 xs:py-20 py-12 -scroll-mt-5 px-5";

// isMuted + setIsMuted come from App — Navbar controls mute, MusicPlayer reacts
function LandingPage({ isMuted, setIsMuted, isPlaying, setIsPlaying }) {
  const [activeSection, setActiveSection] = useState("home");

  // Scroll observer — highlights active nav item
  useEffect(() => {
    const sectionIds = ["home", "stack", "experience", "projects", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -30% 0px", threshold: 0.1 },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-base-100 text-base-content min-h-screen transition-colors duration-500 selection:bg-spider-yellow selection:text-black relative">
      <Navbar
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Background overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="brick-overlay-halftone opacity-30" />
        <div className="brick-overlay-grid opacity-20" />
        <div className="brick-overlay-glitch opacity-10" />
      </div>

      <main className="relative z-10 w-full flex flex-col">
        {/* HERO SECTION */}
        <section
          id="home"
          className={`${SECTION_CLASS} ${SECTION_SPACING_DIVIDER}`}
        >
          <HeroSection />
        </section>
        {/* TECH STACK SECTION */}
        <section id="stack" className={`${SECTION_CLASS}`}>
          <TechStackSection />
        </section>
        {/* EXPERIENCE SECTION */}
        <section
          id="experience"
          className={`${SECTION_CLASS} ${SECTION_SPACING_DIVIDER}`}
        >
          <WorkExperienceSection />
        </section>
        {/* PROJECTS SECTION */}
        <section
          id="projects"
          className={`${SECTION_CLASS} ${SECTION_SPACING_DIVIDER}`}
        >
          <SectionTitle text="Project Evidence" />
          <div className="max-w-4xl mx-auto w-full grid xs:grid-cols-2 grid-col-1 items-stretch">
            <ProjectCard
              to="/projects/notewebapp"
              title="note webapp"
              description="Just a notepad."
              stack={["React", "MongoDB", "Node.js", "Express.js"]}
              image={imgNote}
              issue="01"
            />
            <ProjectCard
              to="/projects/ipaskil"
              title="iPaskil"
              description="Digital bulletin board for art sharing."
              stack={[
                "React",
                "MongoDB",
                "Node.js",
                "Express.js",
                "Cloudinary",
                "Axios",
                "JWT",
              ]}
              image={imgIpaskil}
              issue="02"
            />
            <ProjectCard
              to="/projects/ekomers"
              title="EKOMERS"
              description="An e-commerce webapp with PayMongo payments, admin dashboard, and AI chat support."
              stack={[
                "React",
                "MongoDB",
                "Node.js",
                "Express.js",
                "PayMongo",
                "Cloudinary",
                "Brevo",
                "Leaflet",
                "JWT",
                "Axios",
                "Recharts",
                "DaisyUI",
                "TailwindCSS",
              ]}
              image={imgEko}
              issue="03"
            />
            <ProjectCard
              to="/projects/espyreal"
              title="Espyreal"
              description="Mobile app for identifying commonly used currency in the Philippines"
              stack={["React Native", "TensorFlow"]}
              issue="04"
            />
          </div>
        </section>
        {/* CONTACT SECTION */}
        <section
          id="contact"
          className={`${SECTION_CLASS} ${SECTION_SPACING_DIVIDER}`}
        >
          <ContactSection />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export const SectionTitle = ({ text, className = "" }) => (
  <div className={`w-full text-center my-10 ${className}`}>
    <h3 className="font-comic-title text-4xl md:text-5xl uppercase tracking-tighter text-white relative inline-block">
      <span className="relative z-10">{text}</span>
      <span
        className="absolute top-1 left-1 text-spider-magenta -z-10 opacity-70 italic whitespace-nowrap"
        aria-hidden="true"
      >
        {text}
      </span>
      <span
        className="absolute -top-1 -left-1 text-spider-cyan -z-20 opacity-70 whitespace-nowrap"
        aria-hidden="true"
      >
        {text}
      </span>
    </h3>
  </div>
);

export default LandingPage;
