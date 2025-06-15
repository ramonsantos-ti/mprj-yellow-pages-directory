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
  },
  {
    id: '12',
    username: 'usuario11',
    password: 'usuario11',
    name: 'Alexandre Pereira Santos',
    matricula: 'MPRJ12355',
    role: 'user',
    isActive: true,
    lastLogin: new Date('2024-01-04T13:20:00')
  },
  {
    id: '13',
    username: 'usuario12',
    password: 'usuario12',
    name: 'Camila Rodriguez Lima',
    matricula: 'MPRJ12356',
    role: 'user',
    isActive: true,
    lastLogin: new Date('2024-01-03T10:15:00')
  },
  {
    id: '14',
    username: 'usuario13',
    password: 'usuario13',
    name: 'Fernando Almeida Junior',
    matricula: 'MPRJ12357',
    role: 'user',
    isActive: true,
    lastLogin: new Date('2024-01-02T16:30:00')
  },
  {
    id: '15',
    username: 'usuario14',
    password: 'usuario14',
    name: 'Priscila Washington Silva',
    matricula: 'MPRJ12358',
    role: 'user',
    isActive: true,
    lastLogin: new Date('2024-01-01T14:45:00')
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
  },
  {
    id: '11',
    userId: '12',
    name: 'Alexandre Pereira Santos',
    matricula: 'MPRJ12355',
    cargo: ['Promotor de Justiça'],
    funcao: ['Coordenador'],
    unidade: ['Coordenadoria de Segurança Pública e Investigação Penal'],
    telefone: '(21) 99999-4578',
    email: 'alexandre.santos@mprj.mp.br',
    biografia: 'Promotor de Justiça especializado em investigação criminal e segurança pública. Coordenador de operações complexas envolvendo crimes organizados e corrupção.',
    projetos: [
      {
        nome: 'Operação Transparência Total',
        dataInicio: new Date('2023-04-15'),
        observacoes: 'Investigação de esquema de corrupção em órgãos públicos estaduais'
      },
      {
        nome: 'Protocolo de Investigação Digital',
        dataInicio: new Date('2023-08-01'),
        observacoes: 'Desenvolvimento de novos métodos de investigação em crimes cibernéticos'
      }
    ],
    temasInteresse: ['Crimes Cibernéticos', 'Inteligência Criminal', 'Cooperação Policial', 'Justiça Criminal'],
    formacaoAcademica: [
      {
        nivel: 'Mestrado',
        instituicao: 'PUCRS',
        curso: 'Ciências Criminais',
        ano: 2011
      },
      {
        nivel: 'Graduação',
        instituicao: 'UERJ',
        curso: 'Direito',
        ano: 2008
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '14 anos',
        experienciaAnterior: 'Delegado de Polícia Civil por 2 anos'
      }
    ],
    idiomas: ['Português', 'Inglês', 'Espanhol'],
    disponibilidade: {
      tipoColaboracao: ['Consultoria interna', 'Capacitações/tutoria', 'Formação de equipes'],
      disponibilidadeEstimada: '5h a 7h/semana'
    },
    contato: {
      formaContato: 'E-mail',
      horarioPreferencial: 'Tarde (14h às 18h)'
    },
    fotoUrl: '/lovable-uploads/b1064d84-1199-4c7f-8a9d-79b5031fc937.png',
    lastUpdated: new Date('2024-01-04T15:30:00'),
    aceiteTermos: true,
    isActive: true,
    role: 'user'
  },
  {
    id: '12',
    userId: '13',
    name: 'Camila Rodriguez Lima',
    matricula: 'MPRJ12356',
    cargo: ['Analista'],
    funcao: ['Gerente'],
    unidade: ['Gerência de Recursos Humanos e Desenvolvimento Organizacional'],
    telefone: '(21) 99999-7845',
    email: 'camila.lima@mprj.mp.br',
    biografia: 'Gerente de RH com especialização em desenvolvimento organizacional e gestão de pessoas. Responsável por implementar políticas de desenvolvimento de carreira e bem-estar dos servidores.',
    projetos: [
      {
        nome: 'Programa Bem-Estar MPRJ',
        dataInicio: new Date('2023-03-01'),
        observacoes: 'Implementação de programa de qualidade de vida e saúde mental para servidores'
      },
      {
        nome: 'Plano de Carreira Digital',
        dataInicio: new Date('2023-07-01'),
        observacoes: 'Modernização dos processos de desenvolvimento profissional'
      }
    ],
    temasInteresse: ['Bem-estar no Trabalho', 'Liderança', 'Diversidade e Inclusão', 'Gestão de Talentos'],
    formacaoAcademica: [
      {
        nivel: 'MBA',
        instituicao: 'FGV',
        curso: 'Gestão de Pessoas',
        ano: 2019
      },
      {
        nivel: 'Graduação',
        instituicao: 'UFRJ',
        curso: 'Psicologia',
        ano: 2015
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '7 anos',
        experienciaAnterior: 'Consultora em RH por 3 anos, Psicóloga organizacional por 2 anos'
      }
    ],
    idiomas: ['Português', 'Espanhol', 'Inglês', 'Francês'],
    disponibilidade: {
      tipoColaboracao: ['Consultoria interna', 'Mentoria', 'Capacitações/tutoria'],
      disponibilidadeEstimada: '4h a 6h/semana'
    },
    contato: {
      formaContato: 'Microsoft Teams',
      horarioPreferencial: 'Manhã (9h às 13h)'
    },
    fotoUrl: '/lovable-uploads/f1d5d368-675e-4753-aae3-b5ef9394f482.png',
    lastUpdated: new Date('2024-01-03T12:45:00'),
    aceiteTermos: true,
    isActive: true,
    role: 'user'
  },
  {
    id: '13',
    userId: '14',
    name: 'Fernando Almeida Junior',
    matricula: 'MPRJ12357',
    cargo: ['Procurador de Justiça'],
    funcao: ['Coordenador'],
    unidade: ['Procuradoria-Geral de Justiça Adjunta para Assuntos Administrativos'],
    telefone: '(21) 99999-9632',
    email: 'fernando.almeida@mprj.mp.br',
    biografia: 'Procurador de Justiça com mais de 25 anos de experiência no Ministério Público. Especialista em gestão administrativa e modernização de processos institucionais.',
    projetos: [
      {
        nome: 'Reforma Administrativa MPRJ 2024',
        dataInicio: new Date('2023-01-01'),
        observacoes: 'Reestruturação organizacional e otimização de processos administrativos'
      },
      {
        nome: 'Sistema Integrado de Gestão',
        dataInicio: new Date('2023-05-15'),
        observacoes: 'Implementação de ERP para integração de todos os sistemas administrativos'
      }
    ],
    temasInteresse: ['Eficiência Administrativa', 'Transformação Organizacional', 'Governança Pública', 'Sustentabilidade Institucional'],
    formacaoAcademica: [
      {
        nivel: 'Doutorado',
        instituicao: 'USP',
        curso: 'Direito Administrativo',
        ano: 2005
      },
      {
        nivel: 'MBA Executivo',
        instituicao: 'FGV',
        curso: 'Administração Pública',
        ano: 2012
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '25 anos',
        experienciaAnterior: 'Consultor em gestão pública por 3 anos'
      }
    ],
    idiomas: ['Português', 'Inglês', 'Espanhol', 'Francês'],
    disponibilidade: {
      tipoColaboracao: ['Consultoria interna', 'Mentoria', 'Formação de equipes'],
      disponibilidadeEstimada: 'Sob demanda (caso a caso)'
    },
    contato: {
      formaContato: 'E-mail',
      horarioPreferencial: 'Manhã (8h às 12h)'
    },
    fotoUrl: '/lovable-uploads/5edbd460-a227-4b80-968c-237a75d703f6.png',
    lastUpdated: new Date('2024-01-02T10:20:00'),
    aceiteTermos: true,
    isActive: true,
    role: 'user'
  },
  {
    id: '14',
    userId: '15',
    name: 'Priscila Washington Silva',
    matricula: 'MPRJ12358',
    cargo: ['Promotor de Justiça'],
    funcao: ['Coordenador'],
    unidade: ['Coordenadoria de Inclusão e Mobilização Sociais'],
    telefone: '(21) 99999-1593',
    email: 'priscila.silva@mprj.mp.br',
    biografia: 'Promotora de Justiça especializada em direitos sociais e inclusão. Coordenadora de programas de mobilização social e acesso à justiça para comunidades vulneráveis.',
    projetos: [
      {
        nome: 'MPRJ na Comunidade',
        dataInicio: new Date('2023-02-01'),
        observacoes: 'Programa de levar serviços do MP diretamente às comunidades carentes'
      },
      {
        nome: 'Justiça Digital Inclusiva',
        dataInicio: new Date('2023-09-01'),
        observacoes: 'Democratização do acesso digital aos serviços de justiça'
      }
    ],
    temasInteresse: ['Justiça Social', 'Direitos das Minorias', 'Políticas de Inclusão', 'Educação Popular'],
    formacaoAcademica: [
      {
        nivel: 'Mestrado',
        instituicao: 'PUC-Rio',
        curso: 'Direitos Humanos',
        ano: 2014
      },
      {
        nivel: 'Graduação',
        instituicao: 'UERJ',
        curso: 'Direito',
        ano: 2011
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '11 anos',
        experienciaAnterior: 'Advogada popular por 2 anos, Assistente social por 3 anos'
      }
    ],
    idiomas: ['Português', 'Inglês', 'Espanhol'],
    disponibilidade: {
      tipoColaboracao: ['Grupos de trabalho', 'Capacitações/tutoria', 'Mentoria'],
      disponibilidadeEstimada: '5h a 7h/semana'
    },
    contato: {
      formaContato: 'E-mail',
      horarioPreferencial: 'Tarde (13h às 17h)'
    },
    fotoUrl: '/lovable-uploads/2ab9f017-3f42-42f8-88ab-d8d97a349571.png',
    lastUpdated: new Date('2024-01-01T16:15:00'),
    aceiteTermos: true,
    isActive: true,
    role: 'user'
  }
];
