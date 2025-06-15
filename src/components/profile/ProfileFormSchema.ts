
import * as z from 'zod';

const formacaoAcademicaSchema = z.object({
  nivel: z.string().min(1, 'Nível é obrigatório'),
  instituicao: z.string().min(1, 'Instituição é obrigatória'),
  curso: z.string().min(1, 'Curso é obrigatório'),
  ano: z.number().min(1900, 'Ano deve ser válido').max(new Date().getFullYear() + 10, 'Ano não pode ser muito futuro')
});

export const profileSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  matricula: z.string().min(1, 'Matrícula é obrigatória'),
  email: z.string().email('Email inválido'),
  telefone: z.string().optional(),
  cargo: z.array(z.string()).min(1, 'Pelo menos um cargo é obrigatório'),
  funcao: z.array(z.string()),
  unidade: z.array(z.string()).min(1, 'Pelo menos uma unidade é obrigatória'),
  areasConhecimento: z.array(z.string()),
  temasInteresse: z.array(z.string()),
  idiomas: z.array(z.string()), // seção própria
  linkCurriculo: z.string().optional(),
  certificacoes: z.array(z.string()),
  aceiteTermos: z.boolean().refine(val => val === true, 'Você deve aceitar os termos'),
  formacaoAcademica: z.array(formacaoAcademicaSchema).optional(),
  informacoesComplementares: z.string().optional(),
});

export const defaultFormValues = {
  name: '',
  matricula: '',
  email: '',
  telefone: '',
  cargo: [],
  funcao: [],
  unidade: [],
  areasConhecimento: [],
  temasInteresse: [],
  idiomas: [], // campo separado
  linkCurriculo: '',
  certificacoes: [],
  aceiteTermos: false,
  formacaoAcademica: [],
  informacoesComplementares: '',
};
