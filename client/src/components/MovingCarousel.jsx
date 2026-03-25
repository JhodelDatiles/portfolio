import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { wrap } from "@motionone/utils";

const ComicTag = ({ item, index }) => {
  const rotation = useRef((Math.random() - 0.5) * 6).current;

  const svColors = [
    { bg: "bg-[#FF00FF]", text: "text-white", border: "border-[#00FFFF]" },
    { bg: "bg-[#FFEE00]", text: "text-black", border: "border-black" },
    { bg: "bg-[#000000]", text: "text-[#00FFFF]", border: "border-[#FF00FF]" },
    { bg: "bg-[#FF3333]", text: "text-white", border: "border-[#222]" },
  ];
  const style = svColors[index % svColors.length];

  return (
    <motion.div
      style={{ rotate: rotation }}
      whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
      className={`relative group select-none ${style.bg} ${style.text}
        px-6 py-3 rounded-none border-2 ${style.border}
        shadow-[4px_4px_0px_rgba(255,0,0,0.8),-2px_-2px_0px_rgba(0,255,255,0.8)]
        hover:animate-glitch transition-all duration-100
      `}
    >
      <span className="font-comic-hand text-lg md:text-xl font-black uppercase tracking-tighter italic whitespace-nowrap">
        {item}
      </span>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_1px,white_1px,white_2px)] pointer-events-none" />
    </motion.div>
  );
};

const ScrollingRow = ({ items, baseVelocity = -1, title }) => {
  const baseX = useMotionValue(0);
  const isDragging = useRef(false);
  const finalItems = [...items, ...items, ...items, ...items];

  useAnimationFrame((t, delta) => {
    if (!isDragging.current) {
      let moveBy = baseVelocity * (delta / 300);
      baseX.set(baseX.get() + moveBy);
    }
  });

  const x = useMotionValue(0);
  useEffect(() => {
    const unsubscribe = baseX.on("change", (v) => {
      x.set(`${wrap(-50, -25, v)}%`);
    });
    return () => unsubscribe();
  }, [baseX]);

  return (
    <div className="flex flex-col py-4 relative">
      <div className="self-center">
      <h3 className="font-comic-title text-3xl md:text-4xl uppercase tracking-tighter text-white mb-4 px-8 relative inline-block">
        <span className="relative z-10">{title}</span>
        <span className="absolute top-0.5 left-[34px] text-[#FF00FF] -z-10 opacity-50 italic">
          {title}
        </span>
        <span className="absolute -top-0.5 left-[30px] text-[#00FFFF] -z-20 opacity-50">
          {title}
        </span>
      </h3>
      </div>

      <div className=" relative overflow-hidden border-y-4 border-black py-10 cursor-grab active:cursor-grabbing bg-[#0a0a0a]">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #FF00FF 0.5px, transparent 0)`,
            backgroundSize: "8px 8px",
          }}
        />

        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex whitespace-nowrap gap-8 w-max relative z-20"
          style={{ x }}
          drag="x"
          onDragStart={() => (isDragging.current = true)}
          onDragEnd={() => (isDragging.current = false)}
          dragConstraints={{ left: -10000, right: 10000 }}
          dragElastic={0.05}
        >
          {finalItems.map((item, index) => (
            <ComicTag key={index} item={item} index={index} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const MovingCarousel = () => {
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
    <section
      id="stack"
      className="min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-full mx-auto w-full">
        <ScrollingRow
          items={techStack}
          title="TECH STACK"
          baseVelocity={-0.3}
        />
        <ScrollingRow
          items={tools}
          title="TOOLS & SERVICES"
          baseVelocity={0.3}
        />
      </div>
    </section>
  );
};

export default MovingCarousel;
