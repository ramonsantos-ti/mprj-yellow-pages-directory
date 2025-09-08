
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole = 'user' 
}) => {
  const { user, isLoading } = useAuth();

  console.log('[ProtectedRoute] States:', { 
    user: user ? { id: user.id, email: user.email, name: user.name } : null, 
    isLoading, 
    requiredRole 
  });

  if (isLoading) {
    console.log('[ProtectedRoute] Still loading, showing loading screen');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('[ProtectedRoute] No user found, showing access denied');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <Shield className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <CardTitle className="text-2xl text-gray-900">Acesso Negado</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Você precisa estar logado para acessar esta página.
            </p>
            <Link to="/auth">
              <Button className="w-full bg-red-900 hover:bg-red-800">
                Fazer Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (requiredRole === 'admin' && user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <Shield className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <CardTitle className="text-2xl text-gray-900">Acesso Restrito</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Você não possui privilégios de administrador para acessar esta página.
            </p>
            <p className="text-sm text-gray-500">
              Entre em contato com um administrador se precisar de acesso.
            </p>
            <Link to="/">
              <Button variant="outline" className="w-full flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar ao Início</span>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
