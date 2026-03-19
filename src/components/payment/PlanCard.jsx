import React from 'react';
import { formatAmount } from '../../utils/formatters.js';
import Button from '../common/Button.jsx';
export default function PlanCard({ plan, onSelect, selected = false, loading = false }) {
  const isPopular = plan.code === 'LEVEL_5';
  return (
    <div className={`relative rounded-2xl border-2 p-6 transition-all duration-200 ${selected ? 'border-primary-500 bg-primary-50 shadow-lg shadow-primary-100' : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-md'}`}>
      {isPopular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-semibold px-4 py-1 rounded-full shadow">Populaire</div>}
      <div className="text-center mb-4">
        <h3 className="font-bold text-gray-900 text-lg">{plan.nom}</h3>
        <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
      </div>
      <div className="text-center mb-6">
        <span className="text-3xl font-bold text-primary-600">{formatAmount(plan.prix, plan.devise)}</span>
      </div>
      <ul className="space-y-2.5 mb-6">
        <li className="flex items-center gap-2 text-sm text-gray-700"><span className="text-green-500 font-bold">✓</span>{plan.nbRecherches} recherche(s)</li>
        {plan.inclutPhoto && <li className="flex items-center gap-2 text-sm text-gray-700"><span className="text-green-500 font-bold">✓</span>Recherche par photo</li>}
        {plan.inclutTous && <li className="flex items-center gap-2 text-sm text-gray-700"><span className="text-green-500 font-bold">✓</span>Toutes les informations</li>}
        {plan.niveauxAutorises?.length > 0 && <li className="flex items-center gap-2 text-sm text-gray-700"><span className="text-green-500 font-bold">✓</span>Jusqu'au niveau {Math.max(...plan.niveauxAutorises)}</li>}
        <li className="flex items-center gap-2 text-sm text-gray-700"><span className="text-green-500 font-bold">✓</span>Valable {plan.dureeJours} jours</li>
      </ul>
      <Button onClick={() => onSelect(plan)} loading={loading} variant={selected ? 'primary' : isPopular ? 'primary' : 'secondary'} className="w-full">
        {selected ? 'Sélectionné ✓' : 'Choisir ce plan'}
      </Button>
    </div>
  );
}
