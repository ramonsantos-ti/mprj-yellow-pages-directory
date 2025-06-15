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
      <Card>
        <CardContent className="pt-6">
          {/* Foto */}
          <div className="w-32 h-40 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border">
            {profile.fotoUrl ? (
              <img
                src={profile.fotoUrl}
                alt={formatText(profile.name)}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-full bg-red-100 flex items-center justify-center">
                <span className="text-red-900 font-semibold text-xl">
                  {getInitials(formatText(profile.name))}
                </span>
              </div>
            )}
          </div>

          {/* Informação básica */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <User className="w-6 h-6 text-red-800" /> {formatText(profile.name)}
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Matrícula: {formatText(profile.matricula)}
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-600">
                <MessageSquare className="w-4 h-4" />
                <span>{formatText(profile.email)}</span>
              </div>
              {profile.telefone && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <MessageSquare className="w-4 h-4" />
                  <span>{formatText(profile.telefone)}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cargo, Função e Lotação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-red-800" />
            Cargo, Função e Lotação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <span className="font-medium">Cargo: </span>
              {profile.cargo && profile.cargo.length > 0 ? (
                profile.cargo.map((c, i) => (
                  <Badge key={i} variant="outline" className="mr-1">{formatText(c)}</Badge>
                ))
              ) : (
                <span className="text-gray-500 italic">Não informado</span>
              )}
            </div>
            <div>
              <span className="font-medium">Função: </span>
              {profile.funcao && profile.funcao.length > 0 ? (
                profile.funcao.map((f, i) => (
                  <Badge key={i} variant="outline" className="mr-1 bg-blue-50">{formatText(f)}</Badge>
                ))
              ) : (
                <span className="text-gray-500 italic">Não informado</span>
              )}
            </div>
            <div>
              <span className="font-medium">Lotação: </span>
              {profile.unidade && profile.unidade.length > 0 ? (
                profile.unidade.map((u, i) => (
                  <Badge key={i} variant="outline" className="mr-1">{formatText(u)}</Badge>
                ))
              ) : (
                <span className="text-gray-500 italic">Não informado</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Áreas de Interesse */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-red-800" />
            Áreas de Interesse
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {profile.temasInteresse && profile.temasInteresse.length > 0 ? (
              profile.temasInteresse.map((tema, i) => (
                <Badge key={i} variant="outline">{formatText(tema)}</Badge>
              ))
            ) : (
              <span className="text-gray-500 italic">Nenhuma área de interesse informada</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Formação Acadêmica */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="w-5 h-5 text-red-800" />
            Formação Acadêmica
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {profile.formacaoAcademica && profile.formacaoAcademica.length > 0 ? (
              profile.formacaoAcademica.map((formacao, index) => (
                <div key={formacao.id || index} className="border-l-4 border-red-200 pl-4">
                  <h4 className="font-semibold text-gray-900">{formatText(formacao.nivel)}</h4>
                  <p className="text-gray-700">{formatText(formacao.curso)}</p>
                  <p className="text-sm text-gray-600">{formatText(formacao.instituicao)} • {formacao.ano}</p>
                </div>
              ))
            ) : (
              <span className="text-gray-500 italic">Nenhuma formação acadêmica informada</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Projetos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-red-800" />
            Projetos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {profile.projetos && profile.projetos.length > 0 ? (
              profile.projetos.map((projeto, index) => (
                <div key={projeto.id || index} className="border-l-4 border-yellow-300 pl-4">
                  <h4 className="font-semibold text-gray-900">{formatText(projeto.nome)}</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {projeto.dataInicio &&
                      <span>
                        Início: {projeto.dataInicio instanceof Date
                          ? projeto.dataInicio.toLocaleDateString("pt-BR")
                          : new Date(projeto.dataInicio).toLocaleDateString("pt-BR")}
                      </span>
                    }
                    {projeto.dataFim && (
                      <span>
                        {" • Fim: "}
                        {projeto.dataFim instanceof Date
                          ? projeto.dataFim.toLocaleDateString("pt-BR")
                          : new Date(projeto.dataFim).toLocaleDateString("pt-BR")}
                      </span>
                    )}
                  </p>
                  {projeto.observacoes && (
                    <p className="text-gray-700 text-sm">{formatText(projeto.observacoes)}</p>
                  )}
                </div>
              ))
            ) : (
              <span className="text-gray-500 italic">Nenhum projeto informado</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Certificações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-red-800" />
            Certificações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {profile.certificacoes && profile.certificacoes.length > 0 ? (
              profile.certificacoes.map((cert, index) => (
                <div key={index} className="text-sm text-gray-700">
                  • {formatText(cert)}
                </div>
              ))
            ) : (
              <span className="text-gray-500 italic">Nenhuma certificação informada</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Publicações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-red-800" />
            Publicações
          </CardTitle>
        </CardHeader>
        <CardContent>
          {profile.publicacoes && profile.publicacoes.trim() !== '' ? (
            <p className="text-gray-700 leading-relaxed">{formatText(profile.publicacoes)}</p>
          ) : (
            <span className="text-gray-500 italic">Nenhuma publicação informada</span>
          )}
        </CardContent>
      </Card>

      {/* Disponibilidade para Colaboração */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-red-800" />
            Disponibilidade para Colaboração
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Tipos de Colaboração</h4>
              {profile.disponibilidade?.tipoColaboracao && profile.disponibilidade.tipoColaboracao.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {profile.disponibilidade.tipoColaboracao.map((tipo, index) => (
                    <Badge key={index} variant="outline">{formatText(tipo)}</Badge>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500 italic">Não informado</span>
              )}
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Disponibilidade Estimada</h4>
              {profile.disponibilidade?.disponibilidadeEstimada ? (
                <p className="text-gray-700">{formatText(profile.disponibilidade.disponibilidadeEstimada)}</p>
              ) : (
                <span className="text-gray-500 italic">Não informado</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferências de Contato */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-red-800" />
            Preferências de Contato
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <span className="font-medium mr-1">Forma de contato preferencial:</span>
            {profile.contato && profile.contato.formaContato ? (
              <Badge variant="outline">{formatText(profile.contato.formaContato)}</Badge>
            ) : (
              <span className="text-gray-500 italic">Não informado</span>
            )}
          </div>
          <div className="mt-2">
            <span className="font-medium mr-1">Horário preferencial:</span>
            {profile.contato && profile.contato.horarioPreferencial ? (
              <Badge variant="outline">{formatText(profile.contato.horarioPreferencial)}</Badge>
            ) : (
              <span className="text-gray-500 italic">Não informado</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Idiomas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="w-5 h-5 text-red-800" />
            Idiomas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {profile.idiomas && profile.idiomas.length > 0 ? (
              profile.idiomas.map((idioma, i) => (
                <Badge key={i} variant="outline">{formatText(idioma)}</Badge>
              ))
            ) : (
              <span className="text-gray-500 italic">Nenhum idioma informado</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Informações Complementares */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5 text-red-800" />
            Informações Complementares
          </CardTitle>
        </CardHeader>
        <CardContent>
          {profile.especializacoes && profile.especializacoes.trim() !== '' ? (
            <p className="text-gray-700">{formatText(profile.especializacoes)}</p>
          ) : (
            <span className="text-gray-500 italic">Nenhuma informação complementar informada</span>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileDetail;
