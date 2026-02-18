import { Stack, Title, Text, Paper } from "@mantine/core";

export function HomePage() {
  return (
    <Stack gap="lg" p="md">
      <Title order={1}>Thaddeus S. C. Lowe Data Archive</Title>
      <Paper p="lg" withBorder>
        <Text size="lg">
          Thaddeus S. C. Lowe was the director of America&apos;s first air corp
          — nay, the world&apos;s first air corp. Professor TSC Lowe invented an
          Ice Machine and was the first person to ship Texas Long Horn beef from
          Texas directly to restaurants in New York. He was involved in the
          first building in the world to be fully lit by gaslight, owned many
          businesses and factories, was a friend to Presidents, an inventor with
          over 30 patents, and a resident of Norristown, PA.
        </Text>
      </Paper>
    </Stack>
  );
}
