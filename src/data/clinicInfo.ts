import { ClinicInfo } from '../types';

export const INITIAL_CLINIC_INFO: ClinicInfo = {
  name: 'PhysioCare Physiotherapy Clinic',
  tagline: 'Move Better. Feel Better. Live Better.',
  phone: '+91 98765 43210',
  whatsappNumber: '+919876543210',
  email: 'hello@physiocare.com',
  address: {
    line1: '123 Health Avenue, Medical Enclave',
    area: 'Alkapuri',
    city: 'Vadodara',
    state: 'Gujarat',
    postalCode: '390007',
  },
  openingHours: {
    weekdays: 'Monday – Friday: 9:00 AM – 8:00 PM',
    saturday: 'Saturday: 9:00 AM – 6:00 PM',
    sunday: 'Sunday: By Appointment Only',
  },
  doctor: {
    name: 'Dr. Robert Mehta',
    title: 'Senior Consultant Physiotherapist',
    qualifications: [
      'BPT (Bachelor of Physiotherapy)',
      'MPT (Master of Sports Physiotherapy & Orthopaedics)',
      'MIAP (Member of Indian Association of Physiotherapists)',
      'Certified Manual Therapist (MCTA)'
    ],
    experienceYears: 12,
    patientsHelped: '5,000+',
    bio: 'With over a decade of clinical experience in orthopaedic and sports rehabilitation, Dr. Robert Mehta specializes in evidence-based non-surgical recovery for acute and chronic musculoskeletal dysfunctions. Having trained at premier medical centers and treated hundreds of recreational athletes and seniors alike, he is committed to compassionate, one-on-one patient care.',
    philosophy: 'Our approach is focused on understanding the root cause of your condition and creating a personalized treatment plan designed around your functional recovery and long-term health.',
    photo: '/src/assets/images/doctor_physiotherapist_1790420524832.jpg',
  },
  socialLinks: {
    whatsapp: 'https://wa.me/919876543210?text=Hello%20PhysioCare,%20I%20would%20like%20to%20inquire%20about%20a%20physiotherapy%20consultation.',
    maps: 'https://maps.google.com/?q=Vadodara+Gujarat+Physiotherapy',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
  },
};
