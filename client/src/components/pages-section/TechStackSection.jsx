import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
  useInView,
} from "framer-motion";
import { wrap } from "@motionone/utils";
import { SectionTitle } from "../../pages/LandingPage";
import { comicPanelReveal, fadeSlideUp } from "../../utils/animationVariants";

const TAG_COLORS = [
  { bg: "bg-spider-magenta", text: "text-white", border: "border-spider-cyan" },
  { bg: "bg-spider-yellow", text: "text-black", border: "border-black" },
  { bg: "bg-black", text: "text-spider-cyan", border: "border-spider-magenta" },
  { bg: "bg-spider-red", text: "text-white", border: "border-[#222]" },
];

const getStableRotation = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++)
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  return (hash % 600) / 100 - 3;
};

const ComicTag = ({ item, index }) => {
  const rotation = getStableRotation(item);
  const { bg, text, border } = TAG_COLORS[index % TAG_COLORS.length];
  return (
    <motion.div
      style={{ rotate: rotation }}
      whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
      className={`relative group select-none ${bg} ${text} px-6 border-2 ${border}
        shadow-[4px_4px_0px_rgba(255,0,0,0.8),-2px_-2px_0px_rgba(0,255,255,0.8)]
        transition-all duration-100 cursor-grab active:cursor-grabbing`}
    >
      <span className="font-comic-hand text-lg md:text-xl font-black uppercase tracking-tighter italic whitespace-nowrap">
        {item}
      </span>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_1px,white_1px,white_2px)] pointer-events-none" />
    </motion.div>
  );
};

const ScrollingRow = ({ items, baseVelocity = -1, title }) => {
  const rowRef = useRef(null);
  const isInView = useInView(rowRef, { once: true, amount: 0.3 });
  const baseX = useMotionValue(0);
  const isDragging = useRef(false);

  const finalItems = [...items, ...items, ...items, ...items];
  const x = useTransform(baseX, (v) => `${wrap(-50, -25, v)}%`);

  useAnimationFrame((_t, delta) => {
    if (!isDragging.current)
      baseX.set(baseX.get() + baseVelocity * (delta / 1000) * 5);
  });

  return (
    <div ref={rowRef} className="flex flex-col py-2 overflow-hidden">
      {/* Title — glitch entrance on scroll */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeSlideUp}
        className="px-4"
      >
        <SectionTitle text={title} />
      </motion.div>

      {/* Tag row — comic panel reveal */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={comicPanelReveal}
        className="relative border-y-4 border-black py-4 bg-base-200"
      >
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-spider-magenta) 1px, transparent 0)`,
            backgroundSize: "12px 12px",
          }}
        />
        <div className="absolute inset-y-0 left-0  w-20 bg-gradient-to-r from-base-200 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-base-200 to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex whitespace-nowrap gap-8 w-max relative z-20"
          style={{ x }}
          drag="x"
          onDragStart={() => (isDragging.current = true)}
          onDragEnd={() => (isDragging.current = false)}
          dragConstraints={{ left: 0, right: 0 }}
        >
          {finalItems.map((item, index) => (
            <ComicTag key={`${item}-${index}`} item={item} index={index} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

const TechStackSection = () => {
  const techStack = [
    "JS",
    "Node.js",
    "React",
    "Express",
    "MongoDB",
    "Tailwind",
    "QA Auto",
    "Vite",
  ];
  const tools = [
    "VS Code",
    "Figma",
    "Git",
    "GitHub",
    "Postman",
    "Vercel",
    "Render",
    "Redis",
  ];
  return (
    <section className="relative w-full overflow-x-hidden">
      <ScrollingRow items={techStack} title="TECH STACK" baseVelocity={-0.5} />
      <ScrollingRow items={tools} title="TOOLS & SERVICES" baseVelocity={0.5} />
    </section>
  );
};

export default TechStackSection;
