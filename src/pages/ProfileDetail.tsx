import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Calendar,
  FileText,
  Award,
  Users,
  Clock,
  Loader2,
  AlertCircle,
  User
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
      console.log('🔍 Iniciando busca do perfil com ID:', id);
      
      // First, let's try a simple query to see if the profile exists
      const { data: simpleData, error: simpleError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      console.log('📋 Consulta simples - dados encontrados:', simpleData);
      console.log('📋 Consulta simples - erro:', simpleError);

      if (simpleError) {
        console.error('❌ Erro na consulta simples:', simpleError);
        throw simpleError;
      }

      if (!simpleData) {
        console.log('❌ Nenhum perfil encontrado na consulta simples');
        setError('Perfil não encontrado');
        return;
      }

      // Now let's try the complex query with joins
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

      console.log('📊 Consulta completa - dados brutos:', data);
      console.log('📊 Consulta completa - erro:', error);

      if (error) {
        console.error('❌ Erro na consulta completa:', error);
        // If complex query fails, fall back to simple data
        console.log('🔄 Usando dados da consulta simples como fallback');
        const fallbackProfile = createProfileFromSimpleData(simpleData);
        setProfile(fallbackProfile);
        return;
      }

      if (!data) {
        console.log('❌ Nenhum dado retornado da consulta completa');
        setError('Perfil não encontrado');
        return;
      }

      console.log('✅ Dados encontrados, iniciando transformação...');
      console.log('📸 Foto URL encontrada:', data.foto_url ? 'SIM' : 'NÃO');
      console.log('📸 Tipo da foto:', data.foto_url ? (data.foto_url.startsWith('data:') ? 'Base64' : 'URL') : 'Nenhuma');

      // Log each field to debug what's missing
      console.log('🔍 Campos do perfil encontrados:');
      console.log('- name:', data.name);
      console.log('- matricula:', data.matricula);
      console.log('- email:', data.email);
      console.log('- cargo:', data.cargo);
      console.log('- funcao:', data.funcao);
      console.log('- unidade:', data.unidade);
      console.log('- telefone:', data.telefone);
      console.log('- biografia:', data.biografia);
      console.log('- areas_conhecimento:', data.areas_conhecimento);
      console.log('- especializacoes:', data.especializacoes);
      console.log('- temas_interesse:', data.temas_interesse);
      console.log('- idiomas:', data.idiomas);
      console.log('- certificacoes:', data.certificacoes);
      console.log('- publicacoes:', data.publicacoes);
      console.log('- link_curriculo:', data.link_curriculo);
      console.log('- projects count:', data.projects?.length || 0);
      console.log('- academic_formations count:', data.academic_formations?.length || 0);
      console.log('- professional_experiences count:', data.professional_experiences?.length || 0);
      console.log('- availability count:', data.availability?.length || 0);

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

      console.log('🔄 Perfil transformado com sucesso:');
      console.log('- Nome:', transformedProfile.name);
      console.log('- Cargo count:', transformedProfile.cargo.length);
      console.log('- Função count:', transformedProfile.funcao.length);
      console.log('- Unidade count:', transformedProfile.unidade.length);
      console.log('- Áreas conhecimento count:', transformedProfile.areasConhecimento.length);
      console.log('- Projetos count:', transformedProfile.projetos.length);
      console.log('- Formação count:', transformedProfile.formacaoAcademica.length);
      console.log('- Foto disponível:', !!transformedProfile.fotoUrl);

      setProfile(transformedProfile);
    } catch (err: any) {
      console.error('❌ Erro geral ao carregar perfil:', err);
      setError('Erro ao carregar perfil: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const createProfileFromSimpleData = (data: any): Profile => {
    console.log('🔄 Criando perfil a partir de dados simples...');
    return {
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
      projetos: [],
      formacaoAcademica: [],
      experienciasProfissionais: [],
      disponibilidade: {
        tipoColaboracao: [],
        disponibilidadeEstimada: ''
      },
      contato: {
        formaContato: 'email',
        horarioPreferencial: ''
      }
    };
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin text-red-600" />
          <p className="text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="w-8 h-8 mx-auto mb-4 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Perfil não encontrado</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <Link to="/">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar à busca
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  console.log('🎨 Renderizando perfil:', profile.name);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar à busca
          </Button>
        </Link>
        
        {/* Debug info */}
        <div className="text-xs text-gray-400">
          ID: {profile.id} | Dados carregados: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Header with photo and basic info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
            {/* Photo */}
            <div className="w-32 h-40 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border">
              {profile.fotoUrl ? (
                <img 
                  src={profile.fotoUrl} 
                  alt={profile.name} 
                  className="w-full h-full object-cover"
                  onLoad={() => console.log('✅ Imagem carregada com sucesso para:', profile.name)}
                  onError={(e) => {
                    console.error('❌ Erro ao carregar imagem para:', profile.name);
                    console.error('URL da imagem:', profile.fotoUrl);
                  }}
                />
              ) : (
                <div className="w-full h-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-900 font-semibold text-xl">
                    {getInitials(profile.name)}
                  </span>
                </div>
              )}
            </div>

            {/* Basic Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.name}</h1>
              <p className="text-lg text-gray-600 mb-4">Matrícula: {profile.matricula}</p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{profile.email}</span>
                </div>
                
                {profile.telefone && (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{profile.telefone}</span>
                  </div>
                )}
              </div>

              {/* Cargo and Unidade */}
              <div className="mt-4 space-y-2">
                {profile.cargo && profile.cargo.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Cargo:</h3>
                    <div className="flex flex-wrap gap-1">
                      {profile.cargo.map((c, index) => (
                        <Badge key={index} variant="outline">{c}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {profile.funcao && profile.funcao.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Função:</h3>
                    <div className="flex flex-wrap gap-1">
                      {profile.funcao.map((f, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50">{f}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {profile.unidade && profile.unidade.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Unidade:</h3>
                    <div className="flex flex-wrap gap-1">
                      {profile.unidade.map((u, index) => (
                        <Badge key={index} variant="outline">{u}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Biography */}
      {profile.biografia && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Biografia</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{profile.biografia}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Areas de Conhecimento */}
        {profile.areasConhecimento && profile.areasConhecimento.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5" />
                <span>Áreas de Conhecimento</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.areasConhecimento.map((area, index) => (
                  <Badge key={index} className="bg-red-100 text-red-800">
                    {area}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Temas de Interesse */}
        {profile.temasInteresse && profile.temasInteresse.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Temas de Interesse</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.temasInteresse.map((tema, index) => (
                  <Badge key={index} variant="outline">{tema}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Academic Formation */}
      {profile.formacaoAcademica && profile.formacaoAcademica.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5" />
              <span>Formação Acadêmica</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profile.formacaoAcademica.map((formacao, index) => (
                <div key={formacao.id || index} className="border-l-4 border-red-200 pl-4">
                  <h4 className="font-semibold text-gray-900">{formacao.nivel}</h4>
                  <p className="text-gray-700">{formacao.curso}</p>
                  <p className="text-sm text-gray-600">{formacao.instituicao} • {formacao.ano}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Projects */}
      {profile.projetos && profile.projetos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Projetos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profile.projetos.map((projeto, index) => (
                <div key={projeto.id || index} className="border-l-4 border-blue-200 pl-4">
                  <h4 className="font-semibold text-gray-900">{projeto.nome}</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {format(new Date(projeto.dataInicio), 'dd/MM/yyyy', { locale: ptBR })}
                    {projeto.dataFim && (
                      <> - {format(new Date(projeto.dataFim), 'dd/MM/yyyy', { locale: ptBR })}</>
                    )}
                  </p>
                  {projeto.observacoes && (
                    <p className="text-gray-700 text-sm">{projeto.observacoes}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Additional Info Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Languages */}
        {profile.idiomas && profile.idiomas.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Idiomas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.idiomas.map((idioma, index) => (
                  <Badge key={index} variant="outline">{idioma}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Certifications */}
        {profile.certificacoes && profile.certificacoes.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Certificações</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {profile.certificacoes.map((cert, index) => (
                  <div key={index} className="text-sm text-gray-700">
                    • {cert}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Availability */}
      {profile.disponibilidade && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Disponibilidade</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {profile.disponibilidade.tipoColaboracao && profile.disponibilidade.tipoColaboracao.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Tipos de Colaboração</h4>
                  <div className="flex flex-wrap gap-1">
                    {profile.disponibilidade.tipoColaboracao.map((tipo, index) => (
                      <Badge key={index} variant="outline">{tipo}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {profile.disponibilidade.disponibilidadeEstimada && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Disponibilidade Estimada</h4>
                  <p className="text-gray-700">{profile.disponibilidade.disponibilidadeEstimada}</p>
                </div>
              )}
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Forma de Contato Preferencial</h4>
                <Badge variant="outline">{profile.contato.formaContato}</Badge>
              </div>
              
              {profile.contato.horarioPreferencial && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Horário Preferencial</h4>
                  <p className="text-gray-700">{profile.contato.horarioPreferencial}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Publications and Curriculum */}
      <div className="grid gap-6 md:grid-cols-2">
        {profile.publicacoes && (
          <Card>
            <CardHeader>
              <CardTitle>Publicações</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{profile.publicacoes}</p>
            </CardContent>
          </Card>
        )}

        {profile.linkCurriculo && (
          <Card>
            <CardHeader>
              <CardTitle>Currículo</CardTitle>
            </CardHeader>
            <CardContent>
              <a
                href={profile.linkCurriculo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-700 underline"
              >
                Acessar Currículo Completo
              </a>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Specializations */}
      {profile.especializacoes && (
        <Card>
          <CardHeader>
            <CardTitle>Especializações</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{profile.especializacoes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfileDetail;
