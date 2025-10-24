import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useProfileView = (profileId: string | undefined) => {
  useEffect(() => {
    if (!profileId) return;

    const registerView = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        await supabase.from('profile_views').insert({
          profile_id: profileId,
          user_id: user?.id || null,
          viewed_at: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Erro ao registrar visualização:', error);
      }
    };

    registerView();
  }, [profileId]);
};
