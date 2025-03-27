
import { useState } from "react";
import { Hotel, Star, Search, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HotelData {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  amenities: string[];
}

const hotelData: HotelData[] = [
  {
    id: 1,
    name: "Grand Luxury Hotel",
    location: "Downtown, New York",
    price: 199,
    rating: 4.8,
    image: "/lovable-uploads/e2b94875-a240-4cc0-b0e2-45c798e90d92.png",
    amenities: ["Wi-Fi", "Pool", "Spa", "Gym"]
  },
  {
    id: 2,
    name: "Oceanview Resort",
    location: "Beachfront, Miami",
    price: 249,
    rating: 4.6,
    image: "/placeholder.svg",
    amenities: ["Wi-Fi", "Beach Access", "Restaurant", "Bar"]
  },
  {
    id: 3,
    name: "Mountain Retreat Lodge",
    location: "Alpine Heights, Colorado",
    price: 179,
    rating: 4.5,
    image: "/placeholder.svg",
    amenities: ["Wi-Fi", "Fireplace", "Hiking", "Restaurant"]
  }
];

export default function Stays() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredHotels = hotelData.filter(hotel => 
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Hotel className="text-zippy-blue" />
        Stays
      </h1>
      
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-zippy-darker rounded-lg">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search hotels by name or location..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-zippy-dark focus:border-zippy-blue text-white"
          />
        </div>
        <Button className="bg-zippy-blue hover:bg-zippy-blue/90">
          Find Hotels
        </Button>
      </div>
      
      {filteredHotels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map(hotel => (
            <Card key={hotel.id} className="bg-zippy-darker border-white/[0.03] text-white overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src={hotel.image} 
                  alt={hotel.name} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold">{hotel.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="fill-yellow-400 text-yellow-400" size={16} />
                    <span>{hotel.rating}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-400 gap-1 text-sm">
                  <MapPin size={16} />
                  <span>{hotel.location}</span>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-wrap gap-2 mt-2">
                  {hotel.amenities.map((amenity, index) => (
                    <Badge key={index} variant="outline" className="bg-zippy-blue/10 border-zippy-blue/20 text-zippy-blue">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div>
                  <span className="text-xl font-bold">${hotel.price}</span>
                  <span className="text-gray-400 text-sm"> / night</span>
                </div>
                <Button className="bg-zippy-blue hover:bg-zippy-blue/90">
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-xl p-12 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-zippy-blue/10 flex items-center justify-center text-zippy-blue mb-4">
            <Hotel size={32} />
          </div>
          <h2 className="text-xl font-medium mb-2">No Hotels Found</h2>
          <p className="text-gray-400 text-center max-w-md">
            We couldn't find any hotels matching your search criteria. 
            Try adjusting your search or browse all available options.
          </p>
        </div>
      )}
    </div>
  );
}
