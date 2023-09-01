import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input
} from '@chakra-ui/react'
import { useState } from 'react'
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
    <Box>
      <FormControl>
        <FormLabel>Owner</FormLabel>
        <Input
          type="text"
          onChange={(e) => setNewOwner(e.target.value)}
          value={newOwner}
        />
        <FormHelperText>Repo&apos;s owner</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Repo</FormLabel>
        <Input
          type="text"
          onChange={(e) => setNewRepo(e.target.value)}
          value={newRepo}
        />
        <FormHelperText>Repo&apos;s title</FormHelperText>
      </FormControl>
      <Button onClick={handleApplyParams} isDisabled={!newOwner || !newRepo}>
        Fetch commits
      </Button>
    </Box>
  )
}
