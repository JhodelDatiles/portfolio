import React, { useState, useEffect } from "react";

const CalculatingText = ({ text, delay = 0, speed = 20, revealPerTick = 0.5 }) => {
  const [displayText, setDisplayText] = useState("");
  const characters = "01XY#@&$%*+<>{}[]";
  
  useEffect(() => {
    let iteration = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(
          text.split("").map((char, index) => {
            if (index < iteration) return text[index];
            if (char === " ") return " ";
            return characters[Math.floor(Math.random() * characters.length)];
          }).join("")
        );
        if (iteration >= text.length) clearInterval(interval);
        iteration += revealPerTick; 
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay, speed, revealPerTick]);

  return <span>{displayText}</span>;
};

export default CalculatingText;