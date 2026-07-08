import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Cinematic ambient background:
 *  - deep gradient base
 *  - slow-drifting colored light "blobs" (respect reduced-motion)
 *  - faint grid + radial spotlight that follows the pointer
 */
export default function AmbientBackground() {
  const reduce = useReducedMotion();
  const [pos, setPos] = useState({ x: 50, y: 30 });

  useEffect(() => {
    if (reduce) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setPos({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        });
      });
    };
    window.addEventListener('pointermove', onMove);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, [reduce]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950" />

      {/* Drifting light blobs */}
      <div
        className={`absolute -left-32 -top-24 h-[42rem] w-[42rem] rounded-full bg-indigo-500/40 blur-[110px] ${
          reduce ? '' : 'animate-blob'
        }`}
      />
      <div
        className={`absolute -right-40 top-1/4 h-[38rem] w-[38rem] rounded-full bg-sky-400/35 blur-[110px] ${
          reduce ? '' : 'animate-blob'
        }`}
        style={{ animationDelay: '6s' }}
      />
      <div
        className={`absolute bottom-[-12rem] left-1/3 h-[40rem] w-[40rem] rounded-full bg-violet-500/35 blur-[120px] ${
          reduce ? '' : 'animate-blob'
        }`}
        style={{ animationDelay: '11s' }}
      />
      <div
        className={`absolute right-1/4 bottom-1/4 h-[26rem] w-[26rem] rounded-full bg-fuchsia-500/25 blur-[100px] ${
          reduce ? '' : 'animate-blob'
        }`}
        style={{ animationDelay: '3s' }}
      />

      {/* Pointer spotlight */}
      <div
        className="absolute inset-0 transition-[background] duration-300"
        style={{
          background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, rgba(129,140,248,0.16), transparent 45%)`,
        }}
      />

      {/* Faint grid */}
      <div className="absolute inset-0 bg-grid-faint [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55))]" />
    </div>
  );
}
