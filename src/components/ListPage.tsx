import { useLocation } from 'react-router'
import { useGithubCommits } from '@/hooks/useGithubCommits'
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'

import get from 'lodash.get'

const ROW_MODEL = [
  'commit.message',
  'commit.author.name',
  'commit.author.date'
] as const

const HEADERS_MAP = {
  'commit.message': 'Commit message',
  'commit.author.name': 'Author name',
  'commit.author.date': 'Commit date'
}

export const ListPage = () => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const owner = params.get('owner')
  const repo = params.get('repo')

  const { data } = useGithubCommits(owner, repo)

  if (!data) {
    return null
  }

  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Commits List</TableCaption>
        <Thead>
          <Tr>
            {ROW_MODEL.map((key) => (
              <Th key={key}>{HEADERS_MAP[key]}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item.sha}>
              {ROW_MODEL.map((key) => (
                <Td key={key}>{get(item, key)}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
