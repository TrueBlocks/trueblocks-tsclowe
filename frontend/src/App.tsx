import { useState, useEffect, useCallback } from 'react';
import {
  IconHome,
  IconInfoCircle,
  IconBook2,
  IconBulb,
  IconLink,
  IconBuilding,
  IconTimeline,
} from '@tabler/icons-react';
import { AppLayout, type NavItem } from '@trueblocks/ui';
import { GetSidebarWidth, SetSidebarWidth, GetTab, SetTab } from '@app';
import { HomeView } from '@components/HomeView';
import { AboutView } from '@components/AboutView';
import { BooksView } from '@components/BooksView';
import { InventionsView } from '@components/InventionsView';
import { LinksView } from '@components/LinksView';
import { RealEstateView } from '@components/RealEstateView';
import { TimelineView } from '@components/TimelineView';

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: IconHome },
  { id: 'about', label: 'About', icon: IconInfoCircle },
  { id: 'books', label: 'Books', icon: IconBook2 },
  { id: 'inventions', label: 'Inventions', icon: IconBulb },
  { id: 'links', label: 'Links', icon: IconLink },
  { id: 'real-estate', label: 'Real Estate', icon: IconBuilding },
  { id: 'timeline', label: 'Timeline', icon: IconTimeline },
];

const views: Record<string, () => JSX.Element | null> = {
  home: HomeView,
  about: AboutView,
  books: BooksView,
  inventions: InventionsView,
  links: LinksView,
  'real-estate': RealEstateView,
  timeline: TimelineView,
};

export default function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [initialWidth, setInitialWidth] = useState<number | undefined>();

  useEffect(() => {
    Promise.all([GetSidebarWidth(), GetTab('main')]).then(([width, tab]) => {
      setInitialWidth(width || 220);
      if (tab) setActiveNav(tab);
    });
  }, []);

  const handleNavigate = useCallback((id: string) => {
    setActiveNav(id);
    SetTab('main', id);
  }, []);

  const handleSaveSidebarWidth = useCallback((width: number) => {
    SetSidebarWidth(width);
  }, []);

  if (initialWidth === undefined) return null;

  const ActiveView = views[activeNav] || HomeView;

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
      <ActiveView />
    </AppLayout>
  );
}
