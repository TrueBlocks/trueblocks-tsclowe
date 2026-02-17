import { useEffect, useState } from 'react';
import { Title, Stack, Table } from '@mantine/core';
import { GetRealEstate } from '@app';
import { app } from '@models';

export function RealEstateView() {
  const [properties, setProperties] = useState<app.RealEstate[]>([]);

  useEffect(() => {
    GetRealEstate().then(setProperties);
  }, []);

  return (
    <Stack gap="lg">
      <Title order={1}>Real Estate</Title>
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Property</Table.Th>
            <Table.Th>Location</Table.Th>
            <Table.Th>Description</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {properties.map((prop, i) => (
            <Table.Tr key={i}>
              <Table.Td fw={500}>{prop.property}</Table.Td>
              <Table.Td>{prop.location}</Table.Td>
              <Table.Td>{prop.description}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Stack>
  );
}
