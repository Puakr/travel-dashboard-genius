
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { 
  BarChart3, 
  Users as UsersIcon, 
  Hotel, 
  Plane, 
  Bus, 
  Ticket, 
  Car 
} from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";

import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Analytics from "./pages/Analytics";
import Users from "./pages/Users";
import Stays from "./pages/Stays";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

// Create specific placeholder pages for services
const FlightsPage = () => <PlaceholderPage title="Flights" icon={Plane} />;
const BusRentalsPage = () => <PlaceholderPage title="Bus Rentals" icon={Bus} />;
const AttractionsPage = () => <PlaceholderPage title="Attractions" icon={Ticket} />;
const AirportTaxisPage = () => <PlaceholderPage title="Airport Taxis" icon={Car} />;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <Layout>
                <Dashboard />
              </Layout>
            } />
            <Route path="/bookings" element={
              <Layout>
                <Bookings />
              </Layout>
            } />
            <Route path="/analytics" element={
              <Layout>
                <Analytics />
              </Layout>
            } />
            <Route path="/users" element={
              <Layout>
                <Users />
              </Layout>
            } />
            <Route path="/stays" element={
              <Layout>
                <Stays />
              </Layout>
            } />
            <Route path="/flights" element={
              <Layout>
                <FlightsPage />
              </Layout>
            } />
            <Route path="/bus-rentals" element={
              <Layout>
                <BusRentalsPage />
              </Layout>
            } />
            <Route path="/attractions" element={
              <Layout>
                <AttractionsPage />
              </Layout>
            } />
            <Route path="/airport-taxis" element={
              <Layout>
                <AirportTaxisPage />
              </Layout>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
