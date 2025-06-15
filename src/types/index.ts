export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  matricula: string;
  role: 'admin' | 'user';
  profile?: Profile;
  isActive?: boolean;
  lastLogin?: Date;
}

export interface Profile {
  id: string;
  userId: string;
  name: string;
  matricula: string;
  cargo: string[];
  funcao?: string[]; // New optional field for functions
  unidade: string[];
  telefone?: string;
  email: string;
  biografia?: string;
  areasConhecimento: string[];
  especializacoes?: string;
  projetos: Project[];
  temasInteresse: string[];
  formacaoAcademica: FormacaoAcademica[];
  experienciasProfissionais: ExperienciaProfissional[];
  idiomas: string[];
  disponibilidade: Disponibilidade;
  contato: ContatoPreferencia;
  linkCurriculo?: string;
  fotoUrl?: string;
  lastUpdated: Date;
  aceiteTermos: boolean;
  isActive?: boolean;
  certificacoes?: string[];
  publicacoes?: string;
  role?: 'admin' | 'user';
  updatedByAdmin?: boolean; // New field to track admin modifications
  informacoesComplementares?: string; // <-- ADDED to fix the error
}

export interface Project {
  id?: string;
  nome: string;
  dataInicio: Date;
  dataFim?: Date;
  observacoes?: string;
}

export interface FormacaoAcademica {
  id?: string;
  nivel: string;
  instituicao: string;
  curso: string;
  ano: number;
}

export interface ExperienciaProfissional {
  tempoMPRJ: string;
  experienciaAnterior?: string;
  projetosInternos?: string;
  publicacoes?: string;
}

export interface Disponibilidade {
  tipoColaboracao: string[];
  disponibilidadeEstimada: string;
}

export interface ContatoPreferencia {
  formaContato: string;
  horarioPreferencial?: string;
}

export interface SearchFilters {
  cargo?: string;
  funcao?: string; // New filter for functions
  unidade?: string;
  areaConhecimento?: string;
  habilidadeTecnica?: string;
  formacao?: string;
  idioma?: string;
  disponibilidade?: string;
}
