import { Container } from '@chakra-ui/react'

import { CommitsListTable } from '@/features/commits-list/CommitsListTable'

import { ParamsControl } from '@/features/commits-list/ParamsControl'

export const CommitsListPage = () => {
  return (
    <Container maxW="container.xl">
      <ParamsControl />
      <CommitsListTable />
    </Container>
  )
}
