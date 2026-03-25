import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';

// Placeholder for your project detail pages
// You can create a single 'ProjectDetail.jsx' and pass IDs to it later
const ProjectDetail = ({ title }) => (
  <div className="min-h-screen bg-base-100 flex items-center justify-center p-10">
    <div className="border-4 border-black p-10 bg-white text-black shadow-[10px_10px_0px_black]">
      <h1 className="font-comic-title text-6xl uppercase mb-4">{title}</h1>
      <p className="font-mono">PROJECT_LOG_RECOVERED: Content incoming...</p>
      <button 
        onClick={() => window.history.back()} 
        className="mt-8 bg-spider-magenta text-white px-6 py-2 font-black uppercase hover:scale-105 transition-transform"
      >
        ◀ Back to Universe
      </button>
    </div>
  </div>
);

function App() {
  return (
    <Routes>
      {/* The Main Portfolio Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Specific Routes for your Experience Cards */}
      <Route path="/experience/sparkle-qa" element={<ProjectDetail title="Sparkle QA Log" />} />
      <Route path="/experience/ipaskil" element={<ProjectDetail title="iPaskil Archive" />} />
      <Route path="/experience/qa-automation" element={<ProjectDetail title="Automation Data" />} />
      <Route path="/experience/ux-analysis" element={<ProjectDetail title="UX Research" />} />
    </Routes>
  );
}

export default App;