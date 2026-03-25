import React from "react";
// Swapping for more "Tech/Spider-Verse" themed icons
import { 
  Terminal, 
  Cpu, 
  Zap, 
  Globe, 
  Share2, 
  Fingerprint, 
  Send 
} from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="flex flex-col py-30 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
            <h3 className="self-center font-comic-title text-3xl md:text-4xl uppercase tracking-tighter text-white mb-4 px-8 relative inline-block">
              <span className="relative z-10">Work Experiences</span>
              <span className="absolute top-0.5 left-[34px] text-[#FF00FF] -z-10 opacity-50 italic">
                Work Experiences
              </span>
              <span className="absolute -top-0.5 left-[30px] text-[#00FFFF] -z-20 opacity-50">
                Work Experiences
              </span>
            </h3>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* --- LEFT: CLIENT INFORMATION FORM --- */}
        <div className="relative group">
          <div className="absolute inset-0 bg-spider-magenta translate-x-3 translate-y-3 -z-10 opacity-70" />
          
          <form className="border-4 border-black bg-white p-8 space-y-6">
            <h3 className="font-comic-title text-3xl uppercase text-black border-b-4 border-black pb-2 mb-6 flex items-center gap-3">
              <Terminal className="w-8 h-8" /> Send a Request
            </h3>
            
            <div className="space-y-4">
              <div className="relative">
                <label className="block font-mono text-xs font-bold text-black uppercase mb-1">Entity_Name</label>
                <input 
                  type="text" 
                  className="w-full border-4 border-black p-3 font-mono text-sm focus:bg-spider-yellow/10 focus:outline-none transition-colors"
                />
              </div>

              <div className="relative">
                <label className="block font-mono text-xs font-bold text-black uppercase mb-1">Return_Frequency</label>
                <input 
                  type="email" 
                  className="w-full border-4 border-black p-3 font-mono text-sm focus:bg-spider-cyan/10 focus:outline-none transition-colors"
                />
              </div>

              <div className="relative">
                <label className="block font-mono text-xs font-bold text-black uppercase mb-1">The_Message</label>
                <textarea 
                  rows="4"
                  className="w-full border-4 border-black p-3 font-mono text-sm focus:bg-spider-magenta/10 focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-black text-white font-comic-title text-2xl py-4 uppercase hover:bg-spider-magenta flex items-center justify-center gap-3 transition-all shadow-[4px_4px_0px_#FF00FF]"
            >
              Initiate Transmission <Send className="w-6 h-6" />
            </button>
          </form>
        </div>

        {/* --- RIGHT: DIRECT CONTACTS & SOCIALS --- */}
        <div className="space-y-12">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Alternative for Email: Globe (Network) */}
            <div className="border-4 border-black bg-white p-6 relative group hover:-translate-y-1 transition-transform">
              <div className="absolute inset-0 bg-spider-cyan translate-x-2 translate-y-2 -z-10" />
              <Globe className="w-8 h-8 mb-4 text-black" />
              <h4 className="font-comic-title text-xl uppercase text-black">Network</h4>
              <p className="font-mono text-xs text-black/70 truncate">jhodeldatiles@gmail.com</p>
            </div>

            {/* Alternative for Phone: Zap (High Energy/Immediate) */}
            <div className="border-4 border-black bg-white p-6 relative group hover:-translate-y-1 transition-transform">
              <div className="absolute inset-0 bg-spider-yellow translate-x-2 translate-y-2 -z-10" />
              <Zap className="w-8 h-8 mb-4 text-black" />
              <h4 className="font-comic-title text-xl uppercase text-black">Priority_Link</h4>
              <p className="font-mono text-xs text-black/70">+63 9XX XXX XXXX</p>
            </div>
          </div>

          <div className="pt-8 border-t-4 border-dashed border-white/20">
            <h3 className="font-comic-title text-3xl uppercase text-white mb-6 flex items-center gap-3">
              <Share2 className="w-8 h-8 text-spider-cyan" /> Social_Grid
            </h3>
            <div className="flex flex-wrap gap-4">
              {/* Using Fingerprint for Github (Unique Identity) */}
              <SocialIcon Icon={Fingerprint} link="#" color="hover:bg-black" label="Github" />
              {/* Using Cpu for LinkedIn (Professional Brain) */}
              <SocialIcon Icon={Cpu} link="#" color="hover:bg-blue-600" label="LinkedIn" />
              <SocialIcon Icon={Zap} link="#" color="hover:bg-sky-400" label="Twitter" />
              <SocialIcon Icon={Terminal} link="#" color="hover:bg-pink-500" label="Other" />
            </div>
          </div>

          <div className="inline-block border-4 border-black bg-spider-yellow p-4 rotate-[2deg] shadow-[4px_4px_0px_black]">
            <p className="font-comic-title text-black uppercase text-lg italic">Don't be a stranger!</p>
          </div>
        </div>

      </div>
    </section>
  );
};

const SocialIcon = ({ Icon, link, color }) => (
  <a 
    href={link} 
    className={`w-14 h-14 border-4 border-black bg-white flex items-center justify-center transition-all hover:-translate-y-2 hover:text-white ${color} shadow-[4px_4px_0px_black] text-black`}
  >
    <Icon className="w-6 h-6" />
  </a>
);

export default ContactSection;