import { useEffect, useRef } from 'react';

interface StarfieldCanvasProps {
  className?: string;
}

export function StarfieldCanvas({ className = '' }: StarfieldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Generate stars
    const numStars = Math.min(180, Math.floor((width * height) / 10000));
    const stars = Array.from({ length: numStars }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.4,
      alpha: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.05 + 0.01,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2
    }));

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, width, height);

      // Subtle deep nebula wash
      const grad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        width * 0.1,
        width * 0.5,
        height * 0.4,
        width * 0.8
      );
      grad.addColorStop(0, 'rgba(15, 23, 42, 0.45)');
      grad.addColorStop(0.5, 'rgba(8, 12, 28, 0.25)');
      grad.addColorStop(1, 'rgba(3, 7, 18, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Render stars
      for (const s of stars) {
        const currentAlpha = s.alpha * (0.6 + 0.4 * Math.sin(time * s.twinkleSpeed * 10 + s.twinkleOffset));
        ctx.fillStyle = `rgba(226, 232, 240, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        // Slow parallax drift
        s.y -= s.speed;
        if (s.y < 0) {
          s.y = height;
          s.x = Math.random() * width;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none -z-20 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}
