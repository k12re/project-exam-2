export interface Venue {
  id: string;
  name: string;
  description: string;
  price: number;
  maxGuests: number;
  rating?: number;
  created: string;
  updated?: string;
  media?: string;
  meta?: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
  location?: {
    address?: string;
    city?: string;
    zip?: string;
    country?: string;
    continent?: string;
    lat?: number;
    lng?: number;
  };
  owner?: {
    avatar?: string;
    email: string;
    name: string;
  };
}

export interface Bookings {
  dateFrom: string;
  dateTo: string;
  guests: number;
  id: string;
  venue: { name: string };
}

export interface Profile {
  name: string;
  email: string;
  venueManager: boolean;
  avatar?: string;
  venues?: Venue[];
  bookings?: Bookings[];
}
