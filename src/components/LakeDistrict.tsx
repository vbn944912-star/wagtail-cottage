import React, { useState } from 'react';
import { ATTRACTIONS } from '../data';
import { MapPin, Compass, Car, Lightbulb, Check } from 'lucide-react';

export default function LakeDistrict() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Hiking' | 'Families' | 'Lakes & Sea'>('All');

  // Categorize for elite interaction
  const getCategorizedAttractions = () => {
    return ATTRACTIONS.filter((att) => {
      if (activeCategory === 'All') return true;
      if (activeCategory === 'Hiking') {
        return att.name === 'Scafell Pike' || att.name === 'Wasdale Valley';
      }
      if (activeCategory === 'Families') {
        return att.name === 'Muncaster Castle' || att.name === 'Ravenglass Railway';
      }
      if (activeCategory === 'Lakes & Sea') {
        return att.name === 'Wast Water' || att.name === 'Seascale Beach';
      }
      return true;
    });
  };

  const activeAttractions = getCategorizedAttractions();

  return (
    <section id="attractions" className="py-24 bg-white relative">
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-gold/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Text */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-gold" />
            <span className="font-accent tracking-widest text-xs uppercase text-gold italic font-medium">
              Adventure On Your Doorstep
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight text-forest leading-tight">
            Experience The Lake District
          </h2>
          <p className="text-sm md:text-base text-charcoal/70 mt-4 leading-relaxed font-light">
            From scenic walks and mountain trails to historic villages and beautiful lakes, Wagtail Cottage places guests at the center of everything the Lake District has to offer.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap items-center gap-2.5 mb-12 pb-2 border-b border-stone-warm/30">
          {(['All', 'Hiking', 'Families', 'Lakes & Sea'] as const).map((cat) => (
            <button
              key={cat}
              id={`btn-attraction-filter-${cat.toLowerCase().replace(/[\s&]+/g, '-')}`}
              onClick={() => setActiveCategory(cat)}
              className={`pb-4 px-4 text-xs font-sans tracking-widest uppercase relative font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'text-forest font-semibold'
                  : 'text-charcoal/50 hover:text-forest'
              }`}
            >
              {cat === 'All' ? 'View All Attractions' : cat}
              {activeCategory === cat && (
                <span className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-gold" />
              )}
            </button>
          ))}
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeAttractions.map((att) => (
            <div
              key={att.name}
              id={`attraction-card-${att.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group bg-stone-light/40 border border-stone-warm/30 rounded-xl overflow-hidden shadow-sm flex flex-col hover:shadow-xl hover:border-gold/20 duration-500 transition-all"
            >
              {/* Picture Header with dynamic timing badges */}
              <div className="aspect-[16/10] relative overflow-hidden bg-stone-warm">
                <img
                  src={att.image}
                  alt={att.name}
                  className="w-full h-full object-cover transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay details */}
                <div className="absolute top-4 left-4 bg-charcoal/90 backdrop-blur text-white px-3 py-1.5 rounded flex items-center gap-1.5 text-[10px] font-mono tracking-wider">
                  <Car className="w-3.5 h-3.5 text-gold" />
                  <span>{att.distance} ({att.driveTime})</span>
                </div>
              </div>

              {/* Main Text Content */}
              <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg md:text-xl font-medium text-forest group-hover:text-gold duration-300 transition-colors flex items-center gap-2">
                    <MapPin className="w-4.5 h-4.5 text-gold shrink-0" />
                    <span>{att.name}</span>
                  </h3>
                  
                  <p className="text-xs md:text-sm text-charcoal/75 leading-relaxed font-light mt-3">
                    {att.description}
                  </p>

                  {/* Highlights Activities List */}
                  <div className="mt-5 pt-5 border-t border-stone-warm/40">
                    <span className="block text-[10px] uppercase tracking-widest font-semibold text-charcoal/50 mb-2.5">Key Highlights</span>
                    <ul className="space-y-1.5">
                      {att.activities.map((act, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-charcoal/80">
                          <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Local Insider Tip panel in soft gold/green blend */}
                <div className="mt-6 p-4 bg-forest/5 border border-gold/10 rounded-lg">
                  <div className="flex gap-2 text-gold">
                    <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[9px] uppercase tracking-wider font-semibold font-sans text-forest">Cottage Hosts Tip:</span>
                      <p className="text-xs text-forest-light mt-1 font-accent italic leading-relaxed">
                        &ldquo;{att.tips}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
