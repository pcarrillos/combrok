export interface Post {
  id: string;
  slug: string;
  title: string;
  description: string;
  publishDate: Date;
  updateDate?: Date;
  author: string;
  category: 'noticias' | 'analisis' | 'educacion' | 'alertas';
  readingTime: number;
  image: {
    src: string;
    alt: string;
    caption?: string;
  };
  tags: string[];
  relatedBrokers: string[];
  status: 'draft' | 'scheduled' | 'published';
  featured: boolean;
  priority: number;
}

export interface Broker {
  id: string;
  slug: string;
  name: string;
  logo: string;
  website: string;
  foundedYear: number;
  countryOrigin: string;
  rating: number;
  trustScore: number;
  isRegulated: boolean;
  regulations: Regulation[];
  pros: string[];
  cons: string[];
  warnings: string[];
  scamAlert: boolean;
  riskLevel: 'low' | 'medium' | 'high' | 'extreme';
}

export interface Regulation {
  entity: string;
  country: string;
  licenseNumber: string;
  verified: boolean;
  url?: string;
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  social: {
    twitter?: string;
    linkedin?: string;
  };
}