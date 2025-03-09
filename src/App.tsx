import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import EquipmentListPage from './pages/dashboard/EquipmentListPage';
import EquipmentDetailPage from './pages/dashboard/EquipmentDetailPage';
import AddEquipmentPage from './pages/dashboard/AddEquipmentPage';
import ProfilePage from './pages/dashboard/ProfilePage';
import CommissionDashboard from './pages/dashboard/CommissionDashboard';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route index element={<EquipmentListPage />} />
          <Route path="equipment/:id" element={<EquipmentDetailPage />} />
          <Route path="equipment/add" element={<AddEquipmentPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="commissions" element={<CommissionDashboard />} />
        </Route>
        
        {/* 404 route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App; 