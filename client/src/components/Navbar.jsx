import { Home, Layers, Briefcase, FolderRoot, Contact } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const NavItem = ({ href, icon: Icon, label, width = "w-auto" }) => (
  <a href={href} className="group relative hover:bg-primary/20 p-[8px] rounded-lg transition-all duration-300">
    <Icon size={20} className="group-hover:text-primary transition-colors" />
    <span className={`absolute -bottom-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all duration-300 bg-neutral text-neutral-content text-[10px] px-2 py-1 rounded-md z-50 whitespace-nowrap shadow-xl ${width}`}>
      {label}
    </span>
  </a>
);

const Navbar = () => {
  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl bg-base-200/80 backdrop-blur-md border border-base-300 shadow-2xl">
      <div className="flex flex-row items-center gap-2">
        <NavItem href="#home" icon={Home} label="Home" />
        <NavItem href="#stack" icon={Layers} label="Stack & Tools" />
        <NavItem href="#experience" icon={Briefcase} label="Work Experience" />
        <NavItem href="#projects" icon={FolderRoot} label="Projects" />
        <NavItem href="#contact" icon={Contact} label="Contact" />
        
        <div className="w-[1px] h-6 bg-base-300 mx-1"></div> {/* Custom Divider */}
        
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;