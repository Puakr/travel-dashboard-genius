
import { useState } from "react";
import { Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FlightSearchBar } from "@/components/flights/FlightSearchBar";
import { FlightTable } from "@/components/flights/FlightTable";
import { FlightGrid } from "@/components/flights/FlightGrid";
import { EmptyFlightState } from "@/components/flights/EmptyFlightState";
import { FlightData } from "@/types/flights";

const flightData: FlightData[] = [
  {
    id: 1,
    flightNumber: "ZT1234",
    airline: "ZippyAir",
    departure: "New York (JFK)",
    destination: "London (LHR)",
    departureTime: "09:30 AM",
    price: 449,
    status: "on-time"
  },
  {
    id: 2,
    flightNumber: "ZT2345",
    airline: "ZippyAir",
    departure: "Los Angeles (LAX)",
    destination: "Tokyo (HND)",
    departureTime: "11:45 AM",
    price: 899,
    status: "delayed"
  },
  {
    id: 3,
    flightNumber: "ZT3456",
    airline: "ZippyAir",
    departure: "Chicago (ORD)",
    destination: "Paris (CDG)",
    departureTime: "07:15 PM",
    price: 599,
    status: "on-time"
  }
];

export default function Flights() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  
  const filteredFlights = flightData.filter(flight => 
    flight.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.departure.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flight.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteFlight = (id: number) => {
    toast.success(`Flight ID #${id} deleted successfully`);
    // In a real app, this would delete the flight from the database
  };

  const handleEditFlight = (id: number) => {
    toast.info(`Editing flight ID #${id}`);
    // In a real app, this would open an edit form
  };

  const handleViewFlight = (id: number) => {
    toast.info(`Viewing details for flight ID #${id}`);
    // In a real app, this would show detailed information
  };

  const handleAddNewFlight = () => {
    toast.info("Adding new flight");
    // In a real app, this would open a form to add a new flight
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'delayed':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'cancelled':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Plane className="text-zippy-blue" />
          Manage Flights
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
          <Button 
            className="bg-zippy-blue hover:bg-zippy-blue/90"
            onClick={handleAddNewFlight}
          >
            Add New Flight
          </Button>
        </div>
      </div>
      
      <FlightSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      {filteredFlights.length > 0 ? (
        viewMode === "table" ? (
          <FlightTable
            flights={filteredFlights}
            onViewFlight={handleViewFlight}
            onEditFlight={handleEditFlight}
            onDeleteFlight={handleDeleteFlight}
            getStatusColor={getStatusColor}
          />
        ) : (
          <FlightGrid
            flights={filteredFlights}
            onViewFlight={handleViewFlight}
            onEditFlight={handleEditFlight}
            onDeleteFlight={handleDeleteFlight}
            getStatusColor={getStatusColor}
          />
        )
      ) : (
        <EmptyFlightState onAddNewFlight={handleAddNewFlight} />
      )}
    </div>
  );
}
