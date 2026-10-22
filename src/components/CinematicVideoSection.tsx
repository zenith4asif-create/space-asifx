import { useEffect, useRef, useState, ReactNode } from 'react';
import { VIDEO_SOURCES } from '../data/videoConfig';

interface CinematicVideoSectionProps {
  id: string;
  videoUrl: string;
  fallbackUrl?: string;
  children: (props: { progress: number; isActive: boolean; currentTime: number; duration: number }) => ReactNode;
  heightClass?: string; // e.g. "h-[220vh]"
  onProgressChange?: (progress: number) => void;
  onActiveChange?: (isActive: boolean) => void;
}

export function CinematicVideoSection({
  id,
  videoUrl,
  fallbackUrl = VIDEO_SOURCES.spaceBackground,
  children,
  heightClass = 'min-h-[220vh]',
  onProgressChange,
  onActiveChange,
}: CinematicVideoSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fallbackVideoRef = useRef<HTMLVideoElement | null>(null);

  const [hasError, setHasError] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [autoPlayMode, setAutoPlayMode] = useState(false);

  // IntersectionObserver to only load/activate when within viewport proximity
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const isIntersecting = entry.isIntersecting;
        setIsActive(isIntersecting);
        onActiveChange?.(isIntersecting);

        const video = videoRef.current;
        if (!video) return;

        if (isIntersecting) {
          if (video.paused && autoPlayMode) {
            video.play().catch(() => {});
          }
        } else {
          if (!video.paused) {
            video.pause();
          }
        }
      },
      {
        rootMargin: '100px 0px 100px 0px',
        threshold: [0, 0.1, 0.5, 0.9, 1.0],
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [autoPlayMode, onActiveChange]);

  // Handle Video Metadata & Duration
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.duration && !isNaN(video.duration)) {
      setVideoDuration(video.duration);
    }
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    setHasError(true);
  };

  // RAF Scroll listener for responsive, stutter-free timeline scrubbing
  useEffect(() => {
    let animationFrameId: number;
    let lastProgress = -1;

    const updateScrollTimeline = () => {
      const container = containerRef.current;
      const video = videoRef.current;

      if (!container) {
        animationFrameId = requestAnimationFrame(updateScrollTimeline);
        return;
      }

      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollable = rect.height - viewportHeight;

      if (totalScrollable <= 0) {
        animationFrameId = requestAnimationFrame(updateScrollTimeline);
        return;
      }

      // Calculate progress from 0 (top enters) to 1 (bottom exits)
      const rawProgress = -rect.top / totalScrollable;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      // Check if section is currently on screen
      const currentlyOnScreen = rect.top < viewportHeight && rect.bottom > 0;

      if (currentlyOnScreen && Math.abs(clampedProgress - lastProgress) > 0.001) {
        lastProgress = clampedProgress;
        setScrollProgress(clampedProgress);
        onProgressChange?.(clampedProgress);

        // Scrub video timeline if not in auto-play mode
        if (video && video.duration && !autoPlayMode && !video.seeking) {
          const targetTime = clampedProgress * video.duration;
          // Only seek if delta is meaningful (> 0.04s) to prevent browser buffer thrashing
          if (Math.abs(video.currentTime - targetTime) > 0.04) {
            try {
              video.currentTime = targetTime;
              setVideoCurrentTime(targetTime);
            } catch {
              // Ignore DOMException if seeking interrupted
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(updateScrollTimeline);
    };

    animationFrameId = requestAnimationFrame(updateScrollTimeline);
    return () => cancelAnimationFrame(animationFrameId);
  }, [autoPlayMode, onProgressChange]);

  return (
    <section
      id={id}
      ref={containerRef}
      className={`relative w-full ${heightClass} text-slate-100`}
    >
      {/* Sticky Cinematic Viewport Layer */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#030712] select-none">
        
        {/* Primary Cloudinary Video */}
        {!hasError ? (
          <video
            ref={videoRef}
            src={videoUrl}
            preload="auto"
            muted
            playsInline
            loop={autoPlayMode}
            onLoadedMetadata={handleLoadedMetadata}
            onError={handleVideoError}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          /* Fallback Space Video if Primary encounters network/CORS error */
          <video
            ref={fallbackVideoRef}
            src={fallbackUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-75"
          />
        )}

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 vignette-overlay pointer-events-none" />

        {/* Subtle Depth Scrim for Top/Bottom Contrast */}
        <div className="absolute inset-0 cinematic-scrim pointer-events-none" />

        {/* Subtle Tech Coordinate Grid Watermark */}
        <div className="absolute inset-0 radar-grid opacity-15 pointer-events-none" />

        {/* Playback Control Mode Pill (Scrubbing vs Continuous Orbit) */}
        <div className="absolute bottom-6 right-6 z-30 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/70 border border-slate-700/60 backdrop-blur-md text-xs font-mono text-slate-300">
          <span className="text-[10px] text-slate-400">MODE:</span>
          <button
            onClick={() => {
              const video = videoRef.current;
              if (!video) return;
              if (autoPlayMode) {
                video.pause();
                setAutoPlayMode(false);
              } else {
                video.play().catch(() => {});
                setAutoPlayMode(true);
              }
            }}
            className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1.5"
            title="Toggle between scroll scrubbing and continuous playback"
          >
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                autoPlayMode ? 'bg-cyan-400 animate-pulse' : 'bg-slate-500'
              }`}
            />
            <span>{autoPlayMode ? 'Continuous Orbit' : 'Scroll Scrubbing'}</span>
          </button>
          <span className="text-slate-600">|</span>
          <span className="text-[11px] tabular-nums text-cyan-300">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>

        {/* UI & Telemetry Information Layer */}
        <div className="relative z-20 h-full w-full pointer-events-auto">
          {children({
            progress: scrollProgress,
            isActive,
            currentTime: videoCurrentTime,
            duration: videoDuration,
          })}
        </div>
      </div>
    </section>
  );
}
