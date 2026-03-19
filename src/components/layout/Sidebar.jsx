import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.js';
import { useAuth } from '../../context/AuthContext.jsx';
const links = [{ to: ROUTES.DASHBOARD, label: 'Tableau de bord', icon: '⊞' }, { to: ROUTES.SEARCH, label: 'Vérification', icon: '🔍' }, { to: ROUTES.HISTORY, label: 'Historique', icon: '📋' }, { to: ROUTES.PLANS, label: 'Plans & Crédits', icon: '⭐' }, { to: ROUTES.PROFILE, label: 'Mon profil', icon: '👤' }, { to: ROUTES.PARTNER, label: 'Mon partenaire', icon: '💑' }];
export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen py-6 px-4">
      <nav className="space-y-1 flex-1">
        {links.map(link => (
          <Link key={link.to} to={link.to} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${location.pathname === link.to ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
            <span className="text-base">{link.icon}</span>{link.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 px-3 py-2">
          <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-primary-700 text-xs font-bold">{(user?.prenom || '?').charAt(0)}</div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-900 truncate">{user?.prenom} {user?.nom}</p>
            <p className="text-xs text-gray-400 truncate">{user?.searchCredits || 0} crédit(s)</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
