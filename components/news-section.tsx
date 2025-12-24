import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Star } from "lucide-react"
import Link from "next/link"

interface NewsItem {
  id: string
  titolo: string
  contenuto: string
  immagine_url: string | null
  autore: string | null
  pubblicata: boolean
  in_evidenza: boolean
  data_pubblicazione: string
}

// Fallback data when database is not set up
const fallbackNews: NewsItem[] = [
  {
    id: "1",
    titolo: "Vittoria importante contro Monfalcone",
    contenuto:
      "Grande prestazione della prima squadra che ha battuto il Volley Monfalcone per 3-1 in una partita combattuta fino all'ultimo punto. Le ragazze hanno dimostrato carattere e determinazione, conquistando tre punti fondamentali per la classifica. Ottime le prestazioni di tutte le giocatrici, con particolare menzione per la capitana che ha guidato la squadra nei momenti decisivi.",
    immagine_url: null,
    autore: "Redazione",
    pubblicata: true,
    in_evidenza: true,
    data_pubblicazione: "2025-01-19T10:00:00+01:00",
  },
  {
    id: "2",
    titolo: "Trasferta vincente a Lignano",
    contenuto:
      "Altra vittoria per le nostre ragazze che hanno espugnato il campo di Lignano con un netto 3-1. La squadra ha mostrato un gioco fluido e una grande intesa, frutto del lavoro svolto in allenamento. Coach Rossi si è detto soddisfatto della prestazione e della crescita del gruppo.",
    immagine_url: null,
    autore: "Marco Rossi",
    pubblicata: true,
    in_evidenza: false,
    data_pubblicazione: "2025-01-12T15:30:00+01:00",
  },
  {
    id: "3",
    titolo: "Prossimo impegno casalingo contro Udine",
    contenuto:
      "Sabato 25 gennaio alle ore 18:00 la prima squadra affronterà la Pallavolo Udine nella palestra comunale. Sarà una partita importante per consolidare la posizione in classifica. L'ingresso è gratuito e invitiamo tutti i tifosi a venire a sostenere le nostre ragazze.",
    immagine_url: null,
    autore: "Redazione",
    pubblicata: true,
    in_evidenza: false,
    data_pubblicazione: "2025-01-20T09:00:00+01:00",
  },
]

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("it-IT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function truncateText(text: string, maxLength = 150) {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + "..."
}

export async function NewsSection() {
  let featuredArticle: NewsItem | null = null
  let otherNews: NewsItem[] = []

  try {
    const supabase = await createClient()

    // Get featured news and recent news
    const { data: featuredNews } = await supabase
      .from("news")
      .select("*")
      .eq("pubblicata", true)
      .eq("in_evidenza", true)
      .order("data_pubblicazione", { ascending: false })
      .limit(1)

    const { data: recentNews } = await supabase
      .from("news")
      .select("*")
      .eq("pubblicata", true)
      .order("data_pubblicazione", { ascending: false })
      .limit(4)

    if (featuredNews && featuredNews.length > 0) {
      featuredArticle = featuredNews[0]
    }
    if (recentNews) {
      otherNews = recentNews.filter((news) => news.id !== featuredArticle?.id).slice(0, 3)
    }
  } catch (error) {
    console.log("Using fallback news data - database not set up yet")
    // Use fallback data
    featuredArticle = fallbackNews.find((news) => news.in_evidenza) || null
    otherNews = fallbackNews.filter((news) => !news.in_evidenza).slice(0, 3)
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            News e <span className="text-[var(--color-volleyball-green-light)]">Aggiornamenti</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto text-pretty">
            Resta sempre aggiornato sulle ultime novità del Volley Club Trieste. Risultati, eventi e tutto quello che
            succede nel nostro mondo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Featured Article */}
          {featuredArticle && (
            <div className="lg:col-span-2">
              <Card className="glass border-white/20 overflow-hidden h-full">
                <div className="relative h-64 lg:h-80">
                  {featuredArticle.immagine_url ? (
                    <img
                      src={featuredArticle.immagine_url || "/placeholder.svg"}
                      alt={featuredArticle.titolo}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--color-volleyball-green)] to-[var(--color-volleyball-green-light)] flex items-center justify-center">
                      <Star className="h-16 w-16 text-white/80" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[var(--color-volleyball-green)] hover:bg-[var(--color-volleyball-green-light)]">
                      <Star className="h-3 w-3 mr-1" />
                      In Evidenza
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 text-balance">
                      {featuredArticle.titolo}
                    </h3>
                    <div className="flex items-center gap-4 text-white/80 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(featuredArticle.data_pubblicazione)}</span>
                      </div>
                      {featuredArticle.autore && (
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{featuredArticle.autore}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 bg-black/40 backdrop-blur-sm">
                  <p className="text-white/80 text-lg leading-relaxed text-pretty">
                    {truncateText(featuredArticle.contenuto, 200)}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Other News */}
          <div className="space-y-6">
            {otherNews?.map((news) => (
              <Card key={news.id} className="glass border-white/20 overflow-hidden">
                <div className="flex">
                  <div className="w-24 h-24 flex-shrink-0">
                    {news.immagine_url ? (
                      <img
                        src={news.immagine_url || "/placeholder.svg"}
                        alt={news.titolo}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[var(--color-volleyball-green)] to-[var(--color-volleyball-green-light)] flex items-center justify-center">
                        <Star className="h-6 w-6 text-white/80" />
                      </div>
                    )}
                  </div>
                  <CardContent className="flex-1 p-4 bg-black/40 backdrop-blur-sm">
                    <h3 className="text-white font-bold text-sm mb-2 text-balance leading-tight">{news.titolo}</h3>
                    <p className="text-white/70 text-xs mb-2 text-pretty">{truncateText(news.contenuto, 80)}</p>
                    <div className="flex items-center gap-2 text-white/60 text-xs">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(news.data_pubblicazione)}</span>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-[var(--color-volleyball-green)] hover:bg-[var(--color-volleyball-green-light)] text-white px-8 py-3"
            asChild
          >
            <Link href="/news">Leggi Tutte le News</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
