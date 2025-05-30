
import React, { useState, useMemo } from 'react';
import { mockProfiles } from '../data/mockData';
import { Profile, User } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { 
  Users, 
  Search, 
  UserCheck, 
  UserX, 
  Shield, 
  Trash2, 
  Undo2,
  Download,
  FileText,
  BarChart3,
  Settings,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { generateProfileReport } from '../utils/pdfReports';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profiles');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>(mockProfiles);
  const [undoDialogOpen, setUndoDialogOpen] = useState(false);
  const [selectedProfileForUndo, setSelectedProfileForUndo] = useState<Profile | null>(null);

  // Sort profiles to show recently updated first
  const sortedProfiles = useMemo(() => {
    return [...profiles].sort((a, b) => 
      new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    );
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
      profile.id === profileId 
        ? { ...profile, isActive: !profile.isActive }
        : profile
    ));
  };

  const promoteToAdmin = (profileId: string) => {
    setProfiles(prev => prev.map(profile => 
      profile.id === profileId 
        ? { ...profile, profile: { ...profile.profile!, role: 'admin' } }
        : profile
    ));
  };

  const deleteProfile = (profileId: string) => {
    setProfiles(prev => prev.filter(profile => profile.id !== profileId));
  };

  const handleUndoUpdate = (profile: Profile) => {
    setSelectedProfileForUndo(profile);
    setUndoDialogOpen(true);
  };

  const confirmUndoUpdate = () => {
    if (selectedProfileForUndo) {
      // Here you would implement the actual undo logic
      // For now, we'll just show that the action was performed
      console.log('Desfazendo atualização do perfil:', selectedProfileForUndo.name);
      
      // Reset the profile to a previous state (mock implementation)
      setProfiles(prev => prev.map(profile => 
        profile.id === selectedProfileForUndo.id 
          ? { 
              ...profile, 
              lastUpdated: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 days ago
            }
          : profile
      ));
    }
    setUndoDialogOpen(false);
    setSelectedProfileForUndo(null);
  };

  const generateReport = (reportType: string) => {
    generateProfileReport(profiles, reportType);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const isRecentlyUpdated = (lastUpdated: Date) => {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return new Date(lastUpdated) > oneDayAgo;
  };

  const renderProfilesTab = () => (
    <div className="space-y-6">
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
        {filteredProfiles.map((profile) => (
          <Card 
            key={profile.id} 
            className={`${isRecentlyUpdated(profile.lastUpdated) ? 'ring-2 ring-red-200 bg-red-50' : ''}`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={profile.fotoUrl} alt={profile.name} />
                    <AvatarFallback className="bg-red-100 text-red-900 font-semibold">
                      {getInitials(profile.name)}
                    </AvatarFallback>
                  </Avatar>
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
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUndoUpdate(profile)}
                    className="flex items-center space-x-1"
                  >
                    <Undo2 className="w-4 h-4" />
                    <span>Desfazer</span>
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

      {/* Undo Update Dialog */}
      <AlertDialog open={undoDialogOpen} onOpenChange={setUndoDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Desfazer Atualização</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedProfileForUndo && (
                <div className="space-y-2">
                  <p>Perfil: <strong>{selectedProfileForUndo.name}</strong></p>
                  <p>Última atualização: <strong>{format(selectedProfileForUndo.lastUpdated, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}</strong></p>
                  <p className="text-sm text-gray-600 mt-2">
                    Esta ação irá desfazer a última atualização do perfil e um e-mail será enviado 
                    ao usuário informando sobre a ação tomada por violar as regras de utilização.
                  </p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmUndoUpdate}
              className="bg-red-600 hover:bg-red-700"
            >
              Confirmar e Enviar E-mail
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );

  const renderReportsTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Relatórios Disponíveis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { type: 'cargos', title: 'Relatório por Cargos', icon: Users },
              { type: 'areas-conhecimento', title: 'Áreas de Conhecimento', icon: BookOpen },
              { type: 'formacao', title: 'Formação Acadêmica', icon: FileText },
              { type: 'habilidades', title: 'Habilidades Técnicas', icon: Settings },
              { type: 'idiomas', title: 'Idiomas', icon: Globe },
              { type: 'colaboracao', title: 'Tipos de Colaboração', icon: Users },
            ].map((report) => {
              const IconComponent = report.icon;
              return (
                <Card key={report.type} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <IconComponent className="w-8 h-8 mx-auto mb-2 text-red-900" />
                    <h3 className="font-medium text-gray-900 mb-2">{report.title}</h3>
                    <Button
                      onClick={() => generateReport(report.type)}
                      className="w-full bg-red-900 hover:bg-red-800"
                      size="sm"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Gerar PDF
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );

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

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('profiles')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'profiles'
                ? 'border-red-900 text-red-900'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Users className="w-4 h-4 inline-block mr-2" />
            Gestão de Perfis
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'reports'
                ? 'border-red-900 text-red-900'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <BarChart3 className="w-4 h-4 inline-block mr-2" />
            Relatórios
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'profiles' && renderProfilesTab()}
      {activeTab === 'reports' && renderReportsTab()}
    </div>
  );
};

export default Admin;
