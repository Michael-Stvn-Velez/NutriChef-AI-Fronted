import type { RecipeDetail, RecipeSummary } from '../entities/Recipe'
import type { CreateRecipeRequest } from '../Request/RecipeRequest'
import type { DeleteRecipeResponse } from '../Response/RecipeResponse'

export interface IRecipeRepository {
  create(request: CreateRecipeRequest): Promise<RecipeDetail>
  list(): Promise<RecipeSummary[]>
  getById(recipeId: string): Promise<RecipeDetail>
  deleteById(recipeId: string): Promise<DeleteRecipeResponse>
}
