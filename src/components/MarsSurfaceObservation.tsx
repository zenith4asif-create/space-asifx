import { useState } from 'react';
import { VIDEO_SOURCES } from '../data/videoConfig';
import { MARS_SURFACE_DETAILS } from '../data/planetsData';
import { SmartVideoPlayer } from './SmartVideoPlayer';
import { Compass, Layers, ShieldCheck } from 'lucide-react';

export function MarsSurfaceObservation() {
  const [selectedFeature, setSelectedFeature] = useState<number>(0);
  const currentFeature = MARS_SURFACE_DETAILS.features[selectedFeature];

  return (
    <div className="w-full liquid-glass rounded-3xl p-6 sm:p-8 shadow-2xl">
      
      {/* Module Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-6 text-xs font-mono text-slate-300">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-ping" />
          <span className="text-white font-bold tracking-wider uppercase">
            SECONDARY 3D RECONNAISSANCE: MARS SURFACE
          </span>
          <span className="text-white/30">|</span>
          <span className="text-orange-400">CLOUDINARY FEED 1218</span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-300">
          <span className="flex items-center gap-1">
            <Compass size={12} className="text-orange-400" /> 18.65°N 226.2°E
          </span>
          <span className="text-white bg-white/10 px-2.5 py-0.5 rounded-full border border-white/20">
            CONTINUOUS 3D SCAN
          </span>
        </div>
      </div>

      {/* Side-by-Side 3D Layout: Video on one side, Text on the other (NEVER overlapping) */}
      <div className="flex flex-col lg:flex-row items-center gap-8">
        
        {/* 3D Secondary Video Stage (Lazy Loaded & Auto Looping in View) */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <SmartVideoPlayer
            videoUrl={VIDEO_SOURCES.marsSurface}
            name="MARS SURFACE FEED"
            accentColor="#f97316"
            aspectClass="max-w-[480px] aspect-video"
            isSecondary={true}
          />
        </div>

        {/* Text & Telemetry Console Beside Video */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {MARS_SURFACE_DETAILS.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed mb-4">
              {MARS_SURFACE_DETAILS.description}
            </p>

            {/* Interactive Feature Selectors */}
            <div className="mb-4">
              <div className="text-[11px] font-mono uppercase text-slate-300 mb-2 flex items-center gap-1">
                <Layers size={13} className="text-orange-400" /> Select Terrain Feature:
              </div>
              <div className="flex flex-wrap gap-2">
                {MARS_SURFACE_DETAILS.features.map((feat, idx) => (
                  <button
                    key={feat.name}
                    onClick={() => setSelectedFeature(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                      selectedFeature === idx
                        ? 'bg-orange-500/30 text-white border border-orange-400/60 font-semibold shadow-sm'
                        : 'liquid-glass-subtle text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {feat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Feature Data Box in Liquid Glass */}
            <div className="liquid-glass-subtle rounded-2xl p-4 border border-white/15 text-left">
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-sm font-semibold text-white">{currentFeature.name}</span>
                <span className="font-mono text-xs text-orange-400 font-bold">
                  {currentFeature.stat}
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {currentFeature.detail}
              </p>
            </div>
          </div>

          {/* Active Exploration Rovers in Liquid Glass */}
          <div className="mt-5 pt-4 border-t border-white/10">
            <div className="text-[11px] uppercase font-mono text-slate-300 mb-2 flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-cyan-400" /> Active Surface Exploration Sites:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {MARS_SURFACE_DETAILS.rovers.map((r) => (
                <div
                  key={r.name}
                  className="liquid-glass-subtle p-2.5 rounded-xl border border-white/10 text-left"
                >
                  <div className="text-xs font-semibold text-white truncate">{r.name}</div>
                  <div className="text-[10px] text-slate-300 truncate">{r.site}</div>
                  <div className="text-[10px] font-mono text-orange-400 mt-0.5">{r.year}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
