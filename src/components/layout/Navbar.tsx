import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, Lock } from 'lucide-react';
import { useClinic } from '../../context/ClinicContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { clinicInfo } = useClinic();
  const location = useLocation();

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Treatments', href: '#treatments' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (location.pathname !== '/') {
      // If not on home page, let router navigate
      return;
    }
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const topOffset = 76;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToAppointment = () => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = '/#appointment';
      return;
    }
    const targetElement = document.querySelector('#appointment');
    if (targetElement) {
      const topOffset = 76;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Zone 1: Single text element wordmark */}
          <Link
            to="/"
            className="flex items-center gap-2 group focus-visible:outline-teal-600"
          >
            <span className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-teal-700 transition-colors">
              P
            </span>
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-teal-800 transition-colors">
              PhysioCare
            </span>
          </Link>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-teal-700 transition-colors py-1 relative hover:underline underline-offset-4 decoration-teal-600/50 decoration-2"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
              title="Admin Panel"
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>Admin</span>
            </Link>

            <button
              onClick={scrollToAppointment}
              className="inline-flex items-center gap-2 px-4.5 py-2.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap active:scale-[0.98]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={scrollToAppointment}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-teal-700 rounded-md"
            >
              Book
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 rounded-lg"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-xl px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-base font-medium text-slate-700 hover:text-teal-700 hover:bg-slate-50 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={scrollToAppointment}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-4 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>Clinic Owner Admin Panel</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
