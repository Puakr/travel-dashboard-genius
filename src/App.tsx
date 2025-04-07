
import { Toaster } from "@/components/ui/toaster";
import { SonnerToaster } from "@/components/ui/feedback-components";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

import Layout from "./components/layout/Layout";
import MainPage from "./pages/MainPage";
import ServicePage from "./pages/ServicePage";
import ManagementPage from "./pages/ManagementPage";
import SettingsPage from "./pages/SettingsPage";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <SonnerToaster />
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <SidebarProvider>
              <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                
                <Route path="/" element={
                  <ProtectedRoute>
                    <Layout>
                      <MainPage />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/services" element={
                  <ProtectedRoute>
                    <Layout>
                      <ServicePage />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/management" element={
                  <ProtectedRoute>
                    <Layout>
                      <ManagementPage />
                    </Layout>
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Layout>
                      <SettingsPage />
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
