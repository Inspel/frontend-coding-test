import {
  Avatar,
  Box,
  Card,
  CardBody,
  HStack,
  Skeleton,
  Text,
  VStack
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
    <Card direction={{ base: 'column', sm: 'row' }} variant="outline">
      <VStack align="start" spacing={4}>
        <CardBody>
          <Skeleton isLoaded={!!data}>
            <HStack spacing={6} align="start">
              <VStack align="start" spacing={6} w="10%" minW={220}>
                <HStack spacing={4}>
                  <Avatar
                    alignSelf="center"
                    boxSize="50px"
                    objectFit="cover"
                    src={avatarUrl}
                  />
                  <Text>{name}</Text>
                </HStack>
              </VStack>
              <Box>
                <Text fontSize="sm">
                  {new Date(date || '').toLocaleString()}
                </Text>
                <Text>{message}</Text>
              </Box>
            </HStack>
          </Skeleton>
        </CardBody>
      </VStack>
    </Card>
  )
}
