import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext.jsx';
import { registerSchema } from '../../utils/validators.js';
import { ROUTES } from '../../constants/routes.js';
import Button from '../../components/common/Button.jsx';
import PhotoUpload from '../../components/photo/PhotoUpload.jsx';
const STEPS = [{ id: 1, label: 'Votre profil' }, { id: 2, label: 'Votre partenaire' }, { id: 3, label: 'Compte' }];
const RELIGIONS = ['Christianisme','Islam','Animisme','Bouddhisme','Hindouisme','Judaïsme','Autre','Non précisé'];
const ETUDES = ['Aucun','Primaire','Secondaire','Bac','Licence','Master','Doctorat','Autre'];
const PAYS = ["Afghanistan","Afrique du Sud","Albanie","Algérie","Allemagne","Andorre","Angola","Antigua-et-Barbuda","Arabie Saoudite","Argentine","Arménie","Australie","Autriche","Azerbaïdjan","Bahamas","Bahreïn","Bangladesh","Barbade","Belgique","Belize","Bénin","Bhoutan","Biélorussie","Birmanie","Bolivie","Bosnie-Herzégovine","Botswana","Brésil","Brunei","Bulgarie","Burkina Faso","Burundi","Cabo Verde","Cambodge","Cameroun","Canada","Centrafrique","Chili","Chine","Chypre","Colombie","Comores","Congo","Corée du Nord","Corée du Sud","Costa Rica","Côte d'Ivoire","Croatie","Cuba","Danemark","Djibouti","Dominique","Égypte","Émirats Arabes Unis","Équateur","Érythrée","Espagne","Eswatini","Estonie","États-Unis","Éthiopie","Fidji","Finlande","France","Gabon","Gambie","Géorgie","Ghana","Grèce","Grenade","Guatemala","Guinée","Guinée-Bissau","Guinée équatoriale","Guyana","Haïti","Honduras","Hongrie","Inde","Indonésie","Irak","Iran","Irlande","Islande","Israël","Italie","Jamaïque","Japon","Jordanie","Kazakhstan","Kenya","Kirghizistan","Kiribati","Koweït","Laos","Lesotho","Lettonie","Liban","Liberia","Libye","Liechtenstein","Lituanie","Luxembourg","Madagascar","Malaisie","Malawi","Maldives","Mali","Malte","Maroc","Marshall","Maurice","Mauritanie","Mexique","Micronésie","Moldavie","Monaco","Mongolie","Monténégro","Mozambique","Namibie","Nauru","Népal","Nicaragua","Niger","Nigeria","Norvège","Nouvelle-Zélande","Oman","Ouganda","Ouzbékistan","Pakistan","Palaos","Palestine","Panama","Papouasie-Nouvelle-Guinée","Paraguay","Pays-Bas","Pérou","Philippines","Pologne","Portugal","Qatar","République Démocratique du Congo","République Dominicaine","République Tchèque","Roumanie","Royaume-Uni","Russie","Rwanda","Saint-Kitts-et-Nevis","Saint-Vincent-et-les-Grenadines","Sainte-Lucie","Salvador","Samoa","São Tomé-et-Príncipe","Sénégal","Serbie","Seychelles","Sierra Leone","Singapour","Slovaquie","Slovénie","Somalie","Soudan","Soudan du Sud","Sri Lanka","Suède","Suisse","Suriname","Syrie","Tadjikistan","Tanzanie","Tchad","Thaïlande","Timor oriental","Togo","Tonga","Trinité-et-Tobago","Tunisie","Turkménistan","Turquie","Tuvalu","Ukraine","Uruguay","Vanuatu","Vatican","Venezuela","Vietnam","Yémen","Zambie","Zimbabwe"];
export default function RegisterPage() {
  const { register: authRegister } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);
  const [partnerPhoto, setPartnerPhoto] = useState(null);
  const [apiError, setApiError] = useState('');
  const { register, handleSubmit, trigger, formState: { errors } } = useForm({ resolver: zodResolver(registerSchema), mode: 'onChange' });
  const userFields = ['nom','prenom','age','pays','ville','quartier','nomMere','nomPere','nomAine','nomBenjamin'];
  const partnerFields = ['partnerNom','partnerPrenom','partnerAge','partnerPays','partnerVille','partnerQuartier','partnerNomMere','partnerNomPere','partnerNomAine','partnerNomBenjamin'];
  const nextStep = async () => { const fields = step === 1 ? userFields : partnerFields; const valid = await trigger(fields); if (valid) { setApiError(''); setStep(s => s + 1); } };
  const onSubmit = async (data) => {
    setLoading(true); setApiError('');
    try {
      const formData = new FormData();
      const allFields = ['email','password','nom','prenom','age','pays','ville','quartier','religion','niveauEtude','profession','nomMere','nomPere','nomAine','nomBenjamin','partnerNom','partnerPrenom','partnerAge','partnerPays','partnerVille','partnerQuartier','partnerReligion','partnerNiveauEtude','partnerProfession','partnerNomMere','partnerNomPere','partnerNomAine','partnerNomBenjamin','dateRencontre','lieuRencontre'];
      allFields.forEach(key => { if (data[key] !== undefined && data[key] !== null && data[key] !== '') formData.append(key, String(data[key])); });
      if (userPhoto) formData.append('photo', userPhoto);
      if (partnerPhoto) formData.append('partnerPhoto', partnerPhoto);
      await authRegister(formData);
      toast.success('Compte créé avec succès !');
      navigate(ROUTES.DASHBOARD);
    } catch (e) { const msg = e.message || 'Une erreur est survenue'; setApiError(msg); toast.error(msg); if (msg.toLowerCase().includes('email')) setStep(3); }
    finally { setLoading(false); }
  };
  const getAC = (n) => ({ nom:'family-name', prenom:'given-name', pays:'country-name', ville:'address-level2', profession:'organization-title' }[n] || 'off');
  const F = ({ label, name, type = 'text', placeholder, required = false }) => (
    <div><label className="label" htmlFor={`r-${name}`}>{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
    <input {...register(name)} id={`r-${name}`} type={type} placeholder={placeholder} autoComplete={getAC(name)} className={`input ${errors[name] ? 'input-error' : ''}`} />
    {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]?.message}</p>}</div>
  );
  const S = ({ label, name, options, required = false }) => (
    <div><label className="label" htmlFor={`r-${name}`}>{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
    <select {...register(name)} id={`r-${name}`} autoComplete="off" className={`input ${errors[name] ? 'input-error' : ''}`}><option value="">Choisir...</option>{options.map(o => <option key={o} value={o}>{o}</option>)}</select>
    {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]?.message}</p>}</div>
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg"><span className="text-white text-xl font-bold">MF</span></div>
          <h1 className="text-2xl font-bold text-gray-900">Créer un compte</h1>
          <p className="text-gray-500 mt-1 text-sm">Renseignez vos informations et celles de votre partenaire</p>
        </div>
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.id}>
              <div className={`flex items-center gap-2 ${step >= s.id ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${step > s.id ? 'bg-primary-600 border-primary-600 text-white' : step === s.id ? 'border-primary-600 text-primary-600 bg-primary-50' : 'border-gray-300 text-gray-400'}`}>{step > s.id ? '✓' : s.id}</div>
                <span className="hidden sm:block text-sm font-medium">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 max-w-16 rounded ${step > s.id ? 'bg-primary-600' : 'bg-gray-200'}`} />}
            </React.Fragment>
          ))}
        </div>
        {apiError && <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">{apiError}</div>}
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="card shadow-xl border border-gray-100">
            {step === 1 && (
              <div className="space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100"><div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-xl">👤</div><div><h2 className="font-semibold text-gray-900">Vos informations personnelles</h2><p className="text-xs text-gray-500">Informations vous concernant directement</p></div></div>
                <div className="flex justify-center"><PhotoUpload label="Votre photo (optionnel)" onChange={setUserPhoto} initialPreview={null} /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <F label="Nom" name="nom" placeholder="Votre nom de famille" required /><F label="Prénom" name="prenom" placeholder="Votre prénom" required />
                  <F label="Age" name="age" type="number" placeholder="Ex: 28" required /><S label="Pays" name="pays" options={PAYS} required />
                  <F label="Ville" name="ville" placeholder="Votre ville" required /><F label="Quartier" name="quartier" placeholder="Votre quartier" required />
                  <S label="Religion" name="religion" options={RELIGIONS} /><S label="Niveau d'étude" name="niveauEtude" options={ETUDES} />
                  <F label="Profession" name="profession" placeholder="Votre métier" />
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100"><p className="text-xs font-semibold text-blue-800 mb-3">Informations familiales <span className="text-red-500">*</span></p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><F label="Nom complet de votre mère" name="nomMere" placeholder="Prénom et nom" required /><F label="Nom complet de votre père" name="nomPere" placeholder="Prénom et nom" required /><F label="Nom de l'aîné de la famille" name="nomAine" placeholder="Prénom et nom" required /><F label="Nom du benjamin de la famille" name="nomBenjamin" placeholder="Prénom et nom" required /></div>
                </div>
                <Button type="button" onClick={nextStep} className="w-full" size="lg">Suivant — Informations partenaire →</Button>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100"><div className="w-10 h-10 bg-secondary-100 rounded-xl flex items-center justify-center text-xl">💑</div><div><h2 className="font-semibold text-gray-900">Informations du partenaire</h2><p className="text-xs text-gray-500">Informations concernant votre partenaire</p></div></div>
                <div className="flex justify-center"><PhotoUpload label="Photo du partenaire (optionnel)" onChange={setPartnerPhoto} initialPreview={null} /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <F label="Nom du partenaire" name="partnerNom" placeholder="Son nom de famille" required /><F label="Prénom du partenaire" name="partnerPrenom" placeholder="Son prénom" required />
                  <F label="Age du partenaire" name="partnerAge" type="number" placeholder="Ex: 30" required /><S label="Pays du partenaire" name="partnerPays" options={PAYS} required />
                  <F label="Ville du partenaire" name="partnerVille" placeholder="Sa ville" required /><F label="Quartier du partenaire" name="partnerQuartier" placeholder="Son quartier" required />
                  <S label="Religion" name="partnerReligion" options={RELIGIONS} /><S label="Niveau d'étude" name="partnerNiveauEtude" options={ETUDES} />
                  <F label="Profession" name="partnerProfession" placeholder="Son métier" />
                </div>
                <div className="bg-pink-50 rounded-xl p-4 border border-pink-100"><p className="text-xs font-semibold text-pink-800 mb-3">Informations familiales du partenaire <span className="text-red-500">*</span></p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><F label="Nom complet de sa mère" name="partnerNomMere" placeholder="Prénom et nom" required /><F label="Nom complet de son père" name="partnerNomPere" placeholder="Prénom et nom" required /><F label="Nom de l'aîné de sa famille" name="partnerNomAine" placeholder="Prénom et nom" required /><F label="Nom du benjamin de sa famille" name="partnerNomBenjamin" placeholder="Prénom et nom" required /></div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200"><p className="text-xs font-semibold text-gray-600 mb-3">Informations sur votre rencontre (optionnel)</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label className="label" htmlFor="r-dateRencontre">Date de la rencontre</label><input {...register('dateRencontre')} id="r-dateRencontre" type="date" autoComplete="off" className="input" /></div><F label="Lieu de la rencontre" name="lieuRencontre" placeholder="Ville, lieu..." /></div>
                </div>
                <div className="flex gap-3"><Button type="button" variant="secondary" onClick={() => setStep(1)} className="flex-1">← Retour</Button><Button type="button" onClick={nextStep} className="flex-1" size="lg">Suivant — Créer le compte →</Button></div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100"><div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-xl">🔐</div><div><h2 className="font-semibold text-gray-900">Créer votre compte</h2><p className="text-xs text-gray-500">Email et mot de passe pour vous connecter</p></div></div>
                <div className="space-y-4">
                  <div><label className="label" htmlFor="r-email">Adresse email <span className="text-red-500">*</span></label><input {...register('email')} id="r-email" type="email" placeholder="votre@email.com" autoComplete="email" className={`input ${errors.email ? 'input-error' : ''}`} />{errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}</div>
                  <div><label className="label" htmlFor="r-password">Mot de passe <span className="text-red-500">*</span></label><input {...register('password')} id="r-password" type="password" placeholder="Minimum 6 caractères" autoComplete="new-password" className={`input ${errors.password ? 'input-error' : ''}`} />{errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}</div>
                  <div><label className="label" htmlFor="r-confirm">Confirmer le mot de passe <span className="text-red-500">*</span></label><input {...register('confirmPassword')} id="r-confirm" type="password" placeholder="Répétez le mot de passe" autoComplete="new-password" className={`input ${errors.confirmPassword ? 'input-error' : ''}`} />{errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100"><h4 className="text-xs font-semibold text-gray-600 mb-2">Photos sélectionnées</h4>
                  <div className="flex gap-4 text-xs"><span className={userPhoto ? 'text-green-600 font-medium' : 'text-gray-400'}>{userPhoto ? '✓ Votre photo' : '— Sans photo (vous)'}</span><span className={partnerPhoto ? 'text-green-600 font-medium' : 'text-gray-400'}>{partnerPhoto ? '✓ Photo partenaire' : '— Sans photo (partenaire)'}</span></div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-100"><p className="text-xs text-green-700">🔒 Vos données sont chiffrées et strictement confidentielles.</p></div>
                <div className="flex gap-3"><Button type="button" variant="secondary" onClick={() => setStep(2)} className="flex-1">← Retour</Button><Button type="submit" loading={loading} className="flex-1" size="lg">Créer mon compte ✓</Button></div>
              </div>
            )}
          </div>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">Déjà un compte ? <Link to={ROUTES.LOGIN} className="text-primary-600 font-medium hover:underline">Se connecter</Link></p>
      </div>
    </div>
  );
}
