import { useMemo, useCallback, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IconList, IconFileText } from "@tabler/icons-react";
import { SetTab, GetRealEstates } from "@app";
import { TabView } from "@trueblocks/ui";
import type { Tab } from "@trueblocks/ui";
import { NavigationProvider } from "@trueblocks/scaffold";
import { RealEstateList } from "@pages/RealEstateList";
import { RealEstateDetail } from "@pages/RealEstateDetail";
import { db } from "@models";

export function RealEstatePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const itemId = id ? parseInt(id, 10) : null;
  const [filteredItems, setFilteredItems] = useState<db.RealEstate[]>([]);
  const hasInitialized = useRef(false);

  const handleItemClick = useCallback(
    (item: db.RealEstate) => {
      navigate(`/realestate/${item.id}`);
    },
    [navigate],
  );

  const handleTabChange = useCallback(
    (tab: string) => {
      if (tab === "list") {
        navigate("/realestate");
      } else if (tab === "detail") {
        const lastId = filteredItems[0]?.id || 1;
        navigate(`/realestate/${lastId}`);
      }
    },
    [navigate, filteredItems],
  );

  const activeTab = itemId ? "detail" : "list";

  useEffect(() => {
    SetTab("realestate", activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    GetRealEstates().then((items) => setFilteredItems(items || []));
  }, []);

  const handleFilteredDataChange = useCallback((items: db.RealEstate[]) => {
    setFilteredItems(items);
  }, []);

  const tabs: Tab[] = useMemo(
    () => [
      {
        value: "list",
        label: "List",
        icon: <IconList size={16} />,
        content: (
          <RealEstateList
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
          <RealEstateDetail itemId={itemId} filteredItems={filteredItems} />
        ) : (
          <div>Select a property to view details</div>
        ),
      },
    ],
    [itemId, handleItemClick, handleFilteredDataChange, filteredItems],
  );

  return (
    <NavigationProvider
      onNavigate={(entityType, navId) => {
        if (entityType === "realestate") {
          navigate(`/realestate/${navId}`);
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
