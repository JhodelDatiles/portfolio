import React from "react";
import { Home, Layers, Briefcase, FolderRoot, Contact, Volume2, VolumeX } from "lucide-react";

const NavItem = ({ href, icon: Icon, label, activeSection, setActiveSection }) => {
  const isActive = activeSection === href.replace("#", "");
  return (
    <a
      href={href}
      onClick={() => setActiveSection(href.replace("#", ""))}
      className={`group relative p-2.5 transition-all duration-150 flex items-center justify-center border-2
        ${isActive 
          ? "bg-spider-magenta text-white border-spider-cyan shadow-[4px_4px_0px_#000000] scale-110 -translate-y-1" 
          : "bg-black/40 text-white/60 border-white/10 hover:border-spider-magenta hover:text-spider-magenta"}`}
    >
      <Icon size={20} strokeWidth={isActive ? 3 : 2} />
      <span className="absolute -bottom-12 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all duration-100 bg-black text-spider-cyan text-[10px] font-comic-hand px-3 py-1.5 z-50 whitespace-nowrap shadow-[4px_4px_0px_#FF00FF] border-2 border-spider-cyan uppercase tracking-widest italic pointer-events-none">
        {label}
      </span>
      {isActive && <span className="absolute inset-0 border-2 border-spider-red translate-x-0.5 translate-y-0.5 -z-10 opacity-70" />}
    </a>
  );
};

const Navbar = ({ activeSection, setActiveSection, isMuted, setIsMuted }) => {
  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-100 px-4 py-2 bg-black border-[3px] border-white shadow-[8px_8px_0px_#000000]">
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-spider-magenta -z-10" />
      <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-spider-cyan -z-10" />
      <div className="flex flex-row items-center gap-3">
        <NavItem href="#home" icon={Home} label="Home" activeSection={activeSection} setActiveSection={setActiveSection} />
        <NavItem href="#stack" icon={Layers} label="Stack" activeSection={activeSection} setActiveSection={setActiveSection} />
        <NavItem href="#experience" icon={Briefcase} label="Experience" activeSection={activeSection} setActiveSection={setActiveSection} />
        <NavItem href="#projects" icon={FolderRoot} label="Projects" activeSection={activeSection} setActiveSection={setActiveSection} />
        <NavItem href="#contact" icon={Contact} label="Contact" activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="w-0.75 h-8 bg-white/20 mx-2 rotate-12" />
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className={`p-2 transition-all duration-300 border-2 active:scale-95
            ${isMuted ? 'border-spider-magenta text-spider-magenta' : 'bg-spider-cyan border-black text-black shadow-[4px_4px_0px_#000000]'}`}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} className="animate-pulse" />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;