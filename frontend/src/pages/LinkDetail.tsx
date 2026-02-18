import { useState, useEffect, useCallback } from "react";
import {
  Stack,
  Loader,
  Flex,
  Text,
  Group,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { IconLink, IconExternalLink } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useHotkeys } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { LogErr } from "@utils/index";
import { useNavigation } from "@trueblocks/scaffold";
import { GetLink, UpdateLink } from "@app";
import { db } from "@models";
import { DetailHeader, EditableField, openURL } from "@trueblocks/ui";

interface LinkDetailProps {
  itemId: number;
  filteredItems: db.Link[];
}

export function LinkDetail({ itemId, filteredItems }: LinkDetailProps) {
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
  const [item, setItem] = useState<db.Link | null>(null);
  const [loading, setLoading] = useState(true);

  const stackLength = stack.length;
  useEffect(() => {
    if (stackLength === 0 && filteredItems.length > 0) {
      setItems(
        "link",
        filteredItems.map((i) => ({ id: i.id })),
        itemId,
      );
    }
  }, [stackLength, filteredItems, itemId, setItems]);

  useEffect(() => {
    setCurrentId(itemId);
  }, [itemId, setCurrentId]);

  const navigateToItem = useCallback(
    (newId: number) => navigate(`/links/${newId}`),
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

  const handleReturnToList = useCallback(() => navigate("/links"), [navigate]);

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
      const data = await GetLink(itemId);
      setItem(data);
    } catch (err) {
      LogErr("Failed to load link:", err);
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
        await UpdateLink(updated as db.Link);
        setItem(updated as db.Link);
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
        icon={<IconLink size={24} />}
        title={
          <EditableField
            value={item.title || item.url}
            onChange={(v) => handleFieldChange("title", v)}
            placeholder="Title"
            size="xl"
          />
        }
      />
      <Group gap="xs" align="flex-end">
        <div style={{ flex: 1 }}>
          <EditableField
            label="URL"
            value={item.url}
            onChange={(v) => handleFieldChange("url", v)}
          />
        </div>
        {item.url && (
          <Tooltip label="Open in browser">
            <ActionIcon
              variant="light"
              color="blue"
              onClick={() => openURL(item.url)}
            >
              <IconExternalLink size={16} />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
      <EditableField
        label="Search Terms"
        value={item.searchTerms}
        onChange={(v) => handleFieldChange("searchTerms", v)}
      />
      <EditableField
        label="Is PDF"
        value={item.isPDF ? "Yes" : "No"}
        onChange={(v) => handleFieldChange("isPDF", v)}
      />
    </Stack>
  );
}
