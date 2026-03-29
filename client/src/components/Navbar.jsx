import React, { useState } from "react";
import { Home, Layers, Briefcase, FolderRoot, Contact, Volume2, VolumeX, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { href: "#home",       icon: Home,       label: "Home"       },
  { href: "#stack",      icon: Layers,     label: "Stack"      },
  { href: "#experience", icon: Briefcase,  label: "Experience" },
  { href: "#projects",   icon: FolderRoot, label: "Projects"   },
  { href: "#contact",    icon: Contact,    label: "Contact"    },
];

const NavItem = ({ href, icon: Icon, label, activeSection, setActiveSection, onClick }) => {
  const isActive = activeSection === href.replace("#", "");
  return (
    <a
      href={href}
      onClick={() => {
        setActiveSection(href.replace("#", ""));
        onClick?.();
      }}
      className={`group relative p-2.5 transition-all duration-150 flex items-center justify-center border-2
        ${isActive
          ? "bg-spider-magenta text-white border-spider-cyan shadow-[4px_4px_0px_#000000] scale-110 -translate-y-1"
          : "bg-black/40 text-white/60 border-white/10 hover:border-spider-magenta hover:text-spider-magenta"
        }`}
    >
      <Icon size={20} strokeWidth={isActive ? 3 : 2} />
      {/* Tooltip — only visible on desktop */}
      <span className="absolute -bottom-12 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all duration-100 bg-black text-spider-cyan text-[10px] font-comic-hand px-3 py-1.5 z-50 whitespace-nowrap shadow-[4px_4px_0px_#FF00FF] border-2 border-spider-cyan uppercase tracking-widest italic pointer-events-none hidden md:block">
        {label}
      </span>
      {isActive && (
        <span className="absolute inset-0 border-2 border-spider-red translate-x-0.5 translate-y-0.5 -z-10 opacity-70" />
      )}
    </a>
  );
};

const Navbar = ({ activeSection, setActiveSection, isMuted, setIsMuted }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* ── DESKTOP NAVBAR (md and up) ── */}
      <nav className="hidden md:flex fixed top-8 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 bg-black border-[3px] border-white shadow-[8px_8px_0px_#000000]">
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-spider-magenta -z-10" />
        <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-spider-cyan -z-10" />

        <div className="flex flex-row items-center gap-3">
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.href}
              {...item}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          ))}

          <div className="w-0.5 h-8 bg-white/20 mx-2 rotate-12" />

          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-2 transition-all duration-300 border-2 active:scale-95
              ${isMuted
                ? "border-spider-magenta text-spider-magenta"
                : "bg-spider-cyan border-black text-black shadow-[4px_4px_0px_#000000]"
              }`}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} className="animate-pulse" />}
          </button>
        </div>
      </nav>

      {/* ── MOBILE TOP BAR (below md) ── */}
      <div className="md:hidden fixed top-4 left-0 right-0 z-[100] flex items-center justify-between px-4">
        {/* Brand pill */}
        <div className="bg-black border-[3px] border-white px-4 py-2 shadow-[4px_4px_0px_#000000] relative">
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-spider-magenta -z-10" />
          <span className="font-comic-title text-white uppercase text-sm tracking-widest">
            J<span className="text-spider-cyan">.</span>D
          </span>
        </div>

        {/* Mute + hamburger */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-2 border-2 transition-all active:scale-95
              ${isMuted
                ? "border-spider-magenta text-spider-magenta bg-black"
                : "bg-spider-cyan border-black text-black"
              }`}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="animate-pulse" />}
          </button>

          <button
            onClick={() => setDrawerOpen(true)}
            className="p-2 bg-black border-2 border-white text-white shadow-[4px_4px_0px_#ff00ff] active:scale-95 transition-all"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* ── DRAWER BACKDROP ── */}
      <div
        onClick={() => setDrawerOpen(false)}
        className={`md:hidden fixed inset-0 bg-black/70 z-[200] transition-opacity duration-300 ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ── DRAWER PANEL ── */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-72 bg-black border-l-4 border-white z-[201] flex flex-col transition-transform duration-300 ease-in-out ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b-2 border-white/20">
          <div>
            <p className="font-mono text-[10px] text-spider-cyan uppercase tracking-widest">
              // navigation
            </p>
            <h2 className="font-comic-title text-2xl text-white uppercase tracking-tight">
              Menu
            </h2>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="p-2 border-2 border-white/20 text-white/60 hover:text-white hover:border-spider-magenta transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer links */}
        <nav className="flex flex-col gap-2 px-4 py-6 flex-1">
          {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
            const isActive = activeSection === href.replace("#", "");
            return (
              <a
                key={href}
                href={href}
                onClick={() => {
                  setActiveSection(href.replace("#", ""));
                  setDrawerOpen(false);
                }}
                className={`flex items-center gap-4 px-4 py-3 border-2 transition-all duration-150 relative
                  ${isActive
                    ? "bg-spider-magenta text-white border-spider-cyan shadow-[4px_4px_0px_#000]"
                    : "bg-transparent text-white/60 border-white/10 hover:border-spider-magenta hover:text-white hover:bg-white/5"
                  }`}
              >
                <Icon size={20} strokeWidth={isActive ? 3 : 2} />
                <span className="font-comic-title text-xl uppercase tracking-tight">{label}</span>
                {isActive && (
                  <span className="absolute inset-0 border-2 border-spider-red translate-x-0.5 translate-y-0.5 -z-10 opacity-70" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Drawer footer */}
        <div className="px-4 py-6 border-t-2 border-white/20 relative">
          <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-spider-cyan" />
          <p className="font-mono text-[9px] text-white/30 uppercase tracking-widest text-center">
            Earth-1610 // Portfolio v1
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;