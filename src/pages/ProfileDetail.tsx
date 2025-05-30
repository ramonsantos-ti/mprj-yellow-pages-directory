
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Profile } from '../types';
import { mockProfiles } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  User, 
  BookOpen, 
  Briefcase,
  Globe,
  Clock,
  FileText,
  ArrowLeft
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ProfileDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const profile = mockProfiles.find(p => p.id === id);

  if (!profile) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Perfil não encontrado</h2>
        <Link to="/" className="text-red-900 hover:text-red-800">
          Voltar ao início
        </Link>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header com botão voltar */}
      <div className="flex items-center space-x-4">
        <Link to="/">
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Perfil Detalhado</h1>
      </div>

      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <div className="flex items-start space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profile.fotoUrl} alt={profile.name} />
              <AvatarFallback className="bg-red-100 text-red-900 font-semibold text-lg">
                {getInitials(profile.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
              <p className="text-lg text-gray-600 mb-2">Matrícula: {profile.matricula}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.cargo.map((cargo, index) => (
                  <Badge key={index} className="bg-red-900 text-white">
                    {cargo}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Atualizado em {format(profile.lastUpdated, "dd/MM/yyyy", { locale: ptBR })}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Contato e Localização */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <span>Contato e Localização</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <span>{profile.email}</span>
            </div>
            {profile.telefone && (
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{profile.telefone}</span>
              </div>
            )}
          </div>
          <div>
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-gray-400 mt-1" />
              <div className="flex flex-wrap gap-1">
                {profile.unidade.map((unidade, index) => (
                  <Badge key={index} variant="outline">
                    {unidade}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Biografia */}
      {profile.biografia && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Sobre</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{profile.biografia}</p>
          </CardContent>
        </Card>
      )}

      {/* Áreas de Conhecimento */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Áreas de Conhecimento</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {profile.areasConhecimento.map((area, index) => (
              <Badge key={index} className="bg-amber-100 text-amber-900 hover:bg-amber-200">
                {area}
              </Badge>
            ))}
          </div>
          {profile.especializacoes && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Especializações</h4>
              <p className="text-gray-700">{profile.especializacoes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Projetos */}
      {profile.projetos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Briefcase className="w-5 h-5" />
              <span>Projetos</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.projetos.map((projeto, index) => (
              <div key={index} className="border-l-4 border-amber-200 pl-4">
                <h4 className="font-medium text-gray-900">{projeto.nome}</h4>
                <p className="text-sm text-gray-600">
                  {format(projeto.dataInicio, "MMM/yyyy", { locale: ptBR })} - 
                  {projeto.dataFim ? format(projeto.dataFim, "MMM/yyyy", { locale: ptBR }) : 'Atual'}
                </p>
                {projeto.observacoes && (
                  <p className="text-sm text-gray-700 mt-1">{projeto.observacoes}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Habilidades */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Habilidades Técnicas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.habilidadesTecnicas.map((habilidade, index) => (
                <Badge key={index} variant="secondary">
                  {habilidade}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Habilidades Comportamentais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.habilidadesComportamentais.map((habilidade, index) => (
                <Badge key={index} variant="secondary">
                  {habilidade}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Formação e Experiência */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Formação Acadêmica</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {profile.formacaoAcademica.map((formacao, index) => (
              <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
                <p className="font-medium text-gray-900">{formacao.nivel}</p>
                <p className="text-gray-700">{formacao.curso}</p>
                <p className="text-sm text-gray-600">{formacao.instituicao} - {formacao.ano}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Briefcase className="w-5 h-5" />
              <span>Experiência Profissional</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {profile.experienciasProfissionais.map((exp, index) => (
              <div key={index} className="space-y-2">
                <div>
                  <p className="font-medium text-gray-900">Tempo no MPRJ</p>
                  <p className="text-gray-700">{exp.tempoMPRJ}</p>
                </div>
                {exp.experienciaAnterior && (
                  <div>
                    <p className="font-medium text-gray-900">Experiência Anterior</p>
                    <p className="text-gray-700">{exp.experienciaAnterior}</p>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Idiomas e Disponibilidade */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Idiomas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.idiomas.map((idioma, index) => (
                <Badge key={index} variant="outline">
                  {idioma}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Disponibilidade</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-medium text-gray-900 mb-2">Tipo de Colaboração</p>
              <div className="flex flex-wrap gap-1">
                {profile.disponibilidade.tipoColaboracao.map((tipo, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tipo}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-900">Disponibilidade Estimada</p>
              <p className="text-gray-700">{profile.disponibilidade.disponibilidadeEstimada}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contato Preferencial */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <span>Preferências de Contato</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-900">Forma Preferencial</p>
              <p className="text-gray-700">{profile.contato.formaContato}</p>
            </div>
            {profile.contato.horarioPreferencial && (
              <div>
                <p className="font-medium text-gray-900">Horário Preferencial</p>
                <p className="text-gray-700">{profile.contato.horarioPreferencial}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Link do Currículo */}
      {profile.linkCurriculo && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Currículo</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <a 
              href={profile.linkCurriculo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-900 hover:text-amber-800 underline"
            >
              Acessar Currículo Completo
            </a>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfileDetail;
