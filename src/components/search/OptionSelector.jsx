import React from 'react';
import { MATCH_LEVELS, SEARCH_TYPES } from '../../constants/plans.js';
export default function OptionSelector({ type, niveau, onTypeChange, onNiveauChange }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="label">Type de vérification</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
          {[{ value: SEARCH_TYPES.PHOTO, label: 'Par photo', icon: '📸', desc: 'Photo identique' }, { value: SEARCH_TYPES.CHAMPS, label: 'Par informations', icon: '📋', desc: 'Champs communs' }, { value: SEARCH_TYPES.TOUS, label: 'Tout vérifier', icon: '🔍', desc: 'Toutes les infos' }].map(opt => (
            <button key={opt.value} type="button" onClick={() => onTypeChange(opt.value)} className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center ${type === opt.value ? 'border-primary-500 bg-primary-50 shadow-md' : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'}`}>
              <span className="text-2xl">{opt.icon}</span>
              <span className="font-medium text-sm text-gray-900">{opt.label}</span>
              <span className="text-xs text-gray-500">{opt.desc}</span>
            </button>
          ))}
        </div>
      </div>
      {type === SEARCH_TYPES.CHAMPS && (
        <div>
          <label className="label">Niveau de correspondance minimum</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
            {MATCH_LEVELS.map(lvl => (
              <button key={lvl.niveau} type="button" onClick={() => onNiveauChange(lvl.niveau)} className={`p-3 rounded-xl border-2 transition-all text-center ${niveau === lvl.niveau ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'}`}>
                <span className="block font-bold text-lg text-primary-600">{lvl.niveau}</span>
                <span className="text-xs text-gray-600">{lvl.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
