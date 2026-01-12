export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image?: string;
}

export interface Service {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  category: string;
}
