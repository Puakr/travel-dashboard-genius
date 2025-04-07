
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  BarChart3, CalendarRange, Search, ChevronLeft, ChevronRight, 
  Filter, TrendingUp, ArrowUpRight, ArrowDownRight, Users, Hotel, Plane, Ticket,
  UserPlus, Edit, Trash2, MoreHorizontal, Check, X
} from 'lucide-react';
import { Input } from '@/components/ui/input-elements';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend, LineChart, Line } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/display-elements";
import { cn } from '@/lib/utils';
import StatCard from '@/components/dashboard/StatCard';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-elements";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Analytics data
const sampleMonthlyData = [
  { month: "Jan", bookings: 120, revenue: 12400, users: 78 },
  { month: "Feb", bookings: 140, revenue: 15800, users: 92 },
  { month: "Mar", bookings: 180, revenue: 22600, users: 119 },
  { month: "Apr", bookings: 250, revenue: 32000, users: 145 },
  { month: "May", bookings: 310, revenue: 41200, users: 162 },
  { month: "Jun", bookings: 290, revenue: 39800, users: 158 },
  { month: "Jul", bookings: 320, revenue: 45600, users: 171 },
  { month: "Aug", bookings: 360, revenue: 52400, users: 184 },
  { month: "Sep", bookings: 310, revenue: 48600, users: 165 },
  { month: "Oct", bookings: 290, revenue: 46200, users: 152 },
  { month: "Nov", bookings: 320, revenue: 49800, users: 168 },
  { month: "Dec", bookings: 370, revenue: 58200, users: 196 },
];

const sampleServiceData = [
  { name: "Stays", value: 38 },
  { name: "Flights", value: 27 },
  { name: "Attractions", value: 21 },
  { name: "Airport Taxis", value: 14 },
];

// Bookings data
const bookingsData = [
  { id: 1, customer: 'John Doe', email: 'john@example.com', package: 'Paris Tour', date: '2023-09-15', status: 'Confirmed', amount: 2500 },
  { id: 2, customer: 'Jane Smith', email: 'jane@example.com', package: 'Tokyo Adventure', date: '2023-09-20', status: 'Pending', amount: 3200 },
  { id: 3, customer: 'Mike Johnson', email: 'mike@example.com', package: 'Safari Trip', date: '2023-09-25', status: 'Confirmed', amount: 4100 },
  { id: 4, customer: 'Emily Davis', email: 'emily@example.com', package: 'Rome Explorer', date: '2023-10-05', status: 'Confirmed', amount: 2800 },
  { id: 5, customer: 'Alex Wilson', email: 'alex@example.com', package: 'NYC Weekend', date: '2023-10-10', status: 'Cancelled', amount: 1200 },
  { id: 6, customer: 'Sarah Brown', email: 'sarah@example.com', package: 'Bali Retreat', date: '2023-10-15', status: 'Pending', amount: 3500 },
  { id: 7, customer: 'David Lee', email: 'david@example.com', package: 'London Tour', date: '2023-10-20', status: 'Confirmed', amount: 2900 },
  { id: 8, customer: 'Lisa Chen', email: 'lisa@example.com', package: 'Maldives Package', date: '2023-10-25', status: 'Pending', amount: 5000 },
  { id: 9, customer: 'James Wilson', email: 'james@example.com', package: 'Grand Canyon', date: '2023-11-01', status: 'Confirmed', amount: 2300 },
  { id: 10, customer: 'Emma Thomas', email: 'emma@example.com', package: 'Dubai Experience', date: '2023-11-05', status: 'Cancelled', amount: 4200 },
];

// Users data
const usersData = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "Administrator",
    status: "Active",
    lastLogin: "2023-04-12T10:30:00",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Michael Robinson",
    email: "michael.robinson@example.com",
    role: "Manager",
    status: "Active",
    lastLogin: "2023-04-11T14:45:00",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "Customer Support",
    status: "Inactive",
    lastLogin: "2023-03-28T09:15:00",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    role: "Customer",
    status: "Active",
    lastLogin: "2023-04-10T16:20:00",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "Jennifer Taylor",
    email: "jennifer.taylor@example.com",
    role: "Marketing",
    status: "Active",
    lastLogin: "2023-04-12T08:50:00",
    avatar: "https://i.pravatar.cc/150?img=5",
  }
];

export default function ManagementPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the active tab from URL query params or default to 'bookings'
  const query = new URLSearchParams(location.search);
  const activeTab = query.get('tab') || 'bookings';
  
  // Set the active tab in URL when changing tabs
  const setActiveTab = (tab: string) => {
    navigate(`/management?tab=${tab}`);
  };

  // States for Bookings tab
  const [searchBookingTerm, setSearchBookingTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  
  // States for Analytics tab
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Stats summary for Analytics
  const [stats] = useState({
    totalBookings: "1,432",
    totalRevenue: "$428,400",
    activeUsers: "196",
    growthRate: "12.8%",
    isGrowthPositive: true
  });

  // States for Users tab
  const [searchUserTerm, setSearchUserTerm] = useState("");
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Customer",
  });
  const [roleFilter, setRoleFilter] = useState("all");

  // Handle search filter for bookings
  const filteredBookings = bookingsData.filter(booking => {
    const matchesSearch = 
      booking.customer.toLowerCase().includes(searchBookingTerm.toLowerCase()) ||
      booking.package.toLowerCase().includes(searchBookingTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchBookingTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || booking.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });
  
  // Pagination for bookings
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

  // Filter users based on search term and role
  const filteredUsers = usersData.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchUserTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchUserTerm.toLowerCase());
    
    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase();
    
    return matchesSearch && matchesRole;
  });

  // Handle adding new user
  const handleAddUser = () => {
    // In a real app, you would add the user to the database
    toast.success(`User ${newUser.name} added successfully`);
    setIsAddUserDialogOpen(false);
    setNewUser({ name: "", email: "", role: "Customer" });
  };

  // Handle deleting a user
  const handleDeleteUser = () => {
    // In a real app, you would delete the user from the database
    if (selectedUserId) {
      toast.success(`User ID #${selectedUserId} deleted successfully`);
      setSelectedUserId(null);
      setIsDeleteAlertOpen(false);
    }
  };

  // Handle updating user status
  const handleToggleStatus = (userId: number, currentStatus: string) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    // In a real app, you would update the user in the database
    toast.success(`User ID #${userId} status changed to ${newStatus}`);
  };

  // Custom tooltip for the analytics charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zippy-darker px-3 py-2 rounded-lg border border-white/10 shadow-xl">
          <p className="text-sm font-medium mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="text-xs flex items-center gap-2">
              <span 
                className="w-3 h-3 rounded-sm" 
                style={{ backgroundColor: entry.color }}
              ></span>
              <span>{entry.name}: {entry.name === "revenue" ? "$" : ""}{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Render bookings tab content
  const renderBookingsTab = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-medium flex items-center gap-2">
          <CalendarRange className="text-zippy-blue" />
          Bookings Management
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search bookings..."
              className="pl-10 w-full"
              value={searchBookingTerm}
              onChange={(e) => setSearchBookingTerm(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <div className="flex items-center gap-2">
                <Filter size={16} />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-400 border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Package</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((booking) => (
                <tr key={booking.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium">{booking.customer}</div>
                      <div className="text-sm text-gray-400">{booking.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{booking.package}</td>
                  <td className="px-6 py-4">{new Date(booking.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      'px-3 py-1 rounded-full text-xs font-medium',
                      booking.status === 'Confirmed' ? 'status-confirmed' : 
                      booking.status === 'Pending' ? 'status-pending' :
                      'bg-zippy-red/20 text-zippy-red'
                    )}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">${booking.amount}</td>
                </tr>
              ))}
              
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                    No bookings found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {filteredBookings.length > 0 && (
          <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredBookings.length)} of {filteredBookings.length}
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
              </Button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
              
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Render analytics tab content
  const renderAnalyticsTab = () => (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-medium flex items-center gap-2">
        <BarChart3 className="text-zippy-blue" />
        Analytics Dashboard
      </h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Bookings" 
          value={stats.totalBookings} 
          icon={Ticket} 
          index={0}
        />
        <StatCard 
          title="Total Revenue" 
          value={stats.totalRevenue} 
          icon={TrendingUp} 
          iconClassName="text-green-400"
          index={1}
        />
        <StatCard 
          title="Active Users" 
          value={stats.activeUsers} 
          icon={Users} 
          iconClassName="text-blue-400"
          index={2}
        />
        <StatCard 
          title="Growth Rate" 
          value={stats.growthRate} 
          icon={stats.isGrowthPositive ? ArrowUpRight : ArrowDownRight} 
          iconClassName={stats.isGrowthPositive ? "text-green-400" : "text-red-400"}
          index={3}
        />
      </div>
      
      {/* Revenue & Bookings Chart */}
      <div className="glass-card p-5 rounded-xl h-[400px] animate-fade-in" style={{ animationDelay: "200ms" }}>
        <h3 className="text-lg font-semibold mb-4">Revenue & Bookings Trends</h3>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={sampleMonthlyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.6)' }} />
              <YAxis 
                yAxisId="left"
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'rgba(255,255,255,0.6)' }} 
                tickFormatter={(value) => `$${value}`} 
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'rgba(255,255,255,0.6)' }} 
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="revenue" 
                stroke="#22c55e" 
                activeDot={{ r: 8 }} 
                strokeWidth={2}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="bookings" 
                stroke="#3b82f6" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Service Distribution & Users Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Service Distribution */}
        <div className="glass-card p-5 rounded-xl h-[400px] animate-fade-in" style={{ animationDelay: "300ms" }}>
          <h3 className="text-lg font-semibold mb-4">Booking Distribution by Service</h3>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={sampleServiceData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.6)' }} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.6)' }} 
                  width={100}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#a855f7" radius={[0, 4, 4, 0]} maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Users Growth */}
        <div className="glass-card p-5 rounded-xl h-[400px] animate-fade-in" style={{ animationDelay: "400ms" }}>
          <h3 className="text-lg font-semibold mb-4">User Growth Trends</h3>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={sampleMonthlyData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.6)' }} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgba(255,255,255,0.6)' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#eab308"
                  strokeWidth={2}
                  dot={{ stroke: '#eab308', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  // Render users tab content
  const renderUsersTab = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-medium flex items-center gap-2">
          <Users className="text-zippy-blue" />
          User Management
        </h2>
        
        <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-zippy-blue hover:bg-zippy-blue/90">
              <UserPlus size={18} className="mr-2" />
              Add New User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Enter the details for the new user account.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter full name" 
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter email address" 
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select 
                  value={newUser.role}
                  onValueChange={(value) => setNewUser({...newUser, role: value})}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Administrator">Administrator</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Customer Support">Customer Support</SelectItem>
                    <SelectItem value="Customer">Customer</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUser}>
                Create User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search users by name or email..." 
            className="pl-10"
            value={searchUserTerm}
            onChange={(e) => setSearchUserTerm(e.target.value)}
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <div className="flex items-center gap-2">
              <Filter size={16} />
              <SelectValue placeholder="Filter by role" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="administrator">Administrator</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="customer support">Customer Support</SelectItem>
            <SelectItem value="customer">Customer</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="border-white/5 bg-zippy-darker overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/5">
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-white/5">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={user.status === "Active" ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.lastLogin).toLocaleDateString()} at {new Date(user.lastLogin).toLocaleTimeString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal size={16} />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleToggleStatus(user.id, user.status)}>
                          {user.status === "Active" ? (
                            <>
                              <X className="mr-2 h-4 w-4" />
                              <span>Deactivate</span>
                            </>
                          ) : (
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              <span>Activate</span>
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-500 focus:text-red-500"
                          onClick={() => {
                            setSelectedUserId(user.id);
                            setIsDeleteAlertOpen(true);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    No users found matching your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              selected user account and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedUserId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteUser}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-2">
        <Button 
          variant={activeTab === 'bookings' ? "default" : "outline"} 
          onClick={() => setActiveTab('bookings')}
          className="flex items-center gap-2"
        >
          <CalendarRange size={16} />
          <span>Bookings</span>
        </Button>
        <Button 
          variant={activeTab === 'users' ? "default" : "outline"} 
          onClick={() => setActiveTab('users')}
          className="flex items-center gap-2"
        >
          <Users size={16} />
          <span>Users</span>
        </Button>
        <Button 
          variant={activeTab === 'analytics' ? "default" : "outline"} 
          onClick={() => setActiveTab('analytics')}
          className="flex items-center gap-2"
        >
          <BarChart3 size={16} />
          <span>Analytics</span>
        </Button>
      </div>

      {/* Tab content */}
      {activeTab === 'bookings' && renderBookingsTab()}
      {activeTab === 'analytics' && renderAnalyticsTab()}
      {activeTab === 'users' && renderUsersTab()}
    </div>
  );
}
