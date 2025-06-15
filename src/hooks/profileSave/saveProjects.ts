
import { supabase } from "@/integrations/supabase/client";

export async function saveProjects(profileId: string, projetos: any[]) {
  await supabase.from('projects').delete().eq('profile_id', profileId);
  if (projetos && projetos.length > 0) {
    const projects = projetos.map(p => ({
      profile_id: profileId,
      nome: p.nome,
      data_inicio: p.dataInicio instanceof Date ? p.dataInicio.toISOString().split('T')[0] : p.dataInicio,
      data_fim: p.dataFim ? (p.dataFim instanceof Date ? p.dataFim.toISOString().split('T')[0] : p.dataFim) : null,
      observacoes: p.observacoes || null
    }));
    const { error } = await supabase.from('projects').insert(projects);
    if (error) {
      console.error('Error saving projects:', error);
      throw new Error('Erro ao salvar projetos: ' + error.message);
    }
  }
}
