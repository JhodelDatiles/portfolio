import React from "react";
import { Home, Layers, Briefcase, FolderRoot, Contact } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const NavItem = ({
  href,
  icon: Icon,
  label,
  activeSection,
  setActiveSection,
}) => {
  const isActive = activeSection === href.replace("#", "");

  return (
    <a
      href={href}
      onClick={() => setActiveSection(href.replace("#", ""))}
      className={`group relative p-[10px] transition-all duration-150 flex items-center justify-center border-2
        ${
          isActive
            ? "bg-[#FF00FF] text-white border-[#00FFFF] shadow-[4px_4px_0px_#000000] scale-110 -translate-y-1 animate-glitch"
            : "bg-black/40 text-white/60 border-white/10 hover:border-[#FF00FF] hover:text-[#FF00FF] hover:bg-black/60"
        }`}
    >
      <Icon
        size={20}
        strokeWidth={isActive ? 3 : 2}
        className={isActive ? "italic" : ""}
      />

      {/* Spider-Verse Style Tooltip */}
      <span className="absolute -bottom-12 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all duration-100 bg-black text-[#00FFFF] text-[10px] font-comic-hand px-3 py-1.5 z-50 whitespace-nowrap shadow-[4px_4px_0px_#FF00FF] border-2 border-[#00FFFF] pointer-events-none uppercase tracking-widest italic">
        {label}
      </span>

      {/* Misprint Effect for Active State */}
      {isActive && (
        <span className="absolute inset-0 border-2 border-[#FF3333] translate-x-[2px] translate-y-[2px] -z-10 opacity-70" />
      )}
    </a>
  );
};

const Navbar = ({ activeSection, setActiveSection }) => {
  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 bg-black border-[3px] border-white shadow-[8px_8px_0px_#000000] transition-all duration-500">
      {/* Decorative "Glitch" Lines on the Navbar frame */}
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF00FF] -z-10" />
      <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-[#00FFFF] -z-10" />

      <div className="flex flex-row items-center gap-3">
        <NavItem
          href="#home"
          icon={Home}
          label="Home"
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <NavItem
          href="#stack"
          icon={Layers}
          label="Stack"
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <NavItem
          href="#experience"
          icon={Briefcase}
          label="Experience"
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <NavItem
          href="#projects"
          icon={FolderRoot}
          label="Projects"
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <NavItem
          href="#contact"
          icon={Contact}
          label="Contact"
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        {/* Comic Divider */}
        <div className="w-[3px] h-8 bg-white/20 mx-2 rotate-12"></div>

        <div className="hover:scale-110 transition-transform">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
