import { Appointment } from '../types';

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'APT-1082',
    fullName: 'Ananya Sharma',
    phone: '+91 98250 11234',
    email: 'ananya.s@example.com',
    preferredDate: '2026-09-28',
    preferredTime: '10:30 AM',
    serviceId: 'back-pain-treatment',
    serviceName: 'Back Pain & Spine Rehabilitation',
    message: 'Persistent lower back pain after prolonged desk work. Discomfort extends slightly down right glute.',
    status: 'pending',
    createdAt: '2026-09-26T08:30:00Z'
  },
  {
    id: 'APT-1081',
    fullName: 'Kunal Patel',
    phone: '+91 94260 55678',
    email: 'kunal.patel@example.com',
    preferredDate: '2026-09-27',
    preferredTime: '04:00 PM',
    serviceId: 'sports-injury-rehab',
    serviceName: 'Sports Injury Rehabilitation',
    message: 'Twisted right knee while playing badminton last weekend. Mild swelling on lateral side.',
    status: 'confirmed',
    createdAt: '2026-09-25T14:15:00Z'
  },
  {
    id: 'APT-1080',
    fullName: 'Rajeshwar Verma',
    phone: '+91 98980 99887',
    email: 'r.verma@example.com',
    preferredDate: '2026-09-26',
    preferredTime: '11:00 AM',
    serviceId: 'post-surgery-rehab',
    serviceName: 'Post-Surgery Rehabilitation',
    message: 'Post-op 4 weeks total knee replacement. Need guided gait training and flexion exercises.',
    status: 'completed',
    createdAt: '2026-09-24T11:00:00Z'
  }
];

const STORAGE_KEY = 'physiocare_appointments';

export const getStoredAppointments = (): Appointment[] => {
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    if (!item) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_APPOINTMENTS));
      return INITIAL_APPOINTMENTS;
    }
    return JSON.parse(item);
  } catch {
    return INITIAL_APPOINTMENTS;
  }
};

export const saveAppointment = (appointment: Omit<Appointment, 'id' | 'status' | 'createdAt'>): Appointment => {
  const existing = getStoredAppointments();
  const newAppointment: Appointment = {
    ...appointment,
    id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  const updated = [newAppointment, ...existing];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save appointment to localStorage', error);
  }
  return newAppointment;
};

export const updateAppointmentStatus = (id: string, status: Appointment['status']): void => {
  const existing = getStoredAppointments();
  const updated = existing.map(apt => (apt.id === id ? { ...apt, status } : apt));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to update appointment status in localStorage', error);
  }
};
