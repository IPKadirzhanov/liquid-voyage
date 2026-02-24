
-- Tours table (public, no auth needed to read)
CREATE TABLE public.tours (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  image_url TEXT,
  price TEXT NOT NULL,
  dates TEXT NOT NULL,
  rating NUMERIC(2,1) DEFAULT 4.5,
  tag TEXT,
  description TEXT,
  destination TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;

-- Anyone can read active tours
CREATE POLICY "Tours are publicly readable"
  ON public.tours FOR SELECT
  USING (is_active = true);

-- Contact requests table
CREATE TABLE public.contact_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  source TEXT DEFAULT 'website',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a contact request
CREATE POLICY "Anyone can create contact requests"
  ON public.contact_requests FOR INSERT
  WITH CHECK (true);

-- Chat messages for AI conversations (anonymous, no auth)
CREATE TABLE public.chat_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create chat sessions"
  ON public.chat_sessions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read own chat sessions"
  ON public.chat_sessions FOR SELECT
  USING (true);
