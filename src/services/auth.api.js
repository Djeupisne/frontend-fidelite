import api, { handleError } from './api.js';
export const authApi = {
  register: async (formData) => { try { const res = await api.post('/api/auth/register', formData, { headers: { 'Content-Type': 'multipart/form-data' } }); return res.data; } catch (e) { handleError(e); } },
  login: async (data) => { try { const res = await api.post('/api/auth/login', data); return res.data; } catch (e) { handleError(e); } },
  logout: async () => { try { const res = await api.post('/api/auth/logout'); return res.data; } catch (e) { handleError(e); } },
  getMe: async () => { try { const res = await api.get('/api/auth/me'); return res.data; } catch (e) { handleError(e); } },
  refreshToken: async (token) => { try { const res = await api.post('/api/auth/refresh-token', { refreshToken: token }); return res.data; } catch (e) { handleError(e); } }
};
