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
import CurriculumSection from '../components/profile/CurriculumSection';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '../components/ui/form';

// Define form schema
const profileSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  matricula: z.string().min(1, 'Matrícula é obrigatória'),
  email: z.string().email('Email inválido'),
  telefone: z.string().optional(),
  biografia: z.string().optional(),
  cargo: z.array(z.string()).min(1, 'Pelo menos um cargo é obrigatório'),
  funcao: z.array(z.string()),
  unidade: z.array(z.string()).min(1, 'Pelo menos uma unidade é obrigatória'),
  areasConhecimento: z.array(z.string()),
  especializacoes: z.string().optional(),
  temasInteresse: z.array(z.string()),
  idiomas: z.array(z.string()),
  linkCurriculo: z.string().optional(),
  certificacoes: z.array(z.string()),
  publicacoes: z.string().optional(),
  aceiteTermos: z.boolean().refine(val => val === true, 'Você deve aceitar os termos')
});

const ProfileEdit: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);

  // Additional state for complex data structures
  const [fotoPreview, setFotoPreview] = useState('');
  const [formacaoAcademica, setFormacaoAcademica] = useState<any[]>([]);
  const [projetos, setProjetos] = useState<any[]>([]);
  const [disponibilidade, setDisponibilidade] = useState<any>({});

  // Available options
  const safeCargos = [
    'Promotor de Justiça', 'Procurador de Justiça', 'Analista Ministerial',
    'Técnico Ministerial', 'Assessor', 'Estagiário'
  ];
  
  const safeFuncoes = [
    'Coordenador', 'Assessor Técnico', 'Chefe de Seção', 'Supervisor'
  ];
  
  const safeUnidades = [
    'Procuradoria-Geral de Justiça', 'Subprocuradoria-Geral de Justiça de Assuntos Administrativos',
    'Corregedoria-Geral do Ministério Público', 'Centro de Apoio Operacional',
    'Promotoria de Justiça', 'Procuradoria de Justiça'
  ];

  const safeCertificacoes = [
    'PMP - Project Management Professional', 'ITIL Foundation',
    'ISO 27001', 'Scrum Master', 'Product Owner'
  ];

  const safeTiposColaboracao = [
    'Consultoria', 'Treinamento', 'Projetos', 'Palestras', 'Pesquisa'
  ];

  const safeDisponibilidadeEstimada = [
    'Até 5 horas/semana', '5-10 horas/semana', '10-20 horas/semana', 'Mais de 20 horas/semana'
  ];

  const safeFormasContato = ['email', 'telefone', 'teams', 'presencial'];

  const isValidSelectValue = (value: any): boolean => {
    return typeof value === 'string' && value.trim().length > 0;
  };

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      matricula: '',
      email: '',
      telefone: '',
      biografia: '',
      cargo: [],
      funcao: [],
      unidade: [],
      areasConhecimento: [],
      especializacoes: '',
      temasInteresse: [],
      idiomas: [],
      linkCurriculo: '',
      certificacoes: [],
      publicacoes: '',
      aceiteTermos: false
    }
  });

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
        form.setValue('name', user?.email || '');
        form.setValue('email', user?.email || '');
        form.setValue('matricula', '');
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
    
    // Set form values
    form.setValue('name', profile.name || '');
    form.setValue('matricula', profile.matricula || '');
    form.setValue('email', profile.email || '');
    form.setValue('telefone', profile.telefone || '');
    form.setValue('biografia', profile.biografia || '');
    form.setValue('cargo', profile.cargo || []);
    form.setValue('funcao', profile.funcao || []);
    form.setValue('unidade', profile.unidade || []);
    form.setValue('areasConhecimento', profile.areasConhecimento || []);
    form.setValue('especializacoes', profile.especializacoes || '');
    form.setValue('temasInteresse', profile.temasInteresse || []);
    form.setValue('idiomas', profile.idiomas || []);
    form.setValue('linkCurriculo', profile.linkCurriculo || '');
    form.setValue('certificacoes', profile.certificacoes || []);
    form.setValue('publicacoes', profile.publicacoes || '');
    form.setValue('aceiteTermos', profile.aceiteTermos || false);

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

  const handleSave = async (data: any) => {
    try {
      setSaving(true);
      setError(null);
      setSuccessMessage(null);

      const profileData = {
        user_id: user?.id,
        name: data.name,
        matricula: data.matricula,
        email: data.email,
        telefone: data.telefone,
        biografia: data.biografia,
        cargo: data.cargo,
        funcao: data.funcao,
        unidade: data.unidade,
        areas_conhecimento: data.areasConhecimento,
        especializacoes: data.especializacoes,
        temas_interesse: data.temasInteresse,
        idiomas: data.idiomas,
        link_curriculo: data.linkCurriculo,
        foto_url: fotoPreview,
        certificacoes: data.certificacoes,
        publicacoes: data.publicacoes,
        aceite_termos: data.aceiteTermos,
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
        const { data: newProfile, error } = await supabase
          .from('profiles')
          .insert(profileData)
          .select()
          .single();

        if (error) throw error;
        profileId = newProfile.id;
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="grid gap-6">
          <PhotoUpload 
            fotoPreview={fotoPreview}
            onFileUpload={handleFileUpload}
          />

          <BasicInfo form={form} />

          <CargoUnidade
            form={form}
            safeCargos={safeCargos}
            safeFuncoes={safeFuncoes}
            safeUnidades={safeUnidades}
            isValidSelectValue={isValidSelectValue}
          />

          <AcademicFormation form={form} />

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

          <CertificationsSection form={form} />

          <PublicationsSection form={form} />

          <AvailabilitySection
            tipoColaboracao={disponibilidade.tipoColaboracao || []}
            setTipoColaboracao={(value) => setDisponibilidade({...disponibilidade, tipoColaboracao: value})}
            disponibilidadeEstimada={disponibilidade.disponibilidadeEstimada || ''}
            setDisponibilidadeEstimada={(value) => setDisponibilidade({...disponibilidade, disponibilidadeEstimada: value})}
            safeTiposColaboracao={safeTiposColaboracao}
            safeDisponibilidadeEstimada={safeDisponibilidadeEstimada}
            isValidSelectValue={isValidSelectValue}
          />

          <ContactPreferences
            formaContato={disponibilidade.formaContato || 'email'}
            setFormaContato={(value) => setDisponibilidade({...disponibilidade, formaContato: value})}
            horarioPreferencial={disponibilidade.horarioPreferencial || ''}
            setHorarioPreferencial={(value) => setDisponibilidade({...disponibilidade, horarioPreferencial: value})}
            safeFormasContato={safeFormasContato}
            isValidSelectValue={isValidSelectValue}
          />

          <CurriculumSection form={form} />

          <AdditionalInfo form={form} />

          <Card>
            <CardContent className="pt-6">
              <div className="flex space-x-4">
                <Button
                  type="submit"
                  disabled={saving}
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
        </form>
      </Form>
    </div>
  );
};

export default ProfileEdit;
