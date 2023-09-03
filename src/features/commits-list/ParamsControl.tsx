import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'
import React, { FormEventHandler, useState } from 'react'
import { useAppSearchParams } from '@/features/shared/useAppSearchParams'
import { useNavigate } from 'react-router'
import { useGithubCommits } from '@/features/commits-list/hooks/useGithubCommits'

export const ParamsControl = () => {
  const { searchParams, owner, repo } = useAppSearchParams()
  const navigate = useNavigate()

  const { refetch, isLoading, isError } = useGithubCommits(owner, repo)

  const [newOwner, setNewOwner] = useState(owner || '')
  const [newRepo, setNewRepo] = useState(repo || '')

  const handleApplyParams: FormEventHandler = (e) => {
    e.preventDefault()

    if (isError) {
      refetch()
      return
    }

    searchParams.set('owner', newOwner)
    searchParams.set('repo', newRepo)
    navigate(`?${searchParams.toString()}`, { replace: true })
  }

  return (
    <VStack as="form" spacing={6} align="start" onSubmit={handleApplyParams}>
      <VStack spacing={4} align="start">
        <FormControl>
          <FormLabel>Owner</FormLabel>
          <Input
            type="text"
            value={newOwner}
            onChange={(e) => setNewOwner(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Repo</FormLabel>
          <Input
            type="text"
            value={newRepo}
            onChange={(e) => setNewRepo(e.target.value)}
          />
        </FormControl>
      </VStack>
      <Button type="submit" isDisabled={!newOwner || !newRepo || isLoading}>
        Fetch commits
      </Button>
    </VStack>
  )
}
