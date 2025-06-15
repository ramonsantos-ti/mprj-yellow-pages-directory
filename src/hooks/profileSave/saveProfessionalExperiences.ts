
import { supabase } from "@/integrations/supabase/client";

export async function saveProfessionalExperiences(profileId: string, experienciasProfissionais: any[]) {
  await supabase.from('professional_experiences').delete().eq('profile_id', profileId);
  if (experienciasProfissionais && experienciasProfissionais.length > 0) {
    const experiences = experienciasProfissionais.map((exp: any) => ({
      profile_id: profileId,
      tempo_mprj: exp.tempoMPRJ || null,
      experiencia_anterior: exp.experienciaAnterior || null,
      projetos_internos: exp.projetosInternos || null,
      publicacoes: exp.publicacoes || null
    }));
    const { error } = await supabase.from('professional_experiences').insert(experiences);
    if (error) {
      console.error('Error saving experiences:', error);
      throw new Error('Erro ao salvar experiências profissionais: ' + error.message);
    }
  }
}
