import type { IUseCase } from '@domain/IPatterns'
import type { IRecipeRepository } from '@domain/interfaces/IRecipeRepository'
import type { DeleteRecipeResponse } from '@domain/Response/RecipeResponse'

export class DeleteRecipeUseCase implements IUseCase<string, DeleteRecipeResponse> {
  private readonly recipeRepository: IRecipeRepository

  constructor(recipeRepository: IRecipeRepository) {
    this.recipeRepository = recipeRepository
  }

  execute(input: string): Promise<DeleteRecipeResponse> {
    return this.recipeRepository.deleteById(input)
  }
}
