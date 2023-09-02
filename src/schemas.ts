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

export const individualCommitSchema = commitListItemSchema.extend({
  author: z
    .object({
      avatar_url: z.string()
    })
    .nullable(),
  stats: z.object({
    additions: z.number(),
    deletions: z.number()
  }),
  files: z.array(
    z.object({
      filename: z.string(),
      status: z.string(),
      additions: z.number(),
      deletions: z.number()
    })
  )
})
