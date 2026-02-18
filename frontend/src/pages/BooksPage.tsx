import { useMemo, useCallback, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IconList, IconFileText } from "@tabler/icons-react";
import { SetTab, GetBooks } from "@app";
import { TabView } from "@trueblocks/ui";
import type { Tab } from "@trueblocks/ui";
import { NavigationProvider } from "@trueblocks/scaffold";
import { BooksList } from "@pages/BooksList";
import { BookDetail } from "@pages/BookDetail";
import { db } from "@models";

export function BooksPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const itemId = id ? parseInt(id, 10) : null;
  const [filteredItems, setFilteredItems] = useState<db.Book[]>([]);
  const hasInitialized = useRef(false);

  const handleItemClick = useCallback(
    (item: db.Book) => {
      navigate(`/books/${item.id}`);
    },
    [navigate],
  );

  const handleTabChange = useCallback(
    (tab: string) => {
      if (tab === "list") {
        navigate("/books");
      } else if (tab === "detail") {
        const lastId = filteredItems[0]?.id || 1;
        navigate(`/books/${lastId}`);
      }
    },
    [navigate, filteredItems],
  );

  const activeTab = itemId ? "detail" : "list";

  useEffect(() => {
    SetTab("books", activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    GetBooks().then((items) => setFilteredItems(items || []));
  }, []);

  const handleFilteredDataChange = useCallback((items: db.Book[]) => {
    setFilteredItems(items);
  }, []);

  const tabs: Tab[] = useMemo(
    () => [
      {
        value: "list",
        label: "List",
        icon: <IconList size={16} />,
        content: (
          <BooksList
            onItemClick={handleItemClick}
            onFilteredDataChange={handleFilteredDataChange}
          />
        ),
      },
      {
        value: "detail",
        label: "Detail",
        icon: <IconFileText size={16} />,
        content: itemId ? (
          <BookDetail itemId={itemId} filteredItems={filteredItems} />
        ) : (
          <div>Select a book to view details</div>
        ),
      },
    ],
    [itemId, handleItemClick, handleFilteredDataChange, filteredItems],
  );

  return (
    <NavigationProvider
      onNavigate={(entityType, navId) => {
        if (entityType === "book") {
          navigate(`/books/${navId}`);
        }
      }}
    >
      <TabView
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </NavigationProvider>
  );
}
