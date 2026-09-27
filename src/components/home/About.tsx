import React from 'react';
import { Award, CheckCircle, GraduationCap, Clock, HeartHandshake, Calendar } from 'lucide-react';
import { useClinic } from '../../context/ClinicContext';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const About: React.FC = () => {
  const { clinicInfo } = useClinic();

  const scrollToAppointment = () => {
    const targetElement = document.querySelector('#appointment');
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
    <section id="about" className="py-20 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Doctor Portrait (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-100">
                <ImageWithFallback
                  src={clinicInfo.doctor.photo}
                  alt={`${clinicInfo.doctor.name} - Senior Physiotherapist`}
                  className="w-full h-112 object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent p-6 text-white">
                  <div className="text-xl font-bold">{clinicInfo.doctor.name}</div>
                  <div className="text-sm text-teal-300 font-medium">{clinicInfo.doctor.title}</div>
                  <div className="text-xs text-slate-300 mt-1">Specialized in Orthopaedic & Sports Rehab</div>
                </div>
              </div>

              {/* Floating credentials badge */}
              <div className="absolute -bottom-6 right-4 sm:-right-4 bg-white p-4 rounded-xl shadow-lg border border-slate-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{clinicInfo.doctor.experienceYears}+ Years Clinical Practice</div>
                  <div className="text-xs text-slate-500">Vadodara & Regional Referrals</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio & Philosophy (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-teal-800">
                Meet Your Physiotherapist
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Dedicated to Restoring Your Comfort & Functional Movement
              </h2>
            </div>

            <p className="text-base text-slate-600 leading-relaxed">
              {clinicInfo.doctor.bio}
            </p>

            {/* Philosophy callout */}
            <div className="p-5 rounded-xl bg-teal-50/70 border-l-4 border-teal-600 text-slate-800 space-y-1.5">
              <div className="text-xs font-bold uppercase tracking-wider text-teal-900">
                Our Clinical Philosophy
              </div>
              <p className="text-sm italic text-slate-700 leading-relaxed">
                "{clinicInfo.doctor.philosophy}"
              </p>
            </div>

            {/* Qualifications list */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Credentials & Certifications
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {clinicInfo.doctor.qualifications.map((qual, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                    <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{qual}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={scrollToAppointment}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-teal-400" />
                <span>Consult with Dr. Mehta</span>
              </button>

              <a
                href={clinicInfo.socialLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-xl transition-colors cursor-pointer"
              >
                <span>Ask a Quick Question on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
