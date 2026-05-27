import { NeonButton } from '@presentation/components/common/NeonButton'
import { CreateRecipeModal } from '@presentation/components/recipes/CreateRecipeModal'
import { RecipeDetailModal } from '@presentation/components/recipes/RecipeDetailModal'
import { useAuth } from '@presentation/hooks/useAuth'
import { useRecipes } from '@presentation/hooks/useRecipes'
import { getErrorMessage } from '@presentation/utils/getErrorMessage'
import type { RecipeDetail, RecipeSummary } from '@domain/entities/Recipe'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const { logout, isAuthenticated } = useAuth()
  const { list, create, getById, deleteById } = useRecipes()
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)
  const [recipes, setRecipes] = useState<RecipeSummary[]>([])
  const [loadingRecipes, setLoadingRecipes] = useState(false)
  const [recipesError, setRecipesError] = useState<string | null>(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState<string | null>(null)
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetail | null>(null)
  const [deleteArmedId, setDeleteArmedId] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    isAuthenticated().then((authenticated) => {
      if (cancelled) return

      if (!authenticated) {
        navigate('/login', { replace: true })
        return
      }

      setChecking(false)
      void refreshList()
    })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function refreshList() {
    setRecipesError(null)
    setLoadingRecipes(true)
    try {
      const data = await list()
      setRecipes(data)
    } catch (err) {
      setRecipesError(getErrorMessage(err))
    } finally {
      setLoadingRecipes(false)
    }
  }

  // La carga inicial se dispara tras validar sesión (arriba).

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  async function handleCreate(ingredients: { name: string; quantity: string }[]) {
    await create({ ingredients })
    await refreshList()
  }

  async function openRecipeDetail(recipeId: string) {
    setDetailOpen(true)
    setDetailLoading(true)
    setDetailError(null)
    setSelectedRecipe(null)

    try {
      const detail = await getById(recipeId)
      setSelectedRecipe(detail)
    } catch (err) {
      setDetailError(getErrorMessage(err))
    } finally {
      setDetailLoading(false)
    }
  }

  async function confirmDelete(recipeId: string) {
    await deleteById(recipeId)
    setDeleteArmedId(null)
    await refreshList()
  }

  if (checking) {
    return (
      <div className="auth-layout">
        <div className="auth-layout__grid" aria-hidden="true" />
        <p className="auth-layout__tagline">Cargando…</p>
      </div>
    )
  }

  return (
    <div className="home-page">
      <header className="home-page__header">
        <h1 className="home-page__brand">NutriChef AI</h1>
        <p className="home-page__user">
          Sesión activa · <strong>Sistema en línea</strong>
        </p>
        <div className="recipes-toolbar__actions">
          <NeonButton variant="ghost" className="home-page__logout" onClick={handleLogout}>
            Salir
          </NeonButton>
        </div>
      </header>

      <main className="home-page__main">
        <div className="auth-layout__grid" aria-hidden="true" />
        <section className="recipes-container">
          <div className="recipes-toolbar">
            <h2 className="recipes-toolbar__title">Tus recetas</h2>
            <div className="recipes-toolbar__actions">
              <NeonButton type="button" onClick={() => setCreateOpen(true)}>
                Crear
              </NeonButton>
              <NeonButton variant="ghost" type="button" onClick={refreshList} disabled={loadingRecipes}>
                {loadingRecipes ? 'Actualizando…' : 'Actualizar'}
              </NeonButton>
            </div>
          </div>

          {recipesError ? (
            <div className="auth-alert auth-alert--error" role="alert">
              {recipesError}
            </div>
          ) : null}

          {!loadingRecipes && recipes.length === 0 ? (
            <p className="recipes-empty">No existen recetas aún. Presiona “Crear” para generar la primera.</p>
          ) : null}

          <div className="recipes-list">
            {recipes.map((r) => (
              <article
                key={r.id}
                className="recipe-item"
                role="button"
                tabIndex={0}
                onClick={() => openRecipeDetail(r.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') openRecipeDetail(r.id)
                }}
              >
                <div>
                  <h3 className="recipe-item__title">{r.title}</h3>
                  <p className="recipe-item__meta">
                    Actualizada: {r.updatedAt.toLocaleString()}
                  </p>
                </div>

                <div
                  className="recipe-item__actions"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  {deleteArmedId === r.id ? (
                    <>
                      <NeonButton type="button" onClick={() => confirmDelete(r.id)}>
                        Confirmar
                      </NeonButton>
                      <NeonButton type="button" variant="ghost" onClick={() => setDeleteArmedId(null)}>
                        Cancelar
                      </NeonButton>
                    </>
                  ) : (
                    <NeonButton type="button" variant="ghost" onClick={() => setDeleteArmedId(r.id)}>
                      Eliminar
                    </NeonButton>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <CreateRecipeModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreate}
      />

      <RecipeDetailModal
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        recipe={selectedRecipe}
        loading={detailLoading}
        error={detailError}
      />
    </div>
  )
}
