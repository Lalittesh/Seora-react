import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { authApi, technicianApi, capitalizeServiceName } from '../services/api';

const AuthContext = createContext(null);

const TOKEN_KEY = 'seora_token';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const clearAuth = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setUser(null);
      return null;
    }
    const me = await authApi.me();
    setUser(me);
    return me;
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        await refreshUser();
      } catch {
        clearAuth();
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [refreshUser, clearAuth]);

  const login = async (email, password) => {
    const data = await authApi.login({ email, password });
    localStorage.setItem(TOKEN_KEY, data.token);
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role
    });
    return data;
  };

  const register = async (form) => {
    const { name, email, phone, password, role, technicianDetails } = form;
    await authApi.register({ name, email, phone, password, role });

    const loginData = await authApi.login({ email, password });
    localStorage.setItem(TOKEN_KEY, loginData.token);
    setUser({
      id: loginData.id,
      name: loginData.name,
      email: loginData.email,
      phone: loginData.phone,
      role: loginData.role
    });

    if (role === 'technician' && technicianDetails) {
      const serviceName = capitalizeServiceName(technicianDetails.service);
      await technicianApi.updateMe({
        name,
        phone,
        location: technicianDetails.location,
        service: serviceName,
        experience: Number(technicianDetails.experience) || 0,
        hourlyRate: Number(technicianDetails.hourlyRate) || 0,
        availability: true
      });
    }

    return loginData;
  };

  const logout = () => {
    clearAuth();
  };

  const value = useMemo(
    () => ({ user, loading, login, register, logout, refreshUser }),
    [user, loading, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
