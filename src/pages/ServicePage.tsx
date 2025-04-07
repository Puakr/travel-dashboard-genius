
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Plane, Hotel, Bus, Ticket, Car, 
  Search, MapPin, Edit, Trash2, Eye, 
  Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input-elements';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/display-elements';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from 'sonner';

// Interfaces for all service types
interface ServiceItem {
  id: number;
  status: string;
  [key: string]: any;
}

interface AttractionData extends ServiceItem {
  name: string;
  location: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  status: "open" | "closed" | "limited";
}

interface BusData extends ServiceItem {
  busNumber: string;
  company: string;
  route: string;
  departureTime: string;
  capacity: number;
  price: number;
  status: "available" | "limited" | "booked";
}

interface TaxiData extends ServiceItem {
  vehicleId: string;
  type: string;
  driver: string;
  location: string;
  capacity: number;
  price: number;
  status: "available" | "on-trip" | "maintenance";
}

// Mock data for each service
const attractionData: AttractionData[] = [
  {
    id: 1,
    name: "Grand Museum",
    location: "Downtown, New York",
    category: "Museum",
    price: 25,
    rating: 4.7,
    image: "/placeholder.svg",
    status: "open"
  },
  {
    id: 2,
    name: "Adventure Theme Park",
    location: "Orlando, Florida",
    category: "Theme Park",
    price: 89,
    rating: 4.9,
    image: "/placeholder.svg",
    status: "open"
  },
  {
    id: 3,
    name: "Historic Castle Tour",
    location: "Edinburgh, Scotland",
    category: "Historic Site",
    price: 35,
    rating: 4.5,
    image: "/placeholder.svg",
    status: "limited"
  }
];

const busData: BusData[] = [
  {
    id: 1,
    busNumber: "ZB1001",
    company: "Zippy Bus Co.",
    route: "New York to Boston",
    departureTime: "08:00 AM",
    capacity: 45,
    price: 39,
    status: "available"
  },
  {
    id: 2,
    busNumber: "ZB1002",
    company: "Zippy Bus Co.",
    route: "Washington DC to Philadelphia",
    departureTime: "10:30 AM",
    capacity: 45,
    price: 29,
    status: "limited"
  },
  {
    id: 3,
    busNumber: "ZB1003",
    company: "Zippy Bus Co.",
    route: "San Francisco to Los Angeles",
    departureTime: "07:45 AM",
    capacity: 50,
    price: 49,
    status: "booked"
  }
];

const taxiData: TaxiData[] = [
  {
    id: 1,
    vehicleId: "ZT101",
    type: "Sedan",
    driver: "John Smith",
    location: "JFK Airport",
    capacity: 4,
    price: 45,
    status: "available"
  },
  {
    id: 2,
    vehicleId: "ZT202",
    type: "SUV",
    driver: "Maria Garcia",
    location: "LAX Airport",
    capacity: 6,
    price: 65,
    status: "on-trip"
  },
  {
    id: 3,
    vehicleId: "ZT303",
    type: "Van",
    driver: "Robert Johnson",
    location: "O'Hare Airport",
    capacity: 8,
    price: 85,
    status: "maintenance"
  }
];

const flightData: any[] = [
  {
    id: 1,
    flightNumber: "ZF101",
    airline: "Zippy Airways",
    route: "New York to London",
    departureTime: "10:00 AM",
    arrivalTime: "10:30 PM",
    price: 499,
    status: "on-time"
  },
  {
    id: 2,
    flightNumber: "ZF202",
    airline: "Zippy Airways",
    route: "Tokyo to Singapore",
    departureTime: "01:30 PM",
    arrivalTime: "07:45 PM",
    price: 349,
    status: "delayed"
  },
  {
    id: 3,
    flightNumber: "ZF303",
    airline: "Zippy Airways",
    route: "Paris to Rome",
    departureTime: "09:15 AM",
    arrivalTime: "11:30 AM",
    price: 189,
    status: "boarding"
  }
];

const stayData: any[] = [
  {
    id: 1,
    name: "Grand Hotel",
    location: "New York",
    type: "Hotel",
    price: 249,
    rating: 4.8,
    image: "/placeholder.svg",
    status: "available"
  },
  {
    id: 2,
    name: "Beach Resort",
    location: "Miami",
    type: "Resort",
    price: 349,
    rating: 4.9,
    image: "/placeholder.svg",
    status: "limited"
  },
  {
    id: 3,
    name: "City Apartment",
    location: "Chicago",
    type: "Apartment",
    price: 159,
    rating: 4.6,
    image: "/placeholder.svg",
    status: "booked"
  }
];

export default function ServicePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  
  // Get the active tab from URL query params or default to 'flights'
  const query = new URLSearchParams(location.search);
  const activeTab = query.get('tab') || 'flights';
  
  // Set the active tab in URL when changing tabs
  const setActiveTab = (tab: string) => {
    navigate(`/services?tab=${tab}`);
  };
  
  // Handle various actions
  const handleDelete = (id: number) => {
    toast.success(`Item ID #${id} deleted successfully`);
  };

  const handleEdit = (id: number) => {
    toast.info(`Editing item ID #${id}`);
  };

  const handleView = (id: number) => {
    toast.info(`Viewing details for item ID #${id}`);
  };

  // Get status color based on status value
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
      case 'open':
      case 'on-time':
      case 'boarding':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'limited':
      case 'delayed':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'booked':
      case 'closed':
      case 'cancelled':
      case 'maintenance':
      case 'on-trip':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  // Get the correct icon based on service type
  const getServiceIcon = () => {
    switch (activeTab) {
      case 'flights':
        return Plane;
      case 'stays':
        return Hotel;
      case 'busrentals':
        return Bus;
      case 'attractions':
        return Ticket;
      case 'airporttaxis':
        return Car;
      default:
        return Plane;
    }
  };

  // Get the correct title based on service type
  const getServiceTitle = () => {
    switch (activeTab) {
      case 'flights':
        return 'Flights';
      case 'stays':
        return 'Stays';
      case 'busrentals':
        return 'Bus Rentals';
      case 'attractions':
        return 'Attractions';
      case 'airporttaxis':
        return 'Airport Taxis';
      default:
        return 'Flights';
    }
  };

  // Get the correct placeholder text based on service type
  const getSearchPlaceholder = () => {
    switch (activeTab) {
      case 'flights':
        return 'Search flights by number, airline, or route...';
      case 'stays':
        return 'Search stays by name, location, or type...';
      case 'busrentals':
        return 'Search buses by number, company, or route...';
      case 'attractions':
        return 'Search attractions by name, location, or category...';
      case 'airporttaxis':
        return 'Search taxis by ID, driver, location, or type...';
      default:
        return 'Search...';
    }
  };

  // Get the correct data based on service type
  const getData = () => {
    switch (activeTab) {
      case 'flights':
        return flightData.filter(item => 
          item.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.route.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case 'stays':
        return stayData.filter(item => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.type.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case 'busrentals':
        return busData.filter(item => 
          item.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.route.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case 'attractions':
        return attractionData.filter(item => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case 'airporttaxis':
        return taxiData.filter(item => 
          item.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.type.toLowerCase().includes(searchTerm.toLowerCase())
        );
      default:
        return [];
    }
  };

  // Get columns for table based on service type
  const getTableColumns = () => {
    switch (activeTab) {
      case 'flights':
        return ['Flight #', 'Airline', 'Route', 'Departure', 'Arrival', 'Price', 'Status'];
      case 'stays':
        return ['Name', 'Location', 'Type', 'Price', 'Rating', 'Status'];
      case 'busrentals':
        return ['Bus #', 'Company', 'Route', 'Departure', 'Capacity', 'Price', 'Status'];
      case 'attractions':
        return ['Name', 'Location', 'Category', 'Price', 'Rating', 'Status'];
      case 'airporttaxis':
        return ['Vehicle ID', 'Type', 'Driver', 'Location', 'Capacity', 'Price', 'Status'];
      default:
        return [];
    }
  };

  // Get filtered data
  const filteredData = getData();
  
  // Get the service icon component
  const ServiceIcon = getServiceIcon();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button 
          variant={activeTab === 'flights' ? "default" : "outline"} 
          onClick={() => setActiveTab('flights')}
          className="flex items-center gap-1"
        >
          <Plane size={16} />
          <span>Flights</span>
        </Button>
        <Button 
          variant={activeTab === 'stays' ? "default" : "outline"} 
          onClick={() => setActiveTab('stays')}
          className="flex items-center gap-1"
        >
          <Hotel size={16} />
          <span>Stays</span>
        </Button>
        <Button 
          variant={activeTab === 'busrentals' ? "default" : "outline"} 
          onClick={() => setActiveTab('busrentals')}
          className="flex items-center gap-1"
        >
          <Bus size={16} />
          <span>Bus Rentals</span>
        </Button>
        <Button 
          variant={activeTab === 'attractions' ? "default" : "outline"} 
          onClick={() => setActiveTab('attractions')}
          className="flex items-center gap-1"
        >
          <Ticket size={16} />
          <span>Attractions</span>
        </Button>
        <Button 
          variant={activeTab === 'airporttaxis' ? "default" : "outline"} 
          onClick={() => setActiveTab('airporttaxis')}
          className="flex items-center gap-1"
        >
          <Car size={16} />
          <span>Airport Taxis</span>
        </Button>
      </div>
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ServiceIcon className="text-zippy-blue" />
          Manage {getServiceTitle()}
        </h1>
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
          <Button className="bg-zippy-blue hover:bg-zippy-blue/90">
            Add New {activeTab === 'airporttaxis' ? 'Taxi' : activeTab.slice(0, -1)}
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-zippy-darker rounded-lg">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder={getSearchPlaceholder()}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-zippy-dark focus:border-zippy-blue text-white"
          />
        </div>
        <Button className="bg-zippy-blue hover:bg-zippy-blue/90">
          Search
        </Button>
      </div>
      
      {filteredData.length > 0 ? (
        viewMode === "table" ? (
          <Card className="bg-zippy-darker border-white/[0.03] text-white">
            <CardHeader className="pb-0">
              <h3 className="text-lg font-medium">{getServiceTitle()} Listings</h3>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-white/[0.03]">
                    {getTableColumns().map((column, index) => (
                      <TableHead key={index}>{column}</TableHead>
                    ))}
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map(item => (
                    <TableRow key={item.id} className="border-white/[0.03]">
                      {/* Conditional rendering based on service type */}
                      {activeTab === 'flights' && (
                        <>
                          <TableCell className="font-medium">{item.flightNumber}</TableCell>
                          <TableCell>{item.airline}</TableCell>
                          <TableCell>{item.route}</TableCell>
                          <TableCell>{item.departureTime}</TableCell>
                          <TableCell>{item.arrivalTime}</TableCell>
                          <TableCell>${item.price}</TableCell>
                        </>
                      )}
                      
                      {activeTab === 'stays' && (
                        <>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.location}</TableCell>
                          <TableCell>{item.type}</TableCell>
                          <TableCell>${item.price}</TableCell>
                          <TableCell>{item.rating}</TableCell>
                        </>
                      )}
                      
                      {activeTab === 'busrentals' && (
                        <>
                          <TableCell className="font-medium">{item.busNumber}</TableCell>
                          <TableCell>{item.company}</TableCell>
                          <TableCell>{item.route}</TableCell>
                          <TableCell>{item.departureTime}</TableCell>
                          <TableCell>{item.capacity} seats</TableCell>
                          <TableCell>${item.price}</TableCell>
                        </>
                      )}
                      
                      {activeTab === 'attractions' && (
                        <>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.location}</TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>${item.price}</TableCell>
                          <TableCell>{item.rating}</TableCell>
                        </>
                      )}
                      
                      {activeTab === 'airporttaxis' && (
                        <>
                          <TableCell className="font-medium">{item.vehicleId}</TableCell>
                          <TableCell>{item.type}</TableCell>
                          <TableCell>{item.driver}</TableCell>
                          <TableCell>{item.location}</TableCell>
                          <TableCell>{item.capacity} passengers</TableCell>
                          <TableCell>${item.price}</TableCell>
                        </>
                      )}
                      
                      {/* Status badge - common for all */}
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(item.status)}>
                          {item.status === 'on-trip' ? 'On Trip' : 
                           (item.status.charAt(0).toUpperCase() + item.status.slice(1))}
                        </Badge>
                      </TableCell>
                      
                      {/* Actions - common for all */}
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleView(item.id)}
                            className="h-8 w-8 text-gray-400 hover:text-white"
                          >
                            <Eye size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEdit(item.id)}
                            className="h-8 w-8 text-gray-400 hover:text-white"
                          >
                            <Edit size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete(item.id)}
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
            {filteredData.map(item => (
              <Card key={item.id} className="bg-zippy-darker border-white/[0.03] text-white overflow-hidden">
                <div className="h-48 overflow-hidden relative bg-zippy-blue/20 flex items-center justify-center">
                  {activeTab === 'stays' || activeTab === 'attractions' ? (
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ServiceIcon size={64} className="text-zippy-blue opacity-50" />
                  )}
                  <Badge 
                    variant="outline" 
                    className={`absolute top-3 right-3 ${getStatusColor(item.status)}`}
                  >
                    {item.status === 'on-trip' ? 'On Trip' : 
                     (item.status.charAt(0).toUpperCase() + item.status.slice(1))}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold">
                      {activeTab === 'flights' ? item.flightNumber : 
                       activeTab === 'busrentals' ? item.busNumber :
                       activeTab === 'airporttaxis' ? item.vehicleId : item.name}
                    </h3>
                    <span>${item.price}</span>
                  </div>
                  <div className="flex items-center text-gray-400 gap-1 text-sm">
                    {activeTab === 'flights' ? item.airline :
                     activeTab === 'busrentals' ? item.company :
                     activeTab === 'airporttaxis' ? item.type : (
                       <div className="flex items-center gap-1">
                         <MapPin size={14} />
                         <span>{item.location}</span>
                       </div>
                     )}
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex flex-col gap-2 mb-4">
                    {/* Conditional rendering for card content */}
                    {activeTab === 'flights' && (
                      <>
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>Route:</span>
                          </div>
                          <span className="font-medium">{item.route}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Departure:</span>
                          <span className="font-medium">{item.departureTime}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Arrival:</span>
                          <span className="font-medium">{item.arrivalTime}</span>
                        </div>
                      </>
                    )}
                    
                    {activeTab === 'stays' && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">{item.type}</span>
                          <div className="flex">
                            <span className="text-yellow-400">★</span>
                            <span className="ml-1">{item.rating}</span>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {activeTab === 'busrentals' && (
                      <>
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>Route:</span>
                          </div>
                          <span className="font-medium">{item.route}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Departure:</span>
                          <span className="font-medium">{item.departureTime}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Capacity:</span>
                          <span className="font-medium">{item.capacity} seats</span>
                        </div>
                      </>
                    )}
                    
                    {activeTab === 'attractions' && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">{item.category}</span>
                          <div className="flex">
                            <span className="text-yellow-400">★</span>
                            <span className="ml-1">{item.rating}</span>
                          </div>
                        </div>
                      </>
                    )}
                    
                    {activeTab === 'airporttaxis' && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span>Driver:</span>
                          <span className="font-medium">{item.driver}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>Location:</span>
                          </div>
                          <span className="font-medium">{item.location}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Capacity:</span>
                          <span className="font-medium">{item.capacity} passengers</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleView(item.id)}
                        className="h-8 w-8 text-gray-400 hover:text-white"
                      >
                        <Eye size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleEdit(item.id)}
                        className="h-8 w-8 text-gray-400 hover:text-white"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(item.id)}
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
            <ServiceIcon size={32} />
          </div>
          <h2 className="text-xl font-medium mb-2">No {getServiceTitle()} Found</h2>
          <p className="text-gray-400 text-center max-w-md">
            We couldn't find any {getServiceTitle().toLowerCase()} matching your search criteria. 
            Try adjusting your search or add a new {activeTab === 'airporttaxis' ? 'taxi' : activeTab.slice(0, -1)}.
          </p>
          <Button className="mt-4 bg-zippy-blue hover:bg-zippy-blue/90">
            Add New {activeTab === 'airporttaxis' ? 'Taxi' : activeTab.slice(0, -1)}
          </Button>
        </div>
      )}
    </div>
  );
}
