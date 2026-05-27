import type { IUseCase } from '@domain/IPatterns'
import type { RecipeSummary } from '@domain/entities/Recipe'
import type { IRecipeRepository } from '@domain/interfaces/IRecipeRepository'

export class ListRecipesUseCase implements IUseCase<undefined, RecipeSummary[]> {
  private readonly recipeRepository: IRecipeRepository

  constructor(recipeRepository: IRecipeRepository) {
    this.recipeRepository = recipeRepository
  }

  execute(): Promise<RecipeSummary[]> {
    return this.recipeRepository.list()
  }
}
