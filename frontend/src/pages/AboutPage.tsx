import { useState, useEffect } from "react";
import { Title, Text, Stack, Paper } from "@mantine/core";
import { GetAboutInfo } from "@app";
import { app } from "@models";

export function AboutPage() {
  const [info, setInfo] = useState<app.AboutInfo | null>(null);

  useEffect(() => {
    GetAboutInfo().then(setInfo);
  }, []);

  if (!info) return null;

  return (
    <Stack gap="lg" p="md">
      <Title order={1}>{info.title}</Title>
      <Paper p="lg" withBorder>
        <Text size="lg" lh={1.7}>
          {info.description}
        </Text>
      </Paper>
    </Stack>
  );
}
