import React, { useEffect } from 'react';
import { X, Calendar, CheckCircle2, AlertCircle, Clock, ArrowRight } from 'lucide-react';
import { Service } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface ServiceDetailModalProps {
  service: Service | null;
  onClose: () => void;
  onBookService: (service: Service) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-slate-600 hover:text-slate-900 hover:bg-white shadow-md transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Header */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-900">
          <ImageWithFallback
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-300">
              {service.category}
            </span>
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold mt-1 text-white">
              {service.name}
            </h2>
            <div className="flex items-center gap-3 text-xs text-slate-300 mt-2">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-teal-400" />
                Approx. {service.durationMinutes} min session
              </span>
              <span aria-hidden="true">·</span>
              <span>1-on-1 Personalized Care</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-288px)] overflow-y-auto">
          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Program Overview
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {service.fullDescription || service.shortDescription}
            </p>
          </div>

          {/* Common Symptoms */}
          {service.symptoms && service.symptoms.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <span>Common Symptoms We Address</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {service.symptoms.map((symptom, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Treatment Approach */}
          {service.treatmentApproach && service.treatmentApproach.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Our Clinical Approach
              </h3>
              <div className="space-y-2 text-xs text-slate-700">
                {service.treatmentApproach.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-md bg-teal-50 text-teal-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                      {idx + 1}
                    </span>
                    <span className="mt-0.5 leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits */}
          {service.benefits && service.benefits.length > 0 && (
            <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-900 mb-2">
                Expected Functional Outcomes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-teal-950">
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 mt-3 italic">
                * Note: Individual recovery rates vary depending on initial severity, medical history, and consistent adherence to home exercise protocols.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg transition-colors cursor-pointer"
          >
            Close Details
          </button>

          <button
            onClick={() => onBookService(service)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultation for this Service</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
