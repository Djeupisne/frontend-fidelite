import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext.jsx';
import { profileSchema } from '../../utils/validators.js';
import { ROUTES } from '../../constants/routes.js';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';
import Button from '../../components/common/Button.jsx';
import PhotoUpload from '../../components/photo/PhotoUpload.jsx';
import { userApi } from '../../services/user.api.js';
const PAYS = ["Afghanistan","Afrique du Sud","Albanie","Algérie","Allemagne","Andorre","Angola","Antigua-et-Barbuda","Arabie Saoudite","Argentine","Arménie","Australie","Autriche","Azerbaïdjan","Bahamas","Bahreïn","Bangladesh","Barbade","Belgique","Belize","Bénin","Bhoutan","Biélorussie","Birmanie","Bolivie","Bosnie-Herzégovine","Botswana","Brésil","Brunei","Bulgarie","Burkina Faso","Burundi","Cabo Verde","Cambodge","Cameroun","Canada","Centrafrique","Chili","Chine","Chypre","Colombie","Comores","Congo","Corée du Nord","Corée du Sud","Costa Rica","Côte d'Ivoire","Croatie","Cuba","Danemark","Djibouti","Dominique","Égypte","Émirats Arabes Unis","Équateur","Érythrée","Espagne","Eswatini","Estonie","États-Unis","Éthiopie","Fidji","Finlande","France","Gabon","Gambie","Géorgie","Ghana","Grèce","Grenade","Guatemala","Guinée","Guinée-Bissau","Guinée équatoriale","Guyana","Haïti","Honduras","Hongrie","Inde","Indonésie","Irak","Iran","Irlande","Islande","Israël","Italie","Jamaïque","Japon","Jordanie","Kazakhstan","Kenya","Kirghizistan","Kiribati","Koweït","Laos","Lesotho","Lettonie","Liban","Liberia","Libye","Liechtenstein","Lituanie","Luxembourg","Madagascar","Malaisie","Malawi","Maldives","Mali","Malte","Maroc","Marshall","Maurice","Mauritanie","Mexique","Micronésie","Moldavie","Monaco","Mongolie","Monténégro","Mozambique","Namibie","Nauru","Népal","Nicaragua","Niger","Nigeria","Norvège","Nouvelle-Zélande","Oman","Ouganda","Ouzbékistan","Pakistan","Palaos","Palestine","Panama","Papouasie-Nouvelle-Guinée","Paraguay","Pays-Bas","Pérou","Philippines","Pologne","Portugal","Qatar","République Démocratique du Congo","République Dominicaine","République Tchèque","Roumanie","Royaume-Uni","Russie","Rwanda","Saint-Kitts-et-Nevis","Saint-Vincent-et-les-Grenadines","Sainte-Lucie","Salvador","Samoa","São Tomé-et-Príncipe","Sénégal","Serbie","Seychelles","Sierra Leone","Singapour","Slovaquie","Slovénie","Somalie","Soudan","Soudan du Sud","Sri Lanka","Suède","Suisse","Suriname","Syrie","Tadjikistan","Tanzanie","Tchad","Thaïlande","Timor oriental","Togo","Tonga","Trinité-et-Tobago","Tunisie","Turkménistan","Turquie","Tuvalu","Ukraine","Uruguay","Vanuatu","Vatican","Venezuela","Vietnam","Yémen","Zambie","Zimbabwe"];
const RELIGIONS = ['Christianisme','Islam','Animisme','Bouddhisme','Hindouisme','Judaïsme','Autre','Non précisé'];
const ETUDES = ['Aucun','Primaire','Secondaire','Bac','Licence','Master','Doctorat','Autre'];
export default function EditProfilePage() {
  const { user, loadUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [newPhoto, setNewPhoto] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(profileSchema), defaultValues: { nom: user?.nom || '', prenom: user?.prenom || '', age: user?.age || '', pays: user?.pays || '', ville: user?.ville || '', quartier: user?.quartier || '', religion: user?.religion || '', niveauEtude: user?.niveauEtude || '', profession: user?.profession || '', nomMere: user?.nomMere || '', nomPere: user?.nomPere || '', nomAine: user?.nomAine || '', nomBenjamin: user?.nomBenjamin || '' } });
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await userApi.updateProfile(data);
      if (newPhoto) { const fd = new FormData(); fd.append('photo', newPhoto); await userApi.updatePhoto(fd); }
      await loadUser();
      toast.success('Profil mis à jour avec succès');
      navigate(ROUTES.PROFILE);
    } catch (e) { toast.error(e.message); }
    finally { setLoading(false); }
  };
  const F = ({ label, name, type = 'text', placeholder, ac = 'off' }) => (
    <div>
      <label className="label" htmlFor={`ep-${name}`}>{label}</label>
      <input {...register(name)} id={`ep-${name}`} type={type} placeholder={placeholder} autoComplete={ac} className={`input ${errors[name] ? 'input-error' : ''}`} />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]?.message}</p>}
    </div>
  );
  const S = ({ label, name, options }) => (
    <div>
      <label className="label" htmlFor={`ep-${name}`}>{label}</label>
      <select {...register(name)} id={`ep-${name}`} autoComplete="off" className="input">
        <option value="">Choisir...</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6"><h1 className="text-2xl font-bold text-gray-900">Modifier mon profil</h1><p className="text-gray-500 text-sm mt-1">Mettez à jour vos informations</p></div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" autoComplete="off">
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Photo de profil</h3>
            <div className="flex justify-center"><PhotoUpload label="Ma photo" onChange={setNewPhoto} preview={user?.photo} /></div>
          </div>
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Informations personnelles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <F label="Nom" name="nom" placeholder="Votre nom" ac="family-name" />
              <F label="Prénom" name="prenom" placeholder="Votre prénom" ac="given-name" />
              <F label="Age" name="age" type="number" placeholder="Votre âge" />
              <S label="Pays" name="pays" options={PAYS} />
              <F label="Ville" name="ville" placeholder="Votre ville" ac="address-level2" />
              <F label="Quartier" name="quartier" placeholder="Votre quartier" />
              <S label="Religion" name="religion" options={RELIGIONS} />
              <S label="Niveau d'étude" name="niveauEtude" options={ETUDES} />
              <F label="Profession" name="profession" placeholder="Votre métier" ac="organization-title" />
            </div>
          </div>
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Informations familiales</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <F label="Nom complet de votre mère" name="nomMere" placeholder="Prénom et nom" />
              <F label="Nom complet de votre père" name="nomPere" placeholder="Prénom et nom" />
              <F label="Nom de l'aîné de la famille" name="nomAine" placeholder="Prénom et nom" />
              <F label="Nom du benjamin de la famille" name="nomBenjamin" placeholder="Prénom et nom" />
            </div>
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="secondary" onClick={() => navigate(ROUTES.PROFILE)} className="flex-1">Annuler</Button>
            <Button type="submit" loading={loading} className="flex-1">Enregistrer les modifications</Button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
