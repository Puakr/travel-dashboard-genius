
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
  Car,
  Menu,
  Settings,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from '@/components/ui/button';

export default function Sidebar({ isMobile, setIsMobileOpen }: { 
  isMobile?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
}) {
  const location = useLocation();
  
  const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Plane, label: 'Services', path: '/services' },
    { icon: Users, label: 'Management', path: '/management' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
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
      <div className="p-4 border-b border-white/[0.05] flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-400 hover:text-white hover:bg-zippy-dark active:scale-95 transition-all duration-200"
          onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
          aria-label="Close menu"
        >
          <Menu 
            size={24} 
            className="transform transition-transform duration-200 hover:rotate-90"
          />
        </Button>
      </div>
      
      <SidebarContent className="py-0 flex-1">
        <SidebarGroup>
          <SidebarMenu>
            {sidebarItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    isActive={active}
                    className={cn(
                      "bg-transparent hover:bg-zippy-dark text-white hover:text-white focus-visible:ring-0 focus-visible:outline-none active:bg-zippy-dark",
                      active && "bg-white/[0.05]"
                    )}
                    tooltip={item.label}
                  >
                    <Link 
                      to={item.path}
                      onClick={handleItemClick}
                      className="flex items-center gap-2"
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </div>
  );
}
