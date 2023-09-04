import {
  Box,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack
} from '@chakra-ui/react'
import { SkeletonRows } from '@/features/commits-list/SkeletonRows'
import React from 'react'
import { IndividualCommitType } from '@/types'

type ChangesTableProps = {
  files?: IndividualCommitType['files']
}

export const FilesTable = ({ files = [] }: ChangesTableProps) => (
  <VStack align="start" spacing={2} data-testid="changed-files">
    <Box>
      <Text fontWeight="bold">{`Changed Files${
        files.length ? `: ${files.length}` : ''
      }`}</Text>
    </Box>
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Filename</Th>
          <Th>Status</Th>
          <Th>Additions</Th>
          <Th>Deletions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {!files.length ? (
          <SkeletonRows count={3} columns={4} />
        ) : (
          files.map((file) => (
            <Tr key={file.filename}>
              <Td whiteSpace="normal">{file.filename}</Td>
              <Td>{file.status}</Td>
              <Td color="green">{file.additions}</Td>
              <Td color="red">{file.deletions}</Td>
            </Tr>
          ))
        )}
      </Tbody>
    </Table>
  </VStack>
)
