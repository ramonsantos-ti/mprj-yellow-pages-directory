
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
    username: 'usuario01',
    password: 'usuario01',
    name: 'Mariana Santos Silva',
    matricula: 'MPRJ12345',
    role: 'user',
    isActive: true,
    lastLogin: new Date('2024-01-14T14:30:00')
  },
  {
    id: '3',
    username: 'usuario02',
    password: 'usuario02',
    name: 'Roberto Carlos Mendes',
    matricula: 'MPRJ12346',
    role: 'user',
    isActive: true,
    lastLogin: new Date('2024-01-13T11:15:00')
  },
  {
    id: '4',
    username: 'usuario03',
    password: 'usuario03',
    name: 'Ana Beatriz Oliveira',
    matricula: 'MPRJ12347',
    role: 'user',
    isActive: true,
    lastLogin: new Date('2024-01-12T16:45:00')
  },
  {
    id: '5',
    username: 'usuario04',
    password: 'usuario04',
    name: 'Hiroshi Tanaka Yamamoto',
    matricula: 'MPRJ12348',
    role: 'user',
    isActive: true,
    lastLogin: new Date('2024-01-11T10:20:00')
  },
  {
    id: '6',
    username: 'usuario05',
    password: 'usuario05',
    name: 'Gabriel Rodrigues Costa',
    matricula: 'MPRJ12349',
    role: 'user',
    isActive: true,
    lastLogin: new Date('2024-01-10T08:30:00')
  },
  {
    id: '7',
    username: 'usuario06',
    password: 'usuario06',
    name: 'Carolina Ferreira Alves',
    matricula: 'MPRJ12350',
    role: 'user',
    isActive: true,
    lastLogin: new Date('2024-01-09T15:20:00')
  },
  {
    id: '8',
    username: 'usuario07',
    password: 'usuario07',
    name: 'Marcus Thompson Johnson',
    matricula: 'MPRJ12351',
    role: 'user',
    isActive: true,
    lastLogin: new Date('2024-01-08T12:45:00')
  },
  {
    id: '9',
    username: 'usuario08',
    password: 'usuario08',
    name: 'Diego Martinez Fernandez',
    matricula: 'MPRJ12352',
    role: 'user',
    isActive: true,
    lastLogin: new Date('2024-01-07T09:15:00')
  },
  {
    id: '10',
    username: 'usuario09',
    password: 'usuario09',
    name: 'Fatima Al-Zahra Hassan',
    matricula: 'MPRJ12353',
    role: 'user',
    isActive: true,
    lastLogin: new Date('2024-01-06T14:30:00')
  },
  {
    id: '11',
    username: 'usuario10',
    password: 'usuario10',
    name: 'Rajesh Kumar Patel',
    matricula: 'MPRJ12354',
    role: 'user',
    isActive: true,
    lastLogin: new Date('2024-01-05T11:45:00')
  }
];

// Mock profiles data with diverse backgrounds and roles
export const mockProfiles: Profile[] = [
  {
    id: '1',
    userId: '2',
    name: 'Mariana Santos Silva',
    matricula: 'MPRJ12345',
    cargo: ['Procurador de Justiça'],
    funcao: ['Procurador-Geral de Justiça'],
    unidade: ['Procuradoria-Geral de Justiça'],
    telefone: '(21) 99999-1234',
    email: 'mariana.santos@mprj.mp.br',
    biografia: 'Procuradora-Geral de Justiça com mais de 20 anos de experiência no Ministério Público. Especialista em direito constitucional e gestão pública, com foco em modernização institucional e transparência.',
    areasConhecimento: ['Direito Constitucional', 'Gestão Pública', 'Direito Administrativo', 'Liderança Organizacional'],
    especializacoes: 'Doutorado em Direito Constitucional pela USP, MBA em Gestão Pública pela FGV',
    projetos: [
      {
        nome: 'Programa de Modernização do MPRJ',
        dataInicio: new Date('2023-01-15'),
        observacoes: 'Implementação de novas tecnologias e processos digitais'
      },
      {
        nome: 'Plano Estratégico 2024-2027',
        dataInicio: new Date('2023-06-01'),
        observacoes: 'Desenvolvimento do novo planejamento estratégico institucional'
      }
    ],
    temasInteresse: ['Transformação Digital', 'Governança Corporativa', 'Inovação no Setor Público', 'Direitos Fundamentais'],
    formacaoAcademica: [
      {
        nivel: 'Doutorado',
        instituicao: 'USP',
        curso: 'Direito Constitucional',
        ano: 2010
      },
      {
        nivel: 'MBA',
        instituicao: 'FGV',
        curso: 'Gestão Pública',
        ano: 2015
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '20 anos',
        experienciaAnterior: 'Advogada constitucionalista por 5 anos, Professora universitária por 8 anos'
      }
    ],
    idiomas: ['Português', 'Inglês', 'Francês', 'Espanhol'],
    disponibilidade: {
      tipoColaboracao: ['Consultoria interna', 'Capacitações/tutoria', 'Mentoria'],
      disponibilidadeEstimada: 'Sob demanda (caso a caso)'
    },
    contato: {
      formaContato: 'E-mail',
      horarioPreferencial: 'Manhã (9h às 12h)'
    },
    fotoUrl: '/lovable-uploads/252819a5-bbb7-47c1-9299-20befdcf4b35.png',
    lastUpdated: new Date('2024-01-15T10:30:00'),
    aceiteTermos: true,
    isActive: true,
    role: 'user'
  },
  {
    id: '2',
    userId: '3',
    name: 'Roberto Carlos Mendes',
    matricula: 'MPRJ12346',
    cargo: ['Procurador de Justiça'],
    funcao: ['Corregedor-Geral'],
    unidade: ['Corregedoria-Geral do Ministério Público'],
    telefone: '(21) 99999-5678',
    email: 'roberto.mendes@mprj.mp.br',
    biografia: 'Procurador de Justiça com vasta experiência em corregedoria e controle interno. Especialista em ética no serviço público e compliance institucional.',
    areasConhecimento: ['Direito Administrativo', 'Controle Interno', 'Ética Pública', 'Compliance'],
    especializacoes: 'Mestrado em Direito Administrativo pela UERJ, Especialização em Compliance Público',
    projetos: [
      {
        nome: 'Sistema de Integridade MPRJ',
        dataInicio: new Date('2023-03-01'),
        observacoes: 'Implementação de sistema de compliance e integridade'
      }
    ],
    temasInteresse: ['Integridade Pública', 'Sistemas de Controle', 'Auditoria Interna', 'Prevenção à Corrupção'],
    formacaoAcademica: [
      {
        nivel: 'Mestrado',
        instituicao: 'UERJ',
        curso: 'Direito Administrativo',
        ano: 2008
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '18 anos',
        experienciaAnterior: 'Auditor público por 7 anos'
      }
    ],
    idiomas: ['Português', 'Inglês', 'Italiano'],
    disponibilidade: {
      tipoColaboracao: ['Consultoria interna', 'Capacitações/tutoria'],
      disponibilidadeEstimada: '2h a 4h/semana'
    },
    contato: {
      formaContato: 'Microsoft Teams',
      horarioPreferencial: 'Tarde (14h às 17h)'
    },
    fotoUrl: '/lovable-uploads/d697bc7f-813e-48f0-81e7-ed4035f7e7af.png',
    lastUpdated: new Date('2024-01-14T15:45:00'),
    aceiteTermos: true,
    isActive: true,
    role: 'user'
  },
  {
    id: '3',
    userId: '4',
    name: 'Ana Beatriz Oliveira',
    matricula: 'MPRJ12347',
    cargo: ['Promotor de Justiça'],
    funcao: ['Coordenador'],
    unidade: ['Coordenadoria de Combate à Violência Doméstica'],
    telefone: '(21) 99999-9012',
    email: 'ana.oliveira@mprj.mp.br',
    biografia: 'Promotora de Justiça especializada em violência doméstica e direitos da mulher. Coordenadora de projetos sociais de prevenção e atendimento às vítimas.',
    areasConhecimento: ['Direitos Humanos', 'Violência Doméstica', 'Direito Penal', 'Políticas Públicas'],
    especializacoes: 'Especialização em Violência Doméstica e Familiar pela PUC-Rio',
    projetos: [
      {
        nome: 'Rede de Proteção à Mulher',
        dataInicio: new Date('2023-08-01'),
        observacoes: 'Articulação da rede de atendimento às mulheres vítimas de violência'
      },
      {
        nome: 'Projeto Maria da Penha nas Escolas',
        dataInicio: new Date('2023-02-15'),
        observacoes: 'Programa educativo sobre prevenção à violência doméstica'
      }
    ],
    temasInteresse: ['Direitos da Mulher', 'Prevenção à Violência', 'Educação em Direitos', 'Políticas de Gênero'],
    formacaoAcademica: [
      {
        nivel: 'Graduação',
        instituicao: 'PUC-Rio',
        curso: 'Direito',
        ano: 2012
      },
      {
        nivel: 'Especialização',
        instituicao: 'PUC-Rio',
        curso: 'Violência Doméstica e Familiar',
        ano: 2018
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '10 anos',
        experienciaAnterior: 'Defensora Pública por 3 anos'
      }
    ],
    idiomas: ['Português', 'Inglês', 'Francês'],
    disponibilidade: {
      tipoColaboracao: ['Capacitações/tutoria', 'Grupos de trabalho', 'Mentoria'],
      disponibilidadeEstimada: '4h a 6h/semana'
    },
    contato: {
      formaContato: 'E-mail',
      horarioPreferencial: 'Manhã (8h às 12h)'
    },
    fotoUrl: '/lovable-uploads/03f381cf-1670-41a0-b08a-e5cd586b9318.png',
    lastUpdated: new Date('2024-01-13T09:20:00'),
    aceiteTermos: true,
    isActive: true,
    role: 'user'
  },
  {
    id: '4',
    userId: '5',
    name: 'Hiroshi Tanaka Yamamoto',
    matricula: 'MPRJ12348',
    cargo: ['Analista'],
    funcao: ['Diretor'],
    unidade: ['Diretoria de Tecnologia da Informação'],
    telefone: '(21) 99999-3456',
    email: 'hiroshi.yamamoto@mprj.mp.br',
    biografia: 'Diretor de TI com formação em Engenharia de Software e vasta experiência em transformação digital. Responsável pela modernização tecnológica do MPRJ.',
    areasConhecimento: ['Tecnologia da Informação e Comunicação (TIC)', 'Inteligência Artificial', 'Ciência de Dados e Business Intelligence', 'Segurança da Informação'],
    especializacoes: 'Mestrado em Engenharia de Software pela COPPE/UFRJ, Certificação em Cloud Computing',
    projetos: [
      {
        nome: 'MPRJ Digital 2024',
        dataInicio: new Date('2023-01-01'),
        observacoes: 'Projeto de digitalização completa dos processos do MPRJ'
      },
      {
        nome: 'Sistema de IA para Análise Documental',
        dataInicio: new Date('2023-09-01'),
        observacoes: 'Implementação de IA para análise automatizada de documentos'
      }
    ],
    temasInteresse: ['Inteligência Artificial', 'Machine Learning', 'Cloud Computing', 'DevOps', 'Cybersecurity'],
    formacaoAcademica: [
      {
        nivel: 'Mestrado',
        instituicao: 'COPPE/UFRJ',
        curso: 'Engenharia de Software',
        ano: 2015
      },
      {
        nivel: 'Graduação',
        instituicao: 'UFRJ',
        curso: 'Ciência da Computação',
        ano: 2010
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '8 anos',
        experienciaAnterior: 'Arquiteto de Software em multinacional de tecnologia por 6 anos'
      }
    ],
    idiomas: ['Português', 'Inglês', 'Japonês', 'Mandarim'],
    disponibilidade: {
      tipoColaboracao: ['Consultoria interna', 'Capacitações/tutoria', 'Formação de equipes'],
      disponibilidadeEstimada: '6h a 8h/semana'
    },
    contato: {
      formaContato: 'Microsoft Teams',
      horarioPreferencial: 'Flexível'
    },
    fotoUrl: '/lovable-uploads/0d8bd3ce-b725-4f1e-8378-bf3ecef1051e.png',
    lastUpdated: new Date('2024-01-12T11:10:00'),
    aceiteTermos: true,
    isActive: true,
    role: 'user'
  },
  {
    id: '5',
    userId: '6',
    name: 'Gabriel Rodrigues Costa',
    matricula: 'MPRJ12349',
    cargo: ['Promotor de Justiça'],
    funcao: [],
    unidade: ['Promotoria de Justiça de Defesa do Meio Ambiente'],
    telefone: '(21) 99999-7890',
    email: 'gabriel.costa@mprj.mp.br',
    biografia: 'Promotor de Justiça especializado em direito ambiental e sustentabilidade. Atua na defesa do meio ambiente e recursos naturais do Estado do Rio de Janeiro.',
    areasConhecimento: ['Direito Ambiental', 'Sustentabilidade', 'Recursos Hídricos', 'Mudanças Climáticas'],
    especializacoes: 'Mestrado em Direito Ambiental pela UERJ, Especialização em Gestão Ambiental',
    projetos: [
      {
        nome: 'Proteção da Mata Atlântica Fluminense',
        dataInicio: new Date('2023-04-01'),
        observacoes: 'Combate ao desmatamento e proteção de áreas de preservação'
      },
      {
        nome: 'Águas Limpas RJ',
        dataInicio: new Date('2023-07-15'),
        observacoes: 'Fiscalização da qualidade da água em rios e lagoas'
      }
    ],
    temasInteresse: ['Conservação Ambiental', 'Energia Renovável', 'Gestão de Resíduos', 'Educação Ambiental'],
    formacaoAcademica: [
      {
        nivel: 'Mestrado',
        instituicao: 'UERJ',
        curso: 'Direito Ambiental',
        ano: 2016
      },
      {
        nivel: 'Graduação',
        instituicao: 'UFRJ',
        curso: 'Direito',
        ano: 2013
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '9 anos',
        experienciaAnterior: 'Consultor ambiental por 2 anos'
      }
    ],
    idiomas: ['Português', 'Inglês', 'Espanhol'],
    disponibilidade: {
      tipoColaboracao: ['Consultoria interna', 'Capacitações/tutoria'],
      disponibilidadeEstimada: '3h a 5h/semana'
    },
    contato: {
      formaContato: 'E-mail',
      horarioPreferencial: 'Manhã (8h às 12h)'
    },
    fotoUrl: '/lovable-uploads/43e938c7-f896-452b-a284-3c9df63f213f.png',
    lastUpdated: new Date('2024-01-11T16:20:00'),
    aceiteTermos: true,
    isActive: true,
    role: 'user'
  },
  {
    id: '6',
    userId: '7',
    name: 'Carolina Ferreira Alves',
    matricula: 'MPRJ12350',
    cargo: ['Técnico'],
    funcao: ['Gerente'],
    unidade: ['Gerência de Comunicação Social'],
    telefone: '(21) 99999-4567',
    email: 'carolina.alves@mprj.mp.br',
    biografia: 'Gerente de Comunicação Social com formação em Jornalismo e especialização em comunicação pública. Responsável pela estratégia de comunicação institucional do MPRJ.',
    areasConhecimento: ['Comunicação Social', 'Jornalismo', 'Marketing Digital', 'Relações Públicas'],
    especializacoes: 'MBA em Comunicação Estratégica pela ESPM, Especialização em Marketing Digital',
    projetos: [
      {
        nome: 'Nova Identidade Visual MPRJ',
        dataInicio: new Date('2023-05-01'),
        observacoes: 'Renovação da identidade visual e comunicação institucional'
      },
      {
        nome: 'MPRJ nas Redes Sociais',
        dataInicio: new Date('2023-03-15'),
        observacoes: 'Estratégia de presença digital e engajamento'
      }
    ],
    temasInteresse: ['Comunicação Digital', 'Transparência Pública', 'Storytelling', 'Gestão de Crise'],
    formacaoAcademica: [
      {
        nivel: 'MBA',
        instituicao: 'ESPM',
        curso: 'Comunicação Estratégica',
        ano: 2019
      },
      {
        nivel: 'Graduação',
        instituicao: 'PUC-Rio',
        curso: 'Jornalismo',
        ano: 2014
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '6 anos',
        experienciaAnterior: 'Jornalista em veículos de comunicação por 4 anos'
      }
    ],
    idiomas: ['Português', 'Inglês', 'Francês'],
    disponibilidade: {
      tipoColaboracao: ['Consultoria interna', 'Capacitações/tutoria', 'Grupos de trabalho'],
      disponibilidadeEstimada: '4h a 6h/semana'
    },
    contato: {
      formaContato: 'Microsoft Teams',
      horarioPreferencial: 'Tarde (13h às 17h)'
    },
    fotoUrl: '/lovable-uploads/6af4f8d2-76c4-4873-9922-c0f6cfe3d6d6.png',
    lastUpdated: new Date('2024-01-10T10:30:00'),
    aceiteTermos: true,
    isActive: true,
    role: 'user'
  },
  {
    id: '7',
    userId: '8',
    name: 'Marcus Thompson Johnson',
    matricula: 'MPRJ12351',
    cargo: ['Assessor'],
    funcao: ['Chefe'],
    unidade: ['Assessoria Internacional'],
    telefone: '(21) 99999-8901',
    email: 'marcus.johnson@mprj.mp.br',
    biografia: 'Chefe da Assessoria Internacional com formação em Relações Internacionais. Especialista em cooperação jurídica internacional e acordos multilaterais.',
    areasConhecimento: ['Relações Internacionais', 'Cooperação Jurídica Internacional', 'Direito Internacional', 'Diplomacia'],
    especializacoes: 'Mestrado em Relações Internacionais pela UnB, LLM em Direito Internacional pela NYU',
    projetos: [
      {
        nome: 'Acordo de Cooperação com Mercosul',
        dataInicio: new Date('2023-02-01'),
        observacoes: 'Negociação de acordos de cooperação jurídica regional'
      },
      {
        nome: 'Programa de Intercâmbio MP Brasil-Europa',
        dataInicio: new Date('2023-06-01'),
        observacoes: 'Intercâmbio de boas práticas com MPs europeus'
      }
    ],
    temasInteresse: ['Cooperação Internacional', 'Combate à Corrupção Transnacional', 'Direitos Humanos Globais'],
    formacaoAcademica: [
      {
        nivel: 'LLM',
        instituicao: 'NYU - Estados Unidos',
        curso: 'Direito Internacional',
        ano: 2018
      },
      {
        nivel: 'Mestrado',
        instituicao: 'UnB',
        curso: 'Relações Internacionais',
        ano: 2015
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '7 anos',
        experienciaAnterior: 'Diplomata no Itamaraty por 5 anos'
      }
    ],
    idiomas: ['Português', 'Inglês', 'Espanhol', 'Francês', 'Alemão'],
    disponibilidade: {
      tipoColaboracao: ['Consultoria interna', 'Capacitações/tutoria'],
      disponibilidadeEstimada: '3h a 5h/semana'
    },
    contato: {
      formaContato: 'E-mail',
      horarioPreferencial: 'Manhã (9h às 12h)'
    },
    fotoUrl: '/lovable-uploads/9d9e158c-6b10-4a90-9722-25ab82516e04.png',
    lastUpdated: new Date('2024-01-09T14:15:00'),
    aceiteTermos: true,
    isActive: true,
    role: 'user'
  },
  {
    id: '8',
    userId: '9',
    name: 'Diego Martinez Fernandez',
    matricula: 'MPRJ12352',
    cargo: ['Auxiliar'],
    funcao: ['Secretário'],
    unidade: ['Secretaria de Planejamento Estratégico'],
    telefone: '(21) 99999-2345',
    email: 'diego.martinez@mprj.mp.br',
    biografia: 'Secretário de Planejamento Estratégico com formação em Administração Pública. Especialista em gestão de projetos e indicadores de performance.',
    areasConhecimento: ['Administração Pública', 'Planejamento Estratégico', 'Gestão de Projetos', 'Indicadores de Performance'],
    especializacoes: 'MBA em Gestão de Projetos pela FGV, Certificação PMP',
    projetos: [
      {
        nome: 'Sistema de Monitoramento Estratégico',
        dataInicio: new Date('2023-01-15'),
        observacoes: 'Implementação de dashboard de indicadores estratégicos'
      }
    ],
    temasInteresse: ['Business Intelligence', 'Análise de Dados', 'Gestão por Resultados', 'Inovação Pública'],
    formacaoAcademica: [
      {
        nivel: 'MBA',
        instituicao: 'FGV',
        curso: 'Gestão de Projetos',
        ano: 2020
      },
      {
        nivel: 'Graduação',
        instituicao: 'UERJ',
        curso: 'Administração Pública',
        ano: 2017
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '5 anos',
        experienciaAnterior: 'Analista de projetos em consultoria por 3 anos'
      }
    ],
    idiomas: ['Português', 'Espanhol', 'Inglês'],
    disponibilidade: {
      tipoColaboracao: ['Grupos de trabalho', 'Consultoria interna'],
      disponibilidadeEstimada: '2h a 4h/semana'
    },
    contato: {
      formaContato: 'Microsoft Teams',
      horarioPreferencial: 'Tarde (14h às 18h)'
    },
    fotoUrl: '/lovable-uploads/82b4eaed-3b82-4477-9ce5-bf0e9ef57f64.png',
    lastUpdated: new Date('2024-01-08T09:45:00'),
    aceiteTermos: true,
    isActive: true,
    role: 'user'
  },
  {
    id: '9',
    userId: '10',
    name: 'Fatima Al-Zahra Hassan',
    matricula: 'MPRJ12353',
    cargo: ['Residente'],
    funcao: [],
    unidade: ['Centro de Estudos e Aperfeiçoamento'],
    telefone: '(21) 99999-6789',
    email: 'fatima.hassan@mprj.mp.br',
    biografia: 'Médica residente especializada em medicina legal e perícia médica. Contribui para a modernização dos procedimentos periciais do MPRJ.',
    areasConhecimento: ['Medicina Legal', 'Perícia Médica', 'Toxicologia Forense', 'Antropologia Forense'],
    especializacoes: 'Residência em Medicina Legal pela UFRJ, Especialização em Toxicologia Forense',
    projetos: [
      {
        nome: 'Protocolos Digitais de Perícia',
        dataInicio: new Date('2023-08-01'),
        observacoes: 'Digitalização e padronização de laudos periciais'
      }
    ],
    temasInteresse: ['Medicina Forense Digital', 'Análise de DNA', 'Perícia Criminal', 'Inovação Médica'],
    formacaoAcademica: [
      {
        nivel: 'Residência',
        instituicao: 'UFRJ',
        curso: 'Medicina Legal',
        ano: 2024
      },
      {
        nivel: 'Graduação',
        instituicao: 'UFRJ',
        curso: 'Medicina',
        ano: 2021
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '2 anos',
        experienciaAnterior: 'Médica em hospital público por 1 ano'
      }
    ],
    idiomas: ['Português', 'Árabe', 'Inglês', 'Francês'],
    disponibilidade: {
      tipoColaboracao: ['Consultoria interna', 'Capacitações/tutoria'],
      disponibilidadeEstimada: '3h a 5h/semana'
    },
    contato: {
      formaContato: 'E-mail',
      horarioPreferencial: 'Manhã (7h às 11h)'
    },
    fotoUrl: '/lovable-uploads/b8f7d9cb-14c5-47d8-8fda-7d9e25031d33.png',
    lastUpdated: new Date('2024-01-07T11:30:00'),
    aceiteTermos: true,
    isActive: true,
    role: 'user'
  },
  {
    id: '10',
    userId: '11',
    name: 'Rajesh Kumar Patel',
    matricula: 'MPRJ12354',
    cargo: ['Cedido (Superior)'],
    funcao: ['Supervisor'],
    unidade: ['Supervisão de Análise Econômica'],
    telefone: '(21) 99999-1357',
    email: 'rajesh.patel@mprj.mp.br',
    biografia: 'Economista cedido ao MPRJ, especialista em análise econômica de crimes financeiros e lavagem de dinheiro. Supervisor da equipe de análise econômica.',
    areasConhecimento: ['Economia', 'Análise Financeira', 'Crimes Econômicos', 'Lavagem de Dinheiro'],
    especializacoes: 'Doutorado em Economia pela LSE (Reino Unido), CFA (Chartered Financial Analyst)',
    projetos: [
      {
        nome: 'Sistema de Detecção de Lavagem de Dinheiro',
        dataInicio: new Date('2023-03-01'),
        observacoes: 'Desenvolvimento de algoritmos para detecção de operações suspeitas'
      },
      {
        nome: 'Análise Econômica de Grandes Operações',
        dataInicio: new Date('2023-01-01'),
        observacoes: 'Análise econômica de grandes esquemas criminosos'
      }
    ],
    temasInteresse: ['FinTech', 'Blockchain', 'Criptomoedas', 'Compliance Financeiro', 'Big Data'],
    formacaoAcademica: [
      {
        nivel: 'Doutorado',
        instituicao: 'LSE - Reino Unido',
        curso: 'Economia',
        ano: 2016
      },
      {
        nivel: 'Mestrado',
        instituicao: 'Mumbai University - Índia',
        curso: 'Economia Aplicada',
        ano: 2012
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '4 anos',
        experienciaAnterior: 'Analista sênior em banco de investimento por 8 anos, Professor universitário por 3 anos'
      }
    ],
    idiomas: ['Português', 'Hindi', 'Inglês', 'Gujarati', 'Espanhol'],
    disponibilidade: {
      tipoColaboracao: ['Consultoria interna', 'Capacitações/tutoria', 'Formação de equipes'],
      disponibilidadeEstimada: '6h a 8h/semana'
    },
    contato: {
      formaContato: 'Microsoft Teams',
      horarioPreferencial: 'Manhã (8h às 12h)'
    },
    fotoUrl: '/lovable-uploads/f9d90feb-9994-4c95-a03e-ac72dc5c3985.png',
    lastUpdated: new Date('2024-01-06T13:20:00'),
    aceiteTermos: true,
    isActive: true,
    role: 'user'
  }
];
