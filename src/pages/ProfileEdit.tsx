
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
        setName(user?.user_metadata?.name || user?.email || '');
        setEmail(user?.email || '');
        setMatricula(user?.user_metadata?.matricula || '');
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
            <PhotoUpload
              currentPhotoUrl={fotoPreview}
              onPhotoUrlChange={setFotoPreview}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent>
            <BasicInfo
              name={name}
              setName={setName}
              matricula={matricula}
              setMatricula={setMatricula}
              email={email}
              setEmail={setEmail}
              telefone={telefone}
              setTelefone={setTelefone}
              biografia={biografia}
              setBiografia={setBiografia}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cargo e Unidade</CardTitle>
          </CardHeader>
          <CardContent>
            <CargoUnidade
              cargo={cargo}
              setCargo={setCargo}
              funcao={funcao}
              setFuncao={setFuncao}
              unidade={unidade}
              setUnidade={setUnidade}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informações Adicionais</CardTitle>
          </CardHeader>
          <CardContent>
            <AdditionalInfo
              areasConhecimento={areasConhecimento}
              setAreasConhecimento={setAreasConhecimento}
              especializacoes={especializacoes}
              setEspecializacoes={setEspecializacoes}
              temasInteresse={temasInteresse}
              setTemasInteresse={setTemasInteresse}
              idiomas={idiomas}
              setIdiomas={setIdiomas}
              linkCurriculo={linkCurriculo}
              setLinkCurriculo={setLinkCurriculo}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Formação Acadêmica</CardTitle>
          </CardHeader>
          <CardContent>
            <AcademicFormation
              formacaoAcademica={formacaoAcademica}
              setFormacaoAcademica={setFormacaoAcademica}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Projetos</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectsManager
              projetos={projetos}
              setProjetos={setProjetos}
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
              setCertificacoes={setCertificacoes}
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
              setPublicacoes={setPublicacoes}
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
              setDisponibilidade={setDisponibilidade}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferências de Contato</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactPreferences
              disponibilidade={disponibilidade}
              setDisponibilidade={setDisponibilidade}
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
