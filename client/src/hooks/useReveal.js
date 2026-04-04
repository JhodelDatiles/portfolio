import { useRef } from "react";
import { useInView } from "framer-motion";

export const useReveal = (options = {}) =>
  useInView(useRef(null), { once: true, amount: 0.2, ...options });