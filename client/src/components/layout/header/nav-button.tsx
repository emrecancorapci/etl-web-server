import type { LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function NavButton({
  Icon,
  children,
  to,
}: { Icon: LucideIcon; children: string; to: string }) {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <div
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium shadow-sm ${isActive ? 'cursor-default bg-background text-white' : 'bg-background/30 text-muted-foreground hover:bg-white/5 hover:text-primary'} transition-colors duration-200`}
        >
          <Icon size={24} strokeWidth={2} />
          {children}
        </div>
      )}
    </NavLink>
  );
}
