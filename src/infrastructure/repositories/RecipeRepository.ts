import type { IHttpClient } from '@domain/IPatterns'
import { RecipeDetail, RecipeSummary } from '@domain/entities/Recipe'
import type { IRecipeRepository } from '@domain/interfaces/IRecipeRepository'
import type { CreateRecipeRequest } from '@domain/Request/RecipeRequest'
import type {
  CreateRecipeResponse,
  DeleteRecipeResponse,
  GetRecipeByIdResponse,
  ListRecipesResponse,
} from '@domain/Response/RecipeResponse'
import { API_PATHS } from '@infrastructure/api/apiPaths'
import { parseApiResponse } from '@infrastructure/api/parseApiResponse'

export class RecipeRepository implements IRecipeRepository {
  private readonly httpClient: IHttpClient

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient
  }

  async create(request: CreateRecipeRequest): Promise<RecipeDetail> {
    const response = await this.httpClient.POST(API_PATHS.RECIPES.BASE, request)
    const data = await parseApiResponse<CreateRecipeResponse>(response)
    return RecipeDetail.fromApi(data)
  }

  async list(): Promise<RecipeSummary[]> {
    const response = await this.httpClient.GET(API_PATHS.RECIPES.BASE)
    const data = await parseApiResponse<ListRecipesResponse>(response)
    return data.map(RecipeSummary.fromApi)
  }

  async getById(recipeId: string): Promise<RecipeDetail> {
    const response = await this.httpClient.GET(API_PATHS.RECIPES.BY_ID(recipeId))
    const data = await parseApiResponse<GetRecipeByIdResponse>(response)
    return RecipeDetail.fromApi(data)
  }

  deleteById(recipeId: string): Promise<DeleteRecipeResponse> {
    return this.httpClient
      .DELETE(API_PATHS.RECIPES.BY_ID(recipeId))
      .then((response) => parseApiResponse<DeleteRecipeResponse>(response))
  }
}
