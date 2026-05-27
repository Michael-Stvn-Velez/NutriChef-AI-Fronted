import type { RecipeIngredient } from '@domain/entities/Recipe'
import { NeonButton } from '@presentation/components/common/NeonButton'
import { NeonInput } from '@presentation/components/common/NeonInput'
import { Modal } from '@presentation/components/common/Modal'
import { getErrorMessage } from '@presentation/utils/getErrorMessage'
import type { FormEvent } from 'react'
import { useState } from 'react'

type CreateRecipeModalProps = {
  isOpen: boolean
  onClose: () => void
  onCreate: (ingredients: RecipeIngredient[]) => Promise<void>
}

const emptyIngredient: RecipeIngredient = { name: '', quantity: '' }

export function CreateRecipeModal({ isOpen, onClose, onCreate }: CreateRecipeModalProps) {
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>([{ ...emptyIngredient }])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canRemove = ingredients.length > 1

  function updateIngredient(index: number, patch: Partial<RecipeIngredient>) {
    setIngredients((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    )
  }

  function addIngredient() {
    setIngredients((prev) => [...prev, { ...emptyIngredient }])
  }

  function removeIngredient(index: number) {
    setIngredients((prev) => prev.filter((_, i) => i !== index))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await onCreate(ingredients)
      onClose()
      setIngredients([{ ...emptyIngredient }])
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal title="Crear receta" isOpen={isOpen} onClose={onClose}>
      <p className="recipes-help">
        Agrega tus ingredientes y deja que la IA genere una receta completa.
      </p>

      {error ? (
        <div className="auth-alert auth-alert--error" role="alert">
          {error}
        </div>
      ) : null}

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <div className="recipes-ingredients">
          {ingredients.map((item, index) => (
            <div className="recipes-ingredients__row" key={index}>
              <NeonInput
                id={`ingredient-name-${index}`}
                label={`Ingrediente ${index + 1}`}
                type="text"
                placeholder="Ej: Pechuga de pollo"
                value={item.name}
                onChange={(e) => updateIngredient(index, { name: e.target.value })}
                required
              />
              <NeonInput
                id={`ingredient-qty-${index}`}
                label="Cantidad"
                type="text"
                placeholder="Ej: 200g"
                value={item.quantity}
                onChange={(e) => updateIngredient(index, { quantity: e.target.value })}
                required
              />
              <div className="recipes-ingredients__row-actions">
                <NeonButton type="button" variant="ghost" onClick={addIngredient}>
                  + Agregar
                </NeonButton>
                <NeonButton
                  type="button"
                  variant="ghost"
                  disabled={!canRemove}
                  onClick={() => removeIngredient(index)}
                >
                  – Quitar
                </NeonButton>
              </div>
            </div>
          ))}
        </div>

        <div className="auth-form__actions auth-form__actions--row">
          <NeonButton type="submit" disabled={loading}>
            {loading ? 'Generando…' : 'Crear'}
          </NeonButton>
          <NeonButton type="button" variant="ghost" onClick={onClose} disabled={loading}>
            Cancelar
          </NeonButton>
        </div>
      </form>
    </Modal>
  )
}

