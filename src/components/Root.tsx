import { ListPage } from '@/components/ListPage'
import { CommitPage } from '@/components/CommitPage'
import { ErrorPage } from '@/components/ErrorPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from 'react'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ListPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/commit',
        element: <CommitPage />
      }
    ]
  }
])

export const Root = () => <RouterProvider router={router} />
