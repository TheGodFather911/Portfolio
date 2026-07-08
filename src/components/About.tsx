import { Code2, Music4, Quote } from 'lucide-react';
import { about, crafts } from '../data';
import Reveal from './Reveal';
import GlassCard from './GlassCard';

const marqueeItems = [
  'React',
  'TypeScript',
  'Vite',
  'Tailwind CSS',
  'Node.js',
  'Beat Making',
  'Mixing',
  'Sound Design',
  'UI/UX',
  'Sampling',
];

const craftIcons = [Code2, Music4];

export default function About() {
  return (
    <section id="about" className="section-pad relative mx-auto max-w-6xl">
      <Reveal>
        <div className="mb-4 flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-indigo-300/80">
          <span className="h-px w-8 bg-indigo-400/50" />
          About
          <span className="h-px w-8 bg-indigo-400/50" />
        </div>
        <h2 className="text-center font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Where <span className="text-gradient">code</span> meets{' '}
          <span className="text-gradient">rhythm</span>
        </h2>
      </Reveal>

      {/* Bio */}
      <Reveal delay={0.15}>
        <GlassCard tilt={5} className="mx-auto mt-12 max-w-3xl rounded-3xl p-8 sm:p-10">
          <Quote className="mb-4 h-8 w-8 text-indigo-300/70" />
          <div className="space-y-5">
            {about.paragraphs.map((p, idx) => (
              <p key={idx} className="text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
                {p}
              </p>
            ))}
          </div>
        </GlassCard>
      </Reveal>

      {/* Craft cards */}
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {crafts.map((craft, idx) => {
          const Icon = craftIcons[idx];
          return (
            <Reveal key={craft.title} delay={0.2 + idx * 0.12}>
              <GlassCard
                as="article"
                frost
                tilt={9}
                className="group relative h-full rounded-3xl p-8"
              >
                {/* hover glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-500/25 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="mb-5 inline-flex rounded-2xl bg-gradient-to-br from-indigo-500/25 to-sky-500/10 p-3 ring-1 ring-white/15 shadow-glow">
                  <Icon className="h-6 w-6 text-sky-300" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-white">{craft.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{craft.blurb}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {craft.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/75 backdrop-blur-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>

      {/* Skill marquee */}
      <Reveal delay={0.2}>
        <div className="relative mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] py-4 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="flex w-max animate-marquee gap-8 pr-8">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className="font-display text-lg font-medium text-white/35 transition-colors hover:text-white/70"
              >
                {item}
                <span className="ml-8 text-indigo-400/40">✦</span>
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
