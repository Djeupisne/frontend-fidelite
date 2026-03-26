import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { ROUTES } from '../../constants/routes.js';

const steps = [
  {
    number: '01',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    title: 'Créez votre profil',
    description:
      'Inscrivez-vous et renseignez les informations complètes de votre partenaire : nom, prénom, photo, ville, religion, famille et bien plus.',
  },
  {
    number: '02',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
    ),
    title: 'Lancez une vérification',
    description:
      "Choisissez votre niveau de recherche : par photo, par 2 à 10 critères identiques, ou une correspondance totale. Chaque option a son tarif.",
  },
  {
    number: '03',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4"/>
        <circle cx="12" cy="12" r="9"/>
      </svg>
    ),
    title: 'Obtenez la vérité',
    description:
      'La plateforme analyse notre base de données et vous affiche tous les profils correspondants avec leurs détails complets.',
  },
];

const plans = [
  { icon: '📸', label: 'Photo uniquement', desc: 'Recherche par similitude de photo', badge: null, accent: 'bg-violet-50 text-violet-600 border-violet-100' },
  { icon: '🔍', label: 'Partiel (2–5 critères)', desc: 'Correspondance sur 2 à 5 informations', badge: 'Populaire', accent: 'bg-blue-50 text-blue-600 border-blue-100' },
  { icon: '🧩', label: 'Approfondi (6–9)', desc: 'Correspondance sur 6 à 9 informations', badge: null, accent: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  { icon: '🛡️', label: 'Complet (tout)', desc: 'Toutes les informations identiques', badge: 'Précis', accent: 'bg-rose-50 text-rose-600 border-rose-100' },
];

const faqs = [
  { q: 'Mes informations sont-elles sécurisées ?', a: "Oui. Toutes vos données sont chiffrées et stockées de manière sécurisée. Seule une recherche payante et autorisée permet d'accéder aux résultats." },
  { q: 'Comment fonctionne la recherche par photo ?', a: "Notre algorithme compare les photos de profil enregistrées et vous affiche les profils dont la photo est similaire ou identique à celle que vous avez fournie." },
  { q: "Que se passe-t-il si mon partenaire est trouvé plusieurs fois ?", a: "Vous verrez tous les profils correspondants avec leurs détails complets, vous permettant de prendre vos propres décisions en toute connaissance de cause." },
  { q: 'La vérification est-elle anonyme pour mon partenaire ?', a: "Oui. La personne vérifiée ne reçoit aucune notification. La démarche reste entièrement confidentielle de votre côté." },
];

const infoFields = [
  { icon: '👤', text: 'Nom complet, prénom, âge' },
  { icon: '📍', text: 'Pays, ville, quartier' },
  { icon: '📸', text: 'Photo de profil' },
  { icon: '🕌', text: 'Religion' },
  { icon: '🎓', text: "Niveau d'études / profession" },
  { icon: '👨‍👩‍👧', text: 'Noms du père et de la mère' },
  { icon: '👶', text: "Nom de l'aîné et du benjamin" },
  { icon: '❤️', text: 'Détails de votre rencontre' },
];

export default function HomePage() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ─── NAVBAR ─── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to={ROUTES.HOME} className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-sm shadow-primary-200">
              <span className="text-white text-sm font-bold">MF</span>
            </div>
            <span className="font-bold text-gray-900 text-base tracking-tight">Monde Fidélité</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
            <a href="#comment-ca-marche" className="hover:text-gray-900 transition-colors">Comment ça marche</a>
            <a href="#options" className="hover:text-gray-900 transition-colors">Options</a>
            <a href="#faq" className="hover:text-gray-900 transition-colors">FAQ</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link to={ROUTES.LOGIN} className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-primary-50">
              Se connecter
            </Link>
            <Link to={ROUTES.REGISTER} className="text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-xl transition-colors shadow-sm shadow-primary-200">
              Commencer
            </Link>
          </div>

          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-3 text-sm shadow-lg">
            <a href="#comment-ca-marche" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-primary-600 py-2">Comment ça marche</a>
            <a href="#options" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-primary-600 py-2">Options</a>
            <a href="#faq" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:text-primary-600 py-2">FAQ</a>
            <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
              <Link to={ROUTES.LOGIN} className="text-center py-2.5 rounded-xl border border-gray-200 font-medium text-gray-700">Se connecter</Link>
              <Link to={ROUTES.REGISTER} className="text-center py-2.5 rounded-xl bg-primary-600 text-white font-semibold">Commencer gratuitement</Link>
            </div>
          </div>
        )}
      </header>

      {/* ─── HERO ─── */}
      <section className="relative pt-28 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary-50 opacity-60 blur-3xl" />
          <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full bg-rose-50 opacity-50 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-600 shadow-sm mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            La vérité sur la fidélité, accessible à tous
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-6">
            Découvrez la vérité{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700">
                sur votre partenaire
              </span>
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-primary-100 rounded -z-0 opacity-70" />
            </span>
          </h1>

          <p className="text-gray-500 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            Monde Fidélité est la plateforme qui vous permet de vérifier, en toute discrétion, 
            si votre partenaire apparaît dans notre base de données enregistré par d'autres personnes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Link
              to={ROUTES.REGISTER}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-br from-primary-500 to-primary-700 text-white font-semibold text-base px-8 py-3.5 rounded-2xl shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300 hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              Créer mon compte gratuit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link
              to={ROUTES.LOGIN}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-gray-600 font-medium text-base px-6 py-3.5 rounded-2xl border border-gray-200 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700 transition-all"
            >
              J'ai déjà un compte
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-gray-400">
            {[
              { icon: '🔒', text: 'Données sécurisées' },
              { icon: '🕵️', text: 'Recherche confidentielle' },
              { icon: '⚡', text: 'Résultats instantanés' },
            ].map((item) => (
              <span key={item.text} className="flex items-center gap-1.5">
                <span>{item.icon}</span>
                {item.text}
              </span>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative max-w-3xl mx-auto mt-16">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl shadow-gray-100 p-6 sm:p-8 grid grid-cols-3 divide-x divide-gray-100">
            {[
              { value: '50 000+', label: 'Profils enregistrés', color: 'text-primary-600' },
              { value: '98%', label: 'Taux de satisfaction', color: 'text-emerald-600' },
              { value: '< 10s', label: 'Temps de réponse', color: 'text-violet-600' },
            ].map((s) => (
              <div key={s.label} className="text-center px-2 sm:px-4">
                <p className={`text-xl sm:text-3xl font-extrabold ${s.color}`}>{s.value}</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMMENT ÇA MARCHE ─── */}
      <section id="comment-ca-marche" className="py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-500 mb-3 block">Processus</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Comment ça marche ?</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Trois étapes simples pour obtenir les réponses que vous cherchez.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 relative">
            {steps.map((step, i) => (
              <div key={step.number} className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
                {i < steps.length - 1 && (
                  <div className="hidden sm:block absolute top-10 -right-3 w-6 border-t-2 border-dashed border-gray-200 z-10" />
                )}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 transition-colors">
                    {step.icon}
                  </div>
                  <span className="text-5xl font-black text-gray-100 leading-none">{step.number}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INFOS COLLECTÉES ─── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary-500 mb-3 block">Ce que nous vérifions</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-5 leading-tight">
              Une fiche complète pour une vérification précise
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Lors de l'inscription, vous renseignez les informations détaillées de votre partenaire. 
              Plus les données sont précises, plus la vérification est fiable et les résultats pertinents.
            </p>
            <Link
              to={ROUTES.REGISTER}
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all text-sm"
            >
              Créer mon profil maintenant
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Informations collectées</p>
            <ul className="space-y-2.5">
              {infoFields.map((item) => (
                <li key={item.text} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="w-8 h-8 bg-white rounded-xl border border-gray-100 flex items-center justify-center text-base flex-shrink-0 shadow-sm">
                    {item.icon}
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── OPTIONS ─── */}
      <section id="options" className="py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-500 mb-3 block">Tarification</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Choisissez votre niveau de vérification</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Du simple contrôle photo à la vérification totale, chaque option est adaptée à vos besoins.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {plans.map((plan) => (
              <div key={plan.label} className="relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col">
                {plan.badge && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap">
                    {plan.badge}
                  </span>
                )}
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center text-xl mb-4 ${plan.accent}`}>
                  {plan.icon}
                </div>
                <p className="font-bold text-gray-900 text-sm mb-1">{plan.label}</p>
                <p className="text-xs text-gray-400 flex-1 leading-relaxed">{plan.desc}</p>
                <Link
                  to={ROUTES.REGISTER}
                  className="mt-5 w-full text-center text-xs font-semibold text-primary-600 border border-primary-100 bg-primary-50 hover:bg-primary-100 transition-colors py-2 rounded-xl"
                >
                  Choisir
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-400 mt-8">
            Tous les tarifs sont affichés sur votre tableau de bord après inscription.
          </p>
        </div>
      </section>

      {/* ─── ENGAGEMENTS ─── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-500 mb-3 block">Nos engagements</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Pourquoi nous faire confiance ?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: '🔒', title: 'Confidentialité totale', desc: 'Votre démarche reste secrète. La personne vérifiée ne reçoit aucune notification.' },
              { icon: '🛡️', title: 'Données protégées', desc: 'Toutes les informations sont chiffrées et stockées selon les standards de sécurité les plus élevés.' },
              { icon: '⚡', title: 'Résultats en temps réel', desc: 'Notre moteur analyse instantanément la base de données et retourne les correspondances en quelques secondes.' },
              { icon: '🎯', title: 'Précision configurable', desc: 'Vous contrôlez le niveau de précision de la recherche selon vos besoins et votre budget.' },
              { icon: '📱', title: 'Web & Mobile', desc: "Accédez à la plateforme depuis n'importe quel appareil, partout et à tout moment." },
              { icon: '🤝', title: 'Support disponible', desc: 'Notre équipe est là pour vous accompagner à chaque étape de votre démarche.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-5 rounded-2xl border border-gray-100 bg-white hover:shadow-md transition-all">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-500 mb-3 block">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Questions fréquentes</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between text-left px-6 py-5 gap-4"
                >
                  <span className="font-semibold text-gray-900 text-sm">{faq.q}</span>
                  <span className={`w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-45' : ''}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-10 sm:p-16 text-center overflow-hidden shadow-2xl shadow-primary-200">
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{ backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}
            />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-extrabold">MF</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
                La vérité vous appartient
              </h2>
              <p className="text-primary-200 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Inscrivez-vous gratuitement dès maintenant et découvrez ce que Monde Fidélité peut révéler pour vous.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to={ROUTES.REGISTER}
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary-700 font-bold px-8 py-4 rounded-2xl hover:bg-primary-50 transition-colors shadow-lg text-base"
                >
                  Créer mon compte gratuitement
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
                <Link
                  to={ROUTES.LOGIN}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 font-semibold px-8 py-4 rounded-2xl hover:bg-white/20 transition-colors text-base"
                >
                  Se connecter
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-gray-100 py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">MF</span>
            </div>
            <span className="text-sm font-bold text-gray-600">Monde Fidélité</span>
          </div>
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} Monde Fidélité. Tous droits réservés.</p>
          <div className="flex items-center gap-5 text-xs text-gray-400">
            <a href="#" className="hover:text-gray-600 transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Conditions d'utilisation</a>
            <Link to={ROUTES.LOGIN} className="hover:text-gray-600 transition-colors">Connexion</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
