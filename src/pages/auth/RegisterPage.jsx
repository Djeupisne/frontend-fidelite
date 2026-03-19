import React, { useState, useRef } from 'react';
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
const RELIGIONS = ['Christianisme','Islam','Animisme','Autre','Non précisé'];
const ETUDES = ['Aucun','Primaire','Secondaire','Bac','Licence','Master','Doctorat','Autre'];
const PAYS = ['Togo','Bénin','Ghana','Côte d\'Ivoire','Sénégal','Cameroun','Nigeria','Burkina Faso','Mali','Niger','Autre'];
export default function RegisterPage() {
  const { register: authRegister } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(null);
  const [partnerPhoto, setPartnerPhoto] = useState(null);
  const { register, handleSubmit, trigger, formState: { errors } } = useForm({ resolver: zodResolver(registerSchema), mode: 'onChange' });
  const userFields = ['nom','prenom','age','pays','ville','quartier','religion','niveauEtude','profession','nomMere','nomPere','nomAine','nomBenjamin'];
  const partnerFields = ['partnerNom','partnerPrenom','partnerAge','partnerPays','partnerVille','partnerQuartier','partnerReligion','partnerNiveauEtude','partnerProfession','partnerNomMere','partnerNomPere','partnerNomAine','partnerNomBenjamin'];
  const nextStep = async () => {
    const fields = step === 1 ? userFields : partnerFields;
    const valid = await trigger(fields);
    if (valid) setStep(s => s + 1);
  };
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => { if (v !== undefined && v !== '') formData.append(k, v); });
      if (userPhoto) formData.append('photo', userPhoto);
      if (partnerPhoto) formData.append('partnerPhoto', partnerPhoto);
      await authRegister(formData);
      toast.success('Compte créé avec succès !');
      navigate(ROUTES.DASHBOARD);
    } catch (e) { toast.error(e.message || 'Erreur lors de l\'inscription'); setStep(1); }
    finally { setLoading(false); }
  };
  const Field = ({ label, name, type = 'text', placeholder, required = false }) => (
    <div>
      <label className="label">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
      <input {...register(name)} type={type} placeholder={placeholder} className={`input ${errors[name] ? 'input-error' : ''}`} />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]?.message}</p>}
    </div>
  );
  const SelectField = ({ label, name, options, required = false }) => (
    <div>
      <label className="label">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
      <select {...register(name)} className={`input ${errors[name] ? 'input-error' : ''}`}>
        <option value="">Choisir...</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]?.message}</p>}
    </div>
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-primary-200">
            <span className="text-white text-xl font-bold">MF</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Créer un compte</h1>
          <p className="text-gray-500 mt-1 text-sm">Renseignez vos informations et celles de votre partenaire</p>
        </div>
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.id}>
              <div className={`flex items-center gap-2 ${step >= s.id ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${step > s.id ? 'bg-primary-600 border-primary-600 text-white' : step === s.id ? 'border-primary-600 text-primary-600' : 'border-gray-300 text-gray-400'}`}>{step > s.id ? '✓' : s.id}</div>
                <span className="hidden sm:block text-sm font-medium">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 max-w-16 rounded ${step > s.id ? 'bg-primary-600' : 'bg-gray-200'}`} />}
            </React.Fragment>
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card shadow-xl border border-gray-100">
            {step === 1 && (
              <div className="space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-xl">👤</div>
                  <div><h2 className="font-semibold text-gray-900">Vos informations personnelles</h2><p className="text-xs text-gray-500">Ces informations vous concernent</p></div>
                </div>
                <div className="flex justify-center"><PhotoUpload label="Votre photo" name="photo" onChange={setUserPhoto} /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Nom" name="nom" placeholder="Votre nom de famille" required />
                  <Field label="Prénom" name="prenom" placeholder="Votre prénom" required />
                  <Field label="Age" name="age" type="number" placeholder="Ex: 28" required />
                  <SelectField label="Pays" name="pays" options={PAYS} required />
                  <Field label="Ville" name="ville" placeholder="Votre ville" required />
                  <Field label="Quartier" name="quartier" placeholder="Votre quartier" required />
                  <SelectField label="Religion" name="religion" options={RELIGIONS} />
                  <SelectField label="Niveau d'étude" name="niveauEtude" options={ETUDES} />
                  <Field label="Profession" name="profession" placeholder="Votre métier" />
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <p className="text-xs font-semibold text-blue-800 mb-3">Informations familiales <span className="text-red-500">*</span></p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Nom de votre mère" name="nomMere" placeholder="Nom complet" required />
                    <Field label="Nom de votre père" name="nomPere" placeholder="Nom complet" required />
                    <Field label="Nom de l'aîné de la famille" name="nomAine" placeholder="Nom complet" required />
                    <Field label="Nom du benjamin de la famille" name="nomBenjamin" placeholder="Nom complet" required />
                  </div>
                </div>
                <Button type="button" onClick={nextStep} className="w-full" size="lg">Suivant — Partenaire →</Button>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 bg-secondary-100 rounded-xl flex items-center justify-center text-xl">💑</div>
                  <div><h2 className="font-semibold text-gray-900">Informations du partenaire</h2><p className="text-xs text-gray-500">Ces informations concernent votre partenaire</p></div>
                </div>
                <div className="flex justify-center"><PhotoUpload label="Photo du partenaire" name="partnerPhoto" onChange={setPartnerPhoto} /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Nom du partenaire" name="partnerNom" placeholder="Son nom de famille" required />
                  <Field label="Prénom du partenaire" name="partnerPrenom" placeholder="Son prénom" required />
                  <Field label="Age du partenaire" name="partnerAge" type="number" placeholder="Ex: 30" required />
                  <SelectField label="Pays du partenaire" name="partnerPays" options={PAYS} required />
                  <Field label="Ville du partenaire" name="partnerVille" placeholder="Sa ville" required />
                  <Field label="Quartier du partenaire" name="partnerQuartier" placeholder="Son quartier" required />
                  <SelectField label="Religion" name="partnerReligion" options={RELIGIONS} />
                  <SelectField label="Niveau d'étude" name="partnerNiveauEtude" options={ETUDES} />
                  <Field label="Profession" name="partnerProfession" placeholder="Son métier" />
                </div>
                <div className="bg-pink-50 rounded-xl p-4 border border-pink-100">
                  <p className="text-xs font-semibold text-pink-800 mb-3">Informations familiales du partenaire <span className="text-red-500">*</span></p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Nom de sa mère" name="partnerNomMere" placeholder="Nom complet" required />
                    <Field label="Nom de son père" name="partnerNomPere" placeholder="Nom complet" required />
                    <Field label="Nom de l'aîné de sa famille" name="partnerNomAine" placeholder="Nom complet" required />
                    <Field label="Nom du benjamin de sa famille" name="partnerNomBenjamin" placeholder="Nom complet" required />
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-xs font-semibold text-gray-600 mb-3">Informations sur votre rencontre (optionnel)</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className="label">Date de la rencontre</label><input {...register('dateRencontre')} type="date" className="input" /></div>
                    <Field label="Lieu de la rencontre" name="lieuRencontre" placeholder="Ville, lieu..." />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="secondary" onClick={() => setStep(1)} className="flex-1">← Retour</Button>
                  <Button type="button" onClick={nextStep} className="flex-1" size="lg">Suivant — Compte →</Button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-xl">🔐</div>
                  <div><h2 className="font-semibold text-gray-900">Créer votre compte</h2><p className="text-xs text-gray-500">Email et mot de passe pour vous connecter</p></div>
                </div>
                <div className="space-y-4">
                  <Field label="Adresse email" name="email" type="email" placeholder="votre@email.com" required />
                  <Field label="Mot de passe" name="password" type="password" placeholder="Minimum 6 caractères" required />
                  <Field label="Confirmer le mot de passe" name="confirmPassword" type="password" placeholder="Répétez le mot de passe" required />
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <p className="text-xs text-green-700">🔒 Vos données sont chiffrées et strictement confidentielles. Elles ne seront jamais vendues à des tiers.</p>
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="secondary" onClick={() => setStep(2)} className="flex-1">← Retour</Button>
                  <Button type="submit" loading={loading} className="flex-1" size="lg">Créer mon compte ✓</Button>
                </div>
              </div>
            )}
          </div>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">Déjà un compte ? <Link to={ROUTES.LOGIN} className="text-primary-600 font-medium hover:underline">Se connecter</Link></p>
      </div>
    </div>
  );
}
