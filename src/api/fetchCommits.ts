import { z } from 'zod'
import { CommitListItemType } from '@/types'
import { commitListItemSchema } from '@/schemas'

export const fetchCommits = async (
  owner: string,
  repo: string
): Promise<CommitListItemType[]> => {
  const headers = new Headers({
    Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`
  })

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/commits`,
    {
      headers,
      method: 'GET'
    }
  )

  if (!response.ok) {
    throw new Error(
      `Network response error: ${response.status} ${response.statusText}`
    )
  }

  const data = await response.json()

  return z.array(commitListItemSchema).parse(data)
}
