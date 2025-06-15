
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

      console.log('✅ Dados básicos do perfil encontrados:', profileData);

      // Buscar projetos relacionados
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .eq('profile_id', id);

      console.log('📊 Projetos encontrados:', projectsData?.length || 0, projectsData);

      // Buscar formações acadêmicas
      const { data: formationsData, error: formationsError } = await supabase
        .from('academic_formations')
        .select('*')
        .eq('profile_id', id);

      console.log('🎓 Formações encontradas:', formationsData?.length || 0, formationsData);

      // Buscar experiências profissionais
      const { data: experiencesData, error: experiencesError } = await supabase
        .from('professional_experiences')
        .select('*')
        .eq('profile_id', id);

      console.log('💼 Experiências encontradas:', experiencesData?.length || 0, experiencesData);

      // Buscar disponibilidade
      const { data: availabilityData, error: availabilityError } = await supabase
        .from('availability')
        .select('*')
        .eq('profile_id', id);

      console.log('📅 Disponibilidade encontrada:', availabilityData?.length || 0, availabilityData);

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

      console.log('🔄 Perfil transformado final:', transformedProfile);
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
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      <ProfileHeader profile={profile} getInitials={getInitials} />
      
      {/* Biografia - sempre exibir */}
      <ProfileBiography biografia={profile.biografia} />
      
      {/* Áreas de Conhecimento e Temas de Interesse - sempre exibir */}
      <KnowledgeAreas 
        areasConhecimento={profile.areasConhecimento} 
        temasInteresse={profile.temasInteresse} 
      />
      
      {/* Formação Acadêmica - sempre exibir */}
      <AcademicFormationCard formacaoAcademica={profile.formacaoAcademica} />
      
      {/* Experiência Profissional - sempre exibir */}
      <ProfessionalExperienceCard experienciasProfissionais={profile.experienciasProfissionais} />
      
      {/* Projetos - sempre exibir */}
      <ProjectsCard projetos={profile.projetos} />
      
      {/* Idiomas e Certificações - sempre exibir */}
      <LanguagesAndCertifications 
        idiomas={profile.idiomas} 
        certificacoes={profile.certificacoes} 
      />
      
      {/* Disponibilidade - sempre exibir */}
      <AvailabilityCard 
        disponibilidade={profile.disponibilidade} 
        contato={profile.contato} 
      />
      
      {/* Publicações e Currículo - sempre exibir */}
      <PublicationsAndCurriculum 
        publicacoes={profile.publicacoes}
        linkCurriculo={profile.linkCurriculo}
        especializacoes={profile.especializacoes}
      />
    </div>
  );
};

export default ProfileDetail;
