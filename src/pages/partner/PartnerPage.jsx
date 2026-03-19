import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';
import Button from '../../components/common/Button.jsx';
import PhotoUpload from '../../components/photo/PhotoUpload.jsx';
import { partnerApi } from '../../services/partner.api.js';
import { formatDate, getInitials } from '../../utils/formatters.js';
import toast from 'react-hot-toast';
const PAYS = ["Afghanistan","Afrique du Sud","Albanie","Algérie","Allemagne","Andorre","Angola","Antigua-et-Barbuda","Arabie Saoudite","Argentine","Arménie","Australie","Autriche","Azerbaïdjan","Bahamas","Bahreïn","Bangladesh","Barbade","Belgique","Belize","Bénin","Bhoutan","Biélorussie","Birmanie","Bolivie","Bosnie-Herzégovine","Botswana","Brésil","Brunei","Bulgarie","Burkina Faso","Burundi","Cabo Verde","Cambodge","Cameroun","Canada","Centrafrique","Chili","Chine","Chypre","Colombie","Comores","Congo","Corée du Nord","Corée du Sud","Costa Rica","Côte d'Ivoire","Croatie","Cuba","Danemark","Djibouti","Dominique","Égypte","Émirats Arabes Unis","Équateur","Érythrée","Espagne","Eswatini","Estonie","États-Unis","Éthiopie","Fidji","Finlande","France","Gabon","Gambie","Géorgie","Ghana","Grèce","Grenade","Guatemala","Guinée","Guinée-Bissau","Guinée équatoriale","Guyana","Haïti","Honduras","Hongrie","Inde","Indonésie","Irak","Iran","Irlande","Islande","Israël","Italie","Jamaïque","Japon","Jordanie","Kazakhstan","Kenya","Kirghizistan","Kiribati","Koweït","Laos","Lesotho","Lettonie","Liban","Liberia","Libye","Liechtenstein","Lituanie","Luxembourg","Madagascar","Malaisie","Malawi","Maldives","Mali","Malte","Maroc","Marshall","Maurice","Mauritanie","Mexique","Micronésie","Moldavie","Monaco","Mongolie","Monténégro","Mozambique","Namibie","Nauru","Népal","Nicaragua","Niger","Nigeria","Norvège","Nouvelle-Zélande","Oman","Ouganda","Ouzbékistan","Pakistan","Palaos","Palestine","Panama","Papouasie-Nouvelle-Guinée","Paraguay","Pays-Bas","Pérou","Philippines","Pologne","Portugal","Qatar","République Démocratique du Congo","République Dominicaine","République Tchèque","Roumanie","Royaume-Uni","Russie","Rwanda","Saint-Kitts-et-Nevis","Saint-Vincent-et-les-Grenadines","Sainte-Lucie","Salvador","Samoa","São Tomé-et-Príncipe","Sénégal","Serbie","Seychelles","Sierra Leone","Singapour","Slovaquie","Slovénie","Somalie","Soudan","Soudan du Sud","Sri Lanka","Suède","Suisse","Suriname","Syrie","Tadjikistan","Tanzanie","Tchad","Thaïlande","Timor oriental","Togo","Tonga","Trinité-et-Tobago","Tunisie","Turkménistan","Turquie","Tuvalu","Ukraine","Uruguay","Vanuatu","Vatican","Venezuela","Vietnam","Yémen","Zambie","Zimbabwe"];
const RELIGIONS = ['Christianisme','Islam','Animisme','Autre','Non précisé'];
const ETUDES = ['Aucun','Primaire','Secondaire','Bac','Licence','Master','Doctorat','Autre'];
const FIELDS = [{ name:'nom',label:'Nom',required:true },{ name:'prenom',label:'Prénom',required:true },{ name:'age',label:'Age',type:'number',required:true },{ name:'ville',label:'Ville',required:true },{ name:'quartier',label:'Quartier',required:true },{ name:'profession',label:'Profession' },{ name:'nomMere',label:'Nom de la mère',required:true },{ name:'nomPere',label:'Nom du père',required:true },{ name:'nomAine',label:"Nom de l'aîné",required:true },{ name:'nomBenjamin',label:'Nom du benjamin',required:true },{ name:'lieuRencontre',label:'Lieu de la rencontre' }];
export default function PartnerPage() {
  const { partner, updatePartner, loadUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({});
  const [newPhoto, setNewPhoto] = useState(null);
  const startEdit = () => { setForm({ nom:partner?.nom||'',prenom:partner?.prenom||'',age:partner?.age||'',pays:partner?.pays||'',ville:partner?.ville||'',quartier:partner?.quartier||'',religion:partner?.religion||'',niveauEtude:partner?.niveauEtude||'',profession:partner?.profession||'',nomMere:partner?.nomMere||'',nomPere:partner?.nomPere||'',nomAine:partner?.nomAine||'',nomBenjamin:partner?.nomBenjamin||'',dateRencontre:partner?.dateRencontre?partner.dateRencontre.split('T')[0]:'',lieuRencontre:partner?.lieuRencontre||'' }); setEditing(true); };
  const handleSave = async () => {
    setLoading(true);
    try {
      await partnerApi.updatePartner(partner._id, form);
      if (newPhoto) { const fd = new FormData(); fd.append('photo', newPhoto); await partnerApi.updatePartnerPhoto(partner._id, fd); }
      await loadUser();
      toast.success('Partenaire mis à jour');
      setEditing(false);
    } catch (e) { toast.error(e.message); }
    finally { setLoading(false); }
  };
  const PARTNER_LABELS = { nom:'Nom',prenom:'Prénom',age:'Age',pays:'Pays',ville:'Ville',quartier:'Quartier',religion:'Religion',niveauEtude:"Niveau d'étude",profession:'Profession',nomMere:'Nom de la mère',nomPere:'Nom du père',nomAine:"Nom de l'aîné",nomBenjamin:'Nom du benjamin',lieuRencontre:'Lieu de rencontre' };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div><h1 className="text-2xl font-bold text-gray-900">Mon partenaire</h1><p className="text-gray-500 text-sm mt-1">Informations sur votre partenaire</p></div>
          {!editing && partner && <Button variant="secondary" onClick={startEdit}>✏️ Modifier</Button>}
        </div>
        {!editing ? (
          <div className="card">
            <div className="flex items-center gap-5 mb-6 pb-6 border-b border-gray-100">
              {partner?.photo ? <img src={partner.photo} alt="" className="w-20 h-20 rounded-2xl object-cover shadow" /> : <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary-100 to-secondary-200 flex items-center justify-center text-secondary-700 font-bold text-2xl">{getInitials(partner?.nom, partner?.prenom)}</div>}
              <div>
                <h2 className="text-xl font-bold text-gray-900">{partner?.prenom} {partner?.nom}</h2>
                <p className="text-gray-500 text-sm">{partner?.ville}, {partner?.pays}</p>
                {partner?.dateRencontre && <p className="text-xs text-gray-400 mt-1">Rencontre le {formatDate(partner.dateRencontre)}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(PARTNER_LABELS).map(([key, label]) => (
                <div key={key} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">{label}</p>
                  <p className="text-sm font-medium text-gray-800">{partner?.[key] || '—'}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="card space-y-5">
            <div className="flex justify-center"><PhotoUpload label="Photo du partenaire" onChange={setNewPhoto} preview={partner?.photo} /></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FIELDS.map(f => (
                <div key={f.name}>
                  <label className="label">{f.label}{f.required && <span className="text-red-500 ml-1">*</span>}</label>
                  <input type={f.type||'text'} value={form[f.name]||''} onChange={e=>setForm(p=>({...p,[f.name]:e.target.value}))} className="input" />
                </div>
              ))}
              <div><label className="label">Pays</label><select value={form.pays||''} onChange={e=>setForm(p=>({...p,pays:e.target.value}))} className="input"><option value="">Choisir...</option>{PAYS.map(o=><option key={o} value={o}>{o}</option>)}</select></div>
              <div><label className="label">Religion</label><select value={form.religion||''} onChange={e=>setForm(p=>({...p,religion:e.target.value}))} className="input"><option value="">Choisir...</option>{RELIGIONS.map(o=><option key={o} value={o}>{o}</option>)}</select></div>
              <div><label className="label">Niveau d'étude</label><select value={form.niveauEtude||''} onChange={e=>setForm(p=>({...p,niveauEtude:e.target.value}))} className="input"><option value="">Choisir...</option>{ETUDES.map(o=><option key={o} value={o}>{o}</option>)}</select></div>
              <div><label className="label">Date de la rencontre</label><input type="date" value={form.dateRencontre||''} onChange={e=>setForm(p=>({...p,dateRencontre:e.target.value}))} className="input" /></div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="secondary" onClick={()=>setEditing(false)} className="flex-1">Annuler</Button>
              <Button onClick={handleSave} loading={loading} className="flex-1">Enregistrer</Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
