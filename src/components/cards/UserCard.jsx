import React, { useState } from 'react';
import { getInitials, formatDate } from '../../utils/formatters.js';
import Badge from '../common/Badge.jsx';
const Avatar = ({ photo, nom, prenom, size = 'lg' }) => {
  const [imgError, setImgError] = useState(false);
  const sizeClass = size === 'lg' ? 'w-16 h-16 text-xl' : 'w-8 h-8 text-xs';
  const hasPhoto = photo && photo !== '' && !imgError;
  if (hasPhoto) return <img src={photo} alt={`${prenom} ${nom}`} className={`${sizeClass} rounded-2xl object-cover flex-shrink-0`} onError={() => setImgError(true)} />;
  return <div className={`${sizeClass} rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-primary-700 font-bold flex-shrink-0`}>{getInitials(nom, prenom)}</div>;
};
const PartnerAvatar = ({ photo, nom, prenom }) => {
  const [imgError, setImgError] = useState(false);
  const hasPhoto = photo && photo !== '' && !imgError;
  if (hasPhoto) return <img src={photo} alt={`${prenom} ${nom}`} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" onError={() => setImgError(true)} />;
  return <div className="w-8 h-8 rounded-lg bg-secondary-100 flex items-center justify-center text-secondary-700 text-xs font-bold flex-shrink-0">{getInitials(nom, prenom)}</div>;
};
export default function UserCard({ user, partner, showCredits = false }) {
  return (
    <div className="card">
      <div className="flex items-center gap-4">
        <Avatar photo={user?.photo} nom={user?.nom} prenom={user?.prenom} size="lg" />
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 text-lg">{user?.prenom} {user?.nom}</h3>
          <p className="text-sm text-gray-500">{user?.ville}, {user?.pays}</p>
          {showCredits && (
            <div className="mt-1 flex items-center gap-2">
              <Badge variant={user?.searchCredits > 0 ? 'success' : 'danger'}>{user?.searchCredits || 0} crédit(s)</Badge>
            </div>
          )}
        </div>
      </div>
      {partner && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
          <div className="text-gray-400 text-xs font-medium uppercase tracking-wide flex-shrink-0">Partenaire</div>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <PartnerAvatar photo={partner?.photo} nom={partner?.nom} prenom={partner?.prenom} />
            <span className="text-sm font-medium text-gray-700 truncate">{partner?.prenom} {partner?.nom}</span>
          </div>
        </div>
      )}
    </div>
  );
}
