import { useState } from 'react';
import { PLANETS } from '../data/planetsData';
import { VIDEO_SOURCES } from '../data/videoConfig';
import { SmartVideoPlayer } from './SmartVideoPlayer';
import { Orbit, ArrowUp, Sparkles, Filter, ChevronRight } from 'lucide-react';

export function FinalOverviewSection() {
  const [filterType, setFilterType] = useState<'all' | 'terrestrial' | 'gas'>('all');
  const [sortBy, setSortBy] = useState<'order' | 'diameter' | 'distance' | 'moons'>('order');

  const filteredPlanets = PLANETS.filter((p) => {
    if (filterType === 'terrestrial') return p.classification.includes('Terrestrial');
    if (filterType === 'gas') return p.classification.includes('Giant');
    return true;
  }).sort((a, b) => {
    if (sortBy === 'diameter') {
      const dA = parseFloat(a.diameterKm.replace(/,/g, ''));
      const dB = parseFloat(b.diameterKm.replace(/,/g, ''));
      return dB - dA;
    }
    if (sortBy === 'distance') {
      const distA = parseFloat(a.distanceAU);
      const distB = parseFloat(b.distanceAU);
      return distA - distB;
    }
    if (sortBy === 'moons') {
      return b.moons - a.moons;
    }
    return a.order - b.order;
  });

  return (
    <section
      id="comparison-matrix"
      className="relative min-h-screen w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-white/5 bg-transparent flex items-center justify-center overflow-hidden"
    >
      {/* Deep Space Radial Glow */}
      <div className="absolute bottom-1/4 right-1/4 w-[650px] h-[650px] rounded-full blur-[170px] opacity-20 bg-cyan-600 pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col gap-10">
        
        {/* Top Telemetry Header in Liquid Glass */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <Orbit size={14} className="text-cyan-400" />
            <span className="text-white uppercase font-bold">
              FINAL HELIOSPHERIC SYNTHESIS
            </span>
            <span className="text-white/30">|</span>
            <span className="text-cyan-400">8 WORLDS COMPARED</span>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer text-[11px]"
          >
            <span>RETURN TO APEX</span>
            <ArrowUp size={12} />
          </button>
        </div>

        {/* Side-by-Side 3D Presentation */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
          
          {/* ========================================================
              SIDE 1: 3D SOLAR SYSTEM GLOBE (Auto Loop On View)
             ======================================================== */}
          <div className="w-full lg:w-5/12 flex flex-col items-center justify-center">
            <SmartVideoPlayer
              videoUrl={VIDEO_SOURCES.overview}
              name="HELIOSPHERE SYNTHESIS"
              accentColor="#06b6d4"
              aspectClass="max-w-[420px] aspect-square"
            />
          </div>

          {/* ========================================================
              SIDE 2: SYNTHESIS HEADER & KPI STRIP IN LIQUID GLASS
             ======================================================== */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
              <Sparkles size={13} />
              <span>The Grand Cosmic Architecture</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase mb-3 drop-shadow-lg">
              OUR SOLAR SYSTEM
            </h2>

            <p className="text-sm sm:text-base font-light text-slate-200 max-w-xl mb-6 drop-shadow-sm">
              8 WORLDS · ONE COSMIC NEIGHBORHOOD. Across 4.5 billion years of planetary evolution, our star has nurtured four rocky terrestrial inner worlds and four colossal gas and ice giants.
            </p>

            {/* Quick KPI Strip in Liquid Glass */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="liquid-glass p-3.5 rounded-2xl">
                <span className="text-slate-300 block text-[10px]">KNOWN MOONS</span>
                <span className="text-xl font-bold text-white tabular-nums">288+</span>
              </div>
              <div className="liquid-glass p-3.5 rounded-2xl">
                <span className="text-slate-300 block text-[10px]">TOTAL MASS</span>
                <span className="text-xl font-bold text-cyan-300 tabular-nums">0.14% Sun</span>
              </div>
              <div className="liquid-glass p-3.5 rounded-2xl">
                <span className="text-slate-300 block text-[10px]">HELIOPAUSE</span>
                <span className="text-xl font-bold text-white tabular-nums">~120 AU</span>
              </div>
              <div className="liquid-glass p-3.5 rounded-2xl">
                <span className="text-slate-300 block text-[10px]">STELLAR AGE</span>
                <span className="text-xl font-bold text-cyan-300 tabular-nums">4.57B Yrs</span>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================
            FULL-WIDTH COMPARATIVE MATRIX (Pure Liquid Glass)
           ======================================================== */}
        <div className="liquid-glass rounded-3xl p-5 sm:p-7 shadow-2xl">
          
          {/* Controls Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            {/* Filter */}
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className="text-slate-300 flex items-center gap-1 mr-1">
                <Filter size={12} /> REALM:
              </span>
              {(['all', 'terrestrial', 'gas'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setFilterType(mode)}
                  className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer uppercase ${
                    filterType === mode
                      ? 'bg-white/20 text-white border border-white/30 font-semibold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {mode === 'all' ? 'All Worlds' : mode === 'terrestrial' ? 'Terrestrial' : 'Gas & Ice Giants'}
                </button>
              ))}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-300">SORT BY:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="liquid-glass text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none border border-white/20"
              >
                <option value="order" className="bg-slate-900 text-white">Solar Distance Order</option>
                <option value="diameter" className="bg-slate-900 text-white">Equatorial Diameter</option>
                <option value="moons" className="bg-slate-900 text-white">Moon Count</option>
              </select>
            </div>
          </div>

          {/* Telemetry Table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-white/10 text-slate-300 font-mono text-[11px] uppercase">
                  <th className="py-2.5 px-3">World</th>
                  <th className="py-2.5 px-3">Classification</th>
                  <th className="py-2.5 px-3">Distance (AU)</th>
                  <th className="py-2.5 px-3">Diameter</th>
                  <th className="py-2.5 px-3">Orbital Period</th>
                  <th className="py-2.5 px-3">Rotation Period</th>
                  <th className="py-2.5 px-3">Mean Temp</th>
                  <th className="py-2.5 px-3">Moons</th>
                  <th className="py-2.5 px-3 text-right">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {filteredPlanets.map((planet) => (
                  <tr
                    key={planet.id}
                    className="hover:bg-white/10 transition-colors group cursor-pointer"
                    onClick={() => {
                      const el = document.getElementById(planet.id);
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2 font-sans font-semibold text-white">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block"
                          style={{ backgroundColor: planet.accentColor }}
                        />
                        <span>{planet.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-300 font-sans text-xs">
                      {planet.classification}
                    </td>
                    <td className="py-3 px-3 text-cyan-300 tabular-nums">
                      {planet.distanceAU}
                    </td>
                    <td className="py-3 px-3 text-slate-200 tabular-nums">
                      {planet.diameterKm}
                    </td>
                    <td className="py-3 px-3 text-slate-200">
                      {planet.orbitPeriod}
                    </td>
                    <td className="py-3 px-3 text-slate-300">
                      {planet.rotationPeriod}
                    </td>
                    <td className="py-3 px-3 text-slate-200 tabular-nums">
                      {planet.meanTemperature}
                    </td>
                    <td className="py-3 px-3 text-white font-bold tabular-nums">
                      {planet.moons}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] text-cyan-300 group-hover:translate-x-1 transition-transform">
                        Travel <ChevronRight size={12} />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* Sagan Reflection in Liquid Glass */}
        <div className="text-center pt-4 border-t border-white/10 text-xs font-mono text-slate-400">
          <p className="max-w-xl mx-auto leading-relaxed mb-2 font-light text-slate-200">
            &ldquo;Look again at that dot. That&apos;s here. That&apos;s home. That&apos;s us. On it everyone you love, everyone you know, everyone you ever heard of, every human being who ever was, lived out their lives.&rdquo;
          </p>
          <div className="text-[11px] text-cyan-400">
            — Carl Sagan, Pale Blue Dot
          </div>
        </div>

      </div>
    </section>
  );
}
