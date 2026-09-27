import React, { createContext, useContext, useState, useEffect } from 'react';
import { Service, GalleryItem, Appointment, ClinicInfo } from '../types';
import { INITIAL_CLINIC_INFO } from '../data/clinicInfo';
import { getStoredServices, saveStoredServices, resetStoredServices } from '../data/services';
import { getStoredGallery, saveStoredGallery, resetStoredGallery } from '../data/gallery';
import { getStoredAppointments, saveAppointment as saveAptToStore, updateAppointmentStatus as updateAptStatusInStore } from '../data/appointments';

interface ClinicContextType {
  clinicInfo: ClinicInfo;
  services: Service[];
  activeServices: Service[];
  gallery: GalleryItem[];
  activeGallery: GalleryItem[];
  appointments: Appointment[];
  selectedServiceForModal: Service | null;
  setSelectedServiceForModal: (service: Service | null) => void;
  // Service management
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, updated: Partial<Service>) => void;
  deleteService: (id: string) => void;
  toggleServiceStatus: (id: string) => void;
  resetAllServices: () => void;
  // Gallery management
  addGalleryItem: (item: Omit<GalleryItem, 'id' | 'dateAdded'>) => void;
  updateGalleryItem: (id: string, updated: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  toggleGalleryStatus: (id: string) => void;
  resetAllGallery: () => void;
  // Appointments
  bookAppointment: (appointment: Omit<Appointment, 'id' | 'status' | 'createdAt'>) => Appointment;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clinicInfo] = useState<ClinicInfo>(INITIAL_CLINIC_INFO);
  const [services, setServices] = useState<Service[]>(() => getStoredServices());
  const [gallery, setGallery] = useState<GalleryItem[]>(() => getStoredGallery());
  const [appointments, setAppointments] = useState<Appointment[]>(() => getStoredAppointments());
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<Service | null>(null);

  // Sync services changes
  const addService = (newServiceData: Omit<Service, 'id'>) => {
    const id = newServiceData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `service-${Date.now()}`;
    const newService: Service = { ...newServiceData, id };
    const updated = [newService, ...services];
    setServices(updated);
    saveStoredServices(updated);
  };

  const updateService = (id: string, updatedData: Partial<Service>) => {
    const updated = services.map(s => (s.id === id ? { ...s, ...updatedData } : s));
    setServices(updated);
    saveStoredServices(updated);
    if (selectedServiceForModal?.id === id) {
      setSelectedServiceForModal({ ...selectedServiceForModal, ...updatedData });
    }
  };

  const deleteService = (id: string) => {
    const updated = services.filter(s => s.id !== id);
    setServices(updated);
    saveStoredServices(updated);
  };

  const toggleServiceStatus = (id: string) => {
    const updated = services.map(s => {
      if (s.id === id) {
        return { ...s, status: s.status === 'active' ? ('inactive' as const) : ('active' as const) };
      }
      return s;
    });
    setServices(updated);
    saveStoredServices(updated);
  };

  const resetAllServices = () => {
    const reset = resetStoredServices();
    setServices(reset);
  };

  // Sync gallery changes
  const addGalleryItem = (itemData: Omit<GalleryItem, 'id' | 'dateAdded'>) => {
    const newItem: GalleryItem = {
      ...itemData,
      id: `gal-${Date.now()}`,
      dateAdded: new Date().toISOString().split('T')[0],
    };
    const updated = [newItem, ...gallery];
    setGallery(updated);
    saveStoredGallery(updated);
  };

  const updateGalleryItem = (id: string, updatedData: Partial<GalleryItem>) => {
    const updated = gallery.map(item => (item.id === id ? { ...item, ...updatedData } : item));
    setGallery(updated);
    saveStoredGallery(updated);
  };

  const deleteGalleryItem = (id: string) => {
    const updated = gallery.filter(item => item.id !== id);
    setGallery(updated);
    saveStoredGallery(updated);
  };

  const toggleGalleryStatus = (id: string) => {
    const updated = gallery.map(item => {
      if (item.id === id) {
        return { ...item, status: item.status === 'active' ? ('inactive' as const) : ('active' as const) };
      }
      return item;
    });
    setGallery(updated);
    saveStoredGallery(updated);
  };

  const resetAllGallery = () => {
    const reset = resetStoredGallery();
    setGallery(reset);
  };

  // Appointments
  const bookAppointment = (appointmentData: Omit<Appointment, 'id' | 'status' | 'createdAt'>): Appointment => {
    const created = saveAptToStore(appointmentData);
    setAppointments(getStoredAppointments());
    return created;
  };

  const updateApptStatus = (id: string, status: Appointment['status']) => {
    updateAptStatusInStore(id, status);
    setAppointments(getStoredAppointments());
  };

  const activeServices = services.filter(s => s.status === 'active');
  const activeGallery = gallery.filter(g => g.status === 'active');

  return (
    <ClinicContext.Provider
      value={{
        clinicInfo,
        services,
        activeServices,
        gallery,
        activeGallery,
        appointments,
        selectedServiceForModal,
        setSelectedServiceForModal,
        addService,
        updateService,
        deleteService,
        toggleServiceStatus,
        resetAllServices,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        toggleGalleryStatus,
        resetAllGallery,
        bookAppointment,
        updateAppointmentStatus: updateApptStatus,
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};
