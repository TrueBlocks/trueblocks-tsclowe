import { useState, useEffect, useCallback } from "react";
import { Stack, Loader, Flex, Text, Group } from "@mantine/core";
import { IconBulb } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useHotkeys } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { LogErr } from "@/utils";
import { useNavigation } from "@trueblocks/scaffold";
import { GetInvention, UpdateInvention, DeleteInvention } from "@app";
import { db } from "@models";
import { DetailHeader, EditableField } from "@trueblocks/ui";

interface InventionDetailProps {
  itemId: number;
  filteredItems: db.Invention[];
}

export function InventionDetail({
  itemId,
  filteredItems,
}: InventionDetailProps) {
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
  const [item, setItem] = useState<db.Invention | null>(null);
  const [loading, setLoading] = useState(true);

  const stackLength = stack.length;
  useEffect(() => {
    if (stackLength === 0 && filteredItems.length > 0) {
      setItems(
        "invention",
        filteredItems.map((i) => ({ id: i.id })),
        itemId,
      );
    }
  }, [stackLength, filteredItems, itemId, setItems]);

  useEffect(() => {
    setCurrentId(itemId);
  }, [itemId, setCurrentId]);

  const navigateToItem = useCallback(
    (newId: number) => {
      navigate(`/inventions/${newId}`);
    },
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

  const handleReturnToList = useCallback(() => {
    navigate("/inventions");
  }, [navigate]);

  useHotkeys([
    [
      "ArrowRight",
      (e) => {
        const target = e.target as HTMLElement;
        if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA")
          handleNext();
      },
      { preventDefault: false },
    ],
    [
      "ArrowLeft",
      (e) => {
        const target = e.target as HTMLElement;
        if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA")
          handlePrev();
      },
      { preventDefault: false },
    ],
    ["mod+shift+ArrowLeft", handleReturnToList],
  ]);

  const loadData = useCallback(async () => {
    if (!itemId) return;
    setLoading(true);
    try {
      const data = await GetInvention(itemId);
      setItem(data);
    } catch (err) {
      LogErr("Failed to load invention:", err);
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
        await UpdateInvention(updated as db.Invention);
        setItem(updated as db.Invention);
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
      await DeleteInvention(item.id);
      notifications.show({
        message: "Invention deleted",
        color: "green",
        autoClose: 2000,
      });
      navigate("/inventions");
    } catch (err) {
      LogErr("Failed to delete:", err);
      notifications.show({
        message: "Delete failed",
        color: "red",
        autoClose: 3000,
      });
    }
  }, [item, navigate]);

  if (loading) {
    return (
      <Flex justify="center" align="center" h="100%">
        <Loader />
      </Flex>
    );
  }

  if (!item) {
    return (
      <Flex justify="center" align="center" h="100%">
        <Text c="dimmed">Invention not found</Text>
      </Flex>
    );
  }

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
        icon={<IconBulb size={24} />}
        title={
          <Group gap="xs" align="baseline">
            <EditableField
              value={item.title}
              onChange={(v) => handleFieldChange("title", v)}
              placeholder="Invention title"
              size="xl"
            />
            <Text c="dark.3" size="md">
              (#{item.id})
            </Text>
          </Group>
        }
        subtitle={
          <Group gap="md">
            <Text size="sm">Patent: {item.patent}</Text>
            <Text size="sm">Date: {item.date}</Text>
            <Text size="sm">
              {item.city}, {item.state}
            </Text>
          </Group>
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
            Patent #:
          </Text>
          <EditableField
            value={item.patent}
            onChange={(v) => handleFieldChange("patent", v)}
            placeholder="Patent number"
          />
        </Group>
        <Group>
          <Text fw={600} w={100}>
            City:
          </Text>
          <EditableField
            value={item.city}
            onChange={(v) => handleFieldChange("city", v)}
            placeholder="City"
          />
        </Group>
        <Group>
          <Text fw={600} w={100}>
            State:
          </Text>
          <EditableField
            value={item.state}
            onChange={(v) => handleFieldChange("state", v)}
            placeholder="State"
          />
        </Group>
        <Group align="flex-start">
          <Text fw={600} w={100}>
            Description:
          </Text>
          <EditableField
            value={item.description}
            onChange={(v) => handleFieldChange("description", v)}
            placeholder="Description"
          />
        </Group>
      </Stack>
    </Stack>
  );
}
