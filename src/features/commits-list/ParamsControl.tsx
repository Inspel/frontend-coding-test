import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAppsSearchParams } from '@/features/shared/useAppsSearchParams'
import { useNavigate } from 'react-router'

export const ParamsControl = () => {
  const { searchParams, owner, repo } = useAppsSearchParams()
  const navigate = useNavigate()

  const [newOwner, setNewOwner] = useState(owner || '')
  const [newRepo, setNewRepo] = useState(repo || '')

  const handleApplyParams = () => {
    searchParams.set('owner', newOwner)
    searchParams.set('repo', newRepo)

    navigate(`?${searchParams.toString()}`, { replace: true })
  }

  return (
    <VStack spacing={6} align="start">
      <VStack spacing={4} align="start">
        <FormControl>
          <FormLabel>Owner</FormLabel>
          <Input
            type="text"
            onChange={(e) => setNewOwner(e.target.value)}
            value={newOwner}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Repo</FormLabel>
          <Input
            type="text"
            onChange={(e) => setNewRepo(e.target.value)}
            value={newRepo}
          />
        </FormControl>
      </VStack>
      <Button onClick={handleApplyParams} isDisabled={!newOwner || !newRepo}>
        Fetch commits
      </Button>
    </VStack>
  )
}
