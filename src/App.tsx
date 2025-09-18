import React, { useState, useEffect, useRef } from 'react';
import { Github, Instagram, Music, Youtube, Lock, Eye, EyeOff, Star, Heart, Users, Send, CheckCircle, XCircle, Calendar, Clock } from 'lucide-react';

const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-purple-400/10 to-blue-400/10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const SocialLink = ({ href, icon: Icon, label, gradient }: { href: string; icon: React.ElementType; label: string; gradient: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`group relative p-4 rounded-2xl bg-gradient-to-br ${gradient} backdrop-blur-sm border border-white/10 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/25`}
  >
    <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {label}
    </span>
  </a>
);

const AnimatedSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const BirthdayCountdown = ({ birthDate }: { birthDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      
      // Parse the birth date (DD/MM/YYYY format)
      const [day, month] = birthDate.split('/').map(num => parseInt(num));
      
      // Create birthday date for this year
      let birthday = new Date(currentYear, month - 1, day);
      
      // If birthday has passed this year, use next year
      if (birthday < now) {
        birthday = new Date(currentYear + 1, month - 1, day);
      }
      
      const difference = birthday.getTime() - now.getTime();
      
      // Check if it's today
      const today = new Date();
      const isBirthdayToday = today.getDate() === day && today.getMonth() === month - 1;
      setIsToday(isBirthdayToday);
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [birthDate]);

  if (isToday) {
    return (
      <div className="flex items-center justify-center gap-2 mb-4 p-3 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/30 animate-pulse">
        <Heart className="w-5 h-5 text-pink-400 animate-bounce" />
        <span className="text-pink-300 font-bold text-sm">🎉 HAPPY BIRTHDAY! 🎉</span>
        <Heart className="w-5 h-5 text-pink-400 animate-bounce" />
      </div>
    );
  }

  return (
    <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Calendar className="w-4 h-4 text-blue-400" />
        <span className="text-blue-300 text-xs font-medium">Next Birthday</span>
      </div>
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-white/5 rounded-lg p-2">
          <div className="text-lg font-bold text-white">{timeLeft.days}</div>
          <div className="text-xs text-gray-400">Days</div>
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          <div className="text-lg font-bold text-white">{timeLeft.hours}</div>
          <div className="text-xs text-gray-400">Hours</div>
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          <div className="text-lg font-bold text-white">{timeLeft.minutes}</div>
          <div className="text-xs text-gray-400">Min</div>
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          <div className="text-lg font-bold text-white">{timeLeft.seconds}</div>
          <div className="text-xs text-gray-400">Sec</div>
        </div>
      </div>
    </div>
  );
};

const PinProtectedSection = () => {
  const [pin, setPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '0099') {
      setIsUnlocking(true);
      setError(false);
      
      // Show success animation
      setTimeout(() => {
        setShowSuccess(true);
      }, 500);
      
      // Unlock after animation
      setTimeout(() => {
        setIsUnlocked(true);
      }, 1500);
    } else {
      setError(true);
      // Shake animation and reset
      setTimeout(() => {
        setError(false);
        setPin('');
      }, 1000);
    }
  };

  const friends = [
    {
      name: "Maryem",
      birth: "15/06/2010",
      description: "My short Beautiful lovely queen, she's really the best person I've ever known, I LOVE YOU MY HIJABI SISTER 🤍",
      emoji: "👑"
    },
    {
      name: "Zineb",
      birth: "28/06/2010", 
      description: "BEST HAIR, best curls, mature, kind, seems mean but she isn't",
      emoji: "💫"
    },
    {
      name: "Aya",
      birth: "22/07/2010",
      description: "My little monkey, sensitive, BEAUTIFUL, so damn loved",
      emoji: "🐵"
    },
    {
      name: "Kamil",
      birth: "15/01/2010",
      description: "Shy big bro, loved for his kindness",
      emoji: "🛡️"
    },
    {
    name: "Wiam",
    birth: "14/01/2011",
    description: "To the only girl I ever truly loved: thank you for passing through my life. It has been torment trying to move on, trying to forget, trying to unlove. Some would call it foolish, but I still love you, still think of you, still wish you’d return—maybe not as a lover, but at least as a friend. You will never read this, never know I carved time to write it. Yet still, I love you. I miss you. And I would take you back in a heartbeat.",
    emoji: "❤"
    },
    {
      name: "Mahmoud (Me)",
      birth: "19/07/2010",
      description: "Love my friends as if they were my personal and only caring family, mostly hated from girls because of my cold answers but respected from boys because of his attitude. Have two main emotions: love and hate",
      emoji: "⚔️"
    },

  ];

  if (!isUnlocked) {
    return (
      <div className="text-center">
        {/* Success Animation Overlay */}
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="animate-bounce">
              <CheckCircle className="w-24 h-24 text-green-400 animate-pulse" />
            </div>
          </div>
        )}

        <div className={`transition-all duration-500 ${isUnlocking ? 'scale-110 opacity-50' : 'scale-100 opacity-100'}`}>
          <div className="inline-flex items-center gap-3 mb-6">
            <Lock className={`w-6 h-6 text-purple-400 transition-all duration-500 ${isUnlocking ? 'animate-bounce' : ''}`} />
            <h2 className="text-2xl font-bold text-white">Protected Section</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="max-w-xs mx-auto">
            <div className="relative mb-4">
              <input
                type={showPin ? "text" : "password"}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN"
                disabled={isUnlocking}
                className={`w-full px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-sm border transition-all duration-300 ${
                  error 
                    ? 'border-red-500/50 animate-shake bg-red-500/10' 
                    : isUnlocking 
                    ? 'border-green-500/50 bg-green-500/10'
                    : 'border-white/10'
                } text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 disabled:opacity-50`}
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                disabled={isUnlocking}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
              >
                {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            {error && (
              <div className="flex items-center justify-center gap-2 mb-4 animate-pulse">
                <XCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-400 text-sm">
                  Incorrect PIN. Try again.
                </p>
              </div>
            )}
            
            <button
              type="submit"
              disabled={isUnlocking}
              className={`w-full py-3 rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 ${
                isUnlocking
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 animate-pulse'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25'
              } text-white`}
            >
              {isUnlocking ? 'Unlocking...' : 'Unlock'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center animate-fade-in">
      <div className="inline-flex items-center gap-3 mb-8">
        <Heart className="w-6 h-6 text-red-400 animate-pulse" />
        <h2 className="text-3xl font-bold text-white">MY MOST LOVED ONES</h2>
        <Heart className="w-6 h-6 text-red-400 animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {friends.map((friend, index) => (
          <AnimatedSection key={friend.name} delay={index * 200}>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 animate-slide-in-up">
              <div className="text-4xl mb-4">{friend.emoji}</div>
              <h3 className="text-xl font-bold text-white mb-2">{friend.name}</h3>
              <p className="text-purple-300 text-sm mb-4">Born: {friend.birth}</p>
              
              {/* Birthday Countdown Timer */}
              <BirthdayCountdown birthDate={friend.birth} />
              
              <p className="text-gray-300 text-sm leading-relaxed">{friend.description}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

function App() {
  useEffect(() => {
    document.body.style.overflow = 'auto';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F23] via-[#1A1A2E] to-[#16213E] text-white relative">
      <ParticleBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center">
            <div className="px-8 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
              <div className="flex items-center gap-6">
                <a href="#home" className="text-white hover:text-purple-400 transition-colors font-medium">Home</a>
                <a href="#about" className="text-white hover:text-purple-400 transition-colors font-medium">About</a>
                <a href="#social" className="text-white hover:text-purple-400 transition-colors font-medium">Social</a>
                <a href="#friends" className="text-white hover:text-purple-400 transition-colors font-medium">Friends</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="text-center max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 p-1">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0F0F23] to-[#1A1A2E] flex items-center justify-center">
                  <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    SW
                  </span>
                </div>
              </div>
              <h1 className="text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600 bg-clip-text text-transparent leading-tight">
                Samurai_vxtW
              </h1>
              <div className="h-1 w-24 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6"></div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Full Stack Developer • Music Producer • Beat Maker
            </p>
          </AnimatedSection>

          <AnimatedSection delay={600}>
            <div className="flex flex-wrap justify-center gap-4 text-gray-400">
              <span className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                🌍 Rabat, Morocco
              </span>
              <span className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                🎂 19/07/2010
              </span>
              <span className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                💻 Developer
              </span>
              <span className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                🎵 Producer
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              About Me
            </h2>
          </AnimatedSection>
          
          <AnimatedSection delay={300}>
            <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                Born in the vibrant city of Rabat, Morocco, I'm a passionate full-stack developer and music producer. 
                I blend the art of coding with the rhythm of music, creating digital experiences and beats that resonate with people.
              </p>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                My journey spans across multiple domains - from crafting elegant code solutions to producing captivating beats. 
                Every project I undertake carries the precision of a samurai and the creativity of an artist.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Social Media Section */}
      <section id="social" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-6xl font-bold mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Connect With Me
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <div className="flex flex-wrap justify-center gap-8">
              <SocialLink
                href="https://github.com/TheGodFather911"
                icon={Github}
                label="GitHub"
                gradient="from-gray-600 to-gray-800"
              />
              <SocialLink
                href="https://www.instagram.com/mah.jfr9"
                icon={Instagram}
                label="Instagram"
                gradient="from-pink-600 to-purple-600"
              />
              <SocialLink
                href="https://t.me/samurai_vxtw"
                icon={Send}
                label="Telegram"
                gradient="from-blue-500 to-cyan-600"
              />
              <SocialLink
                href="https://open.spotify.com/user/3126geoe42tbpfbruyqpid2e4si4?si=314fc97c11ff4de6"
                icon={Music}
                label="Spotify"
                gradient="from-green-600 to-green-800"
              />
              <SocialLink
                href="https://www.youtube.com/@urmomlvr911"
                icon={Youtube}
                label="YouTube"
                gradient="from-red-600 to-red-800"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={600}>
            <p className="text-gray-400 mt-12 text-lg">
              Follow my journey across platforms and let's create something amazing together.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Friends Section */}
      <section id="friends" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-purple-400" />
                <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Friends
                </h2>
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <p className="text-gray-400 text-lg">
                The most important people in my life
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <div className="p-12 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10">
              <PinProtectedSection />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center border-t border-white/10">
        <AnimatedSection>
          <p className="text-gray-400 mb-4">
            &copy; 2024 Samurai_vxtW. Crafted with passion and precision.
          </p>
          <div className="flex justify-center items-center gap-2 text-sm text-gray-500">
            <Star className="w-4 h-4" />
            <span>Made in Morocco</span>
            <Star className="w-4 h-4" />
          </div>
        </AnimatedSection>
      </footer>
    </div>
  );
}

export default App;