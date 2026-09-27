import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Navigation, ExternalLink, Calendar } from 'lucide-react';
import { useClinic } from '../../context/ClinicContext';

export const ContactSection: React.FC = () => {
  const { clinicInfo } = useClinic();

  return (
    <section id="contact" className="py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-800">
            Reach Out to Us
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            Visit Our Clinic or Get in Touch
          </h2>
          <p className="text-base text-slate-600 leading-relaxed text-pretty">
            Conveniently located with accessible parking and ground-floor wheelchair access for patient comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Address */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Clinic Location
                </div>
                <div className="text-sm font-bold text-slate-900">
                  {clinicInfo.name}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {clinicInfo.address.line1}, {clinicInfo.address.area}<br />
                  {clinicInfo.address.city}, {clinicInfo.address.state} — {clinicInfo.address.postalCode}
                </p>
              </div>
            </div>

            {/* Direct Lines */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Phone & WhatsApp
                </div>
                <div className="text-sm font-bold text-slate-900">
                  {clinicInfo.phone}
                </div>
                <p className="text-xs text-slate-500">
                  WhatsApp: {clinicInfo.whatsappNumber}
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  <a
                    href={`tel:${clinicInfo.phone.replace(/[^0-9+]/g, '')}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Now</span>
                  </a>
                  <a
                    href={clinicInfo.socialLinks.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors border border-teal-200"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1 text-xs">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Operating Hours
                </div>
                <div className="font-semibold text-slate-900 pt-1">
                  {clinicInfo.openingHours.weekdays}
                </div>
                <div className="text-slate-600">
                  {clinicInfo.openingHours.saturday}
                </div>
                <div className="text-teal-700 font-medium">
                  {clinicInfo.openingHours.sunday}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Visual & Location Card (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex-1 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
              {/* Map Preview Graphic */}
              <div className="relative bg-slate-100 h-64 sm:h-80 w-full overflow-hidden flex items-center justify-center">
                {/* Clean stylized map backdrop */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                {/* Stylized road grid lines */}
                <div className="absolute inset-0 flex flex-col justify-around opacity-30 pointer-events-none">
                  <div className="h-1 bg-slate-300 w-full -rotate-6 transform translate-y-4"></div>
                  <div className="h-2 bg-teal-300 w-full rotate-3"></div>
                  <div className="h-1 bg-slate-300 w-full rotate-12"></div>
                </div>

                {/* Central pin marker */}
                <div className="relative z-10 flex flex-col items-center animate-bounce duration-1000">
                  <div className="px-3.5 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg shadow-lg mb-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
                    <span>PhysioCare Clinic</span>
                  </div>
                  <div className="w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center shadow-xl border-2 border-white">
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] text-slate-600 border border-slate-200">
                  Alkapuri Medical Zone, Vadodara
                </div>
              </div>

              {/* Location Action Bar */}
              <div className="p-6 bg-slate-50/70 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    Need directions from your location?
                  </div>
                  <div className="text-xs text-slate-500">
                    Open in Google Maps for turn-by-turn driving or transit route.
                  </div>
                </div>

                <a
                  href={clinicInfo.socialLinks.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-teal-800 bg-white hover:bg-teal-50 border border-teal-200 rounded-xl shadow-2xs transition-all cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-teal-600" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
