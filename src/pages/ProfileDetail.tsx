
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
      
      // Buscar dados básicos do perfil primeiro
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (profileError) {
        console.error('❌ Erro ao buscar perfil:', profileError);
        setError('Perfil não encontrado');
        return;
      }

      if (!profileData) {
        console.log('❌ Nenhum perfil encontrado');
        setError('Perfil não encontrado');
        return;
      }

      console.log('✅ Dados básicos do perfil:', profileData);

      // Buscar projetos relacionados
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .eq('profile_id', id);

      if (projectsError) {
        console.error('❌ Erro ao buscar projetos:', projectsError);
      }

      // Buscar formações acadêmicas
      const { data: formationsData, error: formationsError } = await supabase
        .from('academic_formations')
        .select('*')
        .eq('profile_id', id);

      if (formationsError) {
        console.error('❌ Erro ao buscar formações:', formationsError);
      }

      // Buscar experiências profissionais
      const { data: experiencesData, error: experiencesError } = await supabase
        .from('professional_experiences')
        .select('*')
        .eq('profile_id', id);

      if (experiencesError) {
        console.error('❌ Erro ao buscar experiências:', experiencesError);
      }

      // Buscar disponibilidade
      const { data: availabilityData, error: availabilityError } = await supabase
        .from('availability')
        .select('*')
        .eq('profile_id', id);

      if (availabilityError) {
        console.error('❌ Erro ao buscar disponibilidade:', availabilityError);
      }

      console.log('📊 Dados coletados:', {
        profile: profileData,
        projects: projectsData,
        formations: formationsData,
        experiences: experiencesData,
        availability: availabilityData
      });

      // Transformar dados para o formato esperado
      const transformedProfile: Profile = {
        id: profileData.id,
        userId: profileData.user_id || '',
        name: profileData.name || 'Nome não informado',
        matricula: profileData.matricula || 'Matrícula não informada',
        cargo: Array.isArray(profileData.cargo) ? profileData.cargo : [],
        funcao: Array.isArray(profileData.funcao) ? profileData.funcao : [],
        unidade: Array.isArray(profileData.unidade) ? profileData.unidade : [],
        telefone: profileData.telefone || '',
        email: profileData.email || '',
        biografia: profileData.biografia || '',
        areasConhecimento: Array.isArray(profileData.areas_conhecimento) ? profileData.areas_conhecimento : [],
        especializacoes: profileData.especializacoes || '',
        temasInteresse: Array.isArray(profileData.temas_interesse) ? profileData.temas_interesse : [],
        idiomas: Array.isArray(profileData.idiomas) ? profileData.idiomas : [],
        linkCurriculo: profileData.link_curriculo || '',
        fotoUrl: profileData.foto_url || '',
        certificacoes: Array.isArray(profileData.certificacoes) ? profileData.certificacoes : [],
        publicacoes: profileData.publicacoes || '',
        role: (profileData.role as 'admin' | 'user') || 'user',
        isActive: profileData.is_active ?? true,
        aceiteTermos: profileData.aceite_termos ?? false,
        updatedByAdmin: profileData.updated_by_admin ?? false,
        lastUpdated: new Date(profileData.updated_at || profileData.created_at || new Date()),
        projetos: projectsData?.map((p: any) => ({
          id: p.id,
          nome: p.nome,
          dataInicio: new Date(p.data_inicio),
          dataFim: p.data_fim ? new Date(p.data_fim) : undefined,
          observacoes: p.observacoes || ''
        })) || [],
        formacaoAcademica: formationsData?.map((f: any) => ({
          id: f.id,
          nivel: f.nivel,
          instituicao: f.instituicao,
          curso: f.curso,
          ano: f.ano
        })) || [],
        experienciasProfissionais: experiencesData?.map((e: any) => ({
          tempoMPRJ: e.tempo_mprj || '',
          experienciaAnterior: e.experiencia_anterior || '',
          projetosInternos: e.projetos_internos || '',
          publicacoes: e.publicacoes || ''
        })) || [],
        disponibilidade: availabilityData?.[0] ? {
          tipoColaboracao: Array.isArray(availabilityData[0].tipo_colaboracao) ? availabilityData[0].tipo_colaboracao : [],
          disponibilidadeEstimada: availabilityData[0].disponibilidade_estimada || ''
        } : {
          tipoColaboracao: [],
          disponibilidadeEstimada: ''
        },
        contato: availabilityData?.[0] ? {
          formaContato: availabilityData[0].forma_contato || 'email',
          horarioPreferencial: availabilityData[0].horario_preferencial || ''
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

  console.log('🎨 Renderizando perfil:', profile.name);

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      <ProfileHeader profile={profile} getInitials={getInitials} />
      
      {profile.biografia && (
        <ProfileBiography biografia={profile.biografia} />
      )}
      
      {((profile.areasConhecimento && profile.areasConhecimento.length > 0) || 
        (profile.temasInteresse && profile.temasInteresse.length > 0)) && (
        <KnowledgeAreas 
          areasConhecimento={profile.areasConhecimento} 
          temasInteresse={profile.temasInteresse} 
        />
      )}
      
      {profile.formacaoAcademica && profile.formacaoAcademica.length > 0 && (
        <AcademicFormationCard formacaoAcademica={profile.formacaoAcademica} />
      )}
      
      {profile.experienciasProfissionais && profile.experienciasProfissionais.length > 0 && (
        <ProfessionalExperienceCard experienciasProfissionais={profile.experienciasProfissionais} />
      )}
      
      {profile.projetos && profile.projetos.length > 0 && (
        <ProjectsCard projetos={profile.projetos} />
      )}
      
      {((profile.idiomas && profile.idiomas.length > 0) || 
        (profile.certificacoes && profile.certificacoes.length > 0)) && (
        <LanguagesAndCertifications 
          idiomas={profile.idiomas} 
          certificacoes={profile.certificacoes} 
        />
      )}
      
      <AvailabilityCard 
        disponibilidade={profile.disponibilidade} 
        contato={profile.contato} 
      />
      
      {(profile.publicacoes || profile.linkCurriculo || profile.especializacoes) && (
        <PublicationsAndCurriculum 
          publicacoes={profile.publicacoes}
          linkCurriculo={profile.linkCurriculo}
          especializacoes={profile.especializacoes}
        />
      )}
    </div>
  );
};

export default ProfileDetail;
