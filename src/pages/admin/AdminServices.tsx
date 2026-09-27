import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle2,
  XCircle,
  RotateCcw,
  X,
  Clock,
  Activity,
  AlertTriangle
} from 'lucide-react';
import { useClinic } from '../../context/ClinicContext';
import { Service } from '../../types';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';

export const AdminServices: React.FC = () => {
  const {
    services,
    addService,
    updateService,
    deleteService,
    toggleServiceStatus,
    resetAllServices
  } = useClinic();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    name: string;
    category: string;
    shortDescription: string;
    fullDescription: string;
    image: string;
    iconName: string;
    durationMinutes: number;
    status: 'active' | 'inactive';
    symptoms: string;
    treatmentApproach: string;
    benefits: string;
  }>({
    name: '',
    category: 'Spine & Posture',
    shortDescription: '',
    fullDescription: '',
    image: '/src/assets/images/therapy_manual_spine_1790420537042.jpg',
    iconName: 'Activity',
    durationMinutes: 45,
    status: 'active',
    symptoms: 'Persistent localized discomfort\nStiffness after rest',
    treatmentApproach: 'Clinical assessment\nManual mobilization\nTargeted exercise',
    benefits: 'Pain reduction\nRestored mobility',
  });

  const presetImages = [
    { label: 'Manual Spine Therapy', path: '/src/assets/images/therapy_manual_spine_1790420537042.jpg' },
    { label: 'Sports Rehab Exercise', path: '/src/assets/images/sports_rehab_exercise_1790420578802.jpg' },
    { label: 'Clinic Gym & Floor', path: '/src/assets/images/clinic_modern_gym_1790420548646.jpg' },
    { label: 'Electrotherapy Modality', path: '/src/assets/images/electrotherapy_tens_1790420590836.jpg' },
    { label: 'General Treatment Care', path: '/src/assets/images/hero_physio_care_1790420512285.jpg' },
  ];

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({
      name: '',
      category: 'Spine & Posture',
      shortDescription: '',
      fullDescription: '',
      image: '/src/assets/images/therapy_manual_spine_1790420537042.jpg',
      iconName: 'Activity',
      durationMinutes: 45,
      status: 'active',
      symptoms: 'Persistent localized discomfort\nStiffness after rest',
      treatmentApproach: 'Clinical assessment\nManual mobilization\nTargeted exercise',
      benefits: 'Pain reduction\nRestored mobility',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      category: service.category,
      shortDescription: service.shortDescription,
      fullDescription: service.fullDescription,
      image: service.image,
      iconName: service.iconName,
      durationMinutes: service.durationMinutes,
      status: service.status,
      symptoms: service.symptoms.join('\n'),
      treatmentApproach: service.treatmentApproach.join('\n'),
      benefits: service.benefits.join('\n'),
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const symptomsList = formData.symptoms.split('\n').map(s => s.trim()).filter(Boolean);
    const approachList = formData.treatmentApproach.split('\n').map(s => s.trim()).filter(Boolean);
    const benefitsList = formData.benefits.split('\n').map(s => s.trim()).filter(Boolean);

    if (editingService) {
      updateService(editingService.id, {
        name: formData.name.trim(),
        category: formData.category,
        shortDescription: formData.shortDescription.trim(),
        fullDescription: formData.fullDescription.trim(),
        image: formData.image,
        iconName: formData.iconName,
        durationMinutes: Number(formData.durationMinutes) || 45,
        status: formData.status,
        symptoms: symptomsList,
        treatmentApproach: approachList,
        benefits: benefitsList,
      });
    } else {
      addService({
        name: formData.name.trim(),
        category: formData.category,
        shortDescription: formData.shortDescription.trim(),
        fullDescription: formData.fullDescription.trim() || formData.shortDescription.trim(),
        image: formData.image,
        iconName: formData.iconName,
        durationMinutes: Number(formData.durationMinutes) || 45,
        status: formData.status,
        symptoms: symptomsList,
        treatmentApproach: approachList,
        benefits: benefitsList,
      });
    }

    setIsModalOpen(false);
  };

  const filteredServices = services.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Service Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Add, edit, or temporarily disable physiotherapy services displayed on your clinic website.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (window.confirm('Reset all services to default clinical dataset?')) {
                resetAllServices();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            title="Reset to default data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search services by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
          />
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Showing {filteredServices.length} of {services.length} services
        </div>
      </div>

      {/* Services List / Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {filteredServices.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">
            No services match your search query.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
              >
                {/* Left: Thumbnail & Info */}
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/60">
                        {service.category}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">
                        {service.name}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-1 max-w-xl">
                      {service.shortDescription}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span>Approx. {service.durationMinutes} mins</span>
                      <span aria-hidden="true">·</span>
                      <span>{service.symptoms?.length || 0} Symptoms</span>
                      <span aria-hidden="true">·</span>
                      <span>{service.benefits?.length || 0} Benefits</span>
                    </div>
                  </div>
                </div>

                {/* Right: Status toggle & Actions */}
                <div className="flex items-center gap-3 self-end md:self-center">
                  <button
                    onClick={() => toggleServiceStatus(service.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      service.status === 'active'
                        ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {service.status === 'active' ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Active</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5 text-slate-400" />
                        <span>Disabled</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleOpenEdit(service)}
                    className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    title="Edit Service"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setConfirmDeleteId(service.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Service"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-base font-bold text-slate-900">Delete Service?</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to delete this service? It will no longer appear on your public clinic website. You can reset to defaults anytime.
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
                  deleteService(confirmDeleteId);
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

      {/* Add / Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {editingService ? 'Edit Physiotherapy Service' : 'Add New Service'}
                </h3>
                <p className="text-xs text-slate-500">
                  Update title, descriptions, clinical approach, and publication status
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[calc(80vh-120px)] overflow-y-auto text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                    placeholder="e.g. Lumbar Spine Decompression"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 cursor-pointer"
                  >
                    <option value="Spine & Posture">Spine & Posture</option>
                    <option value="Sports & Performance">Sports & Performance</option>
                    <option value="Surgical Recovery">Surgical Recovery</option>
                    <option value="Chronic Care">Chronic Care</option>
                    <option value="Orthopaedics">Orthopaedics</option>
                    <option value="Geriatric Care">Geriatric Care</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Specialized Care">Specialized Care</option>
                  </select>
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Card Short Description (Shown on Home Page) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                  placeholder="Concise overview explaining how this treatment helps the patient..."
                />
              </div>

              {/* Full Description */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Detailed Medical Description (Shown in Learn More Modal)
                </label>
                <textarea
                  rows={3}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                  placeholder="Elaborate on biomechanics, protocols, and who this treatment is recommended for..."
                />
              </div>

              {/* Image Selection / Presets */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Service Image (Select Clinic Asset or enter URL)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-2">
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
                  placeholder="Or enter custom image URL"
                  className="w-full p-2 bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 text-[11px]"
                />
              </div>

              {/* Symptoms & Approach in 2 cols */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Symptoms Addressed (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.symptoms}
                    onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                    className="w-full p-2 bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 font-mono text-[11px]"
                    placeholder="Sharp lower back pain&#10;Stiffness when bending"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Treatment Approach Steps (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.treatmentApproach}
                    onChange={(e) => setFormData({ ...formData, treatmentApproach: e.target.value })}
                    className="w-full p-2 bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 font-mono text-[11px]"
                    placeholder="Step 1: Mobility check&#10;Step 2: Joint mobilization"
                  />
                </div>
              </div>

              {/* Benefits */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Expected Benefits (One per line)
                </label>
                <textarea
                  rows={2}
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  className="w-full p-2 bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 font-mono text-[11px]"
                  placeholder="Restored spinal flexion&#10;Reduced pain frequency"
                />
              </div>

              {/* Duration & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Estimated Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    value={formData.durationMinutes}
                    onChange={(e) => setFormData({ ...formData, durationMinutes: parseInt(e.target.value) || 45 })}
                    className="w-full p-2 bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Publish Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full p-2 bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 cursor-pointer"
                  >
                    <option value="active">Active (Visible on Website)</option>
                    <option value="inactive">Disabled (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Modal Buttons */}
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
                  {editingService ? 'Save Changes' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
