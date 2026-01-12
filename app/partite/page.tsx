import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Trophy } from "lucide-react"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Partite e Risultati",
  description: "Calendario completo e risultati delle partite del Volley Club Trieste.",
}

interface Match {
  id: string
  squadra_casa: string
  squadra_ospite: string
  data_partita: string
  risultato_casa: number | null
  risultato_ospite: number | null
  luogo: string | null
  campionato: string | null
  stato: string
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("it-IT", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function formatTime(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

function getMatchStatusBadge(stato: string, dataPartita: string) {
  const now = new Date()
  const matchDate = new Date(dataPartita)

  switch (stato) {
    case "conclusa":
      return <Badge className="bg-green-600 hover:bg-green-700">Conclusa</Badge>
    case "in_corso":
      return <Badge className="bg-red-600 hover:bg-red-700 animate-pulse">In Corso</Badge>
    case "programmata":
      if (matchDate < now) {
        return <Badge className="bg-yellow-600 hover:bg-yellow-700">In Attesa</Badge>
      }
      return <Badge className="bg-blue-600 hover:bg-blue-700">Programmata</Badge>
    default:
      return <Badge variant="secondary">Sconosciuto</Badge>
  }
}

export default async function PartitePage() {
  const supabase = await createClient()

  // Recuperiamo tutte le partite ordinate per data
  const { data: matches, error } = await supabase
    .from("partite")
    .select("*")
    .order("data_partita", { ascending: true })

  if (error) {
    console.error("Error fetching matches:", error)
  }

  const now = new Date()

  // --- LOGICA RISULTATI (Partite Passate - Una per Campionato) ---
  const allPastMatches = matches
    ?.filter((match) => {
      const matchDate = new Date(match.data_partita)
      return match.stato === "conclusa" || (match.stato === "programmata" && matchDate < now)
    })
    // Ordiniamo DESC (dalla più recente alla più vecchia)
    .sort((a, b) => new Date(b.data_partita).getTime() - new Date(a.data_partita).getTime()) || []

  const shownResultsChampionships = new Set<string>();

  const recentResults = allPastMatches.filter(match => {
    const camp = match.campionato || "Generico";
    if (!shownResultsChampionships.has(camp)) {
        shownResultsChampionships.add(camp);
        return true;
    }
    return false;
  });


  // --- LOGICA PROSSIME PARTITE (Una per Campionato) ---
  const allUpcoming = matches?.filter((match) => {
    const matchDate = new Date(match.data_partita)
    return match.stato === "programmata" && matchDate >= now
  }) || []

  const shownUpcomingChampionships = new Set<string>();
  
  const upcomingMatches = allUpcoming.filter(match => {
    const camp = match.campionato || "Generico";
    if (!shownUpcomingChampionships.has(camp)) {
        shownUpcomingChampionships.add(camp);
        return true;
    }
    return false;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Header />

      <section className="pt-24 pb-16 bg-gradient-to-r from-black/80 to-gray-900/80">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Partite e <span className="text-[var(--color-volleyball-green-light)]">Risultati</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto text-pretty">
              Segui tutte le partite del Volley Club Trieste. Calendario completo, risultati e statistiche delle nostre
              squadre in campo.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* COLONNA 1: Prossime Partite */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Calendar className="h-7 w-7 text-[var(--color-volleyball-green-light)]" />
                Prossimi Appuntamenti
              </h2>
              {upcomingMatches && upcomingMatches.length > 0 ? (
                <div className="space-y-6">
                  {upcomingMatches.map((match) => (
                    <Card key={match.id} className="glass border-white/20 hover:border-[var(--color-volleyball-green)]/50 transition-colors">
                      <CardHeader className="py-3 px-4 border-b border-white/5 bg-white/5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-[var(--color-volleyball-green-light)]" />
                            <span className="text-[var(--color-volleyball-green-light)] font-bold text-sm uppercase tracking-wider">
                              {match.campionato}
                            </span>
                          </div>
                          {getMatchStatusBadge(match.stato, match.data_partita)}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="text-center mb-6">
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <span className="text-white font-bold text-xl md:text-2xl text-balance">{match.squadra_casa}</span>
                            <span className="text-white/40 text-sm px-2 bg-white/5 rounded-full py-1">VS</span>
                            <span className="text-white font-bold text-xl md:text-2xl text-balance">{match.squadra_ospite}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm bg-white/5 p-4 rounded-xl">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-white/60 text-xs uppercase font-bold">
                                <Calendar className="h-3 w-3" /> Data
                            </div>
                            <span className="text-white font-medium capitalize">{formatDate(match.data_partita)}</span>
                          </div>
                          <div className="flex flex-col gap-1">
                             <div className="flex items-center gap-2 text-white/60 text-xs uppercase font-bold">
                                <Clock className="h-3 w-3" /> Ora
                            </div>
                            <span className="text-white font-medium">{formatTime(match.data_partita)}</span>
                          </div>
                          {match.luogo && (
                            <div className="col-span-2 flex flex-col gap-1 border-t border-white/5 pt-2 mt-1">
                                <div className="flex items-center gap-2 text-white/60 text-xs uppercase font-bold">
                                    <MapPin className="h-3 w-3" /> Dove
                                </div>
                                <span className="text-white font-medium text-pretty">{match.luogo}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <p className="text-center text-white/40 text-sm mt-4 italic">
                    * Viene mostrata solo la prossima partita in programma per ogni campionato.
                  </p>
                </div>
              ) : (
                <Card className="glass border-white/20">
                  <CardContent className="p-8 text-center">
                    <Calendar className="h-12 w-12 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60">Nessuna partita programmata a breve.</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* COLONNA 2: Ultimi Risultati */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Trophy className="h-7 w-7 text-[var(--color-volleyball-green-light)]" />
                Ultimi Risultati
              </h2>
              {recentResults && recentResults.length > 0 ? (
                <div className="space-y-6">
                  {recentResults.map((match) => (
                    <Card key={match.id} className="glass border-white/20 overflow-hidden">
                      <CardHeader className="py-3 px-5 bg-white/5 flex flex-row items-center justify-between space-y-0">
                          <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-[var(--color-volleyball-green-light)]" />
                            <span className="text-[var(--color-volleyball-green-light)] font-bold text-xs uppercase tracking-wide">
                              {match.campionato}
                            </span>
                          </div>
                          <span className="text-white/50 text-xs font-medium bg-black/20 px-2 py-1 rounded">
                            {formatDate(match.data_partita)}
                          </span>
                      </CardHeader>

                      <CardContent className="pt-6 pb-6">
                        {/* FIX MOBILE: Aggiunto min-w-0 ai flex items, ridotto font size su mobile, aggiunto break-words */}
                        <div className="flex items-center justify-between gap-2 sm:gap-4">
                            
                            {/* Squadra Casa */}
                            <div className="flex-1 text-right min-w-0">
                                <div className={`font-bold text-sm sm:text-lg md:text-xl leading-tight break-words hyphens-auto ${
                                    (match.risultato_casa || 0) > (match.risultato_ospite || 0) 
                                    ? "text-[var(--color-volleyball-green-light)] drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]" 
                                    : "text-white"
                                }`}>
                                    {match.squadra_casa}
                                </div>
                            </div>

                            {/* Punteggio */}
                            <div className="flex items-center justify-center min-w-[80px] sm:min-w-[100px] gap-2 bg-black/40 px-2 sm:px-3 py-2 rounded-lg border border-white/10 shadow-inner">
                                <span className="text-xl sm:text-3xl font-bold text-white tabular-nums">{match.risultato_casa ?? "-"}</span>
                                <span className="text-white/40 text-lg sm:text-xl font-light mx-1">:</span>
                                <span className="text-xl sm:text-3xl font-bold text-white tabular-nums">{match.risultato_ospite ?? "-"}</span>
                            </div>

                            {/* Squadra Ospite */}
                            <div className="flex-1 text-left min-w-0">
                                <div className={`font-bold text-sm sm:text-lg md:text-xl leading-tight break-words hyphens-auto ${
                                    (match.risultato_ospite || 0) > (match.risultato_casa || 0) 
                                    ? "text-[var(--color-volleyball-green-light)] drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]" 
                                    : "text-white"
                                }`}>
                                    {match.squadra_ospite}
                                </div>
                            </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                   <p className="text-center text-white/40 text-sm mt-4 italic">
                    * Viene mostrato solo l'ultimo risultato per ogni campionato.
                  </p>
                </div>
              ) : (
                <Card className="glass border-white/20">
                  <CardContent className="p-8 text-center">
                    <Trophy className="h-12 w-12 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60">Nessun risultato recente.</p>
                  </CardContent>
                </Card>
              )}
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}