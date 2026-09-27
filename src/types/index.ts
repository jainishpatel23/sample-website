export interface Service {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  iconName: string;
  symptoms: string[];
  treatmentApproach: string[];
  benefits: string[];
  durationMinutes: number;
  status: 'active' | 'inactive';
}

export type GalleryCategory = 'Treatments' | 'Exercises' | 'Clinic' | 'Equipment';

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: GalleryCategory;
  image: string;
  status: 'active' | 'inactive';
  dateAdded: string;
}

export interface Appointment {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  serviceId: string;
  serviceName: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface ClinicInfo {
  name: string;
  tagline: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: {
    line1: string;
    area: string;
    city: string;
    state: string;
    postalCode: string;
  };
  openingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  doctor: {
    name: string;
    title: string;
    qualifications: string[];
    experienceYears: number;
    patientsHelped: string;
    bio: string;
    philosophy: string;
    photo: string;
  };
  socialLinks: {
    whatsapp: string;
    maps: string;
    facebook: string;
    instagram: string;
    linkedin: string;
  };
}

export interface User {
  email: string;
  name: string;
  role: 'admin';
}
