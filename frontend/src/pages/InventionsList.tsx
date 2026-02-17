import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { LogErr } from "@/utils";
import { GetInventions, GetInventionFilterOptions } from "@app";
import { db } from "@models";
import { useNavigation } from "@trueblocks/scaffold";
import { DataTable, Column } from "@/components/DataTable";

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
  const [filterOptions, setFilterOptions] = useState<{
    states: string[];
    cities: string[];
  }>({ states: [], cities: [] });
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    Promise.all([GetInventions(), GetInventionFilterOptions()])
      .then(([data, options]) => {
        setItemsState(data || []);
        setFilterOptions({
          states: options?.states || [],
          cities: options?.cities || [],
        });
      })
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
      { key: "date", label: "Date", width: "12%", render: (i) => i.date },
      {
        key: "patent",
        label: "Patent #",
        width: "10%",
        render: (i) => i.patent,
      },
      { key: "title", label: "Title", width: "40%", render: (i) => i.title },
      {
        key: "city",
        label: "City",
        width: "15%",
        render: (i) => i.city,
        filterOptions: filterOptions.cities,
      },
      {
        key: "state",
        label: "State",
        width: "8%",
        render: (i) => i.state,
        filterOptions: filterOptions.states,
      },
    ],
    [filterOptions],
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
      item.patent.toLowerCase().includes(lower) ||
      item.city.toLowerCase().includes(lower)
    );
  }, []);

  return (
    <DataTable<db.Invention>
      tableName="inventions"
      title="Inventions & Patents"
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
