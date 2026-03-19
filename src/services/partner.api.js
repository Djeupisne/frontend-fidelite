import api, { handleError } from './api.js';
export const partnerApi = {
  addPartner: async (formData) => { try { const res = await api.post('/api/partners', formData, { headers: { 'Content-Type': 'multipart/form-data' } }); return res.data; } catch (e) { handleError(e); } },
  getPartner: async (id) => { try { const res = await api.get(`/api/partners/${id}`); return res.data; } catch (e) { handleError(e); } },
  updatePartner: async (id, data) => { try { const res = await api.put(`/api/partners/${id}`, data); return res.data; } catch (e) { handleError(e); } },
  updatePartnerPhoto: async (id, formData) => { try { const res = await api.put(`/api/partners/${id}/photo`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }); return res.data; } catch (e) { handleError(e); } },
  deletePartner: async (id) => { try { const res = await api.delete(`/api/partners/${id}`); return res.data; } catch (e) { handleError(e); } }
};
