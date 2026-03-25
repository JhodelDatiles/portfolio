import React from "react";
import ExperienceCard from "./ExperienceCard";

const ExperienceTimeline = () => {
  const experiences = [
    {
      to: "/experience/sparkle-qa",
      title: "QA Intern",
      subtitle: "Sparkle Star International // Duration: Jan - Apr 2026",
      description: `Working in a fast-paced Agile environment, conducting manual and exploratory testing during short sprint cycles to identify functional defects and usability issues that automated tools often miss. By documenting bugs with clear reproduction steps and severity levels, our team provided developers with the necessary insights to resolve issues efficiently. My role also involved close collaboration with the development team to validate fixes and verify individual components through unit testing, ensuring total system stability before every release.`,
      highlights: ["QA Tester", "Manual Testing"],
      side: "left", // We'll use this to push the card left or right
      offsetColor: "bg-spider-magenta",
    },
    {
      to: "Coming Soon...",
      title: "Coming Soon...",
      subtitle: "Coming Soon...",
      description: `Coming soon...`,
      highlights: ["Coming Soon..."],
      side: "right", // We'll use this to push the card left or right
      offsetColor: "bg-spider-magenta",
    },
  ];

  return (
    <div className="relative max-w-5xl mx-auto py-0 px-6">
      {/* --- THE TIMELINE LINE (The "Spider-String") --- */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-black -translate-x-1/2 z-0">
        {/* Subtle glowing pulse on the line */}
        <div className="absolute inset-0 bg-spider-magenta blur-sm opacity-30 animate-pulse" />
      </div>

      <div className="space-y-24 relative z-10">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className={`flex w-full items-center justify-between ${
              exp.side === "right" ? "flex-row-reverse" : ""
            }`}
          >
            {/* The Card Container (Takes up roughly half the width) */}
            <div className="w-[45%]">
              <ExperienceCard
                {...exp}
                // We override the absolute positioning here for the timeline
                top="relative"
                left="auto"
                right="auto"
              />
            </div>

            {/* The Timeline Node (The "Bullet" in the middle) */}
            <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 border-4 border-black bg-spider-yellow rotate-45 group-hover:scale-125 transition-transform" />

            {/* Empty space for the other side */}
            <div className="w-[50%]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;
