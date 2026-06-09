import React from 'react';
import { Compass, Phone, Mail, MapPin, Instagram, Heart } from 'lucide-react';
import { COTTAGE_INFO } from '../data';

export default function Footer() {
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

  const navLinks = [
    { label: 'Home', target: 'home' },
    { label: 'About', target: 'about' },
    { label: 'Accommodation', target: 'accommodation' },
    { label: 'Gallery', target: 'gallery' },
    { label: 'Local Attractions', target: 'attractions' },
    { label: 'Contact', target: 'contact' }
  ];

  return (
    <footer id="main-footer" className="bg-charcoal text-stone-warm bg-no-repeat bg-cover bg-center border-t border-forest-light relative">
      {/* Subtle texture layout */}
      <div className="absolute inset-0 bg-forest/20 mix-blend-overlay pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-stone-warm/10 pb-12">
          
          {/* Col 1: Bio & Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => scrollToId('home')}>
              <div className="p-1.5 bg-forest border border-gold/20 rounded-full text-gold">
                <Compass className="w-4.5 h-4.5" />
              </div>
              <span className="font-serif text-lg font-medium text-white tracking-widest">{COTTAGE_INFO.name}</span>
            </div>
            <p className="text-xs text-stone-warm/65 leading-relaxed font-light">
              Bespoke private luxury cottage in Hardingill, Cumbria. Melding traditional 17th-century solid stone charm with contemporary boutique luxury.
            </p>
            <div className="pt-2 flex items-center gap-2.5 text-xs text-gold">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
              <span className="font-accent italic text-xs">Welcoming Guests for 2026/2027 Seasons</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider text-white uppercase text-xs mb-5">Quick Portals</h4>
            <ul className="space-y-2.5 text-xs">
              {navLinks.map((link) => (
                <li key={link.target}>
                  <button
                    id={`btn-footer-nav-${link.target}`}
                    onClick={() => scrollToId(link.target)}
                    className="hover:text-gold hover:translate-x-1 duration-200 transition-all font-light tracking-wide text-stone-warm/80 text-left block cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider text-white uppercase text-xs mb-5">Direct Contact</h4>
            <ul className="space-y-3 text-xs font-light">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span className="text-stone-warm/80 leading-relaxed text-[11px]">
                  Hardingill, Gosforth, Seascale,<br />Cumbria, CA20 1AQ
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href={`tel:${COTTAGE_INFO.contact.phone}`} className="hover:text-gold font-mono text-[11px]">
                  {COTTAGE_INFO.contact.formattedPhone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href={`mailto:${COTTAGE_INFO.contact.email}`} className="hover:text-gold text-[11px]">
                  {COTTAGE_INFO.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Quality & Cumbrian hospitality */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-white uppercase text-xs mb-5">Official Handles</h4>
            <p className="text-xs text-stone-warm/65 leading-relaxed font-light">
              Connect with our cottage concierge on social media platforms for current weather updates:
            </p>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded bg-forest/40 border border-white/5 text-gold">
                <Instagram className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] text-white/50 uppercase tracking-widest font-sans">Primary handle</span>
                <span className="block font-mono text-xs text-white font-medium">@{COTTAGE_INFO.socials.instagram}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 text-[11px] text-stone-warm/40 font-light text-center sm:text-left">
          <div>
            &copy; 2026 {COTTAGE_INFO.name}. All Rights Reserved. Luxury Self-Catering Accommodation.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with British Hospitality</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500/10" />
            <span>in Cumbria, UK</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
