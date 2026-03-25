import { motion } from "framer-motion";
import { Download } from "lucide-react";
import HeroCard from "../components/HeroCard";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 12 },
    },
  };

  return (
    <motion.section
      id="home"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden mt-5"
    >
      {/* Background Spider-Verse Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] -z-10" />

      <div className="flex-1 space-y-8 z-10">
        {/* Spider-Verse Title */}
        <div className="relative group">
          <motion.h1
            variants={itemVariants}
            className="top-3 text-6xl md:text-[80px] font-comic-title uppercase tracking-tighter text-[white] leading-[0.9] relative z-10"
          >
            Fullstack Dev <br />
            <span className="text-[##00ffe7] italic">& </span> QA Tester
          </motion.h1>
          {/* Chromatic Aberration Shadows for Title */}
          <motion.h1
            variants={itemVariants}
            className="absolute top-1 left--1 text-6xl md:text-[80px] font-comic-title uppercase tracking-tighter text-[#FF00FF] opacity-50 -z-10 italic select-none"
          >
            Fullstack Dev <br />& QA Tester
          </motion.h1>
          
          <motion.h1
            variants={itemVariants}
            className="absolute top-2 left-2 text-6xl md:text-[80px] font-comic-title uppercase tracking-tighter text-[#00FFFF] opacity-50 -z-10 italic select-none"
          >
            Fullstack Dev <br />& QA Tester
          </motion.h1>
        </div>

        {/* Hand-drawn Description Box */}
        <motion.div
          variants={itemVariants}
          className="relative p-6 bg-white border-4 border-black shadow-[8px_8px_0px_#FF00FF]"
        >
          <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#FFEE00] border-2 border-black rotate-12" />
          <p className="text-md text-black font-comic-hand leading-tight">
            Aspiring developer with a strong foundation with programming and a
            passion for building responsive and functional{" "}
            <span className="bg-[#00FFFF] px-1">web-apps and applications</span>
            . I enjoy solving problems, learning new technologies, and
            continuously improving my development skills.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-8 pt-6"
        >
          {/* Primary Action */}
          <a
            href="#contact"
            className="relative group px-10 py-4 bg-[#FF00FF] text-white font-comic-title text-2xl uppercase border-4 border-black shadow-[6px_6px_0px_#000000] hover:bg-black hover:text-[#FF00FF] transition-all"
          >
            Hire Me
          </a>

          {/* Slanted Resume Button */}
          <a
            href="/Jhodel_Datiles_Resume.pdf"
            download
            className="relative group px-14 py-4 bg-[#FF0000] text-white font-comic-title text-2xl uppercase 
      [clip-path:polygon(0%_0%,_85%_0%,_100%_100%,_0%_100%)]
      shadow-[6px_6px_0px_#000000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none 
      transition-all flex items-center gap-3"
          >
            <Download className="w-7 h-7 stroke-[4px]" />
            <span>Download Resume</span>

            {/* Cyan Offset for Glitch effect */}
            <div className="absolute inset-0 bg-[#00FFFF] -z-10 translate-x-2 translate-y-1 opacity-0 group-hover:opacity-40 transition-opacity [clip-path:polygon(0%_0%,_85%_0%,_100%_100%,_0%_100%)]" />
          </a>
        </motion.div>
      </div>

      {/* Hero Card Container */}
      <motion.div
        initial={{ opacity: 0, x: 50, rotate: 5 }}
        animate={{ opacity: 1, x: 0, rotate: -2 }}
        transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
        className="flex-1 flex justify-center items-center relative"
      >
        {/* "POW" Background Decorative Element */}
        <div className="absolute w-[120%] h-[120%] opacity-10 blur-3xl -z-10 rounded-full" />
        <HeroCard />
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
