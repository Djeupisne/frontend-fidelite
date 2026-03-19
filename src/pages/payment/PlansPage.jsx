import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';
import PlanCard from '../../components/payment/PlanCard.jsx';
import Spinner from '../../components/common/Spinner.jsx';
import { paymentApi } from '../../services/payment.api.js';
import { ROUTES } from '../../constants/routes.js';
import toast from 'react-hot-toast';
export default function PlansPage() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  useEffect(() => { paymentApi.getPlans().then(r => setPlans(r.data.plans || [])).catch(e => toast.error(e.message)).finally(() => setLoading(false)); }, []);
  const handleSelect = (plan) => { setSelected(plan); navigate(ROUTES.CHECKOUT, { state: { plan } }); };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Choisissez votre plan</h1>
          <p className="text-gray-500 max-w-xl mx-auto">Sélectionnez le plan qui correspond à vos besoins de vérification. Chaque plan vous donne un nombre de crédits pour effectuer des vérifications.</p>
        </div>
        {loading ? (
          <div className="flex justify-center py-20"><Spinner size="lg" /></div>
        ) : plans.length === 0 ? (
          <div className="text-center py-20 text-gray-400">Aucun plan disponible pour le moment</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {plans.map(plan => <PlanCard key={plan._id} plan={plan} onSelect={handleSelect} selected={selected?._id === plan._id} />)}
          </div>
        )}
        <div className="mt-12 bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 text-center">Comment ça fonctionne ?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[{ icon:'1️⃣', title:'Choisissez un plan', desc:'Sélectionnez le niveau de vérification adapté à vos besoins' }, { icon:'2️⃣', title:'Payez en ligne', desc:'Paiement sécurisé via Mobile Money ou carte bancaire' }, { icon:'3️⃣', title:'Vérifiez', desc:'Utilisez vos crédits pour vérifier la fidélité de votre partenaire' }].map(step => (
              <div key={step.title}><div className="text-3xl mb-2">{step.icon}</div><h4 className="font-medium text-gray-900 text-sm mb-1">{step.title}</h4><p className="text-xs text-gray-500">{step.desc}</p></div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
