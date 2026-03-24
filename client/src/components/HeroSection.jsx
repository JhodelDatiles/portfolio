import { motion } from "framer-motion";
import { Download } from "lucide-react";
import HeroCard from "../components/HeroCard";

const HeroSection = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Time between each element appearing
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring", // Use spring physics for a "premium" feel
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.section
      id="home"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen flex flex-col md:flex-row items-center justify-between pt-20 gap-10"
    >
      <div className="flex-1 space-y-6">
        {/* Title with Gradient & Motion */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient"
        >
          Fullstack Dev <br />& QA Tester
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg opacity-80 max-w-lg leading-relaxed font-sans"
        >
          Aspiring developer with a passion for building responsive and
          functional web-apps and applications. I enjoy solving problems,
          learning new technologies, and continuously improving my development
          skills.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 pt-4"
        >
          <a
            href="#contact"
            className="btn btn-primary btn-md px-8 shadow-lg hover:shadow-primary/20"
          >
            Contact Me
          </a>
          <a
            href="/Jhodel_Datiles_Resume.pdf"
            download
            className="btn btn-outline btn-md px-8 transition-all hover:scale-105"
          >
            <Download className="w-5 h-5" />
            Get Resume
          </a>
        </motion.div>
      </div>

      {/* Hero Card with a specialized entrance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
        className="flex-1 flex justify-center items-center"
      >
        <HeroCard />
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
