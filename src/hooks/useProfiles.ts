
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '../types';

export const useProfiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          projects(*),
          academic_formations(*),
          professional_experiences(*),
          availability(*)
        `)
        .eq('is_active', true)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      console.log('Raw profiles data from Supabase:', data);

      // Transform Supabase data to match our Profile type
      const transformedProfiles: Profile[] = data.map(profile => {
        console.log('Processing profile:', profile.name, 'foto_url:', profile.foto_url);
        
        return {
          id: profile.id,
          userId: profile.user_id || '',
          name: profile.name,
          matricula: profile.matricula,
          cargo: profile.cargo || [],
          funcao: profile.funcao || [],
          unidade: profile.unidade || [],
          telefone: profile.telefone || '',
          email: profile.email,
          biografia: profile.biografia || '',
          temasInteresse: profile.temas_interesse || [],
          idiomas: profile.idiomas || [],
          linkCurriculo: profile.link_curriculo || '',
          fotoUrl: profile.foto_url || '',
          certificacoes: profile.certificacoes || [],
          publicacoes: profile.publicacoes || '',
          role: profile.role as 'admin' | 'user',
          isActive: profile.is_active ?? true,
          aceiteTermos: profile.aceite_termos ?? false,
          updatedByAdmin: profile.updated_by_admin ?? false,
          lastUpdated: new Date(profile.updated_at || profile.created_at || new Date()),
          projetos: profile.projects?.map((p: any) => ({
            id: p.id,
            nome: p.nome,
            dataInicio: p.data_inicio,
            dataFim: p.data_fim,
            observacoes: p.observacoes || ''
          })) || [],
          formacaoAcademica: profile.academic_formations?.map((f: any) => ({
            id: f.id,
            nivel: f.nivel,
            instituicao: f.instituicao,
            curso: f.curso,
            ano: f.ano
          })) || [],
          experienciasProfissionais: profile.professional_experiences?.map((e: any) => ({
            id: e.id,
            empresaInstituicao: e.empresa_instituicao || '',
            cargoFuncao: e.cargo_funcao || '',
            dataInicio: e.data_inicio || '',
            dataFim: e.data_fim || '',
            atividades: e.atividades || ''
          })) || [],
          disponibilidade: profile.availability?.[0] ? {
            tipoColaboracao: profile.availability[0].tipo_colaboracao || [],
            disponibilidadeEstimada: profile.availability[0].disponibilidade_estimada || ''
          } : {
            tipoColaboracao: [],
            disponibilidadeEstimada: ''
          },
          contato: profile.availability?.[0] ? {
            formaContato: profile.availability[0].forma_contato || 'email',
            horarioPreferencial: profile.availability[0].horario_preferencial || ''
          } : {
            formaContato: 'email',
            horarioPreferencial: ''
          }
        };
      });

      console.log('Transformed profiles:', transformedProfiles.map(p => ({ name: p.name, fotoUrl: p.fotoUrl })));

      setProfiles(transformedProfiles);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching profiles:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return { profiles, loading, error, refetch: fetchProfiles };
};
