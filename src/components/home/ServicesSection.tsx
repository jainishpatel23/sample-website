import React, { useState } from 'react';
import {
  Activity,
  Smile,
  Flame,
  ShieldCheck,
  HeartPulse,
  Zap,
  Compass,
  Award,
  Cpu,
  Home,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { useClinic } from '../../context/ClinicContext';
import { Service } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { ServiceDetailModal } from './ServiceDetailModal';

export const ServicesSection: React.FC = () => {
  const { activeServices, selectedServiceForModal, setSelectedServiceForModal } = useClinic();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Map icon names to Lucide icons
  const renderIcon = (iconName: string) => {
    const props = { className: 'w-4 h-4' };
    switch (iconName) {
      case 'Activity': return <Activity {...props} />;
      case 'Smile': return <Smile {...props} />;
      case 'Flame': return <Flame {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'HeartPulse': return <HeartPulse {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Compass': return <Compass {...props} />;
      case 'Award': return <Award {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'Home': return <Home {...props} />;
      default: return <Activity {...props} />;
    }
  };

  const categories = ['All', ...Array.from(new Set(activeServices.map(s => s.category)))];

  const filteredServices = selectedCategory === 'All'
    ? activeServices
    : activeServices.filter(s => s.category === selectedCategory);

  const handleBookService = (service: Service) => {
    setSelectedServiceForModal(null);
    const targetElement = document.querySelector('#appointment');
    if (targetElement) {
      const topOffset = 76;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      // Fire custom event to set service in appointment form
      window.dispatchEvent(new CustomEvent('select-appointment-service', { detail: service.id }));
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-50/60 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-800">
            Comprehensive Physiotherapy Care
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            Specialized Treatments Designed for Real Recovery
          </h2>
          <p className="text-base text-slate-600 leading-relaxed text-pretty">
            We combine expert manual assessment, therapeutic exercise, and progressive neuromuscular retraining to address both acute symptoms and chronic pain conditions.
          </p>

          {/* Interactive Filter Tabs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              {/* Card Image */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <ImageWithFallback
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-semibold text-teal-800 shadow-xs flex items-center gap-1.5">
                  <span className="text-teal-600">{renderIcon(service.iconName)}</span>
                  <span>{service.category}</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {service.durationMinutes} min session
                  </span>

                  <button
                    onClick={() => setSelectedServiceForModal(service)}
                    className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-900 font-semibold cursor-pointer group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state fallback */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <p className="text-slate-500 text-sm">No services found in this category.</p>
          </div>
        )}
      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedServiceForModal}
        onClose={() => setSelectedServiceForModal(null)}
        onBookService={handleBookService}
      />
    </section>
  );
};
