import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Trophy } from "lucide-react"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Partite e Risultati",
  description: "Calendario completo e risultati delle partite del Volley Club Trieste. Segui le nostre squadre Serie D maschile e femminile, Prima Divisione e Under in tempo reale. Prossime partite e statistiche.",
  keywords: [
    "partite Volley Club Trieste",
    "calendario pallavolo Trieste",
    "risultati volley Trieste",
    "Serie D partite Trieste",
    "prossime partite pallavolo",
    "campionato pallavolo FVG",
    "risultati Serie D Trieste"
  ],
  openGraph: {
    title: "Partite e Risultati - Volley Club Trieste",
    description: "Calendario completo, risultati e statistiche delle partite del Volley Club Trieste. Segui le nostre squadre in campo!",
    url: "https://www.volleyclub.it/partite",
    type: "website",
  },
  alternates: {
    canonical: "https://www.volleyclub.it/partite",
  },
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
        return <Badge className="bg-yellow-600 hover:bg-yellow-700">Da Aggiornare</Badge>
      }
      return <Badge className="bg-blue-600 hover:bg-blue-700">Programmata</Badge>
    default:
      return <Badge variant="secondary">Sconosciuto</Badge>
  }
}

export default async function PartitePage() {
  const supabase = await createClient()

  // Get all matches ordered by date
  const { data: matches, error } = await supabase
    .from("partite")
    .select("*")
    .order("data_partita", { ascending: false })

  if (error) {
    console.error("Error fetching matches:", error)
  }

  // Separate matches by status
  const upcomingMatches = matches?.filter((match) => {
    const matchDate = new Date(match.data_partita)
    const now = new Date()
    return match.stato === "programmata" && matchDate >= now
  })

  const pastMatches = matches?.filter((match) => {
    const matchDate = new Date(match.data_partita)
    const now = new Date()
    return match.stato === "conclusa" || (match.stato === "programmata" && matchDate < now)
  })

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Header />

      {/* Hero Section */}
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

      {/* Matches Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Upcoming Matches */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Calendar className="h-7 w-7 text-[var(--color-volleyball-green-light)]" />
                Prossime Partite
              </h2>
              {upcomingMatches && upcomingMatches.length > 0 ? (
                <div className="space-y-6">
                  {upcomingMatches.map((match) => (
                    <Card key={match.id} className="glass border-white/20">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-[var(--color-volleyball-green-light)]" />
                            <span className="text-[var(--color-volleyball-green-light)] font-medium text-sm">
                              {match.campionato}
                            </span>
                          </div>
                          {getMatchStatusBadge(match.stato, match.data_partita)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center mb-4">
                          <div className="flex items-center justify-center gap-4 mb-2">
                            <span className="text-white font-bold text-xl">{match.squadra_casa}</span>
                            <span className="text-white/60 text-lg">vs</span>
                            <span className="text-white font-bold text-xl">{match.squadra_ospite}</span>
                          </div>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center gap-2 text-white/80">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(match.data_partita)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-white/80">
                            <Clock className="h-4 w-4" />
                            <span>{formatTime(match.data_partita)}</span>
                          </div>
                          {match.luogo && (
                            <div className="flex items-center gap-2 text-white/80">
                              <MapPin className="h-4 w-4" />
                              <span>{match.luogo}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="glass border-white/20">
                  <CardContent className="p-8 text-center">
                    <Calendar className="h-12 w-12 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60">Nessuna partita programmata al momento</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Past Matches */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Trophy className="h-7 w-7 text-[var(--color-volleyball-green-light)]" />
                Risultati
              </h2>
              {pastMatches && pastMatches.length > 0 ? (
                <div className="space-y-6">
                  {pastMatches.map((match) => (
                    <Card key={match.id} className="glass border-white/20">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-[var(--color-volleyball-green-light)]" />
                            <span className="text-[var(--color-volleyball-green-light)] font-medium text-sm">
                              {match.campionato}
                            </span>
                          </div>
                          {getMatchStatusBadge(match.stato, match.data_partita)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center mb-4">
                          <div className="flex items-center justify-center gap-6 mb-2">
                            <div className="text-center">
                              <div className="text-white font-bold text-lg mb-1">{match.squadra_casa}</div>
                              <div className="text-4xl font-bold text-[var(--color-volleyball-green-light)]">
                                {match.risultato_casa ?? "-"}
                              </div>
                            </div>
                            <span className="text-white/60 text-3xl">-</span>
                            <div className="text-center">
                              <div className="text-white font-bold text-lg mb-1">{match.squadra_ospite}</div>
                              <div className="text-4xl font-bold text-[var(--color-volleyball-green-light)]">
                                {match.risultato_ospite ?? "-"}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-white/80">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(match.data_partita)}</span>
                          </div>
                          {match.luogo && (
                            <div className="flex items-center gap-2 text-white/80">
                              <MapPin className="h-4 w-4" />
                              <span>{match.luogo}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="glass border-white/20">
                  <CardContent className="p-8 text-center">
                    <Trophy className="h-12 w-12 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60">Nessun risultato disponibile</p>
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
