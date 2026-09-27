import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';
import { useClinic } from '../../context/ClinicContext';

export const Footer: React.FC = () => {
  const { clinicInfo, activeServices } = useClinic();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const topOffset = 76;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-teal-500 text-slate-900 flex items-center justify-center font-bold text-lg">
                P
              </span>
              <span className="text-xl font-bold tracking-tight text-white">
                {clinicInfo.name}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {clinicInfo.tagline} Providing evidence-based, compassionate physiotherapy and rehabilitation care focused on root-cause recovery and restored mobility.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300">{clinicInfo.doctor.name}</p>
              <p className="text-slate-400">{clinicInfo.doctor.title}</p>
              <p className="text-teal-400">{clinicInfo.doctor.qualifications.slice(0, 2).join(' · ')}</p>
            </div>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={clinicInfo.socialLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-teal-600 hover:text-white text-slate-300 flex items-center justify-center transition-colors text-xs font-semibold"
                aria-label="WhatsApp"
              >
                WA
              </a>
              <a
                href={clinicInfo.socialLinks.maps}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-teal-600 hover:text-white text-slate-300 flex items-center justify-center transition-colors text-xs font-semibold"
                aria-label="Google Maps"
              >
                MAP
              </a>
              <Link
                to="/admin"
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors pl-2 underline underline-offset-4"
              >
                Clinic Staff Admin
              </Link>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#about"
                  onClick={(e) => scrollToSection(e, '#about')}
                  className="hover:text-teal-400 transition-colors"
                >
                  About Dr. Mehta
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => scrollToSection(e, '#services')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Specialized Services
                </a>
              </li>
              <li>
                <a
                  href="#treatments"
                  onClick={(e) => scrollToSection(e, '#treatments')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Treatment Approach
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  onClick={(e) => scrollToSection(e, '#gallery')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Clinic & Work Gallery
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  onClick={(e) => scrollToSection(e, '#testimonials')}
                  className="hover:text-teal-400 transition-colors"
                >
                  Patient Experiences
                </a>
              </li>
              <li>
                <a
                  href="#appointment"
                  onClick={(e) => scrollToSection(e, '#appointment')}
                  className="hover:text-teal-400 transition-colors text-teal-400 font-medium"
                >
                  Book Appointment
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Key Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Care Programs
            </h3>
            <ul className="space-y-2.5 text-sm">
              {activeServices.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    onClick={(e) => scrollToSection(e, '#services')}
                    className="hover:text-teal-400 transition-colors line-clamp-1"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact & Hours */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Visit & Contact
            </h3>
            <div className="space-y-3 text-xs leading-relaxed text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>
                  {clinicInfo.address.line1}, {clinicInfo.address.area}, {clinicInfo.address.city}, {clinicInfo.address.state} - {clinicInfo.address.postalCode}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:${clinicInfo.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white">
                  {clinicInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`mailto:${clinicInfo.email}`} className="hover:text-white">
                  {clinicInfo.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p>{clinicInfo.openingHours.weekdays}</p>
                  <p>{clinicInfo.openingHours.saturday}</p>
                  <p className="text-teal-400/90">{clinicInfo.openingHours.sunday}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 {clinicInfo.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Evidence-Based Rehabilitation</span>
            <span aria-hidden="true">·</span>
            <span>Non-Surgical Pain Care</span>
            <span aria-hidden="true">·</span>
            <span>Certified Physiotherapy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
