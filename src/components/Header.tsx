import React, { useState, useEffect } from 'react';
import { Menu, X, Compass, Phone } from 'lucide-react';
import { COTTAGE_INFO } from '../data';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const menuItems = [
    { label: 'Home', target: 'home' },
    { label: 'About', target: 'about' },
    { label: 'Accommodation', target: 'accommodation' },
    { label: 'Gallery', target: 'gallery' },
    { label: 'Local Attractions', target: 'attractions' },
    { label: 'Contact', target: 'contact' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-forest/95 backdrop-blur-md shadow-lg py-4 text-white'
          : 'bg-transparent py-6 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button
          id="btn-nav-logo"
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="p-2 border border-gold/30 rounded-full bg-forest-light group-hover:border-gold transition-colors duration-300">
            <Compass className="w-5 h-5 text-gold group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div>
            <span className="block font-serif text-lg md:text-xl font-medium tracking-wider group-hover:text-gold transition-colors duration-300">
              {COTTAGE_INFO.name}
            </span>
            <span className="block text-[10px] md:text-xs tracking-widest font-accent uppercase text-stone-warm/80">
              Lake District, UK
            </span>
          </div>
        </button>

        {/* Desktop Navigation Link Menu */}
        <nav className="hidden lg:flex items-center gap-8 font-sans text-sm font-medium tracking-wide">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              id={`nav-link-desktop-${item.target}`}
              onClick={() => scrollToSection(item.target)}
              className="relative text-stone-warm/90 hover:text-white transition-colors duration-300 py-1 cursor-pointer group uppercase text-xs tracking-widest"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Action Button & Contact Info */}
        <div className="hidden sm:flex items-center gap-6">
          <a
            href={`tel:${COTTAGE_INFO.contact.phone}`}
            id="nav-phone-link"
            className="flex items-center gap-2 text-xs md:text-sm text-stone-warm/90 hover:text-gold transition-colors duration-300"
          >
            <Phone className="w-4 h-4 text-gold" />
            <span className="font-mono">{COTTAGE_INFO.contact.formattedPhone}</span>
          </a>
          <button
            id="btn-header-cta-book"
            onClick={() => scrollToSection('contact')}
            className="px-5 py-2.5 bg-gold hover:bg-gold-light text-white font-serif text-sm tracking-wider duration-300 shadow-md hover:shadow-lg transition-all rounded"
          >
            Book Your Stay
          </button>
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          id="btn-mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white hover:text-gold transition-colors duration-200"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-overlay"
          className="absolute top-full left-0 right-0 bg-forest border-t border-forest-light shadow-2xl py-6 px-8 flex flex-col gap-6 lg:hidden animate-fade-in"
        >
          <div className="flex flex-col gap-4">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                id={`nav-link-mobile-${item.target}`}
                onClick={() => scrollToSection(item.target)}
                className="w-full text-left py-2.5 border-b border-white/5 text-stone-warm font-sans text-sm tracking-wider uppercase"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-4 pt-2">
            <a
              href={`tel:${COTTAGE_INFO.contact.phone}`}
              id="mobile-phone-link"
              className="flex items-center gap-3 text-stone-warm hover:text-gold"
            >
              <Phone className="w-4 h-4 text-gold" />
              <span className="text-sm font-mono">{COTTAGE_INFO.contact.formattedPhone}</span>
            </a>
            <button
              id="btn-mobile-cta-book"
              onClick={() => scrollToSection('contact')}
              className="w-full text-center py-3 bg-gold hover:bg-gold-light text-white font-serif tracking-wider duration-300 transition-colors uppercase text-xs"
            >
              Book Your Stay
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
