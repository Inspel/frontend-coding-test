import {
  Avatar,
  Box,
  Card,
  CardBody,
  HStack,
  Skeleton,
  Text
} from '@chakra-ui/react'
import React from 'react'

type CommitMessageProps = {
  data?: {
    avatarUrl?: string
    name: string
    date: string
    message: string
  }
}

export const CommitMessage = ({ data }: CommitMessageProps) => {
  const { avatarUrl, name, date, message } = data || {}

  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      variant="outline"
      data-testid="commit-message"
    >
      <CardBody>
        <Skeleton isLoaded={!!data}>
          <HStack spacing={6} align="start">
            <HStack align="center" spacing={4} w="10%" minW={220}>
              <Avatar
                alignSelf="center"
                boxSize="50px"
                objectFit="cover"
                src={avatarUrl}
                name={name}
              />
              <Text>{name}</Text>
            </HStack>
            <Box>
              <Text fontSize="sm">{new Date(date || '').toLocaleString()}</Text>
              <Text>{message}</Text>
            </Box>
          </HStack>
        </Skeleton>
      </CardBody>
    </Card>
  )
}
