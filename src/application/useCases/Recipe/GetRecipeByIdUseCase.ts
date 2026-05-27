import type { IUseCase } from '@domain/IPatterns'
import type { RecipeDetail } from '@domain/entities/Recipe'
import type { IRecipeRepository } from '@domain/interfaces/IRecipeRepository'

export class GetRecipeByIdUseCase implements IUseCase<string, RecipeDetail> {
  private readonly recipeRepository: IRecipeRepository

  constructor(recipeRepository: IRecipeRepository) {
    this.recipeRepository = recipeRepository
  }

  execute(input: string): Promise<RecipeDetail> {
    return this.recipeRepository.getById(input)
  }
}
