import { useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Lock, Eye, EyeOff, Heart, ShieldCheck, XCircle, Users } from 'lucide-react';
import { lovedOnes, LOVED_ONES_PIN } from '../data';
import BirthdayCountdown from './BirthdayCountdown';
import Reveal from './Reveal';
import GlassCard from './GlassCard';

export default function Circle() {
  const [pin, setPin] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const reduce = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (unlocking) return;
    if (pin === LOVED_ONES_PIN) {
      setError(false);
      setUnlocking(true);
      setTimeout(() => setUnlocked(true), 900);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
        setPin('');
        inputRef.current?.focus();
      }, 900);
    }
  };

  return (
    <section id="circle" className="section-pad relative mx-auto max-w-6xl">
      <Reveal>
        <div className="mb-4 flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-indigo-300/80">
          <Users className="h-4 w-4" />
          Circle
        </div>
        <h2 className="text-center font-display text-4xl font-bold tracking-tight sm:text-5xl">
          My most <span className="text-gradient">loved ones</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-white/55">
          The most important people in my life — protected behind a private key.
        </p>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="glass-panel mt-12 overflow-hidden rounded-3xl p-6 sm:p-12">
          <AnimatePresence mode="wait">
            {!unlocked ? (
              /* ---------------- Lock screen ---------------- */
              <motion.div
                key="lock"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  scale: unlocking ? 1.03 : 1,
                }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto max-w-sm text-center"
              >
                <motion.div
                  animate={
                    unlocking && !reduce
                      ? { rotate: [0, -8, 8, 0], scale: [1, 1.15, 1] }
                      : {}
                  }
                  transition={{ duration: 0.6 }}
                  className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500/25 to-sky-500/15 ring-1 ring-white/10"
                >
                  {unlocking ? (
                    <ShieldCheck className="h-8 w-8 text-emerald-300" />
                  ) : (
                    <Lock className="h-7 w-7 text-indigo-200" />
                  )}
                </motion.div>

                <h3 className="font-display text-xl font-semibold text-white">
                  {unlocking ? 'Access granted' : 'Protected section'}
                </h3>
                <p className="mt-2 text-sm text-white/50">
                  {unlocking ? 'Opening my heart…' : 'Enter the PIN to continue.'}
                </p>

                <form onSubmit={submit} className="mt-6">
                  <motion.div
                    animate={error && !reduce ? { x: [0, -10, 10, -8, 8, 0] } : {}}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <input
                      ref={inputRef}
                      type={show ? 'text' : 'password'}
                      inputMode="numeric"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      placeholder="• • • •"
                      disabled={unlocking}
                      aria-label="PIN"
                      aria-invalid={error}
                      className={`w-full rounded-2xl border bg-white/5 px-5 py-3.5 text-center font-display text-lg tracking-[0.4em] text-white outline-none transition-colors placeholder:tracking-[0.3em] placeholder:text-white/30 disabled:opacity-60 ${
                        error
                          ? 'border-red-500/60 bg-red-500/10'
                          : unlocking
                            ? 'border-emerald-500/50 bg-emerald-500/10'
                            : 'border-white/10 focus:border-indigo-400/60'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShow((v) => !v)}
                      disabled={unlocking}
                      aria-label={show ? 'Hide PIN' : 'Show PIN'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-white/40 hover:text-white/80"
                    >
                      {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </motion.div>

                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        role="alert"
                        className="mt-3 flex items-center justify-center gap-1.5 text-sm text-red-300"
                      >
                        <XCircle className="h-4 w-4" />
                        Incorrect PIN. Try again.
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={unlocking}
                    className="mt-5 w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-sky-500 py-3 font-display font-semibold text-white shadow-glow transition-all hover:shadow-glow-lg disabled:opacity-70"
                  >
                    {unlocking ? 'Unlocking…' : 'Unlock'}
                  </button>
                </form>
              </motion.div>
            ) : (
              /* ---------------- Revealed grid ---------------- */
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="mb-8 flex items-center justify-center gap-2.5">
                  <Heart className="h-5 w-5 animate-pulse text-rose-400" />
                  <h3 className="font-display text-2xl font-bold text-white">My Most Loved Ones</h3>
                  <Heart className="h-5 w-5 animate-pulse text-rose-400" />
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {lovedOnes.map((person, idx) => (
                    <motion.div
                      key={person.name}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: idx * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <GlassCard frost tilt={7} className="group h-full rounded-2xl p-6">
                        <div className="mb-3 text-4xl">{person.emoji}</div>
                        <h4 className="font-display text-xl font-semibold text-white">
                          {person.name}
                        </h4>
                        <p className="mb-4 mt-0.5 text-sm text-indigo-300/80">Born {person.birth}</p>
                        <BirthdayCountdown birth={person.birth} />
                        <p className="text-sm leading-relaxed text-white/65">{person.description}</p>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}
