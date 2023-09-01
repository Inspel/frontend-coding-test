import { Box, Container } from '@chakra-ui/react'

import { CommitsListTable } from '@/features/commits-list/CommitsListTable'

import { ParamsControl } from '@/features/commits-list/ParamsControl'

export const CommitsListPage = () => {
  return (
    <Container
      maxW="container.xl"
      maxH="100vh"
      display="flex"
      gap={8}
      bgColor="white"
      pt={8}
      pb={8}
    >
      <Box minW="17%">
        <ParamsControl />
      </Box>
      <CommitsListTable />
    </Container>
  )
}
