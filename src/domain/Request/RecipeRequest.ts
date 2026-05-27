import type { RecipeIngredient } from '../entities/Recipe'

export interface CreateRecipeRequest {
  ingredients: RecipeIngredient[]
}
