import { Stack, Title, Text, Paper } from "@mantine/core";

export function AboutPage() {
  return (
    <Stack gap="lg" p="md">
      <Title order={1}>About</Title>
      <Paper p="lg" withBorder>
        <Text size="lg">
          The Thaddeus S. C. Lowe Data Archive is presented for your enjoyment
          as a way to share our enthusiasm for this great man who also happens
          to have lived in a community near to where our offices are.
        </Text>
      </Paper>
    </Stack>
  );
}
