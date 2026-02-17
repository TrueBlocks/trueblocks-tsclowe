import { useState, useEffect } from "react";
import { Title, Text, Stack, Paper } from "@mantine/core";
import { GetHomeInfo } from "@app";
import { app } from "@models";

export function HomePage() {
  const [info, setInfo] = useState<app.HomeInfo | null>(null);

  useEffect(() => {
    GetHomeInfo().then(setInfo);
  }, []);

  if (!info) return null;

  return (
    <Stack gap="lg" p="md">
      <Title order={1}>{info.title}</Title>
      <Title order={3} c="dimmed">
        {info.subtitle}
      </Title>
      <Paper p="lg" withBorder>
        <Text size="lg" lh={1.7}>
          {info.body}
        </Text>
      </Paper>
    </Stack>
  );
}
