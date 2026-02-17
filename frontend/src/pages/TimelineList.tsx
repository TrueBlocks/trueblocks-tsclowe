import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { LogErr } from "@/utils";
import { GetTimelineEvents, GetTimelineCategories } from "@app";
import { db } from "@models";
import { useNavigation } from "@trueblocks/scaffold";
import { DataTable, Column } from "@/components/DataTable";

interface TimelineListProps {
  onItemClick: (item: db.TimelineEvent) => void;
  onFilteredDataChange: (items: db.TimelineEvent[]) => void;
}

export function TimelineList({
  onItemClick,
  onFilteredDataChange,
}: TimelineListProps) {
  const { currentId, setCurrentId, setItems } = useNavigation();
  const [items, setItemsState] = useState<db.TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    Promise.all([GetTimelineEvents(), GetTimelineCategories()])
      .then(([data, cats]) => {
        setItemsState(data || []);
        setCategories(cats || []);
      })
      .catch((err) => LogErr("Failed to load timeline:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectedChange = useCallback(
    (item: db.TimelineEvent) => {
      setCurrentId(item.id);
    },
    [setCurrentId],
  );

  const columns: Column<db.TimelineEvent>[] = useMemo(
    () => [
      { key: "id", label: "ID", width: "5%", render: (i) => i.id },
      { key: "date", label: "Date", width: "15%", render: (i) => i.date },
      { key: "event", label: "Event", width: "60%", render: (i) => i.event },
      {
        key: "category",
        label: "Category",
        width: "20%",
        render: (i) => i.category,
        filterOptions: categories,
      },
    ],
    [categories],
  );

  const handleFilteredSortedChange = useCallback(
    (filtered: db.TimelineEvent[]) => {
      onFilteredDataChange(filtered);
      const navItems = filtered.map((i) => ({ id: i.id }));
      const navCurrentId = currentId ?? filtered[0]?.id ?? 0;
      setItems("timeline", navItems, navCurrentId);
    },
    [onFilteredDataChange, currentId, setItems],
  );

  const searchFn = useCallback((item: db.TimelineEvent, search: string) => {
    const lower = search.toLowerCase();
    return (
      item.event.toLowerCase().includes(lower) ||
      item.date.toLowerCase().includes(lower)
    );
  }, []);

  return (
    <DataTable<db.TimelineEvent>
      tableName="timeline"
      title="Timeline"
      data={items}
      columns={columns}
      loading={loading}
      getRowKey={(i) => i.id}
      onRowClick={onItemClick}
      onSelectedChange={handleSelectedChange}
      onFilteredSortedChange={handleFilteredSortedChange}
      searchFn={searchFn}
    />
  );
}
