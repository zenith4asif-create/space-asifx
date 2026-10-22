import { VIDEO_SOURCES } from '../data/videoConfig';
import { SmartVideoPlayer } from './SmartVideoPlayer';
import { ChevronDown, Sparkles, Orbit, ArrowRight } from 'lucide-react';

interface IntroHeroSectionProps {
  onOpenResearcher?: () => void;
}

export function IntroHeroSection({ onOpenResearcher }: IntroHeroSectionProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="intro"
      className="relative min-h-screen w-full pt-20 pb-16 px-4 sm:px-8 lg:px-12 border-b border-white/5 bg-transparent flex items-center justify-center overflow-hidden"
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[170px] opacity-25 bg-sky-500 pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col gap-10">
        
        {/* Top Watermark in Liquid Glass */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-3 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-white font-bold tracking-widest uppercase">
              SOLARIS EXPEDITION DECK
            </span>
            <span className="text-white/30">|</span>
            <span className="text-cyan-400">MISSION CLOCK ACTIVE</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden sm:inline">COSMIC SECTOR: SOL HELIOSPHERE</span>
            <span className="text-cyan-300 font-mono">1.0 AU REGION</span>
          </div>
        </div>

        {/* Side-by-Side 3D Layout (Text NEVER overrides Video) */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 my-auto">
          
          {/* ========================================================
              SIDE 1: SMART 3D SOLAR SYSTEM OVERVIEW (Auto Loop On View)
             ======================================================== */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center order-1 lg:order-2">
            <SmartVideoPlayer
              videoUrl={VIDEO_SOURCES.overview}
              name="SOLAR SYSTEM OVERVIEW"
              accentColor="#38bdf8"
              aspectClass="max-w-[480px] sm:max-w-[520px] aspect-square"
            />
          </div>

          {/* ========================================================
              SIDE 2: MONUMENTAL TITLE & NARRATIVE (Beside Video)
             ======================================================== */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center order-2 lg:order-1">
            
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-cyan-400">
                <Sparkles size={14} />
                <span>Cosmic Neighborhood Voyage</span>
              </div>
              <span className="text-white/40">·</span>
              <button
                onClick={onOpenResearcher}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full liquid-glass text-[11px] font-mono text-white hover:bg-white/15 transition-colors cursor-pointer shadow-sm"
                title="View Researcher Profile"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>ASIF ANSARI (Researcher)</span>
              </button>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase mb-4 drop-shadow-xl leading-none">
              THE SOLAR SYSTEM
            </h1>

            <p className="text-base sm:text-xl font-light text-slate-100 tracking-wide max-w-xl mb-6 leading-relaxed drop-shadow">
              Explore 8 magnificent planetary realms and the dynamic mechanics that govern our interstellar journey across the Milky Way.
            </p>

            {/* Feature Telemetry Strips in Liquid Glass */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="p-3.5 rounded-2xl liquid-glass">
                <div className="text-[10px] font-mono text-slate-300 uppercase">HELIOCENTRIC ARCHITECTURE</div>
                <div className="text-base font-bold text-white font-mono mt-0.5">8 Major Worlds</div>
                <div className="text-[11px] text-slate-300">1 G-type Star · 288+ Moons</div>
              </div>

              <div className="p-3.5 rounded-2xl liquid-glass">
                <div className="text-[10px] font-mono text-slate-300 uppercase">STREAMING ENGINE</div>
                <div className="text-base font-bold text-cyan-300 font-mono mt-0.5">Smart In-View Loop</div>
                <div className="text-[11px] text-slate-300">Cloudinary Ultra-HD CDN</div>
              </div>
            </div>

            {/* Interactive Primary Actions in Liquid Glass */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollTo('orbital-motion')}
                className="px-6 py-3 rounded-2xl bg-cyan-500/80 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider font-mono transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/30 cursor-pointer"
              >
                <span>Initiate Expedition</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={() => scrollTo('mercury')}
                className="px-5 py-3 rounded-2xl liquid-glass hover:bg-white/15 text-white font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Jump to Mercury</span>
                <ChevronDown size={14} />
              </button>
            </div>

          </div>

        </div>

        {/* Bottom Explorer Strip */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <Orbit size={13} className="text-cyan-400" />
            <span>MERCURY · VENUS · EARTH · MARS · JUPITER · SATURN · URANUS · NEPTUNE</span>
          </div>
          <div>ACTIVE 3D VOYAGE</div>
        </div>

      </div>
    </section>
  );
}
