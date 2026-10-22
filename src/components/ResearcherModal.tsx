import { X, Dna, Droplets, Rocket, ShieldAlert, Award, ExternalLink } from 'lucide-react';

interface ResearcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResearcherModal({ isOpen, onClose }: ResearcherModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-2xl animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-2xl liquid-glass rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glowing Background Nebula */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full liquid-glass hover:bg-white/20 text-white transition-colors cursor-pointer"
          aria-label="Close Researcher Profile"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 p-0.5 shadow-lg shadow-cyan-500/20 shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-300 font-bold font-mono text-xl">
              AA
            </div>
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center gap-1.5 mb-1">
              <Award size={13} />
              <span>Project Architect & Lead Developer</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              ASIF ANSARI
            </h3>
            <p className="text-xs font-mono text-slate-400 mt-0.5">
              Independent Researcher · Biology · Aqua · Space Systems
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="liquid-glass-subtle rounded-2xl p-4 sm:p-5 mb-6 text-xs sm:text-sm text-slate-100 leading-relaxed font-light">
          <p>
            Pioneering cutting-edge innovations at the convergence of <strong className="text-cyan-300 font-medium">marine biology, aquatic ecosystems, and astronautical science</strong>. Focused on safeguarding humanity against dangerous existential biological hazards and designing next-generation closed-loop survival biospheres for interplanetary colonization.
          </p>
        </div>

        {/* 3 Research Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          
          <div className="liquid-glass-subtle rounded-2xl p-3.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 mb-2">
              <Dna size={16} />
            </div>
            <div className="text-xs font-bold text-white mb-1">Synthetic Biology</div>
            <p className="text-[11px] text-slate-300 leading-normal">
              Genetic resilience, cellular repair, and defense against virulent environmental pathogen vectors.
            </p>
          </div>

          <div className="liquid-glass-subtle rounded-2xl p-3.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 mb-2">
              <Droplets size={16} />
            </div>
            <div className="text-xs font-bold text-white mb-1">Aqua Hydrospheres</div>
            <p className="text-[11px] text-slate-300 leading-normal">
              Deep-sea life support models, water purification cycles, and aquatic biomass sustenance.
            </p>
          </div>

          <div className="liquid-glass-subtle rounded-2xl p-3.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 mb-2">
              <Rocket size={16} />
            </div>
            <div className="text-xs font-bold text-white mb-1">Deep Space Systems</div>
            <p className="text-[11px] text-slate-400 leading-normal">
              Radiation shielding, planetary colonization architectures, and human life preservation.
            </p>
          </div>

        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-4 border-t border-slate-800/80">
          <span>FUTURE INNOVATION INITIATIVE · SOL EXPLORATION</span>
          <button
            onClick={onClose}
            className="text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
          >
            RETURN TO EXPEDITION
          </button>
        </div>

      </div>
    </div>
  );
}
