import {
  Container,
  Text,
  Link,
  Alert,
  AlertIcon,
  AlertTitle,
  VStack
} from '@chakra-ui/react'
import { useAppSearchParams } from '@/features/shared/appSearchParamsHelpers'
import { useQuery } from 'react-query'

import { fetchIndividualCommit } from '@/api/fetchIndividualCommit'
import React from 'react'
import { CommitMessage } from '@/features/commit-view/CommitMessage'
import { CommitChanges } from './CommitChanges'
import { ChangesTable } from '@/features/commit-view/ChangesTable'

export const CommitPage = () => {
  const { repo, owner, commit } = useAppSearchParams()

  const { data, isError } = useQuery(
    ['commit', owner, repo, commit],
    async () =>
      fetchIndividualCommit(owner as string, repo as string, commit as string),
    {
      enabled: !!commit && !!repo && !!owner
    }
  )

  let commitMessageData
  let commitChangesData

  if (data) {
    commitMessageData = {
      avatarUrl: data.author?.avatar_url,
      name: data.commit.author.name,
      date: data.commit.author.date,
      message: data.commit.message
    }
    commitChangesData = {
      additions: data.stats.additions,
      deletions: data.stats.deletions
    }
  }

  return (
    <Container
      maxW="container.xl"
      bgColor="white"
      pt={8}
      pb={8}
      display="flex"
      flexDir="column"
      gap={4}
    >
      <VStack
        gap={2}
        align="start"
        position="sticky"
        top={0}
        zIndex="docked"
        bgColor="white"
      >
        <Link href={`/?owner=${owner}&repo=${repo}`}>
          ← Back to Commits List
        </Link>
        {isError && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>
              An error occurred while fetching data.
            </AlertTitle>
          </Alert>
        )}
        <Text fontSize="2xl" fontWeight="bold">
          Commit Details
        </Text>
      </VStack>
      <CommitMessage data={commitMessageData} />
      <CommitChanges data={commitChangesData} />
      <ChangesTable files={data?.files} />
    </Container>
  )
}
