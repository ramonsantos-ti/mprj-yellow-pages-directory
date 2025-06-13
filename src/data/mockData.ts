
import { User, Profile } from '../types';

// Mock users data
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    name: 'Administrador do Sistema',
    matricula: 'ADM001',
    role: 'admin',
    isActive: true,
    lastLogin: new Date('2024-01-15T09:00:00')
  },
  {
    id: '2',
    username: 'joao.silva',
    password: 'senha123',
    name: 'João Silva Santos',
    matricula: 'MPRJ12345',
    role: 'user',
    isActive: true,
    lastLogin: new Date('2024-01-14T14:30:00')
  },
  {
    id: '3',
    username: 'maria.santos',
    password: 'senha123',
    name: 'Maria Santos Oliveira',
    matricula: 'MPRJ12346',
    role: 'user',
    isActive: true,
    lastLogin: new Date('2024-01-13T11:15:00')
  },
  {
    id: '4',
    username: 'pedro.oliveira',
    password: 'senha123',
    name: 'Pedro Oliveira Costa',
    matricula: 'MPRJ12347',
    role: 'user',
    isActive: true,
    lastLogin: new Date('2024-01-12T16:45:00')
  },
  {
    id: '5',
    username: 'ana.costa',
    password: 'senha123',
    name: 'Ana Costa Ferreira',
    matricula: 'MPRJ12348',
    role: 'user',
    isActive: true,
    lastLogin: new Date('2024-01-11T10:20:00')
  }
];

// Mock profiles data - Updated with correct cargo and funcao values
export const mockProfiles: Profile[] = [
  {
    id: '1',
    userId: '2',
    name: 'João Silva Santos',
    matricula: 'MPRJ12345',
    cargo: ['Promotor de Justiça'],
    funcao: ['Coordenador'],
    unidade: ['Promotoria de Justiça Criminal'],
    telefone: '(21) 99999-1234',
    email: 'joao.silva@mprj.mp.br',
    biografia: 'Promotor de Justiça especializado em direito penal, com mais de 10 anos de experiência no Ministério Público do Estado do Rio de Janeiro.',
    areasConhecimento: ['Direito Penal', 'Direito Processual Penal', 'Criminologia e Política Criminal'],
    especializacoes: 'Especialização em Direito Penal Econômico pela UERJ',
    projetos: [
      {
        nome: 'Operação Transparência',
        dataInicio: new Date('2023-03-15'),
        dataFim: new Date('2023-12-20'),
        observacoes: 'Investigação de crimes contra a administração pública'
      },
      {
        nome: 'Projeto Justiça Digital',
        dataInicio: new Date('2024-01-10'),
        observacoes: 'Modernização dos processos de investigação'
      }
    ],
    temasInteresse: ['Combate à Corrupção', 'Inovação Tecnológica', 'Capacitação de Equipes'],
    formacaoAcademica: [
      {
        nivel: 'Graduação',
        instituicao: 'UERJ',
        curso: 'Direito',
        ano: 2010
      },
      {
        nivel: 'Especialização',
        instituicao: 'UERJ',
        curso: 'Direito Penal Econômico',
        ano: 2015
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '12 anos',
        experienciaAnterior: 'Advogado criminalista por 3 anos',
        projetosInternos: 'Coordenação do GAECO Regional',
        publicacoes: 'Artigos sobre direito penal econômico'
      }
    ],
    idiomas: ['Português', 'Inglês', 'Espanhol'],
    disponibilidade: {
      tipoColaboracao: ['Consultoria interna', 'Capacitações/tutoria'],
      disponibilidadeEstimada: '2h a 4h/semana'
    },
    contato: {
      formaContato: 'E-mail',
      horarioPreferencial: 'Manhã (8h às 12h)'
    },
    linkCurriculo: 'https://exemplo.com/curriculo-joao',
    fotoUrl: '/lovable-uploads/2aae1185-7d52-453a-942a-1ef1876196b1.jpg',
    lastUpdated: new Date('2024-01-15T10:30:00'),
    aceiteTermos: true,
    isActive: true,
    certificacoes: ['OAB', 'Certificação em Direitos Humanos'],
    publicacoes: 'Diversos artigos em revistas jurídicas especializadas',
    role: 'user'
  },
  {
    id: '2',
    userId: '3',
    name: 'Maria Santos Oliveira',
    matricula: 'MPRJ12346',
    cargo: ['Técnico'],
    funcao: [],
    unidade: ['Diretoria de Recursos Humanos'],
    telefone: '(21) 99999-5678',
    email: 'maria.santos@mprj.mp.br',
    biografia: 'Técnica em administração com vasta experiência em gestão de pessoas e processos administrativos.',
    areasConhecimento: ['Gestão de Pessoas / Recursos Humanos', 'Administração Pública'],
    especializacoes: 'MBA em Gestão Pública',
    projetos: [
      {
        nome: 'Sistema de Avaliação de Desempenho',
        dataInicio: new Date('2023-02-01'),
        dataFim: new Date('2023-11-30'),
        observacoes: 'Implementação do novo sistema de avaliação'
      }
    ],
    temasInteresse: ['Modernização Administrativa', 'Qualidade de Vida no Trabalho'],
    formacaoAcademica: [
      {
        nivel: 'Graduação',
        instituicao: 'UFRJ',
        curso: 'Administração',
        ano: 2008
      },
      {
        nivel: 'MBA',
        instituicao: 'FGV',
        curso: 'Gestão Pública',
        ano: 2018
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '15 anos',
        experienciaAnterior: 'Setor privado - RH por 5 anos',
        projetosInternos: 'Modernização do sistema de RH'
      }
    ],
    idiomas: ['Português', 'Inglês'],
    disponibilidade: {
      tipoColaboracao: ['Grupos de trabalho', 'Mentoria'],
      disponibilidadeEstimada: 'Até 2h/semana'
    },
    contato: {
      formaContato: 'Microsoft Teams',
      horarioPreferencial: 'Tarde (14h às 18h)'
    },
    fotoUrl: '/lovable-uploads/c07ab9f3-3adc-43c4-83c8-dac05c9c9fc3.jpg',
    lastUpdated: new Date('2024-01-14T15:45:00'),
    aceiteTermos: true,
    isActive: true,
    certificacoes: ['Gestão de Projetos'],
    role: 'user'
  },
  {
    id: '3',
    userId: '4',
    name: 'Pedro Oliveira Costa',
    matricula: 'MPRJ12347',
    cargo: ['Analista'],
    funcao: ['Supervisor'],
    unidade: ['Diretoria de Tecnologia da Informação'],
    telefone: '(21) 99999-9012',
    email: 'pedro.oliveira@mprj.mp.br',
    biografia: 'Analista de sistemas especializado em desenvolvimento de soluções tecnológicas para o Ministério Público.',
    areasConhecimento: ['Tecnologia da Informação e Comunicação (TIC)', 'Ciência de Dados e Business Intelligence'],
    especializacoes: 'Mestrado em Ciência da Computação',
    projetos: [
      {
        nome: 'Portal do Cidadão',
        dataInicio: new Date('2023-01-15'),
        observacoes: 'Desenvolvimento de portal para atendimento ao cidadão'
      }
    ],
    temasInteresse: ['Inteligência Artificial', 'Automação de Processos'],
    formacaoAcademica: [
      {
        nivel: 'Graduação',
        instituicao: 'PUC-Rio',
        curso: 'Ciência da Computação',
        ano: 2012
      },
      {
        nivel: 'Mestrado',
        instituicao: 'PUC-Rio',
        curso: 'Informática',
        ano: 2016
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '8 anos',
        experienciaAnterior: 'Desenvolvedor em startup de tecnologia por 4 anos',
        projetosInternos: 'Modernização da infraestrutura de TI'
      }
    ],
    idiomas: ['Português', 'Inglês', 'Japonês'],
    disponibilidade: {
      tipoColaboracao: ['Consultoria interna', 'Formação de equipes'],
      disponibilidadeEstimada: '2h a 4h/semana'
    },
    contato: {
      formaContato: 'E-mail',
      horarioPreferencial: 'Flexível'
    },
    fotoUrl: '/lovable-uploads/2ee6157e-fd08-4e0b-9189-84fa52673c3b.jpg',
    lastUpdated: new Date('2024-01-13T09:20:00'),
    aceiteTermos: true,
    isActive: true,
    certificacoes: ['AWS Certified Solutions Architect', 'Scrum Master'],
    publicacoes: 'Artigos sobre desenvolvimento de sistemas governamentais',
    role: 'user'
  },
  {
    id: '4',
    userId: '5',
    name: 'Ana Costa Ferreira',
    matricula: 'MPRJ12348',
    cargo: ['Procurador de Justiça'],
    funcao: ['Diretora'],
    unidade: ['3ª Procuradoria de Justiça'],
    telefone: '(21) 99999-3456',
    email: 'ana.costa@mprj.mp.br',
    biografia: 'Procuradora de Justiça com vasta experiência em direito constitucional e administrativo.',
    areasConhecimento: ['Direito Constitucional', 'Direito Administrativo', 'Direitos Humanos'],
    especializacoes: 'Doutorado em Direito Constitucional',
    projetos: [
      {
        nome: 'Projeto Cidadania Ativa',
        dataInicio: new Date('2022-08-01'),
        observacoes: 'Programa de educação em direitos fundamentais'
      }
    ],
    temasInteresse: ['Proteção de Direitos Fundamentais', 'Educação Jurídica'],
    formacaoAcademica: [
      {
        nivel: 'Graduação',
        instituicao: 'UFRJ',
        curso: 'Direito',
        ano: 2005
      },
      {
        nivel: 'Mestrado',
        instituicao: 'UFRJ',
        curso: 'Direito Constitucional',
        ano: 2008
      },
      {
        nivel: 'Doutorado',
        instituicao: 'UFRJ',
        curso: 'Direito Constitucional',
        ano: 2012
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '18 anos',
        experienciaAnterior: 'Professora universitária por 5 anos',
        projetosInternos: 'Coordenação de programas de capacitação',
        publicacoes: 'Livros e artigos sobre direito constitucional'
      }
    ],
    idiomas: ['Português', 'Inglês', 'Francês', 'Italiano'],
    disponibilidade: {
      tipoColaboracao: ['Capacitações/tutoria', 'Mentoria'],
      disponibilidadeEstimada: 'Sob demanda (caso a caso)'
    },
    contato: {
      formaContato: 'Telefone',
      horarioPreferencial: 'Manhã (9h às 11h)'
    },
    linkCurriculo: 'https://exemplo.com/curriculo-ana',
    lastUpdated: new Date('2024-01-12T11:10:00'),
    aceiteTermos: true,
    isActive: true,
    certificacoes: ['Certificação em Direitos Humanos', 'Certificações em Línguas Estrangeiras'],
    publicacoes: 'Autora de diversos livros sobre direito constitucional',
    role: 'user'
  }
];
