import React, { useState } from 'react';
import { Maximize2, X, Tag } from 'lucide-react';
import { useClinic } from '../../context/ClinicContext';
import { GalleryItem, GalleryCategory } from '../../types';
import { ImageWithFallback } from '../common/ImageWithFallback';

export const GallerySection: React.FC = () => {
  const { activeGallery } = useClinic();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Treatments', 'Exercises', 'Clinic', 'Equipment'];

  const filteredItems = activeCategory === 'All'
    ? activeGallery
    : activeGallery.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-slate-50/60 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-800">
            Real Clinical Environment
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            Treatment & Clinic Gallery
          </h2>
          <p className="text-base text-slate-600 leading-relaxed text-pretty">
            Take a look inside our clinic spaces, hands-on treatment sessions, corrective rehabilitation routines, and modern equipment.
          </p>

          {/* Category Filter Tabs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col"
            >
              <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-2.5 rounded-full bg-white/90 text-slate-900 shadow-md">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-semibold text-teal-800 shadow-xs">
                  {item.category}
                </div>
              </div>

              <div className="p-5 space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <span className="text-[11px] text-teal-700 font-medium inline-flex items-center gap-1 pt-2">
                  <span>View Details</span>
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state fallback */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <p className="text-slate-500 text-sm">No photos available in this category.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-slate-600 hover:text-slate-900 hover:bg-white shadow-md transition-all cursor-pointer"
              aria-label="Close photo view"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-80 sm:h-96 w-full bg-slate-900">
              <ImageWithFallback
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 uppercase tracking-wider">
                <Tag className="w-3.5 h-3.5" />
                <span>{selectedPhoto.category}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {selectedPhoto.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedPhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
