import api, { handleError } from './api.js';
export const userApi = {
  getProfile: async () => { try { const res = await api.get('/api/users/profile'); return res.data; } catch (e) { handleError(e); } },
  updateProfile: async (data) => { try { const res = await api.put('/api/users/profile', data); return res.data; } catch (e) { handleError(e); } },
  updatePhoto: async (formData) => { try { const res = await api.put('/api/users/photo', formData, { headers: { 'Content-Type': 'multipart/form-data' } }); return res.data; } catch (e) { handleError(e); } },
  changePassword: async (data) => { try { const res = await api.put('/api/users/change-password', data); return res.data; } catch (e) { handleError(e); } },
  deleteAccount: async () => { try { const res = await api.delete('/api/users/account'); return res.data; } catch (e) { handleError(e); } }
};
