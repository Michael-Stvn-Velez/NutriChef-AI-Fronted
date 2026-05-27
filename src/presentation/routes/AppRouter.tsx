import ForgotPasswordPage from '@presentation/pages/ForgotPasswordPage'
import HomePage from '@presentation/pages/HomePage'
import LoginPage from '@presentation/pages/LoginPage'
import RegisterPage from '@presentation/pages/RegisterPage'
import ResetPasswordPage from '@presentation/pages/ResetPasswordPage'
import { Navigate, Route, Routes } from 'react-router-dom'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
