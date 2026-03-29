import React, { useState, useEffect, useRef } from "react";
import { Mail, ArrowUp } from "lucide-react"; 
import { Github, Linkedin } from "../icons/CustomIcons"; 

const SOCIAL_LINKS = [
  { icon: Github,   href: "https://github.com/JhodelDatiles",   label: "Github"   },
  { icon: Linkedin, href: "https://www.linkedin.com/in/jhodel-datiles-155368393/",  label: "LinkedIn" },
  { icon: Mail,     href: "mailto:datilesjhodel.io@gmail.com", label: "Email" },
];

const NAV_LINKS = [
  { href: "#home",       label: "Home"       },
  { href: "#stack",      label: "Stack"      },
  { href: "#experience", label: "Experience" },
  { href: "#projects",   label: "Projects"   },
  { href: "#contact",    label: "Contact"    },
];

const Footer = () => {
  const [year] = useState(new Date().getFullYear());

  return (
    <footer className="relative w-full bg-black border-t border-white/20 overflow-hidden">
      {/* Ultra-subtle texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "6px 6px" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Status */}
          <div className="flex flex-col items-center md:items-start select-none">
            <h2 className="font-comic-title text-xl uppercase text-white tracking-tighter">
              Jhodel <span className="text-spider-yellow">Datiles</span>
            </h2>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
              <p className="font-mono text-[8px] text-white/30 uppercase tracking-[0.2em]">// Earth-1610</p>
            </div>
          </div>

          {/* Compact Nav */}
          <nav className="flex flex-wrap justify-center gap-3">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href} className="text-white/40 font-mono text-[9px] uppercase hover:text-spider-cyan transition-colors tracking-widest">
                {label}
              </a>
            ))}
          </nav>

          {/* Minimal Socials & Top Button */}
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="w-7 h-7 border border-white/10 bg-white/5 flex items-center justify-center text-white/30 hover:text-white hover:border-spider-magenta transition-all">
                  <Icon size={14} />
                </a>
              ))}
            </div>
            <a href="#home" className="p-1.5 border border-white/20 bg-black text-white/40 hover:text-spider-cyan hover:border-spider-cyan transition-all">
              <ArrowUp size={14} />
            </a>
          </div>
        </div>

        {/* Legal Micro-text */}
        <div className="mt-4 pt-3 border-t border-white flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="font-mono text-[7px] text-white uppercase tracking-[0.3em]">
            © {year} — ALL_SYSTEMS_OPERATIONAL
          </p>
          <p className="font-mono text-[7px] text-white uppercase tracking-[0.3em]">
            Built with React <span className="text-spider-magenta">/</span> Tailwind
          </p>
        </div>
      </div>

      {/* Thin colored line */}
      <div className="w-full h-[2px] flex opacity-50">
        <div className="flex-1 bg-spider-magenta" /><div className="flex-1 bg-spider-yellow" /><div className="flex-1 bg-spider-cyan" />
      </div>
    </footer>
  );
};

export default Footer;