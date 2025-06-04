import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { LogOut, User, Settings, Home } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({
  children
}) => {
  const {
    user,
    logout
  } = useAuth();
  const location = useLocation();
  return <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-4 border-red-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img src="/lovable-uploads/9bdb3a99-0580-4f1a-90fd-bca0f42a713d.png" alt="MPRJ Logo" className="h-16 w-auto" />
              <div>
                <h1 className="text-xl font-bold text-red-900"></h1>
                <p className="text-sm text-gray-600"></p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/' ? 'text-red-900 bg-red-50' : 'text-gray-700 hover:text-red-900 hover:bg-red-50'}`}>
                <Home className="w-4 h-4" />
                <span>Início</span>
              </Link>
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {user ? <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center space-x-2 border-red-900 text-red-900 hover:bg-red-50">
                      <User className="w-4 h-4" />
                      <span className="hidden md:inline">{user.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Meu Perfil</span>
                      </Link>
                    </DropdownMenuItem>
                    {user.role === 'admin' && <DropdownMenuItem asChild>
                        <Link to="/admin" className="flex items-center space-x-2">
                          <Settings className="w-4 h-4" />
                          <span>Administração</span>
                        </Link>
                      </DropdownMenuItem>}
                    <DropdownMenuItem onClick={logout} className="flex items-center space-x-2">
                      <LogOut className="w-4 h-4" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> : <Link to="/login">
                  <Button className="bg-red-900 hover:bg-red-800">
                    Login
                  </Button>
                </Link>}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-red-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p>&copy; 2024 Ministério Público do Estado do Rio de Janeiro</p>
            <p className="text-sm text-red-200 mt-2">
              Sistema de Páginas Amarelas - Conectando especialistas
            </p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Layout;