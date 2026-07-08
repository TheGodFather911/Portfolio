import type { LucideIcon } from 'lucide-react';
import { Github, Instagram, Send, Music2, Youtube } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Identity                                                           */
/* ------------------------------------------------------------------ */
export const profile = {
  handle: 'Samurai_vxtW',
  initials: 'SW',
  realName: 'Mahmoud',
  roles: ['Full Stack Developer', 'Music Producer', 'Beat Maker'],
  location: 'Rabat, Morocco',
  birthday: '19/07/2010',
  tagline: 'Crafting code with the precision of a samurai and the soul of an artist.',
};

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */
export const about = {
  paragraphs: [
    "Born in the vibrant city of Rabat, Morocco, I'm a passionate full-stack developer and music producer. I blend the art of coding with the rhythm of music — creating digital experiences and beats that resonate with people.",
    'My journey spans multiple domains, from crafting elegant code solutions to producing captivating beats. Every project I undertake carries the precision of a samurai and the creativity of an artist.',
  ],
};

/* What I do — two disciplines, one mindset */
export interface Craft {
  title: string;
  blurb: string;
  tags: string[];
}

export const crafts: Craft[] = [
  {
    title: 'Development',
    blurb:
      'Full-stack builds with a taste for clean, fast, responsive interfaces that feel effortless on every device.',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node'],
  },
  {
    title: 'Music Production',
    blurb:
      'Beats and productions with a signature blend of rhythm and atmosphere — the artist half of the samurai.',
    tags: ['Beat Making', 'Mixing', 'Sound Design', 'Sampling'],
  },
];

/* Quick facts shown as stat tiles in the hero */
export const facts = [
  { label: 'Based in', value: 'Rabat, MA' },
  { label: 'Disciplines', value: 'Dev · Music' },
  { label: 'Mindset', value: 'Precision' },
];

/* ------------------------------------------------------------------ */
/*  Social                                                             */
/* ------------------------------------------------------------------ */
export interface Social {
  label: string;
  handle: string;
  href: string;
  icon: LucideIcon;
  from: string;
  to: string;
}

export const socials: Social[] = [
  {
    label: 'GitHub',
    handle: '@TheGodFather911',
    href: 'https://github.com/TheGodFather911',
    icon: Github,
    from: 'from-zinc-500/25',
    to: 'to-zinc-700/10',
  },
  {
    label: 'Instagram',
    handle: '@mah.jfr9',
    href: 'https://www.instagram.com/mah.jfr9',
    icon: Instagram,
    from: 'from-pink-500/25',
    to: 'to-purple-600/10',
  },
  {
    label: 'Telegram',
    handle: '@samurai_vxtw',
    href: 'https://t.me/samurai_vxtw',
    icon: Send,
    from: 'from-sky-500/25',
    to: 'to-cyan-500/10',
  },
  {
    label: 'Spotify',
    handle: 'Listen to my sound',
    href: 'https://open.spotify.com/user/3126geoe42tbpfbruyqpid2e4si4?si=314fc97c11ff4de6',
    icon: Music2,
    from: 'from-emerald-500/25',
    to: 'to-green-600/10',
  },
  {
    label: 'YouTube',
    handle: '@urmomlvr911',
    href: 'https://www.youtube.com/@urmomlvr911',
    icon: Youtube,
    from: 'from-red-500/25',
    to: 'to-rose-600/10',
  },
];

/* ------------------------------------------------------------------ */
/*  Loved ones (PIN-protected)                                         */
/* ------------------------------------------------------------------ */
export const LOVED_ONES_PIN = '0099';

export interface LovedOne {
  name: string;
  birth: string; // DD/MM/YYYY
  description: string;
  emoji: string;
}

export const lovedOnes: LovedOne[] = [
  {
    name: 'Maryem',
    birth: '15/06/2010',
    description:
      "My short beautiful lovely queen — she's really the best person I've ever known. I love you my hijabi sister.",
    emoji: '👑',
  },
  {
    name: 'Zineb',
    birth: '28/06/2010',
    description: 'Best hair, best curls, mature, kind — seems mean but she really isn\'t.',
    emoji: '💫',
  },
  {
    name: 'Aya',
    birth: '22/07/2010',
    description: 'My little monkey — sensitive, beautiful, and so damn loved.',
    emoji: '🐵',
  },
  {
    name: 'Kamil',
    birth: '15/01/2010',
    description: 'Shy big bro, loved for his kindness.',
    emoji: '🛡️',
  },
  {
    name: 'Wiam',
    birth: '13/01/2011',
    description:
      "To the only girl I ever truly loved: thank you for passing through my life. Some would call it foolish, but I still think of you and still wish you'd return — maybe not as a lover, but at least as a friend.",
    emoji: '❤️',
  },
  {
    name: 'Mahmoud (Me)',
    birth: '19/07/2010',
    description:
      'I love my friends as if they were my only family. Two main emotions: love and hate — cold on the surface, loyal underneath.',
    emoji: '⚔️',
  },
];

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */
export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'social', label: 'Connect' },
  { id: 'circle', label: 'Circle' },
];
