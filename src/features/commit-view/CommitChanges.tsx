import { Card, CardBody, HStack, Skeleton, Text } from '@chakra-ui/react'
import React from 'react'

type CommitChangesProps = {
  data?: {
    additions: number
    deletions: number
  }
}

export const CommitChanges = ({ data }: CommitChangesProps) => {
  const { additions, deletions } = data || {}
  return (
    <Card variant="outline">
      <CardBody>
        <Skeleton isLoaded={!!data}>
          <HStack spacing={4}>
            <Text>
              <Text as="span">Additions: </Text>
              <Text as="span" color="green">
                {additions}
              </Text>
            </Text>
            <Text>
              <Text as="span">Deletions: </Text>
              <Text as="span" color="red">
                {deletions}
              </Text>
            </Text>
          </HStack>
        </Skeleton>
      </CardBody>
    </Card>
  )
}
