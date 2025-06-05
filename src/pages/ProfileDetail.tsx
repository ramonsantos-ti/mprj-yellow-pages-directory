import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { mockProfiles } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Mail, Phone, MapPin, Calendar, FileText, Users, Globe, Award, BookOpen, Briefcase, Clock, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ProfileDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const profile = mockProfiles.find(p => p.id === id);

  if (!profile) {
    return <Navigate to="/404" replace />;
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header com informações básicas */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
            {/* Foto em formato retangular vertical */}
            <div className="w-32 h-40 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border mx-auto md:mx-0">
              {profile.fotoUrl ? (
                <img 
                  src={profile.fotoUrl} 
                  alt={profile.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-900 font-semibold text-2xl">
                    {getInitials(profile.name)}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.name}</h1>
              <p className="text-lg text-gray-600 mb-4">Matrícula: {profile.matricula}</p>
              
              {/* Cargos */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                {profile.cargo.map((cargo, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {cargo}
                  </Badge>
                ))}
              </div>

              {/* Informações de contato */}
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{profile.email}</span>
                </div>
                {profile.telefone && (
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>{profile.telefone}</span>
                  </div>
                )}
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <MapPin className="w-4 h-4" />
                  <div className="flex flex-wrap gap-1">
                    {profile.unidade.map((unidade, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {unidade}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detalhes do Perfil */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Biografia */}
          {profile.biografia && (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">Biografia</h2>
              <Separator />
              <p className="text-gray-700">{profile.biografia}</p>
            </div>
          )}

          {/* Áreas de Conhecimento */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Áreas de Conhecimento</h2>
            <Separator />
            <div className="flex flex-wrap gap-2 mt-2">
              {profile.areasConhecimento.map((area, index) => (
                <Badge key={index} className="bg-red-100 text-red-900 hover:bg-red-200">
                  {area}
                </Badge>
              ))}
            </div>
          </div>

          {/* Especializações */}
          {profile.especializacoes && (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">Especializações</h2>
              <Separator />
              <p className="text-gray-700">{profile.especializacoes}</p>
            </div>
          )}

          {/* Projetos */}
          {profile.projetos && profile.projetos.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">Projetos</h2>
              <Separator />
              <ul className="list-disc list-inside space-y-1">
                {profile.projetos.map((projeto, index) => (
                  <li key={index} className="text-gray-700">
                    <strong>{projeto.nome}</strong> ({format(new Date(projeto.dataInicio), "MM/yyyy")} - {projeto.dataFim ? format(new Date(projeto.dataFim), "MM/yyyy") : 'Presente'})
                    {projeto.observacoes && <p className="text-sm text-gray-600">{projeto.observacoes}</p>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Formação Acadêmica */}
          {profile.formacaoAcademica && profile.formacaoAcademica.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">Formação Acadêmica</h2>
              <Separator />
              <ul className="list-disc list-inside space-y-1">
                {profile.formacaoAcademica.map((formacao, index) => (
                  <li key={index} className="text-gray-700">
                    {formacao.nivel} em {formacao.curso} - {formacao.instituicao} ({formacao.ano})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Experiências Profissionais */}
          {profile.experienciasProfissionais && profile.experienciasProfissionais.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">Experiências Profissionais</h2>
              <Separator />
              <div className="space-y-1">
                {profile.experienciasProfissionais.map((experiencia, index) => (
                  <div key={index} className="text-gray-700">
                    <p><strong>Tempo no MPRJ:</strong> {experiencia.tempoMPRJ}</p>
                    {experiencia.experienciaAnterior && <p><strong>Experiência Anterior:</strong> {experiencia.experienciaAnterior}</p>}
                    {experiencia.projetosInternos && <p><strong>Projetos Internos:</strong> {experiencia.projetosInternos}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Habilidades Técnicas */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Habilidades Técnicas</h2>
            <Separator />
            <div className="flex flex-wrap gap-2 mt-2">
              {profile.habilidadesTecnicas.map((habilidade, index) => (
                <Badge key={index} className="bg-blue-100 text-blue-900 hover:bg-blue-200">
                  {habilidade}
                </Badge>
              ))}
            </div>
          </div>

          {/* Habilidades Comportamentais */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Habilidades Comportamentais</h2>
            <Separator />
            <div className="flex flex-wrap gap-2 mt-2">
              {profile.habilidadesComportamentais.map((habilidade, index) => (
                <Badge key={index} className="bg-green-100 text-green-900 hover:bg-green-200">
                  {habilidade}
                </Badge>
              ))}
            </div>
          </div>

          {/* Idiomas */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Idiomas</h2>
            <Separator />
            <div className="flex flex-wrap gap-2 mt-2">
              {profile.idiomas.map((idioma, index) => (
                <Badge key={index} className="bg-purple-100 text-purple-900 hover:bg-purple-200">
                  {idioma}
                </Badge>
              ))}
            </div>
          </div>

          {/* Disponibilidade */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">Disponibilidade</h2>
            <Separator />
            <p className="text-gray-700">
              <strong>Tipos de Colaboração:</strong> {profile.disponibilidade.tipoColaboracao.join(', ')}
              <br />
              <strong>Disponibilidade Estimada:</strong> {profile.disponibilidade.disponibilidadeEstimada}
            </p>
          </div>

          {/* Contato */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">Contato</h2>
            <Separator />
            <p className="text-gray-700">
              <strong>Forma de Contato:</strong> {profile.contato.formaContato}
              {profile.contato.horarioPreferencial && <><br /><strong>Horário Preferencial:</strong> {profile.contato.horarioPreferencial}</>}
            </p>
          </div>

          {/* Link para Currículo */}
          {profile.linkCurriculo && (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">Currículo</h2>
              <Separator />
              <a href={profile.linkCurriculo} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Visualizar Currículo
              </a>
            </div>
          )}

          {/* Termos de Aceite */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">Termos de Aceite</h2>
            <Separator />
            <p className="text-gray-700">
              <strong>Aceite dos Termos:</strong> {profile.aceiteTermos ? 'Sim' : 'Não'}
            </p>
          </div>

          {/* Data da Última Atualização */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Última Atualização</h2>
            <Separator />
            <div className="flex items-center space-x-2 text-gray-700">
              <Calendar className="w-4 h-4" />
              <span>{format(profile.lastUpdated, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileDetail;
