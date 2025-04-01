
import { Edit, Eye, MapPin, Plane, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FlightData } from "@/types/flights";

interface FlightGridProps {
  flights: FlightData[];
  onViewFlight: (id: number) => void;
  onEditFlight: (id: number) => void;
  onDeleteFlight: (id: number) => void;
  getStatusColor: (status: string) => string;
}

export function FlightGrid({ flights, onViewFlight, onEditFlight, onDeleteFlight, getStatusColor }: FlightGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {flights.map(flight => (
        <Card key={flight.id} className="bg-zippy-darker border-white/[0.03] text-white overflow-hidden">
          <div className="h-48 overflow-hidden relative bg-zippy-blue/20 flex items-center justify-center">
            <Plane size={64} className="text-zippy-blue opacity-50" />
            <Badge 
              variant="outline" 
              className={`absolute top-3 right-3 ${getStatusColor(flight.status)}`}
            >
              {flight.status === 'on-time' ? 'On Time' : 
                flight.status === 'delayed' ? 'Delayed' : 'Cancelled'}
            </Badge>
          </div>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold">{flight.flightNumber}</h3>
              <span>${flight.price}</span>
            </div>
            <div className="flex items-center text-gray-400 gap-1 text-sm">
              <span>{flight.airline}</span>
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>From:</span>
                </div>
                <span className="font-medium">{flight.departure}</span>
              </div>
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>To:</span>
                </div>
                <span className="font-medium">{flight.destination}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Departure Time:</span>
                <span className="font-medium">{flight.departureTime}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onViewFlight(flight.id)}
                  className="h-8 w-8 text-gray-400 hover:text-white"
                >
                  <Eye size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onEditFlight(flight.id)}
                  className="h-8 w-8 text-gray-400 hover:text-white"
                >
                  <Edit size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onDeleteFlight(flight.id)}
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
  );
}
