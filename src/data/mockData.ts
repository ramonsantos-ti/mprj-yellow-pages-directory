
import { User, Profile } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'usuário0001',
    password: 'usu@rio0001',
    name: 'Dr. Carlos Eduardo Silva',
    matricula: '123001',
    role: 'user'
  },
  {
    id: '2',
    username: 'usuário0002',
    password: 'usu@rio0002',
    name: 'Dra. Ana Paula Santos',
    matricula: '123002',
    role: 'admin'
  },
  {
    id: '3',
    username: 'usuário0003',
    password: 'usu@rio0003',
    name: 'Dr. Roberto Mendes',
    matricula: '123003',
    role: 'user'
  },
  {
    id: '4',
    username: 'usuário0004',
    password: 'usu@rio0004',
    name: 'Dra. Mariana Costa',
    matricula: '123004',
    role: 'user'
  },
  {
    id: '5',
    username: 'usuário0005',
    password: 'usu@rio0005',
    name: 'Dr. José Fernando Lima',
    matricula: '123005',
    role: 'user'
  },
  {
    id: '6',
    username: 'usuário0006',
    password: 'usu@rio0006',
    name: 'Dra. Fernanda Oliveira',
    matricula: '123006',
    role: 'user'
  },
  {
    id: '7',
    username: 'usuário0007',
    password: 'usu@rio0007',
    name: 'Maria das Graças Pereira',
    matricula: '123007',
    role: 'user'
  },
  {
    id: '8',
    username: 'usuário0008',
    password: 'usu@rio0008',
    name: 'João Carlos Rodrigues',
    matricula: '123008',
    role: 'user'
  },
  {
    id: '9',
    username: 'usuário0009',
    password: 'usu@rio0009',
    name: 'Luciana Almeida Santos',
    matricula: '123009',
    role: 'user'
  },
  {
    id: '10',
    username: 'usuário0010',
    password: 'usu@rio0010',
    name: 'Pedro Henrique Souza',
    matricula: '123010',
    role: 'user'
  }
];

export const mockProfiles: Profile[] = [
  {
    id: '1',
    userId: '1',
    name: 'Dr. Carlos Eduardo Silva',
    matricula: '123001',
    cargo: ['Procurador de Justiça'],
    unidade: ['Procuradoria Geral de Justiça'],
    email: 'carlos.silva@mprj.mp.br',
    telefone: '(21) 98765-4321',
    biografia: 'Procurador com 15 anos de experiência em Direito Penal e Constitucional.',
    areasConhecimento: ['Direito Penal', 'Direito Constitucional', 'Direitos Humanos'],
    especializacoes: 'Especialista em crimes contra a administração pública e lavagem de dinheiro',
    projetos: [
      {
        nome: 'Combate à Corrupção',
        dataInicio: new Date('2023-01-15'),
        dataFim: new Date('2023-12-15'),
        observacoes: 'Coordenação de força-tarefa'
      }
    ],
    temasInteresse: ['Direito Penal', 'Criminologia e Política Criminal'],
    habilidadesTecnicas: ['Análise de Dados', 'Microsoft Office', 'Gestão de Projetos'],
    habilidadesComportamentais: ['Liderança', 'Comunicação', 'Pensamento Crítico'],
    formacaoAcademica: [
      {
        nivel: 'Doutorado',
        instituicao: 'UERJ',
        curso: 'Direito Penal',
        ano: 2010
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '15 anos',
        experienciaAnterior: 'Advogado criminalista por 5 anos',
        projetosInternos: 'Operação Lava Jato - RJ',
        publicacoes: '3 artigos sobre crimes financeiros'
      }
    ],
    idiomas: ['Inglês', 'Espanhol'],
    disponibilidade: {
      tipoColaboracao: ['Consultoria interna', 'Grupos de trabalho'],
      disponibilidadeEstimada: '2h a 4h/semana'
    },
    contato: {
      formaContato: 'E-mail',
      horarioPreferencial: '14h às 17h'
    },
    linkCurriculo: 'http://lattes.cnpq.br/carlos.silva',
    lastUpdated: new Date('2024-05-29'),
    aceiteTermos: true
  },
  {
    id: '2',
    userId: '2',
    name: 'Dra. Ana Paula Santos',
    matricula: '123002',
    cargo: ['Promotora de Justiça'],
    unidade: ['Promotoria da Infância e Juventude'],
    email: 'ana.santos@mprj.mp.br',
    biografia: 'Promotora especializada em direitos da criança e adolescente.',
    areasConhecimento: ['Direito da Infância e Juventude', 'Direitos Humanos'],
    projetos: [
      {
        nome: 'Proteção Integral',
        dataInicio: new Date('2023-03-01'),
        observacoes: 'Programa de proteção social'
      }
    ],
    temasInteresse: ['Direito da Infância e Juventude'],
    habilidadesTecnicas: ['Microsoft Office', 'Power BI'],
    habilidadesComportamentais: ['Empatia', 'Comunicação', 'Trabalho em Equipe'],
    formacaoAcademica: [
      {
        nivel: 'Mestrado',
        instituicao: 'PUC-RJ',
        curso: 'Direitos Fundamentais',
        ano: 2015
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '8 anos',
        projetosInternos: 'Coordenação do programa Escola sem Violência'
      }
    ],
    idiomas: ['Inglês'],
    disponibilidade: {
      tipoColaboracao: ['Capacitações/tutoria', 'Mentoria'],
      disponibilidadeEstimada: 'Até 2h/semana'
    },
    contato: {
      formaContato: 'Teams'
    },
    lastUpdated: new Date('2024-05-28'),
    aceiteTermos: true
  },
  {
    id: '3',
    userId: '3',
    name: 'Dr. Roberto Mendes',
    matricula: '123003',
    cargo: ['Procurador de Justiça'],
    unidade: ['1ª Promotoria de Justiça Criminal'],
    email: 'roberto.mendes@mprj.mp.br',
    telefone: '(21) 99876-5432',
    biografia: 'Procurador com vasta experiência em direito processual penal.',
    areasConhecimento: ['Direito Processual Penal', 'Direito Penal'],
    especializacoes: 'Crimes organizados e tráfico de drogas',
    projetos: [],
    temasInteresse: ['Direito Processual Penal', 'Criminologia e Política Criminal'],
    habilidadesTecnicas: ['Análise de Dados', 'SQL'],
    habilidadesComportamentais: ['Resolução de Problemas', 'Tomada de Decisão'],
    formacaoAcademica: [
      {
        nivel: 'Especialização',
        instituicao: 'FGV',
        curso: 'Direito Processual Penal',
        ano: 2012
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '12 anos',
        experienciaAnterior: 'Delegado de Polícia Civil',
        projetosInternos: 'Operação Calicute'
      }
    ],
    idiomas: ['Inglês'],
    disponibilidade: {
      tipoColaboracao: ['Consultoria interna'],
      disponibilidadeEstimada: 'Sob demanda (caso a caso)'
    },
    contato: {
      formaContato: 'Telefone',
      horarioPreferencial: '9h às 12h'
    },
    lastUpdated: new Date('2024-05-27'),
    aceiteTermos: true
  },
  {
    id: '4',
    userId: '4',
    name: 'Dra. Mariana Costa',
    matricula: '123004',
    cargo: ['Promotora de Justiça'],
    unidade: ['Promotoria do Meio Ambiente'],
    email: 'mariana.costa@mprj.mp.br',
    biografia: 'Promotora especialista em direito ambiental e urbanístico.',
    areasConhecimento: ['Direito Ambiental', 'Direito Urbanístico'],
    projetos: [
      {
        nome: 'Rio Sustentável',
        dataInicio: new Date('2023-06-01'),
        observacoes: 'Programa de sustentabilidade urbana'
      }
    ],
    temasInteresse: ['Direito Ambiental', 'Sustentabilidade e Responsabilidade Socioambiental'],
    habilidadesTecnicas: ['GIS', 'Microsoft Office', 'AutoCAD'],
    habilidadesComportamentais: ['Inovação', 'Proatividade', 'Organização'],
    formacaoAcademica: [
      {
        nivel: 'Doutorado',
        instituicao: 'UFRJ',
        curso: 'Direito Ambiental',
        ano: 2018
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '6 anos',
        publicacoes: 'Livro sobre licenciamento ambiental'
      }
    ],
    idiomas: ['Inglês', 'Francês'],
    disponibilidade: {
      tipoColaboracao: ['Grupos de trabalho', 'Capacitações/tutoria'],
      disponibilidadeEstimada: '2h a 4h/semana'
    },
    contato: {
      formaContato: 'E-mail'
    },
    lastUpdated: new Date('2024-05-26'),
    aceiteTermos: true
  },
  {
    id: '5',
    userId: '5',
    name: 'Dr. José Fernando Lima',
    matricula: '123005',
    cargo: ['Promotor de Justiça'],
    unidade: ['Promotoria do Consumidor'],
    email: 'jose.lima@mprj.mp.br',
    biografia: 'Promotor especializado em defesa do consumidor.',
    areasConhecimento: ['Direito do Consumidor', 'Direito Civil'],
    projetos: [],
    temasInteresse: ['Direito do Consumidor'],
    habilidadesTecnicas: ['Microsoft Office', 'Excel Avançado'],
    habilidadesComportamentais: ['Negociação', 'Relacionamento Interpessoal'],
    formacaoAcademica: [
      {
        nivel: 'Mestrado',
        instituicao: 'UERJ',
        curso: 'Direito Civil',
        ano: 2014
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '10 anos',
        projetosInternos: 'Projeto Consumidor Consciente'
      }
    ],
    idiomas: ['Inglês'],
    disponibilidade: {
      tipoColaboracao: ['Consultoria interna', 'Mentoria'],
      disponibilidadeEstimada: 'Até 2h/semana'
    },
    contato: {
      formaContato: 'E-mail'
    },
    lastUpdated: new Date('2024-05-25'),
    aceiteTermos: true
  },
  {
    id: '6',
    userId: '6',
    name: 'Dra. Fernanda Oliveira',
    matricula: '123006',
    cargo: ['Promotora de Justiça'],
    unidade: ['Promotoria Cível'],
    email: 'fernanda.oliveira@mprj.mp.br',
    biografia: 'Promotora com experiência em questões cíveis e administrativas.',
    areasConhecimento: ['Direito Civil', 'Direito Administrativo'],
    projetos: [],
    temasInteresse: ['Direito Civil', 'Direito Administrativo'],
    habilidadesTecnicas: ['Microsoft Office', 'Gestão de Processos'],
    habilidadesComportamentais: ['Organização', 'Ética Profissional'],
    formacaoAcademica: [
      {
        nivel: 'Especialização',
        instituicao: 'EMERJ',
        curso: 'Direito Civil',
        ano: 2016
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '7 anos'
      }
    ],
    idiomas: ['Inglês'],
    disponibilidade: {
      tipoColaboracao: ['Consultoria interna'],
      disponibilidadeEstimada: 'Sob demanda (caso a caso)'
    },
    contato: {
      formaContato: 'E-mail'
    },
    lastUpdated: new Date('2024-05-24'),
    aceiteTermos: true
  },
  {
    id: '7',
    userId: '7',
    name: 'Maria das Graças Pereira',
    matricula: '123007',
    cargo: ['Servidor Efetivo', 'Analista'],
    unidade: ['Departamento de RH'],
    email: 'maria.pereira@mprj.mp.br',
    telefone: '(21) 97654-3210',
    biografia: 'Analista de Recursos Humanos com especialização em gestão de pessoas.',
    areasConhecimento: ['Gestão de Pessoas / Recursos Humanos', 'Psicologia Organizacional'],
    projetos: [
      {
        nome: 'Programa de Qualidade de Vida',
        dataInicio: new Date('2023-01-01'),
        observacoes: 'Coordenação de ações de bem-estar'
      }
    ],
    temasInteresse: ['Gestão de Pessoas / Recursos Humanos', 'Qualidade de Vida no Trabalho'],
    habilidadesTecnicas: ['Excel Avançado', 'Power BI', 'SPSS'],
    habilidadesComportamentais: ['Empatia', 'Liderança', 'Comunicação'],
    formacaoAcademica: [
      {
        nivel: 'Mestrado',
        instituicao: 'UFRJ',
        curso: 'Psicologia Organizacional',
        ano: 2019
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '5 anos',
        experienciaAnterior: 'Consultoria em RH',
        projetosInternos: 'Implantação do sistema de avaliação de desempenho'
      }
    ],
    idiomas: ['Inglês', 'Espanhol'],
    disponibilidade: {
      tipoColaboracao: ['Capacitações/tutoria', 'Grupos de trabalho'],
      disponibilidadeEstimada: '2h a 4h/semana'
    },
    contato: {
      formaContato: 'Teams',
      horarioPreferencial: '8h às 17h'
    },
    lastUpdated: new Date('2024-05-23'),
    aceiteTermos: true
  },
  {
    id: '8',
    userId: '8',
    name: 'João Carlos Rodrigues',
    matricula: '123008',
    cargo: ['Servidor Efetivo', 'Técnico'],
    unidade: ['Departamento de TI'],
    email: 'joao.rodrigues@mprj.mp.br',
    biografia: 'Técnico em TI especializado em infraestrutura e segurança da informação.',
    areasConhecimento: ['Tecnologia da Informação e Comunicação (TIC)', 'Segurança da Informação'],
    projetos: [],
    temasInteresse: ['Segurança da Informação', 'Infraestrutura e Suporte Técnico em TI'],
    habilidadesTecnicas: ['Python', 'SQL', 'Linux', 'Windows Server'],
    habilidadesComportamentais: ['Resolução de Problemas', 'Adaptabilidade'],
    formacaoAcademica: [
      {
        nivel: 'Graduação',
        instituicao: 'UFF',
        curso: 'Sistemas de Informação',
        ano: 2017
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '4 anos',
        experienciaAnterior: 'Suporte técnico em empresa privada'
      }
    ],
    idiomas: ['Inglês'],
    disponibilidade: {
      tipoColaboracao: ['Consultoria interna', 'Grupos de trabalho'],
      disponibilidadeEstimada: 'Até 2h/semana'
    },
    contato: {
      formaContato: 'E-mail'
    },
    lastUpdated: new Date('2024-05-22'),
    aceiteTermos: true
  },
  {
    id: '9',
    userId: '9',
    name: 'Luciana Almeida Santos',
    matricula: '123009',
    cargo: ['Servidor Comissionado', 'Assessor'],
    unidade: ['Comunicação Social'],
    email: 'luciana.santos@mprj.mp.br',
    telefone: '(21) 96543-2109',
    biografia: 'Assessora de Comunicação Social com experiência em marketing institucional.',
    areasConhecimento: ['Comunicação Social', 'Marketing Institucional'],
    projetos: [
      {
        nome: 'Campanha de Transparência',
        dataInicio: new Date('2023-04-01'),
        observacoes: 'Coordenação de campanha publicitária'
      }
    ],
    temasInteresse: ['Comunicação Social', 'Marketing Institucional'],
    habilidadesTecnicas: ['Photoshop', 'Illustrator', 'WordPress', 'SEO'],
    habilidadesComportamentais: ['Criatividade', 'Comunicação', 'Inovação'],
    formacaoAcademica: [
      {
        nivel: 'Especialização',
        instituicao: 'PUC-RJ',
        curso: 'Marketing Digital',
        ano: 2020
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '3 anos',
        experienciaAnterior: 'Agência de publicidade',
        projetosInternos: 'Reformulação do site institucional'
      }
    ],
    idiomas: ['Inglês', 'Espanhol'],
    disponibilidade: {
      tipoColaboracao: ['Capacitações/tutoria', 'Consultoria interna'],
      disponibilidadeEstimada: '2h a 4h/semana'
    },
    contato: {
      formaContato: 'Teams'
    },
    lastUpdated: new Date('2024-05-21'),
    aceiteTermos: true
  },
  {
    id: '10',
    userId: '10',
    name: 'Pedro Henrique Souza',
    matricula: '123010',
    cargo: ['Servidor Comissionado', 'Coordenador'],
    unidade: ['Controladoria'],
    email: 'pedro.souza@mprj.mp.br',
    biografia: 'Coordenador de Controladoria com experiência em auditoria e compliance.',
    areasConhecimento: ['Controladoria e Auditoria', 'Compliance e Integridade'],
    projetos: [],
    temasInteresse: ['Controladoria e Auditoria', 'Compliance e Integridade'],
    habilidadesTecnicas: ['Excel Avançado', 'Power BI', 'SAP', 'Tableau'],
    habilidadesComportamentais: ['Ética Profissional', 'Pensamento Crítico', 'Organização'],
    formacaoAcademica: [
      {
        nivel: 'MBA',
        instituicao: 'FGV',
        curso: 'Controladoria e Finanças',
        ano: 2021
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '2 anos',
        experienciaAnterior: 'Auditor em empresa de consultoria',
        projetosInternos: 'Implementação de controles internos'
      }
    ],
    idiomas: ['Inglês'],
    disponibilidade: {
      tipoColaboracao: ['Consultoria interna', 'Grupos de trabalho'],
      disponibilidadeEstimada: 'Sob demanda (caso a caso)'
    },
    contato: {
      formaContato: 'E-mail',
      horarioPreferencial: '9h às 18h'
    },
    lastUpdated: new Date('2024-05-20'),
    aceiteTermos: true
  }
];
