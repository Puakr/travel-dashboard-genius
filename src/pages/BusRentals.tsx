
import { useState } from "react";
import { Bus, Search, MapPin, Edit, Trash2, Eye, Users, CalendarRange, Route } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

interface BusRentalData {
  id: number;
  name: string;
  location: string;
  price: number;
  capacity: number;
  image: string;
  amenities: string[];
  status: "active" | "inactive" | "pending";
  driverIncluded: boolean;
}

interface UserSessionData {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  loginCount: number;
  activity: string[];
}

const busRentalData: BusRentalData[] = [
  {
    id: 1,
    name: "Executive Coach",
    location: "Downtown, New York",
    price: 299,
    capacity: 45,
    image: "/lovable-uploads/fc8dcaca-d792-4b80-b9a2-0ae6e4637652.png",
    amenities: ["Wi-Fi", "Restroom", "TV/DVD", "AC"],
    status: "active",
    driverIncluded: true
  },
  {
    id: 2,
    name: "Luxury Minibus",
    location: "Midtown, Miami",
    price: 199,
    capacity: 24,
    image: "/placeholder.svg",
    amenities: ["Wi-Fi", "Leather Seats", "AC", "Bluetooth Audio"],
    status: "active",
    driverIncluded: true
  },
  {
    id: 3,
    name: "School Bus Rental",
    location: "Suburban Heights, Denver",
    price: 149,
    capacity: 52,
    image: "/placeholder.svg",
    amenities: ["Basic Seating", "AC", "Storage"],
    status: "pending",
    driverIncluded: false
  }
];

// Mock user session data
const userSessionData: UserSessionData = {
  id: "usr_293847",
  name: "Admin User",
  email: "admin@example.com",
  role: "Administrator",
  lastLogin: "2023-10-15T08:45:22Z",
  loginCount: 247,
  activity: [
    "Added new bus rental - Executive Coach",
    "Updated pricing for Luxury Minibus",
    "Approved rental request #1289"
  ]
};

export default function BusRentals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const filteredBuses = busRentalData.filter(bus => 
    bus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteBus = (id: number) => {
    toast.success(`Bus ID #${id} deleted successfully`);
    // In a real app, this would delete the bus from the database
  };

  const handleEditBus = (id: number) => {
    toast.info(`Editing bus ID #${id}`);
    // In a real app, this would open an edit form
  };

  const handleViewBus = (id: number) => {
    toast.info(`Viewing details for bus ID #${id}`);
    // In a real app, this would show detailed information
  };

  const handleAddNewBus = () => {
    setIsDialogOpen(true);
    // This opens the dialog to add a new bus
  };

  const handleAddBusSubmit = () => {
    toast.success("New bus rental added successfully!");
    setIsDialogOpen(false);
    // In a real app, this would add the bus to the database
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'inactive':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Bus className="text-zippy-blue" />
          Manage Bus Rentals
        </h1>
        
        {/* User session info card */}
        <Card className="bg-zippy-darker border-white/[0.03] text-white w-full sm:w-auto">
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-400">User Session</h3>
              <Badge variant="outline" className="bg-zippy-blue/10 text-zippy-blue border-zippy-blue/20">
                {userSessionData.role}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-400">Name:</span>
                <span>{userSessionData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Last Login:</span>
                <span>{new Date(userSessionData.lastLogin).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Login Count:</span>
                <span>{userSessionData.loginCount}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button 
            variant={viewMode === "table" ? "default" : "outline"} 
            onClick={() => setViewMode("table")}
            size="sm"
          >
            Table View
          </Button>
          <Button 
            variant={viewMode === "grid" ? "default" : "outline"} 
            onClick={() => setViewMode("grid")}
            size="sm"
          >
            Grid View
          </Button>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-zippy-blue hover:bg-zippy-blue/90">
              Add New Bus Rental
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px] bg-zippy-darker border-white/[0.03] text-white">
            <DialogHeader>
              <DialogTitle>Add New Bus Rental</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new bus rental to your fleet.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right text-sm">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Executive Coach"
                  className="col-span-3 bg-zippy-dark"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="location" className="text-right text-sm">
                  Location
                </label>
                <Input
                  id="location"
                  placeholder="Downtown, New York"
                  className="col-span-3 bg-zippy-dark"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="price" className="text-right text-sm">
                  Price
                </label>
                <Input
                  id="price"
                  type="number"
                  placeholder="299"
                  className="col-span-3 bg-zippy-dark"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="capacity" className="text-right text-sm">
                  Capacity
                </label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="45"
                  className="col-span-3 bg-zippy-dark"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" onClick={handleAddBusSubmit} className="bg-zippy-blue hover:bg-zippy-blue/90">
                Add Bus
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-zippy-darker rounded-lg">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search bus rentals by name or location..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-zippy-dark focus:border-zippy-blue text-white"
          />
        </div>
        <Button className="bg-zippy-blue hover:bg-zippy-blue/90">
          Search
        </Button>
      </div>
      
      {filteredBuses.length > 0 ? (
        viewMode === "table" ? (
          <Card className="bg-zippy-darker border-white/[0.03] text-white">
            <CardHeader className="pb-0">
              <h3 className="text-lg font-medium">Bus Rental Listings</h3>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/[0.03]">
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBuses.map(bus => (
                    <TableRow key={bus.id} className="border-white/[0.03]">
                      <TableCell className="font-medium">{bus.id}</TableCell>
                      <TableCell>{bus.name}</TableCell>
                      <TableCell>{bus.location}</TableCell>
                      <TableCell>${bus.price}/day</TableCell>
                      <TableCell>{bus.capacity} seats</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(bus.status)}>
                          {bus.status.charAt(0).toUpperCase() + bus.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleViewBus(bus.id)}
                            className="h-8 w-8 text-gray-400 hover:text-white"
                          >
                            <Eye size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEditBus(bus.id)}
                            className="h-8 w-8 text-gray-400 hover:text-white"
                          >
                            <Edit size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDeleteBus(bus.id)}
                            className="h-8 w-8 text-gray-400 hover:text-white hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBuses.map(bus => (
              <Card key={bus.id} className="bg-zippy-darker border-white/[0.03] text-white overflow-hidden">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={bus.image} 
                    alt={bus.name} 
                    className="w-full h-full object-cover"
                  />
                  <Badge 
                    variant="outline" 
                    className={`absolute top-3 right-3 ${getStatusColor(bus.status)}`}
                  >
                    {bus.status.charAt(0).toUpperCase() + bus.status.slice(1)}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold">{bus.name}</h3>
                    <span>${bus.price}/day</span>
                  </div>
                  <div className="flex items-center text-gray-400 gap-1 text-sm">
                    <MapPin size={16} />
                    <span>{bus.location}</span>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={16} className="text-gray-400" />
                    <span>{bus.capacity} seats</span>
                    {bus.driverIncluded && (
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 ml-auto">
                        Driver Included
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {bus.amenities.map((amenity, index) => (
                      <Badge key={index} variant="outline" className="bg-zippy-blue/10 border-zippy-blue/20 text-zippy-blue">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex gap-1 items-center"
                      onClick={() => handleViewBus(bus.id)}
                    >
                      <Eye size={14} />
                      View Details
                    </Button>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleEditBus(bus.id)}
                        className="h-8 w-8 text-gray-400 hover:text-white"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteBus(bus.id)}
                        className="h-8 w-8 text-gray-400 hover:text-white hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      ) : (
        <div className="glass-card rounded-xl p-12 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-zippy-blue/10 flex items-center justify-center text-zippy-blue mb-4">
            <Bus size={32} />
          </div>
          <h2 className="text-xl font-medium mb-2">No Bus Rentals Found</h2>
          <p className="text-gray-400 text-center max-w-md">
            We couldn't find any bus rentals matching your search criteria. 
            Try adjusting your search or add a new bus rental.
          </p>
          <Button 
            className="mt-4 bg-zippy-blue hover:bg-zippy-blue/90"
            onClick={handleAddNewBus}
          >
            Add New Bus Rental
          </Button>
        </div>
      )}

      {/* User Activity Section */}
      <Card className="bg-zippy-darker border-white/[0.03] text-white">
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userSessionData.activity.map((activity, index) => (
              <div key={index} className="flex items-start gap-2 pb-3 border-b border-white/[0.03] last:border-0 last:pb-0">
                <div className="w-8 h-8 rounded-full bg-zippy-blue/10 flex items-center justify-center shrink-0">
                  {index === 0 ? (
                    <Bus size={16} className="text-zippy-blue" />
                  ) : index === 1 ? (
                    <Route size={16} className="text-zippy-blue" />
                  ) : (
                    <CalendarRange size={16} className="text-zippy-blue" />
                  )}
                </div>
                <div>
                  <p className="text-sm">{activity}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(Date.now() - (index * 24 * 60 * 60 * 1000)).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
