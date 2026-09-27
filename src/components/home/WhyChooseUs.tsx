import React from 'react';
import {
  UserCheck,
  Award,
  Stethoscope,
  Heart,
  TrendingUp,
  Building2,
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: UserCheck,
      title: 'One-on-One Dedicated Attention',
      desc: 'You receive 100% focused attention from Dr. Mehta during your session. No rushed double-booked rooms or unsupervised exercise.',
    },
    {
      icon: Award,
      title: 'Experienced Clinical Care',
      desc: 'Over 12 years of hands-on experience treating complex spine dysfunctions, post-op cases, and athletic joint injuries.',
    },
    {
      icon: Stethoscope,
      title: 'Personalized Treatment Plans',
      desc: 'No generic sheet of exercises. Every routine is specifically designed around your unique anatomy, symptoms, and lifestyle goals.',
    },
    {
      icon: Stethoscope,
      title: 'Modern Physiotherapy Techniques',
      desc: 'We incorporate modern biomechanics, evidence-supported manual mobilization, and clinical modalities backed by research.',
    },
    {
      icon: TrendingUp,
      title: 'Focus on Long-Term Recovery',
      desc: 'We resolve the underlying structural trigger to prevent relapse so you do not need indefinite clinic appointments.',
    },
    {
      icon: Building2,
      title: 'Comfortable Clinic Environment',
      desc: 'Clean, serene, sanitized treatment cubicles and a bright rehabilitation floor designed for patient comfort and privacy.',
    },
  ];

  return (
    <section className="py-20 bg-slate-50/50 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-800">
            The PhysioCare Difference
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            Why Patients Choose Our Clinic
          </h2>
          <p className="text-base text-slate-600 leading-relaxed text-pretty">
            We are dedicated to honest, ethical healthcare where patient well-being and lasting independence always come first.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
