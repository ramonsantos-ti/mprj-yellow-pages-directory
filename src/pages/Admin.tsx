
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockProfiles, mockUsers } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  Search,
  Edit,
  Trash2,
  Eye,
  Download,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'sonner';

const Admin: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  if (!user || user.role !== 'admin') {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Acesso negado. Esta página é restrita a administradores.
        </AlertDescription>
      </Alert>
    );
  }

  const filteredProfiles = mockProfiles.filter(profile =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.matricula.includes(searchTerm) ||
    profile.cargo.some(cargo => cargo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDeleteProfile = (profileId: string) => {
    // Simular exclusão
    toast.success('Perfil excluído com sucesso');
  };

  const handleApproveProfile = (profileId: string) => {
    // Simular aprovação
    toast.success('Perfil aprovado com sucesso');
  };

  const handleRejectProfile = (profileId: string) => {
    // Simular rejeição
    toast.success('Perfil rejeitado');
  };

  const exportData = () => {
    // Simular exportação
    toast.success('Relatório gerado com sucesso');
  };

  const getProfileStats = () => {
    const total = mockProfiles.length;
    const membros = mockProfiles.filter(p => p.cargo.some(c => c.includes('Procurador') || c.includes('Promotor'))).length;
    const servidores = total - membros;
    const atualizadosRecentemente = mockProfiles.filter(p => {
      const diffTime = Math.abs(new Date().getTime() - p.lastUpdated.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 30;
    }).length;

    return { total, membros, servidores, atualizadosRecentemente };
  };

  const stats = getProfileStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Administração</h1>
        <Button onClick={exportData} className="bg-amber-900 hover:bg-amber-800">
          <Download className="w-4 h-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-8 h-8 text-amber-900" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-sm text-gray-600">Total de Perfis</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.membros}</p>
                <p className="text-sm text-gray-600">Membros do MP</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.servidores}</p>
                <p className="text-sm text-gray-600">Servidores</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-8 h-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.atualizadosRecentemente}</p>
                <p className="text-sm text-gray-600">Atualizados (30d)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="profiles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profiles">Gestão de Perfis</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="profiles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Gestão de Perfis</span>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Buscar perfis..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Matrícula</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Última Atualização</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProfiles.map((profile) => (
                    <TableRow key={profile.id}>
                      <TableCell className="font-medium">{profile.name}</TableCell>
                      <TableCell>{profile.matricula}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {profile.cargo.slice(0, 2).map((cargo, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {cargo}
                            </Badge>
                          ))}
                          {profile.cargo.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{profile.cargo.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {format(profile.lastUpdated, "dd/MM/yyyy", { locale: ptBR })}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Ativo
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Detalhes do Perfil</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="font-medium">Nome:</p>
                                    <p className="text-gray-700">{profile.name}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium">Email:</p>
                                    <p className="text-gray-700">{profile.email}</p>
                                  </div>
                                  <div>
                                    <p className="font-medium">Unidades:</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {profile.unidade.map((unidade, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                          {unidade}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <p className="font-medium">Áreas de Conhecimento:</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {profile.areasConhecimento.slice(0, 3).map((area, index) => (
                                        <Badge key={index} variant="secondary" className="text-xs">
                                          {area}
                                        </Badge>
                                      ))}
                                      {profile.areasConhecimento.length > 3 && (
                                        <Badge variant="outline" className="text-xs">
                                          +{profile.areasConhecimento.length - 3}
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                {profile.biografia && (
                                  <div>
                                    <p className="font-medium">Biografia:</p>
                                    <p className="text-gray-700 text-sm mt-1">{profile.biografia}</p>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteProfile(profile.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usuários do Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Matrícula</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.matricula}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                          {user.role === 'admin' ? 'Administrador' : 'Usuário'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Ativo
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Distribuição por Cargo</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Procuradores de Justiça</span>
                    <Badge>
                      {mockProfiles.filter(p => p.cargo.some(c => c.includes('Procurador'))).length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Promotores de Justiça</span>
                    <Badge>
                      {mockProfiles.filter(p => p.cargo.some(c => c.includes('Promotor'))).length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Servidores Efetivos</span>
                    <Badge>
                      {mockProfiles.filter(p => p.cargo.some(c => c.includes('Efetivo'))).length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Servidores Comissionados</span>
                    <Badge>
                      {mockProfiles.filter(p => p.cargo.some(c => c.includes('Comissionado'))).length}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Áreas Mais Populares</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Simulação das áreas mais populares */}
                  <div className="flex justify-between items-center">
                    <span>Direito Penal</span>
                    <Badge>8</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Gestão Pública</span>
                    <Badge>6</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Direito Civil</span>
                    <Badge>5</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Tecnologia da Informação</span>
                    <Badge>4</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Configurações do Sistema</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Moderação</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Aprovação automática de perfis</p>
                      <p className="text-sm text-gray-600">Perfis são aprovados automaticamente após cadastro</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Ativado
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notificações por email</p>
                      <p className="text-sm text-gray-600">Enviar notificações sobre atualizações de perfil</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Ativado
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Exportação</h3>
                <div className="space-y-3">
                  <Button className="bg-amber-900 hover:bg-amber-800">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar Todos os Perfis (Excel)
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar Relatório de Uso (PDF)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
