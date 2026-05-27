import type { ReactNode } from 'react'

type AuthLayoutProps = {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="auth-layout">
      <div className="auth-layout__grid" aria-hidden="true" />
      <div className="auth-layout__glow" aria-hidden="true" />
      <div className="auth-layout__content">
        <header className="auth-layout__brand">
          <h1 className="auth-layout__logo">NutriChef AI</h1>
          <p className="auth-layout__tagline">Nutrición inteligente del futuro</p>
        </header>
        {children}
      </div>
    </div>
  )
}
