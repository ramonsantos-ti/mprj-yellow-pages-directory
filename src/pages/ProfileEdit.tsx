import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Profile } from '../types';
import { mockProfiles } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useToast } from '../hooks/use-toast';
import BasicInfo from '../components/profile/BasicInfo';
import CargoUnidade from '../components/profile/CargoUnidade';
import ContactPreferences from '../components/profile/ContactPreferences';
import AcademicFormation from '../components/profile/AcademicFormation';
import AdditionalInfo from '../components/profile/AdditionalInfo';
import AvailabilitySection from '../components/profile/AvailabilitySection';
import ProjectsManager from '../components/profile/ProjectsManager';
import PhotoUpload from '../components/profile/PhotoUpload';
import CertificationsSection from '../components/profile/CertificationsSection';
import PublicationsSection from '../components/profile/PublicationsSection';

const ProfileEdit: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load profiles from localStorage or use mock data
  useEffect(() => {
    const loadProfiles = () => {
      const savedProfiles = localStorage.getItem('mprj_profiles');
      if (savedProfiles) {
        const parsedProfiles = JSON.parse(savedProfiles);
        console.log('ProfileEdit: Loaded profiles from localStorage:', parsedProfiles.length);
        setProfiles(parsedProfiles);
        
        // Find the current user's profile
        if (user) {
          const userProfile = parsedProfiles.find((p: Profile) => p.userId === user.id);
          setProfile(userProfile || null);
        }
      } else {
        console.log('ProfileEdit: Using mock profiles');
        setProfiles(mockProfiles);
        
        // Find the current user's profile from mock data
        if (user) {
          const userProfile = mockProfiles.find(p => p.userId === user.id);
          setProfile(userProfile || null);
        }
      }
      setIsLoading(false);
    };

    loadProfiles();

    // Listen for localStorage changes (when admin makes changes)
    const handleStorageChange = () => {
      console.log('ProfileEdit: Storage changed, reloading profiles');
      loadProfiles();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check for changes periodically (for same-tab updates)
    const interval = setInterval(loadProfiles, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [user]);

  if (!user) {
    navigate('/login');
    return null;
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Carregando perfil...</h2>
      </div>
    );
  }

  const handleSubmit = (updatedProfile: Partial<Profile>) => {
    try {
      let updatedProfiles: Profile[];
      
      if (profile) {
        // Update existing profile
        updatedProfiles = profiles.map(p => 
          p.id === profile.id 
            ? { 
                ...p, 
                ...updatedProfile, 
                lastUpdated: new Date(),
                // Don't override updatedByAdmin flag when user updates their own profile
                updatedByAdmin: p.updatedByAdmin || false
              } 
            : p
        );
      } else {
        // Create new profile
        const newProfile: Profile = {
          id: Date.now().toString(),
          userId: user.id,
          name: user.name,
          matricula: user.matricula,
          email: user.username,
          lastUpdated: new Date(),
          aceiteTermos: true,
          isActive: true,
          updatedByAdmin: false,
          // Default values
          cargo: [],
          funcao: [],
          unidade: [],
          areasConhecimento: [],
          temasInteresse: [],
          projetos: [],
          formacaoAcademica: [],
          experienciasProfissionais: [],
          idiomas: [],
          disponibilidade: {
            tipoColaboracao: [],
            disponibilidadeEstimada: ''
          },
          contato: {
            formaContato: ''
          },
          ...updatedProfile
        };
        
        updatedProfiles = [...profiles, newProfile];
      }
      
      // Save to localStorage
      localStorage.setItem('mprj_profiles', JSON.stringify(updatedProfiles));
      console.log('ProfileEdit: Profile saved to localStorage');
      
      // Update local state
      setProfiles(updatedProfiles);
      
      // Manually trigger storage event for same-tab updates
      window.dispatchEvent(new Event('storage'));
      
      toast({
        title: "Perfil salvo com sucesso!",
        description: "Suas informações foram atualizadas.",
      });
      
      navigate('/');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Erro ao salvar perfil",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          {profile ? 'Editar Perfil' : 'Criar Perfil'}
        </h1>
        <p className="text-lg text-gray-600">
          {profile ? 'Atualize suas informações profissionais' : 'Complete seu perfil para aparecer nas buscas'}
        </p>
        {profile?.updatedByAdmin && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-orange-800 text-sm font-medium">
              ⚠️ Este perfil foi alterado pelo administrador. Suas próximas alterações irão sobrescrever as modificações administrativas.
            </p>
          </div>
        )}
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        {/* Photo Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Foto do Perfil</CardTitle>
          </CardHeader>
          <CardContent>
            <PhotoUpload
              currentPhotoUrl={profile?.fotoUrl}
              onPhotoChange={(fotoUrl) => setProfile(prev => prev ? { ...prev, fotoUrl } : null)}
            />
          </CardContent>
        </Card>

        {/* Basic Information */}
        <BasicInfo
          profile={profile}
          onProfileChange={setProfile}
        />

        {/* Cargo e Unidade */}
        <CargoUnidade
          profile={profile}
          onProfileChange={setProfile}
        />

        {/* Academic Formation */}
        <AcademicFormation
          profile={profile}
          onProfileChange={setProfile}
        />

        {/* Additional Information */}
        <AdditionalInfo
          profile={profile}
          onProfileChange={setProfile}
        />

        {/* Projects */}
        <ProjectsManager
          profile={profile}
          onProfileChange={setProfile}
        />

        {/* Certifications */}
        <CertificationsSection
          profile={profile}
          onProfileChange={setProfile}
        />

        {/* Publications */}
        <PublicationsSection
          profile={profile}
          onProfileChange={setProfile}
        />

        {/* Availability */}
        <AvailabilitySection
          profile={profile}
          onProfileChange={setProfile}
        />

        {/* Contact Preferences */}
        <ContactPreferences
          profile={profile}
          onProfileChange={setProfile}
        />

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <Button 
            type="button"
            onClick={() => handleSubmit(profile || {})}
            size="lg"
            className="bg-red-900 hover:bg-red-800 text-white px-8"
          >
            {profile ? 'Atualizar Perfil' : 'Criar Perfil'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
