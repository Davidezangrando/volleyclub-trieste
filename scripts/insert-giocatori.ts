/**
 * Script per inserire giocatori nel database Supabase
 *
 * Uso:
 * 1. Assicurati di aver eseguito lo script create-giocatori-table.sql su Supabase
 * 2. Imposta le variabili d'ambiente NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY
 * 3. Esegui: npx tsx scripts/insert-giocatori.ts
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Carica le variabili d'ambiente
dotenv.config({ path: resolve(__dirname, '../.env') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Errore: NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY devono essere impostate nel file .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Dati di esempio per le squadre
const squadreData = [
  // {
  //   nome: 'Serie D Maschile',
  //   categoria: 'Serie D Maschile',
  //   slug: 'serie-d-maschile-2025-26',
  //   descrizione: 'Serie D Maschile 2025-26.',
  //   allenatore: 'Luciano Cappellotto',
  //   assistente_allenatore: 'Alessia Piccino e Arianna Ortis',
  //   immagine_url: '/images/squadre/serie-d-maschile.png'
  // },
  {
    nome: 'Serie D Femminile',
    categoria: 'Serie D Femminile',
    slug: 'serie-d-femminile-2025-26',
    descrizione: 'Serie D Femminile 2025-26.',
    allenatore: 'Fulvio Horhannessian',
    assistente_allenatore: 'Marino Petri e Francesca Cheber',
    immagine_url: '/images/squadre/serie-d-femminile.png'
  },
  //  {
  //    nome: 'Prima Divisione Maschile',
  //    categoria: 'Prima Divisione',
  //    slug: 'prima-divisione-maschile-2025-26',
  //    descrizione: 'Le migliori squadre della Prima Divisione Maschile si sfidano per la vittoria.',
  //    allenatore: 'Simone Barazzuol',
  //    assistente_allenatore: 'Mauro Freccioni e Nicoletta Carbone',
  //    immagine_url: '/images/squadre/prima-divisione-maschile.png'
  //  },
  //  {
  //    nome: 'Prima divisione Femminile',
  //    categoria: 'Prima Divisione',
  //    slug: 'prima-divisione-femminile-2025-26',
  //    descrizione: 'Il vivaio del club, dove nascono le campionesse di domani.',
  //    allenatore: 'Christian Depar',
  //    assistente_allenatore: 'Stefano Dose',
  //    immagine_url: '/images/squadre/prima-divisione-femminile.png'
  //  }
]

// Dati di esempio per i giocatori
// IMPORTANTE: Modifica questi dati con i dati reali dei tuoi giocatori
const giocatoriPerSquadra: Record<string, Array<{
  nome: string
  cognome: string
  numero_maglia: number | null
  ruolo: string
  foto_url: string
}>> = {
  'serie-d-femminile-2025-26': [
    {
      nome: 'Sveva',
      cognome: 'Zanne',
      numero_maglia: 1,
      ruolo: 'Middle',
      foto_url: '/images/giocatori/serie-d-femminile/sveva-zanne.png'
    },
    {
      nome: 'Alice',
      cognome: 'Pellizzer',
      numero_maglia: 1,
      ruolo: 'Middle',
      foto_url: '/images/giocatori/serie-d-femminile/alice-pellizzer.png'
    },
    {
      nome: 'Sofia',
      cognome: 'Giocondi',
      numero_maglia: 1,
      ruolo: 'Outside',
      foto_url: '/images/giocatori/serie-d-femminile/sofia-giocondi.png'
    },
    {
      nome: 'Nicole',
      cognome: 'Brazzatti',
      numero_maglia: 1,
      ruolo: 'Setter',
      foto_url: '/images/giocatori/serie-d-femminile/nicole-brazzatti.png'
    },
    {
      nome: 'Giada',
      cognome: 'Dodini',
      numero_maglia: 1,
      ruolo: 'Libero',
      foto_url: '/images/giocatori/serie-d-femminile/giada-dodini.png'
    },
    {
      nome: 'Federica',
      cognome: 'Rescali',
      numero_maglia: 1,
      ruolo: 'Outside',
      foto_url: '/images/giocatori/serie-d-femminile/federica-rescali.png'
    },
    {
      nome: 'Nicoleta',
      cognome: 'Marandici',
      numero_maglia: 1,
      ruolo: 'Outside',
      foto_url: '/images/giocatori/serie-d-femminile/nicoleta-marandici.png'
    },
    {
      nome: 'Giada',
      cognome: 'Valente',
      numero_maglia: 1,
      ruolo: 'Opposite',
      foto_url: '/images/giocatori/serie-d-femminile/giada-valente.png'
    },
    {
      nome: 'Elena',
      cognome: 'Sefusatti',
      numero_maglia: 1,
      ruolo: 'Middle',
      foto_url: '/images/giocatori/serie-d-femminile/elena-sefusatti.png'
    },
    {
      nome: 'Sara',
      cognome: 'Roncarà',
      numero_maglia: 1,
      ruolo: 'Outside',
      foto_url: '/images/giocatori/serie-d-femminile/sara-roncara.png'
    },
    {
      nome: 'Anita',
      cognome: 'Milosevic',
      numero_maglia: 1,
      ruolo: 'Opposite',
      foto_url: '/images/giocatori/serie-d-femminile/anita-milosevic.png'
    },
    {
      nome: 'Mila',
      cognome: 'Vattovaz',
      numero_maglia: 1,
      ruolo: 'Setter',
      foto_url: '/images/giocatori/serie-d-femminile/mila-vattovaz.png'
    },
    {
      nome: 'Giulia',
      cognome: 'Spadaro',
      numero_maglia: 1,
      ruolo: 'Middle',
      foto_url: '/images/giocatori/serie-d-femminile/giulia-spadaro.png'
    },
    {
      nome: 'Claudia',
      cognome: 'Riga',
      numero_maglia: 1,
      ruolo: 'Libero',
      foto_url: '/images/giocatori/serie-d-femminile/claudia-riga.png'
    },
    {
      nome: 'Alessia',
      cognome: 'Bavdaz',
      numero_maglia: 1,
      ruolo: 'Outside',
      foto_url: '/images/giocatori/serie-d-femminile/alessia-bavdaz.png'
    },
  //   ,
  //   {
  //     nome: 'Giulia',
  //     cognome: 'Bianchi',
  //     numero_maglia: 4,
  //     ruolo: 'Schiacciatrice',
  //     foto_url: '/images/giocatori/serie-b2/giulia-bianchi.jpg',
  //     data_nascita: '1999-07-22',
  //     altezza: 180,
  //     nazionalita: 'Italia'
  //   },
  //   {
  //     nome: 'Martina',
  //     cognome: 'Verdi',
  //     numero_maglia: 7,
  //     ruolo: 'Centrale',
  //     foto_url: '/images/giocatori/serie-b2/martina-verdi.jpg',
  //     data_nascita: '1997-11-08',
  //     altezza: 185,
  //     nazionalita: 'Italia'
  //   },
  //   {
  //     nome: 'Sofia',
  //     cognome: 'Neri',
  //     numero_maglia: 9,
  //     ruolo: 'Opposta',
  //     foto_url: '/images/giocatori/serie-b2/sofia-neri.jpg',
  //     data_nascita: '2000-01-30',
  //     altezza: 178,
  //     nazionalita: 'Italia'
  //   },
  //   {
  //     nome: 'Elena',
  //     cognome: 'Ferrari',
  //     numero_maglia: 12,
  //     ruolo: 'Libero',
  //     foto_url: '/images/giocatori/serie-b2/elena-ferrari.jpg',
  //     data_nascita: '1998-09-12',
  //     altezza: 168,
  //     nazionalita: 'Italia'
  //   }
  // ],
  // 'prima-divisione-maschile-2025-26': [
  //   {
  //     nome: 'Marco',
  //     cognome: 'Romano',
  //     numero_maglia: 5,
  //     ruolo: 'Palleggiatore',
  //     foto_url: '/images/giocatori/prima-divisione/marco-romano.jpg',
  //     data_nascita: '1995-05-20',
  //     altezza: 188,
  //     nazionalita: 'Italia'
  //   },
  //   {
  //     nome: 'Luca',
  //     cognome: 'Marino',
  //     numero_maglia: 8,
  //     ruolo: 'Schiacciatore',
  //     foto_url: '/images/giocatori/prima-divisione/luca-marino.jpg',
  //     data_nascita: '1996-12-03',
  //     altezza: 195,
  //     nazionalita: 'Italia'
  //   },
  //   {
  //     nome: 'Andrea',
  //     cognome: 'Greco',
  //     numero_maglia: 11,
  //     ruolo: 'Centrale',
  //     foto_url: '/images/giocatori/prima-divisione/andrea-greco.jpg',
  //     data_nascita: '1994-08-17',
  //     altezza: 200,
  //     nazionalita: 'Italia'
  //   }
  ]
}

async function insertSquadre() {
  console.log('🏐 Inizio inserimento squadre...')

  const { data, error } = await supabase
    .from('squadre')
    .upsert(squadreData, { onConflict: 'slug' })
    .select()

  if (error) {
    console.error('❌ Errore durante l\'inserimento delle squadre:', error)
    throw error
  }

  console.log(`✅ ${data?.length || 0} squadre inserite/aggiornate con successo`)
  return data
}

async function insertGiocatori(squadre: any[]) {
  console.log('\n👥 Inizio inserimento giocatori...')

  let totalInserted = 0

  for (const squadra of squadre) {
    const giocatori = giocatoriPerSquadra[squadra.slug]

    if (!giocatori || giocatori.length === 0) {
      console.log(`⚠️  Nessun giocatore definito per ${squadra.nome}`)
      continue
    }

    // Aggiungi l'ID della squadra a ogni giocatore
    const giocatoriConSquadra = giocatori.map(g => ({
      ...g,
      squadra_id: squadra.id
    }))

    const { data, error } = await supabase
      .from('giocatori')
      .insert(giocatoriConSquadra)
      .select()

    if (error) {
      console.error(` Errore durante l'inserimento dei giocatori per ${squadra.nome}:`, error)
      continue
    }

    console.log(` ${data?.length || 0} giocatori inseriti per ${squadra.nome}`)
    totalInserted += data?.length || 0
  }

  console.log(`\nTotale giocatori inseriti: ${totalInserted}`)
}

async function main() {
  try {
    console.log('🚀 Inizio script di inserimento dati\n')

    const squadre = await insertSquadre()

    if (!squadre || squadre.length === 0) {
      console.error(' Nessuna squadra inserita. Interrompo lo script.')
      process.exit(1)
    }

    await insertGiocatori(squadre)

    console.log('\n Script completato con successo!')
  } catch (error) {
    console.error('\n Errore durante l\'esecuzione dello script:', error)
    process.exit(1)
  }
}

main()
