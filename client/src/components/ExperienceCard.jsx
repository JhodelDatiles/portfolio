import React from "react";

const ExperienceCard = ({ 
  title, 
  subtitle, 
  description, 
  highlights = [], 
  bgColor = "bg-white", 
  rotate = "rotate-0", 
  zIndex = "z-10",
  offsetColor = "bg-spider-magenta",
  shadowX = "8px", 
  shadowY = "8px"
}) => {
  return (
    // Changed from <Link> to <div>. Removed cursor-pointer if you don't want it to look clickable.
    <div 
      className={`relative ${zIndex} group preserve-3d transition-transform hover:-translate-y-2`}
      style={{
        transform: rotate !== "rotate-0" ? `${rotate}` : "none",
        transition: "transform 0.2s ease-out",
      }}
    >
      {/* The Offset Shadow */}
      <div 
        className={`absolute ${offsetColor} -z-10 transition-all duration-300 opacity-90 group-hover:translate-x-[4px] group-hover:translate-y-[4px]`}
        style={{
          inset: "0",
          transform: `translate(${shadowX}, ${shadowY})`,
        }}
      />
      
      {/* The Main Panel */}
      <div className={`relative w-full h-full border-4 border-black p-4 md:p-6 ${bgColor} text-black`}>
        {/* Subtle Halftone Pattern Overlay */}
        <div className="absolute inset-0 bg-spider-dots opacity-[0.03] text-black pointer-events-none" />

        {/* --- Header Section (Title/Subtitle) --- */}
        <div className="mb-4 relative z-10">
          <h3 className="font-comic-title text-2xl md:text-3xl uppercase tracking-wide">
            {title}
          </h3>
          <p className="font-mono text-xs text-black/70 italic -mt-1">
            {subtitle}
          </p>
        </div>

        {/* --- Description Body --- */}
        <div className="mb-4 relative z-10">
          <p className="font-sans font-medium text-sm md:text-base leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </div>

        {/* --- Highlights --- */}
        {highlights.length > 0 && (
          <div className="border-t-2 border-dashed border-black/30 pt-3 flex flex-wrap gap-2 relative z-10">
            {highlights.map((skill, index) => (
              <span key={index} className="text-[10px] font-mono bg-black text-white px-2 py-0.5 uppercase">
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceCard;