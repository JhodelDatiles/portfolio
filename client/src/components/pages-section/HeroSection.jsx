import React from "react";
import { Download } from "lucide-react";
import HeroCard from "../cards/HeroCard";

const TITLE_BLOCK_TEXT = "relative group font-comic-title uppercase tracking-tighter select-none pointer-events-none";

const HeroSection = () => (
  <section className="
    /* STRUCTURE: Mobile first (stacked) */
    flex flex-col items-center justify-center w-full h-auto gap-10 p-4 py-28 

    /* DESKTOP: >= 360px (Custom XS Breakpoint) */
    xs:flex-row xs:max-w-[1000px] xs:mx-auto xs:gap-12 xs:p-0
    
    /* ANIMATION & DEBUG */
    animate-in fade-in duration-1000"
  >
    <div className="flex-1 space-y-8 z-10 w-full">
      {/* Title block with Glitch Effects */}
      <div className={TITLE_BLOCK_TEXT}>
        <h1 className="text-6xl text-white text-glitch-hover leading-[0.9] relative z-10 transition-transform duration-300 hover:scale-105 pointer-events-auto">
          Fullstack Dev <br />
          <span className="text-spider-cyan italic">& </span>QA Tester
        </h1>

        {/* Ghost Layers */}
        <span aria-hidden="true" className="absolute top-0.5 -left-0.5 text-6xl text-spider-magenta opacity-50 -z-10 italic">
          Fullstack Dev <br />& QA Tester
        </span>
        <span aria-hidden="true" className="absolute -top-0.5 left-0.5 text-6xl text-spider-cyan opacity-50 -z-20">
          Fullstack Dev <br />& QA Tester
        </span>
      </div>

      {/* Description box */}
      <div className="relative p-6 bg-white border-4 border-black w-full shadow-[8px_8px_0px_var(--color-spider-magenta)] transition-all hover:-translate-y-1 hover:shadow-[12px_12px_0px_var(--color-spider-cyan)]">
        <div className="absolute -top-3 -left-3 w-8 h-8 bg-spider-yellow border-2 border-black rotate-12" />
        <p className="text-black font-comic-hand leading-tight text-lg">
          Aspiring developer with a strong foundation in programming and a passion for building responsive and functional{" "}
          <span className="bg-spider-cyan px-1">web-apps and applications</span>
          . I enjoy solving problems, learning new technologies, and continuously improving my skills.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap gap-4 xs:gap-8 justify-center xs:justify-start">
        <a href="#contact" className="relative px-10 py-2 inline-block bg-spider-magenta text-white font-comic-title text-2xl uppercase border-4 border-black shadow-[6px_6px_0px_0px_#03071e] origin-top-left transition-transform duration-300 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] hover:rotate-12 hover:shadow-[8px_12px_0px_0px_#03071e] active:rotate-0">
          Hire Me
        </a>

        <a href="/client/public/Jhodel_Datiles_Resume.pdf" download className="relative group px-8 py-2 bg-spider-red text-white font-comic-title text-2xl uppercase [clip-path:polygon(0%_0%,85%_0%,100%_100%,0%_100%)] shadow-[6px_6px_0px_#000000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-3 hover:-rotate-3">
          <Download className="w-7 h-7 stroke-[4px]" />
          <span>Download Resume</span>
          <div className="absolute inset-0 bg-spider-cyan -z-10 translate-x-2 translate-y-1 opacity-0 group-hover:opacity-40 transition-opacity [clip-path:polygon(0%_0%,85%_0%,100%_100%,0%_100%)]" />
        </a>
      </div>
    </div>

    {/* Hero Card Container */}
    <div className="flex-1 flex justify-center items-center transition-all duration-500 hover:rotate-0 rotate-[-2deg] hover:scale-105">
      <HeroCard />
    </div>
  </section>
);

export default HeroSection;