export const API_PATHS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  RECIPES: {
    BASE: '/recipes',
    BY_ID: (recipeId: string) => `/recipes/${recipeId}`,
  },
} as const
