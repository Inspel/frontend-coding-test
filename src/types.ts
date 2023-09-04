import { commitListItemSchema, individualCommitSchema } from '@/api/schemas'
import { z } from 'zod'

export type CommitListItemType = z.infer<typeof commitListItemSchema>

export type IndividualCommitType = z.infer<typeof individualCommitSchema>
