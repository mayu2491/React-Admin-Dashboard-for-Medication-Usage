import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/auth/auth-context';
import { Button } from '../ui/button';
import { ThemeToggle } from './theme-toggle';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Menu, Users, Pill, LayoutDashboard } from 'lucide-react';
import { useMemo, useState } from 'react';

const MENU = [
  { label: 'Overview', to: '/overview', roles: ['admin', 'clinician', 'viewer'], icon: LayoutDashboard },
  { label: 'Patients', to: '/patients', roles: ['admin', 'clinician'], icon: Users },
  { label: 'Medications', to: '/medications', roles: ['admin', 'clinician', 'viewer'], icon: Pill }
];

export function AuthenticatedLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const items = useMemo(
    () => MENU.filter((item) => (user ? item.roles.includes(user.role) : false)),
    [user]
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-16 items-center border-b px-4">
        <Button
          variant="ghost"
          className="lg:hidden"
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="font-semibold">Medication Usage Dashboard</div>
        <div className="ml-auto flex items-center gap-3">
          <ThemeToggle />
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="font-medium leading-tight">{user.name}</div>
              <div className="text-muted-foreground text-xs">{user.role}</div>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
      <div className="flex">
        <aside
          className={`border-r bg-secondary/40 transition-all duration-200 lg:w-60 ${
            sidebarOpen ? 'w-60' : 'w-0 overflow-hidden lg:w-60'
          }`}
        >
          <nav className="flex flex-col gap-1 p-4">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                    }`
                  }
                  aria-current={location.pathname === item.to ? 'page' : undefined}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
