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

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      assertPasswordsMatch(newPassword, confirmPassword)
      const result = await resetPassword({ email, code, newPassword })
      setSuccess(result.message)

      setTimeout(() => {
        navigate('/login', { replace: true })
      }, 2000)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout>
      <AuthCard
        title="Restablecer contraseña"
        subtitle="Ingresa el código de 5 dígitos y tu nueva contraseña"
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
            id="reset-email"
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <NeonInput
            id="reset-code"
            label="Código"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="12345"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            maxLength={5}
            pattern="\d{5}"
          />

          <NeonInput
            id="reset-password"
            label="Nueva contraseña"
            type="password"
            autoComplete="new-password"
            placeholder="Mínimo 6 caracteres"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={6}
          />

          <NeonInput
            id="reset-confirm-password"
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
            <NeonButton type="submit" disabled={loading || Boolean(success)}>
              {loading ? 'Actualizando…' : 'Restablecer'}
            </NeonButton>
          </div>

          <p className="auth-form__footer">
            <Link to="/forgot-password">Reenviar código</Link>
            {' · '}
            <Link to="/login">Iniciar sesión</Link>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  )
}
