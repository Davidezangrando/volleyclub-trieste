-- Create squadre (teams) table
CREATE TABLE IF NOT EXISTS public.squadre (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(100) NOT NULL,
  categoria VARCHAR(50) NOT NULL,
  descrizione TEXT,
  immagine_url TEXT,
  allenatore VARCHAR(100),
  assistente_allenatore VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create partite (matches) table
CREATE TABLE IF NOT EXISTS public.partite (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  squadra_casa VARCHAR(100) NOT NULL,
  squadra_ospite VARCHAR(100) NOT NULL,
  data_partita TIMESTAMP WITH TIME ZONE NOT NULL,
  risultato_casa INTEGER,
  risultato_ospite INTEGER,
  luogo VARCHAR(200),
  campionato VARCHAR(100),
  stato VARCHAR(20) DEFAULT 'programmata', -- programmata, in_corso, conclusa
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sponsor table
CREATE TABLE IF NOT EXISTS public.sponsor (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(100) NOT NULL,
  logo_url TEXT,
  sito_web TEXT,
  categoria VARCHAR(50) NOT NULL, -- main_sponsor, technical_partner, collaboration
  descrizione TEXT,
  attivo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create news table
CREATE TABLE IF NOT EXISTS public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titolo VARCHAR(200) NOT NULL,
  contenuto TEXT NOT NULL,
  immagine_url TEXT,
  autore VARCHAR(100),
  pubblicata BOOLEAN DEFAULT false,
  in_evidenza BOOLEAN DEFAULT false,
  data_pubblicazione TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for public read access
ALTER TABLE public.squadre ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partite ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sponsor ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (no authentication required for viewing)
CREATE POLICY "Allow public read access to squadre" ON public.squadre FOR SELECT USING (true);
CREATE POLICY "Allow public read access to partite" ON public.partite FOR SELECT USING (true);
CREATE POLICY "Allow public read access to sponsor" ON public.sponsor FOR SELECT USING (true);
CREATE POLICY "Allow public read access to news" ON public.news FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_partite_data ON public.partite(data_partita);
CREATE INDEX IF NOT EXISTS idx_news_pubblicata ON public.news(pubblicata);
CREATE INDEX IF NOT EXISTS idx_news_evidenza ON public.news(in_evidenza);
CREATE INDEX IF NOT EXISTS idx_sponsor_categoria ON public.sponsor(categoria);
CREATE INDEX IF NOT EXISTS idx_sponsor_attivo ON public.sponsor(attivo);
