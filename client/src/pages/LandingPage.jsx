import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import MovingCarousel from "../components/MovingCarousel";
import ExperienceTimeline from "../components/ExperienceTimeline";

function LandingPage() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sectionIds = ["home", "stack", "experience", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-base-100 text-base-content min-h-screen transition-colors duration-500 selection:bg-spider-yellow selection:text-black relative">
      <Navbar activeSection={activeSection} />

      <main className="w-full relative z-10">
        {/* HERO SECTION */}
        <section
          id="home"
          className="min-h-[95vh] flex items-center relative group border-1"
        >
          <div className="max-w-6xl mx-auto px-6 w-full">
            <HeroSection />
          </div>
          {/* Chromatic Bottom Fade */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-base-100 via-base-100/80 to-transparent z-20" />
        </section>

        {/* TECH STACK SECTION */}
        <section id="stack" className="w-full min-h-screen flex items-center border-1">
          <MovingCarousel />
        </section>

        <section id="experience" className="flex flex-col pt-30 pb-10 overflow-x-hidden border-1 overflow-hidden">
          <div className="self-center">
            <h3 className="font-comic-title text-3xl md:text-4xl uppercase tracking-tighter text-white mb-4 px-8 relative inline-block">
              <span className="relative z-10">Work Experiences</span>
              <span className="absolute top-0.5 left-[34px] text-[#FF00FF] -z-10 opacity-50 italic">
                Work Experiences
              </span>
              <span className="absolute -top-0.5 left-[30px] text-[#00FFFF] -z-20 opacity-50">
                Work Experiences
              </span>
            </h3>
          </div>

          <ExperienceTimeline />
        </section>

        {/* CONTENT SECTIONS */}
        <div className="max-w-6xl mx-auto px-6 space-y-32 pb-32">
          <section id="projects" className="min-h-screen pt-24">
            <h2 className="text-5xl font-comic-title text-glitch-hover uppercase mb-12">
              Featured Projects
            </h2>
            {/* Projects Grid Goes Here */}
          </section>

          <section
            id="contact"
            className="min-h-screen flex items-center justify-center"
          >
            <div className="w-full max-w-2xl p-8 border-4 border-black shadow-[8px_8px_0px_black] bg-base-200">
              <h2 className="text-4xl font-comic-title uppercase mb-6">
                Send a Transmission
              </h2>
              {/* Your Contact Form */}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
