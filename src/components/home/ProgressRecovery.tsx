import React from 'react';
import { Activity, Dumbbell, Compass, RefreshCw, AlertCircle } from 'lucide-react';

export const ProgressRecovery: React.FC = () => {
  const milestones = [
    {
      title: 'Restored Functional Mobility',
      icon: Compass,
      focus: 'Range of Motion (ROM)',
      description: 'Gradual expansion of pain-free joint movement, enabling everyday actions like reaching overhead, bending, and turning with ease.',
      metrics: 'Average 30–50% functional range improvement over baseline',
    },
    {
      title: 'Functional Flexibility & Tissue Ease',
      icon: Activity,
      focus: 'Soft Tissue Extensibility',
      description: 'Systematic alleviation of protective muscle spasms and capsular stiffness through gentle articular mobilization and static stretches.',
      metrics: 'Noticeable reduction in morning stiffness & postural tension',
    },
    {
      title: 'Targeted Muscular Strength',
      icon: Dumbbell,
      focus: 'Joint Stability & Tolerance',
      description: 'Rebuilding deep core stabilizers and periarticular muscle strength to protect vulnerable spinal discs, knees, and shoulder joints.',
      metrics: 'Progressive load tolerance for stairs, lifting, and sports',
    },
    {
      title: 'Biomechanical Movement Patterns',
      icon: RefreshCw,
      focus: 'Neuromuscular Re-Education',
      description: 'Retraining gait kinematics and spinal alignment so body movements become fluid, intuitive, and protective against re-injury.',
      metrics: 'Balanced weight distribution & ergonomic posture habits',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-800">
            Responsible Clinical Outcomes
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            Recovery & Progress Milestones
          </h2>
          <p className="text-base text-slate-600 leading-relaxed text-pretty">
            We measure clinical success through tangible functional improvements that allow you to participate fully in daily life.
          </p>
        </div>

        {/* Milestone cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {milestones.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-md transition-all space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200/80">
                    {item.focus}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 text-xs font-medium text-teal-800">
                  {item.metrics}
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear Medical Disclaimer */}
        <div className="mt-12 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3 text-amber-900 text-xs leading-relaxed max-w-3xl mx-auto">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Medical Disclaimer: </span>
            Individual results vary depending on the diagnosis, severity of tissue injury, compliance with clinical protocols, and baseline physical health. Physiotherapy outcomes are progressive and achieved through collaborative effort between clinician and patient.
          </div>
        </div>
      </div>
    </section>
  );
};
