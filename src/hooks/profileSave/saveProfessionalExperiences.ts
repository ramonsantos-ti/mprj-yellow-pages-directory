
import { supabase } from "@/integrations/supabase/client";

export async function saveProfessionalExperiences(profileId: string, experienciasProfissionais: any[]) {
  await supabase.from('professional_experiences').delete().eq('profile_id', profileId);
  if (experienciasProfissionais && experienciasProfissionais.length > 0) {
    const experiences = experienciasProfissionais.map((exp: any) => ({
      profile_id: profileId,
      empresa_instituicao: exp.empresaInstituicao || null,
      cargo_funcao: exp.cargoFuncao || null,
      data_inicio: exp.dataInicio || null,
      data_fim: exp.dataFim || null,
      atividades: exp.atividades || null
    }));
    const { error } = await supabase.from('professional_experiences').insert(experiences);
    if (error) {
      console.error('Error saving experiences:', error);
      throw new Error('Erro ao salvar experiências profissionais: ' + error.message);
    }
  }
}
