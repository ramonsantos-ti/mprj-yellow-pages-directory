import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { mockProfiles } from '../data/mockData';
import { Profile } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { CalendarIcon, Plus, X, Upload, Save, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '../lib/utils';
import KnowledgeAreaSelector from '../components/KnowledgeAreaSelector';
import {
  CARGOS_MPRJ,
  UNIDADES_MPRJ,
  HABILIDADES_TECNICAS,
  HABILIDADES_COMPORTAMENTAIS,
  IDIOMAS,
  TIPOS_COLABORACAO,
  DISPONIBILIDADE_ESTIMADA,
  FORMAS_CONTATO
} from '../data/constants';

const ProfileEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<Profile>();

  useEffect(() => {
    const foundProfile = mockProfiles.find(p => p.id === id);
    if (foundProfile) {
      setProfile(foundProfile);
      
      // Populate form with existing data
      Object.keys(foundProfile).forEach(key => {
        setValue(key as keyof Profile, foundProfile[key as keyof Profile]);
      });
    }
  }, [id, setValue]);

  const watchedValues = watch();
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const onSubmit = async (data: Profile) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Profile updated:', data);
    setIsLoading(false);
    navigate(`/profile/${id}`);
  };

  if (!profile) {
    return <div>Perfil não encontrado</div>;
  }

  const handleAddCargo = () => {
    const newCargo = window.prompt('Digite o novo cargo:');
    if (newCargo) {
      setValue('cargo', [...(watchedValues.cargo || []), newCargo]);
    }
  };

  const handleRemoveCargo = (cargoToRemove: string) => {
    setValue('cargo', (watchedValues.cargo || []).filter(cargo => cargo !== cargoToRemove));
  };

  const handleAddUnidade = () => {
    const newUnidade = window.prompt('Digite a nova unidade:');
    if (newUnidade) {
      setValue('unidade', [...(watchedValues.unidade || []), newUnidade]);
    }
  };

  const handleRemoveUnidade = (unidadeToRemove: string) => {
    setValue('unidade', (watchedValues.unidade || []).filter(unidade => unidade !== unidadeToRemove));
  };

  const handleAddHabilidadeTecnica = () => {
    const newHabilidade = window.prompt('Digite a nova habilidade técnica:');
    if (newHabilidade) {
      setValue('habilidadesTecnicas', [...(watchedValues.habilidadesTecnicas || []), newHabilidade]);
    }
  };

  const handleRemoveHabilidadeTecnica = (habilidadeToRemove: string) => {
    setValue('habilidadesTecnicas', (watchedValues.habilidadesTecnicas || []).filter(habilidade => habilidade !== habilidadeToRemove));
  };

  const handleAddHabilidadeComportamental = () => {
    const newHabilidade = window.prompt('Digite a nova habilidade comportamental:');
    if (newHabilidade) {
      setValue('habilidadesComportamentais', [...(watchedValues.habilidadesComportamentais || []), newHabilidade]);
    }
  };

  const handleRemoveHabilidadeComportamental = (habilidadeToRemove: string) => {
    setValue('habilidadesComportamentais', (watchedValues.habilidadesComportamentais || []).filter(habilidade => habilidade !== habilidadeToRemove));
  };

  const handleAddIdioma = () => {
    const newIdioma = window.prompt('Digite o novo idioma:');
    if (newIdioma) {
      setValue('idiomas', [...(watchedValues.idiomas || []), newIdioma]);
    }
  };

  const handleRemoveIdioma = (idiomaToRemove: string) => {
    setValue('idiomas', (watchedValues.idiomas || []).filter(idioma => idioma !== idiomaToRemove));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate(`/profile/${id}`)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Perfil</span>
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Editar Perfil</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Informações Básicas */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
              {/* Foto em formato retangular vertical */}
              <div className="flex flex-col items-center space-y-2">
                <div className="w-32 h-40 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border">
                  {profile.fotoUrl ? (
                    <img 
                      src={profile.fotoUrl} 
                      alt={profile.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-900 font-semibold text-xl">
                        {getInitials(profile.name)}
                      </span>
                    </div>
                  )}
                </div>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Alterar Foto</span>
                </Button>
              </div>

              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      {...register('name', { required: 'Nome é obrigatório' })}
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="matricula">Matrícula *</Label>
                    <Input
                      id="matricula"
                      {...register('matricula', { required: 'Matrícula é obrigatória' })}
                      className={errors.matricula ? 'border-red-500' : ''}
                    />
                    {errors.matricula && (
                      <p className="text-red-500 text-sm mt-1">{errors.matricula.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email', { required: 'E-mail é obrigatório' })}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      {...register('telefone')}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="biografia">Biografia</Label>
                  <Textarea
                    id="biografia"
                    {...register('biografia')}
                    placeholder="Conte um pouco sobre você, sua experiência e interesses profissionais..."
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conhecimentos e Especialização */}
        <Card>
          <CardHeader>
            <CardTitle>Conhecimentos e Especialização</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium">Áreas de Conhecimento</Label>
              <p className="text-sm text-gray-600 mb-4">
                Selecione suas áreas de conhecimento principais
              </p>
              <KnowledgeAreaSelector
                selectedAreas={watchedValues.areasConhecimento || []}
                onChange={(areas) => setValue('areasConhecimento', areas)}
              />
            </div>

            <Separator />

            <div>
              <Label htmlFor="especializacoes">Especializações e Temas Específicos</Label>
              <p className="text-sm text-gray-600 mb-2">
                Descreva especializações específicas que não estão listadas nas opções acima
              </p>
              <Textarea
                id="especializacoes"
                {...register('especializacoes')}
                placeholder="Ex: Mediação de conflitos, Análise de risco de crédito, Machine Learning aplicado ao direito..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Cargos */}
        <Card>
          <CardHeader>
            <CardTitle>Cargos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Selecione os cargos que você ocupa ou já ocupou no MPRJ.
            </p>
            <div className="flex flex-wrap gap-2">
              {watchedValues.cargo && watchedValues.cargo.map((cargo, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {cargo}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => handleRemoveCargo(cargo)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              <Button variant="outline" size="sm" onClick={handleAddCargo} className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Adicionar Cargo</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Unidades */}
        <Card>
          <CardHeader>
            <CardTitle>Unidades</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Selecione as unidades onde você trabalha ou já trabalhou no MPRJ.
            </p>
            <div className="flex flex-wrap gap-2">
              {watchedValues.unidade && watchedValues.unidade.map((unidade, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {unidade}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => handleRemoveUnidade(unidade)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              <Button variant="outline" size="sm" onClick={handleAddUnidade} className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Adicionar Unidade</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Habilidades Técnicas */}
        <Card>
          <CardHeader>
            <CardTitle>Habilidades Técnicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Liste suas habilidades técnicas (ex: linguagens de programação, ferramentas de análise de dados, etc.).
            </p>
            <div className="flex flex-wrap gap-2">
              {watchedValues.habilidadesTecnicas && watchedValues.habilidadesTecnicas.map((habilidade, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {habilidade}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => handleRemoveHabilidadeTecnica(habilidade)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              <Button variant="outline" size="sm" onClick={handleAddHabilidadeTecnica} className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Adicionar Habilidade</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Habilidades Comportamentais */}
        <Card>
          <CardHeader>
            <CardTitle>Habilidades Comportamentais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Liste suas habilidades comportamentais (ex: liderança, comunicação, trabalho em equipe, etc.).
            </p>
            <div className="flex flex-wrap gap-2">
              {watchedValues.habilidadesComportamentais && watchedValues.habilidadesComportamentais.map((habilidade, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {habilidade}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => handleRemoveHabilidadeComportamental(habilidade)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              <Button variant="outline" size="sm" onClick={handleAddHabilidadeComportamental} className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Adicionar Habilidade</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Idiomas */}
        <Card>
          <CardHeader>
            <CardTitle>Idiomas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Liste os idiomas que você domina.
            </p>
            <div className="flex flex-wrap gap-2">
              {watchedValues.idiomas && watchedValues.idiomas.map((idioma, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {idioma}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => handleRemoveIdioma(idioma)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              <Button variant="outline" size="sm" onClick={handleAddIdioma} className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Adicionar Idioma</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Botões de ação */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(`/profile/${id}`)}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-red-900 hover:bg-red-800">
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
