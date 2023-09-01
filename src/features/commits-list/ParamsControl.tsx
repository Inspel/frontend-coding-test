import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  VStack
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSearchParams } from '@/features/shared/useSearchParams'

export const ParamsControl = () => {
  const { params, owner, repo } = useSearchParams()

  const [newOwner, setNewOwner] = useState(owner || '')
  const [newRepo, setNewRepo] = useState(repo || '')

  const handleApplyParams = () => {
    params.set('owner', newOwner)
    params.set('repo', newRepo)

    location.search = params.toString()
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
