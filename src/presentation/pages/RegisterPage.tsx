import { assertPasswordsMatch } from '@application/useCases/Auth/authValidation'
import { AuthCard } from '@presentation/components/common/AuthCard'
import { AuthLayout } from '@presentation/components/common/AuthLayout'
import { NeonButton } from '@presentation/components/common/NeonButton'
import { NeonInput } from '@presentation/components/common/NeonInput'
import { useAuth } from '@presentation/hooks/useAuth'
import { getErrorMessage } from '@presentation/utils/getErrorMessage'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      assertPasswordsMatch(password, confirmPassword)
      await register({ name, email, password })
      navigate('/login', {
        replace: true,
        state: { message: 'Cuenta creada. Inicia sesión para continuar.' },
      })
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <AuthCard title="Crear cuenta" subtitle="Únete a NutriChef AI">
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {error ? (
            <div className="auth-alert auth-alert--error" role="alert">
              {error}
            </div>
          ) : null}

          <NeonInput
            id="register-name"
            label="Nombre"
            type="text"
            autoComplete="name"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <NeonInput
            id="register-email"
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <NeonInput
            id="register-password"
            label="Contraseña"
            type="password"
            autoComplete="new-password"
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />

          <NeonInput
            id="register-confirm-password"
            label="Confirmar contraseña"
            type="password"
            autoComplete="new-password"
            placeholder="Repite tu contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
          />

          <div className="auth-form__actions">
            <NeonButton type="submit" disabled={loading}>
              {loading ? 'Registrando…' : 'Registrarse'}
            </NeonButton>
          </div>

          <p className="auth-form__footer">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  )
}
