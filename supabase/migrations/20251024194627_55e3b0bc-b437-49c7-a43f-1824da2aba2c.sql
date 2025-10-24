-- Create profile_views table to track profile visits
CREATE TABLE public.profile_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_profile_views_profile_id ON public.profile_views(profile_id);
CREATE INDEX idx_profile_views_viewed_at ON public.profile_views(viewed_at DESC);
CREATE INDEX idx_profile_views_profile_viewed ON public.profile_views(profile_id, viewed_at DESC);

-- Enable RLS
ALTER TABLE public.profile_views ENABLE ROW LEVEL SECURITY;

-- Anyone can insert profile views (including anonymous users)
CREATE POLICY "Anyone can insert profile views"
  ON public.profile_views 
  FOR INSERT 
  WITH CHECK (true);

-- Only admins can view profile views
CREATE POLICY "Only admins can view profile views"
  ON public.profile_views 
  FOR SELECT 
  USING (is_admin(auth.uid()));

-- Create function to get top 10 profiles
CREATE OR REPLACE FUNCTION public.get_top_profiles(limit_count INT DEFAULT 10)
RETURNS TABLE (
  profile_id UUID,
  name TEXT,
  matricula TEXT,
  foto_url TEXT,
  cargo TEXT[],
  view_count BIGINT
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    p.matricula,
    p.foto_url,
    p.cargo,
    COUNT(pv.id) as view_count
  FROM profiles p
  INNER JOIN profile_views pv ON p.id = pv.profile_id
  WHERE p.is_active = true
  GROUP BY p.id, p.name, p.matricula, p.foto_url, p.cargo
  ORDER BY view_count DESC, p.name ASC
  LIMIT limit_count;
END;
$$;