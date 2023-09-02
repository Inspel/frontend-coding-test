import { individualCommitSchema } from '@/schemas'
import { IndividualCommitType } from '@/types'

export const fetchIndividualCommit = async (
  owner: string,
  repo: string,
  sha: string
): Promise<IndividualCommitType> => {
  const headers = new Headers({
    Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`
  })

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/commits/${sha}`,
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

  return individualCommitSchema.parse(data)
}
