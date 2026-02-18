import { useMemo, useCallback, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IconList, IconFileText } from "@tabler/icons-react";
import { SetTab, GetTimelineEvents } from "@app";
import { TabView } from "@trueblocks/ui";
import type { Tab } from "@trueblocks/ui";
import { NavigationProvider } from "@trueblocks/scaffold";
import { TimelineList } from "@pages/TimelineList";
import { TimelineDetail } from "@pages/TimelineDetail";
import { db } from "@models";

export function TimelinePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const itemId = id ? parseInt(id, 10) : null;
  const [filteredItems, setFilteredItems] = useState<db.TimelineEvent[]>([]);
  const hasInitialized = useRef(false);

  const handleItemClick = useCallback(
    (item: db.TimelineEvent) => {
      navigate(`/timeline/${item.id}`);
    },
    [navigate],
  );

  const handleTabChange = useCallback(
    (tab: string) => {
      if (tab === "list") {
        navigate("/timeline");
      } else if (tab === "detail") {
        const lastId = filteredItems[0]?.id || 1;
        navigate(`/timeline/${lastId}`);
      }
    },
    [navigate, filteredItems],
  );

  const activeTab = itemId ? "detail" : "list";

  useEffect(() => {
    SetTab("timeline", activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    GetTimelineEvents().then((items) => setFilteredItems(items || []));
  }, []);

  const handleFilteredDataChange = useCallback((items: db.TimelineEvent[]) => {
    setFilteredItems(items);
  }, []);

  const tabs: Tab[] = useMemo(
    () => [
      {
        value: "list",
        label: "List",
        icon: <IconList size={16} />,
        content: (
          <TimelineList
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
          <TimelineDetail itemId={itemId} filteredItems={filteredItems} />
        ) : (
          <div>Select an event to view details</div>
        ),
      },
    ],
    [itemId, handleItemClick, handleFilteredDataChange, filteredItems],
  );

  return (
    <NavigationProvider
      onNavigate={(entityType, navId) => {
        if (entityType === "timeline-event") {
          navigate(`/timeline/${navId}`);
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
