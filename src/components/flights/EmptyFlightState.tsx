
import { Plane } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyFlightStateProps {
  onAddNewFlight: () => void;
}

export function EmptyFlightState({ onAddNewFlight }: EmptyFlightStateProps) {
  return (
    <div className="glass-card rounded-xl p-12 flex flex-col items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-zippy-blue/10 flex items-center justify-center text-zippy-blue mb-4">
        <Plane size={32} />
      </div>
      <h2 className="text-xl font-medium mb-2">No Flights Found</h2>
      <p className="text-gray-400 text-center max-w-md">
        We couldn't find any flights matching your search criteria. 
        Try adjusting your search or add a new flight.
      </p>
      <Button className="mt-4 bg-zippy-blue hover:bg-zippy-blue/90" onClick={onAddNewFlight}>
        Add New Flight
      </Button>
    </div>
  );
}
