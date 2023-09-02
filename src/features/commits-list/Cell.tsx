import { Td } from '@chakra-ui/react'
import { RowModelType } from '@/features/commits-list/constants'

type ListCellProps = {
  field: RowModelType
  data: string
}

export const Cell = ({ field, data }: ListCellProps) => {
  switch (field) {
    case 'commit.message':
      return <Td whiteSpace="normal">{data}</Td>
    case 'commit.author.date':
      return <Td>{new Date(data).toLocaleString()}</Td>
    default:
      return <Td>{data}</Td>
  }
}
