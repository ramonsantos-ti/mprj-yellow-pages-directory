
import React, { useState, useMemo } from 'react';
import { mockProfiles } from '../data/mockData';
import { Profile, User } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Users, Search, UserCheck, UserX, Shield, Trash2, Download, FileText, BarChart3, Settings, CheckCircle, XCircle, BookOpen, Globe, Mail, History, PieChart, TrendingUp } from 'lucide-react';
import { generateProfileReport } from '../utils/pdfReports';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Admin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>(mockProfiles);

  // Sort profiles to show recently updated first
  const sortedProfiles = useMemo(() => {
    return [...profiles].sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
  }, [profiles]);
  
  const filteredProfiles = useMemo(() => {
    return sortedProfiles.filter(profile => 
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.matricula.includes(searchTerm)
    );
  }, [sortedProfiles, searchTerm]);

  const toggleProfileStatus = (profileId: string) => {
    setProfiles(prev => prev.map(profile => 
      profile.id === profileId ? { ...profile, isActive: !profile.isActive } : profile
    ));
  };

  const promoteToAdmin = (profileId: string) => {
    setProfiles(prev => prev.map(profile => 
      profile.id === profileId ? { ...profile, role: 'admin' } : profile
    ));
  };

  const deleteProfile = (profileId: string) => {
    setProfiles(prev => prev.filter(profile => profile.id !== profileId));
  };

  const generateReport = (reportType: string) => {
    generateProfileReport(profiles, reportType);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const isRecentlyUpdated = (lastUpdated: Date) => {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return new Date(lastUpdated) > oneDayAgo;
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Painel de Administração
        </h1>
        <p className="text-lg text-gray-600">
          Gerencie perfis, usuários e gere relatórios do sistema
        </p>
      </div>

      <Tabs defaultValue="profiles" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profiles">Gestão de Perfis</TabsTrigger>
          <TabsTrigger value="audit">Logs de Auditoria</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="analytics">Indicadores</TabsTrigger>
        </TabsList>

        <TabsContent value="profiles" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome, email ou matrícula..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-96"
                />
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {filteredProfiles.length} perfis encontrados
            </div>
          </div>

          <div className="grid gap-4">
            {filteredProfiles.map(profile => (
              <Card 
                key={profile.id} 
                className={`${isRecentlyUpdated(profile.lastUpdated) ? 'ring-2 ring-red-200 bg-red-50' : ''}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border">
                        {profile.fotoUrl ? (
                          <img 
                            src={profile.fotoUrl} 
                            alt={profile.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-red-100 flex items-center justify-center">
                            <span className="text-red-900 font-semibold text-sm">
                              {getInitials(profile.name)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-gray-900">{profile.name}</h3>
                          {isRecentlyUpdated(profile.lastUpdated) && (
                            <Badge className="bg-red-900 text-white text-xs">
                              Atualizado recentemente
                            </Badge>
                          )}
                          <Badge variant={profile.isActive ? "default" : "secondary"}>
                            {profile.isActive ? "Ativo" : "Inativo"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">Matrícula: {profile.matricula}</p>
                        <p className="text-sm text-gray-600">{profile.email}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {profile.cargo.map((cargo, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {cargo}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Última atualização: {format(profile.lastUpdated, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleProfileStatus(profile.id)}
                        className="flex items-center space-x-1"
                      >
                        {profile.isActive ? (
                          <>
                            <XCircle className="w-4 h-4" />
                            <span>Desativar</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            <span>Ativar</span>
                          </>
                        )}
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => promoteToAdmin(profile.id)}
                        className="flex items-center space-x-1"
                      >
                        <Shield className="w-4 h-4" />
                        <span>Admin</span>
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Excluir</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir o perfil de {profile.name}? 
                              Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteProfile(profile.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <History className="w-5 h-5" />
                <span>Logs de Auditoria</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <Input placeholder="Buscar por usuário ou ação..." className="flex-1" />
                  <Select>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Tipo de ação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="login">Login</SelectItem>
                      <SelectItem value="update">Atualização</SelectItem>
                      <SelectItem value="delete">Exclusão</SelectItem>
                      <SelectItem value="create">Criação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-gray-500">Implementação em desenvolvimento...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>Envio de E-mails e Notificações</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Destinatários</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar grupo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os usuários</SelectItem>
                        <SelectItem value="active">Usuários ativos</SelectItem>
                        <SelectItem value="inactive">Usuários inativos</SelectItem>
                        <SelectItem value="admins">Administradores</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tipo de notificação</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">E-mail</SelectItem>
                        <SelectItem value="system">Notificação do sistema</SelectItem>
                        <SelectItem value="both">Ambos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Assunto</label>
                  <Input placeholder="Digite o assunto da mensagem" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Mensagem</label>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md resize-none h-32"
                    placeholder="Digite sua mensagem aqui..."
                  />
                </div>
                <Button className="bg-red-900 hover:bg-red-800">
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar Notificação
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Relatórios Personalizados</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Filtrar por cargo</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos os cargos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="promotor">Promotor</SelectItem>
                        <SelectItem value="procurador">Procurador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Filtrar por unidade</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Todas as unidades" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="criminal">Criminal</SelectItem>
                        <SelectItem value="civel">Cível</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos os status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="active">Ativos</SelectItem>
                        <SelectItem value="inactive">Inativos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    onClick={() => generateReport('filtered')}
                    className="bg-red-900 hover:bg-red-800"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Gerar Relatório Completo (PDF)
                  </Button>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Exportar Excel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total de Perfis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <div className="flex text-xs text-gray-500">
                  <span className="text-green-600">108 ativos</span>
                  <span className="mx-2">•</span>
                  <span className="text-red-600">19 inativos</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Perfis Completos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <div className="text-xs text-gray-500">92 de 108 perfis ativos</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Atualizações (30 dias)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">67%</div>
                <div className="text-xs text-gray-500">72 perfis atualizados</div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="w-5 h-5" />
                  <span>Especialistas por Área</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Direito Criminal</span>
                    <Badge variant="secondary">34</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Direito Cível</span>
                    <Badge variant="secondary">28</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Direito Ambiental</span>
                    <Badge variant="secondary">22</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Direito do Consumidor</span>
                    <Badge variant="secondary">18</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Crescimento</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">+12</div>
                <div className="text-xs text-gray-500">novos cadastros este mês</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
