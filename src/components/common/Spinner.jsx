import React from 'react';
const sizes = { sm: 'h-4 w-4 border-2', md: 'h-8 w-8 border-2', lg: 'h-12 w-12 border-3' };
export default function Spinner({ size = 'md', className = '' }) {
  return <div className={`inline-block animate-spin rounded-full border-primary-600 border-t-transparent ${sizes[size]} ${className}`} role="status"><span className="sr-only">Chargement...</span></div>;
}
