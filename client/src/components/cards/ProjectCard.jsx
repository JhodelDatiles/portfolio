import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ProjectCard = ({
  to,
  title,
  description,
  stack = [],
  image,
  issue = "01",
  stampText = "VIEW PROJECT?",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={to}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group block w-full max-w-sm mx-auto transition-all duration-500 hover:-rotate-0 -rotate-2 hover:scale-[1.03] z-10 hover:z-20"
    >
      {/* Tape decor */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-10 bg-white/20 backdrop-blur-md border border-black/5 z-30 rotate-1 group-hover:opacity-0 transition-opacity duration-300" />

      {/* Polaroid body */}
      <div className="relative bg-[#fdfaf1] p-4 pb-12 shadow-[15px_15px_0px_rgba(0,0,0,0.1)] border-2 border-black/5 flex flex-col overflow-hidden">

        {/* Stamp animation */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ scale: 3, opacity: 0, rotate: 0 }}
              animate={{ scale: 1, opacity: 0.8, rotate: -15 }}
              exit={{ opacity: 0 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none border-8 border-green-600 px-6 py-2 rounded-sm w-[270px]"
            >
              <span className="font-comic-title text-5xl text-green-600 uppercase tracking-tighter mix-blend-multiply italic">
                {stampText}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image */}
        <div className="relative aspect-square bg-black overflow-hidden border-2 border-black mb-6">
          {image ? (
            <img
              src={image}
              alt={title}
              className={`w-full h-full object-cover transition-all duration-700 ${
                isHovered ? "grayscale-0 scale-110" : "grayscale"
              }`}
            />
          ) : (
            <div className="w-full h-full bg-spider-dots opacity-20 flex items-center justify-center text-white italic text-[10px] text-center p-4">
              [ NO_VISUAL_EVIDENCE_LOGGED ]
            </div>
          )}

          <div className="absolute bottom-2 right-2 bg-spider-yellow border-2 border-black px-2 py-0.5 text-[10px] font-black uppercase z-20 text-black">
            {issue}
          </div>
        </div>

        {/* Caption */}
        <div className="space-y-2 px-2 relative z-10">
          <h3 className="font-permanent-marker text-3xl uppercase leading-none text-black/90 group-hover:text-red-700 transition-colors -rotate-1 drop-shadow-sm">
            {title}
          </h3>
          <p className="font-marker-print text-[13px] leading-tight text-black/80 h-12 overflow-hidden rotate-1 italic">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 border-t border-dashed border-black/20 pt-3 mt-4">
            {stack.map((tool, i) => (
              <span key={i} className="text-[10px] font-mono uppercase text-black/40 font-bold hover:text-black transition-colors">
                #{tool}
              </span>
            ))}
          </div>
        </div>

        {/* Decorative stamp */}
        <div className="absolute bottom-2 right-4 opacity-5 pointer-events-none">
          <div className="w-10 h-10 rounded-full border-4 border-black flex items-center justify-center font-black text-xl">7</div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;