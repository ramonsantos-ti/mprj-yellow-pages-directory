import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Profile } from '../types';
import { mockProfiles } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Checkbox } from '../components/ui/checkbox';
import { useToast } from '../hooks/use-toast';
import { Plus, X } from 'lucide-react';
import { 
  CARGOS, 
  FUNCOES, 
  UNIDADES, 
  CERTIFICACOES,
  NIVEIS_FORMACAO,
  TIPOS_COLABORACAO,
  DISPONIBILIDADE_ESTIMADA,
  FORMAS_CONTATO
} from '../data/constants';

const ProfileEdit: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdminAlert, setShowAdminAlert] = useState(false);

  // Form state
  const [fotoPreview, setFotoPreview] = useState('');
  const [name, setName] = useState('');
  const [matricula, setMatricula] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [biografia, setBiografia] = useState('');
  const [cargo, setCargo] = useState<string[]>([]);
  const [funcao, setFuncao] = useState<string[]>([]);
  const [unidade, setUnidade] = useState<string[]>([]);
  const [formacoes, setFormacoes] = useState([]);
  const [linkCurriculo, setLinkCurriculo] = useState('');
  const [aceiteTermos, setAceiteTermos] = useState(false);
  const [projetos, setProjetos] = useState([]);
  const [certificacoes, setCertificacoes] = useState<string[]>([]);
  const [publicacoes, setPublicacoes] = useState('');
  const [tipoColaboracao, setTipoColaboracao] = useState<string[]>([]);
  const [disponibilidadeEstimada, setDisponibilidadeEstimada] = useState('');
  const [formaContato, setFormaContato] = useState('');
  const [horarioPreferencial, setHorarioPreferencial] = useState('');

  // Safe arrays
  const safeCargos = Array.isArray(CARGOS) ? CARGOS : [];
  const safeFuncoes = Array.isArray(FUNCOES) ? FUNCOES : [];
  const safeUnidades = Array.isArray(UNIDADES) ? UNIDADES : [];
  const safeCertificacoes = Array.isArray(CERTIFICACOES) ? CERTIFICACOES : [];
  const safeNiveisFormacao = Array.isArray(NIVEIS_FORMACAO) ? NIVEIS_FORMACAO : [];
  const safeTiposColaboracao = Array.isArray(TIPOS_COLABORACAO) ? TIPOS_COLABORACAO : [];
  const safeDisponibilidadeEstimada = Array.isArray(DISPONIBILIDADE_ESTIMADA) ? DISPONIBILIDADE_ESTIMADA : [];
  const safeFormasContato = Array.isArray(FORMAS_CONTATO) ? FORMAS_CONTATO : [];

  const isValidSelectValue = (value: any): value is string => {
    return typeof value === 'string' && value.trim() !== '';
  };

  // Load profiles from localStorage or use mock data
  useEffect(() => {
    const loadProfiles = () => {
      const savedProfiles = localStorage.getItem('mprj_profiles');
      if (savedProfiles) {
        const parsedProfiles = JSON.parse(savedProfiles);
        console.log('ProfileEdit: Loaded profiles from localStorage:', parsedProfiles.length);
        setProfiles(parsedProfiles);
        
        // Find the current user's profile
        if (user) {
          const userProfile = parsedProfiles.find((p: Profile) => p.userId === user.id);
          setProfile(userProfile || null);
          
          // Show admin alert if profile was updated by admin
          if (userProfile?.updatedByAdmin) {
            setShowAdminAlert(true);
          }
          
          // Only populate form if it's the initial load (when form fields are empty)
          if (userProfile && !name && !email) {
            populateFormFromProfile(userProfile);
          } else if (!userProfile && !name && !email) {
            // Set default values for new profile
            setName(user.name);
            setMatricula(user.matricula);
            setEmail(user.username);
          }
        }
      } else {
        console.log('ProfileEdit: Using mock profiles');
        setProfiles(mockProfiles);
        
        // Find the current user's profile from mock data
        if (user) {
          const userProfile = mockProfiles.find(p => p.userId === user.id);
          setProfile(userProfile || null);
          
          // Show admin alert if profile was updated by admin
          if (userProfile?.updatedByAdmin) {
            setShowAdminAlert(true);
          }
          
          if (userProfile && !name && !email) {
            populateFormFromProfile(userProfile);
          } else if (!userProfile && !name && !email) {
            // Set default values for new profile
            setName(user.name);
            setMatricula(user.matricula);
            setEmail(user.username);
          }
        }
      }
      setIsLoading(false);
    };

    const populateFormFromProfile = (userProfile: Profile) => {
      setFotoPreview(userProfile.fotoUrl || '');
      setName(userProfile.name || user?.name || '');
      setMatricula(userProfile.matricula || user?.matricula || '');
      setEmail(userProfile.email || user?.username || '');
      setTelefone(userProfile.telefone || '');
      setBiografia(userProfile.biografia || '');
      setCargo(Array.isArray(userProfile.cargo) ? userProfile.cargo : []);
      setFuncao(Array.isArray(userProfile.funcao) ? userProfile.funcao : []);
      setUnidade(Array.isArray(userProfile.unidade) ? userProfile.unidade : []);
      setFormacoes(Array.isArray(userProfile.formacaoAcademica) ? userProfile.formacaoAcademica : []);
      setLinkCurriculo(userProfile.linkCurriculo || '');
      setAceiteTermos(userProfile.aceiteTermos || false);
      setProjetos(Array.isArray(userProfile.projetos) ? userProfile.projetos : []);
      setCertificacoes(Array.isArray(userProfile.certificacoes) ? userProfile.certificacoes : []);
      setPublicacoes(userProfile.publicacoes || '');
      setTipoColaboracao(Array.isArray(userProfile.disponibilidade?.tipoColaboracao) ? userProfile.disponibilidade.tipoColaboracao : []);
      setDisponibilidadeEstimada(userProfile.disponibilidade?.disponibilidadeEstimada || '');
      setFormaContato(userProfile.contato?.formaContato || '');
      setHorarioPreferencial(userProfile.contato?.horarioPreferencial || '');
    };

    loadProfiles();

    // Listen for localStorage changes (when admin makes changes) - but don't poll continuously
    const handleStorageChange = () => {
      console.log('ProfileEdit: Storage changed, reloading profiles');
      loadProfiles();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [user]);

  if (!user) {
    navigate('/login');
    return null;
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Carregando perfil...</h2>
      </div>
    );
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFotoPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    try {
      const updatedProfileData = {
        name,
        matricula,
        email,
        telefone,
        biografia,
        cargo,
        funcao,
        unidade,
        formacaoAcademica: formacoes,
        linkCurriculo,
        aceiteTermos,
        projetos,
        certificacoes,
        publicacoes,
        fotoUrl: fotoPreview,
        disponibilidade: {
          tipoColaboracao,
          disponibilidadeEstimada
        },
        contato: {
          formaContato,
          horarioPreferencial
        }
      };

      let updatedProfiles: Profile[];
      
      if (profile) {
        // Update existing profile and clear updatedByAdmin flag
        updatedProfiles = profiles.map(p => 
          p.id === profile.id 
            ? { 
                ...p, 
                ...updatedProfileData, 
                lastUpdated: new Date(),
                updatedByAdmin: false // Clear the admin flag when user updates
              } 
            : p
        );
      } else {
        // Create new profile
        const newProfile: Profile = {
          id: Date.now().toString(),
          userId: user.id,
          lastUpdated: new Date(),
          isActive: true,
          updatedByAdmin: false,
          // Default values
          areasConhecimento: [],
          temasInteresse: [],
          experienciasProfissionais: [],
          idiomas: [],
          ...updatedProfileData
        };
        
        updatedProfiles = [...profiles, newProfile];
      }
      
      // Save to localStorage
      localStorage.setItem('mprj_profiles', JSON.stringify(updatedProfiles));
      console.log('ProfileEdit: Profile saved to localStorage');
      
      // Update local state
      setProfiles(updatedProfiles);
      
      // Hide the admin alert after successful save
      setShowAdminAlert(false);
      
      // Manually trigger storage event for same-tab updates
      window.dispatchEvent(new Event('storage'));
      
      toast({
        title: "Perfil salvo com sucesso!",
        description: "Suas informações foram atualizadas.",
      });
      
      navigate('/');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Erro ao salvar perfil",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          {profile ? 'Editar Perfil' : 'Criar Perfil'}
        </h1>
        <p className="text-lg text-gray-600">
          {profile ? 'Atualize suas informações profissionais' : 'Complete seu perfil para aparecer nas buscas'}
        </p>
        {showAdminAlert && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-orange-800 text-sm font-medium">
              ⚠️ Este perfil foi alterado pelo administrador. Suas próximas alterações irão sobrescrever as modificações administrativas.
            </p>
          </div>
        )}
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        {/* Photo Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Foto do Perfil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-6">
              <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                {fotoPreview ? (
                  <img src={fotoPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <span className="text-gray-400">Sem foto</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => document.getElementById('foto-upload')?.click()}
                >
                  Fazer Upload de Foto
                </Button>
                <input
                  id="foto-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <p className="text-sm text-gray-500">
                  Formatos aceitos: JPG, PNG, GIF. Máximo 5MB.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="matricula">Matrícula</Label>
                <Input
                  id="matricula"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  placeholder="Sua matrícula"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@mprj.mp.br"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(21) 99999-9999"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="biografia">Biografia</Label>
              <Textarea
                id="biografia"
                value={biografia}
                onChange={(e) => setBiografia(e.target.value)}
                placeholder="Conte um pouco sobre você, sua experiência e áreas de interesse..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="curriculo">Link do Currículo</Label>
              <Input
                id="curriculo"
                value={linkCurriculo}
                onChange={(e) => setLinkCurriculo(e.target.value)}
                placeholder="https://..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Cargo, Função e Unidade */}
        <Card>
          <CardHeader>
            <CardTitle>Cargo, Função e Lotação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Cargos</Label>
              <div className="space-y-2">
                <Select onValueChange={(value) => {
                  if (isValidSelectValue(value) && !cargo.includes(value)) {
                    setCargo([...cargo, value]);
                  }
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um cargo" />
                  </SelectTrigger>
                  <SelectContent>
                    {safeCargos.map((cargoItem, index) => (
                      <SelectItem key={`cargo-${index}-${cargoItem}`} value={cargoItem}>
                        {cargoItem}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2">
                  {cargo.map((cargoItem, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>{cargoItem}</span>
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => setCargo(cargo.filter((_, i) => i !== index))}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Label>Função</Label>
              <div className="space-y-2">
                <Select onValueChange={(value) => {
                  if (isValidSelectValue(value) && !funcao.includes(value)) {
                    setFuncao([...funcao, value]);
                  }
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma função (opcional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {safeFuncoes.map((funcaoItem, index) => (
                      <SelectItem key={`funcao-${index}-${funcaoItem}`} value={funcaoItem}>
                        {funcaoItem}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2">
                  {funcao.map((funcaoItem, index) => (
                    <Badge key={index} variant="outline" className="flex items-center space-x-1">
                      <span>{funcaoItem}</span>
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => setFuncao(funcao.filter((_, i) => i !== index))}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Label>Unidades</Label>
              <div className="space-y-2">
                <Select onValueChange={(value) => {
                  if (isValidSelectValue(value) && !unidade.includes(value)) {
                    setUnidade([...unidade, value]);
                  }
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma unidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {safeUnidades.map((unidadeItem, index) => (
                      <SelectItem key={`unidade-${index}-${unidadeItem}`} value={unidadeItem}>
                        {unidadeItem}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2">
                  {unidade.map((unidadeItem, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>{unidadeItem}</span>
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => setUnidade(unidade.filter((_, i) => i !== index))}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formação Acadêmica */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Formação Acadêmica</span>
              <Button type="button" onClick={() => {
                setFormacoes([...formacoes, { nivel: '', instituicao: '', curso: '', ano: new Date().getFullYear() }]);
              }} size="sm" variant="outline">
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
                    onClick={() => setFormacoes(formacoes.filter((_, i) => i !== index))}
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
                      if (isValidSelectValue(value)) {
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
                      {safeNiveisFormacao.map((nivel, nivelIndex) => (
                        <SelectItem key={`nivel-${nivelIndex}-${nivel}`} value={nivel}>
                          {nivel}
                        </SelectItem>
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

        {/* Projetos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Projetos</span>
              <Button type="button" onClick={() => {
                setProjetos([...projetos, { nome: '', dataInicio: '' }]);
              }} size="sm" variant="outline">
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
                    onClick={() => setProjetos(projetos.filter((_, i) => i !== index))}
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

        {/* Certificações */}
        <Card>
          <CardHeader>
            <CardTitle>Certificações Relevantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label>Certificações (PMP, ITIL, ISO, etc.)</Label>
              <div className="space-y-2">
                <Select onValueChange={(value) => {
                  if (isValidSelectValue(value) && !certificacoes.includes(value)) {
                    setCertificacoes([...certificacoes, value]);
                  }
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma certificação" />
                  </SelectTrigger>
                  <SelectContent>
                    {safeCertificacoes.map((cert, index) => (
                      <SelectItem key={`cert-${index}-${cert}`} value={cert}>
                        {cert}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2">
                  {certificacoes.map((cert, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>{cert}</span>
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => setCertificacoes(certificacoes.filter((_, i) => i !== index))}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Publicações */}
        <Card>
          <CardHeader>
            <CardTitle>Publicações, Cursos Ministrados e Trabalhos de Destaque</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label>Publicações e Trabalhos de Destaque</Label>
              <Textarea 
                value={publicacoes}
                onChange={(e) => setPublicacoes(e.target.value)}
                rows={5} 
                placeholder="Liste suas publicações, cursos ministrados, trabalhos de destaque, etc..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Disponibilidade */}
        <Card>
          <CardHeader>
            <CardTitle>Disponibilidade para Colaboração</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Tipo de Colaboração</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {safeTiposColaboracao.map(tipo => (
                  <div key={tipo} className="flex items-center space-x-2">
                    <Checkbox
                      checked={tipoColaboracao.includes(tipo)}
                      onCheckedChange={(checked) => {
                        if (checked === true) {
                          setTipoColaboracao([...tipoColaboracao, tipo]);
                        } else {
                          setTipoColaboracao(tipoColaboracao.filter(t => t !== tipo));
                        }
                      }}
                    />
                    <span className="text-sm">{tipo}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Disponibilidade Estimada</Label>
              <Select value={disponibilidadeEstimada} onValueChange={(value) => {
                if (isValidSelectValue(value)) {
                  setDisponibilidadeEstimada(value);
                }
              }}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecione sua disponibilidade" />
                </SelectTrigger>
                <SelectContent>
                  {safeDisponibilidadeEstimada.map((disponibilidade, dispIndex) => (
                    <SelectItem key={`disp-${dispIndex}-${disponibilidade}`} value={disponibilidade}>
                      {disponibilidade}
                    </SelectItem>
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
              <Label>Forma Preferencial de Contato</Label>
              <Select value={formaContato} onValueChange={(value) => {
                if (isValidSelectValue(value)) {
                  setFormaContato(value);
                }
              }}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecione a forma de contato" />
                </SelectTrigger>
                <SelectContent>
                  {safeFormasContato.map((forma, formaIndex) => (
                    <SelectItem key={`forma-${formaIndex}-${forma}`} value={forma}>
                      {forma}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Horário Preferencial</Label>
              <Input
                className="mt-2"
                placeholder="Ex: manhã, tarde, 14h às 16h"
                value={horarioPreferencial}
                onChange={(e) => setHorarioPreferencial(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Aceite de Termos */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Adicionais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                checked={aceiteTermos}
                onCheckedChange={(checked) => {
                  setAceiteTermos(checked === true);
                }}
              />
              <div className="space-y-1 leading-none">
                <Label>
                  Declaro que as informações prestadas neste formulário são verdadeiras, 
                  atualizadas e de minha responsabilidade. Comprometo-me a atualizá-las 
                  sempre que houver mudanças relevantes. *
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <Button 
            type="button"
            onClick={handleSubmit}
            size="lg"
            className="bg-red-900 hover:bg-red-800 text-white px-8"
          >
            {profile ? 'Atualizar Perfil' : 'Criar Perfil'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
