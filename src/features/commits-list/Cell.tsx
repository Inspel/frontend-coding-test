import { Td, Text } from '@chakra-ui/react'
import { RowModelType } from '@/features/commits-list/constants'

type ListCellProps = {
  field: RowModelType
  data: string
}

const renderContent = ({ field, data }: ListCellProps) => {
  switch (field) {
    case 'commit.message':
      return <Text whiteSpace="normal">{data}</Text>
    case 'commit.author.date':
      return <Text>{new Date(data).toLocaleString()}</Text>
    default:
      return <Text>{data}</Text>
  }
}

export const Cell = (props: ListCellProps) => <Td>{renderContent(props)}</Td>
