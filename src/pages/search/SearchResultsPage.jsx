import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.js';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';
import Button from '../../components/common/Button.jsx';
import ResultsList from '../../components/search/ResultsList.jsx';
import { SEARCH_TYPES, FIELD_LABELS } from '../../constants/plans.js';
export default function SearchResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, type, niveau } = location.state || {};
  if (!results) return <div className="min-h-screen flex items-center justify-center"><div className="text-center"><p className="text-gray-500 mb-4">Aucun résultat à afficher</p><Link to={ROUTES.SEARCH}><Button>Nouvelle vérification</Button></Link></div></div>;
  const { resultats = [], nbResultats = 0 } = results;
  const typeLabels = { [SEARCH_TYPES.PHOTO]: 'par photo', [SEARCH_TYPES.CHAMPS]: `au niveau ${niveau}`, [SEARCH_TYPES.TOUS]: 'complète' };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(ROUTES.SEARCH)} className="p-2 rounded-xl hover:bg-gray-200 transition-colors text-gray-600">←</button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Résultats de vérification</h1>
            <p className="text-gray-500 text-sm mt-1">Vérification {typeLabels[type]}</p>
          </div>
        </div>
        <div className={`card mb-6 border-2 ${nbResultats === 0 ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
          <div className="flex items-center gap-4">
            <span className="text-4xl">{nbResultats === 0 ? '✅' : '⚠️'}</span>
            <div>
              <h2 className={`text-lg font-bold ${nbResultats === 0 ? 'text-green-800' : 'text-red-800'}`}>{nbResultats === 0 ? 'Aucune correspondance trouvée' : `${nbResultats} correspondance(s) détectée(s)`}</h2>
              <p className={`text-sm ${nbResultats === 0 ? 'text-green-600' : 'text-red-600'}`}>{nbResultats === 0 ? 'Votre partenaire n\'est pas enregistré dans d\'autres comptes avec ces critères.' : 'Votre partenaire apparaît dans d\'autres comptes. Vérifiez les détails ci-dessous.'}</p>
            </div>
          </div>
        </div>
        {type === SEARCH_TYPES.CHAMPS && niveau && (
          <div className="card mb-6 bg-blue-50 border border-blue-100">
            <p className="text-sm text-blue-700"><span className="font-semibold">Critère recherché :</span> Partenaires ayant au moins <span className="font-bold">{niveau}</span> information(s) identique(s) avec votre partenaire.</p>
          </div>
        )}
        <ResultsList resultats={resultats} nbResultats={nbResultats} />
        <div className="flex gap-3 mt-8">
          <Link to={ROUTES.SEARCH} className="flex-1"><Button variant="secondary" className="w-full">Nouvelle vérification</Button></Link>
          <Link to={ROUTES.HISTORY} className="flex-1"><Button variant="secondary" className="w-full">Voir l'historique</Button></Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
