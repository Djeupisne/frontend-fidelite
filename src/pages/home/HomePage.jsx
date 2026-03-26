import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { ROUTES } from '../../constants/routes.js';

/* ── Inject Google Fonts + global animations ── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

    .mf-page { font-family: 'DM Sans', sans-serif; background: #ffe4e1; color: #e8e4dc; }
    .mf-serif { font-family: 'Cormorant Garamond', serif; }

    @keyframes mf-fade-up {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes mf-fade-in {
      from { opacity: 0; } to { opacity: 1; }
    }
    @keyframes mf-line-grow {
      from { transform: scaleX(0); } to { transform: scaleX(1); }
    }
    @keyframes mf-float {
      0%,100% { transform: translateY(0px); }
      50%      { transform: translateY(-12px); }
    }
    @keyframes mf-pulse-glow {
      0%,100% { box-shadow: 0 0 20px 2px rgba(201,168,76,0.15); }
      50%      { box-shadow: 0 0 40px 8px rgba(201,168,76,0.30); }
    }
    @keyframes mf-grain {
      0%,100% { transform: translate(0,0); }
      10%  { transform: translate(-1%,-2%); }
      20%  { transform: translate(2%,1%); }
      30%  { transform: translate(-1%,3%); }
      40%  { transform: translate(1%,-1%); }
      50%  { transform: translate(-2%,2%); }
      60%  { transform: translate(2%,-3%); }
      70%  { transform: translate(-1%,1%); }
      80%  { transform: translate(1%,2%); }
      90%  { transform: translate(-2%,-1%); }
    }
    @keyframes mf-ticker {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    .mf-a1 { animation: mf-fade-up 0.8s cubic-bezier(.22,.68,0,1.2) both; }
    .mf-a2 { animation: mf-fade-up 0.8s cubic-bezier(.22,.68,0,1.2) 0.15s both; }
    .mf-a3 { animation: mf-fade-up 0.8s cubic-bezier(.22,.68,0,1.2) 0.30s both; }
    .mf-a4 { animation: mf-fade-up 0.8s cubic-bezier(.22,.68,0,1.2) 0.45s both; }
    .mf-a5 { animation: mf-fade-up 0.8s cubic-bezier(.22,.68,0,1.2) 0.60s both; }

    .mf-gold { color: #C9A84C; }
    .mf-gold-bg { background: #C9A84C; }
    .mf-btn-gold {
      background: #C9A84C;
      color: #06060e;
      font-weight: 600;
      letter-spacing: .03em;
      transition: all .25s ease;
      border: 1px solid #C9A84C;
    }
    .mf-btn-gold:hover {
      background: #e0bc6a;
      box-shadow: 0 8px 32px rgba(201,168,76,0.35);
      transform: translateY(-1px);
    }
    .mf-btn-outline {
      background: transparent;
      color: #e8e4dc;
      border: 1px solid rgba(232,228,220,0.25);
      font-weight: 500;
      letter-spacing: .03em;
      transition: all .25s ease;
    }
    .mf-btn-outline:hover {
      border-color: #C9A84C;
      color: #C9A84C;
      background: rgba(201,168,76,0.06);
    }

    .mf-card-hover {
      border: 1px solid rgba(255,255,255,0.07);
      background: rgba(255,255,255,0.03);
      transition: all .3s ease;
    }
    .mf-card-hover:hover {
      border-color: rgba(201,168,76,0.3);
      background: rgba(201,168,76,0.04);
      transform: translateY(-4px);
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    }

    .mf-step-num {
      font-family: 'Cormorant Garamond', serif;
      font-size: 7rem;
      font-weight: 300;
      line-height: 1;
      color: rgba(201,168,76,0.12);
      position: absolute;
      top: -1.5rem;
      left: -0.5rem;
      pointer-events: none;
      user-select: none;
    }

    .mf-divider {
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent);
    }

    .mf-noise::after {
      content: '';
      position: absolute;
      inset: 0;
      opacity: .025;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
      background-size: 200px 200px;
      animation: mf-grain 8s steps(1) infinite;
      pointer-events: none;
    }

    .mf-ticker-wrap {
      overflow: hidden;
      border-top: 1px solid rgba(201,168,76,0.15);
      border-bottom: 1px solid rgba(201,168,76,0.15);
      background: rgba(201,168,76,0.04);
    }
    .mf-ticker-track {
      display: flex;
      gap: 0;
      animation: mf-ticker 30s linear infinite;
      white-space: nowrap;
    }
    .mf-ticker-item {
      display: inline-flex;
      align-items: center;
      gap: 1.5rem;
      padding: 0 2.5rem;
      font-size: 0.7rem;
      font-weight: 500;
      letter-spacing: .15em;
      text-transform: uppercase;
      color: rgba(201,168,76,0.7);
    }
    .mf-ticker-dot {
      width: 3px; height: 3px;
      background: rgba(201,168,76,0.5);
      border-radius: 50%;
      flex-shrink: 0;
    }

    .mf-hero-line {
      transform-origin: left;
      animation: mf-line-grow 1.2s cubic-bezier(.16,1,.3,1) 0.8s both;
    }

    .mf-float { animation: mf-float 6s ease-in-out infinite; }
    .mf-float-2 { animation: mf-float 8s ease-in-out 1s infinite; }

    .mf-glow { animation: mf-pulse-glow 4s ease-in-out infinite; }

    .mf-section-label {
      font-size: 0.65rem;
      font-weight: 600;
      letter-spacing: .2em;
      text-transform: uppercase;
      color: #C9A84C;
    }

    .mf-plan-card {
      position: relative;
      border: 1px solid rgba(255,255,255,0.07);
      background: rgba(255,255,255,0.02);
      transition: all .35s cubic-bezier(.22,.68,0,1.2);
      overflow: hidden;
      cursor: pointer;
    }
    .mf-plan-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(201,168,76,0.08) 0%, transparent 60%);
      opacity: 0;
      transition: opacity .3s;
    }
    .mf-plan-card:hover::before { opacity: 1; }
    .mf-plan-card:hover {
      border-color: rgba(201,168,76,0.4);
      transform: translateY(-6px) scale(1.01);
      box-shadow: 0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.15);
    }
    .mf-plan-card.featured {
      border-color: rgba(201,168,76,0.35);
      background: rgba(201,168,76,0.05);
    }

    .mf-faq-item {
      border-bottom: 1px solid rgba(255,255,255,0.07);
      transition: background .2s;
    }
    .mf-faq-item:hover { background: rgba(255,255,255,0.02); }

    .mf-nav { backdrop-filter: blur(20px) saturate(180%); }

    .mf-hero-bg {
      background:
        radial-gradient(ellipse 80% 60% at 70% 20%, rgba(201,168,76,0.06) 0%, transparent 60%),
        radial-gradient(ellipse 60% 80% at 10% 80%, rgba(100,50,200,0.05) 0%, transparent 60%),
        #06060e;
    }

    .mf-cta-bg {
      background:
        radial-gradient(ellipse 60% 80% at 50% 100%, rgba(201,168,76,0.12) 0%, transparent 70%),
        radial-gradient(ellipse 80% 40% at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 60%),
        #0c0c16;
    }

    .mf-info-row {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: .75rem 0;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      transition: all .2s;
    }
    .mf-info-row:last-child { border-bottom: none; }
    .mf-info-row:hover { padding-left: .5rem; }
    .mf-info-icon {
      width: 36px; height: 36px;
      border-radius: 8px;
      background: rgba(201,168,76,0.1);
      border: 1px solid rgba(201,168,76,0.15);
      display: flex; align-items: center; justify-content: center;
      font-size: 1rem;
      flex-shrink: 0;
    }

    .mf-trust-item {
      padding: 1.75rem;
      border-radius: 16px;
      border: 1px solid rgba(255,255,255,0.06);
      background: rgba(255,255,255,0.02);
      transition: all .25s;
    }
    .mf-trust-item:hover {
      border-color: rgba(201,168,76,0.2);
      background: rgba(201,168,76,0.03);
    }

    @media (max-width: 768px) {
      .mf-step-num { font-size: 5rem; }
    }
  `}</style>
);

/* ── Data ── */
const tickerItems = [
  '50 000+ profils',
  'Recherche confidentielle',
  'Résultats instantanés',
  'Données chiffrées',
  'Web & Mobile',
  'Support 24/7',
  '50 000+ profils',
  'Recherche confidentielle',
  'Résultats instantanés',
  'Données chiffrées',
  'Web & Mobile',
  'Support 24/7',
];

const steps = [
  {
    n: '1',
    title: 'Inscrivez-vous\net créez votre profil',
    body: 'Renseignez les informations complètes de votre partenaire — identité, famille, photo, ville, religion — et celles de votre rencontre.',
    tag: 'Inscription',
  },
  {
    n: '2',
    title: 'Choisissez\nvotre vérification',
    body: 'Sélectionnez le niveau de correspondance souhaité : photo seule, 2 à 10 critères identiques, ou vérification totale. Chaque option est tarifée.',
    tag: 'Recherche',
  },
  {
    n: '3',
    title: 'Recevez\nla vérité',
    body: 'Notre moteur analyse la base de données et affiche chaque profil correspondant avec tous ses détails enregistrés — sans rien cacher.',
    tag: 'Résultat',
  },
];

const infoFields = [
  { icon: '👤', text: 'Nom complet & prénom', sub: 'Identité principale' },
  { icon: '🎂', text: 'Âge', sub: 'Date ou année de naissance' },
  { icon: '📍', text: 'Pays, ville, quartier', sub: 'Localisation précise' },
  { icon: '📸', text: 'Photo de profil', sub: 'Reconnaissance visuelle' },
  { icon: '🕌', text: 'Religion', sub: 'Appartenance confessionnelle' },
  { icon: '🎓', text: 'Niveau d\'études / profession', sub: 'Parcours & activité' },
  { icon: '👨‍👩‍👧', text: 'Noms du père et de la mère', sub: 'Filiation parentale' },
  { icon: '👶', text: 'Aîné & benjamin de la famille', sub: 'Fratrie' },
  { icon: '❤️', text: 'Détails de votre rencontre', sub: 'Contexte relationnel' },
];

const plans = [
  { icon: '📸', label: 'Photo', sub: 'Recherche par similitude de photo uniquement', num: '01' },
  { icon: '🔍', label: 'Partiel', sub: '2 à 5 informations identiques', num: '02', featured: true },
  { icon: '🧩', label: 'Approfondi', sub: '6 à 9 informations identiques', num: '03' },
  { icon: '🛡️', label: 'Complet', sub: 'Toutes les informations identiques', num: '04' },
];

const faqs = [
  { q: 'Mes informations sont-elles sécurisées ?', a: "Oui. Toutes vos données sont chiffrées et hébergées sur des serveurs sécurisés. Aucun accès n'est possible sans une recherche payante et autorisée." },
  { q: 'La personne vérifiée sera-t-elle notifiée ?', a: "Non. La démarche est entièrement silencieuse et confidentielle. La personne concernée ne reçoit aucune alerte ni notification." },
  { q: 'Comment fonctionne la recherche par photo ?', a: "Notre algorithme analyse et compare les photos de profil de la base de données pour vous retourner les profils visuellement similaires ou identiques." },
  { q: 'Que se passe-t-il si plusieurs profils correspondent ?', a: "Vous visualisez l'intégralité des profils correspondants avec tous leurs détails enregistrés, vous permettant de décider en toute connaissance de cause." },
];

/* ── Component ── */
export default function HomePage() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!loading && isAuthenticated) navigate(ROUTES.DASHBOARD, { replace: true });
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#06060e' }}>
      <div style={{ width: 32, height: 32, border: '2px solid rgba(201,168,76,0.3)', borderTopColor: '#C9A84C', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    </div>
  );

  return (
    <div className="mf-page" style={{ minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      <GlobalStyles />

      {/* ─── NAVBAR ─── */}
      <header className="mf-nav" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(6,6,14,0.92)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.12)' : '1px solid transparent',
        transition: 'all .4s ease',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to={ROUTES.HOME} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #C9A84C, #a07828)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(201,168,76,0.3)',
            }}>
              <span style={{ color: '#06060e', fontSize: '0.8rem', fontWeight: 700, fontFamily: 'DM Sans, sans-serif' }}>MF</span>
            </div>
            <span className="mf-serif" style={{ color: '#e8e4dc', fontSize: '1.15rem', fontWeight: 600, letterSpacing: '.02em' }}>
              Monde Fidélité
            </span>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: 'none', alignItems: 'center', gap: '2.5rem', fontWeight: 400, fontSize: '0.85rem', letterSpacing: '.04em' }} className="md-nav">
            <style>{`.md-nav { display: none !important; } @media(min-width:768px){ .md-nav { display: flex !important; } .mf-mobile-cta { display: none !important; } }`}</style>
            {[['#processus', 'Processus'], ['#options', 'Options'], ['#faq', 'FAQ']].map(([href, label]) => (
              <a key={label} href={href} style={{ color: 'rgba(232,228,220,0.6)', textDecoration: 'none', transition: 'color .2s', letterSpacing: '.06em', textTransform: 'uppercase', fontSize: '0.7rem' }}
                onMouseEnter={e => e.target.style.color = '#C9A84C'}
                onMouseLeave={e => e.target.style.color = 'rgba(232,228,220,0.6)'}>
                {label}
              </a>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link to={ROUTES.LOGIN} style={{ color: 'rgba(232,228,220,0.7)', fontSize: '0.82rem', fontWeight: 500, textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: 8, transition: 'color .2s' }}
              onMouseEnter={e => e.target.style.color = '#C9A84C'}
              onMouseLeave={e => e.target.style.color = 'rgba(232,228,220,0.7)'}>
              Connexion
            </Link>
            <Link to={ROUTES.REGISTER} className="mf-btn-gold" style={{ fontSize: '0.82rem', padding: '0.55rem 1.25rem', borderRadius: 10, textDecoration: 'none', display: 'inline-block' }}>
              Commencer →
            </Link>
          </div>
        </div>
      </header>

      {/* ─── TICKER ─── */}
      <div className="mf-ticker-wrap" style={{ position: 'relative', zIndex: 10, marginTop: 68 }}>
        <div style={{ padding: '0.6rem 0', overflow: 'hidden' }}>
          <div className="mf-ticker-track">
            {tickerItems.map((item, i) => (
              <span key={i} className="mf-ticker-item">
                <span className="mf-ticker-dot" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── HERO ─── */}
      <section className="mf-hero-bg mf-noise" style={{ position: 'relative', padding: '7rem 1.5rem 5rem', overflow: 'hidden' }}>
        {/* Decorative orbs */}
        <div style={{ position: 'absolute', top: '10%', right: '-5%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '5%', left: '-8%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(120,80,220,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Vertical line accent */}
        <div style={{ position: 'absolute', top: 0, left: '50%', width: 1, height: '100%', background: 'linear-gradient(180deg, transparent, rgba(201,168,76,0.15), transparent)', pointerEvents: 'none' }} className="hidden-mobile" />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'center' }}>

            {/* Left: Text */}
            <div style={{ maxWidth: 760 }}>
              <div className="mf-a1" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: 40, height: 1, background: '#C9A84C' }} />
                <span className="mf-section-label">Intelligence relationnelle</span>
              </div>

              <h1 className="mf-serif mf-a2" style={{
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: '-.01em',
                marginBottom: '1.5rem',
                color: '#e8e4dc',
              }}>
                La vérité sur<br />
                <em style={{ fontStyle: 'italic', color: '#C9A84C' }}>la fidélité</em><br />
                de votre partenaire
              </h1>

              <div className="mf-hero-line" style={{ height: 1, background: 'linear-gradient(90deg, #C9A84C, transparent)', marginBottom: '1.75rem', maxWidth: 400 }} />

              <p className="mf-a3" style={{ fontSize: '1.05rem', fontWeight: 300, lineHeight: 1.8, color: 'rgba(232,228,220,0.65)', maxWidth: 520, marginBottom: '2.5rem' }}>
                Vérifiez discrètement si votre partenaire est enregistré dans notre base de données par d'autres personnes. Choisissez votre niveau de précision, obtenez la vérité.
              </p>

              <div className="mf-a4" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '3rem' }}>
                <Link to={ROUTES.REGISTER} className="mf-btn-gold" style={{ padding: '0.9rem 2rem', borderRadius: 12, textDecoration: 'none', fontSize: '0.88rem' }}>
                  Créer mon compte gratuitement
                </Link>
                <Link to={ROUTES.LOGIN} className="mf-btn-outline" style={{ padding: '0.9rem 2rem', borderRadius: 12, textDecoration: 'none', fontSize: '0.88rem' }}>
                  Se connecter
                </Link>
              </div>

              {/* Trust row */}
              <div className="mf-a5" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                {[
                  ['🔒', 'Confidentiel'],
                  ['⚡', 'Instantané'],
                  ['🛡️', 'Sécurisé'],
                ].map(([icon, label]) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'rgba(232,228,220,0.45)', fontWeight: 500, letterSpacing: '.04em', textTransform: 'uppercase' }}>
                    <span style={{ fontSize: '1rem' }}>{icon}</span>
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Floating stat cards */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
              {[
                { val: '50 000+', lab: 'Profils enregistrés', delay: '0s' },
                { val: '98%', lab: 'Satisfaction', delay: '.4s' },
                { val: '< 10s', lab: 'Temps de réponse', delay: '.8s' },
              ].map((s) => (
                <div key={s.lab} className="mf-glow" style={{
                  padding: '1.5rem 2rem',
                  borderRadius: 16,
                  border: '1px solid rgba(201,168,76,0.2)',
                  background: 'rgba(201,168,76,0.04)',
                  minWidth: 140,
                  animationDelay: s.delay,
                }}>
                  <div className="mf-serif" style={{ fontSize: '2.2rem', fontWeight: 600, color: '#C9A84C', lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(232,228,220,0.45)', marginTop: '0.4rem', letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 500 }}>{s.lab}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── DIVIDER ─── */}
      <div className="mf-divider" />

      {/* ─── PROCESSUS ─── */}
      <section id="processus" style={{ padding: '6rem 1.5rem', background: '#06060e' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '4rem' }}>
            <div>
              <p className="mf-section-label" style={{ marginBottom: '0.75rem' }}>Comment ça marche</p>
              <h2 className="mf-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: '#e8e4dc', lineHeight: 1.1 }}>
                Trois étapes,<br /><em style={{ color: '#C9A84C', fontStyle: 'italic' }}>une vérité</em>
              </h2>
            </div>
            <Link to={ROUTES.REGISTER} className="mf-btn-outline" style={{ padding: '0.75rem 1.75rem', borderRadius: 10, textDecoration: 'none', fontSize: '0.82rem', flexShrink: 0 }}>
              Commencer maintenant →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {steps.map((step, i) => (
              <div key={i} className="mf-card-hover" style={{ borderRadius: 20, padding: '2.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
                <div className="mf-step-num">{step.n}</div>
                <div style={{
                  display: 'inline-block',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  letterSpacing: '.15em',
                  textTransform: 'uppercase',
                  color: '#C9A84C',
                  border: '1px solid rgba(201,168,76,0.25)',
                  padding: '0.3rem 0.85rem',
                  borderRadius: 20,
                  marginBottom: '1.5rem',
                  background: 'rgba(201,168,76,0.05)',
                }}>{step.tag}</div>
                <h3 className="mf-serif" style={{ fontSize: '1.55rem', fontWeight: 400, color: '#e8e4dc', lineHeight: 1.2, marginBottom: '1rem', whiteSpace: 'pre-line' }}>{step.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'rgba(232,228,220,0.55)', lineHeight: 1.75, fontWeight: 300 }}>{step.body}</p>
                {i < steps.length - 1 && (
                  <div style={{ position: 'absolute', bottom: -1, right: -1, width: 40, height: 40, borderLeft: '1px solid rgba(201,168,76,0.15)', borderTop: '1px solid rgba(201,168,76,0.15)', borderRadius: '0 0 0 8px' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mf-divider" />

      {/* ─── INFO COLLECTÉES ─── */}
      <section style={{ padding: '6rem 1.5rem', background: 'linear-gradient(180deg, #06060e 0%, #080812 100%)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>

          {/* Left */}
          <div style={{ position: 'sticky', top: 100 }}>
            <p className="mf-section-label" style={{ marginBottom: '0.75rem' }}>Ce que nous vérifions</p>
            <h2 className="mf-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: '#e8e4dc', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              Une fiche<br /><em style={{ color: '#C9A84C', fontStyle: 'italic' }}>détaillée</em><br />pour chaque personne
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'rgba(232,228,220,0.55)', lineHeight: 1.8, marginBottom: '2rem', fontWeight: 300 }}>
              Plus les informations renseignées sont précises, plus la vérification est fiable et les résultats parlants.
            </p>
            <div style={{ padding: '1.25rem 1.5rem', borderRadius: 14, border: '1px solid rgba(201,168,76,0.2)', background: 'rgba(201,168,76,0.04)', marginBottom: '2rem' }}>
              <p style={{ fontSize: '0.8rem', color: 'rgba(201,168,76,0.8)', fontWeight: 500, lineHeight: 1.6 }}>
                ⚡ Chaque champ renseigné augmente la précision de votre vérification
              </p>
            </div>
            <Link to={ROUTES.REGISTER} className="mf-btn-gold" style={{ padding: '0.9rem 2rem', borderRadius: 12, textDecoration: 'none', fontSize: '0.88rem', display: 'inline-block' }}>
              Créer mon profil →
            </Link>
          </div>

          {/* Right: fields list */}
          <div style={{ borderRadius: 20, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)', padding: '1.75rem 2rem' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(232,228,220,0.3)', marginBottom: '1rem' }}>
              Champs de vérification — {infoFields.length} critères
            </p>
            {infoFields.map((field, i) => (
              <div key={i} className="mf-info-row">
                <div className="mf-info-icon">{field.icon}</div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 500, color: '#e8e4dc' }}>{field.text}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(232,228,220,0.4)', marginTop: 2 }}>{field.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mf-divider" />

      {/* ─── OPTIONS ─── */}
      <section id="options" style={{ padding: '6rem 1.5rem', background: '#06060e' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="mf-section-label" style={{ marginBottom: '0.75rem' }}>Tarification</p>
            <h2 className="mf-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: '#e8e4dc', lineHeight: 1.1, marginBottom: '1rem' }}>
              Votre niveau de <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>vérification</em>
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'rgba(232,228,220,0.45)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
              Du contrôle visuel à la vérification exhaustive — choisissez selon vos besoins.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.25rem' }}>
            {plans.map((plan, i) => (
              <div key={i} className={`mf-plan-card ${plan.featured ? 'featured' : ''}`} style={{ borderRadius: 20, padding: '2rem 1.75rem' }}>
                {plan.featured && (
                  <div style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    background: '#C9A84C', color: '#06060e',
                    fontSize: '0.6rem', fontWeight: 700, letterSpacing: '.12em',
                    textTransform: 'uppercase', padding: '0.3rem 0.75rem', borderRadius: 20,
                  }}>Populaire</div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '2rem' }}>{plan.icon}</span>
                  <span className="mf-serif" style={{ fontSize: '0.7rem', color: 'rgba(232,228,220,0.2)', fontWeight: 300, letterSpacing: '.1em' }}>{plan.num}</span>
                </div>
                <h3 className="mf-serif" style={{ fontSize: '1.4rem', fontWeight: 400, color: '#e8e4dc', marginBottom: '0.75rem', lineHeight: 1.2 }}>{plan.label}</h3>
                <p style={{ fontSize: '0.82rem', color: 'rgba(232,228,220,0.45)', lineHeight: 1.65, marginBottom: '1.75rem', fontWeight: 300 }}>{plan.sub}</p>
                <Link to={ROUTES.REGISTER} style={{
                  display: 'block', textAlign: 'center', padding: '0.7rem',
                  borderRadius: 10, textDecoration: 'none',
                  fontSize: '0.78rem', fontWeight: 600, letterSpacing: '.04em',
                  border: plan.featured ? 'none' : '1px solid rgba(201,168,76,0.25)',
                  background: plan.featured ? '#C9A84C' : 'transparent',
                  color: plan.featured ? '#06060e' : 'rgba(201,168,76,0.8)',
                  transition: 'all .2s',
                }}>
                  Choisir →
                </Link>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'rgba(232,228,220,0.3)', marginTop: '2rem', letterSpacing: '.04em' }}>
            Les tarifs détaillés sont disponibles dans votre tableau de bord après inscription.
          </p>
        </div>
      </section>

      <div className="mf-divider" />

      {/* ─── ENGAGEMENTS ─── */}
      <section style={{ padding: '6rem 1.5rem', background: '#080810' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: '4rem' }}>
            <p className="mf-section-label" style={{ marginBottom: '0.75rem' }}>Nos engagements</p>
            <h2 className="mf-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: '#e8e4dc', lineHeight: 1.1 }}>
              Pourquoi nous <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>faire confiance</em>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {[
              { icon: '🔒', t: 'Confidentialité totale', d: 'La personne vérifiée ne reçoit aucune notification. Votre démarche reste entièrement secrète.' },
              { icon: '🛡️', t: 'Données chiffrées', d: 'Toutes vos informations sont chiffrées de bout en bout et hébergées sur des serveurs sécurisés.' },
              { icon: '⚡', t: 'Résultats en temps réel', d: 'Notre moteur analyse instantanément la base de données et retourne les correspondances en quelques secondes.' },
              { icon: '🎯', t: 'Précision configurable', d: 'De la photo seule à la vérification totale — vous contrôlez le niveau de précision de chaque recherche.' },
              { icon: '📱', t: 'Accessible partout', d: 'Plateforme optimisée pour tous les appareils — ordinateur, tablette, mobile.' },
              { icon: '🤝', t: 'Support dédié', d: "Notre équipe est disponible pour vous accompagner à chaque étape de votre démarche." },
            ].map((item, i) => (
              <div key={i} className="mf-trust-item">
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: 'rgba(201,168,76,0.08)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem', marginBottom: '1.25rem',
                }}>{item.icon}</div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#e8e4dc', marginBottom: '0.6rem' }}>{item.t}</h3>
                <p style={{ fontSize: '0.83rem', color: 'rgba(232,228,220,0.45)', lineHeight: 1.7, fontWeight: 300 }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mf-divider" />

      {/* ─── FAQ ─── */}
      <section id="faq" style={{ padding: '6rem 1.5rem', background: '#06060e' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p className="mf-section-label" style={{ marginBottom: '0.75rem' }}>FAQ</p>
            <h2 className="mf-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: '#e8e4dc', lineHeight: 1.1 }}>
              Questions <em style={{ color: '#C9A84C', fontStyle: 'italic' }}>fréquentes</em>
            </h2>
          </div>

          <div>
            {faqs.map((faq, i) => (
              <div key={i} className="mf-faq-item" style={{ padding: '1.5rem 0', cursor: 'pointer' }} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: 500, color: openFaq === i ? '#C9A84C' : '#e8e4dc', transition: 'color .2s' }}>{faq.q}</span>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    border: `1px solid ${openFaq === i ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.1)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    transform: openFaq === i ? 'rotate(45deg)' : 'none',
                    transition: 'all .25s',
                    color: openFaq === i ? '#C9A84C' : 'rgba(232,228,220,0.5)',
                    fontSize: '1.1rem', fontWeight: 300, lineHeight: 1,
                  }}>+</div>
                </div>
                {openFaq === i && (
                  <p style={{ marginTop: '1rem', fontSize: '0.88rem', color: 'rgba(232,228,220,0.55)', lineHeight: 1.8, fontWeight: 300 }}>{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mf-divider" />

      {/* ─── CTA FINAL ─── */}
      <section className="mf-cta-bg" style={{ padding: '7rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 600, borderRadius: '50%', border: '1px solid rgba(201,168,76,0.06)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, height: 400, borderRadius: '50%', border: '1px solid rgba(201,168,76,0.08)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 220, height: 220, borderRadius: '50%', border: '1px solid rgba(201,168,76,0.1)' }} />
        </div>

        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{
            width: 64, height: 64, borderRadius: 18,
            background: 'linear-gradient(135deg, #C9A84C, #a07828)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 2rem',
            boxShadow: '0 8px 32px rgba(201,168,76,0.35)',
          }}>
            <span className="mf-serif" style={{ color: '#06060e', fontSize: '1.3rem', fontWeight: 700 }}>MF</span>
          </div>

          <h2 className="mf-serif" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 300, color: '#e8e4dc', lineHeight: 1.1, marginBottom: '1.25rem' }}>
            La vérité<br /><em style={{ color: '#C9A84C', fontStyle: 'italic' }}>vous appartient</em>
          </h2>

          <p style={{ fontSize: '1rem', color: 'rgba(232,228,220,0.5)', lineHeight: 1.8, marginBottom: '2.5rem', fontWeight: 300 }}>
            Inscrivez-vous gratuitement et découvrez ce que Monde Fidélité peut révéler pour vous — en toute discrétion.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', justifyContent: 'center' }}>
            <Link to={ROUTES.REGISTER} className="mf-btn-gold" style={{ padding: '1rem 2.25rem', borderRadius: 14, textDecoration: 'none', fontSize: '0.92rem' }}>
              Créer mon compte gratuitement
            </Link>
            <Link to={ROUTES.LOGIN} className="mf-btn-outline" style={{ padding: '1rem 2.25rem', borderRadius: 14, textDecoration: 'none', fontSize: '0.92rem' }}>
              Se connecter
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ borderTop: '1px solid rgba(201,168,76,0.1)', padding: '2.5rem 1.5rem', background: '#06060e' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #C9A84C, #a07828)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#06060e', fontSize: '0.65rem', fontWeight: 700 }}>MF</span>
            </div>
            <span className="mf-serif" style={{ color: 'rgba(232,228,220,0.6)', fontSize: '0.95rem', fontWeight: 400 }}>Monde Fidélité</span>
          </div>

          <p style={{ fontSize: '0.75rem', color: 'rgba(232,228,220,0.25)', letterSpacing: '.04em' }}>
            © {new Date().getFullYear()} Monde Fidélité — Tous droits réservés
          </p>

          <div style={{ display: 'flex', gap: '2rem' }}>
            {['Confidentialité', 'Conditions', 'Contact'].map((l) => (
              <a key={l} href="#" style={{ fontSize: '0.75rem', color: 'rgba(232,228,220,0.3)', textDecoration: 'none', letterSpacing: '.04em', transition: 'color .2s' }}
                onMouseEnter={e => e.target.style.color = '#C9A84C'}
                onMouseLeave={e => e.target.style.color = 'rgba(232,228,220,0.3)'}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
