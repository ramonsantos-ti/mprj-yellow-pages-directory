
import React, { useState, useMemo, useEffect } from 'react';
import { mockProfiles } from '../data/mockData';
import { Profile } from '../types';
import { StandardMessage } from '../types/admin';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { generateProfileReport } from '../utils/pdfReports';
import { useAuditLog } from '../hooks/useAuditLog';
import ProfilesTab from '../components/admin/ProfilesTab';
import AuditTab from '../components/admin/AuditTab';
import NotificationsTab from '../components/admin/NotificationsTab';
import ReportsTab from '../components/admin/ReportsTab';
import AnalyticsTab from '../components/admin/AnalyticsTab';

const Admin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const { auditLogs, addAuditLog } = useAuditLog();
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

  // Load profiles from localStorage or use mock data
  useEffect(() => {
    const savedProfiles = localStorage.getItem('mprj_profiles');
    if (savedProfiles) {
      setProfiles(JSON.parse(savedProfiles));
    } else {
      setProfiles(mockProfiles);
    }
  }, []);

  // Save profiles to localStorage whenever profiles change and trigger storage event
  useEffect(() => {
    if (profiles.length > 0) {
      localStorage.setItem('mprj_profiles', JSON.stringify(profiles));
      console.log('Admin: Saved profiles to localStorage, triggering storage event');
      
      // Manually trigger storage event for same-tab updates
      window.dispatchEvent(new Event('storage'));
    }
  }, [profiles]);

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
  const allAreas = [...new Set(profiles.flatMap(p => p.areasConhecimento || []))];

  const updateProfile = (profileId: string, updatedData: Partial<Profile>) => {
    const profile = profiles.find(p => p.id === profileId);
    const previousData = profile ? {
      name: profile.name,
      email: profile.email,
      cargo: profile.cargo?.join(', '),
      unidade: profile.unidade?.join(', ')
    } : {};
    
    const newData = {
      name: updatedData.name || profile?.name,
      email: updatedData.email || profile?.email,
      cargo: updatedData.cargo?.join(', '),
      unidade: updatedData.unidade?.join(', ')
    };

    setProfiles(prev => {
      const updatedProfiles = prev.map(profile => 
        profile.id === profileId 
          ? { 
              ...profile, 
              ...updatedData,
              lastUpdated: new Date(),
              updatedByAdmin: true
            } 
          : profile
      );
      console.log('Admin: Profile updated, new profiles state:', updatedProfiles.length);
      return updatedProfiles;
    });
    
    addAuditLog(
      'Perfil editado',
      'Admin',
      `Perfil ${profile?.name} foi editado pelo administrador`,
      'Perfil',
      profileId,
      JSON.stringify(previousData),
      JSON.stringify(newData)
    );
  };

  const toggleProfileStatus = (profileId: string) => {
    const profile = profiles.find(p => p.id === profileId);
    const previousStatus = profile?.isActive !== false ? 'Ativo' : 'Inativo';
    const newStatus = profile?.isActive !== false ? 'Inativo' : 'Ativo';
    
    setProfiles(prev => {
      const updatedProfiles = prev.map(profile => 
        profile.id === profileId 
          ? { 
              ...profile, 
              isActive: profile.isActive !== false ? false : true,
              lastUpdated: new Date()
            } 
          : profile
      );
      console.log('Admin: Profile status toggled, new profiles state:', updatedProfiles.length);
      return updatedProfiles;
    });
    
    addAuditLog(
      newStatus === 'Ativo' ? 'Perfil ativado' : 'Perfil desativado',
      'Admin',
      `Status do perfil ${profile?.name} alterado`,
      'Perfil',
      profileId,
      previousStatus,
      newStatus
    );
  };

  const promoteToAdmin = (profileId: string) => {
    const profile = profiles.find(p => p.id === profileId);
    const previousRole = profile?.role === 'admin' ? 'Administrador' : 'Usuário';
    const newRole = profile?.role === 'admin' ? 'Usuário' : 'Administrador';
    
    setProfiles(prev => {
      const updatedProfiles = prev.map(profile => 
        profile.id === profileId 
          ? { 
              ...profile, 
              role: (profile.role === 'admin' ? 'user' : 'admin') as 'admin' | 'user',
              lastUpdated: new Date()
            } 
          : profile
      );
      
      // Update the corresponding user in localStorage if this is the current user's profile
      const updatedProfile = updatedProfiles.find(p => p.id === profileId);
      if (updatedProfile) {
        const currentUser = localStorage.getItem('mprj_user');
        if (currentUser) {
          const parsedUser = JSON.parse(currentUser);
          
          // Check if this profile belongs to the current user by multiple criteria
          if (parsedUser.id === updatedProfile.userId || 
              parsedUser.matricula === updatedProfile.matricula ||
              parsedUser.name === updatedProfile.name) {
            const updatedUser = { ...parsedUser, role: updatedProfile.role };
            localStorage.setItem('mprj_user', JSON.stringify(updatedUser));
            console.log('Admin: Updated current user role in localStorage to:', updatedProfile.role);
            
            // Force trigger storage event for immediate sync
            window.dispatchEvent(new Event('storage'));
          }
        }
      }
      
      return updatedProfiles;
    });
    
    addAuditLog(
      newRole === 'Administrador' ? 'Usuário promovido a admin' : 'Admin rebaixado a usuário',
      'Admin',
      `Papel do usuário ${profile?.name} alterado`,
      'Perfil',
      profileId,
      previousRole,
      newRole
    );
  };

  const deleteProfile = (profileId: string) => {
    const profile = profiles.find(p => p.id === profileId);
    const profileData = profile ? `${profile.name} (${profile.email})` : 'Perfil desconhecido';
    
    setProfiles(prev => prev.filter(profile => profile.id !== profileId));
    
    addAuditLog(
      'Perfil excluído',
      'Admin',
      `Perfil ${profile?.name} foi excluído permanentemente`,
      'Perfil',
      profileId,
      profileData,
      'Excluído'
    );
  };

  const sendNotification = () => {
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
    
    // Register in audit log
    addAuditLog(
      'Notificação enviada',
      'Admin',
      `Notificação "${messageSubject}" enviada`,
      'Notificação',
      undefined,
      `${recipients.length} destinatários`,
      `Assunto: ${messageSubject}`
    );
    
    // Clear form
    setMessageSubject('');
    setMessageContent('');
    setSelectedRecipients([]);
    
    alert(`Notificação enviada para ${recipients.length} destinatários!`);
  };

  const generateReport = (reportType: string) => {
    generateProfileReport(profiles, reportType);
    
    addAuditLog(
      'Relatório gerado',
      'Admin',
      `Relatório de tipo "${reportType}" foi gerado`,
      'Relatório',
      undefined,
      undefined,
      `Tipo: ${reportType}, ${profiles.length} perfis incluídos`
    );
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

        <TabsContent value="audit">
          <AuditTab auditLogs={auditLogs} />
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
          />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsTab profiles={profiles} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
