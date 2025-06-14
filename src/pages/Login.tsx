import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Label } from '../components/ui/label';
import { LogIn, AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  // Check if user is admin (usuario01 or any user with admin role)
  const isAdminLogin = username === 'usuario01';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = login(username, password);
      if (success) {
        navigate('/');
      } else {
        setError('Usuário ou senha incorretos');
      }
    } catch (err) {
      setError('Erro ao realizar login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-block mb-4">
            <img 
              src="/lovable-uploads/9bdb3a99-0580-4f1a-90fd-bca0f42a713d.png" 
              alt="MPRJ Logo" 
              className="h-16 w-auto mx-auto hover:opacity-80 transition-opacity"
            />
          </Link>
          <h2 className="text-3xl font-bold text-gray-900">
            Acesso ao Sistema
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Páginas Amarelas do MPRJ
          </p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <LogIn className="w-5 h-5" />
              <span>Login</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">Usuário</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Digite seu usuário"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Não tem acesso?
                  </span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <Link
                  to="/register"
                  className="text-amber-900 hover:text-amber-800 font-medium"
                >
                  Solicitar cadastro
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credenciais de teste */}
        <Card className="bg-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle className="text-sm text-amber-900">
              Credenciais de Teste
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-amber-800 space-y-1">
            <p><strong>Administrador:</strong> usuario01 / usuario01</p>
            <p><strong>Usuário comum:</strong> usuario02 / usuario02</p>
            <p><em>Outros usuários: usuario03 a usuario14 com senhas correspondentes</em></p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
