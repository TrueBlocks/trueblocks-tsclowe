import { useEffect, useState } from 'react';
import { Title, Stack, Table } from '@mantine/core';
import { GetInventions } from '@app';
import { app } from '@models';

export function InventionsView() {
  const [inventions, setInventions] = useState<app.Invention[]>([]);

  useEffect(() => {
    GetInventions().then(setInventions);
  }, []);

  return (
    <Stack gap="lg">
      <Title order={1}>Inventions &amp; Patents</Title>
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Date</Table.Th>
            <Table.Th>Patent #</Table.Th>
            <Table.Th>Title</Table.Th>
            <Table.Th>City</Table.Th>
            <Table.Th>State</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {inventions.map((inv, i) => (
            <Table.Tr key={i}>
              <Table.Td>{inv.date}</Table.Td>
              <Table.Td>{inv.patent}</Table.Td>
              <Table.Td fw={500}>{inv.title}</Table.Td>
              <Table.Td>{inv.city}</Table.Td>
              <Table.Td>{inv.state}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Stack>
  );
}
