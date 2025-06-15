
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ArrowLeft, Mail, Phone, Calendar, MapPin, User, GraduationCap, Briefcase, Award, Construction, Clock, Target } from 'lucide-react';
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

      if (profileError || !profileData) {
        setError('Perfil não encontrado');
        return;
      }

      // Buscar projetos relacionados
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
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  if (loading) return <LoadingState />;
  if (error || !profile) return <ErrorState error={error || 'Erro desconhecido'} />;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header e navegação */}
      <div className="flex items-center justify-between">
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar à busca
          </Button>
        </Link>
        <div className="flex items-center space-x-3">
          <Badge variant={profile.role === 'admin' ? 'default' : 'secondary'}>
            {profile.role === 'admin' ? 'Administrador' : 'Usuário'}
          </Badge>
        </div>
      </div>

      {/* Dados básicos do perfil */}
      <Card>
        <CardContent className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-8 pt-6">
          <div className="w-32 h-40 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border">
            {profile.fotoUrl ? (
              <img 
                src={profile.fotoUrl} 
                alt={profile.name} 
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            ) : (
              <div className="w-full h-full bg-red-100 flex items-center justify-center">
                <span className="text-red-900 font-semibold text-xl">
                  {getInitials(profile.name)}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1 space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-sm text-gray-600">Matrícula: <b>{profile.matricula}</b></span>
              {profile.cargo.map((cargo, i) => (
                <Badge key={i} className="text-xs">{cargo}</Badge>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {profile.unidade.map((unidade, i) => (
                <Badge key={i} variant="outline" className="text-xs">{unidade}</Badge>
              ))}
              {profile.funcao.map((funcao, i) => (
                <Badge key={i} variant="outline" className="bg-blue-50 text-xs">{funcao}</Badge>
              ))}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4" /> <span>{profile.email}</span>
              </div>
              {profile.telefone && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-4 h-4" /> <span>{profile.telefone}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
              <Calendar className="w-4 h-4" />
              <span>Atualização: {profile.lastUpdated.toLocaleDateString("pt-BR")}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Biografia */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><User className="w-5 h-5" />Biografia</CardTitle>
        </CardHeader>
        <CardContent>
          {profile.biografia ? (
            <p className="text-gray-700 leading-relaxed">{profile.biografia}</p>
          ) : (
            <p className="text-gray-500 italic">Biografia não informada</p>
          )}
        </CardContent>
      </Card>

      {/* Áreas de conhecimento e interesse */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Target className="w-5 h-5" />Áreas de Conhecimento</CardTitle>
          </CardHeader>
          <CardContent>
            {profile.areasConhecimento && profile.areasConhecimento.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profile.areasConhecimento.map((area, i) => (
                  <Badge key={i} className="bg-red-100 text-red-800">{area}</Badge>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">Nenhuma área de conhecimento informada</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Target className="w-5 h-5" />Áreas de Interesse</CardTitle>
          </CardHeader>
          <CardContent>
            {profile.temasInteresse && profile.temasInteresse.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profile.temasInteresse.map((tema, i) => (
                  <Badge key={i} variant="outline">{tema}</Badge>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">Nenhuma área de interesse informada</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Formação Acadêmica */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><GraduationCap className="w-5 h-5" />Formação Acadêmica</CardTitle>
        </CardHeader>
        <CardContent>
          {profile.formacaoAcademica && profile.formacaoAcademica.length > 0 ? (
            <div className="space-y-4">
              {profile.formacaoAcademica.map((formacao, i) => (
                <div key={formacao.id || i} className="border-l-4 border-red-200 pl-4">
                  <div className="font-semibold text-gray-900">{formacao.nivel}</div>
                  <div className="text-gray-700">{formacao.curso}</div>
                  <div className="text-sm text-gray-600">{formacao.instituicao} • {formacao.ano}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Nenhuma formação acadêmica informada</p>
          )}
        </CardContent>
      </Card>

      {/* Experiência Profissional */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Briefcase className="w-5 h-5" />Experiência Profissional</CardTitle>
        </CardHeader>
        <CardContent>
        {profile.experienciasProfissionais && profile.experienciasProfissionais.length > 0 ? (
          <div className="space-y-4">
            {profile.experienciasProfissionais.map((exp, i) => (
              <div key={i} className="border-l-4 border-green-200 pl-4">
                {exp.tempoMPRJ && (
                  <div className="mb-2">
                    <div className="font-semibold text-gray-900">Tempo no MPRJ</div>
                    <div className="text-gray-700">{exp.tempoMPRJ}</div>
                  </div>
                )}
                {exp.experienciaAnterior && (
                  <div className="mb-2">
                    <div className="font-semibold text-gray-900">Experiência Anterior</div>
                    <div className="text-gray-700">{exp.experienciaAnterior}</div>
                  </div>
                )}
                {exp.projetosInternos && (
                  <div className="mb-2">
                    <div className="font-semibold text-gray-900">Projetos Internos</div>
                    <div className="text-gray-700">{exp.projetosInternos}</div>
                  </div>
                )}
                {exp.publicacoes && (
                  <div className="mb-2">
                    <div className="font-semibold text-gray-900">Publicações Relacionadas</div>
                    <div className="text-gray-700">{exp.publicacoes}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">Nenhuma experiência profissional informada</p>
        )}
        </CardContent>
      </Card>

      {/* Projetos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Construction className="w-5 h-5" />Projetos</CardTitle>
        </CardHeader>
        <CardContent>
        {profile.projetos && profile.projetos.length > 0 ? (
          <div className="space-y-4">
            {profile.projetos.map((proj, i) => (
              <div key={proj.id || i} className="border-l-4 border-yellow-300 pl-4">
                <div className="font-semibold text-gray-900">{proj.nome}</div>
                <div className="text-sm text-gray-600 mb-2">
                  {proj.dataInicio && (
                    <span>
                      Início: {proj.dataInicio instanceof Date
                        ? proj.dataInicio.toLocaleDateString("pt-BR")
                        : new Date(proj.dataInicio).toLocaleDateString("pt-BR")}
                    </span>
                  )}
                  {proj.dataFim && (
                    <span>
                      {" • Fim: "}
                      {proj.dataFim instanceof Date
                        ? proj.dataFim.toLocaleDateString("pt-BR")
                        : new Date(proj.dataFim).toLocaleDateString("pt-BR")}
                    </span>
                  )}
                </div>
                {proj.observacoes && (
                  <div className="text-gray-700 text-sm">{proj.observacoes}</div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">Nenhum projeto informado</p>
        )}
        </CardContent>
      </Card>

      {/* Idiomas e Certificações */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Idiomas</CardTitle>
          </CardHeader>
          <CardContent>
            {profile.idiomas && profile.idiomas.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profile.idiomas.map((idioma, i) => (
                  <Badge key={i} variant="outline">{idioma}</Badge>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">Nenhum idioma informado</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Award className="w-5 h-5" />Certificações</CardTitle>
          </CardHeader>
          <CardContent>
            {profile.certificacoes && profile.certificacoes.length > 0 ? (
              <div className="space-y-2">
                {profile.certificacoes.map((cert, i) => (
                  <div key={i} className="text-sm text-gray-700">• {cert}</div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">Nenhuma certificação informada</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Disponibilidade */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Clock className="w-5 h-5" />Disponibilidade e Contato</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="font-medium text-gray-900 mb-2">Tipos de Colaboração</div>
              {profile.disponibilidade?.tipoColaboracao?.length ? (
                <div className="flex flex-wrap gap-1">
                  {profile.disponibilidade.tipoColaboracao.map((tipo, i) => (
                    <Badge key={i} variant="outline">{tipo}</Badge>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">Não informado</p>
              )}
            </div>
            <div>
              <div className="font-medium text-gray-900 mb-2">Disponibilidade Estimada</div>
              {profile.disponibilidade?.disponibilidadeEstimada ? (
                <div className="text-gray-700">{profile.disponibilidade.disponibilidadeEstimada}</div>
              ) : (
                <p className="text-gray-500 italic">Não informado</p>
              )}
            </div>
            <div>
              <div className="font-medium text-gray-900 mb-2">Forma de Contato Preferencial</div>
              <Badge variant="outline">{profile.contato?.formaContato || 'E-mail'}</Badge>
            </div>
            <div>
              <div className="font-medium text-gray-900 mb-2">Horário Preferencial</div>
              {profile.contato?.horarioPreferencial ? (
                <div className="text-gray-700">{profile.contato.horarioPreferencial}</div>
              ) : (
                <p className="text-gray-500 italic">Não informado</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Publicações, Currículo e Especializações */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Publicações</CardTitle>
          </CardHeader>
          <CardContent>
            {profile.publicacoes && profile.publicacoes.trim() !== '' ? (
              <p className="text-gray-700 leading-relaxed">{profile.publicacoes}</p>
            ) : (
              <p className="text-gray-500 italic">Nenhuma publicação informada</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Currículo</CardTitle>
          </CardHeader>
          <CardContent>
            {profile.linkCurriculo && profile.linkCurriculo.trim() !== '' ? (
              <a href={profile.linkCurriculo} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 underline">
                Acessar Currículo Completo
              </a>
            ) : (
              <p className="text-gray-500 italic">Link do currículo não informado</p>
            )}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Especializações</CardTitle>
        </CardHeader>
        <CardContent>
          {profile.especializacoes && profile.especializacoes.trim() !== '' ? (
            <p className="text-gray-700 leading-relaxed">{profile.especializacoes}</p>
          ) : (
            <p className="text-gray-500 italic">Nenhuma especialização informada</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileDetail;
