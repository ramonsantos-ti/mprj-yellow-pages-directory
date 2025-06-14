
-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create enum for collaboration types
CREATE TYPE public.collaboration_type AS ENUM ('consultoria', 'parecer', 'capacitacao', 'projeto');

-- Create enum for contact preferences
CREATE TYPE public.contact_preference AS ENUM ('email', 'telefone', 'teams', 'presencial');

-- Create profiles table (main user profiles)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  matricula TEXT UNIQUE NOT NULL,
  cargo TEXT[] DEFAULT '{}',
  funcao TEXT[] DEFAULT '{}',
  unidade TEXT[] DEFAULT '{}',
  telefone TEXT,
  email TEXT NOT NULL,
  biografia TEXT,
  areas_conhecimento TEXT[] DEFAULT '{}',
  especializacoes TEXT,
  temas_interesse TEXT[] DEFAULT '{}',
  idiomas TEXT[] DEFAULT '{}',
  link_curriculo TEXT,
  foto_url TEXT,
  certificacoes TEXT[] DEFAULT '{}',
  publicacoes TEXT,
  role app_role DEFAULT 'user',
  is_active BOOLEAN DEFAULT true,
  aceite_termos BOOLEAN DEFAULT false,
  updated_by_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  data_inicio DATE NOT NULL,
  data_fim DATE,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create academic formations table
CREATE TABLE public.academic_formations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  nivel TEXT NOT NULL,
  instituicao TEXT NOT NULL,
  curso TEXT NOT NULL,
  ano INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create professional experiences table
CREATE TABLE public.professional_experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  tempo_mprj TEXT,
  experiencia_anterior TEXT,
  projetos_internos TEXT,
  publicacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create availability table
CREATE TABLE public.availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  tipo_colaboracao collaboration_type[] DEFAULT '{}',
  disponibilidade_estimada TEXT,
  forma_contato contact_preference DEFAULT 'email',
  horario_preferencial TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create audit logs table
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_matricula TEXT,
  details TEXT NOT NULL,
  previous_value TEXT,
  new_value TEXT,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_formations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.professional_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS app_role
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT role FROM public.profiles WHERE user_id = user_uuid;
$$;

-- Create security definer function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = user_uuid AND role = 'admin'
  );
$$;

-- RLS Policies for profiles table
CREATE POLICY "Public can view active profiles" ON public.profiles
  FOR SELECT USING (is_active = true);

CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete profiles" ON public.profiles
  FOR DELETE USING (public.is_admin(auth.uid()));

-- RLS Policies for projects table
CREATE POLICY "Users can manage their own projects" ON public.projects
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = projects.profile_id 
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all projects" ON public.projects
  FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Public can view projects of active profiles" ON public.projects
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = projects.profile_id 
      AND profiles.is_active = true
    )
  );

-- RLS Policies for academic_formations table
CREATE POLICY "Users can manage their own academic formations" ON public.academic_formations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = academic_formations.profile_id 
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all academic formations" ON public.academic_formations
  FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Public can view academic formations of active profiles" ON public.academic_formations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = academic_formations.profile_id 
      AND profiles.is_active = true
    )
  );

-- RLS Policies for professional_experiences table
CREATE POLICY "Users can manage their own professional experiences" ON public.professional_experiences
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = professional_experiences.profile_id 
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all professional experiences" ON public.professional_experiences
  FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Public can view professional experiences of active profiles" ON public.professional_experiences
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = professional_experiences.profile_id 
      AND profiles.is_active = true
    )
  );

-- RLS Policies for availability table
CREATE POLICY "Users can manage their own availability" ON public.availability
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = availability.profile_id 
      AND profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all availability" ON public.availability
  FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "Public can view availability of active profiles" ON public.availability
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = availability.profile_id 
      AND profiles.is_active = true
    )
  );

-- RLS Policies for audit_logs table
CREATE POLICY "Only admins can view audit logs" ON public.audit_logs
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can insert audit logs" ON public.audit_logs
  FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

-- Create function to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_email TEXT;
  user_name TEXT;
BEGIN
  -- Extract email and name from user metadata
  user_email := NEW.email;
  user_name := COALESCE(NEW.raw_user_meta_data->>'name', NEW.email);
  
  -- Insert new profile
  INSERT INTO public.profiles (
    user_id,
    name,
    matricula,
    email,
    role,
    aceite_termos
  ) VALUES (
    NEW.id,
    user_name,
    'MAT' || EXTRACT(EPOCH FROM NOW())::TEXT, -- Temporary matricula
    user_email,
    'user',
    false
  );
  
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
