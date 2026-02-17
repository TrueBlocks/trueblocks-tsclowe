import { useEffect, useState } from 'react';
import { Title, Stack, Table, Anchor } from '@mantine/core';
import { GetLinks } from '@app';
import { app } from '@models';

export function LinksView() {
  const [links, setLinks] = useState<app.Link[]>([]);

  useEffect(() => {
    GetLinks().then(setLinks);
  }, []);

  return (
    <Stack gap="lg">
      <Title order={1}>Links</Title>
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>URL</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {links.map((link, i) => (
            <Table.Tr key={i}>
              <Table.Td fw={500}>{link.title}</Table.Td>
              <Table.Td>
                <Anchor href={link.url} target="_blank" rel="noopener noreferrer" size="sm">
                  {link.url}
                </Anchor>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Stack>
  );
}
