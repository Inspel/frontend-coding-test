import { useRouteError } from 'react-router-dom'
import { Container, Heading, Text } from '@chakra-ui/react'

export const ErrorPage = () => {
  const error = useRouteError() as Record<'statusText' | 'message', string>
  console.error(error)

  return (
    <Container id="error-page">
      <Heading as="h1" size="2xl">
        Oops!
      </Heading>
      <Text size="xl">Sorry, an unexpected error has occurred.</Text>
      <Text size="xl">
        <i>{error.statusText || error.message}</i>
      </Text>
    </Container>
  )
}
