
import React, { useState, useMemo, useEffect } from 'react';
import { mockProfiles } from '../data/mockData';
import { Profile } from '../types';
import { AuditLog, StandardMessage } from '../types/admin';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { generateProfileReport } from '../utils/pdfReports';
import ProfilesTab from '../components/admin/ProfilesTab';
import AuditTab from '../components/admin/AuditTab';
import NotificationsTab from '../components/admin/NotificationsTab';
import ReportsTab from '../components/admin/ReportsTab';
import AnalyticsTab from '../components/admin/AnalyticsTab';

const Admin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
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

  // Save profiles to localStorage whenever profiles change
  useEffect(() => {
    localStorage.setItem('mprj_profiles', JSON.stringify(profiles));
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

  const addAuditLog = (action: string, user: string, details: string) => {
    const newLog: AuditLog = {
      id: Date.now().toString(),
      action,
      user,
      details,
      timestamp: new Date()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const updateProfile = (profileId: string, updatedData: Partial<Profile>) => {
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
      return updatedProfiles;
    });
    
    const profile = profiles.find(p => p.id === profileId);
    addAuditLog('profile_edit', 'Admin', `Perfil ${profile?.name} editado pelo administrador`);
  };

  const toggleProfileStatus = (profileId: string) => {
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
      return updatedProfiles;
    });
    
    const profile = profiles.find(p => p.id === profileId);
    const newStatus = profile?.isActive !== false ? 'desativado' : 'ativado';
    addAuditLog('status_change', 'Admin', `Perfil ${profile?.name} ${newStatus}`);
  };

  const promoteToAdmin = (profileId: string) => {
    setProfiles(prev => prev.map(profile => 
      profile.id === profileId ? { ...profile, role: 'admin' } : profile
    ));
    
    const profile = profiles.find(p => p.id === profileId);
    addAuditLog('role_change', 'Admin', `Perfil ${profile?.name} promovido a administrador`);
  };

  const deleteProfile = (profileId: string) => {
    const profile = profiles.find(p => p.id === profileId);
    setProfiles(prev => prev.filter(profile => profile.id !== profileId));
    addAuditLog('delete', 'Admin', `Perfil ${profile?.name} excluído`);
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
    addAuditLog('notification_sent', 'Admin', `Notificação "${messageSubject}" enviada para ${recipients.length} destinatários`);
    
    // Clear form
    setMessageSubject('');
    setMessageContent('');
    setSelectedRecipients([]);
    
    alert(`Notificação enviada para ${recipients.length} destinatários!`);
  };

  const generateReport = (reportType: string) => {
    generateProfileReport(profiles, reportType);
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
