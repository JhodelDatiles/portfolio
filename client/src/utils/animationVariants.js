// Fade + slide up — generic base for most elements
export const fadeSlideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Stagger wrapper — wraps children that each use fadeSlideUp or scalePop
export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

// Comic panel reveal — clips in from the left like a panel opening
export const comicPanelReveal = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
  },
};

// Glitch entrance — skew jitter then snap into place
export const glitchEntrance = {
  hidden: { opacity: 0, x: -10, skewX: "6deg" },
  visible: {
    opacity: 1,
    x: 0,
    skewX: "0deg",
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// Scale pop — spring-like grow for cards and tags
export const scalePop = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] },
  },
};

// Directional slides for the two-column contact section
export const slideFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export const slideFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" } },
};