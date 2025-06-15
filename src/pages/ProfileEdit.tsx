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
        // Transform Supabase data to Profile interface
        const transformedProfile: Profile = {
          id: profile.id,
          userId: profile.user_id || '',
          name: profile.name,
          matricula: profile.matricula,
          cargo: profile.cargo || [],
          funcao: profile.funcao || [],
          unidade: profile.unidade || [],
          telefone: profile.telefone || '',
          email: profile.email,
          biografia: profile.biografia || '',
          areasConhecimento: profile.areas_conhecimento || [],
          especializacoes: profile.especializacoes || '',
          temasInteresse: profile.temas_interesse || [],
          idiomas: profile.idiomas || [],
          linkCurriculo: profile.link_curriculo || '',
          fotoUrl: profile.foto_url || '',
          certificacoes: profile.certificacoes || [],
          publicacoes: profile.publicacoes || '',
          role: profile.role as 'admin' | 'user',
          isActive: profile.is_active ?? true,
          aceiteTermos: profile.aceite_termos ?? false,
          updatedByAdmin: profile.updated_by_admin ?? false,
          lastUpdated: new Date(profile.updated_at || profile.created_at || new Date()),
          projetos: profile.projects?.map((p: any) => ({
            id: p.id,
            nome: p.nome,
            dataInicio: new Date(p.data_inicio),
            dataFim: p.data_fim ? new Date(p.data_fim) : undefined,
            observacoes: p.observacoes || ''
          })) || [],
          formacaoAcademica: profile.academic_formations?.map((f: any) => ({
            id: f.id,
            nivel: f.nivel,
            instituicao: f.instituicao,
            curso: f.curso,
            ano: f.ano
          })) || [],
          experienciasProfissionais: profile.professional_experiences?.map((e: any) => ({
            tempoMPRJ: e.tempo_mprj || '',
            experienciaAnterior: e.experiencia_anterior || '',
            projetosInternos: e.projetos_internos || '',
            publicacoes: e.publicacoes || ''
          })) || [],
          disponibilidade: profile.availability?.[0] ? {
            tipoColaboracao: profile.availability[0].tipo_colaboracao || [],
            disponibilidadeEstimada: profile.availability[0].disponibilidade_estimada || ''
          } : {
            tipoColaboracao: [],
            disponibilidadeEstimada: ''
          },
          contato: profile.availability?.[0] ? {
            formaContato: profile.availability[0].forma_contato || 'email',
            horarioPreferencial: profile.availability[0].horario_preferencial || ''
          } : {
            formaContato: 'email',
            horarioPreferencial: ''
          }
        };

        setUserProfile(transformedProfile);
        populateFormWithProfile(transformedProfile);
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

  const populateFormWithProfile = (profile: Profile) => {
    setFotoPreview(profile.fotoUrl || '');
    setName(profile.name || '');
    setMatricula(profile.matricula || '');
    setEmail(profile.email || '');
    setTelefone(profile.telefone || '');
    setBiografia(profile.biografia || '');
    setCargo(profile.cargo || []);
    setFuncao(profile.funcao || []);
    setUnidade(profile.unidade || []);
    setAreasConhecimento(profile.areasConhecimento || []);
    setEspecializacoes(profile.especializacoes || '');
    setTemasInteresse(profile.temasInteresse || []);
    setIdiomas(profile.idiomas || []);
    setLinkCurriculo(profile.linkCurriculo || '');
    setCertificacoes(profile.certificacoes || []);
    setPublicacoes(profile.publicacoes || '');
    setAceiteTermos(profile.aceiteTermos || false);

    // Set related data
    setFormacaoAcademica(profile.formacaoAcademica || []);
    setProjetos(profile.projetos || []);
    
    if (profile.disponibilidade && profile.contato) {
      setDisponibilidade({
        tipoColaboracao: profile.disponibilidade.tipoColaboracao || [],
        disponibilidadeEstimada: profile.disponibilidade.disponibilidadeEstimada || '',
        formaContato: profile.contato.formaContato || 'email',
        horarioPreferencial: profile.contato.horarioPreferencial || ''
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
        
        // Transform and set the new profile
        const newProfile: Profile = {
          id: data.id,
          userId: data.user_id || '',
          name: data.name,
          matricula: data.matricula,
          cargo: data.cargo || [],
          funcao: data.funcao || [],
          unidade: data.unidade || [],
          telefone: data.telefone || '',
          email: data.email,
          biografia: data.biografia || '',
          areasConhecimento: data.areas_conhecimento || [],
          especializacoes: data.especializacoes || '',
          temasInteresse: data.temas_interesse || [],
          idiomas: data.idiomas || [],
          linkCurriculo: data.link_curriculo || '',
          fotoUrl: data.foto_url || '',
          certificacoes: data.certificacoes || [],
          publicacoes: data.publicacoes || '',
          role: data.role as 'admin' | 'user',
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
        setUserProfile(newProfile);
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
            data_inicio: p.dataInicio instanceof Date ? p.dataInicio.toISOString().split('T')[0] : p.dataInicio,
            data_fim: p.dataFim ? (p.dataFim instanceof Date ? p.dataFim.toISOString().split('T')[0] : p.dataFim) : null,
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
            <PhotoUpload 
              photoUrl={fotoPreview}
              onPhotoChange={setFotoPreview}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent>
            <BasicInfo
              profile={{ name, matricula, email, telefone, biografia }}
              onChange={(field, value) => {
                switch (field) {
                  case 'name': setName(value); break;
                  case 'matricula': setMatricula(value); break;
                  case 'email': setEmail(value); break;
                  case 'telefone': setTelefone(value); break;
                  case 'biografia': setBiografia(value); break;
                }
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cargo e Unidade</CardTitle>
          </CardHeader>
          <CardContent>
            <CargoUnidade
              profile={{ cargo, funcao, unidade }}
              onChange={(field, value) => {
                switch (field) {
                  case 'cargo': setCargo(value); break;
                  case 'funcao': setFuncao(value); break;
                  case 'unidade': setUnidade(value); break;
                }
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informações Adicionais</CardTitle>
          </CardHeader>
          <CardContent>
            <AdditionalInfo
              profile={{ 
                areasConhecimento, 
                especializacoes, 
                temasInteresse, 
                idiomas, 
                linkCurriculo 
              }}
              onChange={(field, value) => {
                switch (field) {
                  case 'areasConhecimento': setAreasConhecimento(value); break;
                  case 'especializacoes': setEspecializacoes(value); break;
                  case 'temasInteresse': setTemasInteresse(value); break;
                  case 'idiomas': setIdiomas(value); break;
                  case 'linkCurriculo': setLinkCurriculo(value); break;
                }
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Formação Acadêmica</CardTitle>
          </CardHeader>
          <CardContent>
            <AcademicFormation
              formations={formacaoAcademica}
              onChange={setFormacaoAcademica}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Projetos</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectsManager
              projects={projetos}
              onChange={setProjetos}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Certificações</CardTitle>
          </CardHeader>
          <CardContent>
            <CertificationsSection
              certificacoes={certificacoes}
              onChange={setCertificacoes}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Publicações</CardTitle>
          </CardHeader>
          <CardContent>
            <PublicationsSection
              publicacoes={publicacoes}
              onChange={setPublicacoes}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Disponibilidade</CardTitle>
          </CardHeader>
          <CardContent>
            <AvailabilitySection
              disponibilidade={disponibilidade}
              onChange={setDisponibilidade}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferências de Contato</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactPreferences
              contato={disponibilidade}
              onChange={setDisponibilidade}
            />
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
