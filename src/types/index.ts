export type TricityZone = 'all' | 'chandigarh' | 'mohali' | 'panchkula' | 'escapes';

export type CategoryType = 
  | 'all'
  | 'events'
  | 'food'
  | 'guides'
  | 'lifestyle'
  | 'startups'
  | 'escapes'
  | 'news';

export interface ItemData {
  id: string;
  title: string;
  subtitle?: string;
  category: CategoryType;
  zone: 'chandigarh' | 'mohali' | 'panchkula' | 'escapes';
  sectorOrArea: string; // e.g. "Sector 26", "Phase 3B2", "Sector 5", "Kasauli"
  image: string;
  summary: string;
  description: string;
  author?: string;
  readTime?: string;
  dateBadge?: string;
  priceOrCost?: string;
  timing?: string;
  insiderTip?: string;
  tags: string[];
  featured?: boolean;
  trending?: boolean;
  externalLink?: string;
  ticketUrl?: string;
  rating?: number;
  coordinates?: string;
}

export interface WeatherData {
  temp: number;
  condition: string;
  aqi: number;
  aqiStatus: string;
  weekendHighlight: string;
}

export interface BusinessSubmission {
  businessName: string;
  category: string;
  contactName: string;
  email: string;
  instagramHandle: string;
  location: string;
  pitch: string;
}
