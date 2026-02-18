import { useState, useEffect, useCallback, useRef } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import {
  IconHome,
  IconInfoCircle,
  IconBulb,
  IconBook,
  IconLink,
  IconBuildingEstate,
  IconTimeline,
} from "@tabler/icons-react";
import { WindowGetPosition, WindowGetSize } from "@wailsjs/runtime/runtime";
import { AppLayout, useWindowGeometry, type NavItem } from "@trueblocks/ui";
import {
  GetSidebarWidth,
  SetSidebarWidth,
  SaveWindowGeometry,
  GetLastRoute,
  SaveLastRoute,
  SetTab,
  SetTabRoute,
  GetTab,
  GetTabRoute,
} from "@app";
import { HomePage } from "@pages/HomePage";
import { AboutPage } from "@pages/AboutPage";
import { InventionsPage } from "@pages/InventionsPage";
import { BooksPage } from "@pages/BooksPage";
import { LinksPage } from "@pages/LinksPage";
import { RealEstatePage } from "@pages/RealEstatePage";
import { TimelinePage } from "@pages/TimelinePage";

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: IconHome },
  { id: "about", label: "About", icon: IconInfoCircle },
  { id: "books", label: "Books", icon: IconBook },
  { id: "inventions", label: "Inventions", icon: IconBulb },
  { id: "links", label: "Links", icon: IconLink },
  { id: "realestate", label: "Real Estate", icon: IconBuildingEstate },
  { id: "timeline", label: "Timeline", icon: IconTimeline },
];

const NAV_TO_ROUTE: Record<string, string> = {
  home: "/",
  about: "/about",
  books: "/books",
  inventions: "/inventions",
  links: "/links",
  realestate: "/realestate",
  timeline: "/timeline",
};

const ROUTE_TO_NAV: Record<string, string> = Object.fromEntries(
  Object.entries(NAV_TO_ROUTE).map(([k, v]) => [v, k]),
);

const VIEW_TABS: Record<string, string[]> = {
  books: ["list", "detail"],
  inventions: ["list", "detail"],
  links: ["list", "detail"],
  realestate: ["list", "detail"],
  timeline: ["list", "detail"],
};

function App() {
  const [initialSidebarWidth, setInitialSidebarWidth] = useState(220);
  const hasRestoredRoute = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();
  useWindowGeometry(SaveWindowGeometry, WindowGetPosition, WindowGetSize);

  useEffect(() => {
    GetSidebarWidth().then((w) => {
      if (w > 0) setInitialSidebarWidth(w);
    });
  }, []);

  useEffect(() => {
    if (hasRestoredRoute.current) return;
    hasRestoredRoute.current = true;
    GetLastRoute().then((route) => {
      if (route && route !== "/" && route !== location.pathname) {
        navigate(route);
      }
    });
  }, [location.pathname, navigate]);

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
          SetTab(viewId, currentTab);
          SetTabRoute(`${viewId}:${currentTab}`, location.pathname);
        }
      }
    }
  }, [location.pathname]);

  const handleNavigate = useCallback(
    async (id: string) => {
      const basePath = "/" + (location.pathname.split("/")[1] || "");
      const targetPath = NAV_TO_ROUTE[id] || "/";

      if (basePath === targetPath && VIEW_TABS[id]) {
        const currentTab = await GetTab(id);
        if (currentTab === "detail" || !currentTab) {
          navigate(targetPath);
        } else {
          const savedRoute = await GetTabRoute(`${id}:detail`);
          if (savedRoute) {
            navigate(savedRoute);
          } else {
            navigate(`${targetPath}/1`);
          }
        }
      } else {
        navigate(targetPath);
      }
    },
    [location.pathname, navigate],
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!e.metaKey) return;
      const digit = parseInt(e.key, 10);
      if (digit >= 1 && digit <= navItems.length) {
        e.preventDefault();
        handleNavigate(navItems[digit - 1].id);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNavigate]);

  const activeNav =
    ROUTE_TO_NAV[location.pathname] ||
    ROUTE_TO_NAV[`/${location.pathname.split("/")[1]}`] ||
    "home";

  return (
    <AppLayout
      navItems={navItems}
      activeNav={activeNav}
      onNavigate={handleNavigate}
      initialSidebarWidth={initialSidebarWidth}
      saveSidebarWidth={SetSidebarWidth}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:id" element={<BooksPage />} />
        <Route path="/inventions" element={<InventionsPage />} />
        <Route path="/inventions/:id" element={<InventionsPage />} />
        <Route path="/links" element={<LinksPage />} />
        <Route path="/links/:id" element={<LinksPage />} />
        <Route path="/realestate" element={<RealEstatePage />} />
        <Route path="/realestate/:id" element={<RealEstatePage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/timeline/:id" element={<TimelinePage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
