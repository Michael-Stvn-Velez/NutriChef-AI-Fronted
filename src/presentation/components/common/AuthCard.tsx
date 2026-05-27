import type { ReactNode } from 'react'

type AuthCardProps = {
  title: string
  subtitle?: string
  children: ReactNode
}

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <section className="auth-card">
      <h2 className="auth-card__title">{title}</h2>
      {subtitle ? <p className="auth-card__subtitle">{subtitle}</p> : null}
      {children}
    </section>
  )
}
