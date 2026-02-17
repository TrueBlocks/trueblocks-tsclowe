import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { LogErr } from "@/utils";
import { GetLinks } from "@app";
import { db } from "@models";
import { useNavigation } from "@trueblocks/scaffold";
import { DataTable, Column } from "@/components/DataTable";

interface LinksListProps {
  onItemClick: (item: db.Link) => void;
  onFilteredDataChange: (items: db.Link[]) => void;
}

export function LinksList({
  onItemClick,
  onFilteredDataChange,
}: LinksListProps) {
  const { currentId, setCurrentId, setItems } = useNavigation();
  const [items, setItemsState] = useState<db.Link[]>([]);
  const [loading, setLoading] = useState(true);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    GetLinks()
      .then((data) => setItemsState(data || []))
      .catch((err) => LogErr("Failed to load links:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectedChange = useCallback(
    (item: db.Link) => {
      setCurrentId(item.id);
    },
    [setCurrentId],
  );

  const columns: Column<db.Link>[] = useMemo(
    () => [
      { key: "id", label: "ID", width: "5%", render: (i) => i.id },
      { key: "title", label: "Title", width: "40%", render: (i) => i.title },
      { key: "url", label: "URL", width: "55%", render: (i) => i.url },
    ],
    [],
  );

  const handleFilteredSortedChange = useCallback(
    (filtered: db.Link[]) => {
      onFilteredDataChange(filtered);
      const navItems = filtered.map((i) => ({ id: i.id }));
      const navCurrentId = currentId ?? filtered[0]?.id ?? 0;
      setItems("link", navItems, navCurrentId);
    },
    [onFilteredDataChange, currentId, setItems],
  );

  const searchFn = useCallback((item: db.Link, search: string) => {
    const lower = search.toLowerCase();
    return (
      item.title.toLowerCase().includes(lower) ||
      item.url.toLowerCase().includes(lower)
    );
  }, []);

  return (
    <DataTable<db.Link>
      tableName="links"
      title="Links & Resources"
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
