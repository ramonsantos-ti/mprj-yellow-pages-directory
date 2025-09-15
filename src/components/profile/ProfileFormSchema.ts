
import { z } from 'zod';

// Schema para formação acadêmica
export const formacaoAcademicaSchema = z.object({
  id: z.string().optional(),
  nivel: z.string().min(1, 'Nível é obrigatório'),
  instituicao: z.string().min(1, 'Instituição é obrigatória'),
  curso: z.string().min(1, 'Curso é obrigatório'),
  ano: z.number().min(1900, 'Ano deve ser maior que 1900').max(new Date().getFullYear(), 'Ano não pode ser no futuro'),
});

// Schema para experiência profissional - atualizado com novos campos
export const experienciaProfissionalSchema = z.object({
  id: z.string().optional(),
  empresaInstituicao: z.string().optional(),
  cargoFuncao: z.string().optional(),
  dataInicio: z.string().optional(),
  dataFim: z.string().optional(),
  atividades: z.string().optional(),
});

// Schema para informações de deficiência
export const profileDisabilitySchema = z.object({
  disabilityTypeId: z.string(),
  additionalInfo: z.string().optional(),
});

// Schema principal do perfil
export const profileSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  matricula: z.string().min(1, 'Matrícula é obrigatória'),
  email: z.string().email('Email inválido'),
  telefone: z.string().optional(),
  cargo: z.array(z.string()).optional(),
  funcao: z.array(z.string()).optional(),
  unidade: z.array(z.string()).optional(),
  temasInteresse: z.array(z.string()).optional(),
  idiomas: z.array(z.string()).optional(),
  biografia: z.string().optional(),
  linkCurriculo: z.string().optional(),
  certificacoes: z.array(z.string()).optional(),
  publicacoes: z.string().optional(),
  informacoesComplementares: z.string().optional(),
  aceiteTermos: z.boolean().refine(val => val === true, 'Você deve aceitar os termos'),
  formacaoAcademica: z.array(formacaoAcademicaSchema).optional(),
  experienciasProfissionais: z.array(experienciaProfissionalSchema).optional(),
  isPcd: z.boolean().optional(),
  pcdVisibilityLevel: z.enum(['public', 'logged_users', 'admin_only']).optional(),
  disabilities: z.array(profileDisabilitySchema).optional(),
});

// Valores padrão para o formulário
export const defaultFormValues = {
  name: '',
  matricula: '',
  email: '',
  telefone: '',
  cargo: [],
  funcao: [],
  unidade: [],
  temasInteresse: [],
  idiomas: [],
  biografia: '',
  linkCurriculo: '',
  certificacoes: [],
  publicacoes: '',
  informacoesComplementares: '',
  aceiteTermos: false,
  formacaoAcademica: [],
  experienciasProfissionais: [],
  isPcd: false,
  pcdVisibilityLevel: 'logged_users' as const,
  disabilities: [],
};

export type ProfileFormData = z.infer<typeof profileSchema>;
