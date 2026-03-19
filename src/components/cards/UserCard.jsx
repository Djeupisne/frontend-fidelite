import React from 'react';
import { getInitials, formatDate } from '../../utils/formatters.js';
import Badge from '../common/Badge.jsx';
export default function UserCard({ user, partner, showCredits = false }) {
  return (
    <div className="card">
      <div className="flex items-center gap-4">
        {user?.photo ? <img src={user.photo} alt="" className="w-16 h-16 rounded-2xl object-cover flex-shrink-0" /> : <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-primary-700 font-bold text-xl flex-shrink-0">{getInitials(user?.nom, user?.prenom)}</div>}
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 text-lg">{user?.prenom} {user?.nom}</h3>
          <p className="text-sm text-gray-500">{user?.ville}, {user?.pays}</p>
          {showCredits && <div className="mt-1 flex items-center gap-2"><Badge variant={user?.searchCredits > 0 ? 'success' : 'danger'}>{user?.searchCredits || 0} crédit(s)</Badge></div>}
        </div>
      </div>
      {partner && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
          <div className="text-gray-400 text-xs font-medium uppercase tracking-wide">Partenaire</div>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {partner?.photo ? <img src={partner.photo} alt="" className="w-8 h-8 rounded-lg object-cover flex-shrink-0" /> : <div className="w-8 h-8 rounded-lg bg-secondary-100 flex items-center justify-center text-secondary-700 text-xs font-bold flex-shrink-0">{getInitials(partner?.nom, partner?.prenom)}</div>}
            <span className="text-sm font-medium text-gray-700 truncate">{partner?.prenom} {partner?.nom}</span>
          </div>
        </div>
      )}
    </div>
  );
}
