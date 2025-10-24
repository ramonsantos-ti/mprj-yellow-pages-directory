import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface TopProfile {
  profile_id: string;
  name: string;
  matricula: string;
  foto_url: string | null;
  cargo: string[];
  view_count: number;
}

export const useTopProfiles = (limit: number = 10) => {
  return useQuery({
    queryKey: ['top-profiles', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_top_profiles', { limit_count: limit });
      
      if (error) throw error;
      return data as TopProfile[];
    },
    staleTime: 5 * 60 * 1000, // Cache por 5 minutos
    refetchInterval: 5 * 60 * 1000, // Atualiza a cada 5 minutos
  });
};
