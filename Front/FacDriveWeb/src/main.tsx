import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { FormManagerProvider } from './context/FormManagerContext'
import { FormStateProvider } from './context/FormStateContext'
import { router } from './routes/router'
import { GlobalStyles } from './styles/global-styles'
import { theme } from './styles/theme'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyles />

    <FormStateProvider>
      <FormManagerProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
          </ThemeProvider>
        </QueryClientProvider>
      </FormManagerProvider>
    </FormStateProvider>
  </React.StrictMode>,
)
