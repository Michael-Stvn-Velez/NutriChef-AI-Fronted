import { useMemo, type ReactNode } from 'react'
import { AppContainerContext } from '@presentation/context/AppContainerContext'
import { createAppContainer } from './container'

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const container = useMemo(() => createAppContainer(), [])

  return (
    <AppContainerContext.Provider value={container}>{children}</AppContainerContext.Provider>
  )
}
