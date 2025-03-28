
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Bell, 
  Menu, 
  X,
  User,
  Settings,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BrightnessControl } from './BrightnessControl';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface HeaderProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export default function Header({ isMobileOpen, setIsMobileOpen }: HeaderProps) {
  const [notifications, setNotifications] = useState(3);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  return (
    <header className="h-16 border-b border-white/[0.03] flex items-center justify-between px-4 md:px-6 bg-zippy-darker sticky top-0 z-50">
      <Button 
        variant="ghost" 
        size="icon" 
        className="md:hidden text-gray-400 hover:text-white"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <X /> : <Menu />}
      </Button>
      
      <div className="flex-1 md:flex-initial"></div>
      
      <div className="flex items-center gap-2">
        <BrightnessControl />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-zippy-red rounded-full" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-96 overflow-auto">
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <div className="font-medium">New booking: Paris Tour</div>
                  <div className="text-sm text-muted-foreground">John Doe just booked a Paris Tour for $2,500</div>
                  <div className="text-xs text-muted-foreground">2 minutes ago</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <div className="font-medium">Pending approval: Tokyo Adventure</div>
                  <div className="text-sm text-muted-foreground">Jane Smith's booking requires approval</div>
                  <div className="text-xs text-muted-foreground">45 minutes ago</div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex flex-col gap-1">
                  <div className="font-medium">Safari Trip confirmed</div>
                  <div className="text-sm text-muted-foreground">Mike Johnson's Safari Trip payment was confirmed</div>
                  <div className="text-xs text-muted-foreground">2 hours ago</div>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer justify-center text-primary">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative flex items-center gap-2 h-8 pr-2 rounded-full hover:bg-white/5">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt={user?.name || "User"} />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium mr-1 hidden sm:inline-block">{user?.name || "User"}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
