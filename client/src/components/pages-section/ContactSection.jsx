import React, { useRef } from "react";
import { Terminal, Cpu, Zap, Globe, Share2, Fingerprint, Send } from "lucide-react";
import { SectionTitle } from "../../pages/LandingPage";

const ContactSection = () => {
  const nameRef    = useRef();
  const emailRef   = useRef();
  const messageRef = useRef();

  const handleSubmit = () => {
    const name    = nameRef.current?.value.trim()    || "";
    const email   = emailRef.current?.value.trim()   || "";
    const message = messageRef.current?.value.trim() || "";
    if (!name || !email || !message) return;

    // Fallback: open default mail client with pre-filled fields
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body    = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
    window.location.href = `mailto:jhodeldatiles@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="flex flex-col w-full max-w-6xl">
      <SectionTitle text="Get In Touch" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* --- Form --- */}
        <div className="relative">
          <div className="absolute inset-0 bg-spider-magenta translate-x-3 translate-y-3 -z-10 opacity-70" />
          <div className="border-4 border-black bg-white p-8 space-y-6">
            <h3 className="font-comic-title text-3xl uppercase text-black border-b-4 border-black pb-2 flex items-center gap-3">
              <Terminal className="w-8 h-8" /> Send a Request
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block font-mono text-xs font-bold text-black uppercase mb-1">
                  Entity_Name
                </label>
                <input
                  ref={nameRef}
                  type="text"
                  className="w-full border-4 border-black p-3 font-mono text-sm focus:bg-spider-yellow/10 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block font-mono text-xs font-bold text-black uppercase mb-1">
                  Return_Frequency
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  className="w-full border-4 border-black p-3 font-mono text-sm focus:bg-spider-cyan/10 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block font-mono text-xs font-bold text-black uppercase mb-1">
                  The_Message
                </label>
                <textarea
                  ref={messageRef}
                  rows="4"
                  className="w-full border-4 border-black p-3 font-mono text-sm focus:bg-spider-magenta/10 focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-black text-white font-comic-title text-2xl py-4 uppercase hover:bg-spider-magenta flex items-center justify-center gap-3 transition-all shadow-[4px_4px_0px_var(--color-spider-magenta)]"
            >
              Initiate Transmission <Send className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* --- Socials --- */}
        <div className="space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ContactCard icon={Globe} shadowColor="bg-spider-cyan"   label="Network"       detail="jhodeldatiles@gmail.com" />
            <ContactCard icon={Zap}   shadowColor="bg-spider-yellow" label="Priority_Link" detail="+63 9XX XXX XXXX" />
          </div>

          <div className="pt-8 border-t-4 border-dashed border-white/20">
            <h3 className="font-comic-title text-3xl uppercase text-white mb-6 flex items-center gap-3">
              <Share2 className="w-8 h-8 text-spider-cyan" /> Social_Grid
            </h3>
            <div className="flex flex-wrap gap-4">
              <SocialIcon Icon={Fingerprint} link="https://github.com/"   label="Github"   hoverColor="hover:bg-black" />
              <SocialIcon Icon={Cpu}         link="https://linkedin.com/" label="LinkedIn" hoverColor="hover:bg-blue-600" />
              <SocialIcon Icon={Zap}         link="#"                     label="Twitter"  hoverColor="hover:bg-sky-400" />
              <SocialIcon Icon={Terminal}    link="#"                     label="Other"    hoverColor="hover:bg-pink-500" />
            </div>
          </div>

          <div className="inline-block border-4 border-black bg-spider-yellow p-4 rotate-2 shadow-[4px_4px_0px_black]">
            <p className="font-comic-title text-black uppercase text-lg italic">Don't be a stranger!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactCard = ({ icon: Icon, shadowColor, label, detail }) => (
  <div className="border-4 border-black bg-white p-6 relative hover:-translate-y-1 transition-transform">
    <div className={`absolute inset-0 ${shadowColor} translate-x-2 translate-y-2 -z-10`} />
    <Icon className="w-8 h-8 mb-4 text-black" />
    <h4 className="font-comic-title text-xl uppercase text-black">{label}</h4>
    <p className="font-mono text-xs text-black/70 truncate">{detail}</p>
  </div>
);

const SocialIcon = ({ Icon, link, label, hoverColor }) => (
  <a
    href={link}
    aria-label={label}
    title={label}
    className={`w-14 h-14 border-4 border-black bg-white flex items-center justify-center transition-all hover:-translate-y-2 hover:text-white ${hoverColor} shadow-[4px_4px_0px_black] text-black`}
  >
    <Icon className="w-6 h-6" />
  </a>
);

export default ContactSection;