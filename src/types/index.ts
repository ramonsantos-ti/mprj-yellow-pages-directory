
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
  funcao?: string[];
  unidade: string[];
  telefone?: string;
  email: string;
  biografia?: string;
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
  updatedByAdmin?: boolean;
  informacoesComplementares?: string;
  isPcd?: boolean;
  pcdVisibilityLevel?: PcdVisibilityLevel;
  disabilities?: ProfileDisability[];
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
  id?: string;
  empresaInstituicao?: string;
  cargoFuncao?: string;
  dataInicio?: string;
  dataFim?: string;
  atividades?: string;
}

export interface Disponibilidade {
  tipoColaboracao: string[];
  disponibilidadeEstimada: string;
}

export interface ContatoPreferencia {
  formaContato: string;
  horarioPreferencial?: string;
}

export type PcdVisibilityLevel = 'public' | 'logged_users' | 'admin_only';

export interface DisabilityType {
  id: string;
  name: string;
  category: 'fisica' | 'visual' | 'auditiva' | 'intelectual' | 'multipla';
  description?: string;
  created_at?: string;
}

export interface ProfileDisability {
  id: string;
  profile_id: string;
  disability_type_id: string;
  disability_type?: DisabilityType;
  additional_info?: string;
  created_at?: string;
}

export interface SearchFilters {
  cargo?: string;
  funcao?: string;
  unidade?: string;
  areaConhecimento?: string;
  habilidadeTecnica?: string;
  formacao?: string;
  idioma?: string;
  disponibilidade?: string;
  deficiencia?: string;
  tipoPcd?: string;
}

export interface ProfileReview {
  id: string;
  profile_id: string;
  reviewer_id: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_id?: string;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
  profile?: {
    name: string;
    matricula: string;
    email: string;
  };
  reviewer?: {
    name: string;
    matricula: string;
    email: string;
  };
  admin?: {
    name: string;
    matricula: string;
  };
}

export interface TopRatedProfile {
  profile_id: string;
  name: string;
  matricula: string;
  foto_url: string | null;
  cargo: string[];
  average_rating: number;
  review_count: number;
}
