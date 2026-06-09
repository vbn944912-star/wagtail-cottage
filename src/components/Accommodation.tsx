import React, { useState } from 'react';
import { ROOMS, SPACES } from '../data';
import { Bed, Utensils, Flame, TreePine, ChevronRight, Check, Sparkles } from 'lucide-react';

export default function Accommodation() {
  const [activeTab, setActiveTab] = useState<'bedrooms' | 'kitchen' | 'living' | 'outdoor'>('bedrooms');
  const [activeBedroomIndex, setActiveBedroomIndex] = useState(0);

  // Tab configurations
  const TABS = [
    { id: 'bedrooms', label: 'Three Bedrooms', icon: <Bed className="w-4 h-4" /> },
    { id: 'kitchen', label: 'Chef Kitchen', icon: <Utensils className="w-4 h-4" /> },
    { id: 'living', label: 'Living Spaces', icon: <Flame className="w-4 h-4" /> },
    { id: 'outdoor', label: 'Outdoor Serenity', icon: <TreePine className="w-4 h-4" /> },
  ] as const;

  const currentBedroom = ROOMS[activeBedroomIndex];
  const currentSpace = SPACES.find((s) => s.id === activeTab);

  return (
    <section id="accommodation" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title of Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-gold" />
            <span className="font-accent tracking-widest text-xs uppercase text-gold italic font-medium">
              Designed For Comfort
            </span>
            <span className="w-6 h-px bg-gold" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight text-forest">
            Our Luxury Accommodation
          </h2>
          <p className="text-sm text-charcoal/60 mt-4 leading-relaxed font-light">
            Indulge in a meticulously curated environment fusing authentic Lake District stonework with modern amenities. Choose an area to explore in detail below.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-12">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              id={`accomm-tab-trigger-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3.5 text-xs md:text-sm tracking-wider uppercase font-sans font-medium border duration-300 transition-all rounded cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-forest border-forest text-white shadow-md'
                  : 'bg-stone-light border-stone-warm/35 text-charcoal/70 hover:bg-stone-warm hover:text-forest'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Interactive Workspace Area */}
        <div className="bg-stone-light/50 border border-stone-warm/30 rounded-xl p-6 md:p-10 shadow-sm">
          
          {/* RENDER FOR BEDROOMS */}
          {activeTab === 'bedrooms' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Bedroom Left Showcase Details */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-1.5 text-gold text-xs uppercase font-accent font-semibold mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Bedrooms Fold</span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-forest font-medium mb-3">
                    {currentBedroom.name}
                  </h3>
                  <p className="text-xs md:text-sm text-charcoal/80 leading-relaxed font-light mb-6">
                    {currentBedroom.description}
                  </p>

                  {/* Highlights Box */}
                  <div className="bg-stone-warm/50 border-l-2 border-gold p-3.5 mb-6 rounded-r">
                    <span className="block text-[10px] text-gold font-accent tracking-widest uppercase font-semibold">Cumbrian Scenic Point:</span>
                    <span className="text-xs italic text-forest-light font-accent">{currentBedroom.highlights}</span>
                  </div>

                  {/* Core specs table */}
                  <div className="space-y-2 border-b border-stone-warm/40 pb-5 mb-5 text-xs">
                    <div className="flex items-center justify-between py-1">
                      <span className="text-charcoal/50 font-sans uppercase tracking-wider text-[10px]">Accommodates</span>
                      <span className="font-semibold text-forest text-right">{currentBedroom.capacity}</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-charcoal/50 font-sans uppercase tracking-wider text-[10px]">Bed Size</span>
                      <span className="font-semibold text-forest text-right">{currentBedroom.bedType}</span>
                    </div>
                  </div>

                  {/* Amenities/feature ticks */}
                  <span className="block font-serif text-[10px] text-charcoal/50 uppercase tracking-widest mb-3">Premium In-Room Amenities</span>
                  <div className="grid grid-cols-2 gap-2.5 mb-8">
                    {currentBedroom.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-charcoal/70">
                        <Check className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sub-selectors for other bedrooms */}
                <div className="border-t border-stone-warm/30 pt-6 mt-auto">
                  <span className="block text-[9px] uppercase tracking-widest text-charcoal/40 font-semibold mb-3">Select another bedroom:</span>
                  <div className="flex flex-col gap-2">
                    {ROOMS.map((room, rIdx) => (
                      <button
                        key={room.id}
                        id={`btn-accomm-bedroom-select-${room.id}`}
                        onClick={() => setActiveBedroomIndex(rIdx)}
                        className={`flex items-center justify-between px-4 py-2.5 rounded text-left transition-all text-xs border cursor-pointer ${
                          activeBedroomIndex === rIdx
                            ? 'bg-white border-gold text-gold font-medium shadow-sm'
                            : 'bg-transparent border-transparent text-charcoal/60 hover:bg-white hover:text-charcoal'
                        }`}
                      >
                        <span className="font-serif">{room.name}</span>
                        <span className="text-[10px] opacity-75">{room.capacity}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bedroom Right Carousel Graphics */}
              <div className="lg:col-span-7 aspect-[16/10] relative rounded-lg overflow-hidden shadow-lg border border-stone-warm/20">
                <img
                  src={currentBedroom.image}
                  alt={currentBedroom.name}
                  className="w-full h-full object-cover duration-1000 transform transition-transform scale-102 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-forest/80 backdrop-blur text-white px-3 py-1 text-[10px] tracking-widest uppercase font-accent rounded border border-gold/15">
                  ⭐ Twin / Master Layouts available
                </div>
              </div>

            </div>
          )}

          {/* RENDER FOR OTHER CUSTOM SPACES */}
          {activeTab !== 'bedrooms' && currentSpace && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Space Details Left */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-gold text-xs uppercase font-accent font-semibold mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{currentSpace.subtitle}</span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-forest font-medium mb-3">
                    {currentSpace.name}
                  </h3>
                  <p className="text-xs md:text-sm text-charcoal/80 leading-relaxed font-light mb-8">
                    {currentSpace.description}
                  </p>

                  <span className="block font-serif text-[10px] text-charcoal/50 uppercase tracking-widest mb-3">Highlights & Custom Details</span>
                  <div className="space-y-3 mb-8">
                    {currentSpace.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-charcoal/85 bg-white/60 p-3 rounded border border-stone-warm/10">
                        <div className="p-1 bg-gold/15 text-gold rounded-full shrink-0">
                          <Check className="w-3 h-3 text-gold" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Return CTA to bookings */}
                <div className="pt-6 border-t border-stone-warm/30 mt-auto">
                  <span className="text-xs text-charcoal/60 leading-relaxed font-light block mb-4">
                    All premium guest towels, logs for fire pit/fireplaces, hot tub fire-heat sequences, and WiFi routers are fully provided.
                  </span>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-gold-light uppercase tracking-widest font-semibold duration-200"
                  >
                    <span>Check Room Availability</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Space Photo Right */}
              <div className="lg:col-span-7 aspect-[16/10] relative rounded-lg overflow-hidden shadow-lg border border-stone-warm/20">
                <img
                  src={currentSpace.image}
                  alt={currentSpace.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

            </div>
          )}

        </div>
        
      </div>
    </section>
  );
}
