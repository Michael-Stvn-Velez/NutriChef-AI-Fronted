import type { CreateRecipeUseCase } from '@application/useCases/Recipe/CreateRecipeUseCase'
import type { DeleteRecipeUseCase } from '@application/useCases/Recipe/DeleteRecipeUseCase'
import type { GetRecipeByIdUseCase } from '@application/useCases/Recipe/GetRecipeByIdUseCase'
import { useAppContainer } from '@presentation/context/AppContainerContext'

export function useRecipes() {
  const { createRecipeUseCase, listRecipesUseCase, getRecipeByIdUseCase, deleteRecipeUseCase } =
    useAppContainer()

  return {
    create: (input: Parameters<CreateRecipeUseCase['execute']>[0]) =>
      createRecipeUseCase.execute(input),
    list: () => listRecipesUseCase.execute(),
    getById: (input: Parameters<GetRecipeByIdUseCase['execute']>[0]) =>
      getRecipeByIdUseCase.execute(input),
    deleteById: (input: Parameters<DeleteRecipeUseCase['execute']>[0]) =>
      deleteRecipeUseCase.execute(input),
  }
}

