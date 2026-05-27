import type { RecipeDetailApiData, RecipeSummaryApiData } from '../entities/Recipe'

export type CreateRecipeResponse = RecipeDetailApiData
export type ListRecipesResponse = RecipeSummaryApiData[]
export type GetRecipeByIdResponse = RecipeDetailApiData

export interface DeleteRecipeResponse {
  message: string
}
