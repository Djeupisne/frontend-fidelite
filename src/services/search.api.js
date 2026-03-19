import api, { handleError } from './api.js';
export const searchApi = {
  runSearch: async (data) => { try { const res = await api.post('/api/search/verify', data); return res.data; } catch (e) { handleError(e); } },
  getHistory: async (page = 1, limit = 10) => { try { const res = await api.get(`/api/search/history?page=${page}&limit=${limit}`); return res.data; } catch (e) { handleError(e); } },
  getDetail: async (id) => { try { const res = await api.get(`/api/search/${id}`); return res.data; } catch (e) { handleError(e); } }
};
