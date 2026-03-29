import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import CalculatingText from "../../components/CalculatingText";

const ProjectsSection = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f8f8] text-black font-mono selection:bg-red-600 selection:text-white p-4 md:p-10">
      
      {/* ── TOP NAV ── */}
      <nav className="max-w-5xl mx-auto flex justify-between items-center mb-12 opacity-50 text-[10px] font-bold">
        <button onClick={() => navigate('/')} className="hover:text-red-600 tracking-tighter">[ ESC_TO_ARCHIVES ]</button>
        <span>REPORT_ID: {projectId?.toUpperCase()} // 2026</span>
      </nav>

      <main className="max-w-5xl mx-auto">
        
        {/* ── HEADER ── */}
        <div className="mb-10">
          <h1 className="text-4xl font-permanent-marker uppercase tracking-tight text-red-600">
            Project_Audit: {projectId?.replace('-', ' ')}
          </h1>
          <p className="text-[10px] opacity-40 mt-1">LOGGED_BY: RALPH_JUSTINE_GALLENTES // STATUS: FINAL_REVIEW</p>
        </div>

        {/* ── THE AUDIT TABLE ── */}
        <div className="border-2 border-black overflow-hidden bg-white shadow-[8px_8px_0px_rgba(0,0,0,0.05)]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-black bg-black text-white text-[11px] uppercase tracking-widest">
                <th className="p-4 text-left w-1/4 border-r border-white/20">Category</th>
                <th className="p-4 text-left w-1/4 border-r border-white/20">Technical_Data</th>
                <th className="p-4 text-left">Internal_Notes</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              
              {/* ROW 01: THE MISSION */}
              <tr className="border-b border-black/10">
                <td className="p-4 font-black bg-black/5 border-r border-black/10 uppercase">01. Objective</td>
                <td className="p-4 border-r border-black/10 italic">Core Mission & Logic</td>
                <td className="p-4 font-marker-print text-sm text-blue-800">
                  <CalculatingText text="This project was built to solve specific UI/UX gaps in multi-vendor systems." delay={400} />
                </td>
              </tr>

              {/* ROW 02: TECH STACK */}
              <tr className="border-b border-black/10">
                <td className="p-4 font-black bg-black/5 border-r border-black/10 uppercase">02. Stack_Tools</td>
                <td className="p-4 border-r border-black/10">
                   <div className="flex flex-wrap gap-1">
                      {["React", "Node.js", "MongoDB"].map(t => (
                        <span key={t} className="bg-black text-white px-1 py-0.5 text-[9px]">{t}</span>
                      ))}
                   </div>
                </td>
                <td className="p-4 font-marker-print text-sm text-blue-800">
                   MERN stack remains the most stable for this architecture.
                </td>
              </tr>

              {/* ROW 03: QA ANOMALIES */}
              <tr className="border-b border-black/10 bg-red-50/30">
                <td className="p-4 font-black bg-black/5 border-r border-black/10 uppercase text-red-600">03. QA_Anomalies</td>
                <td className="p-4 border-r border-black/10 italic">Bug Report (Playwright)</td>
                <td className="p-4 font-marker-print text-sm text-red-700">
                  Detected race conditions in the checkout flow during high-latency simulation.
                </td>
              </tr>

              {/* ROW 04: DEPLOYMENT */}
              <tr>
                <td className="p-4 font-black bg-black/5 border-r border-black/10 uppercase">04. Resolution</td>
                <td className="p-4 border-r border-black/10">Vercel / AWS S3</td>
                <td className="p-4 font-marker-print text-sm text-blue-800">
                   Fully optimized. Assets served via Cloudinary.
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* ── VISUAL ARTIFACTS ── */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
           {[1, 2].map((i) => (
             <div key={i} className="border-2 border-black p-1 bg-white hover:-translate-y-1 transition-transform">
                <div className="bg-gray-100 aspect-video mb-1" />
                <p className="text-[8px] text-center font-bold opacity-30">EVIDENCE_FIG_{i}</p>
             </div>
           ))}
        </div>

        {/* ── FOOTER ── */}
        <footer className="mt-20 flex justify-between items-end border-t border-black/10 pt-6">
           <div className="space-y-1">
             <div className="w-32 h-10 border border-black/20 flex items-center justify-center italic text-[10px] opacity-30">
                [ SIGNATURE_REQUIRED ]
             </div>
             <p className="text-[9px] font-bold">QA_LEAD_DATILES</p>
           </div>
           <p className="text-[9px] opacity-20 uppercase tracking-[0.4em]">Confidential_Report_End</p>
        </footer>
      </main>
    </div>
  );
};

export default ProjectsSection;