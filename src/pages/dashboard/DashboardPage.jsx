import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { ROUTES } from '../../constants/routes.js';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';
import UserCard from '../../components/cards/UserCard.jsx';
import Badge from '../../components/common/Badge.jsx';
import { formatDate } from '../../utils/formatters.js';
export default function DashboardPage() {
  const { user, partner } = useAuth();
  const credits = user?.searchCredits || 0;
  const hasPlan = user?.plan && user?.planExpiry && new Date(user.planExpiry) > new Date();
  const stats = [{ label: 'Crédits restants', value: credits, icon: '⭐', color: credits > 0 ? 'text-green-600' : 'text-red-500' }, { label: 'Plan actif', value: hasPlan ? user.plan?.nom || 'Actif' : 'Aucun', icon: '📦', color: hasPlan ? 'text-blue-600' : 'text-gray-400' }, { label: 'Expiration', value: hasPlan ? formatDate(user.planExpiry) : '—', icon: '📅', color: 'text-gray-600' }];
  const actions = [{ to: ROUTES.SEARCH, label: 'Vérifier mon partenaire', desc: 'Lancer une vérification de fidélité', icon: '🔍', color: 'bg-primary-600 text-white hover:bg-primary-700', disabled: credits === 0 }, { to: ROUTES.PLANS, label: 'Acheter des crédits', desc: 'Choisir un plan de vérification', icon: '⭐', color: 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-200' }, { to: ROUTES.HISTORY, label: 'Voir l\'historique', desc: 'Consulter mes recherches passées', icon: '📋', color: 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-200' }, { to: ROUTES.PARTNER, label: 'Mon partenaire', desc: 'Voir/modifier sa fiche', icon: '💑', color: 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-200' }];
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Bonjour, {user?.prenom} 👋</h1>
          <p className="text-gray-500 mt-1 text-sm">Bienvenue sur votre tableau de bord Monde Fidélité</p>
        </div>
        {credits === 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-center gap-4">
            <span className="text-2xl">⚠️</span>
            <div className="flex-1"><p className="font-medium text-amber-800 text-sm">Vous n'avez aucun crédit de vérification</p><p className="text-amber-600 text-xs mt-0.5">Achetez un plan pour commencer à vérifier</p></div>
            <Link to={ROUTES.PLANS} className="btn-primary text-sm px-4 py-2 rounded-xl">Acheter</Link>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map(stat => (
            <div key={stat.label} className="card flex items-center gap-4">
              <span className="text-3xl">{stat.icon}</span>
              <div><p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{stat.label}</p><p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p></div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="section-title mb-4">Actions rapides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {actions.map(action => (
                action.disabled ? (
                  <div key={action.label} className="rounded-2xl p-5 bg-gray-100 cursor-not-allowed opacity-60">
                    <div className="flex items-center gap-3 mb-2"><span className="text-2xl">{action.icon}</span><h3 className="font-semibold text-gray-500 text-sm">{action.label}</h3></div>
                    <p className="text-xs text-gray-400">{action.desc}</p>
                    <p className="text-xs text-red-500 mt-1">Crédits insuffisants</p>
                  </div>
                ) : (
                  <Link key={action.label} to={action.to} className={`rounded-2xl p-5 transition-all shadow-sm ${action.color}`}>
                    <div className="flex items-center gap-3 mb-2"><span className="text-2xl">{action.icon}</span><h3 className="font-semibold text-sm">{action.label}</h3></div>
                    <p className="text-xs opacity-70">{action.desc}</p>
                  </Link>
                )
              ))}
            </div>
          </div>
          <div>
            <h2 className="section-title mb-4">Mon couple</h2>
            <UserCard user={user} partner={partner} showCredits />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
