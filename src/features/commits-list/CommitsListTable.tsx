import { useNavigate } from 'react-router'
import { useGithubCommits } from '@/features/commits-list/hooks/useGithubCommits'
import {
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'

import get from 'lodash.get'
import { Cell } from '@/features/commits-list/Cell'
import { ROW_MODEL, RowModelType } from '@/features/commits-list/constants'
import { useAppsSearchParams } from '@/features/shared/useAppsSearchParams'

const HEADERS_MAP: Record<RowModelType, string> = {
  'commit.message': 'Commit message',
  'commit.author.name': 'Author name',
  'commit.author.date': 'Commit date'
}

export const CommitsListTable = () => {
  const navigate = useNavigate()
  const { owner, repo, searchParams } = useAppsSearchParams()

  const { data, isLoading } = useGithubCommits(owner, repo)

  if (isLoading) {
    return (
      <Stack>
        <Skeleton height="3rem" />
        <Skeleton height="3rem" />
        <Skeleton height="3rem" />
        <Skeleton height="3rem" />
      </Stack>
    )
  }

  if (!data) {
    return null
  }

  return (
    <TableContainer overflowY="auto">
      <Table variant="simple">
        <Thead position="sticky" top={0} zIndex="docked" bgColor="white">
          <Tr>
            {ROW_MODEL.map((key) => (
              <Th key={key}>{HEADERS_MAP[key]}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr
              key={item.sha}
              onClick={() => {
                searchParams.set('commit', item.sha)
                navigate(`/commit?${searchParams.toString()}`)
              }}
            >
              {ROW_MODEL.map((key) => (
                <Cell key={key} field={key} data={get(item, key)} />
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
