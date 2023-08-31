import React from 'react'
import { Root } from '@/components/Root'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ChakraProvider } from '@chakra-ui/react'

const queryClient = new QueryClient()

export const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Root />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
