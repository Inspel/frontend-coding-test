import React from 'react'
import { useNavigate } from 'react-router'
import {
  Alert,
  AlertIcon,
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
import { useGithubCommits } from '@/features/commits-list/hooks/useGithubCommits'
import { SkeletonRows } from '@/features/commits-list/SkeletonRows'

const HEADERS_MAP: Record<RowModelType, string> = {
  'commit.message': 'Commit message',
  'commit.author.name': 'Author name',
  'commit.author.date': 'Commit date'
}

export const CommitsListTable = () => {
  const navigate = useNavigate()
  const { owner, repo, searchParams } = useAppsSearchParams()
  const { data = [], isLoading, isError, error } = useGithubCommits(owner, repo)

  const handleRowClick = (sha: string) => {
    searchParams.set('commit', sha)
    navigate(`/commit?${searchParams.toString()}`)
  }

  return (
    <TableContainer w="100%" overflowY="auto">
      {isError && (
        <Alert status="error">
          <AlertIcon />
          {error ? (error as Error).message : 'An unknown error occurred'}
        </Alert>
      )}
      <Table variant="simple">
        <Thead position="sticky" top={0} zIndex="docked" bgColor="white">
          <Tr>
            {ROW_MODEL.map((key) => (
              <Th key={key}>{HEADERS_MAP[key]}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            <SkeletonRows count={3} columns={3} />
          ) : (
            data.map((item) => (
              <Tr
                key={item.sha as string}
                onClick={() => handleRowClick(item.sha)}
                tabIndex={0}
                role="button"
                _hover={{ bg: 'gray.100' }}
                _focus={{
                  boxShadow: 'outline',
                  bg: 'gray.100',
                  outline: 'none'
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    handleRowClick(item.sha)
                  }
                }}
              >
                {ROW_MODEL.map((key) => (
                  <Cell key={key} field={key} data={get(item, key)} />
                ))}
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
