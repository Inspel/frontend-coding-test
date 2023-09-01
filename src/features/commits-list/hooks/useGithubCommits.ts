import { useQuery } from 'react-query'
import { fetchCommits } from '@/api/fetchCommits'

export const useGithubCommits = (owner: string | null, repo: string | null) =>
  useQuery(
    ['commits', owner, repo],
    () => fetchCommits(owner as string, repo as string),
    {
      enabled: !!owner && !!repo
    }
  )
