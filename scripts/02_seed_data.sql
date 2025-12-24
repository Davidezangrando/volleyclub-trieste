-- Seed data for Volley Club Trieste

-- Insert teams
INSERT INTO squadre (nome, categoria, descrizione, allenatore, assistente_allenatore) VALUES
('Prima Squadra', 'Serie B2', 'La prima squadra del Volley Club Trieste che compete nel campionato nazionale di Serie B2. Formata da atlete esperte e determinate.', 'Marco Rossi', 'Laura Bianchi'),
('Under 18', 'Giovanile', 'Squadra giovanile Under 18 che rappresenta il futuro del club. Giovani talenti in crescita con grande potenziale.', 'Andrea Verdi', NULL),
('Under 16', 'Giovanile', 'Formazione Under 16 dove le ragazze iniziano a sviluppare le tecniche avanzate della pallavolo.', 'Giulia Neri', 'Francesca Blu'),
('Minivolley', 'Giovanissime', 'Il settore minivolley per le più piccole, dove si impara giocando e divertendosi.', 'Elena Gialli', NULL);

-- Insert matches
INSERT INTO partite (squadra_casa, squadra_ospite, data_partita, risultato_casa, risultato_ospite, luogo, campionato, stato) VALUES
('Volley Club Trieste', 'Pallavolo Udine', '2025-01-25 18:00:00+01', NULL, NULL, 'Palestra Comunale Trieste', 'Serie B2', 'programmata'),
('Volley Club Trieste', 'Volley Gorizia', '2025-02-01 20:30:00+01', NULL, NULL, 'Palestra Comunale Trieste', 'Serie B2', 'programmata'),
('Pallavolo Pordenone', 'Volley Club Trieste', '2025-02-08 19:00:00+01', NULL, NULL, 'Palestra Pordenone', 'Serie B2', 'programmata'),
('Volley Club Trieste', 'Volley Monfalcone', '2025-01-18 20:00:00+01', 3, 1, 'Palestra Comunale Trieste', 'Serie B2', 'conclusa'),
('Pallavolo Lignano', 'Volley Club Trieste', '2025-01-11 19:30:00+01', 1, 3, 'Palestra Lignano', 'Serie B2', 'conclusa');

-- Insert news
INSERT INTO news (titolo, contenuto, autore, pubblicata, in_evidenza, data_pubblicazione) VALUES
('Vittoria importante contro Monfalcone', 'Grande prestazione della prima squadra che ha battuto il Volley Monfalcone per 3-1 in una partita combattuta fino all''ultimo punto. Le ragazze hanno dimostrato carattere e determinazione, conquistando tre punti fondamentali per la classifica. Ottime le prestazioni di tutte le giocatrici, con particolare menzione per la capitana che ha guidato la squadra nei momenti decisivi.', 'Redazione', true, true, '2025-01-19 10:00:00+01'),
('Trasferta vincente a Lignano', 'Altra vittoria per le nostre ragazze che hanno espugnato il campo di Lignano con un netto 3-1. La squadra ha mostrato un gioco fluido e una grande intesa, frutto del lavoro svolto in allenamento. Coach Rossi si è detto soddisfatto della prestazione e della crescita del gruppo.', 'Marco Rossi', true, false, '2025-01-12 15:30:00+01'),
('Prossimo impegno casalingo contro Udine', 'Sabato 25 gennaio alle ore 18:00 la prima squadra affronterà la Pallavolo Udine nella palestra comunale. Sarà una partita importante per consolidare la posizione in classifica. L''ingresso è gratuito e invitiamo tutti i tifosi a venire a sostenere le nostre ragazze.', 'Redazione', true, false, '2025-01-20 09:00:00+01'),
('Settore giovanile: ottimi risultati', 'Anche le squadre giovanili stanno ottenendo risultati eccellenti nei rispettivi campionati. L''Under 18 è in testa al girone, mentre l''Under 16 si sta distinguendo per il bel gioco espresso. Il settore giovanile rappresenta il futuro del club e questi risultati ci riempiono di orgoglio.', 'Andrea Verdi', true, false, '2025-01-15 14:00:00+01');

-- Insert sponsors
INSERT INTO sponsor (nome, categoria, descrizione, sito_web, attivo) VALUES
('Banca di Trieste', 'main_sponsor', 'Partner principale del Volley Club Trieste, sostiene il nostro progetto sportivo da oltre 10 anni.', 'https://www.bancatrieste.it', true),
('SportTech Trieste', 'technical_partner', 'Fornitore ufficiale di attrezzature sportive e abbigliamento tecnico per tutte le nostre squadre.', 'https://www.sporttech-ts.it', true),
('Ristorante Da Mario', 'collaboration', 'Storico ristorante triestino che ospita le nostre cene di squadra e supporta gli eventi del club.', NULL, true),
('Palestra Fitness Center', 'technical_partner', 'Centro fitness che mette a disposizione le proprie strutture per la preparazione atletica delle nostre squadre.', 'https://www.fitnesscenterts.it', true),
('Azienda Trasporti Trieste', 'collaboration', 'Partner per gli spostamenti delle squadre durante le trasferte del campionato.', NULL, true);
