
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import ProfileDetail from "./pages/ProfileDetail";
import ProfileEdit from "./pages/ProfileEdit";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile/:id" element={
              <Layout>
                <ProfileDetail />
              </Layout>
            } />
            <Route path="/profile" element={
              <Layout>
                <ProtectedRoute>
                  <ProfileEdit />
                </ProtectedRoute>
              </Layout>
            } />
            <Route path="/admin" element={
              <Layout>
                <ProtectedRoute requiredRole="admin">
                  <Admin />
                </ProtectedRoute>
              </Layout>
            } />
            <Route path="/" element={
              <Layout>
                <Home />
              </Layout>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
