
import { supabase } from "@/integrations/supabase/client";
import { tipoColaboracaoMap, formaContatoMap } from '@/components/profile/ProfileFormConstants';

export async function saveAvailability(profileId: string, disponibilidade: any) {
  await supabase.from('availability').delete().eq('profile_id', profileId);
  if (disponibilidade && (disponibilidade.tipoColaboracao?.length > 0 || disponibilidade.disponibilidadeEstimada || disponibilidade.formaContato)) {
    const tipoColaboracaoMapped = disponibilidade.tipoColaboracao?.map((tipo: string) =>
      tipoColaboracaoMap[tipo] || tipo.toLowerCase().replace(/\s+/g, '_')
    ) || [];
    const formaContatoMapped = formaContatoMap[disponibilidade.formaContato] || 'email';
    const availabilityData = {
      profile_id: profileId,
      tipo_colaboracao: tipoColaboracaoMapped,
      disponibilidade_estimada: disponibilidade.disponibilidadeEstimada || null,
      forma_contato: formaContatoMapped as 'email' | 'telefone' | 'teams' | 'presencial',
      horario_preferencial: disponibilidade.horarioPreferencial || null
    };
    const { error } = await supabase.from('availability').insert(availabilityData);
    if (error) {
      console.error('Error saving availability:', error);
      throw new Error('Erro ao salvar disponibilidade: ' + error.message);
    }
  }
}
