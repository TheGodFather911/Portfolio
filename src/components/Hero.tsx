import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, MapPin, Sparkles } from 'lucide-react';
import { profile, facts } from '../data';
import GlassCard from './GlassCard';

/* Typewriter that cycles through the roles */
function useTypewriter(words: string[], reduce: boolean) {
  const [text, setText] = useState(reduce ? words[0] : '');
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const current = words[i % words.length];
    const done = !deleting && text === current;
    const cleared = deleting && text === '';

    const timeout = setTimeout(
      () => {
        if (done) {
          setDeleting(true);
          return;
        }
        if (cleared) {
          setDeleting(false);
          setI((v) => v + 1);
          return;
        }
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
        );
      },
      done ? 1600 : deleting ? 45 : 85,
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, i, words, reduce]);

  return reduce ? words[0] : text;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const reduce = useReducedMotion();
  const role = useTypewriter(profile.roles, !!reduce);

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 pt-28 text-center"
    >
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl">
        {/* Availability pill */}
        <motion.div variants={item} className="mb-8 flex justify-center">
          <span className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-white/75">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for collaborations
          </span>
        </motion.div>

        {/* Avatar */}
        <motion.div variants={item} className="mb-10 flex justify-center">
          <div className="group relative">
            {/* rotating conic ring */}
            <div
              className={`absolute -inset-1.5 rounded-full bg-[conic-gradient(from_0deg,#6366f1,#38bdf8,#8b5cf6,#6366f1)] opacity-70 blur-[2px] ${
                reduce ? '' : 'motion-safe:animate-[spin_6s_linear_infinite]'
              }`}
            />
            <div className="relative grid h-32 w-32 place-items-center rounded-full bg-ink-900 sm:h-36 sm:w-36">
              <div className="grid h-[7.5rem] w-[7.5rem] place-items-center rounded-full bg-gradient-to-br from-ink-800 to-ink-950 sm:h-32 sm:w-32">
                <span className="animated-gradient font-display text-5xl font-bold sm:text-6xl">
                  {profile.initials}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl md:text-8xl"
        >
          <span className="animated-gradient">{profile.handle}</span>
        </motion.h1>

        {/* Rotating role */}
        <motion.p
          variants={item}
          className="mt-6 flex h-8 items-center justify-center font-display text-lg text-white/80 sm:text-2xl"
        >
          <Sparkles className="mr-2 h-5 w-5 text-sky-300" />
          <span>{role}</span>
          {!reduce && (
            <span className="ml-0.5 inline-block h-6 w-[2px] animate-pulse bg-sky-300 sm:h-7" />
          )}
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={item}
          className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-white/55 sm:text-lg"
        >
          {profile.tagline}
        </motion.p>

        {/* Stat tiles */}
        <motion.div
          variants={item}
          className="mx-auto mt-10 grid max-w-lg grid-cols-3 gap-3 sm:gap-4"
        >
          {facts.map((f) => (
            <GlassCard key={f.label} tilt={12} className="rounded-2xl px-3 py-4">
              <div className="font-display text-sm font-semibold text-white sm:text-base">
                {f.value}
              </div>
              <div className="mt-1 text-[0.7rem] uppercase tracking-wider text-white/45">
                {f.label}
              </div>
            </GlassCard>
          ))}
        </motion.div>

        {/* Meta row */}
        <motion.div
          variants={item}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/50"
        >
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-indigo-300" />
            {profile.location}
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-white/25 sm:block" />
          <span>Born {profile.birthday}</span>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/80"
        aria-label="Scroll to about section"
      >
        <motion.span
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="block"
        >
          <ArrowDown className="h-6 w-6" />
        </motion.span>
      </motion.a>
    </section>
  );
}
