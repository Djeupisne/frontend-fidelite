import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../services/auth.api.js';
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) { setLoading(false); return; }
    try {
      const res = await authApi.getMe();
      setUser(res.data.user);
      setPartner(res.data.partner);
      setIsAuthenticated(true);
    } catch (e) { localStorage.clear(); setIsAuthenticated(false); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { loadUser(); }, [loadUser]);
  const login = async (credentials) => {
    const res = await authApi.login(credentials);
    localStorage.setItem('accessToken', res.data.accessToken);
    localStorage.setItem('refreshToken', res.data.refreshToken);
    setUser(res.data.user);
    setPartner(res.data.partner);
    setIsAuthenticated(true);
    return res;
  };
  const register = async (formData) => {
    const res = await authApi.register(formData);
    localStorage.setItem('accessToken', res.data.accessToken);
    localStorage.setItem('refreshToken', res.data.refreshToken);
    setUser(res.data.user);
    setPartner(res.data.partner);
    setIsAuthenticated(true);
    return res;
  };
  const logout = async () => {
    try { await authApi.logout(); } catch (e) {}
    localStorage.clear();
    setUser(null);
    setPartner(null);
    setIsAuthenticated(false);
  };
  const updateUser = (data) => setUser(prev => ({ ...prev, ...data }));
  const updatePartner = (data) => setPartner(prev => ({ ...prev, ...data }));
  return <AuthContext.Provider value={{ user, partner, loading, isAuthenticated, login, register, logout, updateUser, updatePartner, loadUser }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => { const ctx = useContext(AuthContext); if (!ctx) throw new Error('useAuth doit être utilisé dans AuthProvider'); return ctx; };
