import { useState, useEffect, useCallback } from "react";
import { Stack, Loader, Flex, Text, Group } from "@mantine/core";
import { IconTimeline } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useHotkeys } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { LogErr } from "@/utils";
import { useNavigation } from "@trueblocks/scaffold";
import {
  GetTimelineEvent,
  UpdateTimelineEvent,
  DeleteTimelineEvent,
} from "@app";
import { db } from "@models";
import { DetailHeader, EditableField } from "@trueblocks/ui";

interface TimelineDetailProps {
  itemId: number;
  filteredItems: db.TimelineEvent[];
}

export function TimelineDetail({ itemId, filteredItems }: TimelineDetailProps) {
  const navigate = useNavigate();
  const {
    stack,
    currentLevel,
    currentIndex,
    hasPrev,
    hasNext,
    setItems,
    setCurrentId,
  } = useNavigation();
  const [item, setItem] = useState<db.TimelineEvent | null>(null);
  const [loading, setLoading] = useState(true);

  const stackLength = stack.length;
  useEffect(() => {
    if (stackLength === 0 && filteredItems.length > 0) {
      setItems(
        "timeline",
        filteredItems.map((i) => ({ id: i.id })),
        itemId,
      );
    }
  }, [stackLength, filteredItems, itemId, setItems]);

  useEffect(() => {
    setCurrentId(itemId);
  }, [itemId, setCurrentId]);

  const navigateToItem = useCallback(
    (newId: number) => navigate(`/timeline/${newId}`),
    [navigate],
  );

  const handlePrev = useCallback(() => {
    if (!hasPrev || !currentLevel) return;
    const prevItem = currentLevel.items[currentIndex - 1] as
      | { id: number }
      | undefined;
    if (prevItem) navigateToItem(prevItem.id);
  }, [hasPrev, currentLevel, currentIndex, navigateToItem]);

  const handleNext = useCallback(() => {
    if (!hasNext || !currentLevel) return;
    const nextItem = currentLevel.items[currentIndex + 1] as
      | { id: number }
      | undefined;
    if (nextItem) navigateToItem(nextItem.id);
  }, [hasNext, currentLevel, currentIndex, navigateToItem]);

  const handleReturnToList = useCallback(
    () => navigate("/timeline"),
    [navigate],
  );

  useHotkeys([
    [
      "ArrowRight",
      (e) => {
        const t = e.target as HTMLElement;
        if (t.tagName !== "INPUT" && t.tagName !== "TEXTAREA") handleNext();
      },
      { preventDefault: false },
    ],
    [
      "ArrowLeft",
      (e) => {
        const t = e.target as HTMLElement;
        if (t.tagName !== "INPUT" && t.tagName !== "TEXTAREA") handlePrev();
      },
      { preventDefault: false },
    ],
    ["mod+shift+ArrowLeft", handleReturnToList],
  ]);

  const loadData = useCallback(async () => {
    if (!itemId) return;
    setLoading(true);
    try {
      setItem(await GetTimelineEvent(itemId));
    } catch (err) {
      LogErr("Failed to load event:", err);
    } finally {
      setLoading(false);
    }
  }, [itemId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleFieldChange = useCallback(
    async (field: string, value: string) => {
      if (!item) return;
      const updated = { ...item, [field]: value };
      try {
        await UpdateTimelineEvent(updated as db.TimelineEvent);
        setItem(updated as db.TimelineEvent);
      } catch (err) {
        LogErr(`Failed to update ${field}:`, err);
        notifications.show({
          message: `Failed to update ${field}`,
          color: "red",
          autoClose: 3000,
        });
      }
    },
    [item],
  );

  const handleDelete = useCallback(async () => {
    if (!item) return;
    try {
      await DeleteTimelineEvent(item.id);
      notifications.show({
        message: "Event deleted",
        color: "green",
        autoClose: 2000,
      });
      navigate("/timeline");
    } catch (err) {
      LogErr("Failed to delete:", err);
      notifications.show({
        message: "Delete failed",
        color: "red",
        autoClose: 3000,
      });
    }
  }, [item, navigate]);

  if (loading)
    return (
      <Flex justify="center" align="center" h="100%">
        <Loader />
      </Flex>
    );
  if (!item)
    return (
      <Flex justify="center" align="center" h="100%">
        <Text c="dimmed">Event not found</Text>
      </Flex>
    );

  return (
    <Stack gap="lg">
      <DetailHeader
        hasPrev={hasPrev}
        hasNext={hasNext}
        onPrev={handlePrev}
        onNext={handleNext}
        onBack={handleReturnToList}
        currentIndex={currentIndex}
        totalCount={currentLevel?.items.length ?? 0}
        icon={<IconTimeline size={24} />}
        title={
          <Group gap="xs" align="baseline">
            <Text size="xl" fw={700}>
              {item.date}
            </Text>
            <Text c="dark.3" size="md">
              (#{item.id})
            </Text>
          </Group>
        }
        subtitle={
          <Text size="sm" c="dimmed">
            {item.category}
          </Text>
        }
        onDelete={handleDelete}
      />
      <Stack gap="md" p="md">
        <Group>
          <Text fw={600} w={100}>
            Date:
          </Text>
          <EditableField
            value={item.date}
            onChange={(v) => handleFieldChange("date", v)}
            placeholder="Date"
          />
        </Group>
        <Group>
          <Text fw={600} w={100}>
            Category:
          </Text>
          <EditableField
            value={item.category}
            onChange={(v) => handleFieldChange("category", v)}
            placeholder="Category"
          />
        </Group>
        <Group align="flex-start">
          <Text fw={600} w={100}>
            Event:
          </Text>
          <EditableField
            value={item.event}
            onChange={(v) => handleFieldChange("event", v)}
            placeholder="Event description"
          />
        </Group>
      </Stack>
    </Stack>
  );
}
