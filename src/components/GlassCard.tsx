import { useRef } from 'react';
import type { ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. Set 0 to disable tilt but keep the sheen. */
  tilt?: number;
  /** Extra frosted/tinted variant for feature cards. */
  frost?: boolean;
  as?: 'div' | 'a' | 'article';
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  'aria-label'?: string;
}

/**
 * Interactive glass surface:
 *  - layered frosted panel with a specular top bevel (.glass-panel / .glass-frost)
 *  - a soft sheen highlight that tracks the pointer (.glass-sheen + --mx/--my)
 *  - subtle 3D tilt toward the cursor via spring physics
 * All motion respects prefers-reduced-motion.
 */
export default function GlassCard({
  children,
  className = '',
  tilt = 8,
  frost = false,
  as = 'div',
  ...rest
}: GlassCardProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [tilt, -tilt]), {
    stiffness: 220,
    damping: 22,
  });
  const ry = useSpring(useTransform(px, [0, 1], [-tilt, tilt]), {
    stiffness: 220,
    damping: 22,
  });

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    px.set(x);
    py.set(y);
    el.style.setProperty('--mx', `${x * 100}%`);
    el.style.setProperty('--my', `${y * 100}%`);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      onPointerMove={reduce ? undefined : handleMove}
      onPointerLeave={reduce ? undefined : handleLeave}
      style={
        reduce || tilt === 0
          ? undefined
          : { rotateX: rx, rotateY: ry, transformPerspective: 900, transformStyle: 'preserve-3d' }
      }
      className={`glass-sheen ${frost ? 'glass-frost' : 'glass-panel'} ${className}`}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
