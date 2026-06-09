import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import About from './components/About';
import Accommodation from './components/Accommodation';
import Gallery from './components/Gallery';
import LakeDistrict from './components/LakeDistrict';
import WhyChoose from './components/WhyChoose';
import Testimonials from './components/Testimonials';
import BookingSection from './components/BookingSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#FBFBFA] text-charcoal font-sans antialiased selection:bg-gold selection:text-white">
      {/* Dynamic Header navbar */}
      <Header />

      {/* Primary visual sections */}
      <main>
        {/* Full-screen slideshow with soundscapes */}
        <Hero />

        {/* Highlight strip under hero */}
        <TrustBar />

        {/* About section: Heritage narrative */}
        <About />

        {/* Designed for comfort accommodation explorer tabs */}
        <Accommodation />

        {/* High-fidelity cottage gallery with full popup lightbox */}
        <Gallery />

        {/* Experience nearby activities and attractions bento grid */}
        <LakeDistrict />

        {/* Why families and couples choose Wagtail */}
        <WhyChoose />

        {/* Gold-star reviews slider carousel */}
        <Testimonials />

        {/* Booking CTA, Address details, and interactive live Pricing Calculator */}
        <BookingSection />
      </main>

      {/* Footer copyright and location labels */}
      <Footer />
    </div>
  );
}
