import React, { useState, useMemo } from 'react';
import { useAdminProfiles } from '../hooks/useAdminProfiles';
import { StandardMessage } from '../types/admin';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent } from '../components/ui/card';
import { Loader2, AlertCircle } from 'lucide-react';
import { generateProfileReport, generateDetailedProfileReport } from '../utils/pdfReports';
import ProfilesTab from '../components/admin/ProfilesTab';
import NotificationsTab from '../components/admin/NotificationsTab';
import ReportsTab from '../components/admin/ReportsTab';
import KnowledgeAreasManagementTab from '../components/admin/KnowledgeAreasManagementTab';
import { ReviewsTab } from '../components/admin/ReviewsTab';

const Admin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { 
    profiles, 
    loading: profilesLoading, 
    error: profilesError,
    updateProfile,
    toggleProfileStatus,
    promoteToAdmin,
    deleteProfile 
  } = useAdminProfiles();
  
  const [standardMessages, setStandardMessages] = useState<StandardMessage[]>([
    {
      id: '1',
      title: 'Atualização de Perfil',
      content: 'Prezado(a), solicitamos a atualização de seu perfil no sistema. Por favor, acesse sua conta e complete as informações pendentes.'
    },
    {
      id: '2',
      title: 'Bem-vindo ao Sistema',
      content: 'Seja bem-vindo(a) ao Sistema de Especialistas do MPRJ. Complete seu perfil para aparecer nas buscas públicas.'
    }
  ]);
  const [newStandardMessage, setNewStandardMessage] = useState({ title: '', content: '' });
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [recipientType, setRecipientType] = useState('group');
  const [messageSubject, setMessageSubject] = useState('');
  const [messageContent, setMessageContent] = useState('');

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

  // Get unique values from profiles for filters
  const allCargos = [...new Set(profiles.flatMap(p => p.cargo || []))];
  const allUnidades = [...new Set(profiles.flatMap(p => p.unidade || []))];
  const allAreas = [...new Set(profiles.flatMap(p => p.temasInteresse || []))];

  const sendNotification = async () => {
    let recipients: string[] = [];
    
    if (recipientType === 'group') {
      const groupValue = selectedRecipients[0];
      switch (groupValue) {
        case 'all':
          recipients = profiles.map(p => p.email);
          break;
        case 'active':
          recipients = profiles.filter(p => p.isActive !== false).map(p => p.email);
          break;
        case 'inactive':
          recipients = profiles.filter(p => p.isActive === false).map(p => p.email);
          break;
        case 'admins':
          recipients = profiles.filter(p => p.role === 'admin').map(p => p.email);
          break;
      }
    } else {
      recipients = selectedRecipients;
    }
    
    // Clear form
    setMessageSubject('');
    setMessageContent('');
    setSelectedRecipients([]);
    
    alert(`Notificação enviada para ${recipients.length} destinatários!`);
  };

  const generateReport = async (reportType: string) => {
    generateProfileReport(profiles, reportType);
  };

  const generateDetailedReport = async (filteredProfiles: any[]) => {
    generateDetailedProfileReport(filteredProfiles);
  };

  if (profilesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-red-600" />
          <p className="text-gray-600">Carregando dados administrativos...</p>
        </div>
      </div>
    );
  }

  if (profilesError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="w-8 h-8 mx-auto mb-4 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Erro ao carregar dados</h3>
              <p className="text-gray-600 mb-4">{profilesError}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Tentar novamente
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          <TabsTrigger value="profiles">Perfis</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          <TabsTrigger value="knowledge">Áreas</TabsTrigger>
        </TabsList>

        <TabsContent value="profiles">
          <ProfilesTab
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredProfiles={filteredProfiles}
            toggleProfileStatus={toggleProfileStatus}
            promoteToAdmin={promoteToAdmin}
            deleteProfile={deleteProfile}
            updateProfile={updateProfile}
          />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationsTab
            profiles={profiles}
            standardMessages={standardMessages}
            setStandardMessages={setStandardMessages}
            newStandardMessage={newStandardMessage}
            setNewStandardMessage={setNewStandardMessage}
            selectedRecipients={selectedRecipients}
            setSelectedRecipients={setSelectedRecipients}
            recipientType={recipientType}
            setRecipientType={setRecipientType}
            messageSubject={messageSubject}
            setMessageSubject={setMessageSubject}
            messageContent={messageContent}
            setMessageContent={setMessageContent}
            sendNotification={sendNotification}
          />
        </TabsContent>

        <TabsContent value="reports">
          <ReportsTab
            allCargos={allCargos}
            allUnidades={allUnidades}
            allAreas={allAreas}
            generateReport={generateReport}
            profiles={profiles}
            generateDetailedReport={generateDetailedReport}
          />
        </TabsContent>

        <TabsContent value="reviews">
          <ReviewsTab />
        </TabsContent>

        <TabsContent value="knowledge">
          <KnowledgeAreasManagementTab />
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default Admin;
