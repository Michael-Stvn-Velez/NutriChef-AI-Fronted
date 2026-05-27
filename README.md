# NutriChef AI — Frontend

Cliente web en **React 19**, **TypeScript** y **Vite** para NutriChef AI. Interfaz con tema oscuro y acentos verde neón. Organizado con **Clean Architecture** (domain, application, infrastructure, presentation).

## Características

- Registro, login, recuperación y restablecimiento de contraseña
- Listado de recetas del usuario autenticado
- Creación de recetas a partir de ingredientes (API + IA en backend)
- Modal de detalle: ingredientes, pasos e información nutricional
- Renovación automática del access token ante respuestas `401`
- Diseño responsive

## Stack

| Tecnología | Uso |
|------------|-----|
| React 19 | UI |
| TypeScript | Tipado estático |
| Vite 8 | Bundler y dev server |
| React Router 7 | Rutas |
| Axios | Cliente HTTP (capa infrastructure) |
| pnpm | Gestor de paquetes |

## Estructura del proyecto

```
frontend/
├── src/
│   ├── domain/           # Entidades, interfaces, requests/responses, errores
│   ├── application/      # Casos de uso y validaciones
│   ├── infrastructure/   # HTTP client, repositorios, storage, API paths
│   ├── presentation/     # Páginas, componentes, hooks, estilos, rutas
│   └── main/             # container.ts (DI), AppProvider, bootstrap
├── .env.example
├── vite.config.ts        # Alias y proxy /api → backend
└── package.json
```

## Alias de importación

| Alias | Ruta |
|-------|------|
| `@domain` | `src/domain` |
| `@application` | `src/application` |
| `@infrastructure` | `src/infrastructure` |
| `@presentation` | `src/presentation` |
| `@main` | `src/main` |

## Requisitos previos

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/) (recomendado; ver `packageManager` en `package.json`)
- Backend de NutriChef AI en ejecución (ver [backend/README.md](../backend/README.md))

## Instalación

```bash
cd frontend
pnpm install
```

## Variables de entorno

```bash
cp .env.example .env
```

| Variable | Descripción |
|----------|-------------|
| `VITE_API_BASE_URL` | URL base del API. En desarrollo: `http://localhost:3000/api` |

En desarrollo, Vite también expone un **proxy**: las peticiones a `/api` se reenvían a `http://localhost:3000`, por lo que puedes usar `/api` como base si lo configuras así.

## Ejecución

```bash
# Servidor de desarrollo (http://localhost:5173)
pnpm dev

# Build de producción
pnpm run build

# Vista previa del build
pnpm preview

# Linter
pnpm run lint
```

## Rutas

| Ruta | Página |
|------|--------|
| `/` | Home — listado y gestión de recetas |
| `/login` | Inicio de sesión |
| `/register` | Registro |
| `/forgot-password` | Solicitar código por correo |
| `/reset-password` | Restablecer contraseña con código |

## Flujo de capas (ejemplo: crear receta)

1. **Presentation**: `CreateRecipeModal` → hook `useRecipes` → caso de uso del contexto
2. **Application**: `CreateRecipeUseCase` valida ingredientes
3. **Infrastructure**: `RecipeRepository` → `AxiosHttpClient` → `POST /recipes`
4. **Domain**: `RecipeDetail.fromApi()` normaliza la respuesta (incl. `nutritionTable`)

La sesión (access + refresh token) se guarda en `sessionStorage` vía `SessionStorageSecurityStorage`.

## Estilos

- `global.css` — variables y base
- `auth.css` — auth y home de recetas
- `modal.css` — overlay y panel de modales
- `recipe-detail.css` — detalle de receta en modal

## Desarrollo junto al backend

1. Terminal 1 — backend en `http://localhost:3000`
2. Terminal 2 — frontend en `http://localhost:5173`
3. Asegúrate de que `VITE_API_BASE_URL` apunte al API del backend

## Decisiones técnicas

- **Casos de uso inyectados** en `AppContainerContext` desde `main/container.ts` (composition root).
- **Refresh en 401**: cola de peticiones en `tokenRefreshQueue` para no perder llamadas concurrentes.
- **Dominio tipado**: `NutritionTable` alineado con el objeto que devuelve el backend (no un array).
- **Presentation sin lógica de API directa**: las páginas consumen hooks y casos de uso, no axios.

## Licencia

Privado — proyecto de portafolio.
