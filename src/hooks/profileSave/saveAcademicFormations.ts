
import { supabase } from "@/integrations/supabase/client";

export async function saveAcademicFormations(profileId: string, formacaoAcademica: any[]) {
  await supabase.from('academic_formations').delete().eq('profile_id', profileId);
  if (formacaoAcademica && formacaoAcademica.length > 0) {
    const formations = formacaoAcademica.map(f => ({
      profile_id: profileId,
      nivel: f.nivel,
      instituicao: f.instituicao,
      curso: f.curso,
      ano: parseInt(f.ano)
    }));
    const { error } = await supabase.from('academic_formations').insert(formations);
    if (error) {
      console.error('Error saving formations:', error);
      throw new Error('Erro ao salvar formação acadêmica: ' + error.message);
    }
  }
}
