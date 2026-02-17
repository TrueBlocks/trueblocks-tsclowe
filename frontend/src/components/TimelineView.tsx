import { useEffect, useState } from 'react';
import { Title, Stack, Table } from '@mantine/core';
import { GetTimeline } from '@app';
import { app } from '@models';

export function TimelineView() {
  const [events, setEvents] = useState<app.TimelineEvent[]>([]);

  useEffect(() => {
    GetTimeline().then(setEvents);
  }, []);

  return (
    <Stack gap="lg">
      <Title order={1}>Timeline</Title>
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={150}>Date</Table.Th>
            <Table.Th>Event</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {events.map((event, i) => (
            <Table.Tr key={i}>
              <Table.Td fw={500}>{event.date}</Table.Td>
              <Table.Td>{event.event}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Stack>
  );
}
