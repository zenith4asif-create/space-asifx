/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { PLANETS } from './data/planetsData';
import { VIDEO_SOURCES } from './data/videoConfig';
import { StarfieldCanvas } from './components/StarfieldCanvas';
import { Navigation } from './components/Navigation';
import { IntroHeroSection } from './components/IntroHeroSection';
import { OrbitalMotionSection } from './components/OrbitalMotionSection';
import { PlanetSectionView } from './components/PlanetSectionView';
import { FinalOverviewSection } from './components/FinalOverviewSection';
import { ResearcherModal } from './components/ResearcherModal';
import { Dna, Rocket, Sparkles, UserCheck } from 'lucide-react';

export default function App() {
  const [activeSectionId, setActiveSectionId] = useState<string>('intro');
  const [isResearcherModalOpen, setIsResearcherModalOpen] = useState<boolean>(false);
  const bgVideoRef = useRef<HTMLVideoElement | null>(null);

  // Track active section for top bar & waypoint rail
  useEffect(() => {
    const sectionIds = [
      'intro',
      'orbital-motion',
      ...PLANETS.map((p) => p.id),
      'comparison-matrix',
    ];

    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      // Find section currently occupying center of viewport
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.5) {
            setActiveSectionId(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* ========================================================
          1. GLOBAL FULL-SCREEN AUTO-PLAYING BACKGROUND VIDEO
          Direct Cloudinary Stream: 1220.mp4 (Auto play loop)
         ======================================================== */}
      <div className="fixed inset-0 w-full h-full -z-30 pointer-events-none overflow-hidden select-none">
        <video
          ref={bgVideoRef}
          src="https://res.cloudinary.com/yuasb9xa/video/upload/v1792636307/1220.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-75 scale-105 transition-opacity duration-1000"
        />
        {/* Subtle Atmospheric Vignette & Scrim allowing deep space video to shine through */}
        <div className="absolute inset-0 bg-[#030712]/35 pointer-events-none" />
        <div className="absolute inset-0 vignette-overlay pointer-events-none" />
      </div>

      {/* Deep Cosmos Starfield Canvas Underlay */}
      <StarfieldCanvas className="opacity-50" />

      {/* Global Navigation & Audio Control */}
      <Navigation
        activeSection={activeSectionId}
        onOpenResearcher={() => setIsResearcherModalOpen(true)}
      />

      {/* Main Exploration Pipeline */}
      <main className="relative z-10 w-full">
        
        {/* 1. INTRO / SOLAR SYSTEM OVERVIEW */}
        <IntroHeroSection onOpenResearcher={() => setIsResearcherModalOpen(true)} />

        {/* 2. HOW THE SOLAR SYSTEM MOVES THROUGH SPACE */}
        <OrbitalMotionSection />

        {/* 3–10. PLANETARY EXPEDITIONS (Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune) */}
        {PLANETS.map((planet, idx) => (
          <PlanetSectionView
            key={planet.id}
            planet={planet}
            index={idx}
          />
        ))}

        {/* 11. FINAL SYNTHESIS & COMPARATIVE MATRIX */}
        <FinalOverviewSection />

      </main>

      {/* Comprehensive Scientific & Developer Footer in Liquid Glass */}
      <footer className="relative z-20 liquid-glass border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          
          {/* Developer & Researcher Spotlight Banner in Liquid Glass */}
          <div className="liquid-glass p-6 sm:p-7 rounded-3xl border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-white text-lg shadow-md shrink-0">
                AA
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                  <Sparkles size={12} />
                  <span>Developer & Lead Researcher</span>
                </div>
                <h4 className="text-lg font-bold text-white tracking-wide">
                  ASIF ANSARI
                </h4>
                <p className="text-xs text-slate-200 font-light mt-0.5">
                  Independent Researcher · Biology · Aqua · Space Systems · Future Innovations
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsResearcherModalOpen(true)}
              className="px-4 py-2 rounded-2xl liquid-glass hover:bg-white/15 text-xs font-mono text-white transition-all flex items-center gap-2 cursor-pointer shrink-0 shadow-sm border border-white/25"
            >
              <UserCheck size={14} />
              <span>View Research Dossier</span>
            </button>
          </div>

          {/* Credits and Citations */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 pt-4 border-t border-slate-900">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="font-semibold text-slate-200 uppercase tracking-widest">SOLARIS</span>
              <span>·</span>
              <span>High-Definition Space Reconnaissance Platform</span>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate-400">
              <span>NASA Planetary Fact Sheets</span>
              <span>·</span>
              <span>JPL Horizons</span>
              <span>·</span>
              <span>Cloudinary CDN</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Developer / Researcher Profile Modal */}
      <ResearcherModal
        isOpen={isResearcherModalOpen}
        onClose={() => setIsResearcherModalOpen(false)}
      />

    </div>
  );
}
