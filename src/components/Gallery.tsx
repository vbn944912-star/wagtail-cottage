import React, { useState } from 'react';
import { GALLERY_PHOTOS } from '../data';
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export default function Gallery() {
  const [filter, setFilter] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Group tags logically
  const CATEGORIES = ['All', 'Cottage Exterior', 'Luxury Bedrooms', 'Living & Dining', 'Lake District Scenery'];

  // Map data to display groups
  const filteredPhotos = GALLERY_PHOTOS.filter((photo) => {
    if (filter === 'All') return true;
    if (filter === 'Living & Dining') {
      return photo.category === 'Living Room' || photo.category === 'Dining & Kitchen';
    }
    return photo.category === filter;
  });

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const prevIdx = (lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setLightboxIndex(prevIdx);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const nextIdx = (lightboxIndex + 1) % filteredPhotos.length;
    setLightboxIndex(nextIdx);
  };

  return (
    <section id="gallery" className="py-24 bg-stone-light">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Gallery Headers */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-8 h-px bg-gold" />
              <span className="font-accent tracking-widest text-xs uppercase text-gold italic font-medium">
                The Visual Experience
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight text-forest">
              Cottage Gallery & Grounds
            </h2>
          </div>
          
          {/* Gallery Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                id={`btn-gallery-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setFilter(cat)}
                className={`px-4.5 py-2.5 text-xs font-sans tracking-wider uppercase rounded duration-300 transition-all font-medium cursor-pointer ${
                  filter === cat
                    ? 'bg-forest text-white shadow-sm'
                    : 'bg-white text-charcoal/75 hover:bg-stone-warm hover:text-forest border border-stone-warm/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Multi-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={index}
              id={`gallery-photo-card-${index}`}
              onClick={() => setLightboxIndex(index)}
              className="group relative cursor-pointer aspect-square bg-stone-warm overflow-hidden rounded shadow-sm hover:shadow-xl duration-500 transition-all"
            >
              {/* Image with zoom on hover */}
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover transform duration-700 group-hover:scale-108"
                referrerPolicy="no-referrer"
              />
              
              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent opacity-0 group-hover:opacity-100 duration-500 transition-all flex flex-col justify-end p-5" />

              {/* Caption & Category Labels on hover */}
              <div className="absolute inset-0 flex flex-col justify-between p-5 z-10 opacity-0 group-hover:opacity-100 duration-300 transition-all">
                <span className="self-start text-[9px] tracking-widest uppercase font-accent text-gold bg-black/40 backdrop-blur px-2.5 py-1 rounded">
                  {photo.category}
                </span>
                <div>
                  <p className="text-white text-xs font-serif leading-relaxed line-clamp-2">
                    {photo.caption}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-[10px] text-gold font-sans uppercase tracking-wider font-semibold">
                    <Maximize2 className="w-3 h-3" />
                    <span>Expand view</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Lightbox Modal Overlay */}
        {lightboxIndex !== null && (
          <div
            id="gallery-lightbox"
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-charcoal/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-8 animate-fade-in"
          >
            <button
              id="btn-lightbox-close"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/25 rounded-full text-white transition-colors duration-200"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Nav Arrow */}
            <button
              id="btn-lightbox-prev"
              onClick={handlePrev}
              className="absolute left-4 md:left-6 p-3 bg-white/5 hover:bg-white/15 rounded-full text-white transition-all transform hover:scale-110"
              title="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Lightbox Graphic Box */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full flex flex-col gap-4 relative animate-scale-up"
            >
              <div className="aspect-[4/3] md:aspect-[16/10] bg-black rounded-lg overflow-hidden border border-white/10 shadow-2xl relative">
                <img
                  src={filteredPhotos[lightboxIndex].src}
                  alt="Expanded cottage photograph"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Title, Category & Pagination Counter */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-stone-warm px-2">
                <div className="max-w-2xl">
                  <span className="inline-block text-[10px] text-gold tracking-widest font-accent uppercase mb-1">
                    {filteredPhotos[lightboxIndex].category}
                  </span>
                  <p className="text-white font-serif text-sm md:text-base leading-relaxed">
                    {filteredPhotos[lightboxIndex].caption}
                  </p>
                </div>
                <div className="shrink-0 font-mono text-xs text-stone-warm/50">
                  {lightboxIndex + 1} / {filteredPhotos.length} Photos
                </div>
              </div>
            </div>

            {/* Right Nav Arrow */}
            <button
              id="btn-lightbox-next"
              onClick={handleNext}
              className="absolute right-4 md:right-6 p-3 bg-white/5 hover:bg-white/15 rounded-full text-white transition-all transform hover:scale-110"
              title="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
