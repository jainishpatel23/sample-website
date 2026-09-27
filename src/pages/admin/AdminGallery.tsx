import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  RotateCcw,
  X,
  Tag,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Image as ImageIcon
} from 'lucide-react';
import { useClinic } from '../../context/ClinicContext';
import { GalleryItem, GalleryCategory } from '../../types';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';

export const AdminGallery: React.FC = () => {
  const {
    gallery,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    toggleGalleryStatus,
    resetAllGallery
  } = useClinic();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    category: GalleryCategory;
    image: string;
    status: 'active' | 'inactive';
  }>({
    title: '',
    description: '',
    category: 'Treatments',
    image: '/src/assets/images/clinic_modern_gym_1790420548646.jpg',
    status: 'active',
  });

  const categories: ('All' | GalleryCategory)[] = ['All', 'Treatments', 'Exercises', 'Clinic', 'Equipment'];

  const presetImages = [
    { label: 'Spine Mobilization', path: '/src/assets/images/therapy_manual_spine_1790420537042.jpg' },
    { label: 'Rehab Guidance', path: '/src/assets/images/hero_physio_care_1790420512285.jpg' },
    { label: 'Sports Band Exercise', path: '/src/assets/images/sports_rehab_exercise_1790420578802.jpg' },
    { label: 'Clinic Gym Interior', path: '/src/assets/images/clinic_modern_gym_1790420548646.jpg' },
    { label: 'Electrotherapy Unit', path: '/src/assets/images/electrotherapy_tens_1790420590836.jpg' },
    { label: 'Consultation Room', path: '/src/assets/images/doctor_physiotherapist_1790420524832.jpg' },
  ];

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      category: 'Treatments',
      image: '/src/assets/images/clinic_modern_gym_1790420548646.jpg',
      status: 'active',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      image: item.image,
      status: item.status,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingItem) {
      updateGalleryItem(editingItem.id, {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        image: formData.image,
        status: formData.status,
      });
    } else {
      addGalleryItem({
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        image: formData.image,
        status: formData.status,
      });
    }

    setIsModalOpen(false);
  };

  const filteredItems = activeCategory === 'All'
    ? gallery
    : gallery.filter(g => g.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Website Photos & Gallery
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage treatment photos, clinic spaces, and rehabilitation equipment shown to prospective patients.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (window.confirm('Reset gallery to default photos?')) {
                resetAllGallery();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            title="Reset to default photos"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Photo</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-teal-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="text-xs text-slate-500 font-medium px-2">
          {filteredItems.length} Photos in view
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs flex flex-col justify-between"
          >
            <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-semibold text-teal-800 shadow-xs">
                {item.category}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => toggleGalleryStatus(item.id)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                    item.status === 'active'
                      ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {item.status === 'active' ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Active</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3 h-3 text-slate-400" />
                      <span>Hidden</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    title="Edit Photo"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
          No photos found in this category. Click "+ Add Photo" to upload one.
        </div>
      )}

      {/* Delete Confirmation */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-base font-bold text-slate-900">Delete Photo?</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to remove this photo from the clinic gallery?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteGalleryItem(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Photo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {editingItem ? 'Edit Photo Details' : 'Add Photo to Gallery'}
                </h3>
                <p className="text-xs text-slate-500">
                  Choose an image and provide a patient-friendly caption
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Photo Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Scapular Mobility Exercise Session"
                  className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as GalleryCategory })}
                  className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 cursor-pointer"
                >
                  <option value="Treatments">Treatments</option>
                  <option value="Exercises">Exercises</option>
                  <option value="Clinic">Clinic</option>
                  <option value="Equipment">Equipment</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Photo Source (Select Preset or input custom URL)
                </label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {presetImages.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: preset.path })}
                      className={`p-1.5 rounded-lg border text-[10px] text-center transition-all cursor-pointer ${
                        formData.image === preset.path
                          ? 'border-teal-600 bg-teal-50 text-teal-800 font-bold ring-2 ring-teal-600/30'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <div className="h-10 rounded overflow-hidden mb-1 bg-slate-100">
                        <img src={preset.path} alt={preset.label} className="w-full h-full object-cover" />
                      </div>
                      <span className="line-clamp-1">{preset.label}</span>
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="Or enter image URL (e.g. https://... or data:image/...)"
                  className="w-full p-2 bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 text-[11px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief clinical context or patient activity..."
                  className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Display Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 cursor-pointer"
                >
                  <option value="active">Active (Visible in Gallery)</option>
                  <option value="inactive">Hidden (Draft)</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  {editingItem ? 'Save Changes' : 'Add to Gallery'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
