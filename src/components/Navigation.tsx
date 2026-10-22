import { useState, useEffect } from 'react';
import { PLANETS } from '../data/planetsData';
import { cosmicAudio } from '../utils/audioSynth';
import { Volume2, VolumeX, Menu, X, Compass, ChevronRight } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onOpenResearcher?: () => void;
}

export function Navigation({ activeSection, onOpenResearcher }: NavigationProps) {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  // Track global scroll percentage for the journey bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollPercent(Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const newState = cosmicAudio.toggle();
    setIsAudioActive(newState);

    // Automatically play/unmute all video streams on sound toggle
    const allVideos = document.querySelectorAll<HTMLVideoElement>('video');
    allVideos.forEach((video) => {
      try {
        video.muted = !newState;
        if (newState) {
          video.volume = 0.6;
          video.play().catch(() => {});
        }
      } catch {
        // ignore policy restriction
      }
    });
  };

  const scrollTo = (id: string) => {
    setMobileDrawerOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Journey Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-slate-900/80 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-amber-300 transition-all duration-150"
          style={{ width: `${scrollPercent}%` }}
        />
      </div>

      {/* Main Top Header (Strict 3-zone contract from frontend-design) */}
      <header className="fixed top-0 left-0 right-0 z-40 liquid-glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-14 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#intro"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('intro');
            }}
            className="text-base sm:text-lg font-bold tracking-widest text-white uppercase whitespace-nowrap shrink-0 hover:text-cyan-400 transition-colors"
          >
            SOLARIS
          </a>

          {/* Zone 2: 4-5 concise single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-mono text-slate-400">
            <button
              onClick={() => scrollTo('intro')}
              className={`hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeSection === 'intro' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => scrollTo('orbital-motion')}
              className={`hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeSection === 'orbital-motion' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              Orbital Motion
            </button>
            <button
              onClick={() => scrollTo('mercury')}
              className={`hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                ['mercury', 'venus', 'earth', 'mars'].includes(activeSection)
                  ? 'text-cyan-400 font-semibold'
                  : ''
              }`}
            >
              Inner Worlds
            </button>
            <button
              onClick={() => scrollTo('jupiter')}
              className={`hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                ['jupiter', 'saturn', 'uranus', 'neptune'].includes(activeSection)
                  ? 'text-cyan-400 font-semibold'
                  : ''
              }`}
            >
              Outer Giants
            </button>
            <button
              onClick={() => scrollTo('comparison-matrix')}
              className={`hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeSection === 'comparison-matrix' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              Telemetry Matrix
            </button>
          </nav>

          {/* Zone 3: 1 primary action (Sound ambience toggle + researcher + mobile menu) */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Researcher Profile Pill */}
            <button
              onClick={onOpenResearcher}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              title="Researcher Dossier: ASIF ANSARI"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>ASIF ANSARI</span>
            </button>

            <button
              onClick={toggleSound}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0 ${
                isAudioActive
                  ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 border-slate-700/80 hover:text-slate-200'
              }`}
              title={isAudioActive ? 'Mute audio' : 'Play video sound & ambient drone automatically'}
            >
              {isAudioActive ? (
                <>
                  <Volume2 size={13} className="text-cyan-400" />
                  <span className="hidden sm:inline">Audio Live</span>
                  <span className="flex items-center gap-0.5 ml-1">
                    <span className="w-0.5 h-2 bg-cyan-400 animate-pulse" />
                    <span className="w-0.5 h-3 bg-cyan-400 animate-pulse delay-75" />
                    <span className="w-0.5 h-1.5 bg-cyan-400 animate-pulse delay-150" />
                  </span>
                </>
              ) : (
                <>
                  <VolumeX size={13} />
                  <span className="hidden sm:inline">Sound Off</span>
                </>
              )}
            </button>

            {/* Mobile planet drawer trigger */}
            <button
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white transition-colors"
              aria-label="Toggle navigation drawer"
            >
              {mobileDrawerOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Floating Vertical Planet Waypoint Dock (Desktop Right Rail) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-2.5 p-2 rounded-3xl liquid-glass border border-white/15 text-[11px] font-mono shadow-2xl">
        <div className="px-2 pt-1 pb-1 text-[9px] uppercase tracking-wider text-slate-300 border-b border-white/10 text-center">
          EXPEDITION
        </div>

        {/* Overview item */}
        <button
          onClick={() => scrollTo('intro')}
          className={`px-2 py-1 rounded-xl text-left transition-all flex items-center gap-2 group cursor-pointer ${
            activeSection === 'intro' ? 'text-cyan-300 font-bold bg-white/15' : 'text-slate-300 hover:text-white'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${activeSection === 'intro' ? 'bg-cyan-400 ring-2 ring-cyan-400/30' : 'bg-slate-500'}`} />
          <span className="tracking-wide">OVERVIEW</span>
        </button>

        {/* Orbit Dynamics item */}
        <button
          onClick={() => scrollTo('orbital-motion')}
          className={`px-2 py-1 rounded-xl text-left transition-all flex items-center gap-2 group cursor-pointer ${
            activeSection === 'orbital-motion' ? 'text-cyan-300 font-bold bg-white/15' : 'text-slate-300 hover:text-white'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${activeSection === 'orbital-motion' ? 'bg-cyan-400 ring-2 ring-cyan-400/30' : 'bg-slate-500'}`} />
          <span className="tracking-wide">ORBITS</span>
        </button>

        {/* Planet 01 to 08 */}
        {PLANETS.map((planet) => {
          const isCurrent = activeSection === planet.id;
          return (
            <button
              key={planet.id}
              onClick={() => scrollTo(planet.id)}
              className={`px-2 py-1 rounded-xl text-left transition-all flex items-center justify-between gap-2.5 group cursor-pointer ${
                isCurrent
                  ? 'text-cyan-300 font-bold bg-white/15'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    isCurrent ? 'bg-cyan-400 ring-2 ring-cyan-400/30 scale-125' : 'bg-slate-500'
                  }`}
                  style={isCurrent ? { backgroundColor: planet.accentColor } : {}}
                />
                <span className="text-slate-400 text-[10px]">0{planet.order}</span>
                <span className="tracking-wide uppercase">{planet.name}</span>
              </div>
              <span className="text-[9px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                {planet.distanceAU}
              </span>
            </button>
          );
        })}

        {/* Comparison item */}
        <button
          onClick={() => scrollTo('comparison-matrix')}
          className={`px-2 py-1 rounded-xl text-left transition-all flex items-center gap-2 group cursor-pointer ${
            activeSection === 'comparison-matrix' ? 'text-cyan-300 font-bold bg-white/15' : 'text-slate-300 hover:text-white'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${activeSection === 'comparison-matrix' ? 'bg-cyan-400 ring-2 ring-cyan-400/30' : 'bg-slate-500'}`} />
          <span className="tracking-wide">SYNTHESIS</span>
        </button>
      </div>

      {/* Mobile Planet Selection Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 top-14 z-50 liquid-glass p-6 overflow-y-auto lg:hidden flex flex-col justify-between backdrop-blur-2xl">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-800 flex items-center gap-1.5">
              <Compass size={14} className="text-cyan-400" /> Waypoint Navigation
            </div>

            <div className="space-y-1">
              <button
                onClick={() => scrollTo('intro')}
                className="w-full text-left p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-sm font-mono text-slate-200 flex justify-between items-center"
              >
                <span>Solar System Overview</span>
                <ChevronRight size={14} className="text-cyan-400" />
              </button>

              <button
                onClick={() => scrollTo('orbital-motion')}
                className="w-full text-left p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-sm font-mono text-slate-200 flex justify-between items-center"
              >
                <span>How the Solar System Moves</span>
                <ChevronRight size={14} className="text-cyan-400" />
              </button>

              {PLANETS.map((planet) => (
                <button
                  key={planet.id}
                  onClick={() => scrollTo(planet.id)}
                  className={`w-full text-left p-3 rounded-lg border text-sm font-mono flex justify-between items-center ${
                    activeSection === planet.id
                      ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-300 font-semibold'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-xs">0{planet.order}</span>
                    <span>{planet.name}</span>
                    <span className="text-[11px] text-slate-400 font-sans">({planet.tagline})</span>
                  </div>
                  <span className="text-xs text-cyan-400">{planet.distanceAU}</span>
                </button>
              ))}

              <button
                onClick={() => scrollTo('comparison-matrix')}
                className="w-full text-left p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-sm font-mono text-slate-200 flex justify-between items-center"
              >
                <span>Planetary Comparison Matrix</span>
                <ChevronRight size={14} className="text-cyan-400" />
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 text-center text-xs font-mono text-slate-500">
            Solaris Reconnaissance Platform · NASA / ESA Telemetry
          </div>
        </div>
      )}
    </>
  );
}
