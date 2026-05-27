import type { IUseCase } from '@domain/IPatterns'
import type { RecipeDetail } from '@domain/entities/Recipe'
import type { IRecipeRepository } from '@domain/interfaces/IRecipeRepository'
import type { CreateRecipeRequest } from '@domain/Request/RecipeRequest'
import { normalizeIngredients } from './recipeValidation'

export class CreateRecipeUseCase implements IUseCase<CreateRecipeRequest, RecipeDetail> {
  private readonly recipeRepository: IRecipeRepository

  constructor(recipeRepository: IRecipeRepository) {
    this.recipeRepository = recipeRepository
  }

  async execute(input: CreateRecipeRequest): Promise<RecipeDetail> {
    const ingredients = normalizeIngredients(input.ingredients)
    return this.recipeRepository.create({ ingredients })
  }
}
