import { CalculatorIcon, HomeIcon, PodcastIcon } from 'lucide-react';
import { Outlet, NavLink } from 'react-router-dom';
import NavButton from '@/components/layout/header/nav-button';

export default function MainLayout() {
  return (
    <div className="m-0 flex min-h-screen min-w-full bg-zinc-950 p-0">
      <div className="dark hidden w-[320px]  bg-primary-foreground md:flex md:flex-col md:gap-2">
        <div className="flex h-16 items-center px-6">
          <NavLink to="/" className="flex items-center gap-2 text-xl font-semibold text-primary">
            Tetra - Bettair ETL
          </NavLink>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
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
      </div>

      <div className="flex max-h-24 flex-col items-center justify-center gap-2 bg-primary-foreground p-2 md:hidden">
        <NavLink to="/" className="items-center gap-2 text-xl font-semibold">
          Tetra - Bettair ETL
        </NavLink>
        <nav className="grid w-full grid-cols-3 items-start px-2 text-sm font-medium *:justify-center">
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

      <div className="flex p-4">
        <Outlet />
      </div>
    </div>
  );
}
