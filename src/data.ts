import { Room, Attraction, AmenityGroup, Testimonial, BespokePackage } from './types';

export const COTTAGE_INFO = {
  name: 'Wagtail Cottage',
  tagline: 'Your Private Lake District Escape',
  location: {
    address: 'Hardingill, Gosforth, Seascale, Cumbria',
    postalCode: 'CA20 1AQ',
    country: 'United Kingdom',
    coordinates: 'Hardingill, Gosforth, Seascale, Cumbria CA20 1AQ',
  },
  contact: {
    phone: '+44 7414 088999',
    formattedPhone: '+44 (0) 7414 088999',
    email: 'stay@wagtailcottage.co.uk',
  },
  socials: {
    instagram: 'wagtailcottage',
    facebook: 'wagtailcottage',
    alternativeUsernames: ['staywagtail', 'wagtailretreat', 'wagtailluxury', 'wagtailcumbria'],
  }
};

export const INSTAGRAM_HANDLES = [
  'wagtailcottage',
  'staywagtail',
  'wagtailretreat',
  'wagtailluxury',
  'wagtailcumbria'
];

export const ROOMS: Room[] = [
  {
    id: 'master',
    name: 'The Herdwicks Master Suite',
    description: 'A spacious and calm sanctuary on the ground level featuring double-height oak beam ceilings, local slate textures, and massive windows opening onto the private gardens.',
    capacity: '2 Guests',
    bedType: 'Super King-Size Bed',
    features: ['En-suite walk-in rain shower', 'Elegantly panelled walls', 'French doors to garden patio', 'Egyptian cotton linens'],
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200',
    highlights: 'Panoramic morning views over Great Gable.'
  },
  {
    id: 'loft',
    name: 'The Tarn Loft Bedroom',
    description: 'An elegant under-eaves hideaway on the upper floor with fully-restored structural timbers, a beautiful workspace nook, and spectacular views of Wast Water\'s surrounding screes.',
    capacity: '2 Guests',
    bedType: 'King-Size Bed',
    features: ['Freestanding clawfoot copper bath', 'Exposed 17th-century rafters', 'Skylights for stargazing', 'Plush seating corner'],
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1200',
    highlights: 'Double skylights placed perfectly for night sky viewing.'
  },
  {
    id: 'fells',
    name: 'The Fells Twin Bedroom',
    description: 'A charming, sun-soaked room with two premium brass single frames that can be nested into a full double size, finished with British wool carpets and heritage colors.',
    capacity: '2 Guests',
    bedType: 'Twin Single / Double',
    features: ['Dressing table & vanity mirror', 'Fine local art panels', 'Garden view windows', 'Handcrafted oak wardrobes'],
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200',
    highlights: 'Warm stone accents and authentic cottage vibes.'
  }
];

export const SPACES = [
  {
    id: 'kitchen',
    name: 'The Chef\'s Country Kitchen',
    subtitle: 'Fully Equipped Culinary Studio',
    description: 'Craft beautiful family feasts using modern country finishes, high-end Rangemaster cooker, premium copper pans, an American style pantry, and integrated appliances. Complemented by hand-painted sage cabinetry and a solid oak farmhouse breakfast bar.',
    features: ['Rangemaster dual-fuel double range cooker', 'Integrated premium coffee station & wine chiller', 'Local Honister slate work surfaces', 'Handcrafted dining table seating 8 comfortably'],
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200'
  },
  {
    id: 'living',
    name: 'The Hearth Fireplace Lounge',
    subtitle: 'Cozy Restored Living Spaces',
    description: 'Relax in oversized linen armchairs around our majestic floor-to-ceiling stone fireplace. Hand-cut logs, warm rugs, and dramatic views make it a sanctuary regardless of Cumbrian winter mist or summer sun.',
    features: ['High-efficiency wood burning fireplace', 'Traditional exposed timber frames', 'Custom built library with local guides & maps', 'French linen sofas & velvet cushions'],
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200'
  },
  {
    id: 'outdoor',
    name: 'The Orchard Terrace & Lawn',
    subtitle: 'Private Countryside Serenity',
    description: 'Wander out into mature cottage orchards and secure lawn spaces. Featuring a custom stone dining terrace, high-end barbecue, fire pit social circle, and complete seclusion framed by rolling drystone walls and centuries-old ash trees.',
    features: ['Wood-fired private eco hot tub', 'Outdoor dining table and lounge sofa', 'Double fire pit with locally sourced kindling', 'Stargazing loungers with sheepskin throws'],
    image: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=1200'
  }
];

export const GALLERY_PHOTOS = [
  {
    src: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200',
    category: 'Cottage Exterior',
    caption: 'Wagtail Cottage custom drystone exterior and meticulously kept cottage garden floral accents.'
  },
  {
    src: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200',
    category: 'Luxury Bedrooms',
    caption: 'Great Gable view master suite styled in earth tones and hand-woven wool.'
  },
  {
    src: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200',
    category: 'Living Room',
    caption: 'The main lounge featuring local hearth stonework and roaring crackle log fires.'
  },
  {
    src: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200',
    category: 'Dining & Kitchen',
    caption: 'Bespoke hand-cabinetry country kitchen fully stocked with premium utensils.'
  },
  {
    src: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1200',
    category: 'Luxury Bedrooms',
    caption: 'The Tarn loft bathroom featuring an antique raw copper soaking tub.'
  },
  {
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200',
    category: 'Lake District Scenery',
    caption: 'Stunning emerald valleys and ancient oak woodlands adjacent to Gosforth village.'
  },
  {
    src: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=1200',
    category: 'Sunset Landscapes',
    caption: 'Ethereal sunset over Wast Water fells - England\'s deepest lake is just minutes away.'
  },
  {
    src: 'https://images.unsplash.com/photo-1617806118233-18e1db207f62?q=80&w=1200',
    category: 'Dining & Kitchen',
    caption: 'Family gathering dining table featuring custom oak framing and gorgeous morning light.'
  }
];

export const ATTRACTIONS: Attraction[] = [
  {
    name: 'Wast Water',
    description: 'Voted Britain\'s favorite view. The deepest lake in England is dramatically surrounded by towering slopes of Great Gable and Scafell, offering calm mirror waters and scenic kayaking.',
    distance: '6.4 miles',
    driveTime: '12 mins',
    activities: ['Kayaking / Paddleboarding', 'Scenic lakeshore hiking', 'Scree-view photography'],
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=1200',
    tips: 'Park at Wasdale Head green for spectacular sunset reflections on the mirrored lakes.'
  },
  {
    name: 'Scafell Pike',
    description: 'The absolute zenith of England. Experience high-octane mountain climbing and expansive vistas from England\'s highest summit. Easily approachable from the dramatic Wasdale Head trail.',
    distance: '8.1 miles',
    driveTime: '15 mins',
    activities: ['High peak fell hiking', 'Ridge scrambling', 'Alpine photo sessions'],
    image: 'https://images.unsplash.com/photo-1508873696983-2df519f0397e?q=80&w=1200',
    tips: 'Always pack extra layers and verify maps. The Wasdale path offers the most dramatic, rewarding ascent.'
  },
  {
    name: 'Wasdale Valley',
    description: 'A completely unspoiled valley, breathtaking and quiet. Home to ancient drystone enclosures, heritage Herdwick sheep farms, and old English inns serving traditional local ales.',
    distance: '5.2 miles',
    driveTime: '10 mins',
    activities: ['Countryside walks', 'Historic inn touring', 'River paddling'],
    image: 'https://images.unsplash.com/photo-1520121401995-928cd50d4e27?q=80&w=1200',
    tips: 'Pop into the Wastwater Hotel for homecooked steak pies and native Cumbrian cask ales.'
  },
  {
    name: 'Muncaster Castle',
    description: 'A magnificent historic castle from the 1200s, legendary for its spectacular Himalayan gardens, sweeping views over the River Esk, and world-renowned Hawk & Owl sanctuary.',
    distance: '10.5 miles',
    driveTime: '18 mins',
    activities: ['Guided castle tours', 'Hawk flying displays', 'Labyrinth garden explorer'],
    image: 'https://images.unsplash.com/photo-1542118356-944a95bb2155?q=80&w=1200',
    tips: 'The bluebell wood walk in late spring is a certified fairytale setting!'
  },
  {
    name: 'Ravenglass Railway',
    description: 'An absolute vintage treasure. Board the heritage steam railway (affectionately known as "La\'al Ratty") travelling through stunning coastal flats up into the majestic Eskdale fells.',
    distance: '9.8 miles',
    driveTime: '16 mins',
    activities: ['Steam train ride', 'Coastal estuary walks', 'Railway history museum'],
    image: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=1200',
    tips: 'Book an open-top carriage on sunny days for unhindered snapshots of the fells.'
  },
  {
    name: 'Seascale Beach',
    description: 'A gorgeous vast Cumbrian coastline perfect for watching spectacular ocean sunsets. Features golden sands, clean stony ridges, custom ice cream parlors, and scenic coastal pathways.',
    distance: '4.8 miles',
    driveTime: '8 mins',
    activities: ['Strolling the shoreline', 'Saltwater swimming', 'Beachcombing & stargazing'],
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200',
    tips: 'Grab locally churned Mawson’s Ice Cream from Seascale seafront before a twilight walk.'
  }
];

export const WHY_CHOOSE_ITEMS = [
  {
    title: 'Exclusive Privacy',
    description: 'Enjoy your own peaceful retreat away from crowded hotels in a fully self-contained countryside property.'
  },
  {
    title: 'Premium Comfort',
    description: 'Luxury furnishings, Hypnos bedding, copper bathtubs, and modern high-end kitchen appliances throughout.'
  },
  {
    title: 'Exceptional Location',
    description: 'Nestled in the tranquil western Lake District National Park, minutes from Wast Water, beaches, and high fells.'
  },
  {
    title: 'Memorable Experiences',
    description: 'Whether it\'s family board games beside a crackling hearth or woodcoded stargazing inside your private outdoor hot tub.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    author: 'Eleanor & Michael Vance',
    location: 'York, United Kingdom',
    text: 'A beautiful cottage in a stunning location. Everything was immaculate and thoughtfully prepared. The attention to detail is staggering — from the fresh sourdough waiting on arrival to the local Honister slate worktops. We cannot wait to return.',
    rating: 5,
    date: 'April 2026'
  },
  {
    author: 'The Harrington Family',
    location: 'London, United Kingdom',
    text: 'Perfect for a family getaway. Comfortable, peaceful, and surrounded by incredible scenery. Our kids absolutely loved taking the steam train nearby and sleeping in the cozy attic twin room!',
    rating: 5,
    date: 'May 2026'
  },
  {
    author: 'Dr. James Woodcroft',
    location: 'Edinburgh, Scotland',
    text: 'One of the finest self-catering cottages we have ever stayed in. Extremely high-end upholstery, fully functional cookware, and that private wood-heated hot tub under the Cumbrian twilight is pure bliss. Complete privacy.',
    rating: 5,
    date: 'June 2026'
  }
];

export const BESPOKE_PACKAGES: BespokePackage[] = [
  {
    id: 'hamper',
    name: 'Cumbrian Welcome Hamper',
    price: 65,
    description: 'Curated selection of local treasures: artisan wood-smoked cheeses, Cumberland sausage, fresh sourdough, Seascale cream, and cottage preserve.',
    icon: 'Gift'
  },
  {
    id: 'fireplace',
    name: 'Crackling Hearth Package',
    price: 35,
    description: 'Double bag of kiln-dried birch logs, custom pine-cone firestarters, sweet-smelling wood herbs, and complimentary marshmallow roasting sticks.',
    icon: 'Flame'
  },
  {
    id: 'stargaze',
    name: 'Dusk Stargazing & Hot Tub Kit',
    price: 45,
    description: 'Premium organic cotton towels, oversized woolen sheepskin throws, local botanical lavender bath oil, and constellation maps for cloudless nights.',
    icon: 'Sparkles'
  },
  {
    id: 'adventure',
    name: 'Lake District Explorer Backpack',
    price: 55,
    description: 'Borrow high-spec hiking poles, custom Ordnance Survey map, thermal vacuum flask filled with fresh dark roast, and artisan Cumbrian gingerbread.',
    icon: 'Compass'
  }
];
