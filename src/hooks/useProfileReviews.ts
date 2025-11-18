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
          reviewer:profiles!profile_reviews_reviewer_id_fkey(name, matricula, email)
        `)
        .eq('profile_id', profileId)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[useProfileReviews] Error fetching reviews:', error);
        throw error;
      }
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

      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id, email, matricula, name, created_at')
        .eq('user_id', user.id)
        .eq('email', user.email)
        .order('created_at', { ascending: false })
        .limit(1);

      console.log('[useProfileReviews] User:', user.email, 'Found profiles:', profiles, 'error:', profileError);

      if (!profiles || profiles.length === 0) {
        console.log('[useProfileReviews] No profile found for user');
        return false;
      }

      const profile = profiles[0];

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
      console.log('[createReview] Starting review creation for profile:', profileId);
      
      const { data: { user } } = await supabase.auth.getUser();
      console.log('[createReview] Auth user:', user?.id, user?.email);
      
      if (!user) {
        console.error('[createReview] No authenticated user');
        throw new Error('Usuário não autenticado');
      }

      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id, email, matricula, name, created_at')
        .eq('user_id', user.id)
        .eq('email', user.email)
        .order('created_at', { ascending: false })
        .limit(1);

      console.log('[createReview] Profile lookup result:', { 
        profiles, 
        profileError,
        userId: user.id,
        userEmail: user.email
      });

      if (profileError) {
        console.error('[createReview] Error fetching profile:', profileError);
        throw new Error('Erro ao buscar perfil: ' + profileError.message);
      }

      if (!profiles || profiles.length === 0) {
        console.error('[createReview] No profile found for user_id:', user.id);
        throw new Error('Perfil não encontrado. Por favor, complete seu cadastro primeiro.');
      }

      const profile = profiles[0];

      console.log('[createReview] Inserting review:', {
        profile_id: profileId,
        reviewer_id: profile.id,
        rating,
        comment
      });

      const { error } = await supabase
        .from('profile_reviews')
        .insert({
          profile_id: profileId,
          reviewer_id: profile.id,
          rating,
          comment,
        });

      if (error) {
        console.error('[createReview] Error inserting review:', error);
        throw error;
      }

      console.log('[createReview] Review created successfully');
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
