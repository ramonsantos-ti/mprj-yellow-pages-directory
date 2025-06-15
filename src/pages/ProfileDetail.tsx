import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '../types';
import ProfileHeader from '../components/profile-detail/ProfileHeader';
import AcademicFormationCard from '../components/profile-detail/AcademicFormationCard';
import ProjectsCard from '../components/profile-detail/ProjectsCard';
import LanguagesAndCertifications from '../components/profile-detail/LanguagesAndCertifications';
import AvailabilityCard from '../components/profile-detail/AvailabilityCard';
import PublicationsAndCurriculum from '../components/profile-detail/PublicationsAndCurriculum';
import LoadingState from '../components/profile-detail/LoadingState';
import ErrorState from '../components/profile-detail/ErrorState';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { User, Briefcase, Target, Book, Award, FileText, Calendar, MessageSquare, Languages, Info } from 'lucide-react';
import { formatText } from '../utils/formatText';
import ProfileBasicInfo from '../components/profile-detail/ProfileBasicInfo';
import ProfileBio from '../components/profile-detail/ProfileBio';
import ProfileInterestAreas from '../components/profile-detail/ProfileInterestAreas';
import ProfileCertifications from '../components/profile-detail/ProfileCertifications';
import ProfilePublications from '../components/profile-detail/ProfilePublications';
import ProfileAdditionalInfo from '../components/profile-detail/ProfileAdditionalInfo';

const ProfileDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        return;
      }

      if (!profileData) {
        setError('Perfil não encontrado');
        return;
      }

      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .eq('profile_id', id);

      const { data: formationsData } = await supabase
        .from('academic_formations')
        .select('*')
        .eq('profile_id', id);

      const { data: availabilityData } = await supabase
        .from('availability')
        .select('*')
        .eq('profile_id', id);

      const transformedProfile: Profile = {
        id: profileData.id,
        userId: profileData.user_id || '',
        name: profileData.name || '',
        matricula: profileData.matricula || '',
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
        experienciasProfissionais: [], // Não será exibido
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
    } finally {
      setLoading(false);
    }
  };

  // Utilitário para ocultar blocos vazios (mantido aqui caso precise em outros pontos)
  const isFieldFilled = (value: any) => {
    if (Array.isArray(value)) return value.length > 0 && value.some(v => v && String(v).trim() !== '');
    if (typeof value === 'string') return value.trim() !== '';
    return !!value;
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
      {/* Foto e Informação Básica */}
      <ProfileBasicInfo profile={profile} getInitials={getInitials} />

      {/* Biografia */}
      <ProfileBio biografia={profile.biografia} />

      {/* Áreas de Interesse */}
      <ProfileInterestAreas temasInteresse={profile.temasInteresse} />

      {/* Formação Acadêmica */}
      <AcademicFormationCard formacaoAcademica={profile.formacaoAcademica} />

      {/* Projetos */}
      <ProjectsCard projetos={profile.projetos} />

      {/* Certificações */}
      <ProfileCertifications certificacoes={profile.certificacoes} />

      {/* Publicações */}
      <ProfilePublications publicacoes={profile.publicacoes} />

      {/* Disponibilidade para Colaboração e Preferências de contato */}
      <AvailabilityCard disponibilidade={profile.disponibilidade} contato={profile.contato} />

      {/* Idiomas */}
      <LanguagesAndCertifications idiomas={profile.idiomas} certificacoes={[]} />

      {/* Informações Complementares */}
      <ProfileAdditionalInfo especializacoes={profile.especializacoes} />
    </div>
  );
};

export default ProfileDetail;
