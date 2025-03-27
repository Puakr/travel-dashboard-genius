
import { useState, useEffect } from "react";
import { 
  Search, 
  PlusCircle, 
  Filter, 
  MoreHorizontal, 
  Check, 
  X, 
  Trash, 
  Edit, 
  Eye, 
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// Define mock user data
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  joinDate: string;
  lastActive: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "Admin",
    status: "active",
    joinDate: "2023-01-15",
    lastActive: "2024-08-20"
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    role: "User",
    status: "active",
    joinDate: "2023-02-28",
    lastActive: "2024-08-19"
  },
  {
    id: "3",
    name: "Michael Davis",
    email: "m.davis@example.com",
    role: "Manager",
    status: "inactive",
    joinDate: "2023-03-10",
    lastActive: "2024-07-05"
  },
  {
    id: "4",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    role: "User",
    status: "pending",
    joinDate: "2023-08-05",
    lastActive: "2024-08-05"
  },
  {
    id: "5",
    name: "James Roberts",
    email: "j.roberts@example.com",
    role: "User",
    status: "active",
    joinDate: "2023-05-20",
    lastActive: "2024-08-18"
  },
  {
    id: "6",
    name: "Olivia Garcia",
    email: "olivia.g@example.com",
    role: "Support",
    status: "active",
    joinDate: "2023-06-12",
    lastActive: "2024-08-10"
  }
];

export default function Users() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle user delete
  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter(user => user.id !== selectedUser.id));
      toast.success(`User ${selectedUser.name} has been deleted.`);
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  // Handle view user details
  const handleViewUser = (user: User) => {
    setSelectedUser(user);
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: User['status'] }) => {
    const statusConfig = {
      active: { color: "bg-green-500", text: "Active" },
      inactive: { color: "bg-gray-500", text: "Inactive" },
      pending: { color: "bg-yellow-500", text: "Pending" },
    };
    
    const config = statusConfig[status];
    
    return (
      <span className={`px-2 py-1 text-xs text-white rounded-full ${config.color}`}>
        {config.text}
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Users className="text-zippy-blue" />
          Users
        </h1>
        
        <Button 
          className="bg-zippy-blue hover:bg-zippy-blue/90" 
          onClick={() => setIsAddUserOpen(true)}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            Manage user accounts, permissions, and activities
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex justify-between mb-4 flex-col sm:flex-row gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                className="w-full bg-background border rounded-md pl-8 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-zippy-blue"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2 whitespace-nowrap">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <StatusBadge status={user.status} />
                    </TableCell>
                    <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleViewUser(user)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-blue-600"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-600"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* User details sidebar */}
      {selectedUser && (
        <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <SheetContent className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>User Details</SheetTitle>
            </SheetHeader>
            <div className="py-6 space-y-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-zippy-blue/10 rounded-full flex items-center justify-center mb-3">
                  <span className="text-3xl font-bold text-zippy-blue">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-bold text-xl">{selectedUser.name}</h3>
                <p className="text-gray-500">{selectedUser.role}</p>
                <StatusBadge status={selectedUser.status} />
              </div>
              
              <div className="space-y-4">
                <div className="pb-2 border-b">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Email</h4>
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-zippy-blue" />
                    {selectedUser.email}
                  </p>
                </div>
                
                <div className="pb-2 border-b">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Account Info</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Join Date</span>
                      <span>{new Date(selectedUser.joinDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Active</span>
                      <span>{new Date(selectedUser.lastActive).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status</span>
                      <StatusBadge status={selectedUser.status} />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-500">Recent Activity</h4>
                  <div className="space-y-2 text-sm">
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="font-medium">Login from new device</p>
                      <p className="text-gray-500 text-xs">Today at 10:45 AM</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="font-medium">Updated profile picture</p>
                      <p className="text-gray-500 text-xs">Yesterday at 2:30 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-x-2 mt-6 flex">
                <Button className="flex-1 bg-zippy-blue hover:bg-zippy-blue/90">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit User
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => {
                    setIsDeleteDialogOpen(true);
                  }}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete User
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
      
      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account. Fill in all the required details.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <input 
                className="w-full border rounded-md px-3 py-2"
                placeholder="Enter user's full name" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input 
                className="w-full border rounded-md px-3 py-2"
                placeholder="Enter user's email" 
                type="email"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <select className="w-full border rounded-md px-3 py-2">
                <option value="">Select role</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="User">User</option>
                <option value="Support">Support</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddUserOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-zippy-blue hover:bg-zippy-blue/90"
              onClick={() => {
                toast.success("User added successfully!");
                setIsAddUserOpen(false);
              }}
            >
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete User Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteUser}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
