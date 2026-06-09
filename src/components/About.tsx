import React from 'react';
import { COTTAGE_INFO } from '../data';
import { Sparkles, CalendarDays, Key, Heart } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="relative py-24 bg-stone-light">
      {/* Editorial Decorative Overlays */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-gold/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Narrative with Editorial Badges */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-gold" />
              <span className="font-accent tracking-widest text-xs md:text-sm uppercase text-gold italic font-medium">
                The Heritage & Comfort
              </span>
            </div>
            
            <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight text-forest mb-8 leading-[1.15]">
              Discover Wagtail Cottage
            </h2>
            
            <div className="space-y-6 font-sans text-sm md:text-base text-charcoal/85 leading-relaxed font-light">
              <p>
                Nestled within the stunning <strong className="font-medium text-forest">Lake District National Park</strong>, 
                Wagtail Cottage offers a refined countryside experience for families, couples, and nature lovers seeking 
                an unforgettable escape. 
              </p>
              <p>
                Every detail has been thoughtfully designed to combine traditional Cumbrian charm with modern luxury, 
                creating a welcoming sanctuary where guests can relax, reconnect, and explore one of Britain&apos;s most 
                beautiful landscapes.
              </p>
            </div>

            {/* Micro Boutique Specs */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-stone-warm">
              <div id="stat-restored">
                <span className="block font-serif text-2xl md:text-3xl font-medium text-forest">1672</span>
                <span className="block text-[10px] md:text-xs text-charcoal/60 uppercase tracking-widest font-accent">Year Built</span>
                <p className="text-[10px] text-gold mt-1 italic">Exposed beams throughout</p>
              </div>
              <div id="stat-acreage">
                <span className="block font-serif text-2xl md:text-3xl font-medium text-forest">2024</span>
                <span className="block text-[10px] md:text-xs text-charcoal/60 uppercase tracking-widest font-accent">Full Restoration</span>
                <p className="text-[10px] text-gold mt-1 italic">State-of-the-art kitchen</p>
              </div>
              <div id="stat-elevation">
                <span className="block font-serif text-2xl md:text-3xl font-medium text-forest">5★</span>
                <span className="block text-[10px] md:text-xs text-charcoal/60 uppercase tracking-widest font-accent">Luxury Gold</span>
                <p className="text-[10px] text-gold mt-1 italic">Accredited countryside stay</p>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Overlapping Pictures & Cozy Details */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl border-4 border-white aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1542118356-944a95bb2155?q=80&w=800"
                alt="Wagtail Cottage stone details"
                className="w-full h-full object-cover hover:scale-105 duration-700 transition-transform"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Overlapping Offset Small Card */}
            <div className="absolute -bottom-6 -left-8 z-20 bg-forest text-white p-6 rounded shadow-xl max-w-[240px] hidden md:block border border-gold/20">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-forest-light rounded-full text-gold">
                  <Heart className="w-4 h-4 fill-gold" />
                </div>
                <div>
                  <h4 className="font-serif text-sm text-gold tracking-wide">Fully Managed</h4>
                  <p className="text-xs text-stone-warm/80 mt-1.5 leading-relaxed font-light">
                    On-site assistance, professional cleaning, and freshly baked Cumbrian scones upon your arrival.
                  </p>
                </div>
              </div>
            </div>

            {/* Circle Decorative Golden Crest */}
            <div className="absolute -top-10 -right-6 z-0 w-28 h-28 border border-gold/20 rounded-full flex items-center justify-center p-3 animate-reverse-spin">
              <div className="w-full h-full border border-dashed border-gold/10 rounded-full flex items-center justify-center">
                <span className="text-[8px] tracking-widest text-gold uppercase text-center leading-none">
                  Wagtail<br />Escape<br />• 2026 •
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
