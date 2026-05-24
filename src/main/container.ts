/**
 * Composition root: instancia repositorios, casos de uso y dependencias.
 * La capa presentation solo consume lo que se exponga desde aquí (p. ej. context/hooks).
 */
export type AppContainer = Record<string, never>

export function createAppContainer(): AppContainer {
  return {}
}
