
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProfileData } from './useProfileData';
import { useProfileSave } from './useProfileSave';
import { useProfileState } from './useProfileState';

export const useProfileEdit = (profileId?: string) => {
  const { user } = useAuth();
  const { 
    loading, 
    error, 
    userProfile, 
    loadUserProfile, 
    setError 
  } = useProfileData(profileId);
  
  const { saving, saveProfile: saveProfileData } = useProfileSave();
  const { successMessage, setSuccessMessage, showSuccessMessage } = useProfileState();

  const saveProfile = async (
    data: any, 
    fotoPreview: string, 
    formacaoAcademica: any[], 
    projetos: any[], 
    disponibilidade: any,
    targetProfileId?: string
  ) => {
    try {
      setError(null);
      setSuccessMessage(null);

      console.log('[DEBUG][useProfileEdit] Salvando perfil:', {
        targetProfileId,
        userProfileId: userProfile?.id,
        isEditingOtherProfile: !!targetProfileId
      });

      await saveProfileData(
        data, 
        fotoPreview, 
        formacaoAcademica, 
        projetos, 
        disponibilidade, 
        userProfile,
        () => {
          showSuccessMessage('Perfil salvo com sucesso!');
          loadUserProfile();
        }
      );
      
    } catch (err: any) {
      console.error('Error saving profile:', err);
      setError(err.message);
    }
  };

  useEffect(() => {
    if (profileId || user) {
      console.log('[DEBUG][useProfileEdit] Carregando perfil:', { profileId, userId: user?.id });
      loadUserProfile();
    }
  }, [profileId, user]);

  return {
    loading,
    saving,
    error,
    successMessage,
    userProfile,
    loadUserProfile,
    saveProfile,
    setError,
    setSuccessMessage
  };
};
