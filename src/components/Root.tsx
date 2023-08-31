import { Route, Routes } from 'react-router'
import { ListPage } from '@/components/ListPage'
import { CommitPage } from '@/components/CommitPage'
import { ErrorPage } from '@/components/ErrorPage'

export const Root = () => (
  <Routes>
    <Route path="/" element={<ListPage />} />
    <Route path="/commit" element={<CommitPage />} />
    <Route path="*" element={<ErrorPage />} />
  </Routes>
)
