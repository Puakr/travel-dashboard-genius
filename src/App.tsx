
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Analytics from "./pages/Analytics";
import Users from "./pages/Users";
import Stays from "./pages/Stays";
import SignIn from "./pages/SignIn";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Flights from "./pages/Flights";
import BusRentals from "./pages/BusRentals";
import Attractions from "./pages/Attractions";
import AirportTaxis from "./pages/AirportTaxis";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <SidebarProvider>
              <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                
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
                      <Flights />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/bus-rentals" element={
                  <ProtectedRoute>
                    <Layout>
                      <BusRentals />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/attractions" element={
                  <ProtectedRoute>
                    <Layout>
                      <Attractions />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/airport-taxis" element={
                  <ProtectedRoute>
                    <Layout>
                      <AirportTaxis />
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
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
