import React from "react";
import { Home, Layers, Briefcase, FolderRoot, Contact } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const NavItem = ({ href, icon: Icon, label, activeSection, setActiveSection }) => {
  const isActive = activeSection === href.replace("#", "");

  return (
    <a 
      href={href} 
      onClick={() => setActiveSection(href.replace("#", ""))}
      className={`group relative p-[10px] rounded-xl transition-all duration-300 flex items-center justify-center
        ${isActive 
          ? "bg-primary text-primary-content shadow-lg scale-110" 
          : "hover:bg-base-300 text-base-content/60 hover:text-base-content"
        }`}
    >
      <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
      
      {/* Tooltip: Adapts to theme using 'bg-neutral' */}
      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all duration-200 bg-neutral text-neutral-content text-[10px] font-bold px-2 py-1 rounded-md z-50 whitespace-nowrap shadow-xl pointer-events-none uppercase tracking-wider">
        {label}
      </span>
    </a>
  );
};

const Navbar = ({ activeSection, setActiveSection }) => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-3 py-2 rounded-2xl bg-base-200/80 backdrop-blur-md border border-base-300 shadow-2xl transition-colors duration-500">
      <div className="flex flex-row items-center gap-2">
        <NavItem href="#home" icon={Home} label="Home" activeSection={activeSection} setActiveSection={setActiveSection} />
        <NavItem href="#stack" icon={Layers} label="Stack" activeSection={activeSection} setActiveSection={setActiveSection} />
        <NavItem href="#experience" icon={Briefcase} label="Experience" activeSection={activeSection} setActiveSection={setActiveSection} />
        <NavItem href="#projects" icon={FolderRoot} label="Projects" activeSection={activeSection} setActiveSection={setActiveSection} />
        <NavItem href="#contact" icon={Contact} label="Contact" activeSection={activeSection} setActiveSection={setActiveSection} />
        
        <div className="w-[1px] h-6 bg-base-300 mx-1"></div>
        
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;