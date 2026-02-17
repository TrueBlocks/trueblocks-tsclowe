import { useState, useEffect, useCallback, useRef } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useHotkeys } from "@mantine/hooks";
import { WindowGetPosition, WindowGetSize } from "@wailsjs/runtime/runtime";
import {
  IconHome,
  IconInfoCircle,
  IconBook2,
  IconBulb,
  IconLink,
  IconBuilding,
  IconTimeline,
} from "@tabler/icons-react";
import { AppLayout, useWindowGeometry, type NavItem } from "@trueblocks/ui";
import {
  GetSidebarWidth,
  SetSidebarWidth,
  SaveWindowGeometry,
  GetLastRoute,
  SaveLastRoute,
  GetTab,
  GetTabRoute,
  SetTabRoute,
} from "@app";
import { HomePage } from "@/pages/HomePage";
import { AboutPage } from "@/pages/AboutPage";
import { InventionsPage } from "@/pages/InventionsPage";
import { BooksPage } from "@/pages/BooksPage";
import { TimelinePage } from "@/pages/TimelinePage";
import { LinksPage } from "@/pages/LinksPage";
import { RealEstatePage } from "@/pages/RealEstatePage";

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: IconHome },
  { id: "about", label: "About", icon: IconInfoCircle },
  { id: "inventions", label: "Inventions", icon: IconBulb },
  { id: "books", label: "Books", icon: IconBook2 },
  { id: "timeline", label: "Timeline", icon: IconTimeline },
  { id: "links", label: "Links", icon: IconLink },
  { id: "real-estate", label: "Real Estate", icon: IconBuilding },
];

const NAV_TO_ROUTE: Record<string, string> = {
  home: "/",
  about: "/about",
  inventions: "/inventions",
  books: "/books",
  timeline: "/timeline",
  links: "/links",
  "real-estate": "/real-estate",
};

const ROUTE_TO_NAV: Record<string, string> = Object.fromEntries(
  Object.entries(NAV_TO_ROUTE).map(([k, v]) => [v, k]),
);

const VIEW_TABS: Record<string, string[]> = {
  inventions: ["list", "detail"],
  books: ["list", "detail"],
  timeline: ["list", "detail"],
  links: ["list", "detail"],
  "real-estate": ["list", "detail"],
};

export default function App() {
  const [initialWidth, setInitialWidth] = useState<number | undefined>();
  const hasRestoredRoute = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();

  useWindowGeometry(SaveWindowGeometry, WindowGetPosition, WindowGetSize);

  const activeNav =
    ROUTE_TO_NAV[location.pathname] ||
    ROUTE_TO_NAV[`/${location.pathname.split("/")[1]}`] ||
    "home";

  useEffect(() => {
    Promise.all([GetSidebarWidth(), GetLastRoute()]).then(
      ([width, lastRoute]) => {
        setInitialWidth(width || 220);
        if (lastRoute && !hasRestoredRoute.current) {
          hasRestoredRoute.current = true;
          navigate(lastRoute, { replace: true });
        }
      },
    );
  }, [navigate]);

  useEffect(() => {
    if (hasRestoredRoute.current) {
      SaveLastRoute(location.pathname);
      const viewId =
        ROUTE_TO_NAV[location.pathname] ||
        ROUTE_TO_NAV[`/${location.pathname.split("/")[1]}`];
      if (viewId) {
        const tabs = VIEW_TABS[viewId];
        if (tabs && tabs.length > 0) {
          const hasId = location.pathname.split("/").length > 2;
          const currentTab = hasId ? "detail" : "list";
          SetTabRoute(`${viewId}:${currentTab}`, location.pathname);
        }
      }
    }
  }, [location.pathname]);

  const handleNavigate = useCallback(
    (id: string) => {
      const route = NAV_TO_ROUTE[id] || "/";
      navigate(route);
    },
    [navigate],
  );

  const handleNavigateOrCycle = useCallback(
    async (id: string) => {
      const baseRoute = NAV_TO_ROUTE[id] || "/";
      const tabs = VIEW_TABS[id];
      const isAlreadyOnView =
        location.pathname === baseRoute ||
        location.pathname.startsWith(baseRoute + "/");

      if (!isAlreadyOnView) {
        if (!tabs || tabs.length === 0) {
          navigate(baseRoute);
          return;
        }
        const lastTab = await GetTab(id);
        if (lastTab) {
          const lastRoute = await GetTabRoute(`${id}:${lastTab}`);
          if (lastRoute) {
            navigate(lastRoute);
            return;
          }
        }
        navigate(baseRoute);
        return;
      }

      if (!tabs || tabs.length <= 1) return;

      const currentTab = await GetTab(id);
      const currentIdx = tabs.indexOf(currentTab || tabs[0]);
      const nextIdx = (currentIdx + 1) % tabs.length;
      const nextTab = tabs[nextIdx];

      const savedRoute = await GetTabRoute(`${id}:${nextTab}`);
      if (savedRoute) {
        navigate(savedRoute);
      } else if (nextTab === "list" || nextIdx === 0) {
        navigate(baseRoute);
      } else {
        navigate(baseRoute + "/1");
      }
    },
    [navigate, location.pathname],
  );

  useHotkeys([
    ["mod+1", () => handleNavigateOrCycle("home")],
    ["mod+2", () => handleNavigateOrCycle("about")],
    ["mod+3", () => handleNavigateOrCycle("inventions")],
    ["mod+4", () => handleNavigateOrCycle("books")],
    ["mod+5", () => handleNavigateOrCycle("timeline")],
    ["mod+6", () => handleNavigateOrCycle("links")],
    ["mod+7", () => handleNavigateOrCycle("real-estate")],
  ]);

  const handleSaveSidebarWidth = useCallback((width: number) => {
    SetSidebarWidth(width);
  }, []);

  if (initialWidth === undefined) return null;

  return (
    <AppLayout
      title="TSC Lowe"
      subtitle="Data Archive"
      navItems={navItems}
      activeNav={activeNav}
      onNavigate={handleNavigate}
      initialSidebarWidth={initialWidth}
      saveSidebarWidth={handleSaveSidebarWidth}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/inventions" element={<InventionsPage />} />
        <Route path="/inventions/:id" element={<InventionsPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:id" element={<BooksPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/timeline/:id" element={<TimelinePage />} />
        <Route path="/links" element={<LinksPage />} />
        <Route path="/links/:id" element={<LinksPage />} />
        <Route path="/real-estate" element={<RealEstatePage />} />
        <Route path="/real-estate/:id" element={<RealEstatePage />} />
      </Routes>
    </AppLayout>
  );
}
