import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ProfileReview } from '@/types';
import { toast } from 'sonner';

export const useAdminReviews = () => {
  const queryClient = useQueryClient();

  // Buscar todas avaliações (admin)
  const { data: reviews, isLoading } = useQuery({
    queryKey: ['admin-reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profile_reviews')
        .select(`
          *,
          profile:profile_id!profile_reviews_profile_id_fkey(name, matricula, email),
          reviewer:reviewer_id!profile_reviews_reviewer_id_fkey(name, matricula, email),
          admin:admin_id!profile_reviews_admin_id_fkey(name, matricula)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as any as ProfileReview[];
    },
  });

  // Aprovar avaliação
  const approveReview = useMutation({
    mutationFn: async (reviewId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Não autenticado');

      const { data: adminProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!adminProfile) throw new Error('Perfil admin não encontrado');

      const { error } = await supabase
        .from('profile_reviews')
        .update({
          status: 'approved',
          admin_id: adminProfile.id,
          updated_at: new Date().toISOString(),
        })
        .eq('id', reviewId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reviews'] });
      queryClient.invalidateQueries({ queryKey: ['top-rated-profiles'] });
      toast.success('Avaliação aprovada com sucesso!');
    },
    onError: (error: any) => {
      console.error('Erro ao aprovar avaliação:', error);
      toast.error('Erro ao aprovar avaliação');
    },
  });

  // Rejeitar avaliação
  const rejectReview = useMutation({
    mutationFn: async ({ reviewId, notes }: { reviewId: string; notes?: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Não autenticado');

      const { data: adminProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!adminProfile) throw new Error('Perfil admin não encontrado');

      const { error } = await supabase
        .from('profile_reviews')
        .update({
          status: 'rejected',
          admin_id: adminProfile.id,
          admin_notes: notes,
          updated_at: new Date().toISOString(),
        })
        .eq('id', reviewId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reviews'] });
      toast.success('Avaliação rejeitada');
    },
    onError: (error: any) => {
      console.error('Erro ao rejeitar avaliação:', error);
      toast.error('Erro ao rejeitar avaliação');
    },
  });

  // Editar avaliação
  const editReview = useMutation({
    mutationFn: async ({
      reviewId,
      rating,
      comment,
    }: {
      reviewId: string;
      rating: number;
      comment: string;
    }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Não autenticado');

      const { data: adminProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!adminProfile) throw new Error('Perfil admin não encontrado');

      const { error } = await supabase
        .from('profile_reviews')
        .update({
          rating,
          comment,
          status: 'approved',
          admin_id: adminProfile.id,
          updated_at: new Date().toISOString(),
        })
        .eq('id', reviewId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reviews'] });
      queryClient.invalidateQueries({ queryKey: ['top-rated-profiles'] });
      toast.success('Avaliação editada e aprovada com sucesso!');
    },
    onError: (error: any) => {
      console.error('Erro ao editar avaliação:', error);
      toast.error('Erro ao editar avaliação');
    },
  });

  return {
    reviews: reviews || [],
    isLoading,
    approveReview: approveReview.mutate,
    rejectReview: rejectReview.mutate,
    editReview: editReview.mutate,
    isApproving: approveReview.isPending,
    isRejecting: rejectReview.isPending,
    isEditing: editReview.isPending,
  };
};
