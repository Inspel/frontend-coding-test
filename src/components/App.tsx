import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Root } from '@/components/Root'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />
  }
])
export const App = () => (
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
