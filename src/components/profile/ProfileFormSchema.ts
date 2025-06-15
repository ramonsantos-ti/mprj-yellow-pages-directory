import * as z from 'zod';

const formacaoAcademicaSchema = z.object({
  nivel: z.string().min(1, 'Nível é obrigatório'),
  instituicao: z.string().min(1, 'Instituição é obrigatória'),
  curso: z.string().min(1, 'Curso é obrigatório'),
  ano: z.number().min(1900, 'Ano deve ser válido').max(new Date().getFullYear() + 10, 'Ano não pode ser muito futuro')
});

// Atualização: agora o array pode ser undefined ou conter só entradas válidas completamente preenchidas.
// Permite array vazio ou undefined!
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
  // Mantém validacão: array opcional, exige 100% dos campos se iniciado
  formacaoAcademica: z
    .array(formacaoAcademicaSchema)
    .optional()
    .refine(
      (arr) => {
        if (!arr) return true; // OK se não existe
        if (arr.length === 0) return true; // OK se array vazio
        // Exige que todas entradas estejam 100% completas
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
