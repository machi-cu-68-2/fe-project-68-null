export interface OpeningHour {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

export interface Restaurant {
  id: string;
  _id?: string;
  name: string;
  category: string;
  location: string;
  province?: string;
  district?: string;
  rating: number;
  reviews: number;
  imageSrc: string;
  image?: string;
  description: string;
  tags: string[];
  tel?: string;
  totalTables?: number;
  openingHours?: OpeningHour[];
}


