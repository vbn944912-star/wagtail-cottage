import React, { useState, useEffect } from 'react';
import { COTTAGE_INFO, BESPOKE_PACKAGES, INSTAGRAM_HANDLES } from '../data';
import { BookingInquiry } from '../types';
import { MapPin, Phone, Mail, Calendar, Users, Gift, Share2, ClipboardCheck, Sparkles, X } from 'lucide-react';

export default function BookingSection() {
  // Input fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Set default dates: checkIn = tomorrow, checkOut = three days later
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const checkoutDateStr = new Date();
  checkoutDateStr.setDate(tomorrow.getDate() + 3);

  const [checkIn, setCheckIn] = useState(tomorrow.toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState(checkoutDateStr.toISOString().split('T')[0]);
  const [guests, setGuests] = useState(2);
  const [message, setMessage] = useState('');
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  
  // Submission flags
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEnquiry, setSubmittedEnquiry] = useState<BookingInquiry | null>(null);
  const [storedInquiries, setStoredInquiries] = useState<BookingInquiry[]>([]);
  const [showInquiriesDrawer, setShowInquiriesDrawer] = useState(false);

  // Load existing client inquiries
  useEffect(() => {
    try {
      const items = localStorage.getItem('wagtail_inquiries');
      if (items) {
        setStoredInquiries(JSON.parse(items));
      }
    } catch (e) {
      console.warn('LocalStorage not readable', e);
    }
  }, []);

  // Calculate pricing metrics
  const BASE_NIGHTLY_RATE = 280;
  
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const nights = calculateNights();
  const accommodationTotal = nights * BASE_NIGHTLY_RATE;
  
  const packagesTotal = selectedPackages.reduce((acc, pkgId) => {
    const pkg = BESPOKE_PACKAGES.find((p) => p.id === pkgId);
    return acc + (pkg ? pkg.price : 0);
  }, 0);

  const grandTotal = accommodationTotal + packagesTotal;

  // Package toggles
  const handleTogglePackage = (pkgId: string) => {
    if (selectedPackages.includes(pkgId)) {
      setSelectedPackages(selectedPackages.filter((id) => id !== pkgId));
    } else {
      setSelectedPackages([...selectedPackages, pkgId]);
    }
  };

  // Submit Inquiry Form
  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury concierge check-in
    setTimeout(() => {
      const newInquiry: BookingInquiry = {
        id: 'WAG-' + Math.floor(100000 + Math.random() * 900000),
        fullName,
        email,
        phone,
        checkIn,
        checkOut,
        guests,
        message,
        packages: selectedPackages,
        totalPriceCalculated: grandTotal,
        status: 'Pending Review',
        dateCreated: new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
      };

      try {
        const updated = [newInquiry, ...storedInquiries];
        setStoredInquiries(updated);
        localStorage.setItem('wagtail_inquiries', JSON.stringify(updated));
      } catch (err) {
        console.warn('Saving failed', err);
      }

      setSubmittedEnquiry(newInquiry);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setSelectedPackages([]);
    setSubmittedEnquiry(null);
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      
      {/* SECTION CTA ANCHOR */}
      <div className="bg-forest py-20 px-6 md:px-12 text-center text-white relative overflow-hidden mb-24 rounded-lg max-w-7xl mx-auto">
        <img
          src="https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=1600"
          alt="Cumbrian countryside escape"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.25]"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-px bg-gold" />
            <span className="font-accent tracking-widest text-xs uppercase text-gold italic">Ready For Your Next Escape?</span>
            <span className="w-5 h-px bg-gold" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight mb-4">
            Experience the Beauty of Cumbria
          </h2>
          <p className="text-stone-warm/80 text-sm md:text-base leading-relaxed font-light max-w-xl mx-auto mb-8">
            Escape to an elegantly restored lakeside gem surrounded by spectacular forests, roaring fire sanctuaries, and timeless English peaks.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              id="cta-avail-anchor"
              onClick={() => {
                const el = document.getElementById('enquiry-scroll-target');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-gold hover:bg-gold-light text-white font-serif tracking-widest uppercase text-xs rounded duration-300 transition-colors"
            >
              Check Availability
            </button>
            <button
              id="cta-contact-anchor"
              onClick={() => {
                const el = document.getElementById('contact-address-target');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-white/15 hover:bg-white/25 text-white font-sans tracking-widest uppercase text-xs border border-white/20 rounded duration-300 transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start" id="enquiry-scroll-target">
        
        {/* LEFT COLUMN: Contact Cards & Social Guides */}
        <div className="lg:col-span-5 space-y-10" id="contact-address-target">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-px bg-gold" />
              <span className="font-accent tracking-widest text-xs uppercase text-gold italic font-medium">
                Get In Touch
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-forest font-medium">
              We&apos;d Love to Hear From You
            </h2>
            <p className="text-xs md:text-sm text-charcoal/60 mt-3 leading-relaxed font-light">
              Plan your private escape with us. For inquiries regarding specific dates, local events, or custom requirements, drop us a line below or reach out directly.
            </p>
          </div>

          {/* Contact Details Panel */}
          <div className="bg-stone-light/50 border border-stone-warm/30 p-6 rounded-xl space-y-6">
            
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-lg text-gold shadow-xs shrink-0 border border-stone-warm/25">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-sans tracking-widest text-charcoal/40 font-semibold">Cottage Location</span>
                <span className="block font-serif text-sm md:text-base text-forest mt-1.5 leading-relaxed font-medium">
                  Hardingill, Gosforth, Seascale,<br />
                  Cumbria, CA20 1AQ, United Kingdom
                </span>
              </div>
            </div>

            {/* Direct Phone */}
            <div className="flex items-start gap-4 border-t border-stone-warm/20 pt-6">
              <div className="p-3 bg-white rounded-lg text-gold shadow-xs shrink-0 border border-stone-warm/25">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-sans tracking-widest text-charcoal/40 font-semibold">Concierge Line</span>
                <a
                  href={`tel:${COTTAGE_INFO.contact.phone}`}
                  className="block font-serif text-sm md:text-base text-forest mt-1.5 font-medium hover:text-gold transition-colors font-mono"
                >
                  {COTTAGE_INFO.contact.formattedPhone}
                </a>
                <span className="text-[10px] text-charcoal/50 block mt-0.5">Available Daily 09:00 - 18:00 GMT</span>
              </div>
            </div>

            {/* Direct Email */}
            <div className="flex items-start gap-4 border-t border-stone-warm/20 pt-6">
              <div className="p-3 bg-white rounded-lg text-gold shadow-xs shrink-0 border border-stone-warm/25">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[10px] uppercase font-sans tracking-widest text-charcoal/40 font-semibold">Direct Email</span>
                <a
                  href={`mailto:${COTTAGE_INFO.contact.email}`}
                  className="block font-serif text-sm md:text-base text-forest mt-1.5 font-medium hover:text-gold transition-colors"
                >
                  {COTTAGE_INFO.contact.email}
                </a>
              </div>
            </div>

          </div>

          {/* Social suggestions section requested by user */}
          <div className="bg-stone-light/50 border border-stone-warm/30 p-6 rounded-xl">
            <div className="flex items-center gap-2 text-gold mb-3">
              <Share2 className="w-4 h-4" />
              <span className="text-[9px] font-sans tracking-widest uppercase font-semibold text-forest">Digital Portals & Handles</span>
            </div>
            <p className="text-xs text-charcoal/70 leading-relaxed font-light mb-4">
              Tag us, view previous guest memories, or see recent drone shots of Cumbria valley fog:
            </p>
            <div className="flex flex-wrap gap-2">
              {INSTAGRAM_HANDLES.map((handle, idx) => (
                <span
                  key={handle}
                  className={`px-3 py-1.5 text-[11px] font-mono rounded tracking-normal border ${
                    idx === 0
                      ? 'bg-forest text-white border-forest font-medium shadow-xs'
                      : 'bg-white text-charcoal/75 border-stone-warm/50 hover:text-gold hover:border-gold/30 duration-200 cursor-pointer'
                  }`}
                  title={`${handle} suggest channel`}
                >
                  @{handle}
                </span>
              ))}
            </div>
            <span className="block text-[10px] text-stone-warm-darker/60 font-accent italic mt-2.5 text-right text-stone-warm-dark">
              ★ Winner: <strong>@wagtailcottage</strong> or <strong>@staywagtail</strong>
            </span>
          </div>

          {/* Client Local Registry Link */}
          {storedInquiries.length > 0 && (
            <button
              id="btn-trigger-history-drawer"
              onClick={() => setShowInquiriesDrawer(true)}
              className="w-full py-3.5 bg-forest-light text-white text-xs font-sans tracking-widest uppercase rounded border border-gold/20 hover:bg-forest transition-colors duration-200 mt-2 flex items-center justify-center gap-2 cursor-pointer shadow"
            >
              <ClipboardCheck className="w-4 h-4 text-gold animate-pulse" />
              <span>View My Bookings ({storedInquiries.length})</span>
            </button>
          )}

        </div>

        {/* RIGHT COLUMN: Contact Form with Real-Time Booking Estimator */}
        <div className="lg:col-span-7 bg-stone-light/30 border border-stone-warm/30 rounded-xl p-6 md:p-10 shadow-sm relative">
          
          <div className="absolute top-4 right-4 text-stone-warm-dark text-[9px] uppercase tracking-widest font-mono">
            Direct Reservation Request
          </div>

          {/* FORM RESET AND SUCCESS STATE */}
          {submittedEnquiry ? (
            <div className="text-center py-8 animate-scale-up" id="booking-success-card">
              <div className="w-16 h-16 bg-forest/10 border border-gold/40 text-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <ClipboardCheck className="w-8 h-8" />
              </div>
              <span className="text-xs uppercase font-sans tracking-widest text-gold font-semibold">Request Registered Successfully</span>
              <h3 className="font-serif text-2xl md:text-3xl font-medium text-forest mt-2 mb-4">
                Thank You, {submittedEnquiry.fullName.split(' ')[0]}
              </h3>
              
              <p className="max-w-md mx-auto text-xs md:text-sm text-charcoal/75 leading-relaxed font-light mb-8">
                Your reservation request was queued as <strong className="font-mono text-gold-light">{submittedEnquiry.id}</strong>. 
                Our local concierge is verifying the cottage roster for {submittedEnquiry.guests} guests (Check-in {submittedEnquiry.checkIn}). We will email or dial you shortly!
              </p>

              {/* Receipt Summary Voucher Card */}
              <div className="bg-white border border-stone-warm rounded-lg p-6 max-w-sm mx-auto text-left space-y-4 mb-8">
                <div className="border-b border-stone-warm pb-3 flex justify-between items-center">
                  <span className="font-serif text-xs font-semibold text-forest">Invoice Spec #{submittedEnquiry.id}</span>
                  <span className="text-[9px] px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded font-bold uppercase tracking-wider">Pending Roster</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-charcoal/50">Dates</span>
                    <span className="font-mono text-right">{submittedEnquiry.checkIn} to {submittedEnquiry.checkOut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal/50">Cumbrian Nights</span>
                    <span className="font-medium text-right">{nights} Nights</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal/50 font-medium">Bespoke Extras</span>
                    <span className="font-medium text-right">{submittedEnquiry.packages.length} Packages</span>
                  </div>
                  <div className="pt-3 border-t border-stone-warm/50 flex justify-between items-center text-sm">
                    <span className="font-serif font-semibold text-forest">Grand Total</span>
                    <span className="font-bold text-forest text-base">£{submittedEnquiry.totalPriceCalculated}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  id="btn-booking-done-reset"
                  onClick={handleResetForm}
                  className="px-6 py-2.5 bg-forest text-white font-serif tracking-wider text-xs uppercase duration-200 hover:bg-forest-light rounded cursor-pointer"
                >
                  Send Another Inquiry
                </button>
                <button
                  id="btn-booking-done-close"
                  onClick={() => setShowInquiriesDrawer(true)}
                  className="px-6 py-2.5 bg-transparent border border-stone-warm text-charcoal font-sans tracking-wide text-xs uppercase duration-200 hover:bg-stone-light rounded cursor-pointer"
                >
                  View Saved Enquiries
                </button>
              </div>
            </div>
          ) : (
            
            /* ACTIVE FORM COMPOSITION WITH ACTIVE COST CALCULATOR */
            <form onSubmit={handleSubmitEnquiry} className="space-y-6">
              
              <div className="border-b border-stone-warm/30 pb-4 mb-6">
                <h3 className="font-serif text-xl text-forest font-medium">Secure Reservation Request</h3>
                <p className="text-xs text-charcoal/50 mt-1">Select dates, customize boutique hampers and trigger real-time quote generation.</p>
              </div>

              {/* Personal Details Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal/60 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alistair Finch"
                    className="w-full text-xs px-4 py-3 bg-white border border-stone-warm/60 focus:border-gold outline-hidden rounded focus:ring-1 focus:ring-gold"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal/60 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alistair@example.co.uk"
                    className="w-full text-xs px-4 py-3 bg-white border border-stone-warm/60 focus:border-gold outline-hidden rounded focus:ring-1 focus:ring-gold"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal/60 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 7414 000000"
                    className="w-full text-xs px-4 py-3 bg-white border border-stone-warm/60 focus:border-gold outline-hidden rounded focus:ring-1 focus:ring-gold"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="guests" className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal/60 mb-2">
                    Number of Guests <span className="text-charcoal/40">(Max 6)</span>
                  </label>
                  <div className="relative">
                    <select
                      id="guests"
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full text-xs px-4 py-3 bg-white border border-stone-warm/60 focus:border-gold outline-hidden rounded focus:ring-1 focus:ring-gold appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} Guest{num > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                    <Users className="w-4 h-4 text-charcoal/40 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Date selection and nightly calculations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4.5 rounded border border-stone-warm/30">
                <div>
                  <label htmlFor="checkIn" className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal/60 mb-2 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-gold" /> Check-In Date
                  </label>
                  <input
                    type="date"
                    id="checkIn"
                    min={tomorrow.toISOString().split('T')[0]}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full text-xs border border-stone-warm-darker/20 rounded py-2 px-3 focus:border-gold outline-hidden"
                  />
                </div>
                <div>
                  <label htmlFor="checkOut" className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal/60 mb-2 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-gold" /> Check-Out Date
                  </label>
                  <input
                    type="date"
                    id="checkOut"
                    min={checkIn ? checkIn : tomorrow.toISOString().split('T')[0]}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full text-xs border border-stone-warm-darker/20 rounded py-2 px-3 focus:border-gold outline-hidden"
                  />
                </div>
              </div>

              {/* Interactive Bespoke Packages Selection Grid */}
              <div className="space-y-3">
                <span className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal/60 mb-1 flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-gold" /> Add Cottage Custom Packages <span className="font-accent text-gold text-xs italic lowercase">(optional bespoke enhancements)</span>
                </span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {BESPOKE_PACKAGES.map((pkg) => {
                    const selected = selectedPackages.includes(pkg.id);
                    return (
                      <div
                        key={pkg.id}
                        id={`btn-toggle-package-${pkg.id}`}
                        onClick={() => handleTogglePackage(pkg.id)}
                        className={`p-3 border rounded text-left cursor-pointer transition-all ${
                          selected
                            ? 'bg-forest/5 border-gold shadow-xs'
                            : 'bg-white border-stone-warm/40 hover:bg-stone-light/40'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <span className="block font-serif text-xs font-semibold text-forest leading-relaxed">
                            {pkg.name}
                          </span>
                          <span className="text-xs font-mono font-bold text-gold shrink-0">
                            +£{pkg.price}
                          </span>
                        </div>
                        <p className="text-[10px] text-charcoal/65 mt-1 leading-normal line-clamp-2">
                          {pkg.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Message field */}
              <div>
                <label htmlFor="message" className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal/60 mb-2">
                  Special Notes, Dietary Needs, or Bedding Layout preferences <span className="font-accent text-stone-warm-dark font-light">(optional)</span>
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Please arrange Twin Bedding configuration in the Attic suite. Let us know if baby highchairs can be set up."
                  className="w-full text-xs px-4 py-3 bg-white border border-stone-warm/60 focus:border-gold outline-hidden rounded focus:ring-1 focus:ring-gold"
                />
              </div>

              {/* Live Cost Invoice Summary Panel */}
              <div className="bg-stone-light border border-stone-warm/40 p-4 rounded-lg">
                <div className="flex items-center justify-between text-xs py-1">
                  <span className="text-charcoal/60 font-sans uppercase tracking-wider text-[9px]">Cottage Base Rate (£280 x {nights} nights)</span>
                  <span className="font-mono text-charcoal font-semibold">£{accommodationTotal}</span>
                </div>
                {packagesTotal > 0 && (
                  <div className="flex items-center justify-between text-xs py-1 border-t border-stone-warm/20 mt-1 pt-1 animate-fade-in">
                    <span className="text-charcoal/60 font-sans uppercase tracking-wider text-[9px]">Custom Luxury Packages Selected</span>
                    <span className="font-mono text-charcoal font-semibold">+£{packagesTotal}</span>
                  </div>
                )}
                <div className="border-t border-stone-warm/30 pt-3 mt-2.5 flex items-center justify-between">
                  <div>
                    <span className="block font-serif text-sm font-semibold text-forest">Estimated Cost Invoice</span>
                    <span className="text-[9px] text-charcoal/40 font-mono">No card billing required at this stage</span>
                  </div>
                  <span className="font-mono text-xl font-bold text-forest py-0.5 px-3 bg-white border border-stone-warm/40 rounded">
                    £{grandTotal}
                  </span>
                </div>
              </div>

              {/* Submit trigger button */}
              <button
                type="submit"
                id="btn-submit-enquiry"
                disabled={isSubmitting}
                className="w-full py-4 bg-gold hover:bg-gold-light text-white font-serif tracking-widest uppercase text-xs rounded duration-300 transition-colors shadow-lg shadow-gold/10 hover:shadow-xl cursor-pointer font-semibold flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting Secure Inquiry...</span>
                  </>
                ) : (
                  <>
                    <ClipboardCheck className="w-4.5 h-4.5 text-white" />
                    <span>Send Enquiry</span>
                  </>
                )}
              </button>

            </form>
          )}

        </div>

      </div>

      {/* RE-USABLE INQUIRIES DRAWER HISTORY COMPONENT */}
      {showInquiriesDrawer && (
        <div
          id="client-inquiries-drawer"
          className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-md bg-white shadow-2xl p-6 border-l border-stone-warm flex flex-col justify-between animate-slide-left"
        >
          <div>
            <div className="flex items-center justify-between pb-5 border-b border-stone-warm/45 mb-6">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-gold" />
                <span className="font-serif text-lg font-medium text-forest">Reservation Ledger</span>
              </div>
              <button
                id="btn-close-inquiries-drawer"
                onClick={() => setShowInquiriesDrawer(false)}
                className="p-1 px-2 hover:bg-stone-light text-charcoal/60 hover:text-charcoal rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {storedInquiries.length === 0 ? (
              <div className="text-center py-12 text-charcoal/40 font-accent italic text-xs">
                No active bookings recorded in this session. Feel free to send your first enquiry!
              </div>
            ) : (
              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1 no-scrollbar">
                {storedInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-4 border border-stone-warm rounded-lg bg-stone-light/10 space-y-3"
                  >
                    <div className="flex items-center justify-between pb-1 border-b border-stone-warm/15 text-xs">
                      <span className="font-mono text-gold-light font-bold">{inq.id}</span>
                      <span className="text-[10px] text-charcoal/40 font-semibold">{inq.dateCreated}</span>
                    </div>
                    
                    <div className="text-xs space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-charcoal/50">Lead Guest</span>
                        <span className="font-semibold text-forest">{inq.fullName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-charcoal/50">Scheduled Stay</span>
                        <span className="font-mono text-charcoal">{inq.checkIn} to {inq.checkOut}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-charcoal/50">Roster Capacity</span>
                        <span>{inq.guests} Guest{inq.guests > 1 ? 's' : ''}</span>
                      </div>
                      {inq.packages.length > 0 && (
                        <div className="flex justify-between">
                          <span className="text-charcoal/50">Enhancements</span>
                          <span className="text-gold-light font-medium">{inq.packages.length} selected</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-1 border-t border-dashed border-stone-warm mt-1">
                        <span className="font-serif font-semibold text-forest">Invoice Calculated</span>
                        <span className="font-bold text-forest">£{inq.totalPriceCalculated}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px]">
                      <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded font-semibold uppercase tracking-wider">
                        Concierge Reviewing
                      </span>
                      <button
                        id={`btn-booking-cancel-row-${inq.id}`}
                        onClick={() => {
                          if (confirm('Cancel this specific reservation enquiry?')) {
                            const updated = storedInquiries.filter((x) => x.id !== inq.id);
                            setStoredInquiries(updated);
                            localStorage.setItem('wagtail_inquiries', JSON.stringify(updated));
                          }
                        }}
                        className="text-red-600 hover:underline hover:font-medium transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-stone-warm/40 pt-5 mt-5">
            <p className="text-[10px] text-charcoal/50 text-center leading-normal">
              Inquiries saved locally on this browser. Submissions simulate a secure live delivery to our Hardingill reservation database.
            </p>
          </div>
        </div>
      )}

    </section>
  );
}
