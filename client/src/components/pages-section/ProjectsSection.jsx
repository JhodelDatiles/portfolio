import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Cpu, Zap, Globe, AlertTriangle } from "lucide-react";
import CalculatingText from "../CalculatingText";

const ProjectsSection = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-spider-yellow selection:text-black relative overflow-x-hidden">

      {/* ── BACKGROUND TEXTURES ── */}
      <div
        className="fixed inset-0 opacity-[0.04] pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      />
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, #00ffff 1px, transparent 1px), linear-gradient(to bottom, #00ffff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Side accent stripes */}
      <div className="fixed top-0 left-0 w-1 h-full bg-spider-magenta opacity-60 z-10" />
      <div className="fixed top-0 right-0 w-1 h-full bg-spider-cyan opacity-60 z-10" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 py-8">

        {/* ── TOP NAV ── */}
        <nav className="flex justify-between items-center mb-12">
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-3 border-2 border-white/20 px-4 py-2 text-white/50 hover:text-white hover:border-spider-cyan transition-all duration-150 active:scale-95"
          >
            <ArrowLeft size={16} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] uppercase tracking-widest font-bold">Esc_To_Archives</span>
          </button>

          <div className="flex items-center gap-2 border-2 border-white/10 px-3 py-2">
            <div className="w-2 h-2 bg-spider-yellow rotate-45" />
            <span className="text-[10px] uppercase tracking-widest text-white/30">
              Report_ID: {projectId?.toUpperCase()} // 2026
            </span>
          </div>
        </nav>

        {/* ── HEADER ── */}
        <div className="mb-12 relative">
          {/* Offset shadow block */}
          <div className="absolute inset-0 bg-spider-magenta translate-x-3 translate-y-3 -z-10 opacity-30" />
          <div className="border-4 border-white bg-black p-6 md:p-8 relative overflow-hidden">
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-spider-yellow border-l-4 border-b-4 border-white flex items-center justify-center">
              <Shield className="w-8 h-8 text-black" strokeWidth={3} />
            </div>

            <p className="font-mono text-[10px] text-spider-cyan uppercase tracking-[0.4em] mb-2">
              // project_audit_initialized
            </p>
            <h1 className="font-comic-title text-5xl md:text-7xl uppercase text-white leading-none tracking-tighter relative">
              <span className="relative z-10">
                {projectId?.replace("-", "_")}
              </span>
              {/* Glitch layers */}
              <span className="absolute top-0.5 left-0.5 text-spider-magenta -z-10 opacity-60 italic" aria-hidden="true">
                {projectId?.replace("-", "_")}
              </span>
              <span className="absolute -top-0.5 -left-0.5 text-spider-cyan -z-20 opacity-50" aria-hidden="true">
                {projectId?.replace("-", "_")}
              </span>
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] text-white/40 uppercase tracking-widest">Status: Final_Review</span>
              </div>
              <div className="w-0.5 h-4 bg-white/20" />
              <span className="text-[10px] text-spider-magenta uppercase tracking-widest">QA_Lead: Datiles</span>
            </div>
          </div>
        </div>

        {/* ── AUDIT TABLE ── */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-spider-cyan translate-x-3 translate-y-3 -z-10 opacity-20" />
          <div className="border-4 border-white overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-12 bg-white text-black text-[10px] uppercase tracking-widest font-black">
              <div className="col-span-3 p-4 border-r-2 border-black">Category</div>
              <div className="col-span-3 p-4 border-r-2 border-black">Technical_Data</div>
              <div className="col-span-6 p-4">Internal_Notes</div>
            </div>

            {/* Row 01 */}
            <AuditRow
              index="01"
              category="Objective"
              icon={Globe}
              iconColor="text-spider-cyan"
              data="Core Mission & Logic"
              note="This project was built to solve specific UI/UX gaps in multi-vendor systems."
              noteColor="text-spider-cyan"
              useCalculating
            />

            {/* Row 02 */}
            <AuditRow
              index="02"
              category="Stack_Tools"
              icon={Cpu}
              iconColor="text-spider-yellow"
              data={
                <div className="flex flex-wrap gap-1">
                  {["React", "Node.js", "MongoDB"].map((t) => (
                    <span
                      key={t}
                      className="bg-spider-yellow text-black px-2 py-0.5 text-[9px] font-black uppercase border border-black"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              }
              note="MERN stack remains the most stable for this architecture."
              noteColor="text-white/70"
            />

            {/* Row 03 — QA Anomalies (danger row) */}
            <AuditRow
              index="03"
              category="QA_Anomalies"
              icon={AlertTriangle}
              iconColor="text-spider-red"
              categoryColor="text-spider-red"
              data="Bug Report (Playwright)"
              note="Detected race conditions in the checkout flow during high-latency simulation."
              noteColor="text-spider-red"
              danger
            />

            {/* Row 04 */}
            <AuditRow
              index="04"
              category="Resolution"
              icon={Zap}
              iconColor="text-spider-magenta"
              data="Vercel / AWS S3"
              note="Fully optimized. Assets served via Cloudinary."
              noteColor="text-white/70"
              isLast
            />
          </div>
        </div>

        {/* ── VISUAL EVIDENCE ── */}
        <div className="mb-12">
          <p className="font-mono text-[10px] text-spider-magenta uppercase tracking-[0.3em] mb-4">
            // visual_artifacts
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="group border-2 border-white/20 p-1 bg-black hover:border-spider-cyan transition-all hover:-translate-y-1 relative"
              >
                <div className="absolute inset-0 bg-spider-cyan translate-x-1 translate-y-1 -z-10 opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="bg-white/5 aspect-video mb-2" />
                <p className="text-[8px] text-center font-bold text-white/20 uppercase tracking-widest">
                  Evidence_Fig_{i}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── FOOTER ── */}
        <footer className="border-t-4 border-white/20 pt-8 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-2">
            <p className="font-mono text-[9px] text-spider-cyan uppercase tracking-[0.3em]">
              // authorization_required
            </p>
            <div className="w-40 h-12 border-2 border-white/20 flex items-center justify-center italic text-[10px] text-white/20 hover:border-spider-yellow hover:text-spider-yellow transition-all cursor-pointer">
              [ Signature_Required ]
            </div>
            <p className="text-[9px] font-black text-white/50 uppercase tracking-widest">
              QA_Lead_Datiles
            </p>
          </div>

          <div className="text-right space-y-1">
            <p className="text-[9px] text-white/20 uppercase tracking-[0.4em]">
              Confidential_Report_End
            </p>
            <div className="flex items-center gap-2 justify-end">
              <div className="w-2 h-2 bg-spider-magenta rotate-45" />
              <div className="w-2 h-2 bg-spider-yellow rotate-45" />
              <div className="w-2 h-2 bg-spider-cyan rotate-45" />
            </div>
          </div>
        </footer>
      </div>

      {/* ── BOTTOM COLOR STRIPE ── */}
      <div className="w-full h-2 flex mt-8">
        <div className="flex-1 bg-spider-magenta" />
        <div className="flex-1 bg-spider-yellow" />
        <div className="flex-1 bg-spider-cyan" />
        <div className="flex-1 bg-spider-red" />
        <div className="flex-1 bg-white" />
      </div>
    </div>
  );
};

const AuditRow = ({
  index,
  category,
  icon: Icon,
  iconColor,
  categoryColor = "text-white",
  data,
  note,
  noteColor = "text-white/70",
  danger = false,
  isLast = false,
  useCalculating = false,
}) => (
  <div
    className={`grid grid-cols-12 border-t-2 text-xs transition-colors ${
      danger ? "border-spider-red/40 bg-spider-red/5" : "border-white/10"
    } ${!isLast ? "" : ""}`}
  >
    {/* Category */}
    <div className={`col-span-3 p-4 border-r-2 ${danger ? "border-spider-red/30" : "border-white/10"} flex items-start gap-2`}>
      <Icon size={14} className={`${iconColor} mt-0.5 shrink-0`} strokeWidth={2.5} />
      <div>
        <p className="text-[9px] text-white/30 uppercase tracking-widest mb-0.5">{index}</p>
        <p className={`font-black uppercase tracking-tight ${categoryColor}`}>{category}</p>
      </div>
    </div>

    {/* Technical data */}
    <div className={`col-span-3 p-4 border-r-2 ${danger ? "border-spider-red/30" : "border-white/10"} text-white/50 italic flex items-center`}>
      {typeof data === "string" ? data : data}
    </div>

    {/* Notes */}
    <div className={`col-span-6 p-4 font-mono ${noteColor} flex items-center`}>
      {useCalculating ? (
        <CalculatingText text={note} delay={400} speed={15} revealPerTick={2} />
      ) : (
        note
      )}
    </div>
  </div>
);

export default ProjectsSection;