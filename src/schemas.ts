import { z } from 'zod'

export const commitListItemSchema = z.object({
  sha: z.string(),
  commit: z.object({
    author: z.object({
      name: z.string(),
      date: z.string()
    }),
    message: z.string()
  })
})

export const fetchCommitsResponse = z.array(commitListItemSchema)
