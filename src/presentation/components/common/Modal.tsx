import type { ReactNode } from 'react'

type ModalProps = {
  title: string
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function Modal({ title, isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
      <button className="modal__backdrop" aria-label="Cerrar" onClick={onClose} />
      <section className="modal__panel auth-card">
        <header className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button className="modal__close neon-button neon-button--ghost" type="button" onClick={onClose}>
            Cerrar
          </button>
        </header>
        <div className="modal__body">{children}</div>
      </section>
    </div>
  )
}

