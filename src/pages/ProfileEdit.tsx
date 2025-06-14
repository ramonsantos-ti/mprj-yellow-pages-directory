import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '../types';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import BasicInfo from '../components/profile/BasicInfo';
import CargoUnidade from '../components/profile/CargoUnidade';
import AdditionalInfo from '../components/profile/AdditionalInfo';
import AcademicFormation from '../components/profile/AcademicFormation';
import ProjectsManager from '../components/profile/ProjectsManager';
import CertificationsSection from '../components/profile/CertificationsSection';
import PublicationsSection from '../components/profile/PublicationsSection';
import AvailabilitySection from '../components/profile/AvailabilitySection';
import ContactPreferences from '../components/profile/ContactPreferences';
import PhotoUpload from '../components/profile/PhotoUpload';

const ProfileEdit: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);

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
  const [areasConhecimento, setAreasConhecimento] = useState<string[]>([]);
  const [especializacoes, setEspecializacoes] = useState('');
  const [temasInteresse, setTemasInteresse] = useState<string[]>([]);
  const [idiomas, setIdiomas] = useState<string[]>([]);
  const [linkCurriculo, setLinkCurriculo] = useState('');
  const [formacaoAcademica, setFormacaoAcademica] = useState<any[]>([]);
  const [projetos, setProjetos] = useState<any[]>([]);
  const [certificacoes, setCertificacoes] = useState<string[]>([]);
  const [publicacoes, setPublicacoes] = useState('');
  const [disponibilidade, setDisponibilidade] = useState<any>({});
  const [aceiteTermos, setAceiteTermos] = useState(false);

  useEffect(() => {
    if (user) {
      loadUserProfile();
    }
  }, [user]);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select(`
          *,
          projects(*),
          academic_formations(*),
          professional_experiences(*),
          availability(*)
        `)
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (profile) {
        setUserProfile(profile);
        populateFormWithProfile(profile);
      } else {
        // New profile - set defaults
        setName(user?.email || '');
        setEmail(user?.email || '');
        setMatricula('');
      }
    } catch (err: any) {
      console.error('Error loading profile:', err);
      setError('Erro ao carregar perfil: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const populateFormWithProfile = (profile: any) => {
    setFotoPreview(profile.foto_url || '');
    setName(profile.name || '');
    setMatricula(profile.matricula || '');
    setEmail(profile.email || '');
    setTelefone(profile.telefone || '');
    setBiografia(profile.biografia || '');
    setCargo(profile.cargo || []);
    setFuncao(profile.funcao || []);
    setUnidade(profile.unidade || []);
    setAreasConhecimento(profile.areas_conhecimento || []);
    setEspecializacoes(profile.especializacoes || '');
    setTemasInteresse(profile.temas_interesse || []);
    setIdiomas(profile.idiomas || []);
    setLinkCurriculo(profile.link_curriculo || '');
    setCertificacoes(profile.certificacoes || []);
    setPublicacoes(profile.publicacoes || '');
    setAceiteTermos(profile.aceite_termos || false);

    // Set related data
    setFormacaoAcademica(profile.academic_formations || []);
    setProjetos(profile.projects || []);
    
    if (profile.availability && profile.availability.length > 0) {
      const avail = profile.availability[0];
      setDisponibilidade({
        tipoColaboracao: avail.tipo_colaboracao || [],
        disponibilidadeEstimada: avail.disponibilidade_estimada || '',
        formaContato: avail.forma_contato || 'email',
        horarioPreferencial: avail.horario_preferencial || ''
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccessMessage(null);

      const profileData = {
        user_id: user?.id,
        name,
        matricula,
        email,
        telefone,
        biografia,
        cargo,
        funcao,
        unidade,
        areas_conhecimento: areasConhecimento,
        especializacoes,
        temas_interesse: temasInteresse,
        idiomas,
        link_curriculo: linkCurriculo,
        foto_url: fotoPreview,
        certificacoes,
        publicacoes,
        aceite_termos: aceiteTermos,
        updated_at: new Date().toISOString()
      };

      let profileId = userProfile?.id;

      if (userProfile) {
        // Update existing profile
        const { error } = await supabase
          .from('profiles')
          .update(profileData)
          .eq('id', userProfile.id);

        if (error) throw error;
      } else {
        // Create new profile
        const { data, error } = await supabase
          .from('profiles')
          .insert(profileData)
          .select()
          .single();

        if (error) throw error;
        profileId = data.id;
        setUserProfile(data);
      }

      // Save academic formations
      if (profileId) {
        // Delete existing formations
        await supabase
          .from('academic_formations')
          .delete()
          .eq('profile_id', profileId);

        // Insert new formations
        if (formacaoAcademica.length > 0) {
          const formations = formacaoAcademica.map(f => ({
            profile_id: profileId,
            nivel: f.nivel,
            instituicao: f.instituicao,
            curso: f.curso,
            ano: f.ano
          }));

          await supabase
            .from('academic_formations')
            .insert(formations);
        }

        // Save projects
        await supabase
          .from('projects')
          .delete()
          .eq('profile_id', profileId);

        if (projetos.length > 0) {
          const projects = projetos.map(p => ({
            profile_id: profileId,
            nome: p.nome,
            data_inicio: p.dataInicio,
            data_fim: p.dataFim,
            observacoes: p.observacoes
          }));

          await supabase
            .from('projects')
            .insert(projects);
        }

        // Save availability
        await supabase
          .from('availability')
          .delete()
          .eq('profile_id', profileId);

        if (disponibilidade.tipoColaboracao?.length > 0) {
          await supabase
            .from('availability')
            .insert({
              profile_id: profileId,
              tipo_colaboracao: disponibilidade.tipoColaboracao,
              disponibilidade_estimada: disponibilidade.disponibilidadeEstimada,
              forma_contato: disponibilidade.formaContato,
              horario_preferencial: disponibilidade.horarioPreferencial
            });
        }
      }

      setSuccessMessage('Perfil salvo com sucesso!');
      setTimeout(() => setSuccessMessage(null), 3000);
      
      // Reload profile data
      await loadUserProfile();
      
    } catch (err: any) {
      console.error('Error saving profile:', err);
      setError('Erro ao salvar perfil: ' + err.message);
    } finally {
      setSaving(false);
    }
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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          {userProfile ? 'Editar Perfil' : 'Criar Perfil'}
        </h1>
        <p className="text-lg text-gray-600">
          Complete suas informações para aparecer nas buscas públicas
        </p>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-red-800">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {successMessage && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-green-800">
              <CheckCircle2 className="w-5 h-5" />
              <span>{successMessage}</span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Foto do Perfil</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-6">
              <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                {fotoPreview ? (
                  <img src={fotoPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <div className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Sem foto</p>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="cursor-pointer"
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

        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Seu nome completo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Matrícula</label>
                <input
                  type="text"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Sua matrícula"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="seu.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <input
                  type="tel"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="(21) 99999-9999"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Biografia</label>
                <textarea
                  value={biografia}
                  onChange={(e) => setBiografia(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Conte um pouco sobre sua trajetória profissional..."
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cargo e Unidade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                <select
                  multiple
                  value={cargo}
                  onChange={(e) => {
                    const options = Array.from(e.target.selectedOptions, option => option.value);
                    setCargo(options);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Promotor de Justiça">Promotor de Justiça</option>
                  <option value="Procurador de Justiça">Procurador de Justiça</option>
                  <option value="Analista">Analista</option>
                  <option value="Técnico">Técnico</option>
                  <option value="Assessor">Assessor</option>
                  <option value="Estagiário">Estagiário</option>
                  <option value="Residente">Residente</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Segure Ctrl para selecionar múltiplos</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Função</label>
                <select
                  multiple
                  value={funcao}
                  onChange={(e) => {
                    const options = Array.from(e.target.selectedOptions, option => option.value);
                    setFuncao(options);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Coordenador">Coordenador</option>
                  <option value="Gerente">Gerente</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Chefe de Gabinete">Chefe de Gabinete</option>
                  <option value="Assessor Jurídico">Assessor Jurídico</option>
                  <option value="Assessor Técnico">Assessor Técnico</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Segure Ctrl para selecionar múltiplos</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unidade</label>
                <select
                  multiple
                  value={unidade}
                  onChange={(e) => {
                    const options = Array.from(e.target.selectedOptions, option => option.value);
                    setUnidade(options);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="GATE">GATE</option>
                  <option value="STI">STI</option>
                  <option value="SGDP">SGDP</option>
                  <option value="CSMP">CSMP</option>
                  <option value="CRAAI">CRAAI</option>
                  <option value="Promotoria">Promotoria</option>
                  <option value="Procuradoria">Procuradoria</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Segure Ctrl para selecionar múltiplos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informações Adicionais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Áreas de Conhecimento</label>
                <select
                  multiple
                  value={areasConhecimento}
                  onChange={(e) => {
                    const options = Array.from(e.target.selectedOptions, option => option.value);
                    setAreasConhecimento(options);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Direito Penal">Direito Penal</option>
                  <option value="Direito Civil">Direito Civil</option>
                  <option value="Direito Administrativo">Direito Administrativo</option>
                  <option value="Direito Ambiental">Direito Ambiental</option>
                  <option value="Direito Constitucional">Direito Constitucional</option>
                  <option value="Direito do Consumidor">Direito do Consumidor</option>
                  <option value="Direito Eleitoral">Direito Eleitoral</option>
                  <option value="Tecnologia da Informação">Tecnologia da Informação</option>
                  <option value="Ciência de Dados">Ciência de Dados</option>
                  <option value="Inteligência Artificial">Inteligência Artificial</option>
                  <option value="Engenharia">Engenharia</option>
                  <option value="Contabilidade">Contabilidade</option>
                  <option value="Medicina">Medicina</option>
                  <option value="Psicologia">Psicologia</option>
                  <option value="Serviço Social">Serviço Social</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Segure Ctrl para selecionar múltiplos</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Especializações</label>
                <textarea
                  value={especializacoes}
                  onChange={(e) => setEspecializacoes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Descreva suas especializações..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Temas de Interesse</label>
                <select
                  multiple
                  value={temasInteresse}
                  onChange={(e) => {
                    const options = Array.from(e.target.selectedOptions, option => option.value);
                    setTemasInteresse(options);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Combate à Corrupção">Combate à Corrupção</option>
                  <option value="Proteção Ambiental">Proteção Ambiental</option>
                  <option value="Direitos Humanos">Direitos Humanos</option>
                  <option value="Segurança Pública">Segurança Pública</option>
                  <option value="Saúde Pública">Saúde Pública</option>
                  <option value="Educação">Educação</option>
                  <option value="Transformação Digital">Transformação Digital</option>
                  <option value="Inovação">Inovação</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Segure Ctrl para selecionar múltiplos</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Idiomas</label>
                <select
                  multiple
                  value={idiomas}
                  onChange={(e) => {
                    const options = Array.from(e.target.selectedOptions, option => option.value);
                    setIdiomas(options);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Português">Português</option>
                  <option value="Inglês">Inglês</option>
                  <option value="Espanhol">Espanhol</option>
                  <option value="Francês">Francês</option>
                  <option value="Alemão">Alemão</option>
                  <option value="Italiano">Italiano</option>
                  <option value="Japonês">Japonês</option>
                  <option value="Mandarim">Mandarim</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Segure Ctrl para selecionar múltiplos</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link do Currículo (Lattes/LinkedIn)</label>
                <input
                  type="url"
                  value={linkCurriculo}
                  onChange={(e) => setLinkCurriculo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="https://..."
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Formação Acadêmica</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formacaoAcademica.map((formacao, index) => (
                <div key={index} className="p-4 border rounded-md">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">{formacao.nivel}</h4>
                    <button
                      type="button"
                      onClick={() => {
                        setFormacaoAcademica(prev => prev.filter((_, i) => i !== index));
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remover
                    </button>
                  </div>
                  <p>{formacao.curso} - {formacao.instituicao}, {formacao.ano}</p>
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => {
                  setFormacaoAcademica(prev => [...prev, {
                    nivel: '',
                    instituicao: '',
                    curso: '',
                    ano: new Date().getFullYear()
                  }]);
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                + Adicionar Formação
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Projetos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projetos.map((projeto, index) => (
                <div key={index} className="p-4 border rounded-md">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">{projeto.nome}</h4>
                    <button
                      type="button"
                      onClick={() => {
                        setProjetos(prev => prev.filter((_, i) => i !== index));
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remover
                    </button>
                  </div>
                  <p>Período: {new Date(projeto.dataInicio).toLocaleDateString()} - 
                    {projeto.dataFim ? new Date(projeto.dataFim).toLocaleDateString() : 'Atual'}</p>
                  {projeto.observacoes && <p className="text-sm text-gray-600">{projeto.observacoes}</p>}
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => {
                  setProjetos(prev => [...prev, {
                    nome: '',
                    dataInicio: new Date(),
                    dataFim: null,
                    observacoes: ''
                  }]);
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                + Adicionar Projeto
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Certificações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {certificacoes.map((cert, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <span>{cert}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setCertificacoes(prev => prev.filter((_, i) => i !== index));
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remover
                  </button>
                </div>
              ))}
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Adicionar certificação..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      setCertificacoes(prev => [...prev, e.currentTarget.value.trim()]);
                      e.currentTarget.value = '';
                      e.preventDefault();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    const input = e.currentTarget.previousSibling as HTMLInputElement;
                    if (input.value.trim()) {
                      setCertificacoes(prev => [...prev, input.value.trim()]);
                      input.value = '';
                    }
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Publicações</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Publicações e Trabalhos de Destaque</label>
              <textarea
                value={publicacoes}
                onChange={(e) => setPublicacoes(e.target.value)}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Liste suas publicações, cursos ministrados, trabalhos de destaque, etc..."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Disponibilidade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipos de Colaboração</label>
                <select
                  multiple
                  value={disponibilidade.tipoColaboracao || []}
                  onChange={(e) => {
                    const options = Array.from(e.target.selectedOptions, option => option.value);
                    setDisponibilidade(prev => ({
                      ...prev,
                      tipoColaboracao: options
                    }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="consultoria">Consultoria</option>
                  <option value="parecer">Parecer</option>
                  <option value="capacitacao">Capacitação</option>
                  <option value="projeto">Projeto</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Segure Ctrl para selecionar múltiplos</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Disponibilidade Estimada</label>
                <select
                  value={disponibilidade.disponibilidadeEstimada || ''}
                  onChange={(e) => {
                    setDisponibilidade(prev => ({
                      ...prev,
                      disponibilidadeEstimada: e.target.value
                    }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Selecione...</option>
                  <option value="Até 2 horas semanais">Até 2 horas semanais</option>
                  <option value="2 a 4 horas semanais">2 a 4 horas semanais</option>
                  <option value="4 a 8 horas semanais">4 a 8 horas semanais</option>
                  <option value="Mais de 8 horas semanais">Mais de 8 horas semanais</option>
                  <option value="Sob demanda">Sob demanda</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferências de Contato</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Forma de Contato Preferencial</label>
                <select
                  value={disponibilidade.formaContato || 'email'}
                  onChange={(e) => {
                    setDisponibilidade(prev => ({
                      ...prev,
                      formaContato: e.target.value
                    }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="email">Email</option>
                  <option value="telefone">Telefone</option>
                  <option value="teams">Microsoft Teams</option>
                  <option value="presencial">Presencial</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Horário Preferencial</label>
                <input
                  type="text"
                  value={disponibilidade.horarioPreferencial || ''}
                  onChange={(e) => {
                    setDisponibilidade(prev => ({
                      ...prev,
                      horarioPreferencial: e.target.value
                    }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Ex: Manhãs, Tardes, Após às 14h, etc."
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                id="aceite-termos"
                checked={aceiteTermos}
                onChange={(e) => setAceiteTermos(e.target.checked)}
                className="rounded border-gray-300"
              />
              <label htmlFor="aceite-termos" className="text-sm text-gray-700">
                Aceito que meu perfil seja exibido publicamente no sistema de busca
              </label>
            </div>
            
            <div className="flex space-x-4">
              <Button
                onClick={handleSave}
                disabled={saving || !aceiteTermos}
                className="flex-1"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  'Salvar Perfil'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileEdit;
