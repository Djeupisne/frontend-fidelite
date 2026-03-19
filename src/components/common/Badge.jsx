import React from 'react';
const variants = { success: 'badge-success', warning: 'badge-warning', danger: 'badge-danger', info: 'badge-info', gray: 'badge bg-gray-100 text-gray-700' };
export default function Badge({ children, variant = 'info', className = '' }) {
  return <span className={`${variants[variant]} ${className}`}>{children}</span>;
}
