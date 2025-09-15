import { useAuth } from '@/contexts/AuthContext';
import { PcdVisibilityLevel } from '@/types';

export const usePcdPermissions = () => {
  const { user } = useAuth();

  const canViewPcdInfo = (visibilityLevel: PcdVisibilityLevel): boolean => {
    switch (visibilityLevel) {
      case 'public':
        return true;
      case 'logged_users':
        return !!user;
      case 'admin_only':
        return user?.role === 'admin';
      default:
        return false;
    }
  };

  const getVisibilityLabel = (level: PcdVisibilityLevel): string => {
    switch (level) {
      case 'public':
        return 'Público (visível para todos)';
      case 'logged_users':
        return 'Usuários logados';
      case 'admin_only':
        return 'Apenas administradores';
      default:
        return 'Desconhecido';
    }
  };

  const getVisibilityDescription = (level: PcdVisibilityLevel): string => {
    switch (level) {
      case 'public':
        return 'Qualquer pessoa pode ver suas informações de deficiência';
      case 'logged_users':
        return 'Apenas usuários logados no sistema podem ver suas informações de deficiência';
      case 'admin_only':
        return 'Apenas administradores do sistema podem ver suas informações de deficiência';
      default:
        return '';
    }
  };

  return {
    canViewPcdInfo,
    getVisibilityLabel,
    getVisibilityDescription,
    isLoggedIn: !!user,
    isAdmin: user?.role === 'admin'
  };
};