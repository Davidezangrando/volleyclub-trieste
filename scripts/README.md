# Sistema Gestione Squadre e Giocatori

Sistema completo per la gestione delle squadre e dei giocatori del Volley Club Trieste con foto e dettagli.

## Struttura

### Database

Il sistema utilizza due tabelle principali su Supabase:

1. **squadre** - Contiene le informazioni delle squadre
   - `id` (uuid, primary key)
   - `nome` (varchar) - Nome della squadra
   - `categoria` (varchar) - Categoria (es. "Serie B2", "Under 18")
   - `slug` (varchar, unique) - URL-friendly identifier (es. "serie-b2-femminile-2025-26")
   - `descrizione` (text) - Descrizione della squadra
   - `immagine_url` (text) - URL dell'immagine della squadra
   - `allenatore` (varchar) - Nome dell'allenatore
   - `assistente_allenatore` (varchar) - Nome dell'assistente allenatore
   - `created_at`, `updated_at` (timestamp)

2. **giocatori** - Contiene le informazioni dei giocatori
   - `id` (uuid, primary key)
   - `squadra_id` (uuid, foreign key -> squadre.id)
   - `nome` (varchar) - Nome del giocatore
   - `cognome` (varchar) - Cognome del giocatore
   - `numero_maglia` (integer) - Numero di maglia
   - `ruolo` (varchar) - Ruolo (es. "Palleggiatrice", "Centrale", "Libero")
   - `foto_url` (text) - URL della foto del giocatore
   - `data_nascita` (date) - Data di nascita
   - `altezza` (integer) - Altezza in cm
   - `nazionalita` (varchar) - Nazionalità (default: "Italia")
   - `created_at`, `updated_at` (timestamp)

### Pagine

1. **`/squadre`** - Lista di tutte le squadre con possibilità di cliccare per vedere i dettagli
2. **`/squadre/[slug]`** - Dettaglio squadra con foto della squadra e card per ogni giocatore

## Setup Iniziale

### 1. Crea le tabelle nel database

Esegui lo script SQL su Supabase:

```bash
# Copia il contenuto di scripts/create-giocatori-table.sql
# ed eseguilo nella SQL Editor di Supabase
```

Oppure tramite Supabase CLI:

```bash
supabase db push scripts/create-giocatori-table.sql
```

### 2. Prepara le immagini

Crea la struttura delle cartelle per le immagini:

```
public/
  images/
    squadre/              # Foto delle squadre
      serie-b2-femminile.jpg
      prima-divisione-maschile.jpg
      under-18-femminile.jpg
      ...
    giocatori/            # Foto dei giocatori
      serie-b2/
        nome-cognome.jpg
      prima-divisione/
        nome-cognome.jpg
      ...
```

### 3. Modifica i dati di esempio

Apri `scripts/insert-giocatori.ts` e modifica:

- **Array `squadreData`**: Aggiungi/modifica le tue squadre
  - Assicurati che lo `slug` sia unico e URL-friendly
  - Usa il formato: `categoria-anno` (es. "serie-b2-femminile-2025-26")

- **Oggetto `giocatoriPerSquadra`**: Aggiungi i tuoi giocatori
  - La chiave deve corrispondere allo `slug` della squadra
  - Inserisci i dati reali dei giocatori

Esempio:

```typescript
const squadreData = [
  {
    nome: 'Prima Squadra Femminile',
    categoria: 'Serie B2',
    slug: 'serie-b2-femminile-2025-26',
    descrizione: 'Descrizione...',
    allenatore: 'Nome Allenatore',
    assistente_allenatore: 'Nome Assistente',
    immagine_url: '/images/squadre/serie-b2-femminile.jpg'
  }
]

const giocatoriPerSquadra = {
  'serie-b2-femminile-2025-26': [
    {
      nome: 'Maria',
      cognome: 'Rossi',
      numero_maglia: 10,
      ruolo: 'Schiacciatrice',
      foto_url: '/images/giocatori/serie-b2/maria-rossi.jpg',
      data_nascita: '1998-05-15',
      altezza: 180,
      nazionalita: 'Italia'
    },
    // ... altri giocatori
  ]
}
```

### 4. Installa le dipendenze necessarie

```bash
npm install tsx dotenv @supabase/supabase-js
```

### 5. Esegui lo script di inserimento

```bash
npx tsx scripts/insert-giocatori.ts
```

Lo script:
- Inserisce/aggiorna le squadre nel database
- Inserisce i giocatori associati ad ogni squadra
- Mostra un report dettagliato dell'operazione

## Aggiornamento Dati

### Aggiungere una nuova squadra

1. Carica la foto della squadra in `public/images/squadre/`
2. Aggiungi la squadra all'array `squadreData` in `insert-giocatori.ts`
3. Aggiungi i giocatori in `giocatoriPerSquadra` usando lo slug della squadra
4. Esegui: `npx tsx scripts/insert-giocatori.ts`

### Aggiungere nuovi giocatori a una squadra esistente

1. Carica le foto dei giocatori in `public/images/giocatori/[categoria]/`
2. Aggiungi i giocatori all'array corrispondente in `giocatoriPerSquadra`
3. Esegui: `npx tsx scripts/insert-giocatori.ts`

### Modificare dati esistenti

Puoi modificare i dati direttamente da Supabase Dashboard oppure:

1. Modifica i dati nello script `insert-giocatori.ts`
2. Esegui nuovamente lo script (le squadre verranno aggiornate grazie a `upsert`)

## Ruoli dei Giocatori

Ruoli comuni da utilizzare:

**Pallavolo Femminile/Maschile:**
- Palleggiatrice/Palleggiatore
- Schiacciatrice/Schiacciatore
- Centrale
- Opposta/Opposto
- Libero

## Struttura URL

- `/squadre` - Lista squadre
- `/squadre/serie-b2-femminile-2025-26` - Dettaglio squadra Serie B2
- `/squadre/prima-divisione-maschile-2025-26` - Dettaglio squadra Prima Divisione
- `/squadre/under-18-femminile-2025-26` - Dettaglio squadra Under 18

## Note Importanti

1. **Slug Format**: Usa sempre il formato `categoria-anno` per lo slug
2. **Foto**: Dimensioni consigliate:
   - Foto squadra: 1200x800px (landscape)
   - Foto giocatori: 800x1200px (portrait)
3. **Ottimizzazione**: Le immagini vengono servite tramite Next.js Image component per ottimizzazione automatica
4. **Backup**: Prima di modificare dati esistenti, fai un backup del database da Supabase Dashboard

## Troubleshooting

### Errore: Cannot find module 'tsx'
```bash
npm install -g tsx
# oppure usa npx
npx tsx scripts/insert-giocatori.ts
```

### Errore: NEXT_PUBLIC_SUPABASE_URL non definito
Assicurati che il file `.env` contenga:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Le immagini non vengono visualizzate
1. Verifica che i percorsi in `foto_url` siano corretti
2. Controlla che i file esistano in `public/images/`
3. I percorsi devono iniziare con `/images/`

### I giocatori non appaiono
1. Verifica che lo `slug` della squadra corrisponda tra `squadreData` e `giocatoriPerSquadra`
2. Controlla i log dello script per eventuali errori
3. Verifica su Supabase Dashboard che i dati siano stati inseriti correttamente
