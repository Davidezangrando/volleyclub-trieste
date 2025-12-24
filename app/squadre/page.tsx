import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Trophy, User, UserCheck, ArrowRight } from "lucide-react"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image" // <--- IMPORTANTE: Importa Image
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Le Nostre Squadre",
  description: "Scopri tutte le squadre del Volley Club Trieste: Serie D maschile e femminile, Prima Divisione, Under 17 maschile e Under 14 femminile. Rosa completa, allenatori e staff tecnico.",
  keywords: [
    "squadre Volley Club Trieste",
    "Serie D maschile Trieste",
    "Serie D femminile Trieste",
    "Prima Divisione pallavolo Trieste",
    "Under 17 pallavolo Trieste",
    "Under 14 pallavolo Trieste",
    "rosa squadre volley Trieste",
    "allenatori pallavolo Trieste"
  ],
  openGraph: {
    title: "Le Nostre Squadre - Volley Club Trieste",
    description: "Serie D, Prima Divisione e settore giovanile. Scopri tutte le formazioni del Volley Club Trieste.",
    url: "https://www.volleyclub.it/squadre",
    type: "website",
  },
  alternates: {
    canonical: "https://www.volleyclub.it/squadre",
  },
}

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

// Helper per evitare errori sui percorsi (lo stesso che abbiamo usato per gli sponsor)
function getSafeImageUrl(url: string | null) {
  if (!url) return "/placeholder.svg";
  if (url.startsWith("http") || url.startsWith("https")) return url;
  if (url.startsWith("/")) return url;
  return `/${url}`;
}

export default async function SquadrePage() {
  const supabase = await createClient()

  const { data: teams, error } = await supabase.from("squadre").select("*").order("categoria", { ascending: true })

  if (error) {
    console.error("Error fetching teams:", error)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-black/80 to-gray-900/80">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Le Nostre <span className="text-[var(--color-volleyball-green-light)]">Squadre</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto text-pretty">
              Scopri tutte le formazioni del Volley Club Trieste, dalla prima squadra che compete in Serie D fino al
              settore giovanile che rappresenta il futuro del nostro club.
            </p>
          </div>
        </div>
      </section>

      {/* Teams Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {teams?.map((team) => (
              <Card key={team.id} className="glass border-white/20 overflow-hidden group"> {/* Aggiunto group per effetti hover se servono */}
                
                {/* MODIFICA IMPORTANTE QUI SOTTO:
                   Sostituito <img> con <Image /> di Next.js
                */}
                <div className="relative h-64 bg-gradient-to-br from-[var(--color-volleyball-green)] to-[var(--color-volleyball-green-light)]">
                  {team.immagine_url ? (
                    <Image
                      src={getSafeImageUrl(team.immagine_url)}
                      alt={team.nome}
                      fill // Riempie il contenitore relative
                      className="object-cover"
                      // SIZES è fondamentale per Lighthouse:
                      // Su mobile (fino a 1024px) l'immagine occupa tutto lo schermo (100vw)
                      // Su desktop (oltre 1024px) occupa metà schermo (50vw) perché è una griglia a 2 colonne
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={true} // Caricamento lazy (default)
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Users className="h-20 w-20 text-white/80" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                <CardHeader className="bg-black/40 backdrop-blur-sm">
                  <CardTitle className="text-2xl text-white flex items-center gap-3">
                    <Trophy className="h-6 w-6 text-[var(--color-volleyball-green-light)]" />
                    {team.nome}
                  </CardTitle>
                  <p className="text-[var(--color-volleyball-green-light)] font-semibold text-lg">{team.categoria}</p>
                </CardHeader>

                <CardContent className="bg-black/40 backdrop-blur-sm p-6">
                  <p className="text-white/80 mb-6 text-pretty leading-relaxed">
                    {team.descrizione ||
                      "Squadra del Volley Club Trieste che rappresenta i nostri colori con passione e determinazione."}
                  </p>

                  <div className="space-y-4 mb-6">
                    {team.allenatore && (
                      <div className="flex items-center gap-3 p-3 glass rounded-lg">
                        <User className="h-5 w-5 text-[var(--color-volleyball-green-light)]" />
                        <div>
                          <span className="text-[var(--color-volleyball-green-light)] font-medium text-sm">
                            Allenatore
                          </span>
                          <p className="text-white font-semibold">{team.allenatore}</p>
                        </div>
                      </div>
                    )}

                    {team.assistente_allenatore && (
                      <div className="flex items-center gap-3 p-3 glass rounded-lg">
                        <UserCheck className="h-5 w-5 text-[var(--color-volleyball-green-light)]" />
                        <div>
                          <span className="text-[var(--color-volleyball-green-light)] font-medium text-sm">
                            Assistente Allenatore
                          </span>
                          <p className="text-white font-semibold">{team.assistente_allenatore}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {team.slug && (
                    <Link href={`/squadre/${team.slug}`}>
                      <Button className="w-full bg-[var(--color-volleyball-green)] hover:bg-[var(--color-volleyball-green-light)] text-white">
                        Vedi Rosa Completa
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}