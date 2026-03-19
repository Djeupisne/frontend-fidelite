import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';
import Button from '../../components/common/Button.jsx';
import { paymentApi } from '../../services/payment.api.js';
import { formatAmount } from '../../utils/formatters.js';
import { ROUTES } from '../../constants/routes.js';
import toast from 'react-hot-toast';
const METHODS = [{ id:'cinetpay', label:'Mobile Money / Wave', icon:'📱', desc:'MTN, Moov, Wave, Orange Money' }, { id:'stripe', label:'Carte bancaire', icon:'💳', desc:'Visa, Mastercard' }];
export default function CheckoutPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { loadUser } = useAuth();
  const plan = state?.plan;
  const [method, setMethod] = useState('cinetpay');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('select');
  if (!plan) return <div className="min-h-screen flex items-center justify-center"><div className="text-center"><p className="text-gray-500 mb-4">Aucun plan sélectionné</p><Link to={ROUTES.PLANS}><Button>Voir les plans</Button></Link></div></div>;
  const handlePay = async () => {
    setLoading(true);
    try {
      const res = await paymentApi.createIntent({ planId: plan._id, methode: method });
      const data = res.data;
      if (method === 'cinetpay') {
        setStep('cinetpay');
        setTimeout(async () => {
          try {
            await paymentApi.confirmPayment({ paymentId: data.paymentId });
            await loadUser();
            toast.success('Paiement confirmé ! Crédits ajoutés.');
            navigate(ROUTES.DASHBOARD);
          } catch (e) { toast.error('Erreur de confirmation'); }
        }, 3000);
      } else {
        toast.success('Redirection vers Stripe...');
      }
    } catch (e) { toast.error(e.message); }
    finally { setLoading(false); }
  };
  if (step === 'cinetpay') return (
    <div className="min-h-screen bg-gray-50 flex flex-col"><Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="card text-center max-w-md w-full py-12">
          <div className="text-5xl mb-4 animate-bounce">📱</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Paiement en cours...</h2>
          <p className="text-gray-500 text-sm mb-4">Confirmez le paiement sur votre téléphone</p>
          <div className="bg-primary-50 rounded-xl p-4 border border-primary-100">
            <p className="text-2xl font-bold text-primary-600 mb-1">{formatAmount(plan.prix, plan.devise)}</p>
            <p className="text-sm text-primary-700">{plan.nom}</p>
          </div>
          <p className="text-xs text-gray-400 mt-4">Simulation — En production, CinetPay enverra une notification sur votre téléphone</p>
        </div>
      </main><Footer />
    </div>
  );
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-lg mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button onClick={() => navigate(ROUTES.PLANS)} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-4">← Retour aux plans</button>
          <h1 className="text-2xl font-bold text-gray-900">Finaliser l'achat</h1>
        </div>
        <div className="card mb-6 bg-primary-50 border border-primary-100">
          <div className="flex items-center justify-between">
            <div><h3 className="font-bold text-gray-900">{plan.nom}</h3><p className="text-sm text-gray-600">{plan.nbRecherches} recherche(s) — {plan.dureeJours} jours</p></div>
            <span className="text-2xl font-bold text-primary-600">{formatAmount(plan.prix, plan.devise)}</span>
          </div>
        </div>
        <div className="card mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Mode de paiement</h3>
          <div className="space-y-3">
            {METHODS.map(m => (
              <button key={m.id} type="button" onClick={() => setMethod(m.id)} className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${method === m.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <span className="text-2xl">{m.icon}</span>
                <div className="text-left flex-1"><p className="font-medium text-gray-900 text-sm">{m.label}</p><p className="text-xs text-gray-500">{m.desc}</p></div>
                {method === m.id && <span className="text-primary-600 font-bold">✓</span>}
              </button>
            ))}
          </div>
        </div>
        <div className="card mb-6 bg-gray-50 border border-gray-200">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-600">Sous-total</span><span className="font-medium">{formatAmount(plan.prix, plan.devise)}</span></div>
            <div className="flex justify-between border-t border-gray-200 pt-2 mt-2"><span className="font-semibold text-gray-900">Total</span><span className="font-bold text-primary-600 text-lg">{formatAmount(plan.prix, plan.devise)}</span></div>
          </div>
        </div>
        <Button onClick={handlePay} loading={loading} className="w-full" size="lg">💳 Payer {formatAmount(plan.prix, plan.devise)}</Button>
        <p className="text-center text-xs text-gray-400 mt-4">🔒 Paiement sécurisé — Vos données sont protégées</p>
      </main>
      <Footer />
    </div>
  );
}
