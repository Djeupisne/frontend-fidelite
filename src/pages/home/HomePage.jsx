import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { ROUTES } from '../../constants/routes.js';

const features = [
  {
    icon: '🎯',
    title: 'Fidélité récompensée',
    description: 'Cumulez des points à chaque achat chez nos partenaires et échangez-les contre des avantages exclusifs.',
  },
  {
    icon: '🤝',
    title: 'Réseau de partenaires',
    description: 'Accédez à un réseau grandissant de commerçants et prestataires partenaires partout au Togo.',
  },
  {
    icon: '🔍',
    title: 'Vérification instantanée',
    description: 'Vérifiez en un instant le statut et les points de vos clients grâce à notre outil de recherche rapide.',
  },
  {
    icon: '📊',
    title: 'Tableau de bord clair',
    description: 'Suivez vos performances, votre historique et vos statistiques depuis un espace centralisé.',
  },
];

const stats = [
  { value: '10 000+', label: 'Membres actifs' },
  { value: '200+', label: 'Partenaires' },
  { value: '1M+', label: 'Points distribués' },
];

export default function HomePage() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-sm shadow-primary-200">
              <span className="text-white text-sm font-bold">MF</span>
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">Monde Fidélité</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to={ROUTES.LOGIN}
              className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors px-3 py-2 rounded-lg hover:bg-primary-50"
            >
              Se connecter
            </Link>
            <Link
              to={ROUTES.REGISTER}
              className="text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors px-4 py-2 rounded-xl shadow-sm shadow-primary-200"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100 rounded-full opacity-40 blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary-100 rounded-full opacity-30 blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
            Programme de fidélité nouvelle génération
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
            Fidélisez vos clients,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700">
              développez votre business
            </span>
          </h1>

          <p className="text-gray-500 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Monde Fidélité est la plateforme qui connecte commerçants et clients à travers un système de points unifié, simple et puissant.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to={ROUTES.REGISTER}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-primary-500 to-primary-700 text-white font-semibold px-8 py-3.5 rounded-2xl shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300 hover:-translate-y-0.5 transition-all text-base"
            >
              Démarrer gratuitement
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              to={ROUTES.LOGIN}
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold px-8 py-3.5 rounded-2xl border border-gray-200 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700 transition-all text-base"
            >
              Déjà membre ? Se connecter
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative max-w-3xl mx-auto mt-20">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-100 px-6 py-6 grid grid-cols-3 divide-x divide-gray-100">
            {stats.map((s) => (
              <div key={s.label} className="text-center px-4">
                <p className="text-2xl sm:text-3xl font-extrabold text-primary-600">{s.value}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Tout ce dont vous avez besoin</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Une solution complète pour gérer la fidélité de vos clients, de A à Z.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <div className="w-11 h-11 bg-primary-50 rounded-xl flex items-center justify-center text-xl mb-4 group-hover:bg-primary-100 transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-10 text-center shadow-2xl shadow-primary-200 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div className="relative">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <span className="text-white text-xl font-bold">MF</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Prêt à rejoindre Monde Fidélité ?</h2>
              <p className="text-primary-100 mb-8 max-w-md mx-auto">
                Créez votre compte gratuitement et commencez à récompenser vos clients dès aujourd'hui.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to={ROUTES.REGISTER}
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary-700 font-semibold px-8 py-3 rounded-xl hover:bg-primary-50 transition-colors shadow-lg"
                >
                  Créer un compte
                </Link>
                <Link
                  to={ROUTES.LOGIN}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 font-semibold px-8 py-3 rounded-xl hover:bg-white/20 transition-colors"
                >
                  Se connecter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-gray-100 py-8 px-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Monde Fidélité. Tous droits réservés.
      </footer>
    </div>
  );
}
