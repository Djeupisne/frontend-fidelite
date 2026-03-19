import React from 'react';
import MatchCard from '../cards/MatchCard.jsx';
export default function ResultsList({ resultats = [], nbResultats = 0, loading = false }) {
  if (loading) return <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="card animate-pulse"><div className="flex gap-4"><div className="w-16 h-16 bg-gray-200 rounded-xl"/><div className="flex-1 space-y-2"><div className="h-4 bg-gray-200 rounded w-1/2"/><div className="h-3 bg-gray-200 rounded w-1/3"/></div></div></div>)}</div>;
  if (nbResultats === 0) return (
    <div className="card text-center py-12">
      <div className="text-5xl mb-4">✅</div>
      <h3 className="text-lg font-semibold text-green-700 mb-2">Aucun résultat trouvé</h3>
      <p className="text-sm text-gray-500">Votre partenaire n'apparaît dans aucun autre compte avec ces critères.</p>
    </div>
  );
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">{nbResultats} correspondance(s) trouvée(s)</h3>
        <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">⚠️ Attention</span>
      </div>
      <div className="space-y-4">
        {resultats.map((result, i) => <MatchCard key={result.partnerId || i} result={result} rank={i + 1} />)}
      </div>
    </div>
  );
}
