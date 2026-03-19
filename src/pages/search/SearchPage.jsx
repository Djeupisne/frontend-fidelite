import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { ROUTES } from '../../constants/routes.js';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';
import Button from '../../components/common/Button.jsx';
import OptionSelector from '../../components/search/OptionSelector.jsx';
import { searchApi } from '../../services/search.api.js';
import { SEARCH_TYPES } from '../../constants/plans.js';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
export default function SearchPage() {
  const { user, partner, loadUser } = useAuth();
  const navigate = useNavigate();
  const [type, setType] = useState(SEARCH_TYPES.CHAMPS);
  const [niveau, setNiveau] = useState(2);
  const [loading, setLoading] = useState(false);
  const credits = user?.searchCredits || 0;
  const handleSearch = async () => {
    if (!partner) { toast.error('Vous devez d\'abord ajouter votre partenaire'); return; }
    if (credits <= 0) { toast.error('Vous n\'avez pas de crédits. Achetez un plan.'); navigate(ROUTES.PLANS); return; }
    setLoading(true);
    try {
      const res = await searchApi.runSearch({ partnerId: partner._id, typeRecherche: type, niveau: type === SEARCH_TYPES.CHAMPS ? niveau : undefined });
      await loadUser();
      navigate(ROUTES.SEARCH_RESULTS, { state: { results: res.data, type, niveau } });
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Crédits insuffisants</h3>
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
              <div className="h-2 bg-gray-100 rounded-full"><div className="h-full bg-primary-500 rounded-full" style={{ width: `${Math.min((credits / 10) * 100, 100)}%` }} /></div>
              <p className="text-xs text-gray-400 mt-2">1 crédit sera débité par vérification</p>
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
                  {partner.photo ? <img src={partner.photo} alt="" className="w-10 h-10 rounded-lg object-cover" /> : <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center text-primary-700 text-sm font-bold">{(partner.prenom||'?').charAt(0)}</div>}
                  <div><p className="font-medium text-gray-900 text-sm">{partner.prenom} {partner.nom}</p><p className="text-xs text-gray-500">{partner.ville}, {partner.pays}</p></div>
                </div>
              </div>
            )}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-5">Options de vérification</h3>
              <OptionSelector type={type} niveau={niveau} onTypeChange={setType} onNiveauChange={setNiveau} />
            </div>
            <Button onClick={handleSearch} loading={loading} disabled={!partner} className="w-full" size="lg">
              🔍 Lancer la vérification — 1 crédit
            </Button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
