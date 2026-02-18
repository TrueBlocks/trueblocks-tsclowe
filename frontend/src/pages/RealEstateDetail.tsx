import { useState, useEffect, useCallback } from "react";
import { Stack, Loader, Flex, Text } from "@mantine/core";
import { IconBuildingEstate } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useHotkeys } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { LogErr } from "@utils/index";
import { useNavigation } from "@trueblocks/scaffold";
import { GetRealEstate, UpdateRealEstate } from "@app";
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
    (newId: number) => navigate(`/realestate/${newId}`),
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
    () => navigate("/realestate"),
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
      const data = await GetRealEstate(itemId);
      setItem(data);
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
        await UpdateRealEstate(updated as db.RealEstate);
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

  if (loading)
    return (
      <Flex justify="center" align="center" h="100%">
        <Loader />
      </Flex>
    );
  if (!item)
    return (
      <Flex justify="center" align="center" h="100%">
        <Text c="dimmed">Not found</Text>
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
        icon={<IconBuildingEstate size={24} />}
        title={
          <EditableField
            value={item.address}
            onChange={(v) => handleFieldChange("address", v)}
            placeholder="Address"
            size="xl"
          />
        }
        subtitle={`${item.type} — ${item.date}`}
      />
      <EditableField
        label="Date"
        value={item.date}
        onChange={(v) => handleFieldChange("date", v)}
      />
      <EditableField
        label="Type"
        value={item.type}
        onChange={(v) => handleFieldChange("type", v)}
      />
      <EditableField
        label="From Whom"
        value={item.fromWhom}
        onChange={(v) => handleFieldChange("fromWhom", v)}
      />
    </Stack>
  );
}
