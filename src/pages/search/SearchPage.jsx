import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { ROUTES } from '../../constants/routes.js';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';
import Button from '../../components/common/Button.jsx';
import OptionSelector from '../../components/search/OptionSelector.jsx';
import { searchApi } from '../../services/search.api.js';
import { SEARCH_TYPES } from '../../constants/plans.js';
import toast from 'react-hot-toast';
const getCreditCost = (type, niveau) => {
  if (type === SEARCH_TYPES.PHOTO) return 5;
  if (type === SEARCH_TYPES.TOUS) return 13;
  return niveau || 1;
};
export default function SearchPage() {
  const { user, partner, loadUser } = useAuth();
  const navigate = useNavigate();
  const [type, setType] = useState(SEARCH_TYPES.CHAMPS);
  const [niveau, setNiveau] = useState(2);
  const [loading, setLoading] = useState(false);
  const credits = user?.searchCredits || 0;
  const creditCost = getCreditCost(type, niveau);
  const partnerHasPhoto = partner?.photo && partner.photo !== '';
  const canSearch = partner && (type !== SEARCH_TYPES.PHOTO || partnerHasPhoto) && credits >= creditCost;
  const handleSearch = async () => {
    if (!partner) { toast.error('Vous devez d\'abord ajouter votre partenaire'); return; }
    if (credits < creditCost) { toast.error(`Crédits insuffisants. Cette vérification coûte ${creditCost} crédit(s).`); navigate(ROUTES.PLANS); return; }
    if (type === SEARCH_TYPES.PHOTO && !partnerHasPhoto) { toast.error('Votre partenaire n\'a pas de photo. Ajoutez-en une d\'abord.'); return; }
    setLoading(true);
    try {
      const payload = { partnerId: partner._id, typeRecherche: type };
      if (type === SEARCH_TYPES.CHAMPS) payload.niveau = niveau;
      const res = await searchApi.runSearch(payload);
      await loadUser();
      navigate(ROUTES.SEARCH_RESULTS, { state: { results: res.data, type, niveau: type === SEARCH_TYPES.CHAMPS ? niveau : null } });
    } catch (e) { toast.error(e.message || 'Erreur lors de la vérification'); }
    finally { setLoading(false); }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Vérification de fidélité</h1>
          <p className="text-gray-500 text-sm mt-1">Choisissez vos critères de vérification</p>
        </div>
        {credits === 0 ? (
          <div className="card text-center py-10">
            <div className="text-5xl mb-4">⭐</div>
            <h3 className="font-semibold text-gray-900 mb-2">Crédits insuffisants</h3>
            <p className="text-gray-500 text-sm mb-6">Vous avez besoin de crédits pour effectuer une vérification</p>
            <Link to={ROUTES.PLANS}><Button>Acheter des crédits</Button></Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-gray-900">Crédits disponibles</h2>
                <span className="text-2xl font-bold text-primary-600">{credits}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full"><div className="h-full bg-primary-500 rounded-full transition-all" style={{ width: `${Math.min((credits / 50) * 100, 100)}%` }} /></div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-400">Coût de cette vérification</p>
                <span className={`text-sm font-bold ${credits >= creditCost ? 'text-primary-600' : 'text-red-500'}`}>{creditCost} crédit{creditCost > 1 ? 's' : ''}</span>
              </div>
            </div>
            {!partner ? (
              <div className="card text-center py-8">
                <div className="text-4xl mb-3">💑</div>
                <p className="font-medium text-gray-700 mb-3">Vous n'avez pas encore ajouté votre partenaire</p>
                <Link to={ROUTES.PARTNER}><Button variant="secondary" size="sm">Ajouter mon partenaire</Button></Link>
              </div>
            ) : (
              <div className="card">
                <h3 className="font-medium text-gray-700 mb-3 text-sm">Partenaire à vérifier</h3>
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                  {partnerHasPhoto ? (
                    <img src={partner.photo} alt="" className="w-10 h-10 rounded-lg object-cover" onError={e => e.target.style.display='none'} />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center text-primary-700 text-sm font-bold">{(partner.prenom||'?').charAt(0)}</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{partner.prenom} {partner.nom}</p>
                    <p className="text-xs text-gray-500">{partner.ville}, {partner.pays}</p>
                  </div>
                  {!partnerHasPhoto && <Link to={ROUTES.PARTNER} className="text-xs text-primary-600 hover:underline flex-shrink-0">+ Ajouter photo</Link>}
                </div>
              </div>
            )}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-2">Options de vérification</h3>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">📸 Par photo = <strong>5 crédits</strong></span>
                <span className="text-xs bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-100">📋 Par info = <strong>1 crédit / info</strong></span>
                <span className="text-xs bg-pink-50 text-pink-700 px-3 py-1 rounded-full border border-pink-100">🔍 Tout vérifier = <strong>13 crédits</strong></span>
              </div>
              <OptionSelector type={type} niveau={niveau} onTypeChange={setType} onNiveauChange={setNiveau} />
              {type === SEARCH_TYPES.PHOTO && !partnerHasPhoto && (
                <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-3">
                  <span className="text-amber-500 text-lg flex-shrink-0">⚠️</span>
                  <div><p className="text-sm font-medium text-amber-800">Photo requise</p><p className="text-xs text-amber-600 mt-0.5">Votre partenaire n'a pas de photo. <Link to={ROUTES.PARTNER} className="underline font-medium">Ajoutez-en une</Link>.</p></div>
                </div>
              )}
              {credits < creditCost && credits > 0 && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-3">
                  <span className="text-red-500 text-lg flex-shrink-0">❌</span>
                  <div><p className="text-sm font-medium text-red-800">Crédits insuffisants</p><p className="text-xs text-red-600 mt-0.5">Il vous faut <strong>{creditCost}</strong> crédits. Vous avez <strong>{credits}</strong>. <Link to={ROUTES.PLANS} className="underline font-medium">Acheter des crédits</Link>.</p></div>
                </div>
              )}
            </div>
            <Button onClick={handleSearch} loading={loading} disabled={!canSearch} className="w-full" size="lg">
              🔍 Lancer la vérification — {creditCost} crédit{creditCost > 1 ? 's' : ''}
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
