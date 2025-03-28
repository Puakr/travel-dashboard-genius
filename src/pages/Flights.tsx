
import { BookingList } from "@/components/bookings/BookingList";
import { BookingStatsChart } from "@/components/bookings/BookingStats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Flights() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Flight Bookings Management</h1>
      
      <Tabs defaultValue="bookings" className="w-full">
        <TabsList>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>
        <TabsContent value="bookings">
          <BookingList serviceType="flight" />
        </TabsContent>
        <TabsContent value="statistics">
          <BookingStatsChart serviceType="flight" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
