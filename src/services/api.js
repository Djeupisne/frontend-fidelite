import api from '../interceptors/axiosInstance.js';
export default api;
export const handleError = (error) => { const message = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || 'Une erreur est survenue'; throw new Error(message); };
