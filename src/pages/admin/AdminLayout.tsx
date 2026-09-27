import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Stethoscope,
  Image,
  CalendarCheck,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useClinic } from '../../context/ClinicContext';

export const AdminLayout: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { clinicInfo } = useClinic();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If not authenticated, redirect to login
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Services', path: '/admin/services', icon: Stethoscope },
    { label: 'Website Photos', path: '/admin/gallery', icon: Image },
    { label: 'Appointments', path: '/admin/appointments', icon: CalendarCheck },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-sm">
            P
          </span>
          <span className="font-bold text-slate-900 text-sm">
            PhysioCare Admin
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/"
            target="_blank"
            className="p-1.5 text-slate-500 hover:text-slate-900 rounded"
            title="Preview Site"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 text-slate-600 hover:text-slate-900 rounded-md"
            aria-label="Toggle menu"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar for Desktop & Mobile Overlay */}
      <aside
        className={`fixed md:sticky top-0 h-screen z-40 bg-slate-900 text-slate-300 w-64 flex flex-col justify-between transition-transform duration-200 ease-in-out md:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Logo & Clinic Name */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <Link to="/admin" className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-teal-500 text-slate-900 flex items-center justify-center font-bold text-base shadow-sm">
                P
              </span>
              <div>
                <span className="font-bold tracking-tight text-white block text-sm">
                  PhysioCare
                </span>
                <span className="text-[10px] text-teal-400 font-medium block">
                  Clinic Management
                </span>
              </div>
            </Link>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="mt-6 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-teal-700 text-white font-semibold shadow-xs'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-3 h-3 opacity-60" />
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          {/* Live site link */}
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
              <span>View Public Website</span>
            </span>
            <span className="text-[10px] text-slate-500">Live</span>
          </Link>

          {/* Logged in user info & logout */}
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <div className="truncate pr-2">
              <span className="block font-semibold text-white truncate text-[11px]">
                {user?.name}
              </span>
              <span className="block text-[10px] text-slate-400 truncate">
                {user?.email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Desktop Top Bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-800">{clinicInfo.name}</span>
            <span aria-hidden="true">/</span>
            <span>Admin Control Panel</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors border border-teal-200"
            >
              <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
              <span>Preview Public Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        {/* Child Views */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Backdrop overlay for mobile menu */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/60 md:hidden"
        />
      )}
    </div>
  );
};
