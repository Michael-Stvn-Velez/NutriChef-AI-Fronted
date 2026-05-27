export type RecipeIngredient = {
  name: string
  quantity: string
}

export type NutritionTable = {
  calories: string
  protein: string
  carbs: string
  fat: string
  fiber: string
  sodium: string
}

export const NUTRITION_TABLE_KEYS = [
  'calories',
  'protein',
  'carbs',
  'fat',
  'fiber',
  'sodium',
] as const satisfies readonly (keyof NutritionTable)[]

export function hasNutritionData(table: NutritionTable | null | undefined): boolean {
  if (!table) {
    return false
  }

  return NUTRITION_TABLE_KEYS.some((key) => table[key].trim() !== '')
}

export type RecipeSummaryProps = {
  id: string
  title: string
  createdAt: Date
  updatedAt: Date
}

export type RecipeSummaryApiData = {
  id: string
  title: string
  createdAt: string | Date
  updatedAt: string | Date
}

export type RecipeDetailProps = RecipeSummaryProps & {
  userId: string
  ingredients: RecipeIngredient[]
  steps: string[]
  nutritionTable: NutritionTable
}

export type RecipeDetailApiData = {
  id: string
  userId: string
  title: string
  ingredients: RecipeIngredient[]
  steps: string[]
  nutritionTable: NutritionTable
  createdAt: string | Date
  updatedAt: string | Date
}

function toDate(value: string | Date): Date {
  return value instanceof Date ? value : new Date(value)
}

function normalizeNutritionTable(data: NutritionTable | unknown): NutritionTable {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return {
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      fiber: '',
      sodium: '',
    }
  }

  const source = data as Record<string, unknown>

  return {
    calories: String(source.calories ?? ''),
    protein: String(source.protein ?? ''),
    carbs: String(source.carbs ?? ''),
    fat: String(source.fat ?? ''),
    fiber: String(source.fiber ?? ''),
    sodium: String(source.sodium ?? ''),
  }
}

export class RecipeSummary {
  readonly id: string
  readonly title: string
  readonly createdAt: Date
  readonly updatedAt: Date

  constructor(params: RecipeSummaryProps) {
    this.id = params.id
    this.title = params.title
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
  }

  static fromApi(data: RecipeSummaryApiData): RecipeSummary {
    return new RecipeSummary({
      id: data.id,
      title: data.title,
      createdAt: toDate(data.createdAt),
      updatedAt: toDate(data.updatedAt),
    })
  }
}

export class RecipeDetail {
  readonly id: string
  readonly userId: string
  readonly title: string
  readonly ingredients: RecipeIngredient[]
  readonly steps: string[]
  readonly nutritionTable: NutritionTable
  readonly createdAt: Date
  readonly updatedAt: Date

  constructor(params: RecipeDetailProps) {
    this.id = params.id
    this.userId = params.userId
    this.title = params.title
    this.ingredients = params.ingredients
    this.steps = params.steps
    this.nutritionTable = params.nutritionTable
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
  }

  static fromApi(data: RecipeDetailApiData): RecipeDetail {
    return new RecipeDetail({
      id: data.id,
      userId: data.userId,
      title: data.title,
      ingredients: data.ingredients,
      steps: data.steps,
      nutritionTable: normalizeNutritionTable(data.nutritionTable),
      createdAt: toDate(data.createdAt),
      updatedAt: toDate(data.updatedAt),
    })
  }
}
