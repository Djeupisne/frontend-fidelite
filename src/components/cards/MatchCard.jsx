import React from 'react';
import { FIELD_LABELS } from '../../constants/plans.js';
import { getInitials } from '../../utils/formatters.js';
import Badge from '../common/Badge.jsx';
export default function MatchCard({ result, rank }) {
  const { partnerData, score, champsCommuns, userId } = result;
  const totalFields = 13;
  const pct = Math.round((score / totalFields) * 100);
  const variant = pct >= 80 ? 'danger' : pct >= 50 ? 'warning' : 'info';
  return (
    <div className="card border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="relative">
            {partnerData?.photo ? <img src={partnerData.photo} alt="" className="w-16 h-16 rounded-xl object-cover" /> : <div className="w-16 h-16 rounded-xl bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-lg">{getInitials(partnerData?.nom, partnerData?.prenom)}</div>}
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-primary-600 text-white rounded-full text-xs flex items-center justify-center font-bold">#{rank}</div>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h3 className="font-semibold text-gray-900">{partnerData?.prenom} {partnerData?.nom}</h3>
            <Badge variant={variant}>{score}/{totalFields} infos communes</Badge>
          </div>
          <p className="text-sm text-gray-500 mt-0.5">{partnerData?.ville}, {partnerData?.pays} — {partnerData?.age} ans</p>
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">Correspondance</span>
              <span className="text-xs font-medium text-gray-700">{pct}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all ${pct >= 80 ? 'bg-red-500' : pct >= 50 ? 'bg-yellow-500' : 'bg-blue-500'}`} style={{ width: `${pct}%` }} />
            </div>
          </div>
          {champsCommuns?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {champsCommuns.map(field => <span key={field} className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full border border-primary-100">{FIELD_LABELS[field] || field}</span>)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
