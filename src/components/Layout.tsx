import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import { LogOut, User, Settings, Home } from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from './ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { BarChart3, Search } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-custom-bg w-full">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Left: sidebar trigger + logo */}
              <div className="flex items-center gap-3">
                <SidebarTrigger aria-label="Alternar menu" />
                <Link to="/" className="flex items-center">
                  <img 
                    src="/lovable-uploads/67816a9d-4783-48d7-a5ea-020683c86e12.png" 
                    alt="MPRJ Logo Principal" 
                    className="h-18 w-auto"
                  />
                </Link>
              </div>

              {/* Navigation */}
              <div className="flex items-center space-x-4">
                {user ? (
                  <>
                    <Link to="/">
                      <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                        <Home className="w-4 h-4" />
                        <span className="hidden sm:inline">Início</span>
                      </Button>
                    </Link>

                     <Link to="/">
                      <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                        <Search className="w-4 h-4" />
                        <span className="hidden sm:inline">Buscar especialistas</span>
                      </Button>
                    </Link>
                    <Link to="/indicadores">
                      <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                        <BarChart3 className="w-4 h-4" />
                        <span className="hidden sm:inline">Indicadores</span>
                      </Button>
                    </Link>
                    
                    {user.role === 'admin' && (
                      <Link to="/admin">
                        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                          <Settings className="w-4 h-4" />
                          <span className="hidden sm:inline">Admin</span>
                        </Button>
                      </Link>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-red-900 text-white text-sm">
                              {getUserInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="end" forceMount>
                        <div className="flex flex-col space-y-1 p-2">
                          <p className="text-sm font-medium leading-none">{user.name}</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.matricula}
                          </p>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/profile" className="flex items-center">
                            <User className="mr-2 h-4 w-4" />
                            <span>Meu Perfil</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Sair</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  <Link to="/auth">
                    <Button className="bg-red-900 hover:bg-red-800">
                      Entrar
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          {/* Brown separator line */}
          <Separator className="bg-amber-800 h-1" />
        </header>

        {/* Main area with sidebar */}
        <div className="flex w-full">
          <AppSidebar />
          <main className="flex-1 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
