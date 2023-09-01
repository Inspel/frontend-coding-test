import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Router } from '@/Router'

const queryClient = new QueryClient()

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Router />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
