import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.js';
import Button from '../../components/common/Button.jsx';
export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Page introuvable</h2>
        <p className="text-gray-500 mb-8">La page que vous recherchez n'existe pas ou a été déplacée.</p>
        <Link to={ROUTES.DASHBOARD}><Button size="lg">← Retour au tableau de bord</Button></Link>
      </div>
    </div>
  );
}
