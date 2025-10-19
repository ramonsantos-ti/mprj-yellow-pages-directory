# Documentação do Sistema de Gestão de Perfis Profissionais - MPRJ

## Índice
1. [Visão Geral](#visão-geral)
2. [Arquitetura do Sistema](#arquitetura-do-sistema)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Banco de Dados](#banco-de-dados)
5. [Funcionalidades](#funcionalidades)
6. [Segurança](#segurança)
7. [Acessibilidade](#acessibilidade)
8. [Guia de Uso](#guia-de-uso)

---

## Visão Geral

Sistema web para gestão de perfis profissionais do Ministério Público do Rio de Janeiro (MPRJ), permitindo cadastro, consulta e análise de informações sobre servidores, suas competências, experiências e disponibilidade para colaboração em projetos.

### Objetivos Principais
- Centralizar informações profissionais dos servidores
- Facilitar a busca por competências específicas
- Promover colaboração interna
- Garantir inclusão e acessibilidade
- Gerar indicadores de gestão de pessoas

---

## Arquitetura do Sistema

### Arquitetura Frontend
```
┌─────────────────────────────────────────┐
│           React Application             │
│  (Vite + TypeScript + Tailwind CSS)    │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────┐  ┌──────────┐           │
│  │  Pages   │  │Components│           │
│  └──────────┘  └──────────┘           │
│                                         │
│  ┌──────────┐  ┌──────────┐           │
│  │  Hooks   │  │ Contexts │           │
│  └──────────┘  └──────────┘           │
│                                         │
│  ┌─────────────────────────┐           │
│  │   Supabase Client       │           │
│  └─────────────────────────┘           │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│         Supabase Backend                │
│  - PostgreSQL Database                  │
│  - Row Level Security (RLS)             │
│  - Authentication                       │
│  - Functions & Triggers                 │
└─────────────────────────────────────────┘
```

### Estrutura de Diretórios
```
src/
├── components/           # Componentes reutilizáveis
│   ├── admin/           # Componentes administrativos
│   ├── profile/         # Componentes de perfil
│   ├── profile-detail/  # Componentes de visualização
│   ├── ui/              # Componentes UI (shadcn)
│   └── common/          # Componentes compartilhados
├── contexts/            # Contextos React (Auth, Accessibility)
├── hooks/               # Custom hooks
├── pages/               # Páginas da aplicação
├── types/               # Definições TypeScript
├── utils/               # Funções utilitárias
├── data/                # Constantes e dados estáticos
└── integrations/        # Integrações (Supabase)
```

---

## Tecnologias Utilizadas

### Frontend
- **React 18.3.1** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS
- **shadcn/ui** - Biblioteca de componentes
- **React Router DOM** - Roteamento
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **TanStack Query** - Data fetching e cache
- **Recharts** - Gráficos e visualizações
- **Lucide React** - Ícones

### Backend
- **Supabase** - Backend as a Service
- **PostgreSQL** - Banco de dados relacional
- **Row Level Security (RLS)** - Segurança em nível de linha

### Bibliotecas Auxiliares
- **jsPDF** - Geração de PDFs
- **XLSX** - Exportação para Excel
- **date-fns** - Manipulação de datas
- **Sonner** - Notificações toast

---

## Banco de Dados

### Diagrama Entidade-Relacionamento

```
┌─────────────────┐
│     profiles    │
├─────────────────┤
│ id (PK)         │
│ user_id         │
│ name            │
│ matricula       │
│ email           │
│ cargo[]         │
│ funcao[]        │
│ unidade[]       │
│ is_pcd          │
│ pcd_visibility  │
│ ...             │
└─────────────────┘
        │
        ├──────────────────────────────────┐
        │                                  │
        ↓                                  ↓
┌──────────────────┐              ┌──────────────────┐
│ academic_        │              │ professional_    │
│ formations       │              │ experiences      │
├──────────────────┤              ├──────────────────┤
│ id (PK)          │              │ id (PK)          │
│ profile_id (FK)  │              │ profile_id (FK)  │
│ nivel            │              │ cargo_funcao     │
│ instituicao      │              │ empresa          │
│ curso            │              │ data_inicio      │
│ ano              │              │ data_fim         │
└──────────────────┘              └──────────────────┘
        │
        ↓
┌──────────────────┐              ┌──────────────────┐
│    projects      │              │  availability    │
├──────────────────┤              ├──────────────────┤
│ id (PK)          │              │ id (PK)          │
│ profile_id (FK)  │              │ profile_id (FK)  │
│ nome             │              │ tipo_colaboracao │
│ data_inicio      │              │ forma_contato    │
│ data_fim         │              │ horario_pref     │
└──────────────────┘              └──────────────────┘
        │
        ↓
┌──────────────────┐              ┌──────────────────┐
│ profile_         │     ┌───────→│ disability_      │
│ disabilities     │     │        │ types            │
├──────────────────┤     │        ├──────────────────┤
│ id (PK)          │     │        │ id (PK)          │
│ profile_id (FK)  │     │        │ name             │
│ disability_type ─┼─────┘        │ category         │
│   _id (FK)       │              │ description      │
│ additional_info  │              └──────────────────┘
└──────────────────┘
        │
        ↓
┌──────────────────┐              ┌──────────────────┐
│  audit_logs      │              │  audit_alerts    │
├──────────────────┤              ├──────────────────┤
│ id (PK)          │←─────────────│ id (PK)          │
│ action           │              │ audit_log_id(FK) │
│ user_name        │              │ alert_type       │
│ entity_type      │              │ severity         │
│ severity_level   │              │ is_read          │
│ operation_type   │              └──────────────────┘
│ module           │
│ changes_summary  │
└──────────────────┘
```

### Tabelas do Sistema

#### 1. **profiles**
Tabela principal de perfis profissionais.

**Colunas:**
- `id` (uuid, PK) - Identificador único
- `user_id` (uuid) - Referência ao usuário autenticado
- `name` (text) - Nome completo
- `matricula` (text) - Matrícula do servidor
- `email` (text) - Email institucional
- `cargo` (text[]) - Cargos ocupados
- `funcao` (text[]) - Funções exercidas
- `unidade` (text[]) - Unidades de lotação
- `telefone` (text) - Telefone de contato
- `biografia` (text) - Biografia profissional
- `temas_interesse` (text[]) - Áreas de interesse
- `idiomas` (text[]) - Idiomas
- `foto_url` (text) - URL da foto de perfil
- `link_curriculo` (text) - Link para currículo Lattes
- `certificacoes` (text[]) - Certificações
- `publicacoes` (text) - Publicações relevantes
- `is_pcd` (boolean) - Indica se é PcD
- `pcd_visibility_level` (text) - Nível de visibilidade PcD
- `role` (app_role) - Papel no sistema (user/admin)
- `is_active` (boolean) - Status ativo/inativo
- `aceite_termos` (boolean) - Aceitação dos termos
- `updated_by_admin` (boolean) - Atualizado por admin
- `created_at` (timestamp) - Data de criação
- `updated_at` (timestamp) - Data de atualização

**RLS Policies:**
- Usuários podem ver perfis ativos
- Usuários podem editar seus próprios perfis
- Admins podem ver e editar todos os perfis

#### 2. **academic_formations**
Formações acadêmicas dos servidores.

**Colunas:**
- `id` (uuid, PK)
- `profile_id` (uuid, FK)
- `nivel` (text) - Nível de formação
- `instituicao` (text) - Instituição de ensino
- `curso` (text) - Nome do curso
- `ano` (integer) - Ano de conclusão

#### 3. **professional_experiences**
Experiências profissionais anteriores.

**Colunas:**
- `id` (uuid, PK)
- `profile_id` (uuid, FK)
- `empresa_instituicao` (text)
- `cargo_funcao` (text)
- `data_inicio` (date)
- `data_fim` (date)
- `atividades` (text)

#### 4. **projects**
Projetos em que o servidor participou/participa.

**Colunas:**
- `id` (uuid, PK)
- `profile_id` (uuid, FK)
- `nome` (text)
- `data_inicio` (date)
- `data_fim` (date)
- `observacoes` (text)

#### 5. **availability**
Disponibilidade para colaboração.

**Colunas:**
- `id` (uuid, PK)
- `profile_id` (uuid, FK)
- `tipo_colaboracao` (collaboration_type[]) - Tipos de colaboração
- `disponibilidade_estimada` (text)
- `forma_contato` (contact_preference)
- `horario_preferencial` (text)

#### 6. **disability_types**
Tipos de deficiências cadastradas no sistema.

**Colunas:**
- `id` (uuid, PK)
- `name` (text) - Nome do tipo de deficiência
- `category` (text) - Categoria (fisica, visual, auditiva, intelectual, multipla)
- `description` (text) - Descrição

**Tipos Cadastrados:**
- **Física:** Paraplegia, Tetraplegia, Hemiplegia, Amputação, Nanismo, etc.
- **Visual:** Cegueira Total, Baixa Visão, Visão Monocular
- **Auditiva:** Surdez (vários níveis), Surdocegueira
- **Intelectual:** Leve, Moderada, Severa, Profunda
- **Múltipla:** Associação de duas ou mais deficiências

#### 7. **profile_disabilities**
Relação entre perfis e tipos de deficiências.

**Colunas:**
- `id` (uuid, PK)
- `profile_id` (uuid, FK)
- `disability_type_id` (uuid, FK)
- `additional_info` (text) - Informações adicionais

**RLS Policies:**
- Públicos podem ver deficiências de perfis com `pcd_visibility_level = 'public'`
- Usuários autenticados podem ver deficiências com `pcd_visibility_level IN ('public', 'logged_users')`
- Admins podem ver todas as deficiências

#### 8. **audit_logs**
Logs de auditoria do sistema.

**Colunas:**
- `id` (uuid, PK)
- `action` (text) - Ação realizada
- `user_name` (text) - Nome do usuário
- `user_matricula` (text) - Matrícula
- `entity_type` (text) - Tipo de entidade
- `entity_id` (uuid) - ID da entidade
- `details` (text) - Detalhes da ação
- `previous_value` (text) - Valor anterior
- `new_value` (text) - Novo valor
- `severity_level` (text) - LOW, MEDIUM, HIGH, CRITICAL
- `operation_type` (text) - CREATE, READ, UPDATE, DELETE
- `module` (text) - PROFILE, ADMIN, AUTH, etc.
- `changes_summary` (jsonb) - Resumo das mudanças
- `affected_fields` (text[]) - Campos afetados
- `success` (boolean) - Sucesso da operação
- `ip_address` (inet) - Endereço IP
- `created_at` (timestamp)

#### 9. **audit_alerts**
Alertas gerados a partir de logs de auditoria.

**Colunas:**
- `id` (uuid, PK)
- `audit_log_id` (uuid, FK)
- `alert_type` (text) - SECURITY, SUSPICIOUS, ERROR
- `message` (text)
- `severity` (text)
- `is_read` (boolean)
- `acknowledged_by` (uuid)
- `acknowledged_at` (timestamp)

### Enums do Sistema

```sql
-- Tipos de colaboração disponíveis
CREATE TYPE collaboration_type AS ENUM (
  'Palestras/Workshops',
  'Consultoria/Assessoria',
  'Projetos de Pesquisa',
  'Grupos de Trabalho'
);

-- Preferências de contato
CREATE TYPE contact_preference AS ENUM (
  'email',
  'telefone',
  'teams'
);

-- Papéis de usuário
CREATE TYPE app_role AS ENUM (
  'admin',
  'user'
);
```

### Funções do Banco de Dados

#### 1. **is_admin(user_uuid uuid)**
Verifica se um usuário é administrador.

```sql
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = user_uuid AND role = 'admin'
  );
$function$
```

#### 2. **create_audit_log(...)**
Cria registros de auditoria com todos os metadados.

**Parâmetros:**
- `p_action` - Ação realizada
- `p_entity_type` - Tipo de entidade
- `p_entity_id` - ID da entidade
- `p_user_name` - Nome do usuário
- `p_severity_level` - Nível de severidade
- Outros metadados relevantes

#### 3. **audit_profiles_trigger()**
Trigger automático para auditoria de mudanças em perfis.

**Comportamento:**
- Captura INSERT, UPDATE, DELETE em profiles
- Registra campos alterados
- Define nível de severidade automaticamente
- Cria alertas para mudanças críticas (role, is_active)

### Triggers

```sql
-- Trigger para auditoria automática de perfis
CREATE TRIGGER audit_profiles_changes
AFTER INSERT OR UPDATE OR DELETE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.audit_profiles_trigger();

-- Trigger para atualizar updated_at
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
```

---

## Funcionalidades

### 1. Gestão de Perfis

#### Cadastro de Perfil
- **Informações Básicas:** Nome, matrícula, cargo, função, unidade
- **Contato:** Email, telefone
- **Formação Acadêmica:** Múltiplas formações com instituição, curso, ano
- **Experiência Profissional:** Histórico de experiências anteriores
- **Projetos:** Projetos atuais e anteriores
- **Competências:** Temas de interesse, idiomas, certificações
- **Disponibilidade:** Tipos de colaboração e horários preferenciais
- **Acessibilidade:** Informações de PcD com controle de visibilidade
- **Biografia e Publicações**

#### Visualização de Perfil
- Visualização completa do perfil com todos os dados
- Controle de visibilidade de informações PcD
- Exportação de perfil para PDF
- Link para currículo Lattes

### 2. Busca e Filtros

**Critérios de Busca:**
- Por nome ou matrícula
- Por cargo e função
- Por unidade
- Por área de conhecimento
- Por habilidades técnicas
- Por formação acadêmica
- Por idioma
- Por disponibilidade
- Por tipo de deficiência (para PcD)

### 3. Painel Administrativo

Acessível apenas para administradores com as seguintes funcionalidades:

#### Gestão de Perfis
- Visualização de todos os perfis (ativos e inativos)
- Edição de qualquer perfil
- Ativação/desativação de perfis
- Aprovação de cadastros

#### Auditoria
- **Logs de Auditoria:**
  - Histórico completo de ações
  - Filtros por período, usuário, tipo de ação
  - Exportação para Excel/PDF
  
- **Alertas:**
  - Notificações de ações críticas
  - Sistema de leitura/reconhecimento
  - Filtros por tipo e severidade

- **Categorias de Auditoria:**
  - Configuração de categorias de auditoria
  - Definição de níveis de severidade
  - Configuração de notificações

#### Notificações
- Gerenciamento de mensagens padrão do sistema
- Templates de comunicação

#### Relatórios
- Relatório de perfis por unidade
- Relatório de competências
- Relatório de disponibilidade
- Relatório de PcD
- Exportação em PDF e Excel

### 4. Indicadores

Dashboard com métricas do sistema:

#### Indicadores Gerais
- Total de perfis cadastrados
- Perfis ativos vs inativos
- Distribuição por cargo
- Distribuição por unidade

#### Métricas de Conhecimento
- Áreas de conhecimento mais frequentes
- Habilidades técnicas
- Distribuição de formação acadêmica
- Idiomas

#### Métricas de Colaboração
- Disponibilidade para colaboração
- Tipos de colaboração oferecidos
- Projetos em andamento

#### Indicadores de PcD
- Total de pessoas com deficiência
- Distribuição por tipo de deficiência
- Distribuição por categoria
- Distribuição por unidade
- Taxa de inclusão
- Perfis PcD ativos

#### Qualidade dos Dados
- Completude de perfis
- Taxa de atualização
- Dados ausentes

#### Análise de Tendências
- Evolução temporal de cadastros
- Tendências de áreas de conhecimento
- Análise de crescimento

### 5. Acessibilidade

Widget de acessibilidade com opções:
- **Contraste:** Normal, Alto, Invertido
- **Tamanho da Fonte:** Pequeno, Médio, Grande, Muito Grande
- **Espaçamento:** Normal, Aumentado
- **Destaque de Links:** Sim/Não
- **Fonte Legível:** Sim/Não
- **Guia de Leitura:** Sim/Não
- **Cursor Grande:** Sim/Não
- **Ocultar Imagens:** Sim/Não
- **Reset:** Restaurar padrões

---

## Segurança

### Row Level Security (RLS)

Todas as tabelas implementam políticas de segurança em nível de linha:

#### Perfis (profiles)
```sql
-- Público pode ver perfis ativos
CREATE POLICY "Public can view active profiles"
ON profiles FOR SELECT
USING (is_active = true);

-- Usuários podem editar seus próprios perfis
CREATE POLICY "Users can update their own profile"
ON profiles FOR UPDATE
USING (auth.uid() = user_id);

-- Admins podem ver e editar tudo
CREATE POLICY "Admins can view all profiles"
ON profiles FOR SELECT
USING (is_admin(auth.uid()));
```

#### Informações de PcD
```sql
-- Público vê apenas deficiências com visibilidade 'public'
CREATE POLICY "Public can read disabilities with public visibility"
ON profile_disabilities FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = profile_disabilities.profile_id
    AND profiles.is_active = true
    AND profiles.pcd_visibility_level = 'public'
  )
);

-- Usuários autenticados veem 'public' e 'logged_users'
CREATE POLICY "Logged users can read disabilities"
ON profile_disabilities FOR SELECT
USING (
  auth.uid() IS NOT NULL
  AND EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = profile_disabilities.profile_id
    AND profiles.is_active = true
    AND profiles.pcd_visibility_level IN ('public', 'logged_users')
  )
);
```

### Controle de Acesso

#### Papéis de Usuário
- **User:** Acesso básico (visualizar perfis, editar próprio perfil)
- **Admin:** Acesso completo (gerenciar todos os perfis, auditoria, relatórios)

#### Verificação de Permissões
```typescript
// Verificação client-side
const isAdmin = user?.role === 'admin';

// Verificação server-side (RLS)
is_admin(auth.uid())
```

### Auditoria de Segurança

- Registro automático de todas as operações críticas
- Tracking de mudanças de role
- Alertas para ações suspeitas
- Registro de IP e User Agent
- Rastreamento de sessão

---

## Acessibilidade

### Conformidade WCAG 2.1

O sistema segue diretrizes de acessibilidade:

- **Nível AA** de conformidade WCAG 2.1
- Suporte a leitores de tela
- Navegação por teclado
- Contraste adequado de cores
- Textos alternativos em imagens
- Estrutura semântica HTML5

### Recursos de Acessibilidade

- Widget flutuante de acessibilidade
- Múltiplos modos de contraste
- Ajuste de tamanho de fonte
- Espaçamento personalizável
- Guia de leitura visual
- Suporte a tecnologias assistivas

### Inclusão de PcD

- Cadastro voluntário de deficiências
- Controle de visibilidade (público, usuários logados, apenas admin)
- Indicadores específicos de inclusão
- Respeito à privacidade e LGPD

---

## Guia de Uso

### Para Usuários

#### 1. Primeiro Acesso
1. Acessar sistema com credenciais institucionais
2. Aceitar termos de uso
3. Preencher perfil básico obrigatório
4. Adicionar informações complementares

#### 2. Editar Perfil
1. Menu lateral → "Perfil"
2. Clicar em "Editar Perfil"
3. Atualizar informações
4. Salvar alterações

#### 3. Buscar Profissionais
1. Página inicial → Campo de busca
2. Aplicar filtros desejados
3. Visualizar resultados
4. Clicar em perfil para ver detalhes

#### 4. Acessibilidade
1. Clicar no ícone de acessibilidade (canto inferior direito)
2. Ajustar preferências
3. Fechar widget (configurações são salvas)

### Para Administradores

#### 1. Acessar Painel Admin
1. Menu lateral → "Administração"
2. Visualizar dashboard

#### 2. Gerenciar Perfis
1. Aba "Perfis"
2. Pesquisar perfil desejado
3. Clicar em "Editar"
4. Fazer alterações
5. Salvar

#### 3. Visualizar Auditoria
1. Aba "Auditoria"
2. Filtrar por período/usuário
3. Exportar relatório se necessário

#### 4. Gerar Relatórios
1. Aba "Relatórios"
2. Selecionar tipo de relatório
3. Clicar em "Gerar PDF" ou "Exportar Excel"

#### 5. Visualizar Indicadores
1. Menu → "Indicadores"
2. Navegar pelas abas de métricas
3. Analisar gráficos e dados

---

## Manutenção e Suporte

### Logs e Monitoramento

- Logs de auditoria armazenados indefinidamente
- Alertas automáticos para ações críticas
- Dashboard de métricas em tempo real

### Backup e Recuperação

- Backup automático do Supabase
- Point-in-time recovery disponível
- Replicação de dados

### Atualizações

- Versionamento semântico
- Changelog documentado
- Migrações de banco controladas

---

## Glossário

- **PcD:** Pessoa com Deficiência
- **RLS:** Row Level Security (Segurança em Nível de Linha)
- **LGPD:** Lei Geral de Proteção de Dados
- **WCAG:** Web Content Accessibility Guidelines
- **MPRJ:** Ministério Público do Rio de Janeiro
- **Matrícula:** Número de identificação do servidor

---

## Contato e Suporte

Para dúvidas ou suporte técnico, contatar a equipe de TI do MPRJ.

---

**Versão:** 1.0  
**Data:** 2025-10-19  
**Última Atualização:** 2025-10-19
