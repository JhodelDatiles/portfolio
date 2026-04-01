import React, { useRef } from "react";
import { useInView } from "framer-motion";
import CalculatingText from "../CalculatingText";

const ExperienceCard = ({ 
  title, 
  subtitle, 
  description, 
  highlights = [] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className="relative w-full group transition-all duration-500">
      {/* Glitch backdrop glow */}
      <div
        className={`absolute -inset-1 bg-gradient-to-r from-spider-magenta via-spider-cyan to-spider-magenta opacity-20 blur-xl transition-opacity duration-1000 ${
          isInView ? "opacity-40 animate-pulse" : "opacity-0"
        }`}
      />

      {/* Top error tab */}
      <div className="absolute -top-7 left-4 flex items-center">
        <div className="bg-spider-magenta text-white px-4 py-1 skew-x-[-15deg] border-2 border-black shadow-[4px_4px_0px_#000000]">
          <span className="font-comic-title text-[10px] uppercase tracking-widest block skew-x-[15deg]">
            {isInView ? <CalculatingText text="QA TESTER" delay={100} /> : "LOADING..."}
          </span>
        </div>
      </div>

      {/* Main card body */}
      <div
        className={`relative h-full bg-black/90 border-[3px] transition-all duration-700 p-8 overflow-hidden
          ${
            isInView
              ? "border-white shadow-[12px_12px_0px_var(--color-spider-cyan)] translate-x-[-4px] translate-y-[-4px]"
              : "border-white/20"
          }`}
      >
        {/* Halftone overlay */}
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay bg-[radial-gradient(var(--color-spider-magenta)_1px,transparent_0)] bg-[size:6px_6px]" />

        {/* Animated scan line */}
        <div className="absolute inset-x-0 h-[1px] bg-spider-cyan/40 top-0 animate-[glitch-scan_4s_infinite] pointer-events-none" />

        {/* Header */}
        <div className="relative mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-spider-cyan font-black text-xl italic tracking-tighter">/ /</span>
            <h3 className="font-comic-title text-2xl xs:text-5xl uppercase text-white leading-none tracking-tighter group-hover:text-spider-magenta transition-colors duration-300">
              {isInView ? (
                <CalculatingText text={title} delay={300} revealPerTick={1.5} />
              ) : ""}
            </h3>
          </div>

          <div className="mt-2 flex items-center gap-4">
            <div className="h-[2px] flex-1 bg-gradient-to-r from-spider-cyan to-transparent opacity-50" />
            <p className="font-mono text-[8px] xs:text-[11px] text-spider-cyan uppercase tracking-[0.4em] font-bold">
              {isInView ? <CalculatingText text={subtitle} delay={600} /> : ""}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8 relative z-10">
          <p className="font-comic-hand  text-[12px] xs:text-[18px] leading-tight text-white/90 italic border-l-2 border-spider-magenta pl-4 py-1">
            {isInView ? (
              <CalculatingText
                text={description}
                delay={900}
                speed={10}
                revealPerTick={1.5}
              />
            ) : ""}
          </p>
        </div>

        {/* Highlight tags */}
        <div className="flex flex-wrap gap-3 invisible">
          {highlights.map((skill, i) => (
            <div
              key={i}
              className="px-3 py-1 bg-white text-black font-comic-title text-[8px] xs:text-[12px] uppercase border-2 border-black shadow-[3px_3px_0px_var(--color-spider-magenta)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              {isInView ? (
                <CalculatingText text={skill} delay={1300 + i * 100} />
              ) : ""}
            </div>
          ))}
        </div>

        {/* Decorative large number */}
        <div className="absolute -bottom-6 -right-4 opacity-10 group-hover:opacity-30 transition-all duration-500 rotate-12 group-hover:rotate-0">
          <span className="font-black text-[120px] text-white italic tracking-tighter select-none">
            {highlights.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;