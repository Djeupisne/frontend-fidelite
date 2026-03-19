import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes.js';
import ProtectedRoute from './ProtectedRoute.jsx';
import LoginPage from '../pages/auth/LoginPage.jsx';
import RegisterPage from '../pages/auth/RegisterPage.jsx';
import DashboardPage from '../pages/dashboard/DashboardPage.jsx';
import ProfilePage from '../pages/profile/ProfilePage.jsx';
import EditProfilePage from '../pages/profile/EditProfilePage.jsx';
import PartnerPage from '../pages/partner/PartnerPage.jsx';
import SearchPage from '../pages/search/SearchPage.jsx';
import SearchResultsPage from '../pages/search/SearchResultsPage.jsx';
import PlansPage from '../pages/payment/PlansPage.jsx';
import CheckoutPage from '../pages/payment/CheckoutPage.jsx';
import HistoryPage from '../pages/history/HistoryPage.jsx';
import NotFoundPage from '../pages/errors/NotFoundPage.jsx';
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTES.EDIT_PROFILE} element={<EditProfilePage />} />
          <Route path={ROUTES.PARTNER} element={<PartnerPage />} />
          <Route path={ROUTES.SEARCH} element={<SearchPage />} />
          <Route path={ROUTES.SEARCH_RESULTS} element={<SearchResultsPage />} />
          <Route path={ROUTES.PLANS} element={<PlansPage />} />
          <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
          <Route path={ROUTES.HISTORY} element={<HistoryPage />} />
        </Route>
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
