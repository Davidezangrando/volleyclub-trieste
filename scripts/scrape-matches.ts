import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve } from 'path'
import * as cheerio from 'cheerio'

// 1. Setup Ambiente
dotenv.config({ path: resolve(__dirname, '../.env') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
// Usa la SERVICE KEY per bypassare RLS e scrivere nel DB
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Errore: Variabili Supabase mancanti.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// --- CONFIGURAZIONE SQUADRE ---
// Lista dei nomi con cui la squadra può apparire nei vari campionati
const TARGET_TEAM_NAMES = [
    "VITALFRUTTA VolleyClub TS",
    "Volley Club",          // Generico (1a Div, Giovanili)
    "Volley Club TS",       // Serie D Femminile
    "ROSSO Volley Club TS"  // Serie D Maschile
];

// --- CONFIGURAZIONE CAMPIONATI TRIESTE (Portale Provinciale) ---
const TRIESTE_BASE_URL = "https://trieste.portalefipav.net";
const TRIESTE_CHAMPIONSHIPS = [
    { id: 85747, name: '1a Divisione Maschile' },
    { id: 85684, name: '1a Divisione Femminile' }, // Aggiungi ID corretto se diverso
    { id: 86019, name: 'Under 15 Maschile' },
    { id: 85727, name: 'Under 17 Maschile' }
];

// --- CONFIGURAZIONE FVG (Portale Regionale) ---
const FVG_URL = "https://friulivg.portalefipav.net/risultati-classifiche.aspx?PId=7274";

// Array accumulatore per tutte le partite
let allMatchesToSave: any[] = [];

// Funzione Helper: Controlla se una delle mie squadre è coinvolta
function isMyTeam(teamHome: string, teamAway: string): boolean {
    const normalize = (str: string) => str.toLowerCase();
    return TARGET_TEAM_NAMES.some(target => 
        normalize(teamHome).includes(normalize(target)) || 
        normalize(teamAway).includes(normalize(target))
    );
}

/**
 * STRATEGIA 1: Scraping Portal FIPAV Trieste (Mobile View)
 * Gestisce: 1a Div, Under 15, Under 17
 */
async function scrapeTriesteCampionship(championshipId: number, categoryName: string) {
    const listUrl = `${TRIESTE_BASE_URL}/mobile/risultati.asp?CampionatoId=${championshipId}`;
    console.log(`\n📡 [Trieste] Scraping ${categoryName} (ID: ${championshipId})...`);

    try {
        const response = await fetch(listUrl);
        const html = await response.text();
        const $ = cheerio.load(html);
        
        const elements = $('a.gara').toArray();
        let count = 0;

        for (const element of elements) {
            const el = $(element);
            
            // Estrazione Nomi (Pulizia numeri set)
            const homeNode = el.find('.squadraCasa').clone();
            homeNode.find('.setCasa').remove();
            const teamHome = homeNode.text().trim();

            const awayNode = el.find('.squadraOspite').clone();
            awayNode.find('.setOspite').remove();
            const teamAway = awayNode.text().trim();

            // Estrazione Punteggi
            const scoreHomeStr = el.find('.setCasa').text().trim();
            const scoreAwayStr = el.find('.setOspite').text().trim();

            // Filtro Squadra
            if (isMyTeam(teamHome, teamAway)) {
                
                // Navigazione per Data (Entra nel dettaglio match)
                const relativeLink = el.attr('href');
                let matchDate = new Date(); // Fallback

                if (relativeLink) {
                    try {
                        const detailRes = await fetch(TRIESTE_BASE_URL + relativeLink);
                        const detailHtml = await detailRes.text();
                        const $detail = cheerio.load(detailHtml);
                        const pageText = $detail.root().text();

                        // Regex flessibile: 24/02/2025 [spazio/testo] 20:30
                        const dateRegex = /(\d{2})\/(\d{2})\/(\d{4}).*?(\d{2}):(\d{2})/;
                        const dateMatch = pageText.match(dateRegex);

                        if (dateMatch) {
                            matchDate = new Date(
                                parseInt(dateMatch[3]), 
                                parseInt(dateMatch[2]) - 1, 
                                parseInt(dateMatch[1]), 
                                parseInt(dateMatch[4]), 
                                parseInt(dateMatch[5])
                            );
                        }
                    } catch (e) { 
                        // console.error("Errore dettaglio data", e); 
                    }
                }

                let stato = (scoreHomeStr !== '' && scoreAwayStr !== '') ? 'conclusa' : 'programmata';

                allMatchesToSave.push({
                    squadra_casa: teamHome,
                    squadra_ospite: teamAway,
                    risultato_casa: parseInt(scoreHomeStr) || 0,
                    risultato_ospite: parseInt(scoreAwayStr) || 0,
                    data_partita: matchDate.toISOString(),
                    campionato: categoryName,
                    stato: stato
                });
                count++;
            }
        }
        console.log(`   ✅ Trovate ${count} partite per ${categoryName}`);

    } catch (error) {
        console.error(`   ❌ Errore scraping Trieste ID ${championshipId}:`, error);
    }
}


/**
 * STRATEGIA 2: Scraping FIPAV FVG (Desktop View - Tabellare)
 * Gestisce: Serie D Maschile ("ROSSO Volley Club TS") e Femminile ("Volley Club TS")
 */
async function scrapeFipavFVG() {
    console.log(`\n📡 [FVG] Scraping Serie D (M/F) da fipavfvg.it...`);
    
    try {
        const response = await fetch(FVG_URL);
        const html = await response.text(); 
        const $ = cheerio.load(html);
        console.log(html);
        const rows = $('table.tbl-risultati tbody tr').toArray();
        let count = 0;

        for (const row of rows) {
            const cols = $(row).find('td');
            if (cols.length < 5) continue;

            // Indici colonne FVG: 2: Data, 3: Casa, 4: Ospite, 5: Risultato
            const rawDate = $(cols[2]).text().trim(); 
            const teamHome = $(cols[3]).text().trim(); 
            const teamAway = $(cols[4]).text().trim();
            const rawResult = $(cols[5]).text().trim(); 

            // Filtro Squadra usando la lista Alias
            if (isMyTeam(teamHome, teamAway)) {

                // Identificazione Campionato dal titolo della tabella
                const captionText = $(row).closest('table').find('caption').text().toLowerCase();
                let categoryName = 'Serie D';

                // Logica intelligente per distinguere i campionati
                if (captionText.includes('serie d') && captionText.includes(' f ')) {
                    categoryName = 'Serie D Femminile';
                } else if (captionText.includes('serie d') && captionText.includes(' m ')) {
                    categoryName = 'Serie D Maschile';
                } else if (captionText.includes('1 div') || captionText.includes('under')) {
                    // Evita duplicati se FVG pubblica anche i campionati provinciali
                    continue;
                } else {
                    // Fallback: determina dal nome della squadra
                    const normalize = (str: string) => str.toLowerCase();
                    if (normalize(teamHome).includes('rosso volley club ts') ||
                        normalize(teamAway).includes('rosso volley club ts')) {
                        categoryName = 'Serie D Maschile';
                    } else if (normalize(teamHome).includes('volley club ts') ||
                               normalize(teamAway).includes('volley club ts')) {
                        categoryName = 'Serie D Femminile';
                    }
                }

                // Parsing Data (formato: gg/mm/yy HH:MM)
                let matchDate = new Date();
                const dateParts = rawDate.split(' '); 
                if (dateParts.length >= 2) {
                    const d = dateParts[0].split('/'); 
                    const t = dateParts[1].split(':'); 
                    
                    let year = parseInt(d[2]);
                    if (year < 100) year += 2000; // Fix anno "26" -> 2026

                    matchDate = new Date(year, parseInt(d[1]) - 1, parseInt(d[0]), parseInt(t[0]), parseInt(t[1]));
                }

                // Parsing Risultato
                let scoreHome = 0;
                let scoreAway = 0;
                let stato = 'programmata';

                if (rawResult.includes('-') && rawResult.length > 2) {
                    const scores = rawResult.split('-');
                    scoreHome = parseInt(scores[0]);
                    scoreAway = parseInt(scores[1]);
                    stato = 'conclusa';
                }

                allMatchesToSave.push({
                    squadra_casa: teamHome,
                    squadra_ospite: teamAway,
                    risultato_casa: scoreHome,
                    risultato_ospite: scoreAway,
                    data_partita: matchDate.toISOString(),
                    campionato: categoryName,
                    stato: stato
                });
                count++;
            }
        }
        console.log(`   ✅ Trovate ${count} partite in Serie D (FVG)`);

    } catch (error) {
        console.error(`   ❌ Errore scraping FVG:`, error);
    }
}


// --- MAIN ---
async function main() {
    allMatchesToSave = [];

    // 1. Esegui scraper standard (Trieste)
    for (const champ of TRIESTE_CHAMPIONSHIPS) {
        await scrapeTriesteCampionship(champ.id, champ.name);
        // Piccolo ritardo per non floodare il server
        await new Promise(r => setTimeout(r, 200)); 
    }

    // 2. Esegui scraper regionale (FVG)
    await scrapeFipavFVG();

    // 3. Salvataggio Unico
    if (allMatchesToSave.length > 0) {
        console.log(`\n💾 Salvataggio totale di ${allMatchesToSave.length} partite...`);
        
        const { error } = await supabase
            .from('partite')
            .upsert(allMatchesToSave, { 
                onConflict: 'squadra_casa,squadra_ospite,data_partita' 
            });

        if (error) console.error('❌ Errore Database:', error);
        else console.log('✅ Database sincronizzato con successo!');
    } else {
        console.log("\n⚠️ Nessuna partita trovata in nessun campionato.");
    }
}

main();