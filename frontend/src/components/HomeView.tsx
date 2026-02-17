import { useEffect, useState } from 'react';
import { Title, Text, Stack, Paper } from '@mantine/core';
import { GetHomeInfo } from '@app';
import { app } from '@models';

export function HomeView() {
  const [info, setInfo] = useState<app.HomeInfo | null>(null);

  useEffect(() => {
    GetHomeInfo().then(setInfo);
  }, []);

  if (!info) return null;

  return (
    <Stack gap="lg">
      <Title order={1}>{info.title}</Title>
      <Text size="lg" c="dimmed" fs="italic">
        {info.subtitle}
      </Text>
      <Paper p="xl" withBorder>
        <Text size="md" lh={1.7}>
          {info.body}
        </Text>
      </Paper>
    </Stack>
  );
}
