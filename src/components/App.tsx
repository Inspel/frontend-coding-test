import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Root } from '@/components/Root'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export const App = () => (
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Root />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
