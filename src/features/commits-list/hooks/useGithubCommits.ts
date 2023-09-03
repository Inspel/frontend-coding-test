import { useInfiniteQuery } from 'react-query'
import { fetchCommits } from '@/api/fetchCommits'

const PAGE_SIZE = 30

export const useGithubCommits = (owner: string | null, repo: string | null) => {
  return useInfiniteQuery(
    ['commits', owner, repo],
    async ({ pageParam = 1 }) => {
      return fetchCommits(owner as string, repo as string, pageParam, PAGE_SIZE)
    },
    {
      enabled: !!owner && !!repo,
      getNextPageParam: (lastPage, pages) =>
        lastPage.length < PAGE_SIZE ? false : pages.length + 1
    }
  )
}
