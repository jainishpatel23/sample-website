import React from 'react';
import { Search, FileSpreadsheet, Stethoscope, LineChart } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Detailed Assessment',
      icon: Search,
      desc: 'Understand your condition, symptoms, functional movement range, orthopedic history, and daily recovery goals.',
    },
    {
      number: '02',
      title: 'Personalized Plan',
      icon: FileSpreadsheet,
      desc: 'Develop a customized treatment protocol tailored specifically to your body mechanics, schedule, and tolerance levels.',
    },
    {
      number: '03',
      title: 'Guided Treatment',
      icon: Stethoscope,
      desc: 'Begin hands-on manual therapy, targeted pain reduction modalities, and supervised corrective exercise progressions.',
    },
    {
      number: '04',
      title: 'Progress Tracking',
      icon: LineChart,
      desc: 'Regularly re-evaluate movement gains, advance strength thresholds, and equip you with self-management home routines.',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-800">
            Clear Roadmap to Recovery
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            Your 4-Step Healing Journey
          </h2>
          <p className="text-base text-slate-600 leading-relaxed text-pretty">
            We guide you step-by-step through a transparent, compassionate recovery pathway with measurable milestones.
          </p>
        </div>

        {/* Process steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative flex flex-col p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-teal-50/20 hover:border-teal-300 transition-all space-y-4"
              >
                {/* Step indicator header */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-teal-700/80 tracking-tight">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-teal-700 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
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
