import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { LogErr } from "@utils/index";
import { GetInventions } from "@app";
import { db } from "@models";
import { useNavigation } from "@trueblocks/scaffold";
import { DataTable } from "@components/DataTable";
import type { Column } from "@components/DataTable";

interface InventionsListProps {
  onItemClick: (item: db.Invention) => void;
  onFilteredDataChange: (items: db.Invention[]) => void;
}

export function InventionsList({
  onItemClick,
  onFilteredDataChange,
}: InventionsListProps) {
  const { currentId, setCurrentId, setItems } = useNavigation();
  const [items, setItemsState] = useState<db.Invention[]>([]);
  const [loading, setLoading] = useState(true);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    GetInventions()
      .then((data) => setItemsState(data || []))
      .catch((err) => LogErr("Failed to load inventions:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectedChange = useCallback(
    (item: db.Invention) => {
      setCurrentId(item.id);
    },
    [setCurrentId],
  );

  const columns: Column<db.Invention>[] = useMemo(
    () => [
      { key: "id", label: "ID", width: "5%", render: (i) => i.id },
      { key: "date", label: "Date", width: "10%", render: (i) => i.date },
      {
        key: "patentNumber",
        label: "Patent #",
        width: "10%",
        render: (i) => i.patentNumber,
      },
      { key: "title", label: "Title", width: "35%", render: (i) => i.title },
      {
        key: "inventor",
        label: "Inventor",
        width: "15%",
        render: (i) => i.inventor,
      },
      { key: "city", label: "City", width: "10%", render: (i) => i.city },
      { key: "state", label: "State", width: "5%", render: (i) => i.state },
      {
        key: "comments",
        label: "Comments",
        width: "10%",
        render: (i) => i.comments,
      },
    ],
    [],
  );

  const handleFilteredSortedChange = useCallback(
    (filtered: db.Invention[]) => {
      onFilteredDataChange(filtered);
      const navItems = filtered.map((i) => ({ id: i.id }));
      const navCurrentId = currentId ?? filtered[0]?.id ?? 0;
      setItems("invention", navItems, navCurrentId);
    },
    [onFilteredDataChange, currentId, setItems],
  );

  const searchFn = useCallback((item: db.Invention, search: string) => {
    const lower = search.toLowerCase();
    return (
      item.title.toLowerCase().includes(lower) ||
      item.inventor.toLowerCase().includes(lower) ||
      item.patentNumber.toLowerCase().includes(lower) ||
      item.comments.toLowerCase().includes(lower)
    );
  }, []);

  return (
    <DataTable<db.Invention>
      tableName="inventions"
      title="Inventions"
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
