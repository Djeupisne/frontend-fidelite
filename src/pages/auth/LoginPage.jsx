import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext.jsx';
import { loginSchema } from '../../utils/validators.js';
import { ROUTES } from '../../constants/routes.js';
import Button from '../../components/common/Button.jsx';
export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) });
  const onSubmit = async (data) => {
    setLoading(true);
    try { await login(data); toast.success('Connexion réussie !'); navigate(ROUTES.DASHBOARD); }
    catch (e) { toast.error(e.message || 'Erreur de connexion'); }
    finally { setLoading(false); }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-200">
            <span className="text-white text-2xl font-bold">MF</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Monde Fidélité</h1>
          <p className="text-gray-500 mt-1 text-sm">Connectez-vous à votre compte</p>
        </div>
        <div className="card shadow-xl border border-gray-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" autoComplete="on">
            <div>
              <label className="label" htmlFor="login-email">Adresse email</label>
              <input {...register('email')} id="login-email" type="email" placeholder="votre@email.com" autoComplete="email" className={`input ${errors.email ? 'input-error' : ''}`} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="label" htmlFor="login-password">Mot de passe</label>
              <input {...register('password')} id="login-password" type="password" placeholder="••••••••" autoComplete="current-password" className={`input ${errors.password ? 'input-error' : ''}`} />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <Button type="submit" loading={loading} className="w-full" size="lg">Se connecter</Button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">Pas encore de compte ? <Link to={ROUTES.REGISTER} className="text-primary-600 font-medium hover:underline">S'inscrire</Link></p>
        </div>
      </div>
    </div>
  );
}
