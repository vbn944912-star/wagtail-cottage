export interface Room {
  id: string;
  name: string;
  description: string;
  capacity: string;
  bedType: string;
  features: string[];
  image: string;
  highlights: string;
}

export interface Attraction {
  name: string;
  description: string;
  distance: string;
  driveTime: string;
  activities: string[];
  image: string;
  tips: string;
}

export interface AmenityGroup {
  category: string;
  items: string[];
}

export interface Testimonial {
  author: string;
  location: string;
  text: string;
  rating: number;
  date: string;
}

export interface BespokePackage {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: string;
}

export interface BookingInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  message: string;
  packages: string[];
  totalPriceCalculated: number;
  status: 'Pending Review' | 'Accepted' | 'Declined';
  dateCreated: string;
}
