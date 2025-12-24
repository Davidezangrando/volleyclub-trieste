-- Create tables for Volley Club Trieste website

-- Squadre (Teams) table
CREATE TABLE IF NOT EXISTS squadre (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    descrizione TEXT,
    immagine_url TEXT,
    allenatore VARCHAR(100),
    assistente_allenatore VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Partite (Matches) table
CREATE TABLE IF NOT EXISTS partite (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    squadra_casa VARCHAR(100) NOT NULL,
    squadra_ospite VARCHAR(100) NOT NULL,
    data_partita TIMESTAMP WITH TIME ZONE NOT NULL,
    risultato_casa INTEGER,
    risultato_ospite INTEGER,
    luogo VARCHAR(200),
    campionato VARCHAR(100),
    stato VARCHAR(20) DEFAULT 'programmata' CHECK (stato IN ('programmata', 'in_corso', 'conclusa')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- News table
CREATE TABLE IF NOT EXISTS news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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

-- Sponsor table
CREATE TABLE IF NOT EXISTS sponsor (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    logo_url TEXT,
    sito_web TEXT,
    categoria VARCHAR(50) NOT NULL CHECK (categoria IN ('main_sponsor', 'technical_partner', 'collaboration')),
    descrizione TEXT,
    attivo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_partite_data ON partite(data_partita);
CREATE INDEX IF NOT EXISTS idx_partite_stato ON partite(stato);
CREATE INDEX IF NOT EXISTS idx_news_pubblicata ON news(pubblicata);
CREATE INDEX IF NOT EXISTS idx_news_evidenza ON news(in_evidenza);
CREATE INDEX IF NOT EXISTS idx_sponsor_categoria ON sponsor(categoria);
CREATE INDEX IF NOT EXISTS idx_sponsor_attivo ON sponsor(attivo);
