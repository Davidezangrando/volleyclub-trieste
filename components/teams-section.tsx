import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Trophy } from "lucide-react"
import Link from "next/link"

interface Team {
  id: string
  nome: string
  categoria: string
  descrizione: string | null
  immagine_url: string | null
  allenatore: string | null
  assistente_allenatore: string | null
  slug: string | null
}

// Fallback data when database is not set up
const fallbackTeams: Team[] = [
  {
    id: "1",
    nome: "Prima Squadra",
    categoria: "Serie B2",
    descrizione:
      "La prima squadra del Volley Club Trieste che compete nel campionato nazionale di Serie B2. Formata da atlete esperte e determinate.",
    immagine_url: null,
    allenatore: "Marco Rossi",
    assistente_allenatore: "Laura Bianchi",
    slug: null,
  },
  {
    id: "2",
    nome: "Under 18",
    categoria: "Giovanile",
    descrizione:
      "Squadra giovanile Under 18 che rappresenta il futuro del club. Giovani talenti in crescita con grande potenziale.",
    immagine_url: null,
    allenatore: "Andrea Verdi",
    assistente_allenatore: null,
    slug: null,
  },
  {
    id: "3",
    nome: "Under 16",
    categoria: "Giovanile",
    descrizione: "Formazione Under 16 dove le ragazze iniziano a sviluppare le tecniche avanzate della pallavolo.",
    immagine_url: null,
    allenatore: "Giulia Neri",
    assistente_allenatore: "Francesca Blu",
    slug: null,
  },
  {
    id: "4",
    nome: "Minivolley",
    categoria: "Giovanissime",
    descrizione: "Il settore minivolley per le più piccole, dove si impara giocando e divertendosi.",
    immagine_url: null,
    allenatore: "Elena Gialli",
    assistente_allenatore: null,
    slug: null,
  },
]

export async function TeamsSection() {
  let teams: Team[] = fallbackTeams

  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from("squadre").select("*").order("categoria", { ascending: true })

    if (!error && data) {
      teams = data
    }
  } catch (error) {
    console.log("Using fallback teams data - database not set up yet")
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Le Nostre <span className="text-[var(--color-volleyball-green-light)]">Squadre</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto text-pretty">
            Dal settore giovanile alla prima squadra, scopri tutte le nostre formazioni che rappresentano i colori del
            Volley Club Trieste sui campi di tutta la regione.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {teams?.map((team) => {
            const teamCard = (
              <Card
                key={team.id}
                className="glass border-white/20 overflow-hidden group hover:scale-105 transition-transform duration-300 backdrop-blur-md shadow-lg cursor-pointer"
              >
                <div className="relative h-48 bg-gradient-to-br from-[var(--color-volleyball-green)] to-[var(--color-volleyball-green-light)]">
                  {team.immagine_url ? (
                    <img
                      src={team.immagine_url || "/placeholder.svg"}
                      alt={team.nome}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Users className="h-16 w-16 text-white/80" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-2xl font-bold text-white mb-1">{team.nome}</h3>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-[var(--color-volleyball-green-light)]" />
                      <span className="text-white/90 font-medium">{team.categoria}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 bg-black/40 backdrop-blur-sm">
                  <p className="text-white/80 mb-4 text-pretty">{team.descrizione || "Squadra del Volley Club Trieste"}</p>

                  <div className="space-y-2 mb-4">
                    {team.allenatore && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-[var(--color-volleyball-green-light)] font-medium">Allenatore:</span>
                        <span className="text-white">{team.allenatore}</span>
                      </div>
                    )}
                    {team.assistente_allenatore && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-[var(--color-volleyball-green-light)] font-medium">Assistente:</span>
                        <span className="text-white">{team.assistente_allenatore}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )

            return team.slug ? (
              <Link key={team.id} href={`/squadre/${team.slug}`}>
                {teamCard}
              </Link>
            ) : (
              teamCard
            )
          })}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="group bg-[var(--color-volleyball-green)] hover:bg-[var(--color-volleyball-green-light)] text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden border-2 border-transparent hover:border-white/30"
            asChild
          >
            <Link href="/squadre">
              <span className="relative z-10 flex items-center gap-2">
                <Users className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                Scopri Tutte le Squadre
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
