import { DomainError } from '@domain/errors/DomainError'
import type { RecipeIngredient } from '@domain/entities/Recipe'

export function normalizeIngredients(ingredients: RecipeIngredient[]): RecipeIngredient[] {
  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    throw new DomainError('Debes agregar al menos un ingrediente', 400)
  }

  return ingredients.map((item, index) => {
    const name = item?.name?.trim() ?? ''
    const quantity = item?.quantity?.trim() ?? ''

    if (!name) {
      throw new DomainError(`El nombre del ingrediente es obligatorio en la posición ${index}`, 400)
    }

    if (!quantity) {
      throw new DomainError(`La cantidad del ingrediente es obligatoria en la posición ${index}`, 400)
    }

    return { name, quantity }
  })
}
