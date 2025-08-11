import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AccessibilityContext, AccessibilityProvider } from '../contexts/AccessibilityContext';
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
import { LogOut, User, Settings } from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from './ui/sidebar';
import { BarChart3, Search } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const InnerLayout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { contrast, fontSize, toggleContrast, increaseFont, decreaseFont } = useContext(AccessibilityContext)!;

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  const getUserInitials = (name: string) =>
    name.split(' ').map(w => w.charAt(0)).slice(0, 2).join('').toUpperCase();

  const rootClasses = `
    ${contrast === 'high' ? 'bg-black text-white' : ''}
    ${fontSize === 'lg' ? 'text-lg' : fontSize === 'xl' ? 'text-xl' : 'text-base'}
    min-h-screen w-full
  `;

  return (
    <SidebarProvider>
      <div className={rootClasses}>
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              
              {/* Sidebar trigger + logo */}
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

              {/* Navigation + Acessibilidade */}
              <div className="flex items-center space-x-4">
                {/* Accessibility controls */}
                <div className="flex items-center space-x-2">
                  <button onClick={toggleContrast} className="px-2 py-1 border rounded">Alto Contraste</button>
                  <button onClick={increaseFont} className="px-2 py-1 border rounded">A+</button>
                  <button onClick={decreaseFont} className="px-2 py-1 border rounded">A-</button>
                </div>

                {/* Main menu */}
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

                {user ? (
                  <>
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
                        <Button variant="ghost" className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-red-900 text-white text-lg">
                              {getUserInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="end" forceMount>
                        <div className="flex flex-col space-y-1 p-2">
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                          <p className="text-xs text-muted-foreground">{user.matricula}</p>
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
                    <Button className="bg-red-900 hover:bg-red-800 py-3 px-6 rounded-lg text-xl">
                      Entrar
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <Separator className="bg-amber-800 h-1" />
        </header>

        {/* Main content */}
        <div className="flex w-full">
          <main className="flex-1 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <AccessibilityProvider>
    <InnerLayout>{children}</InnerLayout>
  </AccessibilityProvider>
);

export default Layout;
