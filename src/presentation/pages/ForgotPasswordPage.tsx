import { AuthCard } from '@presentation/components/common/AuthCard'
import { AuthLayout } from '@presentation/components/common/AuthLayout'
import { NeonButton } from '@presentation/components/common/NeonButton'
import { NeonInput } from '@presentation/components/common/NeonInput'
import { useAuth } from '@presentation/hooks/useAuth'
import { getErrorMessage } from '@presentation/utils/getErrorMessage'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      const result = await forgotPassword({ email })
      setSuccess(result.message)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <AuthCard
        title="Recuperar contraseña"
        subtitle="Te enviaremos un código de verificación a tu correo"
      >
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {error ? (
            <div className="auth-alert auth-alert--error" role="alert">
              {error}
            </div>
          ) : null}

          {success ? (
            <div className="auth-alert auth-alert--success" role="status">
              {success}
            </div>
          ) : null}

          <NeonInput
            id="forgot-email"
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="auth-form__actions auth-form__actions--row">
            <NeonButton type="submit" disabled={loading}>
              {loading ? 'Enviando…' : 'Enviar código'}
            </NeonButton>
            <NeonButton variant="ghost" type="button" onClick={() => navigate(-1)}>
              Volver
            </NeonButton>
          </div>

          <p className="auth-form__footer">
            ¿Recordaste tu contraseña? <Link to="/login">Inicia sesión</Link>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  )
}
