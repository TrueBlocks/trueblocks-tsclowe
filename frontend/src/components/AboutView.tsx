import { useEffect, useState } from 'react';
import { Title, Text, Stack, Paper } from '@mantine/core';
import { GetAboutInfo } from '@app';
import { app } from '@models';

export function AboutView() {
  const [info, setInfo] = useState<app.AboutInfo | null>(null);

  useEffect(() => {
    GetAboutInfo().then(setInfo);
  }, []);

  if (!info) return null;

  return (
    <Stack gap="lg">
      <Title order={1}>{info.title}</Title>
      <Paper p="xl" withBorder>
        <Text size="md" lh={1.7}>
          {info.description}
        </Text>
      </Paper>
    </Stack>
  );
}
