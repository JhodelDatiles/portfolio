import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ to, title, description, stack = [], image, offsetColor = "bg-spider-cyan" }) => {
  return (
    <Link to={to} className="relative group block h-full">
      {/* 1. The Offset Shadow */}
      <div className={`absolute inset-0 ${offsetColor} translate-x-3 translate-y-3 -z-10 transition-all duration-300 group-hover:translate-x-5 group-hover:translate-y-5 opacity-80`} />
      
      {/* 2. The Main Card Container */}
      <div className="h-full border-4 border-black bg-white flex flex-col overflow-hidden">
        
        {/* Project Image Area */}
        <div className="relative h-48 bg-slate-200 overflow-hidden border-b-4 border-black">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          ) : (
            <div className="w-full h-full bg-spider-dots opacity-20 flex items-center justify-center text-black font-black italic">
              NO_PREVIEW_AVAILABLE
            </div>
          )}
          {/* "NEW" Stamp */}
          <div className="absolute top-2 left-2 bg-spider-yellow border-2 border-black px-2 py-0.5 text-[10px] font-black uppercase rotate-[-5deg]">
            Issue #01
          </div>
        </div>

        {/* Project Details */}
        <div className="p-5 flex flex-col flex-grow text-black">
          <h3 className="font-comic-title text-3xl uppercase mb-2 group-hover:text-spider-magenta transition-colors">
            {title}
          </h3>
          <p className="font-sans text-sm leading-snug mb-4 flex-grow">
            {description}
          </p>

          {/* Stack & Tools Footer */}
          <div className="border-t-2 border-black pt-3 mt-auto">
            <p className="text-[10px] font-black uppercase mb-2 italic">Tech_Stack // Loaded</p>
            <div className="flex flex-wrap gap-1">
              {stack.map((tool, i) => (
                <span key={i} className="bg-black text-white text-[9px] px-2 py-0.5 font-mono">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;