import { hasNutritionData, type RecipeDetail } from '@domain/entities/Recipe'
import { Modal } from '@presentation/components/common/Modal'
import {
  NUTRITION_TABLE_KEYS,
  RECIPE_NUTRITION_LABELS,
} from '@presentation/components/recipes/recipeNutritionLabels'

type RecipeDetailModalProps = {
  isOpen: boolean
  onClose: () => void
  recipe: RecipeDetail | null
  loading?: boolean
  error?: string | null
}

export function RecipeDetailModal({ isOpen, onClose, recipe, loading, error }: RecipeDetailModalProps) {
  return (
    <Modal title="Detalle de receta" isOpen={isOpen} onClose={onClose}>
      {loading ? <p className="recipe-detail__status">Cargando…</p> : null}

      {error ? (
        <div className="auth-alert auth-alert--error" role="alert">
          {error}
        </div>
      ) : null}

      {!loading && recipe ? (
        <article className="recipe-detail">
          <header className="recipe-detail__header">
            <p className="recipe-detail__label">Receta</p>
            <h3 className="recipe-detail__title">{recipe.title}</h3>
          </header>

          <hr className="recipe-detail__divider" aria-hidden="true" />

          <section className="recipe-detail__section">
            <h4 className="recipe-detail__subtitle">Ingredientes</h4>
            <ul className="recipe-detail__list recipe-detail__list--bullets">
              {recipe.ingredients.map((item, index) => (
                <li key={index} className="recipe-detail__list-item">
                  <span className="recipe-detail__item-name">{item.name}</span>
                  <span className="recipe-detail__item-separator" aria-hidden="true">
                    —
                  </span>
                  <span className="recipe-detail__item-quantity">{item.quantity}</span>
                </li>
              ))}
            </ul>
          </section>

          <hr className="recipe-detail__divider" aria-hidden="true" />

          <section className="recipe-detail__section">
            <h4 className="recipe-detail__subtitle">Pasos</h4>
            <ol className="recipe-detail__list recipe-detail__list--numbered">
              {recipe.steps.map((step, index) => (
                <li key={index} className="recipe-detail__list-item">
                  {step}
                </li>
              ))}
            </ol>
          </section>

          {hasNutritionData(recipe.nutritionTable) ? (
            <>
              <hr className="recipe-detail__divider" aria-hidden="true" />

              <section className="recipe-detail__section">
                <h4 className="recipe-detail__subtitle">Información nutricional</h4>
                <dl className="recipe-detail__nutrition-grid">
                  {NUTRITION_TABLE_KEYS.map((key) => {
                    const value = recipe.nutritionTable[key].trim()
                    if (!value) {
                      return null
                    }

                    return (
                      <div key={key} className="recipe-detail__nutrition-item">
                        <dt className="recipe-detail__nutrition-label">
                          {RECIPE_NUTRITION_LABELS[key]}
                        </dt>
                        <dd className="recipe-detail__nutrition-value">{value}</dd>
                      </div>
                    )
                  })}
                </dl>
              </section>
            </>
          ) : null}
        </article>
      ) : null}
    </Modal>
  )
}
