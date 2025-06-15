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
  temasInteresse: z.array(z.string()), // <-- agora é obrigatório
  idiomas: z.array(z.string()),
  linkCurriculo: z.string().optional(),
  certificacoes: z.array(z.string()),
  aceiteTermos: z.boolean().refine(val => val === true, 'Você deve aceitar os termos'),
  biografia: z.string().optional(),
  publicacoes: z.string().optional(),
  informacoesComplementares: z.string().optional(),
  formacaoAcademica: z
    .array(formacaoAcademicaSchema)
    .optional()
    .refine(
      (arr) => {
        if (!arr) return true;
        if (arr.length === 0) return true;
        return arr.every(
          (item) =>
            item.nivel &&
            item.instituicao &&
            item.curso &&
            item.ano &&
            typeof item.nivel === 'string' &&
            typeof item.instituicao === 'string' &&
            typeof item.curso === 'string' &&
            typeof item.ano === 'number' &&
            item.nivel.trim() !== '' &&
            item.instituicao.trim() !== '' &&
            item.curso.trim() !== ''
        );
      },
      {
        message:
          'Se você começou a preencher uma formação acadêmica, complete todos os campos ou exclua a entrada para salvar o perfil.'
      }
    ),
});

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
  linkCurriculo: '',
  certificacoes: [],
  aceiteTermos: false,
  formacaoAcademica: [],
  biografia: '',
  publicacoes: '',
  informacoesComplementares: "",
};
