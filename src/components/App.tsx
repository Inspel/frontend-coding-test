import React from 'react'
import { Root } from '@/components/Root'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Root />
    </QueryClientProvider>
  </React.StrictMode>
)
