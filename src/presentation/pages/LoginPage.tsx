import { AuthCard } from '@presentation/components/common/AuthCard'
import { AuthLayout } from '@presentation/components/common/AuthLayout'
import { NeonButton } from '@presentation/components/common/NeonButton'
import { NeonInput } from '@presentation/components/common/NeonInput'
import { useAuth } from '@presentation/hooks/useAuth'
import { getErrorMessage } from '@presentation/utils/getErrorMessage'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const flashMessage = (location.state as { message?: string } | null)?.message

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await login({ email, password })
      navigate('/', { replace: true })
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <AuthCard title="Iniciar sesión" subtitle="Accede a tu cuenta para continuar">
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {flashMessage ? (
            <div className="auth-alert auth-alert--success" role="status">
              {flashMessage}
            </div>
          ) : null}

          {error ? (
            <div className="auth-alert auth-alert--error" role="alert">
              {error}
            </div>
          ) : null}

          <NeonInput
            id="login-email"
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <NeonInput
            id="login-password"
            label="Contraseña"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="auth-form__link-row">
            <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
          </div>

          <div className="auth-form__actions">
            <NeonButton type="submit" disabled={loading}>
              {loading ? 'Conectando…' : 'Entrar'}
            </NeonButton>
          </div>

          <p className="auth-form__footer">
            ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  )
}
