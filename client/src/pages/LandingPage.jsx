import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

function LandingPage() {
  const [activeSection, setActiveSection] = useState("home");

  // Scroll Spy Logic
  useEffect(() => {
    const sectionIds = ["home", "stack", "experience", "projects", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }, // Update active state when 60% of section is visible
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-base-100 text-base-content min-h-screen transition-colors duration-500 selection:bg-primary selection:text-primary-content">
      {/* Passing both state and setter to Navbar */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="max-w-6xl mx-auto px-6">
        {/* HERO SECTION */}
        <HeroSection/>

        {/* OTHER SECTIONS */}
        <section id="stack" className="min-h-screen py-24">
          <h2 className="text-4xl font-bold mb-10">Stack & Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["MongoDB", "Express", "React", "Node.js"].map((tech) => (
              <div
                key={tech}
                className="p-6 bg-base-200 rounded-2xl text-center font-bold border border-base-300"
              >
                {tech}
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE, PROJECTS... */}
        <section id="experience" className="min-h-screen py-24">
          <h2 className="text-4xl font-bold">Work Experience</h2>
        </section>

        {/* CONTACT FORM */}
        <section
          id="contact"
          className="min-h-screen py-24 flex items-center justify-center"
        >
          <div className="w-full max-w-md bg-base-200 p-8 rounded-3xl border border-base-300 shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Let's Connect
            </h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full bg-base-100 focus:outline-primary"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="input input-bordered w-full bg-base-100 focus:outline-primary"
              />
              <textarea
                placeholder="Your Message"
                className="textarea textarea-bordered w-full bg-base-100 h-32 focus:outline-primary"
              ></textarea>
              <button className="btn btn-primary w-full shadow-lg">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;
