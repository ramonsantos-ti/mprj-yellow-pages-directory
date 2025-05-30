
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Checkbox } from '../components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { Alert, AlertDescription } from '../components/ui/alert';
import { 
  AREAS_JURIDICAS, 
  AREAS_ADMINISTRATIVAS, 
  HABILIDADES_TECNICAS, 
  HABILIDADES_COMPORTAMENTAIS,
  IDIOMAS,
  CARGOS,
  UNIDADES,
  NIVEIS_FORMACAO,
  TIPOS_COLABORACAO,
  DISPONIBILIDADE_ESTIMADA,
  FORMAS_CONTATO
} from '../data/constants';
import { mockProfiles } from '../data/mockData';
import { Save, Plus, X, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const profileSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  matricula: z.string().min(1, 'Matrícula é obrigatória'),
  cargo: z.array(z.string()).min(1, 'Pelo menos um cargo é obrigatório'),
  unidade: z.array(z.string()).min(1, 'Pelo menos uma unidade é obrigatória'),
  email: z.string().email('Email inválido'),
  telefone: z.string().optional(),
  biografia: z.string().optional(),
  areasConhecimento: z.array(z.string()).min(1, 'Pelo menos uma área de conhecimento é obrigatória'),
  especializacoes: z.string().optional(),
  temasInteresse: z.array(z.string()).min(1, 'Pelo menos um tema de interesse é obrigatório'),
  habilidadesTecnicas: z.array(z.string()),
  habilidadesComportamentais: z.array(z.string()),
  idiomas: z.array(z.string()),
  linkCurriculo: z.string().optional(),
  aceiteTermos: z.boolean().refine(val => val === true, 'Deve aceitar os termos')
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfileEdit: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [projetos, setProjetos] = useState<Array<{nome: string, dataInicio: string, dataFim?: string, observacoes?: string}>>([]);
  const [formacoes, setFormacoes] = useState<Array<{nivel: string, instituicao: string, curso: string, ano: number}>>([]);
  const [tipoColaboracao, setTipoColaboracao] = useState<string[]>([]);
  const [disponibilidadeEstimada, setDisponibilidadeEstimada] = useState('');
  const [formaContato, setFormaContato] = useState('');
  const [horarioPreferencial, setHorarioPreferencial] = useState('');

  // Buscar perfil existente do usuário
  const userProfile = mockProfiles.find(p => p.userId === user?.id);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      matricula: user?.matricula || '',
      cargo: userProfile?.cargo || [],
      unidade: userProfile?.unidade || [],
      email: userProfile?.email || '',
      telefone: userProfile?.telefone || '',
      biografia: userProfile?.biografia || '',
      areasConhecimento: userProfile?.areasConhecimento || [],
      especializacoes: userProfile?.especializacoes || '',
      temasInteresse: userProfile?.temasInteresse || [],
      habilidadesTecnicas: userProfile?.habilidadesTecnicas || [],
      habilidadesComportamentais: userProfile?.habilidadesComportamentais || [],
      idiomas: userProfile?.idiomas || [],
      linkCurriculo: userProfile?.linkCurriculo || '',
      aceiteTermos: userProfile?.aceiteTermos || false
    }
  });

  useEffect(() => {
    if (userProfile) {
      setProjetos(userProfile.projetos.map(p => ({
        nome: p.nome,
        dataInicio: p.dataInicio.toISOString().split('T')[0],
        dataFim: p.dataFim?.toISOString().split('T')[0],
        observacoes: p.observacoes
      })));
      setFormacoes(userProfile.formacaoAcademica);
      setTipoColaboracao(userProfile.disponibilidade.tipoColaboracao);
      setDisponibilidadeEstimada(userProfile.disponibilidade.disponibilidadeEstimada);
      setFormaContato(userProfile.contato.formaContato);
      setHorarioPreferencial(userProfile.contato.horarioPreferencial || '');
    }
  }, [userProfile]);

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Perfil atualizado com sucesso!');
      navigate('/');
    } catch (error) {
      toast.error('Erro ao salvar perfil');
    } finally {
      setIsLoading(false);
    }
  };

  const adicionarProjeto = () => {
    setProjetos([...projetos, { nome: '', dataInicio: '' }]);
  };

  const removerProjeto = (index: number) => {
    setProjetos(projetos.filter((_, i) => i !== index));
  };

  const adicionarFormacao = () => {
    setFormacoes([...formacoes, { nivel: '', instituicao: '', curso: '', ano: new Date().getFullYear() }]);
  };

  const removerFormacao = (index: number) => {
    setFormacoes(formacoes.filter((_, i) => i !== index));
  };

  if (!user) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Você precisa estar logado para acessar esta página.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {userProfile ? 'Editar Perfil' : 'Completar Cadastro'}
        </h1>
        <Button onClick={() => navigate('/')} variant="outline">
          Cancelar
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo *</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="matricula"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Matrícula *</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Institucional *</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="telefone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="biografia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biografia/Apresentação</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={4} placeholder="Fale um pouco sobre você..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Cargo e Unidade */}
          <Card>
            <CardHeader>
              <CardTitle>Cargo e Lotação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="cargo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cargos *</FormLabel>
                    <div className="space-y-2">
                      <Select onValueChange={(value) => {
                        if (value && !field.value.includes(value)) {
                          field.onChange([...field.value, value]);
                        }
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um cargo" />
                        </SelectTrigger>
                        <SelectContent>
                          {CARGOS.filter(cargo => cargo.trim() !== '').map(cargo => (
                            <SelectItem key={cargo} value={cargo}>{cargo}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex flex-wrap gap-2">
                        {field.value.map((cargo, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                            <span>{cargo}</span>
                            <X 
                              className="w-3 h-3 cursor-pointer" 
                              onClick={() => field.onChange(field.value.filter((_, i) => i !== index))}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unidades *</FormLabel>
                    <div className="space-y-2">
                      <Select onValueChange={(value) => {
                        if (value && !field.value.includes(value)) {
                          field.onChange([...field.value, value]);
                        }
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma unidade" />
                        </SelectTrigger>
                        <SelectContent>
                          {UNIDADES.filter(unidade => unidade.trim() !== '').map(unidade => (
                            <SelectItem key={unidade} value={unidade}>{unidade}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex flex-wrap gap-2">
                        {field.value.map((unidade, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                            <span>{unidade}</span>
                            <X 
                              className="w-3 h-3 cursor-pointer" 
                              onClick={() => field.onChange(field.value.filter((_, i) => i !== index))}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Conhecimentos */}
          <Card>
            <CardHeader>
              <CardTitle>Conhecimentos e Especialização</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="areasConhecimento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Áreas de Conhecimento *</FormLabel>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Jurídica</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {AREAS_JURIDICAS.filter(area => area.trim() !== '').map(area => (
                            <div key={area} className="flex items-center space-x-2">
                              <Checkbox
                                checked={field.value.includes(area)}
                                onCheckedChange={() => {
                                  if (field.value.includes(area)) {
                                    field.onChange(field.value.filter(a => a !== area));
                                  } else {
                                    field.onChange([...field.value, area]);
                                  }
                                }}
                              />
                              <span className="text-sm">{area}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Administrativa</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {AREAS_ADMINISTRATIVAS.filter(area => area.trim() !== '').map(area => (
                            <div key={area} className="flex items-center space-x-2">
                              <Checkbox
                                checked={field.value.includes(area)}
                                onCheckedChange={() => {
                                  if (field.value.includes(area)) {
                                    field.onChange(field.value.filter(a => a !== area));
                                  } else {
                                    field.onChange([...field.value, area]);
                                  }
                                }}
                              />
                              <span className="text-sm">{area}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="especializacoes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Especializações e Temas Específicos</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={3} placeholder="Descreva suas especializações..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Projetos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Projetos</span>
                <Button type="button" onClick={adicionarProjeto} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {projetos.map((projeto, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Projeto {index + 1}</h4>
                    <Button
                      type="button"
                      onClick={() => removerProjeto(index)}
                      size="sm"
                      variant="ghost"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Input
                      placeholder="Nome do projeto"
                      value={projeto.nome}
                      onChange={(e) => {
                        const novos = [...projetos];
                        novos[index].nome = e.target.value;
                        setProjetos(novos);
                      }}
                    />
                    <Input
                      type="date"
                      placeholder="Data início"
                      value={projeto.dataInicio}
                      onChange={(e) => {
                        const novos = [...projetos];
                        novos[index].dataInicio = e.target.value;
                        setProjetos(novos);
                      }}
                    />
                    <Input
                      type="date"
                      placeholder="Data fim (opcional)"
                      value={projeto.dataFim || ''}
                      onChange={(e) => {
                        const novos = [...projetos];
                        novos[index].dataFim = e.target.value;
                        setProjetos(novos);
                      }}
                    />
                  </div>
                  <Textarea
                    placeholder="Observações sobre o projeto"
                    value={projeto.observacoes || ''}
                    onChange={(e) => {
                      const novos = [...projetos];
                      novos[index].observacoes = e.target.value;
                      setProjetos(novos);
                    }}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Formação Acadêmica */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Formação Acadêmica</span>
                <Button type="button" onClick={adicionarFormacao} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formacoes.map((formacao, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Formação {index + 1}</h4>
                    <Button
                      type="button"
                      onClick={() => removerFormacao(index)}
                      size="sm"
                      variant="ghost"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <Select
                      value={formacao.nivel}
                      onValueChange={(value) => {
                        if (value) {
                          const novas = [...formacoes];
                          novas[index].nivel = value;
                          setFormacoes(novas);
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Nível" />
                      </SelectTrigger>
                      <SelectContent>
                        {NIVEIS_FORMACAO.filter(nivel => nivel.trim() !== '').map(nivel => (
                          <SelectItem key={nivel} value={nivel}>{nivel}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Instituição"
                      value={formacao.instituicao}
                      onChange={(e) => {
                        const novas = [...formacoes];
                        novas[index].instituicao = e.target.value;
                        setFormacoes(novas);
                      }}
                    />
                    <Input
                      placeholder="Curso"
                      value={formacao.curso}
                      onChange={(e) => {
                        const novas = [...formacoes];
                        novas[index].curso = e.target.value;
                        setFormacoes(novas);
                      }}
                    />
                    <Input
                      type="number"
                      placeholder="Ano"
                      value={formacao.ano}
                      onChange={(e) => {
                        const novas = [...formacoes];
                        novas[index].ano = parseInt(e.target.value);
                        setFormacoes(novas);
                      }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Habilidades */}
          <Card>
            <CardHeader>
              <CardTitle>Habilidades</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="habilidadesTecnicas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Habilidades Técnicas</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {HABILIDADES_TECNICAS.filter(habilidade => habilidade.trim() !== '').map(habilidade => (
                        <div key={habilidade} className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value.includes(habilidade)}
                            onCheckedChange={() => {
                              if (field.value.includes(habilidade)) {
                                field.onChange(field.value.filter(h => h !== habilidade));
                              } else {
                                field.onChange([...field.value, habilidade]);
                              }
                            }}
                          />
                          <span className="text-sm">{habilidade}</span>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="habilidadesComportamentais"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Habilidades Comportamentais</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {HABILIDADES_COMPORTAMENTAIS.filter(habilidade => habilidade.trim() !== '').map(habilidade => (
                        <div key={habilidade} className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value.includes(habilidade)}
                            onCheckedChange={() => {
                              if (field.value.includes(habilidade)) {
                                field.onChange(field.value.filter(h => h !== habilidade));
                              } else {
                                field.onChange([...field.value, habilidade]);
                              }
                            }}
                          />
                          <span className="text-sm">{habilidade}</span>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="idiomas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Idiomas</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {IDIOMAS.filter(idioma => idioma.trim() !== '').map(idioma => (
                        <div key={idioma} className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value.includes(idioma)}
                            onCheckedChange={() => {
                              if (field.value.includes(idioma)) {
                                field.onChange(field.value.filter(i => i !== idioma));
                              } else {
                                field.onChange([...field.value, idioma]);
                              }
                            }}
                          />
                          <span className="text-sm">{idioma}</span>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Disponibilidade */}
          <Card>
            <CardHeader>
              <CardTitle>Disponibilidade para Colaboração</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-900">Tipo de Colaboração</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {TIPOS_COLABORACAO.filter(tipo => tipo.trim() !== '').map(tipo => (
                    <div key={tipo} className="flex items-center space-x-2">
                      <Checkbox
                        checked={tipoColaboracao.includes(tipo)}
                        onCheckedChange={() => {
                          if (tipoColaboracao.includes(tipo)) {
                            setTipoColaboracao(tipoColaboracao.filter(t => t !== tipo));
                          } else {
                            setTipoColaboracao([...tipoColaboracao, tipo]);
                          }
                        }}
                      />
                      <span className="text-sm">{tipo}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900">Disponibilidade Estimada</label>
                <Select value={disponibilidadeEstimada} onValueChange={setDisponibilidadeEstimada}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Selecione sua disponibilidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {DISPONIBILIDADE_ESTIMADA.filter(disp => disp.trim() !== '').map(disponibilidade => (
                      <SelectItem key={disponibilidade} value={disponibilidade}>{disponibilidade}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Preferências de Contato */}
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-900">Forma Preferencial de Contato</label>
                <Select value={formaContato} onValueChange={setFormaContato}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Selecione a forma de contato" />
                  </SelectTrigger>
                  <SelectContent>
                    {FORMAS_CONTATO.filter(forma => forma.trim() !== '').map(forma => (
                      <SelectItem key={forma} value={forma}>{forma}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900">Horário Preferencial</label>
                <Input
                  className="mt-2"
                  placeholder="Ex: manhã, tarde, 14h às 16h"
                  value={horarioPreferencial}
                  onChange={(e) => setHorarioPreferencial(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Currículo e Termos */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Adicionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="linkCurriculo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link do Currículo (Lattes/LinkedIn)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="aceiteTermos"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Declaro que as informações prestadas neste formulário são verdadeiras, 
                        atualizadas e de minha responsabilidade. Comprometo-me a atualizá-las 
                        sempre que houver mudanças relevantes. *
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Botões */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => navigate('/')}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-amber-900 hover:bg-amber-800">
              {isLoading ? (
                'Salvando...'
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Perfil
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileEdit;
