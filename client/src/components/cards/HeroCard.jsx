import React, { useState, useRef } from "react";
// === Ensure this image is in your src/assets folder ===
import GraffitiName from "../../assets/del-tag.png";

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
    setRotate({ x: -mouseY * 12, y: mouseX * 12 });
  };

  return (
    <div className="perspective-1000 w-auto max-w-112.5 aspect-[1.4/1] p-10">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setRotate({ x: 0, y: 0 })}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: "transform 0.1s ease-out",
        }}
        // The main card frame
        className="relative group w-full h-full rounded-2xl border-[6px] border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] overflow-hidden cursor-pointer selection:bg-[#FFEE00]"
      >
        {/* === LAYER 0: DISTRESS TEXTURES (Folds & Noise) === */}
        <div
          className="absolute inset-0 opacity-[0.25] pointer-events-none z-0"
          style={{
            backgroundImage: `
              radial-gradient(#FFEE00 1.5px, transparent 1.5px), 
              repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(0,0,0,0.01) 1px, rgba(0,0,0,0.01) 2px)
            `,
            backgroundSize: "12px 12px, 3px 3px",
            backgroundBlendMode: "multiply",
          }}
        />

        {/* --- DUSTY RED HEADER SECTION --- */}
        <div className="h-[35%] bg-[#FF3333] border-b-[6px] border-black flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 opacity-10 bg-size-[20px_20px] bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)]" />

          {/* Glitch Overlay (on hover) */}
          <div className="absolute inset-0 bg-[#FF00FF] opacity-0 group-hover:opacity-40 translate-x-0.75 translate-y-0.75 transition-opacity -z-10" />

          <h2 className="text-white/80 text-4xl md:text-5xl font-sans font-black uppercase tracking-wider text-center px-4 z-10">
            Hello
          </h2>
          <p className="text-white/70 text-base md:text-lg font-sans font-normal lowercase tracking-widest opacity-90 -mt-1 mb-1 z-10">
            my name is
          </p>
        </div>

        {/* --- CRUMPLED WHITE SIGNATURE SECTION --- */}
        <div className="h-[65%] bg-[#f4f1ea] relative flex items-center justify-center overflow-hidden">
          {/* Halftone Pattern (Spidey-Dots) */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `radial-gradient(#000000 1.2px, transparent 1.2px)`,
              backgroundSize: "12px 12px",
            }}
          />

          {/* Crumpled Paper Cracks Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxmaWx0ZXIgaWQ9ImNyYWNrIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC4wNiIgYmVzcG9rZT0iYmVzcG9rZSIgbnVtT2N0YXZlcz0iMiIvPjxmZURpc3BsYWNlbWVudE1hcCBpbiA9IlNvdXJjZUdyYXBoaWMiIHNjYWxlPSI3Ii8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwAlIiIGhlaWdodD9iMDAlIiBmaWx0ZXI9InVybCgjY3JhY2spIiBmaWxsPSIjRkZGRkZGIiBvcGFjaXR5PSIwLjAyIi8+PC9zdmc+')] bg-repeat z-10" />

          {/* === THE GRAFFITI NAME IMAGE (Pasted on Top) === */}
          <div className="relative w-full md:w-[96%] h-auto z-20 px-4">
            <img
              src={GraffitiName}
              alt="Jhodel Datiles Graffiti Tag"
              className="w-full h-auto mix-blend-multiply opacity-95 group-hover:scale-105 transition-transform duration-300 pointer-events-none"
            />

            {/* Chromatic Glitch (Hover Effect) */}
            <img
              src={GraffitiName}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-auto mix-blend-screen -translate-x-1 -translate-y-1 opacity-0 group-hover:opacity-40 transition-opacity -z-10 select-none pointer-events-none"
            />
          </div>
        </div>

        {/* --- GLOBAL FADE OVERLAY --- */}
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.06)] pointer-events-none z-30 opacity-70" />

        {/* Layer for adding subtle dark splotches/dirt */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxmaWx0ZXIgaWQ9Im5vaXNlIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9IjAuNiIgbnVtT2N0YXZlcz0iMiIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuOSIvPjwvc3ZnPg==')] pointer-events-none z-40" />
      </div>
    </div>
  );
};

export default HeroCard;
