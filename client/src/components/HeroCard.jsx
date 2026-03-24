import React, { useState, useRef } from "react";

const HeroCard = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current.getBoundingClientRect();
    const cardCenterX = card.left + card.width / 2;
    const cardCenterY = card.top + card.height / 2;
    const mouseX = (e.clientX - cardCenterX) / (card.width / 2);
    const mouseY = (e.clientY - cardCenterY) / (card.height / 2);

    setRotate({ x: -mouseY * 10, y: mouseX * 10 });
  };

  return (
    <div className="perspective-1000 w-full max-w-[500px] h-[400px] md:h-[350px]">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setRotate({ x: 0, y: 0 })}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: "transform 0.1s ease-out",
        }}
        /* bg-base-300 makes the terminal slightly darker than the page background in any theme */
        className="relative w-full h-full bg-base-300/90 backdrop-blur-xl rounded-2xl border border-base-content/10 shadow-2xl overflow-hidden transition-colors duration-500"
      >
        {/* TERMINAL HEADER */}
        <div className="flex items-center justify-between px-4 py-3 bg-base-content/5 border-b border-base-content/10">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="text-[10px] text-base-content/40 font-mono">
            Portfolio.js
          </div>
        </div>

        {/* TERMINAL CONTENT */}
        <div className="p-6 font-mono text-xs sm:text-sm leading-relaxed">
          <div className="flex gap-4">
            <span className="text-base-content/20 select-none">01</span>
            <p>
              <span className="text-secondary">const</span>{" "}
              <span className="text-primary">developer</span> = &#123;
            </p>
          </div>
          <div className="flex gap-4">
            <span className="text-base-content/20 select-none">02</span>
            <p className="ml-4">
              <span className="text-base-content">lastName:</span>{" "}
              <span className="text-success">'Datiles'</span>,
            </p>
          </div>
          <div className="flex gap-4">
            <span className="text-base-content/20 select-none">02</span>
            <p className="ml-4">
              <span className="text-base-content">firstName:</span>{" "}
              <span className="text-success">'Jhodel'</span>,
            </p>
          </div>
          <div className="flex gap-4">
            <span className="text-base-content/20 select-none">02</span>
            <p className="ml-4">
              <span className="text-base-content">nickName:</span>{" "}
              <span className="text-success">'Del'</span>,
            </p>
          </div>
          <div className="flex gap-4">
            <span className="text-base-content/20 select-none">03</span>
            <p className="ml-4">
              <span className="text-base-content">role:</span>{" "}
              <span className="text-success">'Fullstack Dev'</span>,
            </p>
          </div>
          <div className="flex gap-4">
            <span className="text-base-content/20 select-none">04</span>
            <p className="ml-4">
              <span className="text-base-content">passionate:</span>{" "}
              <span className="text-warning">true</span>,
            </p>
          </div>
          <div className="flex gap-4">
            <span className="text-base-content/20 select-none">05</span>
            <p className="ml-4 flex-1">
              <span className="text-base-content">motto:</span>
              <span className="text-success ml-1">
                "if i were a garbage man, i would be the greatest garbage man in
                the world"
              </span>
            </p>
          </div>
          <div className="flex gap-4">
            <span className="text-base-content/20 select-none">06</span>
            <p>&#125;;</p>
          </div>
          <div className="flex gap-4 mt-4">
            <span className="text-base-content/20 select-none">07</span>
            <p>
              <span className="text-primary">developer</span>.
              <span className="text-info">showcase</span>();
            </p>
          </div>
        </div>

        {/* THEME-REACTIVE GLOW */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 transition-colors duration-500"
          style={{
            background: `radial-gradient(circle at center, var(--p), transparent 70%)`,
          }}
        />
      </div>
    </div>
  );
};

export default HeroCard;
