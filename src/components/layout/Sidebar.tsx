
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarRange, 
  BarChart3, 
  Users, 
  Hotel, 
  Plane, 
  Bus, 
  Ticket, 
  Car
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Sidebar({ isMobile, setIsMobileOpen }: { 
  isMobile?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
}) {
  const location = useLocation();
  
  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: CalendarRange, label: 'Bookings', path: '/bookings' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Users, label: 'Users', path: '/users' },
    { divider: true, label: 'SERVICES' },
    { icon: Hotel, label: 'Stays', path: '/stays' },
    { icon: Plane, label: 'Flights', path: '/flights' },
    { icon: Bus, label: 'Bus Rentals', path: '/bus-rentals' },
    { icon: Ticket, label: 'Attractions', path: '/attractions' },
    { icon: Car, label: 'Airport Taxis', path: '/airport-taxis' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleItemClick = () => {
    if (isMobile && setIsMobileOpen) {
      setIsMobileOpen(false);
    }
  };
  
  return (
    <div className={cn(
      "w-64 bg-zippy-darker h-full flex flex-col border-r border-white/[0.03] transition-all duration-300",
      isMobile && "w-full"
    )}>
      <div className="p-4 border-b border-white/[0.03] flex items-center gap-2">
        <div className="text-zippy-blue mr-2">
          <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          </svg>
        </div>
        <h1 className="text-xl font-bold text-white">ZippyTrip</h1>
      </div>
      
      <div className="flex-1 py-6 px-3 flex flex-col gap-1">
        {sidebarItems.map((item, index) => {
          if (item.divider) {
            return (
              <div key={index} className="mt-6 mb-2 px-3">
                <span className="text-xs font-semibold text-gray-500">{item.label}</span>
              </div>
            );
          }
          
          const Icon = item.icon!;
          const active = isActive(item.path!);
          
          return (
            <Link
              key={index}
              to={item.path!}
              className={cn("sidebar-item", active && "active")}
              onClick={handleItemClick}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
