
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useProfileData } from './useProfileData';
import { useProfileSave } from './useProfileSave';
import { useProfileState } from './useProfileState';

export const useProfileEdit = () => {
  const { user } = useAuth();
  const { 
    loading, 
    error, 
    userProfile, 
    loadUserProfile, 
    setError 
  } = useProfileData();
  
  const { saving, saveProfile: saveProfileData } = useProfileSave();
  const { successMessage, setSuccessMessage, showSuccessMessage } = useProfileState();

  const saveProfile = async (data: any, fotoPreview: string, formacaoAcademica: any[], projetos: any[], disponibilidade: any) => {
    try {
      setError(null);
      setSuccessMessage(null);

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
    if (user) {
      loadUserProfile();
    }
  }, [user]);

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
