import React from 'react';
import { Link } from 'react-router-dom';
import {
  Stethoscope,
  Image as ImageIcon,
  CalendarCheck,
  Plus,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Database
} from 'lucide-react';
import { useClinic } from '../../context/ClinicContext';

export const AdminDashboard: React.FC = () => {
  const { services, gallery, appointments, updateAppointmentStatus } = useClinic();

  const activeServicesCount = services.filter(s => s.status === 'active').length;
  const activePhotosCount = gallery.filter(g => g.status === 'active').length;
  const pendingAppointments = appointments.filter(a => a.status === 'pending').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Clinic Overview Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your clinic offerings, photo gallery, and patient consultation requests in real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/admin/services"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Manage Services</span>
          </Link>
          <Link
            to="/admin/gallery"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Upload Photo</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards (3 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Services Stat */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Services
            </span>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
              {services.length}
            </div>
            <div className="text-[11px] text-teal-700 font-medium">
              {activeServicesCount} Active on Website
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <Stethoscope className="w-6 h-6" />
          </div>
        </div>

        {/* Gallery Stat */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Website Photos
            </span>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
              {gallery.length}
            </div>
            <div className="text-[11px] text-teal-700 font-medium">
              {activePhotosCount} Displayed in Gallery
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <ImageIcon className="w-6 h-6" />
          </div>
        </div>

        {/* Appointments Stat */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Inquiries & Bookings
            </span>
            <div className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
              {appointments.length}
            </div>
            <div className="text-[11px] text-amber-700 font-medium">
              {pendingAppointments} Pending Confirmation
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <CalendarCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Storage & Architecture Card */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-teal-600 shrink-0" />
          <span>
            <strong>Storage Architecture: </strong>
            Live state is synchronized with browser <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-800">localStorage</code>. Any updates to services or gallery take effect immediately on the public website.
          </span>
        </div>
        <span className="text-[11px] text-teal-700 font-semibold whitespace-nowrap">
          Zero Backend Needed for Demo
        </span>
      </div>

      {/* Recent Appointment Inquiries */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Recent Patient Consultations & Requests
            </h2>
            <p className="text-xs text-slate-500">
              Patients who submitted the booking form on the public website
            </p>
          </div>
          <Link
            to="/admin/appointments"
            className="text-xs font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1"
          >
            <span>View All ({appointments.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {appointments.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            No appointment requests submitted yet.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {appointments.slice(0, 5).map((apt) => (
              <div key={apt.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/60">
                      {apt.id}
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {apt.fullName}
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-600">
                      {apt.phone}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
                    <strong className="text-slate-700 font-semibold">{apt.serviceName}</strong>
                    <span>·</span>
                    <span>{apt.preferredDate} at {apt.preferredTime}</span>
                  </div>
                  {apt.message && (
                    <p className="text-[11px] text-slate-500 italic mt-0.5">
                      "{apt.message}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <select
                    value={apt.status}
                    onChange={(e) => updateAppointmentStatus(apt.id, e.target.value as any)}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                      apt.status === 'confirmed'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : apt.status === 'completed'
                        ? 'bg-slate-100 text-slate-700 border-slate-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
