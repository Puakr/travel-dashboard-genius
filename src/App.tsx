
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Analytics from "./pages/Analytics";
import Users from "./pages/Users";
import Stays from "./pages/Stays";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
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
      <BrowserRouter>
        <AuthProvider>
          <SidebarProvider>
            <Routes>
              <Route path="/sign-in" element={<SignIn />} />
              
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/bookings" element={
                <ProtectedRoute>
                  <Layout>
                    <Bookings />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/analytics" element={
                <ProtectedRoute>
                  <Layout>
                    <Analytics />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/users" element={
                <ProtectedRoute>
                  <Layout>
                    <Users />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/stays" element={
                <ProtectedRoute>
                  <Layout>
                    <Stays />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/flights" element={
                <ProtectedRoute>
                  <Layout>
                    <FlightsPage />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/bus-rentals" element={
                <ProtectedRoute>
                  <Layout>
                    <BusRentalsPage />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/attractions" element={
                <ProtectedRoute>
                  <Layout>
                    <AttractionsPage />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/airport-taxis" element={
                <ProtectedRoute>
                  <Layout>
                    <AirportTaxisPage />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Layout>
                    <Settings />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SidebarProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
