import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { LogErr } from "@/utils";
import { GetBooks } from "@app";
import { db } from "@models";
import { useNavigation } from "@trueblocks/scaffold";
import { DataTable, Column } from "@/components/DataTable";

interface BooksListProps {
  onItemClick: (item: db.Book) => void;
  onFilteredDataChange: (items: db.Book[]) => void;
}

export function BooksList({
  onItemClick,
  onFilteredDataChange,
}: BooksListProps) {
  const { currentId, setCurrentId, setItems } = useNavigation();
  const [items, setItemsState] = useState<db.Book[]>([]);
  const [loading, setLoading] = useState(true);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    GetBooks()
      .then((data) => setItemsState(data || []))
      .catch((err) => LogErr("Failed to load books:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectedChange = useCallback(
    (item: db.Book) => {
      setCurrentId(item.id);
    },
    [setCurrentId],
  );

  const columns: Column<db.Book>[] = useMemo(
    () => [
      { key: "id", label: "ID", width: "5%", render: (i) => i.id },
      { key: "year", label: "Year", width: "8%", render: (i) => i.year },
      { key: "title", label: "Title", width: "35%", render: (i) => i.title },
      { key: "author", label: "Author", width: "25%", render: (i) => i.author },
      {
        key: "publisher",
        label: "Publisher",
        width: "27%",
        render: (i) => i.publisher,
      },
    ],
    [],
  );

  const handleFilteredSortedChange = useCallback(
    (filtered: db.Book[]) => {
      onFilteredDataChange(filtered);
      const navItems = filtered.map((i) => ({ id: i.id }));
      const navCurrentId = currentId ?? filtered[0]?.id ?? 0;
      setItems("book", navItems, navCurrentId);
    },
    [onFilteredDataChange, currentId, setItems],
  );

  const searchFn = useCallback((item: db.Book, search: string) => {
    const lower = search.toLowerCase();
    return (
      item.title.toLowerCase().includes(lower) ||
      item.author.toLowerCase().includes(lower) ||
      item.publisher.toLowerCase().includes(lower)
    );
  }, []);

  return (
    <DataTable<db.Book>
      tableName="books"
      title="Books & Publications"
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
