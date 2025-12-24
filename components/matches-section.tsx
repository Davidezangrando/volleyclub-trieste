import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Trophy } from "lucide-react"
import Link from "next/link"

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

// Fallback data when database is not set up
const fallbackMatches: Match[] = [
  {
    id: "1",
    squadra_casa: "Volley Club Trieste",
    squadra_ospite: "Pallavolo Udine",
    data_partita: "2025-01-25T18:00:00+01:00",
    risultato_casa: null,
    risultato_ospite: null,
    luogo: "Palestra Comunale Trieste",
    campionato: "Serie D",
    stato: "programmata",
  },
  {
    id: "2",
    squadra_casa: "Volley Club Trieste",
    squadra_ospite: "Volley Gorizia",
    data_partita: "2025-02-01T20:30:00+01:00",
    risultato_casa: null,
    risultato_ospite: null,
    luogo: "Palestra Comunale Trieste",
    campionato: "Serie B2",
    stato: "programmata",
  },
  {
    id: "3",
    squadra_casa: "Volley Club Trieste",
    squadra_ospite: "Volley Monfalcone",
    data_partita: "2025-01-18T20:00:00+01:00",
    risultato_casa: 3,
    risultato_ospite: 1,
    luogo: "Palestra Comunale Trieste",
    campionato: "Serie B2",
    stato: "conclusa",
  },
  {
    id: "4",
    squadra_casa: "Pallavolo Lignano",
    squadra_ospite: "Volley Club Trieste",
    data_partita: "2025-01-11T19:30:00+01:00",
    risultato_casa: 1,
    risultato_ospite: 3,
    luogo: "Palestra Lignano",
    campionato: "Serie B2",
    stato: "conclusa",
  },
]

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

export async function MatchesSection() {
  let upcomingMatches: Match[] = []
  let recentMatches: Match[] = []

  try {
    const supabase = await createClient()

    // Get upcoming matches (next 3)
    const { data: upcoming } = await supabase
      .from("partite")
      .select("*")
      .gte("data_partita", new Date().toISOString())
      .order("data_partita", { ascending: true })
      .limit(3)

    // Get recent results (last 2)
    const { data: recent } = await supabase
      .from("partite")
      .select("*")
      .eq("stato", "conclusa")
      .order("data_partita", { ascending: false })
      .limit(2)

    if (upcoming) upcomingMatches = upcoming
    if (recent) recentMatches = recent
  } catch (error) {
    console.log("Using fallback matches data - database not set up yet")
    // Use fallback data
    const now = new Date()
    upcomingMatches = fallbackMatches
      .filter((match) => {
        const matchDate = new Date(match.data_partita)
        return match.stato === "programmata" && matchDate >= now
      })
      .slice(0, 3)

    recentMatches = fallbackMatches.filter((match) => match.stato === "conclusa").slice(0, 2)
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Partite e <span className="text-[var(--color-volleyball-green-light)]">Risultati</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto text-pretty">
            Segui le nostre squadre in campo. Scopri i prossimi appuntamenti e i risultati delle partite disputate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Upcoming Matches */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <Calendar className="h-6 w-6 text-[var(--color-volleyball-green-light)]" />
              Prossime Partite
            </h3>
            <div className="space-y-6">
              {upcomingMatches?.map((match) => (
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
                        <span className="text-white font-bold text-lg">{match.squadra_casa}</span>
                        <span className="text-white/60">vs</span>
                        <span className="text-white font-bold text-lg">{match.squadra_ospite}</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
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
          </div>

          {/* Recent Results */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <Trophy className="h-6 w-6 text-[var(--color-volleyball-green-light)]" />
              Ultimi Risultati
            </h3>
            <div className="space-y-6">
              {recentMatches?.map((match) => (
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
                        <div className="text-center">
                          <div className="text-white font-bold text-lg">{match.squadra_casa}</div>
                          <div className="text-3xl font-bold text-[var(--color-volleyball-green-light)]">
                            {match.risultato_casa ?? "-"}
                          </div>
                        </div>
                        <span className="text-white/60 text-2xl">-</span>
                        <div className="text-center">
                          <div className="text-white font-bold text-lg">{match.squadra_ospite}</div>
                          <div className="text-3xl font-bold text-[var(--color-volleyball-green-light)]">
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
          </div>
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="group bg-[var(--color-volleyball-green)] hover:bg-[var(--color-volleyball-green-light)] text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden border-2 border-transparent hover:border-white/30"
            asChild
          >
            <Link href="/partite">
              <span className="relative z-10 flex items-center gap-2">
                <Calendar className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                Vedi Tutte le Partite
                <Trophy className="h-4 w-4 group-hover:bounce transition-all duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
