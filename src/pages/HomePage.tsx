import React, { useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/home/Hero';
import { About } from '../components/home/About';
import { ServicesSection } from '../components/home/ServicesSection';
import { TreatmentsApproach } from '../components/home/TreatmentsApproach';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { ProcessSection } from '../components/home/ProcessSection';
import { GallerySection } from '../components/home/GallerySection';
import { ProgressRecovery } from '../components/home/ProgressRecovery';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { AppointmentSection } from '../components/home/AppointmentSection';
import { ContactSection } from '../components/home/ContactSection';

export const HomePage: React.FC = () => {
  // If user arrives with a hash in URL, smooth scroll to it
  useEffect(() => {
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        setTimeout(() => {
          const topOffset = 76;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - topOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <ServicesSection />
        <TreatmentsApproach />
        <WhyChooseUs />
        <ProcessSection />
        <GallerySection />
        <ProgressRecovery />
        <TestimonialsSection />
        <AppointmentSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};
