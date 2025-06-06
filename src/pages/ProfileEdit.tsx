
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../components/ui/button';
import { Form } from '../components/ui/form';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form';
import { Checkbox } from '../components/ui/checkbox';
import { 
  CARGOS,
  UNIDADES,
  NIVEIS_FORMACAO,
  TIPOS_COLABORACAO,
  DISPONIBILIDADE_ESTIMADA,
  FORMAS_CONTATO,
  CERTIFICACOES,
  IDIOMAS
} from '../data/constants';
import { mockProfiles } from '../data/mockData';
import { Save, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { validateEmail } from '../utils/pdfReports';
import InterestAreaSelector from '../components/InterestAreaSelector';
import PhotoUpload from '../components/profile/PhotoUpload';
import BasicInfo from '../components/profile/BasicInfo';
import CargoUnidade from '../components/profile/CargoUnidade';
import ProjectsManager from '../components/profile/ProjectsManager';
import AcademicFormation from '../components/profile/AcademicFormation';
import AvailabilitySection from '../components/profile/AvailabilitySection';
import ContactPreferences from '../components/profile/ContactPreferences';
import CertificationsSection from '../components/profile/CertificationsSection';
import PublicationsSection from '../components/profile/PublicationsSection';
import AdditionalInfo from '../components/profile/AdditionalInfo';

const profileSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  matricula: z.string().min(1, 'Matrícula é obrigatória'),
  cargo: z.array(z.string()).min(1, 'Pelo menos um cargo é obrigatório'),
  unidade: z.array(z.string()).min(1, 'Pelo menos uma unidade é obrigatória'),
  email: z.string().email('Email inválido').refine(validateEmail, 'Email deve ser do domínio @mprj.mp.br'),
  telefone: z.string().optional(),
  biografia: z.string().optional(),
  areasInteresse: z.array(z.string()).min(1, 'Pelo menos uma área de interesse é obrigatória'),
  especializacoes: z.string().optional(),
  temasInteresse: z.array(z.string()).min(1, 'Pelo menos um tema de interesse é obrigatório'),
  idiomas: z.array(z.string()),
  linkCurriculo: z.string().optional(),
  certificacoes: z.array(z.string()).optional(),
  publicacoes: z.string().optional(),
  aceiteTermos: z.boolean().refine(val => val === true, 'Deve aceitar os termos')
});

type ProfileFormData = z.infer<typeof profileSchema>;

// Enhanced validation function for Select values
const isValidSelectValue = (value: any): value is string => {
  const isValid = typeof value === 'string' && 
                 value.trim().length > 0 && 
                 /\S/.test(value.trim());
  if (!isValid) {
    console.error('Invalid select value detected:', value, typeof value);
  }
  return isValid;
};

// Helper function to safely filter arrays for Select components
const safeFilterForSelect = (array: string[], arrayName: string) => {
  const filtered = array.filter(item => {
    const valid = isValidSelectValue(item);
    if (!valid) {
      console.warn(`Filtering out invalid ${arrayName} item:`, item);
    }
    return valid;
  });
  
  console.log(`Safe filter for ${arrayName}: ${array.length} -> ${filtered.length}`);
  return filtered;
};

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
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string>('');

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
      areasInteresse: userProfile?.areasConhecimento || [],
      especializacoes: userProfile?.especializacoes || '',
      temasInteresse: userProfile?.temasInteresse || [],
      idiomas: userProfile?.idiomas || [],
      linkCurriculo: userProfile?.linkCurriculo || '',
      certificacoes: userProfile?.certificacoes || [],
      publicacoes: userProfile?.publicacoes || '',
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
      setFotoPreview(userProfile.fotoUrl || '');
    }
  }, [userProfile]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Arquivo muito grande. Máximo 5MB.');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('Apenas imagens são permitidas.');
        return;
      }

      setFotoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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

  // Safe filtered arrays for Select components
  const safeCargos = safeFilterForSelect(CARGOS, 'CARGOS');
  const safeUnidades = safeFilterForSelect(UNIDADES, 'UNIDADES');
  const safeNiveisFormacao = safeFilterForSelect(NIVEIS_FORMACAO, 'NIVEIS_FORMACAO');
  const safeTiposColaboracao = safeFilterForSelect(TIPOS_COLABORACAO, 'TIPOS_COLABORACAO');
  const safeDisponibilidadeEstimada = safeFilterForSelect(DISPONIBILIDADE_ESTIMADA, 'DISPONIBILIDADE_ESTIMADA');
  const safeFormasContato = safeFilterForSelect(FORMAS_CONTATO, 'FORMAS_CONTATO');
  const safeCertificacoes = safeFilterForSelect(CERTIFICACOES, 'CERTIFICACOES');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-red-900">
          {userProfile ? 'Editar Perfil' : 'Completar Cadastro'}
        </h1>
        <Button onClick={() => navigate('/')} variant="outline">
          Cancelar
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
          <PhotoUpload 
            fotoPreview={fotoPreview}
            onFileUpload={handleFileUpload}
          />

          <BasicInfo form={form} />

          <CargoUnidade 
            form={form}
            safeCargos={safeCargos}
            safeUnidades={safeUnidades}
            isValidSelectValue={isValidSelectValue}
          />

          <InterestAreaSelector form={form} fieldName="areasInteresse" />

          <ProjectsManager 
            projetos={projetos}
            setProjetos={setProjetos}
          />

          <AcademicFormation 
            formacoes={formacoes}
            setFormacoes={setFormacoes}
            safeNiveisFormacao={safeNiveisFormacao}
            isValidSelectValue={isValidSelectValue}
          />

          <CertificationsSection 
            form={form}
            safeCertificacoes={safeCertificacoes}
            isValidSelectValue={isValidSelectValue}
          />

          <PublicationsSection form={form} />

          {/* Idiomas Section */}
          <Card>
            <CardHeader>
              <CardTitle>Idiomas</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="idiomas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Idiomas</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {IDIOMAS.map(idioma => (
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

          <AvailabilitySection 
            tipoColaboracao={tipoColaboracao}
            setTipoColaboracao={setTipoColaboracao}
            disponibilidadeEstimada={disponibilidadeEstimada}
            setDisponibilidadeEstimada={setDisponibilidadeEstimada}
            safeTiposColaboracao={safeTiposColaboracao}
            safeDisponibilidadeEstimada={safeDisponibilidadeEstimada}
            isValidSelectValue={isValidSelectValue}
          />

          <ContactPreferences 
            formaContato={formaContato}
            setFormaContato={setFormaContato}
            horarioPreferencial={horarioPreferencial}
            setHorarioPreferencial={setHorarioPreferencial}
            safeFormasContato={safeFormasContato}
            isValidSelectValue={isValidSelectValue}
          />

          <AdditionalInfo form={form} />

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
