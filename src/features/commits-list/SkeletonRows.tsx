import { Skeleton, Td, Tr } from '@chakra-ui/react'
import React from 'react'

export const SkeletonRows = ({
  count,
  columns
}: {
  count: number
  columns: number
}) => (
  <>
    {Array.from({ length: count }, (_, i) => (
      <Tr key={i} data-testid="skeleton-row">
        {Array.from({ length: columns }, (_, j) => (
          <Td key={j}>
            <Skeleton h="2em" />
          </Td>
        ))}
      </Tr>
    ))}
  </>
)
