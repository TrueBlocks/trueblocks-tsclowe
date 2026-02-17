import { useState, useEffect, useCallback } from "react";
import { Stack, Loader, Flex, Text, Group } from "@mantine/core";
import { IconBuilding } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useHotkeys } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { LogErr } from "@/utils";
import { useNavigation } from "@trueblocks/scaffold";
import {
  GetRealEstateItem,
  UpdateRealEstateItem,
  DeleteRealEstateItem,
} from "@app";
import { db } from "@models";
import { DetailHeader, EditableField } from "@trueblocks/ui";

interface RealEstateDetailProps {
  itemId: number;
  filteredItems: db.RealEstate[];
}

export function RealEstateDetail({
  itemId,
  filteredItems,
}: RealEstateDetailProps) {
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
  const [item, setItem] = useState<db.RealEstate | null>(null);
  const [loading, setLoading] = useState(true);

  const stackLength = stack.length;
  useEffect(() => {
    if (stackLength === 0 && filteredItems.length > 0) {
      setItems(
        "realestate",
        filteredItems.map((i) => ({ id: i.id })),
        itemId,
      );
    }
  }, [stackLength, filteredItems, itemId, setItems]);

  useEffect(() => {
    setCurrentId(itemId);
  }, [itemId, setCurrentId]);

  const navigateToItem = useCallback(
    (newId: number) => navigate(`/real-estate/${newId}`),
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
    () => navigate("/real-estate"),
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
      setItem(await GetRealEstateItem(itemId));
    } catch (err) {
      LogErr("Failed to load real estate:", err);
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
        await UpdateRealEstateItem(updated as db.RealEstate);
        setItem(updated as db.RealEstate);
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
      await DeleteRealEstateItem(item.id);
      notifications.show({
        message: "Property deleted",
        color: "green",
        autoClose: 2000,
      });
      navigate("/real-estate");
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
        <Text c="dimmed">Property not found</Text>
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
        icon={<IconBuilding size={24} />}
        title={
          <Group gap="xs" align="baseline">
            <EditableField
              value={item.property}
              onChange={(v) => handleFieldChange("property", v)}
              placeholder="Property name"
              size="xl"
            />
            <Text c="dark.3" size="md">
              (#{item.id})
            </Text>
          </Group>
        }
        subtitle={
          <Group gap="md">
            <Text size="sm">{item.location}</Text>
            <Text size="sm">{item.yearsActive}</Text>
          </Group>
        }
        onDelete={handleDelete}
      />
      <Stack gap="md" p="md">
        <Group>
          <Text fw={600} w={100}>
            Location:
          </Text>
          <EditableField
            value={item.location}
            onChange={(v) => handleFieldChange("location", v)}
            placeholder="Location"
          />
        </Group>
        <Group>
          <Text fw={600} w={100}>
            Years:
          </Text>
          <EditableField
            value={item.yearsActive}
            onChange={(v) => handleFieldChange("yearsActive", v)}
            placeholder="Years active"
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
