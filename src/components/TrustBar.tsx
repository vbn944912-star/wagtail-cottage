import React from 'react';
import { Star, ShieldCheck, Wifi, Users, Compass, Eye } from 'lucide-react';

export default function TrustBar() {
  const TRUST_ITEMS = [
    {
      id: 'tb-stars',
      icon: <Star className="w-4 h-4 text-gold fill-gold" />,
      text: '★★★★★ Rated by Guests',
      sub: 'Consistent Exceptional Reviews'
    },
    {
      id: 'tb-bedrooms',
      icon: <ShieldCheck className="w-4 h-4 text-gold" />,
      text: '3 Luxury Bedrooms',
      sub: 'En-Suite & Superior Bedding'
    },
    {
      id: 'tb-park',
      icon: <Compass className="w-4 h-4 text-gold" />,
      text: 'Lake District National Park',
      sub: 'A Designated UNESCO Site'
    },
    {
      id: 'tb-family',
      icon: <Users className="w-4 h-4 text-gold" />,
      text: 'Family Friendly',
      sub: 'Spacious Gatherings & Lawns'
    },
    {
      id: 'tb-wifi',
      icon: <Wifi className="w-4 h-4 text-gold" />,
      text: 'Free Ultra-Fast WiFi',
      sub: 'Work & Stream Seamlessly'
    },
    {
      id: 'tb-privacy',
      icon: <Eye className="w-4 h-4 text-gold" />,
      text: 'Private Countryside Setting',
      sub: 'Surrounded by Pristine Hills'
    }
  ];

  return (
    <div
      id="trust-bar"
      className="bg-charcoal border-y border-forest-light py-8 px-6 md:px-12 text-stone-warm"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 items-stretch divide-x-0 divide-y lg:divide-x lg:divide-y-0 divide-stone-warm/10 text-center">
        {TRUST_ITEMS.map((item) => (
          <div
            key={item.id}
            id={item.id}
            className="flex flex-col items-center justify-center p-3 hover:translate-y-[-2px] transition-transform duration-300"
          >
            <div className="mb-2 p-2 bg-forest/40 rounded-full border border-gold/10">
              {item.icon}
            </div>
            <h4 className="font-serif text-xs md:text-sm font-medium tracking-wide text-white">
              {item.text}
            </h4>
            <p className="text-[10px] md:text-xs text-stone-warm/50 mt-1 uppercase font-accent tracking-widest">
              {item.sub}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
