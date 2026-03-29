import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import ExperienceCard from "../cards/ExperienceCard";
import { SectionTitle } from "../../pages/LandingPage";

const experiences = [
  {
    title: "QA Intern",
    subtitle: "Sparkle Star International // Jan - Apr 2026",
    description: `Working in a fast-paced Agile environment, conducting manual and exploratory testing during short sprint cycles to identify functional defects and usability issues. Documentation of critical bugs using Jira provided developers with precise insights to resolve errors. Verification of components with individual unit testing ensured total system stability before final release.`,
    highlights: ["Playwright", "Manual Testing", "Jira", "Agile"],
    side: "left",
    rotate: "rotate(-1deg)",
    offsetColor: "bg-spider-magenta",
    image: "/assets/qa-preview.png",
  },
  {
    title: "Full-Stack Dev",
    subtitle: "MERN Stack Projects // 2025-2026",
    description: `Developing robust web applications like 'iPaskil' and 'EKOMERS' using MongoDB, Express, React, and Node.js. Applying a QA-first mindset to full-stack development. Integration of PayMongo and Cloudinary ensured secure and efficient system performance.`,
    highlights: ["MERN Stack", "React Native", "Tailwind CSS"],
    side: "right",
    rotate: "rotate(1deg)",
    offsetColor: "bg-spider-cyan",
  },
  // Add more as needed
];

const WorkExperienceSection = () => {
  const containerRef = useRef(null);

  // Track scroll through the whole experience section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"], // Triggers when section is in the middle of the view
  });

  // Smooth the scroll input with spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001
  });

  // The Power Line Color shift
  const lineColor = useTransform(smoothProgress, [0, 1], ["#00ffff", "#ff00ff"]); // From Cyan to Magenta

  return (
    <section ref={containerRef} className="flex flex-col relative w-full py-30 overflow-visible">
      <SectionTitle text="Work Experiences" />

      <div className="relative w-full max-w-5xl mx-auto px-4">
        
        {/* 1. THE "EMPTY" TRACK (Dimmed & Dotted) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 z-0 bg-white/5 border-l border-dashed border-white/20" />

        {/* 2. THE PROGRESS INDICATOR (Redesigned 'Power String') */}
        <motion.div
          style={{ 
            scaleY: smoothProgress, 
            originY: 0,
            backgroundColor: lineColor,
            boxShadow: `0 0 15px ${lineColor}` 
          }}
          className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 z-0"
        >
          {/* THE "PULSE HEAD" (Glowing lead signal) */}
          <motion.div 
             className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full blur-[2px] z-10 shadow-[0_0_20px_#fff]"
             animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
             transition={{ repeat: Infinity, duration: 0.8 }}
          />
        </motion.div>

        <div className="space-y-40 relative z-10">
          {experiences.map((exp, index) => (
            <TimelineItem 
              key={index} 
              exp={exp} 
              progress={smoothProgress} 
              index={index} 
              total={experiences.length} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Sub-component to manage both bead and card reveal
const TimelineItem = ({ exp, progress, index, total }) => {
  // Logic: Set a specific "Activation Threshold" for each item
  // e.g., for 2 items: item 0 at 25% progress, item 1 at 75% progress
  const activationThreshold = (index + 0.3) / total;
  
  // Transform scroll progress into animation values for the Card
  const cardOpacity = useTransform(progress, [activationThreshold - 0.05, activationThreshold], [0, 1]);
  const cardY = useTransform(progress, [activationThreshold - 0.05, activationThreshold], [30, 0]); // Slide up 30px
  const cardScale = useTransform(progress, [activationThreshold - 0.05, activationThreshold], [0.95, 1]); // Subtle grow

  // Transform scroll progress into animation values for the Bead (Lit Up)
  const isPowered = useTransform(progress, [activationThreshold - 0.05, activationThreshold], [0, 1]);
  const beadScale = useTransform(progress, [activationThreshold - 0.1, activationThreshold], [0.5, 1.2]); // Starts small, grows fast
  const spinVal = useTransform(progress, [activationThreshold - 0.1, activationThreshold], [0, 405]); // Flipped extra turn

  return (
    <div className={`group flex w-full items-center justify-between ${exp.side === "right" ? "md:flex-row-reverse" : "md:flex-row"} flex-col md:flex-row gap-12 md:gap-0`}>
      
      {/* 3. THE REVEALING EXPERIENCE CARD */}
      <motion.div
        style={{ 
          opacity: cardOpacity, 
          y: cardY,
          scale: cardScale,
        }}
        className="w-full md:w-[42%] group-hover:z-50 transition-all duration-300"
      >
        <ExperienceCard {...exp} />
      </motion.div>

      {/* 4. THE REDESIGNED BEAD (Diamond Core) */}
      <div className="relative flex items-center justify-center">
        <motion.div
          style={{ 
            scale: beadScale,
            rotate: spinVal,
            backgroundColor: useTransform(isPowered, [0, 1], ["#1a1a1a", "#ffee00"]), // From grey to Spider-Yellow
            borderColor: useTransform(isPowered, [0, 1], ["#333", "#000"]), 
          }}
          className="hidden md:block absolute left-1/2 -translate-x-1/2 w-8 h-8 border-4 rotate-45 z-20 transition-colors shadow-[4px_4px_0px_rgba(0,0,0,1)]"
        />
        
        {/* Glow halo that only appears when lit up */}
        <motion.div 
          style={{ opacity: isPowered }}
          className="hidden md:block absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-spider-yellow/30 blur-xl rounded-full -z-10"
        />
      </div>

      <div className="hidden md:block w-[42%]" />
    </div>
  );
};

export default WorkExperienceSection;