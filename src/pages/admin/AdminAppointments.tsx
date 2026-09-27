import React, { useState } from 'react';
import {
  CalendarCheck,
  Search,
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import { useClinic } from '../../context/ClinicContext';
import { Appointment } from '../../types';

export const AdminAppointments: React.FC = () => {
  const { appointments, updateAppointmentStatus, clinicInfo } = useClinic();
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [search, setSearch] = useState('');

  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
    const matchesSearch =
      apt.fullName.toLowerCase().includes(search.toLowerCase()) ||
      apt.phone.toLowerCase().includes(search.toLowerCase()) ||
      apt.serviceName.toLowerCase().includes(search.toLowerCase()) ||
      apt.id.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Patient Appointments & Inquiries
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review incoming consultation requests submitted through the public website booking form.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by name, phone, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['All', 'pending', 'confirmed', 'completed', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-teal-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {filteredAppointments.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">
            No appointment requests match your current filters.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredAppointments.map((apt) => (
              <div
                key={apt.id}
                className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded border border-teal-200/80">
                      {apt.id}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      {apt.fullName}
                    </h3>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs font-semibold text-teal-700">
                      {apt.serviceName}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <a href={`tel:${apt.phone}`} className="hover:text-teal-700 font-medium">
                        {apt.phone}
                      </a>
                    </div>
                    {apt.email && apt.email !== 'N/A' && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate">{apt.email}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{apt.preferredDate} ({apt.preferredTime})</span>
                    </div>
                  </div>

                  {apt.message && (
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-700 leading-relaxed">
                      <strong className="text-slate-900 block mb-0.5">Patient Notes / Symptoms:</strong>
                      {apt.message}
                    </div>
                  )}
                </div>

                {/* Status Switcher & Contact Actions */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400 font-medium">Status:</span>
                    <select
                      value={apt.status}
                      onChange={(e) => updateAppointmentStatus(apt.id, e.target.value as any)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                        apt.status === 'confirmed'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : apt.status === 'completed'
                          ? 'bg-slate-100 text-slate-700 border-slate-200'
                          : apt.status === 'cancelled'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={`https://wa.me/${apt.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(apt.fullName)},%20this%20is%20Dr.%20Mehta%20from%20PhysioCare%20Clinic%20regarding%20your%20appointment%20request%20${apt.id}.`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors border border-teal-200"
                    >
                      <MessageCircle className="w-3 h-3 text-teal-600" />
                      <span>WhatsApp Patient</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
