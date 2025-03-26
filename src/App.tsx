
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { 
  BarChart3, 
  Users, 
  Hotel, 
  Plane, 
  Bus, 
  Ticket, 
  Taxi 
} from "lucide-react";

import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
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
              <PlaceholderPage title="Analytics" icon={BarChart3} />
            </Layout>
          } />
          <Route path="/users" element={
            <Layout>
              <PlaceholderPage title="Users" icon={Users} />
            </Layout>
          } />
          <Route path="/stays" element={
            <Layout>
              <PlaceholderPage title="Stays" icon={Hotel} />
            </Layout>
          } />
          <Route path="/flights" element={
            <Layout>
              <PlaceholderPage title="Flights" icon={Plane} />
            </Layout>
          } />
          <Route path="/bus-rentals" element={
            <Layout>
              <PlaceholderPage title="Bus Rentals" icon={Bus} />
            </Layout>
          } />
          <Route path="/attractions" element={
            <Layout>
              <PlaceholderPage title="Attractions" icon={Ticket} />
            </Layout>
          } />
          <Route path="/airport-taxis" element={
            <Layout>
              <PlaceholderPage title="Airport Taxis" icon={Taxi} />
            </Layout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
