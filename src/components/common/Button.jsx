import React from 'react';
import Spinner from './Spinner.jsx';
export default function Button({ children, variant = 'primary', size = 'md', loading = false, disabled = false, className = '', ...props }) {
  const variants = { primary: 'btn-primary', secondary: 'btn-secondary', danger: 'btn-danger', ghost: 'btn text-gray-600 hover:bg-gray-100' };
  const sizes = { sm: 'text-xs px-3 py-2', md: 'text-sm px-4 py-2.5', lg: 'text-base px-6 py-3' };
  return (
    <button className={`btn ${variants[variant]} ${sizes[size]} ${className}`} disabled={disabled || loading} {...props}>
      {loading && <Spinner size="sm" className="mr-2" />}
      {children}
    </button>
  );
}
