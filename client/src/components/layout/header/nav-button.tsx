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
          className={`flex items-center gap-3 rounded-lg px-3 py-2 font-semibold ${isActive ? 'bg-background text-white' : 'text-muted-foreground'} transition-colors duration-300 hover:text-primary`}
        >
          <Icon size={26} strokeWidth={2.5} />
          {children}
        </div>
      )}
    </NavLink>
  );
}
