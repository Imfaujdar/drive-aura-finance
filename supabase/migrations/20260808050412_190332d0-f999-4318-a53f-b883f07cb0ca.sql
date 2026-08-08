CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE TABLE public.hero_slide_layouts (
  slide_id text PRIMARY KEY,
  layouts jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid
);

GRANT SELECT ON public.hero_slide_layouts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.hero_slide_layouts TO authenticated;
GRANT ALL ON public.hero_slide_layouts TO service_role;
ALTER TABLE public.hero_slide_layouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Hero layouts are publicly readable"
ON public.hero_slide_layouts FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "Admins can insert hero layouts"
ON public.hero_slide_layouts FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update hero layouts"
ON public.hero_slide_layouts FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete hero layouts"
ON public.hero_slide_layouts FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.touch_hero_slide_layouts()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER hero_slide_layouts_touch
BEFORE UPDATE ON public.hero_slide_layouts
FOR EACH ROW EXECUTE FUNCTION public.touch_hero_slide_layouts();