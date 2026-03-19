import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { ROUTES } from '../../constants/routes.js';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';
import Button from '../../components/common/Button.jsx';
import Modal from '../../components/common/Modal.jsx';
import { userApi } from '../../services/user.api.js';
import { formatDate, getInitials } from '../../utils/formatters.js';
import toast from 'react-hot-toast';
const FIELD_LABELS = { nom: 'Nom', prenom: 'Prénom', age: 'Age', pays: 'Pays', ville: 'Ville', quartier: 'Quartier', religion: 'Religion', niveauEtude: "Niveau d'étude", profession: 'Profession', nomMere: 'Nom de la mère', nomPere: 'Nom du père', nomAine: "Nom de l'aîné", nomBenjamin: 'Nom du benjamin', email: 'Email' };
export default function ProfilePage() {
  const { user, updateUser, loadUser } = useAuth();
  const [pwdModal, setPwdModal] = useState(false);
  const [loadingPwd, setLoadingPwd] = useState(false);
  const [pwdData, setPwdData] = useState({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (pwdData.newPassword !== pwdData.confirmNewPassword) { toast.error('Les mots de passe ne correspondent pas'); return; }
    setLoadingPwd(true);
    try { await userApi.changePassword({ currentPassword: pwdData.currentPassword, newPassword: pwdData.newPassword }); toast.success('Mot de passe modifié'); setPwdModal(false); setPwdData({ currentPassword: '', newPassword: '', confirmNewPassword: '' }); }
    catch (e) { toast.error(e.message); }
    finally { setLoadingPwd(false); }
  };
  const fields = Object.entries(FIELD_LABELS).filter(([k]) => k !== 'email');
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div><h1 className="text-2xl font-bold text-gray-900">Mon profil</h1><p className="text-gray-500 text-sm mt-1">Vos informations personnelles</p></div>
          <Link to={ROUTES.EDIT_PROFILE}><Button variant="secondary">✏️ Modifier</Button></Link>
        </div>
        <div className="card mb-6">
          <div className="flex items-center gap-5">
            {user?.photo ? <img src={user.photo} alt="" className="w-20 h-20 rounded-2xl object-cover shadow-md" /> : <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-primary-700 font-bold text-2xl shadow-md">{getInitials(user?.nom, user?.prenom)}</div>}
            <div>
              <h2 className="text-xl font-bold text-gray-900">{user?.prenom} {user?.nom}</h2>
              <p className="text-gray-500 text-sm">{user?.email}</p>
              <p className="text-gray-400 text-xs mt-1">Membre depuis {formatDate(user?.createdAt)}</p>
            </div>
          </div>
        </div>
        <div className="card mb-6">
          <h3 className="font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-100">Informations personnelles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map(([key, label]) => (
              <div key={key} className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">{label}</p>
                <p className="text-sm font-medium text-gray-800">{user?.[key] || '—'}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3 className="font-semibold text-gray-900 mb-4">Sécurité</h3>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div><p className="text-sm font-medium text-gray-700">Mot de passe</p><p className="text-xs text-gray-400">Dernière modification inconnue</p></div>
            <Button variant="secondary" size="sm" onClick={() => setPwdModal(true)}>Modifier</Button>
          </div>
        </div>
        <Modal isOpen={pwdModal} onClose={() => setPwdModal(false)} title="Modifier le mot de passe">
          <form onSubmit={handlePasswordChange} className="space-y-4">
            {[['currentPassword','Mot de passe actuel'],['newPassword','Nouveau mot de passe'],['confirmNewPassword','Confirmer le nouveau']].map(([k,l]) => (
              <div key={k}><label className="label">{l}</label><input type="password" value={pwdData[k]} onChange={e => setPwdData(p => ({...p,[k]:e.target.value}))} placeholder="••••••••" className="input" required /></div>
            ))}
            <div className="flex gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => setPwdModal(false)} className="flex-1">Annuler</Button>
              <Button type="submit" loading={loadingPwd} className="flex-1">Enregistrer</Button>
            </div>
          </form>
        </Modal>
      </main>
      <Footer />
    </div>
  );
}
