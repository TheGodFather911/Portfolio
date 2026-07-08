import { motion } from 'framer-motion';
import { Star, ArrowUp } from 'lucide-react';
import { profile, socials, navLinks } from '../data';
import Reveal from './Reveal';

export default function Footer() {
  const year = 2026;

  return (
    <footer className="relative mt-10 border-t border-white/10 px-6 py-14">
      <Reveal>
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center gap-2.5 md:justify-start">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 text-xs font-bold text-white">
                  {profile.initials}
                </span>
                <span className="font-display text-lg font-semibold text-white">
                  {profile.handle}
                </span>
              </div>
              <p className="mt-3 max-w-xs text-sm text-white/50">{profile.tagline}</p>
            </div>

            {/* Quick links */}
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {navLinks.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(l.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-sm text-white/55 transition-colors hover:text-white"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition-all hover:-translate-y-0.5 hover:text-white hover:shadow-glow"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Bottom row */}
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <p className="text-sm text-white/45">
              © {year} {profile.handle}. Crafted with passion &amp; precision.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-white/40">
              <Star className="h-3.5 w-3.5 fill-indigo-400/60 text-indigo-400/60" />
              Made in {profile.location.split(',')[1]?.trim() ?? 'Morocco'}
              <Star className="h-3.5 w-3.5 fill-indigo-400/60 text-indigo-400/60" />
            </div>
          </div>
        </div>
      </Reveal>

      {/* Back to top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Back to top"
        className="mx-auto mt-10 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-white hover:shadow-glow"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </footer>
  );
}
