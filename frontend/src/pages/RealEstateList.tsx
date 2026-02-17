import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { LogErr } from "@/utils";
import { GetRealEstateItems } from "@app";
import { db } from "@models";
import { useNavigation } from "@trueblocks/scaffold";
import { DataTable, Column } from "@/components/DataTable";

interface RealEstateListProps {
  onItemClick: (item: db.RealEstate) => void;
  onFilteredDataChange: (items: db.RealEstate[]) => void;
}

export function RealEstateList({
  onItemClick,
  onFilteredDataChange,
}: RealEstateListProps) {
  const { currentId, setCurrentId, setItems } = useNavigation();
  const [items, setItemsState] = useState<db.RealEstate[]>([]);
  const [loading, setLoading] = useState(true);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    GetRealEstateItems()
      .then((data) => setItemsState(data || []))
      .catch((err) => LogErr("Failed to load real estate:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectedChange = useCallback(
    (item: db.RealEstate) => {
      setCurrentId(item.id);
    },
    [setCurrentId],
  );

  const columns: Column<db.RealEstate>[] = useMemo(
    () => [
      { key: "id", label: "ID", width: "5%", render: (i) => i.id },
      {
        key: "property",
        label: "Property",
        width: "30%",
        render: (i) => i.property,
      },
      {
        key: "location",
        label: "Location",
        width: "25%",
        render: (i) => i.location,
      },
      {
        key: "yearsActive",
        label: "Years",
        width: "15%",
        render: (i) => i.yearsActive,
      },
      {
        key: "description",
        label: "Description",
        width: "25%",
        render: (i) =>
          i.description.length > 60
            ? i.description.substring(0, 60) + "..."
            : i.description,
      },
    ],
    [],
  );

  const handleFilteredSortedChange = useCallback(
    (filtered: db.RealEstate[]) => {
      onFilteredDataChange(filtered);
      const navItems = filtered.map((i) => ({ id: i.id }));
      const navCurrentId = currentId ?? filtered[0]?.id ?? 0;
      setItems("realestate", navItems, navCurrentId);
    },
    [onFilteredDataChange, currentId, setItems],
  );

  const searchFn = useCallback((item: db.RealEstate, search: string) => {
    const lower = search.toLowerCase();
    return (
      item.property.toLowerCase().includes(lower) ||
      item.location.toLowerCase().includes(lower)
    );
  }, []);

  return (
    <DataTable<db.RealEstate>
      tableName="realestate"
      title="Real Estate & Properties"
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
