import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Shield,
  AlertTriangle,
  ExternalLink,
  CheckCircle,
  Clock,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from "lucide-react";
import PROJECT_DATA from "../ProjectData";

// ─────────────────────────────────────────────
//  STATUS BADGE
// ─────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const config = {
    resolved: {
      icon: CheckCircle,
      label: "Resolved",
      color: "text-green-400",
      border: "border-green-400/40",
      bg: "bg-green-400/10",
    },
    open: {
      icon: AlertTriangle,
      label: "Open",
      color: "text-spider-red",
      border: "border-spider-red/40",
      bg: "bg-spider-red/10",
    },
    pending: {
      icon: Clock,
      label: "Pending",
      color: "text-spider-yellow",
      border: "border-spider-yellow/40",
      bg: "bg-spider-yellow/10",
    },
  };
  const {
    icon: Icon,
    label,
    color,
    border,
    bg,
  } = config[status] ?? config.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-1 border ${border} ${bg} ${color} text-[10px] font-black uppercase tracking-widest`}
    >
      <Icon size={10} strokeWidth={3} />
      {label}
    </span>
  );
};

// ─────────────────────────────────────────────
//  LIGHTBOX
// ─────────────────────────────────────────────
const Lightbox = ({ images, startIndex, reportId, onClose }) => {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % images.length),
    [images.length],
  );

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col items-center max-w-5xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── TOP BAR ── */}
        <div className="w-full flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-spider-magenta rotate-45" />
            <span className="font-mono text-[10px] text-spider-cyan uppercase tracking-[0.3em]">
              {reportId} // Evidence_Fig_{current + 1}_of_{images.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="border-2 border-white/20 p-1.5 text-white/50 hover:border-spider-red hover:text-spider-red transition-all active:scale-95"
            aria-label="Close lightbox"
          >
            <X size={16} strokeWidth={3} />
          </button>
        </div>

        {/* ── MAIN IMAGE ── */}
        <div className="relative w-full border-4 border-white/20 bg-black overflow-hidden shadow-[0_0_60px_rgba(255,0,255,0.2)]">
          {/* Magenta offset layer */}
          <div className="absolute inset-0 border-4 border-spider-magenta translate-x-1 translate-y-1 -z-10 opacity-40 pointer-events-none" />
          <img
            src={images[current]}
            alt={`Evidence ${current + 1}`}
            className="w-full max-h-[70vh] object-contain"
          />
          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)",
            }}
          />
        </div>

        {/* ── CONTROLS ── */}
        {images.length > 1 && (
          <div className="flex items-center gap-6 mt-6">
            <button
              onClick={prev}
              className="group flex items-center gap-2 border-2 border-white/20 px-4 py-2 text-white/50 hover:border-spider-cyan hover:text-spider-cyan transition-all active:scale-95"
            >
              <ChevronLeft
                size={16}
                strokeWidth={3}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Prev
              </span>
            </button>

            {/* Diamond dot indicators */}
            <div className="flex items-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rotate-45 transition-all ${
                    i === current
                      ? "bg-spider-cyan scale-125"
                      : "bg-white/20 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="group flex items-center gap-2 border-2 border-white/20 px-4 py-2 text-white/50 hover:border-spider-cyan hover:text-spider-cyan transition-all active:scale-95"
            >
              <span className="text-[10px] font-black uppercase tracking-widest">
                Next
              </span>
              <ChevronRight
                size={16}
                strokeWidth={3}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        )}

        <p className="mt-4 text-[9px] text-white/20 uppercase tracking-widest font-mono">
          ← → Arrow keys to navigate &nbsp;·&nbsp; Esc to close
        </p>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
//  PROOF THUMBNAILS — table cell
// ─────────────────────────────────────────────
const ProofCell = ({ images, reportId, onOpenLightbox }) => {
  if (!images || images.length === 0) {
    return (
      <div className="p-3 flex items-center justify-center h-full">
        <span className="text-[8px] text-white/25 italic font-black uppercase tracking-widest border border-dashed border-white/15 px-2 py-1">
          No_Artifact
        </span>
      </div>
    );
  }

  return (
    <div className="p-2 flex flex-wrap gap-1.5 items-start content-start">
      {images.map((img, idx) => (
        <button
          key={idx}
          onClick={() => onOpenLightbox(images, idx, reportId)}
          className="relative w-14 h-14 shrink-0 group/thumb border border-white/20 hover:border-spider-cyan transition-all overflow-hidden focus:outline-none focus:ring-2 focus:ring-spider-cyan"
          aria-label={`Open evidence screenshot ${idx + 1}`}
        >
          <img
            src={img}
            alt={`Evidence ${idx + 1}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-110"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
            <ZoomIn size={14} className="text-spider-cyan" strokeWidth={3} />
          </div>
          {/* Index badge */}
          <div className="absolute bottom-0 right-0 bg-black/80 px-1 text-[8px] font-black text-white/50">
            {idx + 1}
          </div>
        </button>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────
const ProjectsSection = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [lightbox, setLightbox] = useState(null);
  const openLightbox = useCallback((images, index, reportId) => {
    setLightbox({ images, index, reportId });
  }, []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  // ── Espyreal 404 fix ──────────────────────────────────────────────────────
  // Espyreal is in progress; route it to ekomers data until its own data is ready.
  // To fix properly later: add an "espyreal" key to ProjectData.js.
  const resolvedId = projectId === "espyreal" ? "ekomers" : projectId;
  const project = PROJECT_DATA[resolvedId] ?? null;

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono">
        <div className="text-center space-y-4">
          <p className="text-spider-red text-6xl font-comic-title">404</p>
          <p className="text-white/40 text-sm uppercase tracking-widest">
            Project Not Found
          </p>
          <button
            onClick={() => navigate("/")}
            className="border-2 border-spider-cyan text-spider-cyan px-6 py-2 text-xs uppercase tracking-widest hover:bg-spider-cyan hover:text-black transition-all"
          >
            Return to Archives
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.index}
          reportId={lightbox.reportId}
          onClose={closeLightbox}
        />
      )}

      <div className="min-h-screen bg-black text-white font-mono selection:bg-spider-yellow selection:text-black relative overflow-x-hidden pb-20">
        {/* Background Textures */}
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
        <div className="fixed top-0 left-0 w-1 h-full bg-spider-magenta opacity-60 z-10" />
        <div className="fixed top-0 right-0 w-1 h-full bg-spider-cyan opacity-60 z-10" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 py-8">
          {/* ── TOP NAV ── */}
          <nav className="flex justify-between items-center mb-12">
            <button
              onClick={() => navigate("/")}
              className="group flex items-center gap-3 border-2 border-white/20 px-4 py-2 text-white/50 hover:text-white hover:border-spider-cyan transition-all duration-150 active:scale-95"
            >
              <ArrowLeft
                size={16}
                strokeWidth={3}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span className="text-[10px] uppercase tracking-widest font-bold">
                Esc_To_Archives
              </span>
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
            <div className="absolute inset-0 bg-spider-magenta translate-x-3 translate-y-3 -z-10 opacity-30" />
            <div className="border-4 border-white bg-black p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-spider-yellow border-l-4 border-b-4 border-white flex items-center justify-center">
                <Shield className="w-8 h-8 text-black" strokeWidth={3} />
              </div>
              <p className="font-mono text-[10px] text-spider-cyan uppercase tracking-[0.4em] mb-2">
                // project_audit_initialized
              </p>
              <h1 className="font-comic-title text-5xl md:text-7xl uppercase text-white leading-none tracking-tighter relative">
                <span className="relative z-10">{project.title}</span>
                <span
                  className="absolute top-0.5 left-0.5 text-spider-magenta -z-10 opacity-60 italic"
                  aria-hidden="true"
                >
                  {project.title}
                </span>
                <span
                  className="absolute -top-0.5 -left-0.5 text-spider-cyan -z-20 opacity-50"
                  aria-hidden="true"
                >
                  {project.title}
                </span>
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] text-white/40 uppercase tracking-widest">
                    Status: Final_Review
                  </span>
                </div>
                <div className="w-0.5 h-4 bg-white/20" />
                <span className="text-[10px] text-spider-magenta uppercase tracking-widest">
                  QA_Lead: Datiles
                </span>
              </div>
            </div>
          </div>

          {/* ── LIVE LINK ── */}
          {project.liveUrl && project.liveUrl !== "#" && (
            <div className="mb-8">
              <p className="font-mono text-[10px] text-spider-magenta uppercase tracking-[0.3em] mb-3">
                // live_deployment
              </p>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border-2 border-spider-cyan px-5 py-3 text-spider-cyan hover:bg-spider-cyan hover:text-black transition-all duration-150 active:scale-95 relative"
              >
                <div className="absolute inset-0 bg-spider-cyan translate-x-1 translate-y-1 -z-10 opacity-20 group-hover:opacity-0 transition-opacity" />
                <ExternalLink
                  size={14}
                  strokeWidth={3}
                  className="group-hover:rotate-12 transition-transform"
                />
                <span className="text-[11px] font-black uppercase tracking-widest">
                  {project.liveUrl}
                </span>
              </a>
            </div>
          )}

          {/* ── DESCRIPTION ── */}
          <div className="mb-10 relative">
            <p className="font-mono text-[10px] text-spider-cyan uppercase tracking-[0.3em] mb-3">
              // project_brief
            </p>
            <div className="relative border-l-4 border-spider-magenta pl-6 py-2">
              <div className="absolute inset-0 bg-spider-magenta/5" />
              <p className="text-white/80 text-sm leading-relaxed font-mono italic relative z-10">
                {project.description}
              </p>
            </div>
          </div>

          {/* ── TECH STACK ── */}
          <div className="mb-10">
            <p className="font-mono text-[10px] text-spider-yellow uppercase tracking-[0.3em] mb-3">
              // tools_and_tech_stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech, i) => (
                <span
                  key={i}
                  className="bg-spider-yellow text-black px-3 py-1 text-[10px] font-black uppercase border-2 border-black tracking-widest shadow-[3px_3px_0px_rgba(255,0,255,0.5)] hover:-translate-y-0.5 transition-transform cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* ── FEATURES ── */}
          {project.features && project.features.length > 0 && (
            <div className="mb-12">
              <p className="font-mono text-[10px] text-spider-cyan uppercase tracking-[0.3em] mb-3">
                // project_features
              </p>
              <div className="relative border-4 border-white/10 bg-white/[0.02] p-6">
                <div className="absolute inset-0 bg-spider-cyan translate-x-2 translate-y-2 -z-10 opacity-10" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <div className="mt-1 w-2 h-2 bg-spider-magenta rotate-45 shrink-0 group-hover:bg-spider-yellow transition-colors" />
                      <p className="text-white/70 text-xs leading-relaxed group-hover:text-white transition-colors">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── QA BUG REPORT TABLE ── */}
          <div className="mb-12">
            <p className="font-mono text-[10px] text-spider-red uppercase tracking-[0.3em] mb-2">
              // qa_bug_report_log_with_artifacts
            </p>
            <p className="text-[9px] text-white/20 uppercase tracking-widest font-mono mb-3 text-right">
              ← scroll horizontally if needed →
            </p>

            <div className="relative">
              <div className="absolute inset-0 bg-spider-red translate-x-3 translate-y-3 -z-10 opacity-20" />
              <div className="border-4 border-white overflow-x-auto">
                {/* Table Header */}
                <div className="grid grid-cols-[70px_1.2fr_1fr_1fr_90px_160px] bg-white text-black text-[9px] uppercase tracking-widest font-black min-w-[900px]">
                  {[
                    "ID",
                    "Steps to Reproduce",
                    "Expected Result",
                    "Actual Result",
                    "Status",
                    "Visual Proof",
                  ].map((h, i) => (
                    <div
                      key={i}
                      className={`p-3 ${i < 5 ? "border-r-2 border-black/20" : ""}`}
                    >
                      {h}
                    </div>
                  ))}
                </div>

                {/* Table Rows */}
                {project.qaReports.map((row) => (
                  <div
                    key={row.id}
                    className={`grid grid-cols-[70px_1.2fr_1fr_1fr_90px_160px] border-t-2 min-w-[900px] text-[11px] transition-colors
                      ${
                        row.status === "open"
                          ? "border-spider-red/30 bg-spider-red/5"
                          : row.status === "pending"
                            ? "border-spider-yellow/20 bg-spider-yellow/[0.03]"
                            : "border-white/10"
                      }`}
                  >
                    {/* ID */}
                    <div className="p-3 border-r-2 border-white/10 flex items-start">
                      <span className="font-black text-spider-yellow text-[10px] tracking-wider">
                        {row.id}
                      </span>
                    </div>

                    {/* Steps */}
                    <div className="p-3 border-r-2 border-white/10 text-white/60 whitespace-pre-line leading-relaxed">
                      {row.steps}
                    </div>

                    {/* Expected */}
                    <div className="p-3 border-r-2 border-white/10 text-spider-cyan leading-relaxed">
                      {row.expected}
                    </div>

                    {/* Actual */}
                    <div
                      className={`p-3 border-r-2 border-white/10 leading-relaxed ${
                        row.status === "open"
                          ? "text-spider-red"
                          : row.status === "pending"
                            ? "text-spider-yellow/70"
                            : "text-white/40 line-through"
                      }`}
                    >
                      {row.actual}
                    </div>

                    {/* Status */}
                    <div className="p-3 border-r-2 border-white/10 flex items-start">
                      <StatusBadge status={row.status} />
                    </div>

                    {/* Visual Proof */}
                    <ProofCell
                      images={row.images}
                      reportId={row.id}
                      onOpenLightbox={openLightbox}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── FOOTER ── */}
          {/* <footer className="border-t-4 border-white/20 pt-8 flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
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
          </footer> */}
        </div>

        {/* Bottom Color Stripe */}
        <div className="w-full h-2 flex mt-8">
          <div className="flex-1 bg-spider-magenta" />
          <div className="flex-1 bg-spider-yellow" />
          <div className="flex-1 bg-spider-cyan" />
          <div className="flex-1 bg-spider-red" />
          <div className="flex-1 bg-white" />
        </div>
      </div>
    </>
  );
};

export default ProjectsSection;
