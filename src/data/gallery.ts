import { GalleryItem } from '../types';

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Manual Spinal Mobilization Therapy',
    description: 'Hands-on targeted articular glide to relieve lumbar facet joint impingement and relax hypertonic paraspinal muscles.',
    category: 'Treatments',
    image: '/src/assets/images/therapy_manual_spine_1790420537042.jpg',
    status: 'active',
    dateAdded: '2026-02-15'
  },
  {
    id: 'gal-2',
    title: 'Guided Active Rehabilitation Session',
    description: 'Individual patient performing controlled functional kinetic chain mobility exercises under direct clinical supervision.',
    category: 'Treatments',
    image: '/src/assets/images/hero_physio_care_1790420512285.jpg',
    status: 'active',
    dateAdded: '2026-02-18'
  },
  {
    id: 'gal-3',
    title: 'Rotator Cuff Resistance Band Conditioning',
    description: 'Sport-specific shoulder external rotation strengthening using calibrated latex resistance bands.',
    category: 'Exercises',
    image: '/src/assets/images/sports_rehab_exercise_1790420578802.jpg',
    status: 'active',
    dateAdded: '2026-02-20'
  },
  {
    id: 'gal-4',
    title: 'Modern Clinic Rehabilitation Floor',
    description: 'Spacious, well-ventilated rehabilitation gym with parallel walking bars, balance trainers, and ergonomic treatment beds.',
    category: 'Clinic',
    image: '/src/assets/images/clinic_modern_gym_1790420548646.jpg',
    status: 'active',
    dateAdded: '2026-02-22'
  },
  {
    id: 'gal-5',
    title: 'TENS & Interferential Therapy Modality',
    description: 'Clinical grade dual-channel electrotherapy setup providing safe pain gate stimulation for chronic knee discomfort.',
    category: 'Equipment',
    image: '/src/assets/images/electrotherapy_tens_1790420590836.jpg',
    status: 'active',
    dateAdded: '2026-02-25'
  },
  {
    id: 'gal-6',
    title: 'Clinical Consultation & Diagnosis Room',
    description: 'Dedicated private consultation room equipped with anatomical spine models and diagnostic gait analysis markers.',
    category: 'Clinic',
    image: '/src/assets/images/doctor_physiotherapist_1790420524832.jpg',
    status: 'active',
    dateAdded: '2026-03-01'
  }
];

const STORAGE_KEY = 'physiocare_gallery';

export const getStoredGallery = (): GalleryItem[] => {
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    if (!item) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_GALLERY));
      return INITIAL_GALLERY;
    }
    return JSON.parse(item);
  } catch {
    return INITIAL_GALLERY;
  }
};

export const saveStoredGallery = (items: GalleryItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save gallery to localStorage', error);
  }
};

export const resetStoredGallery = (): GalleryItem[] => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_GALLERY));
  } catch (error) {
    console.error('Failed to reset gallery in localStorage', error);
  }
  return INITIAL_GALLERY;
};
