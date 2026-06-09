import React, { useState } from 'react';
import { TESTIMONIALS } from '../data';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[activeIndex];

  return (
    <section id="testimonials" className="py-24 bg-forest text-white relative overflow-hidden">
      {/* Decorative Golden Ambient Backlights */}
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center">
        
        {/* Quotation Graphics */}
        <div className="inline-flex py-3 px-3 bg-forest-light border border-white/5 rounded-full mb-8">
          <Quote className="w-6 h-6 text-gold fill-gold/10" />
        </div>

        {/* Dynamic Card Slider */}
        <div
          id="testimonial-active-bubble"
          className="min-h-[220px] flex flex-col justify-center animate-fade-in"
        >
          {/* Stars */}
          <div className="flex items-center justify-center gap-1 mb-6">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-gold fill-gold" />
            ))}
          </div>

          {/* Testimonial Quote */}
          <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl font-light italic leading-relaxed text-stone-warm">
            &ldquo;{current.text}&rdquo;
          </blockquote>

          {/* Author info */}
          <cite className="block not-italic mt-8">
            <span className="block font-serif text-sm tracking-widest text-gold uppercase font-medium">
              {current.author}
            </span>
            <span className="block text-xs text-stone-warm/50 font-sans mt-1 uppercase tracking-wider">
              {current.location} &bull; Stayed {current.date}
            </span>
          </cite>
        </div>

        {/* Navigation Indicator & Arrows */}
        <div className="flex items-center justify-center gap-6 mt-12">
          {/* Prev button */}
          <button
            id="btn-testimonial-prev"
            onClick={prevTestimonial}
            className="p-2.5 rounded-full border border-white/10 hover:border-gold text-white hover:text-gold transition-colors duration-300 cursor-pointer"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Pagination dots */}
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                id={`btn-testimonial-dot-${idx}`}
                onClick={() => setActiveIndex(idx)}
                className={`w-2 h-2 rounded-full duration-300 transition-all ${
                  activeIndex === idx ? 'bg-gold w-6' : 'bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next button */}
          <button
            id="btn-testimonial-next"
            onClick={nextTestimonial}
            className="p-2.5 rounded-full border border-white/10 hover:border-gold text-white hover:text-gold transition-colors duration-300 cursor-pointer"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
