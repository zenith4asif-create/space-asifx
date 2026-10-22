import { useState } from 'react';
import { VIDEO_SOURCES } from '../data/videoConfig';
import { SmartVideoPlayer } from './SmartVideoPlayer';
import { Orbit, Compass, Activity, ArrowRight, Gauge, Zap } from 'lucide-react';

export function OrbitalMotionSection() {
  const [selectedSpeedNode, setSelectedSpeedNode] = useState<number>(0);

  const speedNodes = [
    {
      name: 'Mercury',
      speed: '47.4 km/s',
      distance: '0.39 AU',
      desc: 'Inner gravitational vortex requires maximum orbital velocity to counteract solar pull.',
      color: '#cbd5e1'
    },
    {
      name: 'Earth',
      speed: '29.8 km/s',
      distance: '1.00 AU',
      desc: 'Earth sweeps through nearly 940 million kilometers of space annually in its helical journey.',
      color: '#38bdf8'
    },
    {
      name: 'Jupiter',
      speed: '13.1 km/s',
      distance: '5.20 AU',
      desc: 'The gas giant acts as the gravitational anchor, moderating resonance across outer planetary orbits.',
      color: '#eab308'
    },
    {
      name: 'Neptune',
      speed: '5.4 km/s',
      distance: '30.1 AU',
      desc: 'Cruises serenely along the distant frontier, taking 165 Earth years to complete one orbital loop.',
      color: '#6366f1'
    }
  ];

  return (
    <section
      id="orbital-motion"
      className="relative min-h-screen w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-white/5 bg-transparent flex items-center justify-center overflow-hidden"
    >
      {/* Background Cyan Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20 bg-cyan-600 pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col gap-10">
        
        {/* Section Top Bar in Liquid Glass */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-3 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-3">
            <Orbit size={14} className="text-cyan-400" />
            <span className="text-white font-semibold tracking-wider uppercase">
              CELESTIAL KINEMATICS · HELICAL MOVEMENT
            </span>
            <span className="text-white/30">|</span>
            <span className="text-cyan-400 font-bold">MILKY WAY VORTEX</span>
          </div>

          <div className="flex items-center gap-5 text-[11px]">
            <span className="text-slate-300">
              V_SOLAR: <span className="text-cyan-300 font-bold">220 km/s (792,000 km/h)</span>
            </span>
            <span className="hidden sm:inline text-slate-300">
              PLANE INCLINE: <span className="text-white font-bold">60°</span>
            </span>
          </div>
        </div>

        {/* Side-by-Side 3D Layout: Video never obstructed by text */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
          
          {/* ========================================================
              SIDE 1: SMART 3D HELICAL MOTION VIDEO (Auto Loop On View)
             ======================================================== */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
            <SmartVideoPlayer
              videoUrl={VIDEO_SOURCES.solarSystemMovement}
              name="HELICAL DYNAMICS"
              accentColor="#06b6d4"
              aspectClass="max-w-[480px] sm:max-w-[520px] aspect-video sm:aspect-[4/3]"
            />
          </div>

          {/* ========================================================
              SIDE 2: PURE LIQUID GLASS KINEMATICS CONSOLE
             ======================================================== */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            
            <div className="mb-6">
              <div className="text-xs sm:text-sm font-mono tracking-widest uppercase text-cyan-400 mb-2 flex items-center gap-2">
                <Zap size={14} />
                <span>SOLAR HELICAL TRAJECTORY</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase drop-shadow-lg">
                HOW THE SOLAR SYSTEM MOVES
              </h2>

              <p className="mt-3 text-slate-200 text-sm sm:text-base leading-relaxed font-light drop-shadow-sm">
                Our solar family is not a flat, static turntable. The Sun hurtles through the Milky Way at <span className="text-cyan-300 font-semibold font-mono">792,000 km/h</span> tilted 60° relative to the galactic plane. As the planets orbit the traveling Sun, their combined path traces a majestic 3D helical vortex through the cosmos.
              </p>
            </div>

            {/* Keplerian Planetary Velocity Hierarchy in Liquid Glass */}
            <div className="liquid-glass p-5 sm:p-6 rounded-3xl mb-6 shadow-2xl">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-3">
                <span className="flex items-center gap-1.5 uppercase font-semibold text-white">
                  <Gauge size={13} className="text-cyan-400" /> Planetary Orbital Velocities:
                </span>
                <span className="text-cyan-300">KEPLERIAN DECAY</span>
              </div>

              {/* Node selector buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                {speedNodes.map((node, idx) => (
                  <button
                    key={node.name}
                    onClick={() => setSelectedSpeedNode(idx)}
                    className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedSpeedNode === idx
                        ? 'bg-white/20 border-white/40 shadow-sm'
                        : 'liquid-glass-subtle hover:bg-white/10'
                    }`}
                  >
                    <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: node.color }} />
                      {node.name}
                    </div>
                    <div className="text-sm font-mono font-bold text-cyan-300 mt-0.5">
                      {node.speed}
                    </div>
                    <div className="text-[10px] text-slate-400">{node.distance}</div>
                  </button>
                ))}
              </div>

              {/* Selected Node Narrative */}
              <div className="p-3.5 liquid-glass-subtle rounded-2xl text-xs text-slate-200 leading-relaxed">
                <span className="font-semibold text-white">{speedNodes[selectedSpeedNode].name}: </span>
                {speedNodes[selectedSpeedNode].desc}
              </div>
            </div>

            {/* The Great Cosmic Year Banner in Liquid Glass */}
            <div className="p-4 rounded-2xl liquid-glass flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-mono uppercase text-cyan-300">GALACTIC REVOLUTION PERIOD</div>
                <div className="text-lg font-bold text-white font-mono">230 Million Earth Years</div>
                <div className="text-xs text-slate-300">One Cosmic Year around Sagittarius A*</div>
              </div>
              <a
                href="#mercury"
                className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-xs font-mono text-white transition-colors flex items-center gap-1.5 shrink-0 shadow-sm"
              >
                <span>Enter Worlds</span>
                <ArrowRight size={13} />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
