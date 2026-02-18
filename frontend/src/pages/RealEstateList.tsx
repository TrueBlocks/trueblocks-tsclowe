import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { LogErr } from "@utils/index";
import { GetRealEstates } from "@app";
import { db } from "@models";
import { useNavigation } from "@trueblocks/scaffold";
import { DataTable } from "@components/DataTable";
import type { Column } from "@components/DataTable";

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

    GetRealEstates()
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
      { key: "date", label: "Date", width: "15%", render: (i) => i.date },
      { key: "type", label: "Type", width: "15%", render: (i) => i.type },
      {
        key: "address",
        label: "Address",
        width: "40%",
        render: (i) => i.address,
      },
      {
        key: "fromWhom",
        label: "From Whom",
        width: "25%",
        render: (i) => i.fromWhom,
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
      item.type.toLowerCase().includes(lower) ||
      item.address.toLowerCase().includes(lower) ||
      item.fromWhom.toLowerCase().includes(lower)
    );
  }, []);

  return (
    <DataTable<db.RealEstate>
      tableName="realestate"
      title="Real Estate"
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
