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
    staleTime: 0, // Sem cache
    refetchInterval: 3000, // Atualiza a cada 3 segundos
    refetchOnWindowFocus: true, // Atualiza ao focar na janela
  });
};
