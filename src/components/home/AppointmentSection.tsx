import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { useClinic } from '../../context/ClinicContext';
import { Appointment } from '../../types';

export const AppointmentSection: React.FC = () => {
  const { activeServices, clinicInfo, bookAppointment } = useClinic();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    preferredDate: '',
    preferredTime: '10:00 AM',
    serviceId: activeServices[0]?.id || '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  // Listen to external service selection (e.g. from modal)
  useEffect(() => {
    const handleServiceSelect = (e: CustomEvent<string>) => {
      if (e.detail) {
        setFormData(prev => ({ ...prev, serviceId: e.detail }));
      }
    };
    window.addEventListener('select-appointment-service' as any, handleServiceSelect);
    return () => {
      window.removeEventListener('select-appointment-service' as any, handleServiceSelect);
    };
  }, []);

  // Update default service if activeServices change
  useEffect(() => {
    if (!formData.serviceId && activeServices.length > 0) {
      setFormData(prev => ({ ...prev, serviceId: activeServices[0].id }));
    }
  }, [activeServices, formData.serviceId]);

  const timeSlots = [
    '09:30 AM',
    '10:30 AM',
    '11:30 AM',
    '02:30 PM',
    '03:30 PM',
    '04:30 PM',
    '05:30 PM',
    '06:30 PM',
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+()-\s]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please provide a valid contact number';
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a date';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const selectedService = activeServices.find(s => s.id === formData.serviceId);
      const booked = bookAppointment({
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || 'N/A',
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        serviceId: formData.serviceId,
        serviceName: selectedService ? selectedService.name : 'General Assessment',
        message: formData.message.trim(),
      });

      setIsSubmitting(false);
      setConfirmedBooking(booked);
    }, 400);
  };

  const resetForm = () => {
    setConfirmedBooking(null);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      preferredDate: '',
      preferredTime: '10:00 AM',
      serviceId: activeServices[0]?.id || '',
      message: '',
    });
    setErrors({});
  };

  // Get tomorrow date as minimum
  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="appointment" className="py-20 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Context */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                Start Your Healing
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight text-balance">
                Ready to Move Better?
              </h2>
            </div>

            <p className="text-base text-slate-600 leading-relaxed">
              Book a consultation and take the first step toward better movement and recovery. Our clinical team will confirm your preferred timing and prepare for your initial evaluation.
            </p>

            {/* Benefit Highlights */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div className="text-xs text-slate-600">
                  <strong className="text-slate-900 block font-semibold">Comprehensive 45-min Initial Assessment</strong>
                  Postural inspection, joint mobilization test, and biomechanical screening.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div className="text-xs text-slate-600">
                  <strong className="text-slate-900 block font-semibold">Immediate Pain Relief Strategies</strong>
                  First session includes hands-on symptom management and guided home dos & don'ts.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div className="text-xs text-slate-600">
                  <strong className="text-slate-900 block font-semibold">Zero Wait Time Policy</strong>
                  Dedicated 1-on-1 scheduled appointments to respect your busy calendar.
                </div>
              </div>
            </div>

            {/* Quick Contact Alternative */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Need Immediate Assistance?
              </div>
              <p className="text-xs text-slate-500">
                Speak directly with our clinic desk or send a quick WhatsApp message to check today's walk-in or emergency slots.
              </p>
              <div className="pt-1 flex flex-wrap gap-3">
                <a
                  href={`tel:${clinicInfo.phone.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-600" />
                  <span>Call {clinicInfo.phone}</span>
                </a>
                <a
                  href={clinicInfo.socialLinks.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg border border-teal-200/60"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-teal-600" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Form or Confirmation (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50/70 p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs">
              {confirmedBooking ? (
                /* Success Confirmation State */
                <div className="py-6 space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2 max-w-md mx-auto">
                    <h3 className="text-2xl font-bold text-slate-900">
                      Appointment Request Received!
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Thank you, <strong className="text-slate-900">{confirmedBooking.fullName}</strong>. Your consultation request has been recorded with reference number <strong className="text-teal-700">{confirmedBooking.id}</strong>.
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Service:</span>
                      <span className="font-semibold text-slate-800">{confirmedBooking.serviceName}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Date & Time:</span>
                      <span className="font-semibold text-slate-800">{confirmedBooking.preferredDate} at {confirmedBooking.preferredTime}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="text-slate-500">Contact:</span>
                      <span className="font-semibold text-slate-800">{confirmedBooking.phone}</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-slate-500">Consultant:</span>
                      <span className="font-semibold text-teal-700">{clinicInfo.doctor.name}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Our clinic coordinator will call you to confirm your slot within 2 business hours.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={resetForm}
                      className="px-5 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-all cursor-pointer"
                    >
                      Book Another Appointment
                    </button>
                    <a
                      href={`https://wa.me/${clinicInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi,%20I%20have%20submitted%20appointment%20request%20${confirmedBooking.id}%20for%20${encodeURIComponent(confirmedBooking.serviceName)}.`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Confirm via WhatsApp Now</span>
                    </a>
                  </div>
                </div>
              ) : (
                /* Booking Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1 mb-5">
                    <h3 className="text-xl font-bold text-slate-900">
                      Request Consultation
                    </h3>
                    <p className="text-xs text-slate-500">
                      Fill out the form below. We will confirm your visit without hassle.
                    </p>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Ramesh Patel"
                        className={`w-full pl-9 pr-3 py-2 text-xs bg-white rounded-lg border ${
                          errors.fullName ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-teal-600'
                        } focus:outline-none focus:ring-2 transition-all`}
                      />
                    </div>
                    {errors.fullName && <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Phone & Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className={`w-full pl-9 pr-3 py-2 text-xs bg-white rounded-lg border ${
                            errors.phone ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-teal-600'
                          } focus:outline-none focus:ring-2 transition-all`}
                        />
                      </div>
                      {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@example.com"
                          className={`w-full pl-9 pr-3 py-2 text-xs bg-white rounded-lg border ${
                            errors.email ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-teal-600'
                          } focus:outline-none focus:ring-2 transition-all`}
                        />
                      </div>
                      {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Physiotherapy Service Needed *
                    </label>
                    <select
                      value={formData.serviceId}
                      onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all cursor-pointer"
                    >
                      {activeServices.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name} ({service.category})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date & Time Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Preferred Date *
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="date"
                          min={today}
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          className={`w-full pl-9 pr-3 py-2 text-xs bg-white rounded-lg border ${
                            errors.preferredDate ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-teal-600'
                          } focus:outline-none focus:ring-2 transition-all`}
                        />
                      </div>
                      {errors.preferredDate && <p className="text-[11px] text-rose-500 mt-1">{errors.preferredDate}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Preferred Time *
                      </label>
                      <div className="relative">
                        <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <select
                          value={formData.preferredTime}
                          onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                          className="w-full pl-9 pr-3 py-2 text-xs bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all cursor-pointer"
                        >
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Symptoms & Message */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Brief Description of Symptoms / Goals
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Sharp pain in lower back after lifting, knee swelling after running, doctor recommended post-surgery rehab..."
                      className="w-full p-3 text-xs bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 disabled:bg-slate-400 rounded-xl shadow-md hover:shadow transition-all cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Processing Request...</span>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4" />
                          <span>Request Appointment</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
