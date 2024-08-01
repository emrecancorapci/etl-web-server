import { CalculatorIcon, HomeIcon, PodcastIcon } from 'lucide-react';
import { Outlet, NavLink } from 'react-router-dom';
import NavButton from '@/components/layout/header/nav-button';

export default function MainLayout() {
  return (
    <div className="dark m-0 flex min-h-screen min-w-full flex-col bg-zinc-950 p-0 md:flex-row">
      <div className="flex w-full flex-col bg-card md:w-[320px] md:min-w-[320px] md:gap-2">
        <div className="flex items-center justify-center p-2 md:justify-start md:px-6 md:py-8">
          <NavLink to="/" className="flex flex-row items-end md:flex-col md:items-start">
            <h1 className="text-5xl font-thin text-primary">Tetra</h1>
            <p className="ps-4 text-lg font-extralight text-muted-foreground">
              Bettair ETL Application
            </p>
          </NavLink>
        </div>
        <nav className="grid grid-cols-3 items-start gap-2 p-2 text-sm font-medium md:grid-cols-1 md:px-4 md:py-0">
          <NavButton Icon={HomeIcon} to="/">
            Panel
          </NavButton>
          <NavButton Icon={PodcastIcon} to="/subscriptions">
            Abonelikler
          </NavButton>
          <NavButton Icon={CalculatorIcon} to="/machines">
            Makineler
          </NavButton>
        </nav>
      </div>

      <div className="flex flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}
