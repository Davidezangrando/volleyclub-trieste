-- Insert sample teams
INSERT INTO public.squadre (nome, categoria, descrizione, allenatore, assistente_allenatore) VALUES
('Prima Squadra Femminile', 'Serie B2', 'La squadra principale femminile del Volley Club Trieste, che compete nel campionato di Serie B2.', 'Marco Rossi', 'Laura Bianchi'),
('Under 18 Femminile', 'Under 18', 'Squadra giovanile femminile Under 18, vivaio del club.', 'Andrea Verdi', 'Silvia Neri'),
('Under 16 Femminile', 'Under 16', 'Squadra giovanile femminile Under 16.', 'Paolo Blu', 'Maria Gialli'),
('Minivolley', 'Minivolley', 'Squadra per i più piccoli, dai 6 ai 10 anni.', 'Francesca Rosa', NULL);

-- Insert sample matches
INSERT INTO public.partite (squadra_casa, squadra_ospite, data_partita, luogo, campionato, stato) VALUES
('Volley Club Trieste', 'Pallavolo Udine', '2025-01-25 18:00:00+01', 'Palestra Comunale Trieste', 'Serie B2', 'programmata'),
('Pallavolo Gorizia', 'Volley Club Trieste', '2025-02-01 17:30:00+01', 'Palestra Gorizia', 'Serie B2', 'programmata'),
('Volley Club Trieste', 'Volley Pordenone', '2025-02-08 18:00:00+01', 'Palestra Comunale Trieste', 'Serie B2', 'programmata'),
('Volley Club Trieste', 'Pallavolo Monfalcone', '2025-01-18 18:00:00+01', 'Palestra Comunale Trieste', 'Serie B2', 'conclusa');

-- Update the concluded match with a result
UPDATE public.partite 
SET risultato_casa = 3, risultato_ospite = 1 
WHERE squadra_casa = 'Volley Club Trieste' AND squadra_ospite = 'Pallavolo Monfalcone';

-- Insert sample sponsors
INSERT INTO public.sponsor (nome, sito_web, categoria, descrizione, attivo) VALUES
('Banca di Trieste', 'https://www.bancatrieste.it', 'main_sponsor', 'Main sponsor del Volley Club Trieste', true),
('SportTech Trieste', 'https://www.sporttech.it', 'technical_partner', 'Partner tecnico per abbigliamento e attrezzature', true),
('Ristorante Da Mario', 'https://www.damario.it', 'collaboration', 'Partner per eventi e catering', true),
('Farmacia Centrale', 'https://www.farmaciacentrale.it', 'collaboration', 'Partner sanitario del club', true);

-- Insert sample news
INSERT INTO public.news (titolo, contenuto, autore, pubblicata, in_evidenza, data_pubblicazione) VALUES
('Vittoria importante contro Monfalcone', 'La prima squadra femminile ha conquistato una vittoria fondamentale contro Pallavolo Monfalcone con il risultato di 3-1. Una prestazione convincente che ci porta in una posizione di classifica molto interessante.', 'Staff Volleyclub', true, true, '2025-01-19 10:00:00+01'),
('Nuovi arrivi nel settore giovanile', 'Siamo felici di annunciare l''arrivo di nuovi giovani talenti nelle nostre squadre Under 16 e Under 18. Il vivaio del Volley Club Trieste continua a crescere.', 'Staff Volleyclub', true, false, '2025-01-15 14:30:00+01'),
('Prossimo match casalingo', 'Vi aspettiamo numerosi sabato 25 gennaio alle ore 18:00 per sostenere la nostra prima squadra contro Pallavolo Udine. Ingresso gratuito per tutti i tifosi!', 'Staff Volleyclub', true, true, '2025-01-20 09:00:00+01');
