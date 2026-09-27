import React from 'react';
import {
  HandMetal,
  Dumbbell,
  Zap,
  Activity,
  Layers,
  Sparkles,
  ClipboardList
} from 'lucide-react';

export const TreatmentsApproach: React.FC = () => {
  const treatments = [
    {
      title: 'Manual Therapy',
      icon: HandMetal,
      tag: 'Hands-on Care',
      desc: 'Specific joint mobilizations, soft-tissue manipulation, and passive myofascial releases performed to decrease pain and restore natural joint play.',
    },
    {
      title: 'Therapeutic Exercise',
      icon: Dumbbell,
      tag: 'Corrective Movement',
      desc: 'Targeted exercises prescribed to activate inhibited muscles, correct movement dysfunctions, and rebuild functional endurance.',
    },
    {
      title: 'Electrotherapy & Modalities',
      icon: Zap,
      tag: 'Pain Management',
      desc: 'Evidence-supported TENS, IFT, and therapeutic ultrasound applications to modulate acute neural pain signals and ease localized inflammation.',
    },
    {
      title: 'Mobility & Flexibility Training',
      icon: Activity,
      tag: 'Range of Motion',
      desc: 'Dynamic stretching, joint flossing, and active-assisted range of motion protocols designed to unlock stiff kinetic chains.',
    },
    {
      title: 'Strength & Conditioning',
      icon: Layers,
      tag: 'Resilience',
      desc: 'Progressive overload training using resistance bands, light weights, and bodyweight to safeguard joints from future injury.',
    },
    {
      title: 'Posture & Movement Correction',
      icon: Sparkles,
      tag: 'Biomechanical Realignment',
      desc: 'Detailed ergonomics assessment and motor-control retraining so you maintain effortless alignment while sitting, standing, and lifting.',
    },
    {
      title: 'Structured Rehabilitation Programs',
      icon: ClipboardList,
      tag: 'Phase-Based Recovery',
      desc: 'Step-by-step milestone-based protocols guiding you smoothly from acute tissue protection to high-performance daily living.',
    },
  ];

  return (
    <section id="treatments" className="py-20 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-800">
            Evidence-Based Methodologies
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            Our Treatment Approach
          </h2>
          <p className="text-base text-slate-600 leading-relaxed text-pretty">
            Rather than relying on passive modalities alone, we merge hands-on clinical therapy with active patient re-education to produce resilient, lasting recovery.
          </p>
        </div>

        {/* Treatment Approach Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {treatments.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-md hover:border-teal-200 transition-all space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 group-hover:bg-teal-600 text-teal-700 group-hover:text-white flex items-center justify-center transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 group-hover:text-teal-700 transition-colors uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
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
