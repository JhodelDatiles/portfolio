import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProjectDocumentation = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  // This is where you'll eventually store your project data
  // For now, it's a template for your QA and Dev projects
  return (
    <div className="min-h-screen bg-[#f4f1ea] text-black font-sans selection:bg-spider-magenta selection:text-white">
      {/* Navigation Header */}
      <nav className="border-b-4 border-black p-6 bg-white flex justify-between items-center sticky top-0 z-50">
        <button 
          onClick={() => navigate('/')}
          className="font-comic-title uppercase text-xl hover:text-spider-magenta transition-colors"
        >
          ◀ Return to Universe
        </button>
        <span className="font-mono text-sm font-bold opacity-50">LOG_ID: {projectId?.toUpperCase()}</span>
      </nav>

      <main className="max-w-4xl mx-auto py-16 px-6">
        {/* Project Header */}
        <header className="mb-12">
          <div className="inline-block bg-black text-white px-4 py-1 mb-4 rotate-[-1deg] font-mono text-sm">
            CLASSIFIED // PROJECT_FILES
          </div>
          <h1 className="text-6xl md:text-8xl font-comic-title uppercase leading-none border-b-8 border-black pb-4">
            {projectId?.replace('-', ' ')}
          </h1>
        </header>

        {/* Documentation Content */}
        <div className="grid md:grid-cols-3 gap-12">
          
          {/* Left Column: Stats & Stack */}
          <div className="md:col-span-1 space-y-8">
            <section className="border-4 border-black p-4 bg-spider-yellow/10 shadow-[4px_4px_0px_black]">
              <h2 className="font-comic-title uppercase text-xl mb-3 border-b-2 border-black">Tools Used</h2>
              <ul className="font-mono text-sm space-y-1">
                <li>▶ React.js</li>
                <li>▶ Tailwind CSS</li>
                <li>▶ Playwright</li>
              </ul>
            </section>
          </div>

          {/* Right Column: The "Story" */}
          <div className="md:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-comic-title uppercase mb-4 text-spider-magenta">The Objective</h2>
              <p className="text-lg leading-relaxed border-l-4 border-black pl-4 italic">
                Summarize what this project was meant to achieve here.
              </p>
            </section>

            <section className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_black] relative overflow-hidden">
               {/* Decorative Ben-Day Dots */}
               <div className="absolute inset-0 bg-spider-dots opacity-[0.03] pointer-events-none" />
               
               <h2 className="text-3xl font-comic-title uppercase mb-4 flex items-center gap-2">
                 <span className="w-8 h-8 bg-black text-white flex items-center justify-center rotate-45 text-sm">!</span>
                 Problems Encountered
               </h2>
               <p className="font-medium text-gray-700">
                 Detail the technical hurdles or bugs you found during development or QA testing.
               </p>
            </section>

            <section>
              <h2 className="text-3xl font-comic-title uppercase mb-4 text-spider-cyan">The Resolution</h2>
              <p className="text-lg leading-relaxed">
                Explain your problem-solving process. How did you debug the issue? What architecture did you use to fix it?
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDocumentation;