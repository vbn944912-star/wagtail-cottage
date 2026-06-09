import React from 'react';
import { WHY_CHOOSE_ITEMS } from '../data';
import { ShieldAlert, Compass, Sparkles, Heart } from 'lucide-react';

export default function WhyChoose() {
  // Map icons to index
  const ICONS = [
    <ShieldAlert className="w-5 h-5 text-gold" />,
    <Sparkles className="w-5 h-5 text-gold" />,
    <Compass className="w-5 h-5 text-gold" />,
    <Heart className="w-5 h-5 text-gold fill-gold/10" />,
  ];

  return (
    <section id="why-choose" className="py-24 bg-stone-light relative overflow-hidden">
      {/* Decorative vertical background line */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-stone-warm/30 pointer-events-none hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title Fold */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-gold" />
            <span className="font-accent tracking-widest text-xs uppercase text-gold italic font-medium">
              Pure Sanctuary
            </span>
            <span className="w-6 h-px bg-gold" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight text-forest">
            Why Guests Choose Wagtail
          </h2>
          <p className="text-xs md:text-sm text-charcoal/60 mt-4 leading-relaxed font-light">
            Providing more than just self-catering. We pride ourselves on creating an authentic, boutique sanctuary of lasting elegance.
          </p>
        </div>

        {/* 2x2 grid representing the 4 core pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {WHY_CHOOSE_ITEMS.map((item, idx) => (
            <div
              key={idx}
              id={`why-choose-card-${idx}`}
              className="bg-white border border-stone-warm/30 p-8 md:p-10 rounded-xl shadow-sm flex gap-6 hover:shadow-md hover:border-gold/20 duration-300 transition-all group"
            >
              {/* Left-side Rounded Icon */}
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-full bg-forest/5 flex items-center justify-center border border-gold/10 group-hover:bg-forest group-hover:text-white group-hover:border-transparent transition-all duration-300">
                  {ICONS[idx]}
                </div>
              </div>

              {/* Right-side Description */}
              <div>
                <h3 className="font-serif text-lg md:text-xl font-medium text-forest mb-3">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-charcoal/70 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
