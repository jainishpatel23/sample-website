/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ClinicProvider } from './context/ClinicContext';
import { AuthProvider } from './context/AuthContext';
import { HomePage } from './pages/HomePage';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminServices } from './pages/admin/AdminServices';
import { AdminGallery } from './pages/admin/AdminGallery';
import { AdminAppointments } from './pages/admin/AdminAppointments';

export default function App() {
  return (
    <AuthProvider>
      <ClinicProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Physiotherapy Clinic Website */}
            <Route path="/" element={<HomePage />} />

            {/* Admin Authentication */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin Management Panel */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="appointments" element={<AdminAppointments />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ClinicProvider>
    </AuthProvider>
  );
}
