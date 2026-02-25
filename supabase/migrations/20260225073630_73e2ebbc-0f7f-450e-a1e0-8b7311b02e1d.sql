
-- Add SEO and status fields to tours
ALTER TABLE public.tours 
ADD COLUMN IF NOT EXISTS slug text UNIQUE,
ADD COLUMN IF NOT EXISTS seo_title text,
ADD COLUMN IF NOT EXISTS seo_description text,
ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'hidden', 'hot'));

-- Drop old is_active column (replaced by status)
-- First update RLS policy
DROP POLICY IF EXISTS "Tours are publicly readable" ON public.tours;

-- Migrate data: convert is_active to status
UPDATE public.tours SET status = CASE WHEN is_active = true THEN 'active' ELSE 'hidden' END WHERE status = 'active';

ALTER TABLE public.tours DROP COLUMN IF EXISTS is_active;

-- New RLS: public can read active/hot tours
CREATE POLICY "Tours are publicly readable"
ON public.tours FOR SELECT
USING (status IN ('active', 'hot'));

-- Allow anonymous insert/update/delete for admin (no auth for now)
CREATE POLICY "Anyone can manage tours"
ON public.tours FOR ALL
USING (true)
WITH CHECK (true);

-- Allow reading contact_requests
CREATE POLICY "Anyone can read contact requests"
ON public.contact_requests FOR SELECT
USING (true);
