import React from 'react';
import { Toaster } from 'react-hot-toast';
import AppRouter from './router/AppRouter.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
      <Toaster position="top-right" toastOptions={{ duration: 4000, style: { borderRadius: '12px', background: '#1e293b', color: '#f8fafc', fontSize: '14px' }, success: { iconTheme: { primary: '#10b981', secondary: '#f8fafc' } }, error: { iconTheme: { primary: '#ef4444', secondary: '#f8fafc' } } }} />
    </AuthProvider>
  );
}
