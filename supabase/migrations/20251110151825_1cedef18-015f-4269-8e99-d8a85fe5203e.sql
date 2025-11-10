-- Create profile_reviews table
CREATE TABLE public.profile_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 3 AND rating <= 5),
  comment TEXT NOT NULL CHECK (length(comment) > 0 AND length(comment) <= 500),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_id UUID REFERENCES public.profiles(id),
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_profile_reviewer UNIQUE(profile_id, reviewer_id),
  CONSTRAINT no_self_review CHECK (profile_id != reviewer_id)
);

-- Create indexes for performance
CREATE INDEX idx_profile_reviews_profile ON public.profile_reviews(profile_id);
CREATE INDEX idx_profile_reviews_status ON public.profile_reviews(status);
CREATE INDEX idx_profile_reviews_reviewer ON public.profile_reviews(reviewer_id);
CREATE INDEX idx_profile_reviews_profile_status ON public.profile_reviews(profile_id, status);

-- Enable RLS
ALTER TABLE public.profile_reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can create reviews" ON public.profile_reviews
  FOR INSERT TO authenticated
  WITH CHECK (
    reviewer_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
    AND profile_id != reviewer_id
  );

CREATE POLICY "Users can view own reviews" ON public.profile_reviews
  FOR SELECT TO authenticated
  USING (reviewer_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Anyone can view approved reviews" ON public.profile_reviews
  FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Admins manage all reviews" ON public.profile_reviews
  FOR ALL
  USING (public.is_admin(auth.uid()));

-- Trigger for updated_at
CREATE TRIGGER update_profile_reviews_updated_at
  BEFORE UPDATE ON public.profile_reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to get top rated profiles
CREATE OR REPLACE FUNCTION public.get_top_rated_profiles(limit_count INTEGER DEFAULT 10)
RETURNS TABLE(
  profile_id UUID,
  name TEXT,
  matricula TEXT,
  foto_url TEXT,
  cargo TEXT[],
  average_rating NUMERIC,
  review_count BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    p.matricula,
    p.foto_url,
    p.cargo,
    ROUND(AVG(pr.rating)::numeric, 2) as average_rating,
    COUNT(pr.id) as review_count
  FROM profiles p
  INNER JOIN profile_reviews pr ON p.id = pr.profile_id
  WHERE p.is_active = true 
    AND pr.status = 'approved'
  GROUP BY p.id, p.name, p.matricula, p.foto_url, p.cargo
  HAVING COUNT(pr.id) >= 1
  ORDER BY average_rating DESC, review_count DESC, p.name ASC
  LIMIT limit_count;
END;
$$;