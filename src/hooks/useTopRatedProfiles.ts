import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface TopRatedProfile {
  profile_id: string;
  name: string;
  matricula: string;
  foto_url: string | null;
  cargo: string[];
  average_rating: number;
  review_count: number;
}

export const useTopRatedProfiles = (limit: number = 10) => {
  return useQuery({
    queryKey: ['top-rated-profiles', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_top_rated_profiles', { limit_count: limit });
      
      if (error) throw error;
      return data as TopRatedProfile[];
    },
    staleTime: 0,
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
  });
};
