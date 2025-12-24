import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, ExternalLink, Star, Handshake, Wrench } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Sponsor {
  id: string
  nome: string
  logo_url: string | null
  sito_web: string | null
  categoria: string
  descrizione: string | null
  attivo: boolean
}

// Fallback data when database is not set up
const fallbackSponsors: Sponsor[] = [
  {
    id: "1",
    nome: "Banca di Trieste",
    logo_url: null,
    sito_web: "https://www.bancatrieste.it",
    categoria: "main_sponsor",
    descrizione: "Partner principale del Volley Club Trieste, sostiene il nostro progetto sportivo da oltre 10 anni.",
    attivo: true,
  },
  {
    id: "2",
    nome: "SportTech Trieste",
    logo_url: null,
    sito_web: "https://www.sporttech-ts.it",
    categoria: "technical_partner",
    descrizione: "Fornitore ufficiale di attrezzature sportive e abbigliamento tecnico per tutte le nostre squadre.",
    attivo: true,
  },
  {
    id: "3",
    nome: "Ristorante Da Mario",
    logo_url: null,
    sito_web: null,
    categoria: "collaboration",
    descrizione: "Storico ristorante triestino che ospita le nostre cene di squadra e supporta gli eventi del club.",
    attivo: true,
  },
  {
    id: "4",
    nome: "Palestra Fitness Center",
    logo_url: null,
    sito_web: "https://www.fitnesscenterts.it",
    categoria: "technical_partner",
    descrizione:
      "Centro fitness che mette a disposizione le proprie strutture per la preparazione atletica delle nostre squadre.",
    attivo: true,
  },
]

function getCategoryIcon(categoria: string) {
  switch (categoria) {
    case "main_sponsor":
      return <Star className="h-4 w-4" />
    case "technical_partner":
      return <Wrench className="h-4 w-4" />
    case "collaboration":
      return <Handshake className="h-4 w-4" />
    default:
      return <Building2 className="h-4 w-4" />
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

// *** FIX: Funzione helper per correggere gli URL delle immagini ***
function getSafeImageUrl(url: string | null) {
  if (!url) return "/placeholder.svg"; // Fallback se null
  if (url.startsWith("http") || url.startsWith("https")) return url; // URL assoluti esterni ok
  if (url.startsWith("/")) return url; // Percorsi assoluti interni ok
  return `/${url}`; // Aggiunge lo slash se manca (es: "images/..." diventa "/images/...")
}

export async function SponsorsSection() {
  let sponsors: Sponsor[] = fallbackSponsors

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("sponsor")
      .select("*")
      .eq("attivo", true)
      .order("categoria", { ascending: true })

    if (!error && data) {
      sponsors = data
    }
  } catch (error) {
    console.log("Using fallback sponsors data - database not set up yet")
  }

  // Group sponsors by category
  const mainSponsors = sponsors?.filter((s) => s.categoria === "main_sponsor") || []
  const technicalPartners = sponsors?.filter((s) => s.categoria === "technical_partner") || []
  const collaborations = sponsors?.filter((s) => s.categoria === "collaboration") || []

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            I Nostri <span className="text-[var(--color-volleyball-green-light)]">Partner</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto text-pretty">
            Grazie ai nostri sponsor e partner che sostengono il Volley Club Trieste e rendono possibili i nostri
            progetti sportivi e sociali.
          </p>
        </div>

        {/* Main Sponsors */}
        {mainSponsors.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
              <Star className="h-6 w-6 text-yellow-500" />
              Main Sponsor
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {mainSponsors.map((sponsor) => (
                <Card
                  key={sponsor.id}
                  className="glass border-white/20 overflow-hidden group hover:scale-105 transition-transform duration-300"
                >
                  <CardContent className="p-8 text-center bg-black/40 backdrop-blur-sm">
                    <div className="mb-6">
                      {sponsor.logo_url ? (
                        <Image
                          src={getSafeImageUrl(sponsor.logo_url)} // *** FIX APPLICATO QUI ***
                          alt={sponsor.nome}
                          width={160}
                          height={80}
                          className="mx-auto object-contain"
                        />
                      ) : (
                        <div className="h-20 w-20 mx-auto bg-gradient-to-br from-[var(--color-volleyball-green)] to-[var(--color-volleyball-green-light)] rounded-lg flex items-center justify-center">
                          <Building2 className="h-10 w-10 text-white" />
                        </div>
                      )}
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-3">{sponsor.nome}</h4>
                    {sponsor.descrizione && <p className="text-white/70 mb-4 text-pretty">{sponsor.descrizione}</p>}
                    <Badge className={getCategoryColor(sponsor.categoria)}>
                      {getCategoryIcon(sponsor.categoria)}
                      <span className="ml-1">{getCategoryLabel(sponsor.categoria)}</span>
                    </Badge>
                    {sponsor.sito_web && (
                      <div className="mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white text-white hover:bg-white hover:text-black bg-transparent"
                          asChild
                        >
                          <a href={sponsor.sito_web} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Visita Sito
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

        {/* Technical Partners and Collaborations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Technical Partners */}
          {technicalPartners.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <Wrench className="h-6 w-6 text-blue-500" />
                Partner Tecnici
              </h3>
              <div className="space-y-4">
                {technicalPartners.map((sponsor) => (
                  <Card key={sponsor.id} className="glass border-white/20">
                    <CardContent className="p-6 bg-black/40 backdrop-blur-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          {sponsor.logo_url ? (
                            <Image
                              src={getSafeImageUrl(sponsor.logo_url)} // *** FIX APPLICATO QUI ***
                              alt={sponsor.nome}
                              width={96}
                              height={48}
                              className="object-contain"
                            />
                          ) : (
                            <div className="h-12 w-12 bg-gradient-to-br from-[var(--color-volleyball-green)] to-[var(--color-volleyball-green-light)] rounded-lg flex items-center justify-center">
                              <Building2 className="h-6 w-6 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-white mb-1">{sponsor.nome}</h4>
                          {sponsor.descrizione && (
                            <p className="text-white/70 text-sm mb-2 text-pretty">{sponsor.descrizione}</p>
                          )}
                          <div className="flex items-center gap-2">
                            <Badge className={getCategoryColor(sponsor.categoria)} size="sm">
                              {getCategoryIcon(sponsor.categoria)}
                              <span className="ml-1">{getCategoryLabel(sponsor.categoria)}</span>
                            </Badge>
                            {sponsor.sito_web && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-white/60 hover:text-white p-1 h-auto"
                                asChild
                              >
                                <a
                                  href={sponsor.sito_web}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`Visita il sito di ${sponsor.nome}`}
                                >
                                  <ExternalLink className="h-4 w-4" />
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
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <Handshake className="h-6 w-6 text-green-500" />
                Collaborazioni
              </h3>
              <div className="space-y-4">
                {collaborations.map((sponsor) => (
                  <Card key={sponsor.id} className="glass border-white/20">
                    <CardContent className="p-6 bg-black/40 backdrop-blur-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          {sponsor.logo_url ? (
                            <Image
                              src={getSafeImageUrl(sponsor.logo_url)} // *** FIX APPLICATO QUI ***
                              alt={sponsor.nome}
                              width={96}
                              height={48}
                              className="object-contain"
                            />
                          ) : (
                            <div className="h-12 w-12 bg-gradient-to-br from-[var(--color-volleyball-green)] to-[var(--color-volleyball-green-light)] rounded-lg flex items-center justify-center">
                              <Building2 className="h-6 w-6 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-white mb-1">{sponsor.nome}</h4>
                          {sponsor.descrizione && (
                            <p className="text-white/70 text-sm mb-2 text-pretty">{sponsor.descrizione}</p>
                          )}
                          <div className="flex items-center gap-2">
                            <Badge className={getCategoryColor(sponsor.categoria)} size="sm">
                              {getCategoryIcon(sponsor.categoria)}
                              <span className="ml-1">{getCategoryLabel(sponsor.categoria)}</span>
                            </Badge>
                            {sponsor.sito_web && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-white/60 hover:text-white p-1 h-auto"
                                asChild
                              >
                                <a
                                  href={sponsor.sito_web}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`Visita il sito di ${sponsor.nome}`}
                                >
                                  <ExternalLink className="h-4 w-4" />
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
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-[var(--color-volleyball-green)] hover:bg-[var(--color-volleyball-green-light)] text-white px-8 py-3"
            asChild
          >
            <Link href="/sponsor">Scopri Tutti i Partner</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}