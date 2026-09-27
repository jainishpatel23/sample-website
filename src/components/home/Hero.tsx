import React from 'react';
import { Calendar, ArrowDown, Award, Users, Activity, Sparkles, CheckCircle2 } from 'lucide-react';
import { useClinic } from '../../context/ClinicContext';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const Hero: React.FC = () => {
  const { clinicInfo } = useClinic();

  const scrollToSection = (href: string) => {
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

  const trustHighlights = [
    { title: 'Experienced Physiotherapist', desc: '10+ years dedicated clinical practice' },
    { title: 'Personalized Treatment', desc: 'Custom 1-on-1 recovery roadmaps' },
    { title: 'Modern Techniques', desc: 'Evidence-based manual & exercise therapy' },
    { title: 'Patient-Centered Care', desc: 'Root-cause focus, not quick symptom masks' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/40 via-white to-slate-50 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Lead-in label */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              <span>Personalized Physiotherapy Care</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500 font-normal">Vadodara, Gujarat</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] text-balance">
              Move Better. <span className="text-teal-700">Feel Better.</span> Live Better.
            </h1>

            {/* Supporting Text */}
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl text-pretty">
              Personalized physiotherapy treatments designed to reduce pain, restore movement, and help you return to the activities you love with lasting confidence.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToSection('#appointment')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] whitespace-nowrap cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book an Appointment</span>
              </button>

              <button
                onClick={() => scrollToSection('#services')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-700 hover:text-teal-800 bg-white hover:bg-slate-100/80 border border-slate-200/90 rounded-xl shadow-xs transition-all whitespace-nowrap cursor-pointer"
              >
                <span>Explore Services</span>
                <ArrowDown className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Micro doctor notice */}
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-500">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span>Led by {clinicInfo.doctor.name} ({clinicInfo.doctor.qualifications[0]})</span>
              <span aria-hidden="true">·</span>
              <span>New Patient Consultations Available</span>
            </div>
          </div>

          {/* Right Column: Hero Visual with Trust Cards (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative ring */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <ImageWithFallback
                  src="/src/assets/images/hero_physio_care_1790420512285.jpg"
                  alt="Senior physiotherapist guiding patient in modern clinic"
                  className="w-full h-84 sm:h-104 lg:h-116 object-cover"
                />
              </div>

              {/* Floating Trust Card 1: Experience */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3.5 z-10">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-900 leading-tight">
                    {clinicInfo.doctor.experienceYears}+ Years
                  </div>
                  <div className="text-xs font-medium text-slate-500">
                    Clinical Experience
                  </div>
                </div>
              </div>

              {/* Floating Trust Card 2: Patients Helped */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3.5 z-10">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700 shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-900 leading-tight">
                    {clinicInfo.doctor.patientsHelped}
                  </div>
                  <div className="text-xs font-medium text-slate-500">
                    Patients Helped
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature / Trust Row Below Hero */}
        <div className="mt-16 pt-10 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {trustHighlights.map((item, idx) => (
            <div key={idx} className="flex flex-col space-y-1">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>{item.title}</span>
              </div>
              <p className="text-xs text-slate-500 pl-6 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
