import { ArrowUpRight } from 'lucide-react';
import { socials } from '../data';
import Reveal from './Reveal';
import GlassCard from './GlassCard';

export default function Social() {
  return (
    <section id="social" className="section-pad relative mx-auto max-w-6xl">
      <Reveal>
        <div className="mb-4 flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-indigo-300/80">
          <span className="h-px w-8 bg-indigo-400/50" />
          Connect
          <span className="h-px w-8 bg-indigo-400/50" />
        </div>
        <h2 className="text-center font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Let&apos;s create something <span className="text-gradient">amazing</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-white/55">
          Follow my journey across platforms — code, beats, and everything in between.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {socials.map((social, idx) => {
          const Icon = social.icon;
          return (
            <Reveal key={social.label} delay={idx * 0.08}>
              <GlassCard
                as="a"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                tilt={10}
                aria-label={`${social.label} — ${social.handle}`}
                className={`group relative flex h-full items-center gap-4 rounded-3xl bg-gradient-to-br ${social.from} ${social.to} p-6`}
              >
                {/* sweep sheen */}
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6 text-white" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-display text-lg font-semibold text-white">
                    {social.label}
                  </span>
                  <span className="block truncate text-sm text-white/65">{social.handle}</span>
                </span>

                <ArrowUpRight className="h-5 w-5 shrink-0 text-white/45 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
