import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ProfileReview } from '@/types';
import { toast } from 'sonner';

export const useProfileReviews = (profileId: string) => {
  const queryClient = useQueryClient();

  // Buscar avaliações aprovadas do perfil
  const { data: reviews, isLoading } = useQuery({
    queryKey: ['profile-reviews', profileId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profile_reviews')
        .select(`
          *,
          reviewer:reviewer_id!profile_reviews_reviewer_id_fkey(name, matricula, email)
        `)
        .eq('profile_id', profileId)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as any as ProfileReview[];
    },
    enabled: !!profileId,
  });

  // Verificar se usuário já avaliou este perfil
  const { data: hasReviewed } = useQuery({
    queryKey: ['user-reviewed', profileId],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      console.log('[useProfileReviews] Checking if user reviewed. Auth user:', user?.id, user?.email);
      
      if (!user) {
        console.log('[useProfileReviews] No authenticated user');
        return false;
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      console.log('[useProfileReviews] User profile:', profile, 'error:', profileError);

      if (!profile) {
        console.log('[useProfileReviews] No profile found for user');
        return false;
      }

      const { data, error } = await supabase
        .from('profile_reviews')
        .select('id')
        .eq('profile_id', profileId)
        .eq('reviewer_id', profile.id)
        .maybeSingle();

      console.log('[useProfileReviews] Review check result:', { 
        hasReview: !!data, 
        error,
        profileId,
        reviewerId: profile.id 
      });

      return !!data;
    },
    enabled: !!profileId,
  });

  // Criar avaliação
  const createReview = useMutation({
    mutationFn: async ({ rating, comment }: { rating: number; comment: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!profile || profileError) throw new Error('Perfil não encontrado');

      const { error } = await supabase
        .from('profile_reviews')
        .insert({
          profile_id: profileId,
          reviewer_id: profile.id,
          rating,
          comment,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile-reviews', profileId] });
      queryClient.invalidateQueries({ queryKey: ['user-reviewed', profileId] });
      toast.success('Avaliação enviada! Aguardando aprovação do administrador.');
    },
    onError: (error: any) => {
      console.error('Erro ao criar avaliação:', error);
      toast.error(error.message || 'Erro ao enviar avaliação');
    },
  });

  return {
    reviews: reviews || [],
    isLoading,
    hasReviewed: hasReviewed || false,
    createReview: createReview.mutate,
    isCreating: createReview.isPending,
  };
};
