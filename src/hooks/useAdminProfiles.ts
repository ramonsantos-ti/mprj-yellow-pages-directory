import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const useAdminProfiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchAllProfiles = async () => {
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
        .order('updated_at', { ascending: false });

      if (error) throw error;

      const transformedProfiles: Profile[] = data.map(profile => ({
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
      }));

      setProfiles(transformedProfiles);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching profiles:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileId: string, updatedData: Partial<Profile>) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: updatedData.name,
          matricula: updatedData.matricula, 
          email: updatedData.email,
          cargo: updatedData.cargo,
          unidade: updatedData.unidade,
          telefone: updatedData.telefone,
          biografia: updatedData.biografia,
          temas_interesse: updatedData.temasInteresse,
          idiomas: updatedData.idiomas,
          link_curriculo: updatedData.linkCurriculo,
          foto_url: updatedData.fotoUrl,
          certificacoes: updatedData.certificacoes,
          publicacoes: updatedData.publicacoes,
          updated_by_admin: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', profileId);

      if (error) throw error;

      await addAuditLog('Perfil editado', `Perfil foi editado pelo administrador`);
      
      await fetchAllProfiles();
    } catch (err: any) {
      console.error('Error updating profile:', err);
      throw err;
    }
  };

  const toggleProfileStatus = async (profileId: string) => {
    try {
      const profile = profiles.find(p => p.id === profileId);
      const newStatus = !profile?.isActive;

      const { error } = await supabase
        .from('profiles')
        .update({
          is_active: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', profileId);

      if (error) throw error;

      await addAuditLog(
        newStatus ? 'Perfil ativado' : 'Perfil desativado',
        `Status do perfil ${profile?.name} alterado`
      );
      
      await fetchAllProfiles();
    } catch (err: any) {
      console.error('Error toggling profile status:', err);
      throw err;
    }
  };

  const promoteToAdmin = async (profileId: string) => {
    try {
      const profile = profiles.find(p => p.id === profileId);
      const newRole = profile?.role === 'admin' ? 'user' : 'admin';

      const { error } = await supabase
        .from('profiles')
        .update({
          role: newRole,
          updated_at: new Date().toISOString()
        })
        .eq('id', profileId);

      if (error) throw error;

      await addAuditLog(
        newRole === 'admin' ? 'Usuário promovido a admin' : 'Admin rebaixado a usuário',
        `Papel do usuário ${profile?.name} alterado`
      );
      
      await fetchAllProfiles();
    } catch (err: any) {
      console.error('Error promoting profile:', err);
      throw err;
    }
  };

  const deleteProfile = async (profileId: string) => {
    try {
      const profile = profiles.find(p => p.id === profileId);
      
      if (!profile) {
        throw new Error('Perfil não encontrado');
      }

      console.log(`Iniciando exclusão completa do usuário: ${profile.name} (${profile.email})`);

      // 1. Excluir dados relacionados primeiro (devido às foreign keys)
      
      // Excluir projetos
      const { error: projectsError } = await supabase
        .from('projects')
        .delete()
        .eq('profile_id', profileId);
      
      if (projectsError) {
        console.error('Erro ao excluir projetos:', projectsError);
        throw new Error(`Erro ao excluir projetos: ${projectsError.message}`);
      }

      // Excluir formações acadêmicas
      const { error: academicError } = await supabase
        .from('academic_formations')
        .delete()
        .eq('profile_id', profileId);
      
      if (academicError) {
        console.error('Erro ao excluir formações acadêmicas:', academicError);
        throw new Error(`Erro ao excluir formações acadêmicas: ${academicError.message}`);
      }

      // Excluir experiências profissionais
      const { error: experienceError } = await supabase
        .from('professional_experiences')
        .delete()
        .eq('profile_id', profileId);
      
      if (experienceError) {
        console.error('Erro ao excluir experiências profissionais:', experienceError);
        throw new Error(`Erro ao excluir experiências profissionais: ${experienceError.message}`);
      }

      // Excluir disponibilidade
      const { error: availabilityError } = await supabase
        .from('availability')
        .delete()
        .eq('profile_id', profileId);
      
      if (availabilityError) {
        console.error('Erro ao excluir disponibilidade:', availabilityError);
        throw new Error(`Erro ao excluir disponibilidade: ${availabilityError.message}`);
      }

      // 2. Por fim, excluir o perfil principal
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', profileId);

      if (profileError) {
        console.error('Erro ao excluir perfil:', profileError);
        throw new Error(`Erro ao excluir perfil: ${profileError.message}`);
      }

      // 3. Registrar no log de auditoria
      await addAuditLog(
        'Usuário excluído completamente',
        `Usuário ${profile.name} (${profile.email}) e todos os seus dados foram excluídos permanentemente do sistema`
      );
      
      console.log(`Usuário ${profile.name} excluído com sucesso`);
      
      // Refresh data
      await fetchAllProfiles();
      
    } catch (err: any) {
      console.error('Error deleting profile completely:', err);
      throw err;
    }
  };

  const addAuditLog = async (action: string, details: string) => {
    try {
      await supabase
        .from('audit_logs')
        .insert({
          action,
          user_name: user?.email || 'Unknown',
          user_matricula: '',
          details,
          entity_type: 'Perfil'
        });
    } catch (err) {
      console.error('Error adding audit log:', err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAllProfiles();
    }
  }, [user]);

  return {
    profiles,
    loading,
    error,
    updateProfile,
    toggleProfileStatus,
    promoteToAdmin,
    deleteProfile,
    refetch: fetchAllProfiles
  };
};
