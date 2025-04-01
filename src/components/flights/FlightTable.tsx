
import { Edit, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FlightData } from "@/types/flights";

interface FlightTableProps {
  flights: FlightData[];
  onViewFlight: (id: number) => void;
  onEditFlight: (id: number) => void;
  onDeleteFlight: (id: number) => void;
  getStatusColor: (status: string) => string;
}

export function FlightTable({ flights, onViewFlight, onEditFlight, onDeleteFlight, getStatusColor }: FlightTableProps) {
  return (
    <Card className="bg-zippy-darker border-white/[0.03] text-white">
      <CardHeader className="pb-0">
        <h3 className="text-lg font-medium">Flight Listings</h3>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-white/[0.03]">
              <TableHead>Flight #</TableHead>
              <TableHead>Airline</TableHead>
              <TableHead>Departure</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flights.map(flight => (
              <TableRow key={flight.id} className="border-white/[0.03]">
                <TableCell className="font-medium">{flight.flightNumber}</TableCell>
                <TableCell>{flight.airline}</TableCell>
                <TableCell>{flight.departure}</TableCell>
                <TableCell>{flight.destination}</TableCell>
                <TableCell>{flight.departureTime}</TableCell>
                <TableCell>${flight.price}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(flight.status)}>
                    {flight.status === 'on-time' ? 'On Time' : 
                     flight.status === 'delayed' ? 'Delayed' : 'Cancelled'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
