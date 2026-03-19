import api, { handleError } from './api.js';
export const paymentApi = {
  getPlans: async () => { try { const res = await api.get('/api/payments/plans'); return res.data; } catch (e) { handleError(e); } },
  createIntent: async (data) => { try { const res = await api.post('/api/payments/create-intent', data); return res.data; } catch (e) { handleError(e); } },
  confirmPayment: async (data) => { try { const res = await api.post('/api/payments/confirm', data); return res.data; } catch (e) { handleError(e); } },
  getHistory: async () => { try { const res = await api.get('/api/payments/history'); return res.data; } catch (e) { handleError(e); } }
};
