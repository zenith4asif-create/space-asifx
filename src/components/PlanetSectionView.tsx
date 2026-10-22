import { useState } from 'react';
import { PlanetData } from '../data/planetsData';
import { VIDEO_SOURCES } from '../data/videoConfig';
import { SmartVideoPlayer } from './SmartVideoPlayer';
import { MarsSurfaceObservation } from './MarsSurfaceObservation';
import {
  Orbit,
  RotateCw,
  Globe2,
  Thermometer,
  Compass,
  Moon,
  Wind,
  Layers,
  ChevronRight,
  ShieldCheck,
  Activity,
  Sparkles
} from 'lucide-react';

interface PlanetSectionViewProps {
  planet: PlanetData;
  index: number;
  onActiveChange?: (active: boolean) => void;
}

export function PlanetSectionView({ planet, index }: PlanetSectionViewProps) {
  const [activeTab, setActiveTab] = useState<'spectroscopy' | 'geology' | 'missions'>('spectroscopy');
  const isEven = index % 2 === 0;

  return (
    <section
      id={planet.id}
      className="relative min-h-screen w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-white/5 bg-transparent flex items-center justify-center overflow-hidden"
    >
      {/* Subtle Planetary Chromatic Aura in background */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20 pointer-events-none transition-all duration-1000"
        style={{
          backgroundColor: planet.accentColor,
          left: isEven ? '8%' : '58%',
        }}
      />

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col gap-10">
        
        {/* Top Minimal Scientific Header Bar in Liquid Glass */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-3 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-3">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block animate-pulse"
              style={{ backgroundColor: planet.accentColor }}
            />
            <span className="text-white font-semibold tracking-wider">
              0{planet.order} · {planet.name.toUpperCase()}
            </span>
            <span className="text-white/30">|</span>
            <span className="text-cyan-400 font-medium">{planet.classification.toUpperCase()}</span>
          </div>

          <div className="flex items-center gap-5 text-[11px]">
            <span className="text-slate-300">
              DISTANCE: <span className="text-white font-bold">{planet.distanceAU}</span> ({planet.distanceKm})
            </span>
            <span className="hidden sm:inline text-slate-300">
              GRAVITY: <span className="text-white font-bold">{planet.gravity}</span>
            </span>
          </div>
        </div>

        {/* Main Side-by-Side 3D Layout (Text NEVER overrides Video) */}
        <div
          className={`flex flex-col ${
            isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
          } items-center gap-10 lg:gap-14`}
        >
          {/* ========================================================
              SIDE 1: SMART 3D CELESTIAL VIDEO VIEWPORT
              Only loads & loops when facing the user!
             ======================================================== */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
            <SmartVideoPlayer
              videoUrl={VIDEO_SOURCES[planet.videoKey]}
              name={planet.name.toUpperCase()}
              accentColor={planet.accentColor}
              aspectClass="max-w-[460px] sm:max-w-[500px] aspect-square"
            />
          </div>

          {/* ========================================================
              SIDE 2: PURE LIQUID GLASS TELEMETRY CONSOLE
              Colorless, transparent, frosted glass aesthetics
             ======================================================== */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            
            {/* Title & Tagline */}
            <div className="mb-6">
              <div className="text-xs sm:text-sm font-mono tracking-widest uppercase text-cyan-400 mb-1 flex items-center gap-2">
                <span>0{planet.order} · EXPEDITION TARGET</span>
                <span className="text-white/30">/</span>
                <span className="text-slate-300">{planet.tagline}</span>
              </div>

              <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase drop-shadow-lg">
                {planet.name}
              </h2>

              <p className="mt-3 text-slate-200 text-sm sm:text-base leading-relaxed font-light drop-shadow-sm">
                {planet.overview}
              </p>
            </div>

            {/* Core Physical Telemetry Grid (Liquid Glass Cards) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-6">
              
              <div className="liquid-glass-subtle liquid-glass-interactive p-3 rounded-2xl">
                <div className="text-[10px] font-mono text-slate-300 uppercase flex items-center gap-1 mb-1">
                  <Orbit size={12} className="text-cyan-400" /> Orbit Period
                </div>
                <div className="text-sm sm:text-base font-bold font-mono text-white">
                  {planet.orbitPeriod}
                </div>
                <div className="text-[10px] text-slate-400">Solar Year</div>
              </div>

              <div className="liquid-glass-subtle liquid-glass-interactive p-3 rounded-2xl">
                <div className="text-[10px] font-mono text-slate-300 uppercase flex items-center gap-1 mb-1">
                  <RotateCw size={12} className="text-cyan-400" /> Day Length
                </div>
                <div className="text-sm sm:text-base font-bold font-mono text-white">
                  {planet.rotationPeriod}
                </div>
                <div className="text-[10px] text-slate-400">Axial Spin</div>
              </div>

              <div className="liquid-glass-subtle liquid-glass-interactive p-3 rounded-2xl">
                <div className="text-[10px] font-mono text-slate-300 uppercase flex items-center gap-1 mb-1">
                  <Globe2 size={12} className="text-cyan-400" /> Diameter
                </div>
                <div className="text-sm sm:text-base font-bold font-mono text-white">
                  {planet.diameterKm}
                </div>
                <div className="text-[10px] text-slate-400">{planet.diameterRelative}</div>
              </div>

              <div className="liquid-glass-subtle liquid-glass-interactive p-3 rounded-2xl">
                <div className="text-[10px] font-mono text-slate-300 uppercase flex items-center gap-1 mb-1">
                  <Thermometer size={12} className="text-cyan-400" /> Mean Temp
                </div>
                <div className="text-sm sm:text-base font-bold font-mono text-white">
                  {planet.meanTemperature}
                </div>
                <div className="text-[10px] text-slate-400 truncate">{planet.surfaceTempRange}</div>
              </div>

              <div className="liquid-glass-subtle liquid-glass-interactive p-3 rounded-2xl">
                <div className="text-[10px] font-mono text-slate-300 uppercase flex items-center gap-1 mb-1">
                  <Compass size={12} className="text-cyan-400" /> Axial Tilt
                </div>
                <div className="text-sm sm:text-base font-bold font-mono text-white">
                  {planet.axialTilt}
                </div>
                <div className="text-[10px] text-slate-400">Inclination</div>
              </div>

              <div className="liquid-glass-subtle liquid-glass-interactive p-3 rounded-2xl">
                <div className="text-[10px] font-mono text-slate-300 uppercase flex items-center gap-1 mb-1">
                  <Moon size={12} className="text-cyan-400" /> Moons
                </div>
                <div className="text-sm sm:text-base font-bold font-mono text-white">
                  {planet.moons}
                </div>
                <div className="text-[10px] text-slate-400">
                  {planet.notableMoons.length > 0 ? planet.notableMoons[0] : 'None'}
                </div>
              </div>

            </div>

            {/* Deep Analysis Deck with Pure Liquid Glass */}
            <div className="liquid-glass rounded-3xl p-5 sm:p-6 shadow-2xl">
              
              {/* Segmented Liquid Tabs */}
              <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-4">
                <button
                  onClick={() => setActiveTab('spectroscopy')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    activeTab === 'spectroscopy'
                      ? 'bg-white/15 text-white border border-white/30 font-semibold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Atmosphere
                </button>
                <button
                  onClick={() => setActiveTab('geology')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    activeTab === 'geology'
                      ? 'bg-white/15 text-white border border-white/30 font-semibold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Geology & Facts
                </button>
                <button
                  onClick={() => setActiveTab('missions')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    activeTab === 'missions'
                      ? 'bg-white/15 text-white border border-white/30 font-semibold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Missions
                </button>
              </div>

              {/* Tab 1: Chemical Spectroscopy */}
              {activeTab === 'spectroscopy' && (
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-300 mb-3">
                    <span className="font-mono text-[11px] uppercase text-white font-medium">
                      {planet.atmosphere}
                    </span>
                    <span className="text-cyan-300 font-mono text-[11px]">SPECTRAL DATA</span>
                  </div>

                  <div className="space-y-2.5">
                    {planet.atmosphereComposition.map((gas) => (
                      <div key={gas.name}>
                        <div className="flex justify-between text-xs mb-1 font-mono">
                          <span className="text-slate-200">{gas.name}</span>
                          <span className="text-cyan-300 font-bold">{gas.percentage}%</span>
                        </div>
                        <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden border border-white/10">
                          <div
                            className="bg-gradient-to-r from-cyan-400 to-sky-300 h-full rounded-full transition-all duration-700"
                            style={{ width: `${Math.min(100, gas.percentage)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: Geology & Key Facts */}
              {activeTab === 'geology' && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-200 leading-relaxed font-sans">
                    {planet.geology}
                  </p>
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    {planet.scientificFacts.slice(0, 2).map((fact, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                        <span className="text-cyan-400 font-mono text-[11px] mt-0.5">0{idx + 1}.</span>
                        <p>{fact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Key Missions */}
              {activeTab === 'missions' && (
                <div>
                  <div className="text-xs text-slate-300 mb-2.5 font-mono">
                    Robotic Explorers & Observation History:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {planet.keyMissions.map((m) => (
                      <div
                        key={m}
                        className="text-xs liquid-glass-subtle p-2.5 rounded-xl border border-white/10 text-white flex items-center gap-2"
                      >
                        <ChevronRight size={13} className="text-cyan-400 shrink-0" />
                        <span className="truncate">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* Mars Surface Secondary Observation Window */}
        {planet.id === 'mars' && (
          <div className="mt-8 pt-8 border-t border-white/10">
            <MarsSurfaceObservation />
          </div>
        )}

      </div>
    </section>
  );
}
