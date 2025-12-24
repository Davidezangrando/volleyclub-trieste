import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, ExternalLink, Star, Handshake, Wrench, Mail } from "lucide-react"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Partner e Sponsor",
  description: "I partner che sostengono il Volley Club Trieste. Main sponsor, partner tecnici e collaborazioni. Scopri le opportunità di sponsorizzazione e partnership con la nostra società di pallavolo.",
  keywords: [
    "sponsor Volley Club Trieste",
    "partner pallavolo Trieste",
    "sponsorizzazione volley Trieste",
    "partnership sportive Trieste",
    "main sponsor pallavolo",
    "collaborazioni sport Trieste"
  ],
  openGraph: {
    title: "Partner e Sponsor - Volley Club Trieste",
    description: "Scopri i partner che sostengono il progetto sportivo del Volley Club Trieste. Opportunità di sponsorizzazione disponibili.",
    url: "https://www.volleyclub.it/sponsor",
    type: "website",
  },
  alternates: {
    canonical: "https://www.volleyclub.it/sponsor",
  },
}

interface Sponsor {
  id: string
  nome: string
  logo_url: string | null
  sito_web: string | null
  categoria: string
  descrizione: string | null
  attivo: boolean
}

function getCategoryIcon(categoria: string) {
  switch (categoria) {
    case "main_sponsor":
      return <Star className="h-5 w-5" />
    case "technical_partner":
      return <Wrench className="h-5 w-5" />
    case "collaboration":
      return <Handshake className="h-5 w-5" />
    default:
      return <Building2 className="h-5 w-5" />
  }
}

function getCategoryLabel(categoria: string) {
  switch (categoria) {
    case "main_sponsor":
      return "Main Sponsor"
    case "technical_partner":
      return "Partner Tecnico"
    case "collaboration":
      return "Collaborazione"
    default:
      return "Sponsor"
  }
}

function getCategoryColor(categoria: string) {
  switch (categoria) {
    case "main_sponsor":
      return "bg-yellow-600 hover:bg-yellow-700"
    case "technical_partner":
      return "bg-blue-600 hover:bg-blue-700"
    case "collaboration":
      return "bg-green-600 hover:bg-green-700"
    default:
      return "bg-gray-600 hover:bg-gray-700"
  }
}

export default async function SponsorPage() {
  const supabase = await createClient()

  const { data: sponsors, error } = await supabase
    .from("sponsor")
    .select("*")
    .eq("attivo", true)
    .order("categoria", { ascending: true })

  if (error) {
    console.error("Error fetching sponsors:", error)
  }

  // Group sponsors by category
  const mainSponsors = sponsors?.filter((s) => s.categoria === "main_sponsor") || []
  const technicalPartners = sponsors?.filter((s) => s.categoria === "technical_partner") || []
  const collaborations = sponsors?.filter((s) => s.categoria === "collaboration") || []

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-black/80 to-gray-900/80">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              I Nostri <span className="text-[var(--color-volleyball-green-light)]">Partner</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto text-pretty">
              Scopri tutti i partner che sostengono il Volley Club Trieste. Dalle aziende che credono nel nostro progetto
              sportivo ai partner tecnici che ci forniscono attrezzature e servizi.
            </p>
          </div>
        </div>
      </section>

      {/* Sponsors Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Main Sponsors */}
          {mainSponsors.length > 0 && (
            <div className="mb-20">
              <h2 className="text-4xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3">
                <Star className="h-8 w-8 text-yellow-500" />
                Main Sponsor
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mainSponsors.map((sponsor) => (
                  <Card key={sponsor.id} className="glass border-white/20 overflow-hidden">
                    <CardContent className="p-8 text-center bg-black/40 backdrop-blur-sm">
                      <div className="mb-6">
                        {sponsor.logo_url ? (
                          <img
                            src={sponsor.logo_url || "/placeholder.svg"}
                            alt={sponsor.nome}
                            className="h-24 w-auto mx-auto object-contain"
                          />
                        ) : (
                          <div className="h-24 w-24 mx-auto bg-gradient-to-br from-[var(--color-volleyball-green)] to-[var(--color-volleyball-green-light)] rounded-lg flex items-center justify-center">
                            <Building2 className="h-12 w-12 text-white" />
                          </div>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">{sponsor.nome}</h3>
                      {sponsor.descrizione && (
                        <p className="text-white/70 mb-4 text-pretty leading-relaxed">{sponsor.descrizione}</p>
                      )}
                      <Badge className={getCategoryColor(sponsor.categoria)} size="lg">
                        {getCategoryIcon(sponsor.categoria)}
                        <span className="ml-2">{getCategoryLabel(sponsor.categoria)}</span>
                      </Badge>
                      {sponsor.sito_web && (
                        <div className="mt-6">
                          <Button
                            className="bg-[var(--color-volleyball-green)] hover:bg-[var(--color-volleyball-green-light)] text-white"
                            asChild
                          >
                            <a href={sponsor.sito_web} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Visita Sito Web
                            </a>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Technical Partners */}
          {technicalPartners.length > 0 && (
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
                <Wrench className="h-7 w-7 text-blue-500" />
                Partner Tecnici
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {technicalPartners.map((sponsor) => (
                  <Card key={sponsor.id} className="glass border-white/20">
                    <CardContent className="p-6 bg-black/40 backdrop-blur-sm">
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0">
                          {sponsor.logo_url ? (
                            <img
                              src={sponsor.logo_url || "/placeholder.svg"}
                              alt={sponsor.nome}
                              className="h-16 w-16 object-contain"
                            />
                          ) : (
                            <div className="h-16 w-16 bg-gradient-to-br from-[var(--color-volleyball-green)] to-[var(--color-volleyball-green-light)] rounded-lg flex items-center justify-center">
                              <Building2 className="h-8 w-8 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">{sponsor.nome}</h3>
                          {sponsor.descrizione && (
                            <p className="text-white/70 mb-4 text-pretty leading-relaxed">{sponsor.descrizione}</p>
                          )}
                          <div className="flex items-center gap-3">
                            <Badge className={getCategoryColor(sponsor.categoria)}>
                              {getCategoryIcon(sponsor.categoria)}
                              <span className="ml-1">{getCategoryLabel(sponsor.categoria)}</span>
                            </Badge>
                            {sponsor.sito_web && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-white text-white hover:bg-white hover:text-black bg-transparent"
                                asChild
                              >
                                <a href={sponsor.sito_web} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Sito Web
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Collaborations */}
          {collaborations.length > 0 && (
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
                <Handshake className="h-7 w-7 text-green-500" />
                Collaborazioni
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {collaborations.map((sponsor) => (
                  <Card key={sponsor.id} className="glass border-white/20">
                    <CardContent className="p-6 bg-black/40 backdrop-blur-sm">
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0">
                          {sponsor.logo_url ? (
                            <img
                              src={sponsor.logo_url || "/placeholder.svg"}
                              alt={sponsor.nome}
                              className="h-16 w-16 object-contain"
                            />
                          ) : (
                            <div className="h-16 w-16 bg-gradient-to-br from-[var(--color-volleyball-green)] to-[var(--color-volleyball-green-light)] rounded-lg flex items-center justify-center">
                              <Building2 className="h-8 w-8 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">{sponsor.nome}</h3>
                          {sponsor.descrizione && (
                            <p className="text-white/70 mb-4 text-pretty leading-relaxed">{sponsor.descrizione}</p>
                          )}
                          <div className="flex items-center gap-3">
                            <Badge className={getCategoryColor(sponsor.categoria)}>
                              {getCategoryIcon(sponsor.categoria)}
                              <span className="ml-1">{getCategoryLabel(sponsor.categoria)}</span>
                            </Badge>
                            {sponsor.sito_web && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-white text-white hover:bg-white hover:text-black bg-transparent"
                                asChild
                              >
                                <a href={sponsor.sito_web} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Sito Web
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Partnership CTA */}
          <div className="text-center">
            <Card className="glass border-white/20 max-w-2xl mx-auto">
              <CardContent className="p-8 bg-black/40 backdrop-blur-sm text-center">
                <Building2 className="h-12 w-12 text-[var(--color-volleyball-green-light)] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Diventa Nostro Partner</h3>
                <p className="text-white/80 mb-6 text-pretty">
                  Sei interessato a sostenere il Volley Club Trieste? Contattaci per scoprire le opportunità di
                  partnership e sponsorizzazione.
                </p>
                <Button
                  size="lg"
                  className="bg-[var(--color-volleyball-green)] hover:bg-[var(--color-volleyball-green-light)] text-white"
                  asChild
                >
                  <Link href="/contatti">
                    <Mail className="h-4 w-4 mr-2" />
                    Contattaci
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
