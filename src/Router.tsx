import { CommitsListPage } from '@/features/commits-list/CommitsListPage'
import { CommitPage } from '@/features/commit-view/CommitPage'
import { ErrorPage } from '@/features/ErrorPage'
import {
  createBrowserRouter,
  Outlet,
  redirect,
  RouterProvider
} from 'react-router-dom'
import React from 'react'
import { getAppSearchParams } from '@/features/shared/appSearchParamsHelpers'

const router = createBrowserRouter([
  {
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <CommitsListPage />
      },
      {
        path: 'commit',
        element: <CommitPage />,
        loader: ({ request }) => {
          const { searchParams } = new URL(request.url)
          const { owner, repo, commit } = getAppSearchParams(searchParams)
          if (!owner || !repo || !commit) {
            return redirect('/')
          }

          return null
        }
      }
    ]
  }
])

export const Router = () => <RouterProvider router={router} />
