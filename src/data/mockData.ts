
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
  },
  {
    id: '6',
    username: 'carlos.lima',
    password: 'senha123',
    name: 'Carlos Lima Rodrigues',
    matricula: 'MPRJ12349',
    role: 'user',
    isActive: true,
    lastLogin: new Date('2024-01-10T08:30:00')
  },
  {
    id: '7',
    username: 'fernanda.souza',
    password: 'senha123',
    name: 'Fernanda Souza Martins',
    matricula: 'MPRJ12350',
    role: 'user',
    isActive: true,
    lastLogin: new Date('2024-01-09T15:20:00')
  },
  {
    id: '8',
    username: 'ricardo.alves',
    password: 'senha123',
    name: 'Ricardo Alves Pereira',
    matricula: 'MPRJ12351',
    role: 'user',
    isActive: true,
    lastLogin: new Date('2024-01-08T12:45:00')
  },
  {
    id: '9',
    username: 'patricia.rocha',
    password: 'senha123',
    name: 'Patrícia Rocha Silva',
    matricula: 'MPRJ12352',
    role: 'user',
    isActive: true,
    lastLogin: new Date('2024-01-07T09:15:00')
  },
  {
    id: '10',
    username: 'marcos.ferreira',
    password: 'senha123',
    name: 'Marcos Ferreira Santos',
    matricula: 'MPRJ12353',
    role: 'user',
    isActive: true,
    lastLogin: new Date('2024-01-06T14:30:00')
  }
];

// Mock profiles data with correct cargo and funcao values
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
      }
    ],
    temasInteresse: ['Combate à Corrupção', 'Inovação Tecnológica', 'Capacitação de Equipes'],
    formacaoAcademica: [
      {
        nivel: 'Graduação',
        instituicao: 'UERJ',
        curso: 'Direito',
        ano: 2010
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '12 anos',
        experienciaAnterior: 'Advogado criminalista por 3 anos'
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
    fotoUrl: '/lovable-uploads/2aae1185-7d52-453a-942a-1ef1876196b1.jpg',
    lastUpdated: new Date('2024-01-15T10:30:00'),
    aceiteTermos: true,
    isActive: true,
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
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '15 anos',
        experienciaAnterior: 'Setor privado - RH por 5 anos'
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
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '8 anos',
        experienciaAnterior: 'Desenvolvedor em startup de tecnologia por 4 anos'
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
    role: 'user'
  },
  {
    id: '4',
    userId: '5',
    name: 'Ana Costa Ferreira',
    matricula: 'MPRJ12348',
    cargo: ['Procurador de Justiça'],
    funcao: ['Diretor'],
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
        nivel: 'Doutorado',
        instituicao: 'UFRJ',
        curso: 'Direito Constitucional',
        ano: 2012
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '18 anos',
        experienciaAnterior: 'Professora universitária por 5 anos'
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
    fotoUrl: '/lovable-uploads/0727d710-b656-4d7c-860a-26b792b10a84.png',
    lastUpdated: new Date('2024-01-12T11:10:00'),
    aceiteTermos: true,
    isActive: true,
    role: 'user'
  },
  {
    id: '5',
    userId: '6',
    name: 'Carlos Lima Rodrigues',
    matricula: 'MPRJ12349',
    cargo: ['Assessor'],
    funcao: ['Chefe'],
    unidade: ['Gabinete da Procuradoria-Geral'],
    telefone: '(21) 99999-7890',
    email: 'carlos.lima@mprj.mp.br',
    biografia: 'Assessor jurídico especializado em direito constitucional e administrativo.',
    areasConhecimento: ['Direito Constitucional', 'Direito Administrativo'],
    especializacoes: 'Especialização em Direito Público',
    projetos: [
      {
        nome: 'Modernização Administrativa',
        dataInicio: new Date('2023-06-01'),
        observacoes: 'Projeto de otimização de processos administrativos'
      }
    ],
    temasInteresse: ['Gestão Pública', 'Modernização'],
    formacaoAcademica: [
      {
        nivel: 'Graduação',
        instituicao: 'UERJ',
        curso: 'Direito',
        ano: 2015
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '7 anos',
        experienciaAnterior: 'Advogado por 2 anos'
      }
    ],
    idiomas: ['Português', 'Inglês'],
    disponibilidade: {
      tipoColaboracao: ['Consultoria interna'],
      disponibilidadeEstimada: 'Até 2h/semana'
    },
    contato: {
      formaContato: 'E-mail',
      horarioPreferencial: 'Tarde (14h às 17h)'
    },
    fotoUrl: '/lovable-uploads/5785e26a-35aa-4cb7-8756-8076d98ebaf2.png',
    lastUpdated: new Date('2024-01-11T16:20:00'),
    aceiteTermos: true,
    isActive: true,
    role: 'user'
  },
  {
    id: '6',
    userId: '7',
    name: 'Fernanda Souza Martins',
    matricula: 'MPRJ12350',
    cargo: ['Auxiliar'],
    funcao: [],
    unidade: ['Secretaria Geral'],
    telefone: '(21) 99999-4567',
    email: 'fernanda.souza@mprj.mp.br',
    biografia: 'Auxiliar administrativa com experiência em atendimento ao público e gestão documental.',
    areasConhecimento: ['Administração Pública', 'Atendimento ao Público'],
    especializacoes: 'Curso Técnico em Administração',
    projetos: [
      {
        nome: 'Digitalização de Documentos',
        dataInicio: new Date('2023-09-01'),
        observacoes: 'Projeto de modernização do arquivo'
      }
    ],
    temasInteresse: ['Organização', 'Atendimento'],
    formacaoAcademica: [
      {
        nivel: 'Ensino Médio',
        instituicao: 'Colégio Estadual',
        curso: 'Ensino Médio',
        ano: 2018
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '4 anos'
      }
    ],
    idiomas: ['Português'],
    disponibilidade: {
      tipoColaboracao: ['Grupos de trabalho'],
      disponibilidadeEstimada: 'Até 2h/semana'
    },
    contato: {
      formaContato: 'Microsoft Teams',
      horarioPreferencial: 'Manhã (8h às 12h)'
    },
    fotoUrl: '/lovable-uploads/5c24956a-cc0f-460e-9fa1-1ffefd55e576.png',
    lastUpdated: new Date('2024-01-10T10:30:00'),
    aceiteTermos: true,
    isActive: true,
    role: 'user'
  },
  {
    id: '7',
    userId: '8',
    name: 'Ricardo Alves Pereira',
    matricula: 'MPRJ12351',
    cargo: ['Estagiário'],
    funcao: [],
    unidade: ['Promotoria de Justiça Cível'],
    telefone: '(21) 99999-8901',
    email: 'ricardo.alves@mprj.mp.br',
    biografia: 'Estagiário de Direito cursando o 8º período na UFRJ.',
    areasConhecimento: ['Direito Civil', 'Direito do Consumidor'],
    especializacoes: 'Graduando em Direito',
    projetos: [
      {
        nome: 'Projeto de Pesquisa - Direito do Consumidor',
        dataInicio: new Date('2024-01-01'),
        observacoes: 'Pesquisa sobre direitos do consumidor digital'
      }
    ],
    temasInteresse: ['Direito Digital', 'Proteção do Consumidor'],
    formacaoAcademica: [
      {
        nivel: 'Graduação',
        instituicao: 'UFRJ',
        curso: 'Direito',
        ano: 2025
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '1 ano'
      }
    ],
    idiomas: ['Português', 'Inglês'],
    disponibilidade: {
      tipoColaboracao: ['Grupos de trabalho', 'Pesquisa'],
      disponibilidadeEstimada: 'Até 4h/semana'
    },
    contato: {
      formaContato: 'E-mail',
      horarioPreferencial: 'Tarde (14h às 18h)'
    },
    fotoUrl: '/lovable-uploads/6e97a462-d2f9-47e7-a8bd-a0b982c06863.png',
    lastUpdated: new Date('2024-01-09T14:15:00'),
    aceiteTermos: true,
    isActive: true,
    role: 'user'
  },
  {
    id: '8',
    userId: '9',
    name: 'Patrícia Rocha Silva',
    matricula: 'MPRJ12352',
    cargo: ['Residente'],
    funcao: [],
    unidade: ['Centro de Estudos e Aperfeiçoamento'],
    telefone: '(21) 99999-2345',
    email: 'patricia.rocha@mprj.mp.br',
    biografia: 'Médica residente especializando-se em medicina legal.',
    areasConhecimento: ['Medicina Legal', 'Perícia Médica'],
    especializacoes: 'Residência em Medicina Legal',
    projetos: [
      {
        nome: 'Protocolo de Perícias Médicas',
        dataInicio: new Date('2023-07-01'),
        observacoes: 'Desenvolvimento de novos protocolos de perícia'
      }
    ],
    temasInteresse: ['Perícia Médica', 'Medicina Forense'],
    formacaoAcademica: [
      {
        nivel: 'Graduação',
        instituicao: 'UFRJ',
        curso: 'Medicina',
        ano: 2020
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '2 anos'
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
    fotoUrl: '/lovable-uploads/747bac21-c83d-48b7-b3e1-f71b3635d495.png',
    lastUpdated: new Date('2024-01-08T09:45:00'),
    aceiteTermos: true,
    isActive: true,
    role: 'user'
  },
  {
    id: '9',
    userId: '10',
    name: 'Marcos Ferreira Santos',
    matricula: 'MPRJ12353',
    cargo: ['Cedido (Superior)'],
    funcao: ['Gerente'],
    unidade: ['Diretoria de Planejamento'],
    telefone: '(21) 99999-6789',
    email: 'marcos.ferreira@mprj.mp.br',
    biografia: 'Servidor cedido com formação superior em Economia, atuando na área de planejamento estratégico.',
    areasConhecimento: ['Planejamento Estratégico', 'Economia', 'Gestão Pública'],
    especializacoes: 'MBA em Gestão Estratégica',
    projetos: [
      {
        nome: 'Plano Estratégico 2024-2027',
        dataInicio: new Date('2023-04-01'),
        observacoes: 'Elaboração do novo plano estratégico institucional'
      }
    ],
    temasInteresse: ['Planejamento', 'Estratégia', 'Indicadores'],
    formacaoAcademica: [
      {
        nivel: 'Graduação',
        instituicao: 'UERJ',
        curso: 'Economia',
        ano: 2010
      },
      {
        nivel: 'MBA',
        instituicao: 'FGV',
        curso: 'Gestão Estratégica',
        ano: 2015
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '6 anos',
        experienciaAnterior: 'Analista em empresa privada por 8 anos'
      }
    ],
    idiomas: ['Português', 'Inglês'],
    disponibilidade: {
      tipoColaboracao: ['Consultoria interna', 'Formação de equipes'],
      disponibilidadeEstimada: '2h a 4h/semana'
    },
    contato: {
      formaContato: 'Microsoft Teams',
      horarioPreferencial: 'Tarde (13h às 17h)'
    },
    fotoUrl: '/lovable-uploads/8de4caf3-e91d-4851-8767-4a49511d5ca8.png',
    lastUpdated: new Date('2024-01-07T11:30:00'),
    aceiteTermos: true,
    isActive: true,
    role: 'user'
  },
  {
    id: '10',
    userId: '11',
    name: 'Luciana Medeiros Costa',
    matricula: 'MPRJ12354',
    cargo: ['Cedido (Médio)'],
    funcao: ['Secretário'],
    unidade: ['Secretaria de Comunicação'],
    telefone: '(21) 99999-1357',
    email: 'luciana.medeiros@mprj.mp.br',
    biografia: 'Servidora cedida com ensino médio completo, atuando na área de comunicação institucional.',
    areasConhecimento: ['Comunicação Social', 'Relações Públicas'],
    especializacoes: 'Curso de Comunicação Institucional',
    projetos: [
      {
        nome: 'Campanha de Transparência',
        dataInicio: new Date('2023-10-01'),
        observacoes: 'Desenvolvimento de material de comunicação para transparência'
      }
    ],
    temasInteresse: ['Comunicação', 'Transparência', 'Redes Sociais'],
    formacaoAcademica: [
      {
        nivel: 'Ensino Médio',
        instituicao: 'Colégio Pedro II',
        curso: 'Ensino Médio',
        ano: 2015
      }
    ],
    experienciasProfissionais: [
      {
        tempoMPRJ: '5 anos',
        experienciaAnterior: 'Assistente administrativo por 3 anos'
      }
    ],
    idiomas: ['Português', 'Inglês'],
    disponibilidade: {
      tipoColaboracao: ['Grupos de trabalho', 'Comunicação'],
      disponibilidadeEstimada: 'Até 2h/semana'
    },
    contato: {
      formaContato: 'E-mail',
      horarioPreferencial: 'Manhã (9h às 12h)'
    },
    fotoUrl: '/lovable-uploads/9bdb3a99-0580-4f1a-90fd-bca0f42a713d.png',
    lastUpdated: new Date('2024-01-06T13:20:00'),
    aceiteTermos: true,
    isActive: true,
    role: 'user'
  }
];
