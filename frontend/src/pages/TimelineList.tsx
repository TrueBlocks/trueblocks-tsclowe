import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { LogErr } from "@utils/index";
import { GetTimelineEvents } from "@app";
import { db } from "@models";
import { useNavigation } from "@trueblocks/scaffold";
import { DataTable } from "@components/DataTable";
import type { Column } from "@components/DataTable";

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
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    GetTimelineEvents()
      .then((data) => setItemsState(data || []))
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
      { key: "age", label: "Age", width: "5%", render: (i) => i.age },
      { key: "city", label: "City", width: "15%", render: (i) => i.city },
      { key: "state", label: "State", width: "10%", render: (i) => i.state },
      { key: "event", label: "Event", width: "50%", render: (i) => i.event },
    ],
    [],
  );

  const handleFilteredSortedChange = useCallback(
    (filtered: db.TimelineEvent[]) => {
      onFilteredDataChange(filtered);
      const navItems = filtered.map((i) => ({ id: i.id }));
      const navCurrentId = currentId ?? filtered[0]?.id ?? 0;
      setItems("timeline-event", navItems, navCurrentId);
    },
    [onFilteredDataChange, currentId, setItems],
  );

  const searchFn = useCallback((item: db.TimelineEvent, search: string) => {
    const lower = search.toLowerCase();
    return (
      item.city.toLowerCase().includes(lower) ||
      item.state.toLowerCase().includes(lower) ||
      item.event.toLowerCase().includes(lower)
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
