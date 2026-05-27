import { NeonButton } from '@presentation/components/common/NeonButton'
import { useAuth } from '@presentation/hooks/useAuth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const { logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    isAuthenticated().then((authenticated) => {
      if (!authenticated) {
        navigate('/login', { replace: true })
      } else {
        setChecking(false)
      }
    })
  }, [isAuthenticated, navigate])

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  if (checking) {
    return (
      <div className="auth-layout">
        <div className="auth-layout__grid" aria-hidden="true" />
        <p className="auth-layout__tagline">Cargando…</p>
      </div>
    )
  }

  return (
    <div className="home-page">
      <header className="home-page__header">
        <h1 className="home-page__brand">NutriChef AI</h1>
        <p className="home-page__user">
          Sesión activa · <strong>Sistema en línea</strong>
        </p>
        <NeonButton variant="ghost" className="home-page__logout" onClick={handleLogout}>
          Salir
        </NeonButton>
      </header>

      <main className="home-page__main">
        <div className="auth-layout__grid" aria-hidden="true" />
        <section className="home-page__hero auth-card">
          <h2>Bienvenido al futuro de tu nutrición</h2>
          <p>
            Próximamente podrás generar recetas con IA a partir de tus ingredientes. Tu sesión
            está protegida con tokens seguros.
          </p>
          <div className="home-page__actions">
            <NeonButton type="button" disabled>
              Recetas — pronto
            </NeonButton>
          </div>
        </section>
      </main>
    </div>
  )
}
