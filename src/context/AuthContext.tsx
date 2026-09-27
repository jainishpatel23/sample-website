import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = 'physiocare_admin_auth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = !!user;

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Demo authentication check
    // Credentials: admin@physiocare.com / admin123
    const normalizedEmail = email.trim().toLowerCase();
    if (normalizedEmail === 'admin@physiocare.com' && password === 'admin123') {
      const adminUser: User = {
        email: 'admin@physiocare.com',
        name: 'Clinic Administrator',
        role: 'admin',
      };
      setUser(adminUser);
      try {
        localStorage.setItem(AUTH_KEY, JSON.stringify(adminUser));
      } catch (e) {
        console.error('Failed to save auth state', e);
      }
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password. Use demo credentials shown below.' };
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch (e) {
      console.error('Failed to clear auth state', e);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
