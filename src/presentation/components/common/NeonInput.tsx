import type { InputHTMLAttributes } from 'react'

type NeonInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  id: string
}

export function NeonInput({ label, id, className, ...props }: NeonInputProps) {
  return (
    <div className="auth-form__field">
      <label className="auth-form__label" htmlFor={id}>
        {label}
      </label>
      <input id={id} className={`auth-form__input${className ? ` ${className}` : ''}`} {...props} />
    </div>
  )
}
