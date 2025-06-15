
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

  // Utilitário para ocultar blocos vazios (string ou array)
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
      <ProfileHeader profile={profile} getInitials={getInitials} />

      {/* Cargo, Função e Lotação */}
      {(isFieldFilled(profile.cargo) || isFieldFilled(profile.funcao) || isFieldFilled(profile.unidade)) && (
        <Card>
          <CardHeader>
            <CardTitle>Cargo, Função e Lotação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {isFieldFilled(profile.cargo) && (
                <div>
                  <span className="font-medium">Cargo: </span>
                  {profile.cargo.map((c, i) => (
                    <Badge key={i} variant="outline" className="mr-1">{c}</Badge>
                  ))}
                </div>
              )}
              {isFieldFilled(profile.funcao) && (
                <div>
                  <span className="font-medium">Função: </span>
                  {profile.funcao.map((f, i) => (
                    <Badge key={i} variant="outline" className="mr-1 bg-blue-50">{f}</Badge>
                  ))}
                </div>
              )}
              {isFieldFilled(profile.unidade) && (
                <div>
                  <span className="font-medium">Lotação: </span>
                  {profile.unidade.map((u, i) => (
                    <Badge key={i} variant="outline" className="mr-1">{u}</Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Áreas de Interesse */}
      {isFieldFilled(profile.temasInteresse) && (
        <Card>
          <CardHeader>
            <CardTitle>Áreas de Interesse</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.temasInteresse.map((tema, i) => (
                <Badge key={i} variant="outline">{tema}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Formação Acadêmica */}
      {isFieldFilled(profile.formacaoAcademica) && (
        <AcademicFormationCard formacaoAcademica={profile.formacaoAcademica} />
      )}

      {/* Projetos */}
      {isFieldFilled(profile.projetos) && (
        <ProjectsCard projetos={profile.projetos} />
      )}

      {/* Certificações e Idiomas */}
      {(isFieldFilled(profile.certificacoes) || isFieldFilled(profile.idiomas)) && (
        <LanguagesAndCertifications 
          idiomas={profile.idiomas || []} 
          certificacoes={profile.certificacoes || []} 
        />
      )}

      {/* Publicações */}
      {isFieldFilled(profile.publicacoes) && (
        <PublicationsAndCurriculum 
          publicacoes={profile.publicacoes}
        />
      )}

      {/* Disponibilidade para Colaboração */}
      {isFieldFilled(profile.disponibilidade?.tipoColaboracao) || isFieldFilled(profile.disponibilidade?.disponibilidadeEstimada) ? (
        <AvailabilityCard 
          disponibilidade={profile.disponibilidade} 
          contato={profile.contato} 
        />
      ) : null}

      {/* Preferências de Contato */}
      {(isFieldFilled(profile.contato?.formaContato) || isFieldFilled(profile.contato?.horarioPreferencial)) && (
        <Card>
          <CardHeader>
            <CardTitle>Preferências de Contato</CardTitle>
          </CardHeader>
          <CardContent>
            {isFieldFilled(profile.contato?.formaContato) && (
              <div>
                <span className="font-medium mr-1">Forma de contato preferencial:</span>
                <Badge variant="outline">{profile.contato.formaContato}</Badge>
              </div>
            )}
            {isFieldFilled(profile.contato?.horarioPreferencial) && (
              <div className="mt-2">
                <span className="font-medium mr-1">Horário preferencial:</span>
                <Badge variant="outline">{profile.contato.horarioPreferencial}</Badge>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Informações Complementares */}
      {isFieldFilled(profile.especializacoes) && (
        <Card>
          <CardHeader>
            <CardTitle>Informações Complementares</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{profile.especializacoes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfileDetail;

