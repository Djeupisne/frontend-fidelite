import React from 'react';
const types = { success: { bg: 'bg-green-50 border-green-200', text: 'text-green-800', icon: '✓' }, error: { bg: 'bg-red-50 border-red-200', text: 'text-red-800', icon: '✕' }, warning: { bg: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-800', icon: '!' }, info: { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-800', icon: 'i' } };
export default function Alert({ type = 'info', message, onClose }) {
  const style = types[type];
  if (!message) return null;
  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border ${style.bg} ${style.text}`}>
      <span className="font-bold text-sm mt-0.5">{style.icon}</span>
      <p className="text-sm flex-1">{message}</p>
      {onClose && <button onClick={onClose} className="text-current opacity-60 hover:opacity-100 text-lg leading-none">×</button>}
    </div>
  );
}
