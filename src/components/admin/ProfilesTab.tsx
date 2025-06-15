import React, { useState } from 'react';
import { Profile } from '../../types';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Search, UserCheck, UserX, Shield, Trash2, CheckCircle, XCircle, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import AdminProfileEditModal from './AdminProfileEditModal';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from "react-router-dom";

interface ProfilesTabProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredProfiles: Profile[];
  toggleProfileStatus: (profileId: string) => void;
  promoteToAdmin: (profileId: string) => void;
  deleteProfile: (profileId: string) => void;
  updateProfile: (profileId: string, updatedData: Partial<Profile>) => void;
}

const ProfilesTab: React.FC<ProfilesTabProps> = ({
  searchTerm,
  setSearchTerm,
  filteredProfiles,
  toggleProfileStatus,
  promoteToAdmin,
  deleteProfile,
  updateProfile
}) => {
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [deletingProfile, setDeletingProfile] = useState<Profile | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const isRecentlyUpdated = (lastUpdated: Date) => {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return new Date(lastUpdated) > oneDayAgo;
  };

  const handleDeleteProfile = async (profile: Profile) => {
    try {
      await deleteProfile(profile.id);
      setDeletingProfile(null);
      toast({
        title: "Usuário excluído com sucesso",
        description: `${profile.name} e todos os seus dados foram removidos permanentemente do sistema.`,
      });
    } catch (error: any) {
      console.error('Erro ao excluir usuário:', error);
      toast({
        title: "Erro ao excluir usuário",
        description: error.message || "Ocorreu um erro inesperado ao tentar excluir o usuário.",
        variant: "destructive",
      });
    }
  };

  return (
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
        {filteredProfiles.map(profile => (
          <Card 
            key={profile.id} 
            className={`${isRecentlyUpdated(profile.lastUpdated) ? 'ring-2 ring-red-200 bg-red-50' : ''}`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  {/* Increased photo size from w-16 h-24 to w-24 h-36 (50% increase) */}
                  <div className="w-24 h-36 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border">
                    {profile.fotoUrl ? (
                      <img 
                        src={profile.fotoUrl} 
                        alt={profile.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-red-100 flex items-center justify-center">
                        <span className="text-red-900 font-semibold text-base">
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
                      {profile.updatedByAdmin && (
                        <Badge className="bg-orange-100 text-orange-800 text-xs">
                          Alterado pelo Administrador
                        </Badge>
                      )}
                      <Badge variant={profile.isActive !== false ? "default" : "secondary"}>
                        {profile.isActive !== false ? "Ativo" : "Inativo"}
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
                    className="flex items-center space-x-1"
                    onClick={() => navigate(`/profile/${profile.id}?edit=1`)}
                  >
                    <Edit className="w-4 h-4" />
                    <span>Editar</span>
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1"
                      >
                        {profile.isActive !== false ? (
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
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          {profile.isActive !== false ? 'Desativar Perfil' : 'Ativar Perfil'}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {profile.isActive !== false 
                            ? `Tem certeza que deseja desativar o perfil de ${profile.name}? O perfil não aparecerá mais nas buscas públicas, mas continuará visível no painel de administração.`
                            : `Tem certeza que deseja ativar o perfil de ${profile.name}? O perfil voltará a aparecer nas buscas públicas.`
                          }
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => toggleProfileStatus(profile.id)}
                          className={profile.isActive !== false ? "bg-red-600 hover:bg-red-700" : ""}
                        >
                          {profile.isActive !== false ? 'Desativar' : 'Ativar'}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1"
                        showAdminStyle={profile.role === 'admin'}
                      >
                        <Shield className="w-4 h-4" />
                        <span>Admin</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          {profile.role === 'admin' ? 'Remover Privilégios de Administrador' : 'Promover a Administrador'}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {profile.role === 'admin' 
                            ? `Tem certeza que deseja remover os privilégios de administrador de ${profile.name}? Esta pessoa perderá o acesso ao painel de administração.`
                            : `Tem certeza que deseja promover ${profile.name} a administrador? Esta pessoa terá acesso total ao painel de administração.`
                          }
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => promoteToAdmin(profile.id)}
                          className={profile.role === 'admin' ? "bg-red-600 hover:bg-red-700" : ""}
                        >
                          {profile.role === 'admin' ? 'Remover Privilégios' : 'Promover'}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                        onClick={() => setDeletingProfile(profile)}
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Excluir</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-red-600">⚠️ ATENÇÃO: Exclusão Permanente</AlertDialogTitle>
                        <AlertDialogDescription className="space-y-4">
                          <div className="font-semibold text-gray-900">
                            Você está prestes a excluir PERMANENTEMENTE o usuário:
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg border">
                            <div><strong>Nome:</strong> {profile.name}</div>
                            <div><strong>Email:</strong> {profile.email}</div>
                            <div><strong>Matrícula:</strong> {profile.matricula}</div>
                          </div>
                          <div className="text-red-700 font-medium">
                            Esta ação irá excluir TODOS os dados do usuário:
                          </div>
                          <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                            <li>Perfil principal e informações pessoais</li>
                            <li>Todos os projetos cadastrados</li>
                            <li>Formações acadêmicas</li>
                            <li>Experiências profissionais</li>
                            <li>Disponibilidade e preferências de contato</li>
                            <li>Certificações e publicações</li>
                          </ul>
                          <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                            <div className="text-red-800 font-semibold text-sm">
                              ⚠️ ESTA AÇÃO NÃO PODE SER DESFEITA!
                            </div>
                            <div className="text-red-700 text-sm mt-1">
                              Todos os dados serão perdidos permanentemente.
                            </div>
                          </div>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDeletingProfile(null)}>
                          Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteProfile(profile)}
                          className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
                        >
                          SIM, EXCLUIR PERMANENTEMENTE
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
    </div>
  );
};

export default ProfilesTab;
