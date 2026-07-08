import { useEffect, useState } from 'react';
import { CalendarHeart, PartyPopper } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/** Countdown to the next occurrence of a DD/MM birthday. */
export default function BirthdayCountdown({ birth }: { birth: string }) {
  const [time, setTime] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    const [day, month] = birth.split('/').map(Number);

    const tick = () => {
      const now = new Date();
      const year = now.getFullYear();
      let next = new Date(year, month - 1, day, 0, 0, 0);
      if (next.getTime() <= now.getTime() && !(now.getDate() === day && now.getMonth() === month - 1)) {
        next = new Date(year + 1, month - 1, day, 0, 0, 0);
      }
      setIsToday(now.getDate() === day && now.getMonth() === month - 1);

      const diff = Math.max(0, next.getTime() - now.getTime());
      setTime({
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff / 3_600_000) % 24),
        minutes: Math.floor((diff / 60_000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [birth]);

  if (isToday) {
    return (
      <div className="mb-4 flex items-center justify-center gap-2 rounded-xl border border-pink-400/30 bg-gradient-to-r from-pink-500/20 to-purple-500/20 py-2.5 text-sm font-semibold text-pink-200">
        <PartyPopper className="h-4 w-4" />
        Happy Birthday!
        <PartyPopper className="h-4 w-4" />
      </div>
    );
  }

  const cells: [number, string][] = [
    [time.days, 'Days'],
    [time.hours, 'Hrs'],
    [time.minutes, 'Min'],
    [time.seconds, 'Sec'],
  ];

  return (
    <div className="mb-4 rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <div className="mb-2 flex items-center justify-center gap-1.5 text-[0.7rem] font-medium uppercase tracking-wider text-indigo-300/80">
        <CalendarHeart className="h-3.5 w-3.5" />
        Next Birthday
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {cells.map(([value, label]) => (
          <div key={label} className="rounded-lg bg-white/5 py-2 text-center">
            <div className="font-display text-lg font-bold tabular-nums text-white">
              {String(value).padStart(2, '0')}
            </div>
            <div className="text-[0.6rem] uppercase tracking-wide text-white/40">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
