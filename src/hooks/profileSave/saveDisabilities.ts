import { supabase } from '@/integrations/supabase/client';

interface DisabilityFormData {
  disabilityTypeId: string;
  additionalInfo?: string;
}

export const saveDisabilities = async (
  profileId: string,
  disabilities: DisabilityFormData[]
) => {
  try {
    console.log('[saveDisabilities] Iniciando salvamento das deficiências para o perfil:', profileId);
    console.log('[saveDisabilities] Deficiências a salvar:', disabilities);

    // 1. Deletar todas as deficiências existentes do perfil
    const { error: deleteError } = await supabase
      .from('profile_disabilities')
      .delete()
      .eq('profile_id', profileId);

    if (deleteError) {
      console.error('[saveDisabilities] Erro ao deletar deficiências existentes:', deleteError);
      throw deleteError;
    }

    // 2. Se não há deficiências, retornar sucesso
    if (!disabilities || disabilities.length === 0) {
      console.log('[saveDisabilities] Nenhuma deficiência para salvar');
      return;
    }

    // 3. Inserir as novas deficiências
    const disabilitiesToInsert = disabilities.map(disability => ({
      profile_id: profileId,
      disability_type_id: disability.disabilityTypeId,
      additional_info: disability.additionalInfo || null
    }));

    console.log('[saveDisabilities] Inserindo deficiências:', disabilitiesToInsert);

    const { data, error: insertError } = await supabase
      .from('profile_disabilities')
      .insert(disabilitiesToInsert)
      .select();

    if (insertError) {
      console.error('[saveDisabilities] Erro ao inserir deficiências:', insertError);
      throw insertError;
    }

    console.log('[saveDisabilities] Deficiências salvas com sucesso:', data);
  } catch (error) {
    console.error('[saveDisabilities] Erro no salvamento das deficiências:', error);
    throw error;
  }
};