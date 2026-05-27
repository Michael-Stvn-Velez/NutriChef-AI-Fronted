import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@presentation/App'
import '@presentation/styles/global.css'
import { AppProvider } from './AppProvider'
import { BrowserRouter } from 'react-router-dom'

export function bootstrap(): void {
  const rootElement = document.getElementById('root')

  if (!rootElement) {
    throw new Error('No se encontró el elemento #root')
  }

  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <AppProvider>
          <App />
        </AppProvider>
      </BrowserRouter>
    </StrictMode>,
  )
}
