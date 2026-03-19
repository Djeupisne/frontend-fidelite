import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';
import Spinner from '../../components/common/Spinner.jsx';
import Badge from '../../components/common/Badge.jsx';
import Button from '../../components/common/Button.jsx';
import { searchApi } from '../../services/search.api.js';
import { formatRelative } from '../../utils/formatters.js';
import { ROUTES } from '../../constants/routes.js';
import { SEARCH_TYPES } from '../../constants/plans.js';
import toast from 'react-hot-toast';
const typeLabels = { [SEARCH_TYPES.PHOTO]: { label: 'Photo', color: 'info' }, [SEARCH_TYPES.CHAMPS]: { label: 'Champs', color: 'warning' }, [SEARCH_TYPES.TOUS]: { label: 'Complet', color: 'danger' } };
export default function HistoryPage() {
  const navigate = useNavigate();
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const LIMIT = 10;
  useEffect(() => {
    searchApi.getHistory(page, LIMIT).then(r => { setSearches(r.data.searches || []); setTotal(r.data.total || 0); }).catch(e => toast.error(e.message)).finally(() => setLoading(false));
  }, [page]);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div><h1 className="text-2xl font-bold text-gray-900">Historique</h1><p className="text-gray-500 text-sm mt-1">{total} vérification(s) effectuée(s)</p></div>
          <Link to={ROUTES.SEARCH}><Button size="sm">+ Nouvelle</Button></Link>
        </div>
        {loading ? (
          <div className="flex justify-center py-20"><Spinner size="lg" /></div>
        ) : searches.length === 0 ? (
          <div className="card text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-semibold text-gray-700 mb-2">Aucune vérification effectuée</h3>
            <p className="text-sm text-gray-400 mb-6">Votre historique apparaîtra ici après votre première vérification</p>
            <Link to={ROUTES.SEARCH}><Button>Commencer une vérification</Button></Link>
          </div>
        ) : (
          <div className="space-y-3">
            {searches.map(s => (
              <div key={s._id} className="card hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(ROUTES.SEARCH_RESULTS, { state: { results: s, type: s.typeRecherche, niveau: s.niveau } })}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                    {s.partner?.photo ? <img src={s.partner.photo} alt="" className="w-full h-full rounded-xl object-cover" /> : <span className="text-xl">💑</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-gray-900 text-sm">{s.partner?.prenom} {s.partner?.nom}</p>
                      <Badge variant={typeLabels[s.typeRecherche]?.color || 'gray'}>{typeLabels[s.typeRecherche]?.label || s.typeRecherche}</Badge>
                      {s.typeRecherche === SEARCH_TYPES.CHAMPS && <Badge variant="gray">Niv. {s.niveau}</Badge>}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{formatRelative(s.createdAt)}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={`text-lg font-bold ${s.nbResultats > 0 ? 'text-red-500' : 'text-green-500'}`}>{s.nbResultats}</span>
                    <p className="text-xs text-gray-400">résultat(s)</p>
                  </div>
                </div>
              </div>
            ))}
            {total > LIMIT && (
              <div className="flex justify-center gap-3 pt-4">
                <Button variant="secondary" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Précédent</Button>
                <span className="text-sm text-gray-500 self-center">Page {page} / {Math.ceil(total / LIMIT)}</span>
                <Button variant="secondary" size="sm" disabled={page >= Math.ceil(total / LIMIT)} onClick={() => setPage(p => p + 1)}>Suivant →</Button>
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
