
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FlightSearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export function FlightSearchBar({ searchTerm, setSearchTerm }: FlightSearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-zippy-darker rounded-lg">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input 
          placeholder="Search flights by number, airline, or location..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-zippy-dark focus:border-zippy-blue text-white"
        />
      </div>
      <Button className="bg-zippy-blue hover:bg-zippy-blue/90">
        Search
      </Button>
    </div>
  );
}
