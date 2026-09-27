import React from 'react';
import { Star, Quote, Info } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: 'Rohan P.',
      condition: 'Lower Back & Sciatic Discomfort',
      rating: 5,
      comment: 'The treatment plan was easy to understand and the exercises helped me become much more confident with movement. Dr. Mehta took the time to explain exactly why my lower back was spasming.',
      duration: 'Treated over 6 weeks',
    },
    {
      name: 'Pooja D.',
      condition: 'Frozen Shoulder (Adhesive Capsulitis)',
      rating: 5,
      comment: 'When I first came in, I could barely comb my hair or reach into an overhead cabinet. The gradual joint mobilizations and home stretching routine made a noticeable difference to my daily routine.',
      duration: 'Treated over 8 weeks',
    },
    {
      name: 'Arjun M.',
      condition: 'Post ACL Reconstruction Recovery',
      rating: 5,
      comment: 'As someone who plays weekend football, recovering from knee surgery felt daunting. The structured progression from table exercises to agility and balance work gave me complete peace of mind.',
      duration: 'Treated over 12 weeks',
    },
    {
      name: 'Sunita V.',
      condition: 'Cervical Spondylosis & Headaches',
      rating: 5,
      comment: 'The posture corrections and ergonomic advice for my work desk made a huge impact. I no longer finish the workday with burning neck tightness and severe tension headaches.',
      duration: 'Treated over 4 weeks',
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-slate-50/60 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-800">
            Patient Stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            Real Experiences from Our Patients
          </h2>
          <p className="text-base text-slate-600 leading-relaxed text-pretty">
            Hear from individuals who worked with us to resolve pain, recover mobility, and get back to living actively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-200" />
                </div>

                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{rev.name}</div>
                  <div className="text-teal-700 font-medium">{rev.condition}</div>
                </div>
                <span className="text-slate-400 font-normal">{rev.duration}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Note required by prompt */}
        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-slate-500 text-center">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>Testimonials are illustrative placeholders and should be replaced with verified patient reviews.</span>
        </div>
      </div>
    </section>
  );
};
