import { useSearchParams } from 'react-router-dom'

export const useAppsSearchParams = () => {
  const [searchParams] = useSearchParams()
  const owner = searchParams.get('owner')
  const repo = searchParams.get('repo')
  const commit = searchParams.get('commit')

  return { owner, repo, commit, searchParams }
}
