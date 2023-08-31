import { commitListItemSchema } from '@/schemas'
import { z } from 'zod'

export type CommitListItemType = z.infer<typeof commitListItemSchema>
