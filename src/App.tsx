import AmbientBackground from './components/AmbientBackground';
import GlassFilters from './components/GlassFilters';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Social from './components/Social';
import Circle from './components/Circle';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="grain relative min-h-[100dvh] overflow-x-hidden text-white">
      <GlassFilters />
      <AmbientBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Social />
        <Circle />
      </main>
      <Footer />
    </div>
  );
}
