import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import ExperienceCard from "../cards/ExperienceCard";
import { SectionTitle } from "../../pages/LandingPage";

const experiences = [
  {
    title: "Full-Stack Dev",
    subtitle: "MERN Stack Projects // 2024 - present",
    description: `Developing robust web applications like 'Ekomers' and 'iPaskil' using M.E.R.N stack. Applying a QA-first mindset to full-stack development. And ensured secure and efficient system performance.`,
    highlights: [""],
    side: "left",
    rotate: "rotate(1deg)",
    offsetColor: "bg-spider-cyan",
  },
  {
    title: "QA Intern",
    subtitle: "Sparkle Star International // Jan - Apr 2026",
    description: `Working in a fast-paced Agile environment, conducting manual and exploratory testing during short sprint cycles to identify functional defects and usability issues. Documentation of critical bugs using Jira provided developers with precise insights to resolve errors. Verification of components with individual unit testing ensured total system stability before final release.`,
    highlights: ["", ""],
    side: "right",
    rotate: "rotate(-1deg)",
    offsetColor: "bg-spider-magenta",
    image: "/assets/qa-preview.png",
  },
];

const WorkExperienceSection = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  });

  const lineColor = useTransform(
    smoothProgress,
    [0, 1],
    ["#00ffff", "#ff00ff"],
  );

  return (
    <section
      ref={containerRef}
      className="flex flex-col relative w-full overflow-visible"
    >
      <SectionTitle text="Work Experiences" />

      <div className="relative w-full max-w-5xl mx-auto px-4">
        {/* Empty track */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 z-0 bg-white/5 border-l border-dashed border-white/20" />

        {/* Scroll-linked progress line — unchanged */}
        <motion.div
          style={{
            scaleY: smoothProgress,
            originY: 0,
            backgroundColor: lineColor,
            boxShadow: `0 0 15px ${lineColor}`,
          }}
          className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 z-0"
        >
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

const TimelineItem = ({ exp, progress, index, total }) => {
  // Each card gets its own ref + inView — fires only when THIS card enters the viewport
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, {
    once: true, // animate once, don't re-trigger on scroll back
    amount: 0.4, // card must be 40% visible before triggering
  });

  // Directional slide based on which side the card is on
  const xStart = exp.side === "left" ? -70 : 70;

  // Bead still uses scroll-linked progress for the power-up effect
  const activationThreshold = (index + 0.3) / total;
  const isPowered = useTransform(
    progress,
    [activationThreshold - 0.05, activationThreshold],
    [0, 1],
  );
  const beadScale = useTransform(
    progress,
    [activationThreshold - 0.1, activationThreshold],
    [0.5, 1.2],
  );
  const spinVal = useTransform(
    progress,
    [activationThreshold - 0.1, activationThreshold],
    [0, 405],
  );

  return (
    <div
      className={`group flex w-full items-center justify-between
        ${exp.side === "right" ? "md:flex-row-reverse" : "md:flex-row"}
        flex-col md:flex-row gap-12 md:gap-0`}
    >
      {/* Card — inView-triggered, not scroll-progress-triggered */}
      {/* // Inside TimelineItem — just add isInView to the ExperienceCard call: */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, x: xStart, y: 30, scale: 0.95 }}
        animate={
          isInView
            ? { opacity: 1, x: 0, y: 0, scale: 1 }
            : { opacity: 0, x: xStart, y: 30, scale: 0.95 }
        }
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full md:w-[42%] group-hover:z-50"
      >
        <ExperienceCard {...exp} isInView={isInView} /> {/* ← pass it down */}
      </motion.div>

      {/* Bead — still scroll-linked, unchanged */}
      <div className="relative flex items-center justify-center">
        <motion.div
          style={{
            scale: beadScale,
            rotate: spinVal,
            backgroundColor: useTransform(
              isPowered,
              [0, 1],
              ["#1a1a1a", "#ffee00"],
            ),
            borderColor: useTransform(isPowered, [0, 1], ["#333", "#000"]),
          }}
          className="hidden md:block absolute left-1/2 -translate-x-1/2 w-8 h-8 border-4 rotate-45 z-20 transition-colors shadow-[4px_4px_0px_rgba(0,0,0,1)]"
        />
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
