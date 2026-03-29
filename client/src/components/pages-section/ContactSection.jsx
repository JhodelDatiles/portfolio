import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Phone, Send, Zap } from "lucide-react";
import { SectionTitle } from "../../pages/LandingPage";
// Import the custom brand icons
import { 
  Facebook, 
  Messenger, 
  Instagram, 
  Github, 
  Linkedin, 
} from "../icons/CustomIcons";

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const STATUS_CONFIG = {
  idle:    { label: "Initiate Transmission", style: "" },
  sending: { label: "Transmitting...",       style: "opacity-60 cursor-not-allowed" },
  success: { label: "Transmission Sent!",    style: "!bg-green-500 !shadow-[6px_6px_0px_#064e3b]" },
  error:   { label: "Failed. Retry?",        style: "!bg-spider-red" },
};

const ContactSection = () => {
  const formRef = useRef();
  const [status, setStatus] = useState("idle");
  const [focused, setFocused] = useState(null);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    const name    = formRef.current.from_name.value.trim();
    const email   = formRef.current.from_email.value.trim();
    const message = formRef.current.message.value.trim();

    if (!name || !email || !message) return;
    if (status === "sending") return;

    setStatus("sending");

    try {
      // .send() ensures the keys match your EmailJS template variables exactly
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: name,      // matches {{name}}
          email: email,    // matches {{email}}
          message: message, // matches {{message}}
          time: new Date().toLocaleString(), // matches {{time}}
        },
        PUBLIC_KEY
      );

      setStatus("success");
      formRef.current.reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const { label, style } = STATUS_CONFIG[status];

  return (
    <section className="flex flex-col w-full max-w-6xl p-4">
      <SectionTitle text="Get In Touch" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* LEFT: FORM (3 cols) */}
        <div className="lg:col-span-3 relative">
          <div className="absolute inset-0 bg-spider-cyan translate-x-4 translate-y-4 -z-10" />

          <div className="border-4 border-black bg-[#0a0a0a] p-8 space-y-6 relative overflow-hidden shadow-[8px_8px_0px_black]">
            <div className="absolute top-0 right-0 w-16 h-16 bg-spider-magenta border-l-4 border-b-4 border-black flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" strokeWidth={3} />
            </div>

            <div className="relative z-10">
              <p className="font-mono text-[10px] text-spider-cyan uppercase tracking-[0.3em] mb-1">
                // incoming_transmission
              </p>
              <h3 className="font-comic-title text-4xl uppercase text-white leading-none">
                Send a Message
              </h3>
            </div>

            <form ref={formRef} className="space-y-5 relative z-10" onSubmit={handleSubmit}>
              <div className="relative">
                <label className="block font-mono text-[10px] font-bold text-spider-cyan uppercase mb-2 tracking-widest">
                  Entity_Name
                </label>
                <input
                  name="from_name"
                  type="text"
                  required
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent border-b-2 border-white/20 p-3 font-mono text-sm text-white focus:outline-none transition-colors duration-300 placeholder:text-white/20"
                  placeholder="Your name"
                />
                <div className="absolute bottom-0 left-0 h-[2px] bg-spider-cyan transition-all duration-500"
                  style={{ width: focused === "name" ? "100%" : "0%" }} />
              </div>

              <div className="relative">
                <label className="block font-mono text-[10px] font-bold text-spider-cyan uppercase mb-2 tracking-widest">
                  Return_Frequency
                </label>
                <input
                  name="from_email"
                  type="email"
                  required
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent border-b-2 border-white/20 p-3 font-mono text-sm text-white focus:outline-none transition-colors duration-300 placeholder:text-white/20"
                  placeholder="your@email.com"
                />
                <div className="absolute bottom-0 left-0 h-[2px] bg-spider-cyan transition-all duration-500"
                  style={{ width: focused === "email" ? "100%" : "0%" }} />
              </div>

              <div className="relative">
                <label className="block font-mono text-[10px] font-bold text-spider-cyan uppercase mb-2 tracking-widest">
                  The_Message
                </label>
                <textarea
                  name="message"
                  rows="5"
                  required
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-white/5 border-2 border-white/10 p-3 font-mono text-sm text-white focus:outline-none transition-colors duration-300 resize-none placeholder:text-white/20"
                  placeholder="What's on your mind?"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className={`relative w-full bg-spider-magenta text-white font-comic-title text-2xl py-4 uppercase border-4 border-black flex items-center justify-center gap-3 transition-all duration-300 shadow-[6px_6px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-x-1 hover:translate-y-1 z-10 ${style}`}
              >
                {label} <Send className="w-5 h-5" strokeWidth={3} />
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT: INFO (2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <ContactCard icon={Mail} label="Email" detail="datilesjhodel.io@gmail.com" accent="cyan" />
          <ContactCard icon={Phone} label="Phone" detail="+63 962 398 9406" accent="yellow" />

          {/* SOCIAL GRID */}
          <div className="border-4 border-black bg-black p-6 relative shadow-[6px_6px_0px_black]">
            <div className="absolute inset-0 bg-spider-magenta translate-x-2 translate-y-2 -z-10" />
            <p className="font-mono text-[10px] text-spider-magenta uppercase tracking-[0.3em] mb-4">
              // social_media_presence
            </p>
            <div className="grid grid-cols-3 gap-3">
              <SocialIcon icon={Github} link="https://github.com/JhodelDatiles" label="Github" hoverBg="hover:bg-white hover:text-black" />
              <SocialIcon icon={Linkedin} link="https://www.linkedin.com/in/jhodel-datiles-155368393/" label="LinkedIn" hoverBg="hover:bg-[#0077b5] hover:text-white" />
              <SocialIcon icon={Facebook} link="https://www.facebook.com/jhdldtls" label="Facebook" hoverBg="hover:bg-[#1877f2] hover:text-white" />
              <SocialIcon icon={Messenger} link="https://www.messenger.com/t/1146246402/" label="Messenger" hoverBg="hover:bg-[#00B2FF] hover:text-white" />
              <SocialIcon icon={Instagram} link="https://www.instagram.com/jhdldtls/" label="Instagram" hoverBg="hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white" />
            </div>
          </div>

          <div className="text-center border-4 border-black bg-spider-yellow p-5 rotate-1 shadow-[4px_4px_0px_black] mt-auto">
            <p className="font-comic-title text-black uppercase text-xl italic leading-tight">
              Don't be a stranger!
            </p>
            <p className="font-mono text-[10px] text-black/60 mt-1 uppercase tracking-widest">
              Will Response within 24hrs
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactCard = ({ icon: Icon, label, detail, accent }) => {
  const accentMap = {
    cyan:   { bg: "bg-spider-cyan",   text: "text-spider-cyan" },
    yellow: { bg: "bg-spider-yellow", text: "text-spider-yellow" },
  };
  const { bg, text } = accentMap[accent] || accentMap.cyan;

  return (
    <div className="border-4 border-black bg-[#0a0a0a] p-5 relative group hover:-translate-y-1 transition-transform shadow-[4px_4px_0px_black]">
      <div className={`absolute inset-0 ${bg} translate-x-2 translate-y-2 -z-10 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform`} />
      <div className="flex items-center gap-4">
        <div className={`border-2 border-black ${bg} p-2`}><Icon className="w-5 h-5 text-black" strokeWidth={3} /></div>
        <div>
          <p className={`font-mono text-[10px] uppercase tracking-widest ${text}`}>{label}</p>
          <p className="font-mono text-sm text-white truncate">{detail}</p>
        </div>
      </div>
    </div>
  );
};

const SocialIcon = ({ icon: Icon, link, label, hoverBg }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className={`border-4 border-black bg-white/5 text-white flex items-center justify-center py-4 transition-all hover:-translate-y-1 shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-1 ${hoverBg}`}>
    <Icon className="w-5 h-5" />
  </a>
);

export default ContactSection;