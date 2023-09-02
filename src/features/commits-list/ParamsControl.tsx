import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'
import React, { FormEventHandler, useState } from 'react'
import { useAppsSearchParams } from '@/features/shared/useAppsSearchParams'
import { useNavigate } from 'react-router'

export const ParamsControl = () => {
  const { searchParams, owner, repo } = useAppsSearchParams()
  const navigate = useNavigate()

  const [newOwner, setNewOwner] = useState(owner || '')
  const [newRepo, setNewRepo] = useState(repo || '')

  const handleApplyParams: FormEventHandler = (e) => {
    e.preventDefault()
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
      <Button type="submit" isDisabled={!newOwner || !newRepo}>
        Fetch commits
      </Button>
    </VStack>
  )
}
