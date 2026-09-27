import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, KeyRound, AlertCircle, ArrowLeft, ShieldCheck, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@physiocare.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const handleFillDemoAndLogin = async () => {
    setEmail('admin@physiocare.com');
    setPassword('admin123');
    setIsSubmitting(true);
    const result = await login('admin@physiocare.com', 'admin123');
    setIsSubmitting(false);
    if (result.success) {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
              P
            </span>
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              PhysioCare
            </span>
          </Link>
        </div>
        <h2 className="mt-4 text-center text-xl font-bold text-slate-900">
          Clinic Administration Portal
        </h2>
        <p className="mt-1 text-center text-xs text-slate-500">
          Sign in to manage services, gallery photos, and patient inquiries
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Demo Credentials Helper Box */}
        <div className="mb-4 p-4 rounded-xl bg-teal-50 border border-teal-200/90 text-xs text-teal-950 space-y-2">
          <div className="flex items-center justify-between font-bold text-teal-900">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              Demo Admin Credentials
            </span>
            <span className="text-[10px] bg-teal-200/70 text-teal-900 px-2 py-0.5 rounded">
              Ready to Test
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-white/80 p-2 rounded border border-teal-200">
            <div>
              <span className="text-slate-500 block font-sans text-[10px]">Email:</span>
              <strong className="text-slate-800">admin@physiocare.com</strong>
            </div>
            <div>
              <span className="text-slate-500 block font-sans text-[10px]">Password:</span>
              <strong className="text-slate-800">admin123</strong>
            </div>
          </div>
          <button
            type="button"
            onClick={handleFillDemoAndLogin}
            className="w-full py-1.5 text-center text-xs font-semibold text-teal-800 hover:text-teal-950 bg-teal-100 hover:bg-teal-200/80 rounded transition-colors cursor-pointer"
          >
            One-Click Demo Sign In →
          </button>
        </div>

        {/* Login Form Card */}
        <div className="bg-white py-8 px-6 shadow-md rounded-2xl border border-slate-200 sm:px-10">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 flex items-center gap-2 text-rose-700 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
                  placeholder="admin@physiocare.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow transition-all cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              </button>
            </div>
          </form>

          {/* Architecture notice */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center space-y-1">
            <p>Ready to integrate with Firebase, Supabase, or custom REST auth API.</p>
          </div>

          <div className="mt-4 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-700 hover:text-teal-900"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Clinic Website</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
