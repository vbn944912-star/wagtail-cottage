import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, ChevronDown, Compass, Sparkles } from 'lucide-react';
import { COTTAGE_INFO } from '../data';

// High-fidelity background scenes representing the Lake District themes requested
const BACKGROUNDS = [
  {
    url: 'https://images.unsplash.com/photo-1508873696983-2df519f0397e?q=80&w=1920',
    title: 'Morning Mist over Fells',
    quote: 'Rolling Lake District hills draped in soft dawn mist.'
  },
  {
    url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1920',
    title: 'The Fireside Hearth Glow',
    quote: 'Feel the comforting hug of a real Cumbrian flame.'
  },
  {
    url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1920',
    title: 'Wagtail Exterior Sanctuary',
    quote: 'A traditional 17th-century solid stone sanctuary.'
  },
  {
    url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1920',
    title: 'Luxury Cottage Interiors',
    quote: 'Dressed with Egyptian crisp linens and natural slate.'
  }
];

export default function Hero() {
  const [currentBg, setCurrentBg] = useState(0);
  const [soundMode, setSoundMode] = useState<'none' | 'birds' | 'fire'>('none');
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [activeSources, setActiveSources] = useState<any[]>([]);

  // Automatic background crossfade transition
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % BACKGROUNDS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Web Audio Synth to create realistic "Fire Crackle" or "Forest Birdsong"
  const startSynthSound = (type: 'birds' | 'fire') => {
    // Stop previous audio
    stopSynthSound();

    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioContext(ctx);

      const sourcesList: any[] = [];

      if (type === 'fire') {
        // Crackling fireplace simulator (noise burst + bandpass + low-frequency rumble)
        // 1. Low rumble
        const osc = ctx.createOscillator();
        const lowGain = ctx.createGain();
        osc.frequency.setValueAtTime(45, ctx.currentTime);
        osc.type = 'triangle';
        lowGain.gain.setValueAtTime(0.3, ctx.currentTime);
        osc.connect(lowGain);
        lowGain.connect(ctx.destination);
        osc.start();
        sourcesList.push(osc);

        // 2. Continuous crackle bursts using a script processor or periodic click filters
        const bufferSize = ctx.sampleRate * 2; // 2 seconds of buffer
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
          // Mostly quiet with random high-amplitude pops (clicks)
          if (Math.random() < 0.00015) {
            output[i] = (Math.random() * 2 - 1) * 0.8;
          } else if (Math.random() < 0.003) {
            // Smaller crackles
            output[i] = (Math.random() * 2 - 1) * 0.05;
          } else {
            // Gentle hiss background
            output[i] = (Math.random() * 2 - 1) * 0.002;
          }
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.value = 1400;
        noiseFilter.Q.value = 1.0;

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.65, ctx.currentTime);

        whiteNoise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        whiteNoise.start();

        sourcesList.push(whiteNoise);
      } else if (type === 'birds') {
        // Forest birdsong synthesizer (modulated high frequency sine waves popping in and out)
        const generateChirp = () => {
          if (ctx.state === 'closed') return;
          const chirpOsc = ctx.createOscillator();
          const chirpGain = ctx.createGain();
          
          // Bird Chirp frequency sweep (e.g. 2500Hz -> 4500Hz very quickly)
          const startFreq = 2200 + Math.random() * 1000;
          const endFreq = startFreq + 1000 + Math.random() * 1500;
          
          chirpOsc.type = 'sine';
          chirpOsc.frequency.setValueAtTime(startFreq, ctx.currentTime);
          chirpOsc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + 0.12);
          
          chirpGain.gain.setValueAtTime(0.001, ctx.currentTime);
          chirpGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.03);
          chirpGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
          
          chirpOsc.connect(chirpGain);
          chirpGain.connect(ctx.destination);
          
          chirpOsc.start();
          chirpOsc.stop(ctx.currentTime + 0.13);
        };

        // Trigger random chirps
        const chirpInterval = setInterval(() => {
          if (Math.random() > 0.3) {
            generateChirp();
            if (Math.random() > 0.5) {
              setTimeout(generateChirp, 150);
              setTimeout(generateChirp, 300);
            }
          }
        }, 1200);

        // Keep a ref to clear the interval
        const timerObj = {
          stop: () => clearInterval(chirpInterval)
        };
        sourcesList.push(timerObj);
      }

      setActiveSources(sourcesList);
    } catch (e) {
      console.warn('Web Audio not supported or failed to initialize', e);
    }
  };

  const stopSynthSound = () => {
    activeSources.forEach((src) => {
      try {
        if (typeof src.stop === 'function') {
          src.stop();
        }
      } catch (err) {}
    });
    if (audioContext) {
      try {
        audioContext.close();
      } catch (err) {}
    }
    setActiveSources([]);
    setAudioContext(null);
  };

  const toggleSound = (mode: 'birds' | 'fire') => {
    if (soundMode === mode) {
      stopSynthSound();
      setSoundMode('none');
    } else {
      setSoundMode(mode);
      startSynthSound(mode);
    }
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Images Crossfader */}
      {BACKGROUNDS.map((bg, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            idx === currentBg ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
          style={{
            transition: 'opacity 2000ms ease-in-out, transform 6000ms ease-out',
          }}
        >
          <img
            src={bg.url}
            alt={bg.title}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(to bottom, rgba(26,26,26,0.65) 0%, rgba(35,53,45,0.7) 50%, rgba(26,26,26,0.85) 100%)'
            }}
          />
        </div>
      ))}

      {/* Decorative Golden Light Ray Top Right */}
      <div className="absolute top-0 right-0 w-[45%] h-[60%] bg-gradient-to-bl from-gold/15 via-gold/5 to-transparent blur-[140px] pointer-events-none" />

      {/* Content Frame */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Superior Boutique Tag */}
        <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 bg-forest-light/60 border border-gold/40 rounded-full text-gold-light tracking-widest text-[10px] md:text-xs uppercase font-accent animate-pulse">
          <Sparkles className="w-3 md:w-3.5 h-3 md:h-3.5" />
          <span>{COTTAGE_INFO.tagline}</span>
        </div>

        {/* Headline */}
        <h1
          id="hero-headline"
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white mb-6 leading-[1.1]"
        >
          Luxury Cottage Retreat <br />
          <span className="font-accent italic text-gold">in the Heart of the Lake District</span>
        </h1>

        {/* Subheadline */}
        <p
          id="hero-subheadline"
          className="max-w-2xl text-stone-warm/90 font-sans text-sm md:text-lg tracking-wide mb-10 leading-relaxed font-light"
        >
          Escape to a beautifully restored three-bedroom cottage surrounded by breathtaking countryside, where comfort, tranquility, and nature meet.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16">
          <button
            id="hero-btn-book"
            onClick={() => scrollToId('contact')}
            className="w-full sm:w-auto px-8 py-4 bg-gold hover:bg-gold-light text-white font-serif tracking-widest uppercase text-xs duration-300 shadow-xl transition-all hover:-translate-y-0.5 rounded cursor-pointer"
          >
            Book Your Stay
          </button>
          <button
            id="hero-btn-explore"
            onClick={() => scrollToId('about')}
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 hover:border-white text-white font-sans tracking-widest uppercase text-xs duration-300 transition-all rounded hover:bg-white/10 cursor-pointer"
          >
            Explore The Cottage
          </button>
        </div>

        {/* Immersive Soundscapes Console */}
        <div
          id="hero-soundscape-console"
          className="relative bg-black/40 backdrop-blur-md border border-white/10 px-6 py-3.5 rounded-full flex flex-wrap items-center justify-center gap-4 max-w-full text-xs text-stone-warm"
        >
          <span className="font-accent tracking-wider italic text-gold flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 animate-bounce" /> Soundscape:
          </span>
          <div className="flex items-center gap-2">
            <button
              id="btn-soundscape-birds"
              onClick={() => toggleSound('birds')}
              className={`px-3 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1.5 ${
                soundMode === 'birds' ? 'bg-gold text-white font-medium scale-105' : 'bg-white/5 hover:bg-white/15'
              }`}
            >
              <span>🌲 Morning Birdsong</span>
            </button>
            <button
              id="btn-soundscape-fire"
              onClick={() => toggleSound('fire')}
              className={`px-3 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1.5 ${
                soundMode === 'fire' ? 'bg-gold text-white font-medium scale-105' : 'bg-white/5 hover:bg-white/15'
              }`}
            >
              <span>🔥 Hearth Log Crackles</span>
            </button>
            {soundMode !== 'none' && (
              <button
                id="btn-soundscape-mute"
                onClick={() => toggleSound(soundMode as any)}
                className="p-1 px-2.5 rounded-full bg-red-950/40 text-red-300 hover:bg-red-950/70 transition-colors"
                title="Mute Soundscape"
              >
                <VolumeX className="w-3.5 h-3.5 inline" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Atmospheric bottom fading shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-charcoal to-transparent pointer-events-none" />

      {/* Floating Scroll Indicator */}
      <button
        id="btn-hero-scroll-down"
        onClick={() => scrollToId('trust-bar')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-stone-warm/60 hover:text-gold transition-colors duration-300 animate-bounce"
      >
        <span className="text-[10px] uppercase tracking-widest mb-1">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </button>
    </section>
  );
}
