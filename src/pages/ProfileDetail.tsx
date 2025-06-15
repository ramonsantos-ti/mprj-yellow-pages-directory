
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '../types';
import ProfileCard from '../components/ProfileCard';
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
    // eslint-disable-next-line
  }, [id]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (profileError) {
        setError('Perfil não encontrado');
        setProfile(null);
        return;
      }
      if (!profileData) {
        setError('Perfil não encontrado');
        setProfile(null);
        return;
      }

      // Buscar projetos
      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .eq('profile_id', id);

      // Buscar formações acadêmicas
      const { data: formationsData } = await supabase
        .from('academic_formations')
        .select('*')
        .eq('profile_id', id);

      // Buscar experiências profissionais
      const { data: experiencesData } = await supabase
        .from('professional_experiences')
        .select('*')
        .eq('profile_id', id);

      // Buscar disponibilidade
      const { data: availabilityData } = await supabase
        .from('availability')
        .select('*')
        .eq('profile_id', id);

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

      setProfile(transformedProfile);
    } catch (err: any) {
      setError('Erro ao carregar perfil: ' + err.message);
      setProfile(null);
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

  // Reutiliza o Card igual ao Home e depois exibe todos os detalhes completos em blocos, na mesma ordem.

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      {/* Visualização igual à home */}
      <ProfileCard profile={profile} />

      {/* Áreas de conhecimento e interesse */}
      <KnowledgeAreas 
        areasConhecimento={profile.areasConhecimento} 
        temasInteresse={profile.temasInteresse} 
      />

      {/* Projetos */}
      <ProjectsCard projetos={profile.projetos} />

      {/* Formação acadêmica */}
      <AcademicFormationCard formacaoAcademica={profile.formacaoAcademica} />

      {/* Experiência Profissional */}
      <ProfessionalExperienceCard experienciasProfissionais={profile.experienciasProfissionais} />

      {/* Idiomas e Certificações */}
      <LanguagesAndCertifications 
        idiomas={profile.idiomas} 
        certificacoes={profile.certificacoes} 
      />

      {/* Disponibilidade e Contato */}
      <AvailabilityCard 
        disponibilidade={profile.disponibilidade} 
        contato={profile.contato} 
      />

      {/* Publicações, Currículo e Especializações */}
      <PublicationsAndCurriculum 
        publicacoes={profile.publicacoes}
        linkCurriculo={profile.linkCurriculo}
        especializacoes={profile.especializacoes}
      />
    </div>
  );
};

export default ProfileDetail;

