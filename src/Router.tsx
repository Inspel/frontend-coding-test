import { CommitsListPage } from '@/features/commits-list/CommitsListPage'
import { CommitPage } from '@/features/commit-view/CommitPage'
import { ErrorPage } from '@/features/ErrorPage'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import React from 'react'

const router = createBrowserRouter([
  {
    element: <Outlet />,
    children: [
      {
        path: '/',
        element: <CommitsListPage />,
        errorElement: <ErrorPage />
      },
      {
        path: 'commit',
        element: <CommitPage />
      }
    ]
  }
])

export const Router = () => <RouterProvider router={router} />
