import type { NutritionTable } from '@domain/entities/Recipe'
import { NUTRITION_TABLE_KEYS } from '@domain/entities/Recipe'

export const RECIPE_NUTRITION_LABELS: Record<keyof NutritionTable, string> = {
  calories: 'Calorías',
  protein: 'Proteína',
  carbs: 'Carbohidratos',
  fat: 'Grasas',
  fiber: 'Fibra',
  sodium: 'Sodio',
}

export { NUTRITION_TABLE_KEYS }
