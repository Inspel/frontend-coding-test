export const ROW_MODEL = [
  'commit.message',
  'commit.author.name',
  'commit.author.date'
] as const

export type RowModelType = (typeof ROW_MODEL)[number]
