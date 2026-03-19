import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { ROUTES } from '../../constants/routes.js';
import { getInitials } from '../../utils/formatters.js';
import toast from 'react-hot-toast';
const navLinks = [{ to: ROUTES.DASHBOARD, label: 'Tableau de bord', icon: '⊞' }, { to: ROUTES.SEARCH, label: 'Vérification', icon: '🔍' }, { to: ROUTES.PLANS, label: 'Plans', icon: '⭐' }, { to: ROUTES.HISTORY, label: 'Historique', icon: '📋' }];
export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const handleLogout = async () => { await logout(); toast.success('Déconnexion réussie'); navigate(ROUTES.LOGIN); };
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to={ROUTES.DASHBOARD} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">MF</span>
            </div>
            <span className="font-bold text-gray-900 text-lg hidden sm:block">Monde Fidélité</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.to ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
                <span>{link.icon}</span>{link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setDropOpen(!dropOpen)} className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition-colors">
                {user?.photo ? <img src={user.photo} alt="" className="w-8 h-8 rounded-lg object-cover" /> : <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-primary-700 text-xs font-bold">{getInitials(user?.nom, user?.prenom)}</div>}
                <span className="hidden sm:block text-sm font-medium text-gray-700">{user?.prenom}</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
              </button>
              {dropOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50" onMouseLeave={() => setDropOpen(false)}>
                  <div className="px-4 py-2 border-b border-gray-100 mb-1">
                    <p className="text-sm font-medium text-gray-900">{user?.prenom} {user?.nom}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <Link to={ROUTES.PROFILE} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setDropOpen(false)}>👤 Mon profil</Link>
                  <Link to={ROUTES.PARTNER} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setDropOpen(false)}>💑 Mon partenaire</Link>
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">🚪 Déconnexion</button>
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}/></svg>
            </button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-1">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${location.pathname === link.to ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`} onClick={() => setMenuOpen(false)}>
              <span>{link.icon}</span>{link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
