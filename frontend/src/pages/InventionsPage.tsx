import { useMemo, useCallback, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IconList, IconFileText } from "@tabler/icons-react";
import { SetTab, GetInventions } from "@app";
import { TabView } from "@trueblocks/ui";
import type { Tab } from "@trueblocks/ui";
import { NavigationProvider } from "@trueblocks/scaffold";
import { InventionsList } from "@pages/InventionsList";
import { InventionDetail } from "@pages/InventionDetail";
import { db } from "@models";

export function InventionsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const itemId = id ? parseInt(id, 10) : null;
  const [filteredItems, setFilteredItems] = useState<db.Invention[]>([]);
  const hasInitialized = useRef(false);

  const handleItemClick = useCallback(
    (item: db.Invention) => {
      navigate(`/inventions/${item.id}`);
    },
    [navigate],
  );

  const handleTabChange = useCallback(
    (tab: string) => {
      if (tab === "list") {
        navigate("/inventions");
      } else if (tab === "detail") {
        const lastId = filteredItems[0]?.id || 1;
        navigate(`/inventions/${lastId}`);
      }
    },
    [navigate, filteredItems],
  );

  const activeTab = itemId ? "detail" : "list";

  useEffect(() => {
    SetTab("inventions", activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    GetInventions().then((items) => setFilteredItems(items || []));
  }, []);

  const handleFilteredDataChange = useCallback((items: db.Invention[]) => {
    setFilteredItems(items);
  }, []);

  const tabs: Tab[] = useMemo(
    () => [
      {
        value: "list",
        label: "List",
        icon: <IconList size={16} />,
        content: (
          <InventionsList
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
          <InventionDetail itemId={itemId} filteredItems={filteredItems} />
        ) : (
          <div>Select an invention to view details</div>
        ),
      },
    ],
    [itemId, handleItemClick, handleFilteredDataChange, filteredItems],
  );

  return (
    <NavigationProvider
      onNavigate={(entityType, navId) => {
        if (entityType === "invention") {
          navigate(`/inventions/${navId}`);
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
