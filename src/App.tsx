
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { AccessibilityProvider } from "./contexts/AccessibilityContext";
import { AccessibilityWidget } from "./components/AccessibilityWidget";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import ProfileDetail from "./pages/ProfileDetail";
import ProfileEdit from "./pages/ProfileEdit";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Indicadores from "./pages/Indicadores";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AccessibilityProvider>
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
                  {(() => {
                    console.log('[App] Renderizando rota /profile - ProfileEdit');
                    return <ProfileEdit />;
                  })()}
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
            <Route path="/indicadores" element={
              <Layout>
                <Indicadores />
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
        <AccessibilityWidget />
      </AuthProvider>
    </AccessibilityProvider>
  </TooltipProvider>
</QueryClientProvider>
);

export default App;
