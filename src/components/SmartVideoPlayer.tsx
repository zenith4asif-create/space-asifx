import { useEffect, useRef, useState } from 'react';
import { Activity } from 'lucide-react';

interface SmartVideoPlayerProps {
  videoUrl: string;
  name: string;
  accentColor?: string;
  aspectClass?: string;
  className?: string;
  isSecondary?: boolean;
}

export function SmartVideoPlayer({
  videoUrl,
  name,
  accentColor = '#38bdf8',
  aspectClass = 'aspect-square',
  className = '',
  isSecondary = false,
}: SmartVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isInView, setIsInView] = useState(false);
  const [hasStartedLoading, setHasStartedLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // IntersectionObserver: ONLY load & play the video currently facing / in view of the user!
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const isFacing = entry.isIntersecting;
        setIsInView(isFacing);

        if (isFacing) {
          // Trigger loading only when in view
          setHasStartedLoading(true);
          const video = videoRef.current;
          if (video) {
            video.play().catch(() => {
              // Autoplay policy fallback
            });
          }
        } else {
          // Pause immediately when not in view to save GPU and bandwidth
          const video = videoRef.current;
          if (video && !video.paused) {
            video.pause();
          }
        }
      },
      {
        rootMargin: '120px 0px 120px 0px',
        threshold: 0.15,
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // When sound is toggled globally, sync muted state if in view
  useEffect(() => {
    const video = videoRef.current;
    if (video && isInView) {
      video.play().catch(() => {});
    }
  }, [isInView]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 14, y: -y * 14 });
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex flex-col items-center justify-center perspective-1200 ${className}`}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePos({ x: 0, y: 0 });
        }}
        style={{
          transform: isHovered
            ? `rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg) scale(1.02)`
            : 'rotateY(0deg) rotateX(0deg) scale(1)',
          transition: isHovered
            ? 'transform 0.1s ease-out'
            : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className={`relative w-full ${aspectClass} rounded-3xl p-3 liquid-glass border border-white/20 shadow-2xl preserve-3d group cursor-crosshair`}
      >
        {/* Outer Liquid Glass Specular Corona */}
        <div
          className="absolute inset-0 rounded-3xl blur-2xl opacity-25 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"
          style={{
            boxShadow: `0 0 70px 12px ${accentColor}`,
          }}
        />

        {/* Futuristic HUD Corner Brackets */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white/60 rounded-tl pointer-events-none" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-white/60 rounded-tr pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-white/60 rounded-bl pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white/60 rounded-br pointer-events-none" />

        {/* Rotating Orbital Coordinate Rings */}
        <div className="absolute -inset-5 rounded-full border border-dashed border-white/15 animate-spin-slow pointer-events-none hidden sm:block" />
        <div className="absolute -inset-9 rounded-full border border-dotted border-white/10 animate-spin-reverse pointer-events-none hidden sm:block" />

        {/* Unobstructed Video Portal */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/40 shadow-inner">
          {hasStartedLoading ? (
            <video
              ref={videoRef}
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className={`w-full h-full object-cover rounded-2xl transition-opacity duration-700 ${
                isInView ? 'opacity-100' : 'opacity-40'
              }`}
            />
          ) : (
            // Lightweight placeholder before scrolling into view to save network bandwidth
            <div className="w-full h-full flex flex-col items-center justify-center bg-white/[0.02] backdrop-blur-md text-slate-400 font-mono text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400/50 animate-pulse mb-2" />
              <span className="text-[10px] uppercase tracking-widest text-slate-400">
                Standby Telemetry
              </span>
            </div>
          )}

          {/* Liquid Glass Edge Highlight */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]" />
        </div>

        {/* Viewport Floating Status Chip */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full liquid-glass border border-white/25 text-[10px] font-mono text-white flex items-center gap-2 shadow-xl whitespace-nowrap">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isInView ? 'bg-cyan-400 animate-ping' : 'bg-slate-500'
            }`}
          />
          <span className="tracking-wider uppercase font-semibold">
            {isInView ? 'ACTIVE 3D STREAM' : 'STANDBY'}
          </span>
          <span className="text-white/40">|</span>
          <span className="text-cyan-300">{name}</span>
        </div>
      </div>

      {/* Sub-label */}
      <div className="mt-6 text-center text-xs font-mono text-slate-400 flex items-center gap-1.5">
        <Activity size={12} className="text-cyan-400" />
        <span>3D Perspective · Auto Looping On View</span>
      </div>
    </div>
  );
}
