import React from 'react';
export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-primary-700 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">MF</span>
          </div>
          <span className="text-sm font-medium text-gray-700">Monde Fidélité</span>
        </div>
        <p className="text-xs text-gray-400">© {new Date().getFullYear()} Monde Fidélité — Tous droits réservés</p>
        <p className="text-xs text-gray-400">Vos données sont protégées et confidentielles</p>
      </div>
    </footer>
  );
}
