
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '../types';
import ProfileHeader from '../components/profile-detail/ProfileHeader';
import ProfileBiography from '../components/profile-detail/ProfileBiography';
import KnowledgeAreas from '../components/profile-detail/KnowledgeAreas';
import AcademicFormationCard from '../components/profile-detail/AcademicFormationCard';
import ProfessionalExperienceCard from '../components/profile-detail/ProfessionalExperienceCard';
import ProjectsCard from '../components/profile-detail/ProjectsCard';
import LanguagesAndCertifications from '../components/profile-detail/LanguagesAndCertifications';
import AvailabilityCard from '../components/profile-detail/AvailabilityCard';
import PublicationsAndCurriculum from '../components/profile-detail/PublicationsAndCurriculum';
import LoadingState from '../components/profile-detail/LoadingState';
import ErrorState from '../components/profile-detail/ErrorState';

const ProfileDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadProfile();
    }
  }, [id]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔍 Carregando perfil com ID:', id);
      
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          projects(*),
          academic_formations(*),
          professional_experiences(*),
          availability(*)
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('❌ Erro ao buscar perfil:', error);
        setError('Perfil não encontrado');
        return;
      }

      if (!data) {
        console.log('❌ Nenhum perfil encontrado');
        setError('Perfil não encontrado');
        return;
      }

      console.log('✅ Dados do perfil encontrados:', data);

      // Transform Supabase data to match our Profile type
      const transformedProfile: Profile = {
        id: data.id,
        userId: data.user_id || '',
        name: data.name || 'Nome não informado',
        matricula: data.matricula || 'Matrícula não informada',
        cargo: Array.isArray(data.cargo) ? data.cargo : [],
        funcao: Array.isArray(data.funcao) ? data.funcao : [],
        unidade: Array.isArray(data.unidade) ? data.unidade : [],
        telefone: data.telefone || '',
        email: data.email || '',
        biografia: data.biografia || '',
        areasConhecimento: Array.isArray(data.areas_conhecimento) ? data.areas_conhecimento : [],
        especializacoes: data.especializacoes || '',
        temasInteresse: Array.isArray(data.temas_interesse) ? data.temas_interesse : [],
        idiomas: Array.isArray(data.idiomas) ? data.idiomas : [],
        linkCurriculo: data.link_curriculo || '',
        fotoUrl: data.foto_url || '',
        certificacoes: Array.isArray(data.certificacoes) ? data.certificacoes : [],
        publicacoes: data.publicacoes || '',
        role: data.role as 'admin' | 'user' || 'user',
        isActive: data.is_active ?? true,
        aceiteTermos: data.aceite_termos ?? false,
        updatedByAdmin: data.updated_by_admin ?? false,
        lastUpdated: new Date(data.updated_at || data.created_at || new Date()),
        projetos: data.projects?.map((p: any) => ({
          id: p.id,
          nome: p.nome,
          dataInicio: new Date(p.data_inicio),
          dataFim: p.data_fim ? new Date(p.data_fim) : undefined,
          observacoes: p.observacoes || ''
        })) || [],
        formacaoAcademica: data.academic_formations?.map((f: any) => ({
          id: f.id,
          nivel: f.nivel,
          instituicao: f.instituicao,
          curso: f.curso,
          ano: f.ano
        })) || [],
        experienciasProfissionais: data.professional_experiences?.map((e: any) => ({
          tempoMPRJ: e.tempo_mprj || '',
          experienciaAnterior: e.experiencia_anterior || '',
          projetosInternos: e.projetos_internos || '',
          publicacoes: e.publicacoes || ''
        })) || [],
        disponibilidade: data.availability?.[0] ? {
          tipoColaboracao: Array.isArray(data.availability[0].tipo_colaboracao) ? data.availability[0].tipo_colaboracao : [],
          disponibilidadeEstimada: data.availability[0].disponibilidade_estimada || ''
        } : {
          tipoColaboracao: [],
          disponibilidadeEstimada: ''
        },
        contato: data.availability?.[0] ? {
          formaContato: data.availability[0].forma_contato || 'email',
          horarioPreferencial: data.availability[0].horario_preferencial || ''
        } : {
          formaContato: 'email',
          horarioPreferencial: ''
        }
      };

      console.log('🔄 Perfil transformado:', transformedProfile);
      setProfile(transformedProfile);
    } catch (err: any) {
      console.error('❌ Erro geral ao carregar perfil:', err);
      setError('Erro ao carregar perfil: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error || !profile) {
    return <ErrorState error={error || 'Erro desconhecido'} />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ProfileHeader profile={profile} getInitials={getInitials} />
      
      <ProfileBiography biografia={profile.biografia} />
      
      <KnowledgeAreas 
        areasConhecimento={profile.areasConhecimento} 
        temasInteresse={profile.temasInteresse} 
      />
      
      <AcademicFormationCard formacaoAcademica={profile.formacaoAcademica} />
      
      <ProfessionalExperienceCard experienciasProfissionais={profile.experienciasProfissionais} />
      
      <ProjectsCard projetos={profile.projetos} />
      
      <LanguagesAndCertifications 
        idiomas={profile.idiomas} 
        certificacoes={profile.certificacoes} 
      />
      
      <AvailabilityCard 
        disponibilidade={profile.disponibilidade} 
        contato={profile.contato} 
      />
      
      <PublicationsAndCurriculum 
        publicacoes={profile.publicacoes}
        linkCurriculo={profile.linkCurriculo}
        especializacoes={profile.especializacoes}
      />
    </div>
  );
};

export default ProfileDetail;
