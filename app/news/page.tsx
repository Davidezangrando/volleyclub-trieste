import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Star, Newspaper } from "lucide-react"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "News e Aggiornamenti",
  description: "Tutte le ultime notizie del Volley Club Trieste. Risultati delle partite, eventi, novità dal mondo della pallavolo. Rimani aggiornato su campionati Serie D, Prima Divisione e settore giovanile.",
  keywords: [
    "news pallavolo Trieste",
    "notizie Volley Club Trieste",
    "risultati partite Trieste",
    "eventi pallavolo Trieste",
    "aggiornamenti volley Trieste",
    "campionato Serie D news"
  ],
  openGraph: {
    title: "News e Aggiornamenti - Volley Club Trieste",
    description: "Tutte le ultime notizie, risultati delle partite ed eventi del Volley Club Trieste. Resta sempre aggiornato!",
    url: "https://www.volleyclub.it/news",
    type: "website",
  },
  alternates: {
    canonical: "https://www.volleyclub.it/news",
  },
}

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

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("it-IT", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function truncateText(text: string, maxLength = 200) {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + "..."
}

export default async function NewsPage() {
  const supabase = await createClient()

  const { data: allNews, error } = await supabase
    .from("news")
    .select("*")
    .eq("pubblicata", true)
    .order("data_pubblicazione", { ascending: false })

  if (error) {
    console.error("Error fetching news:", error)
  }

  const featuredNews = allNews?.filter((news) => news.in_evidenza)
  const regularNews = allNews?.filter((news) => !news.in_evidenza)

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-black/80 to-gray-900/80">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              News e <span className="text-[var(--color-volleyball-green-light)]">Aggiornamenti</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto text-pretty">
              Tutte le ultime notizie del Volley Club Trieste. Risultati delle partite, eventi, novità dal mondo della
              pallavolo e molto altro ancora.
            </p>
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Featured News */}
          {featuredNews && featuredNews.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Star className="h-7 w-7 text-[var(--color-volleyball-green-light)]" />
                In Evidenza
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredNews.map((news) => (
                  <Card key={news.id} className="glass border-white/20 overflow-hidden">
                    <div className="relative h-48">
                      {news.immagine_url ? (
                        <img
                          src={news.immagine_url || "/placeholder.svg"}
                          alt={news.titolo}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[var(--color-volleyball-green)] to-[var(--color-volleyball-green-light)] flex items-center justify-center">
                          <Star className="h-12 w-12 text-white/80" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-[var(--color-volleyball-green)] hover:bg-[var(--color-volleyball-green-light)]">
                          <Star className="h-3 w-3 mr-1" />
                          In Evidenza
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6 bg-black/40 backdrop-blur-sm">
                      <h3 className="text-2xl font-bold text-white mb-3 text-balance">{news.titolo}</h3>
                      <p className="text-white/80 mb-4 text-pretty leading-relaxed">
                        {truncateText(news.contenuto, 250)}
                      </p>
                      <div className="flex items-center gap-4 text-white/60 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(news.data_pubblicazione)}</span>
                        </div>
                        {news.autore && (
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{news.autore}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Regular News */}
          {regularNews && regularNews.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Newspaper className="h-7 w-7 text-[var(--color-volleyball-green-light)]" />
                Tutte le News
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularNews.map((news) => (
                  <Card key={news.id} className="glass border-white/20 overflow-hidden">
                    <div className="relative h-40">
                      {news.immagine_url ? (
                        <img
                          src={news.immagine_url || "/placeholder.svg"}
                          alt={news.titolo}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[var(--color-volleyball-green)] to-[var(--color-volleyball-green-light)] flex items-center justify-center">
                          <Newspaper className="h-10 w-10 text-white/80" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <CardContent className="p-5 bg-black/40 backdrop-blur-sm">
                      <h3 className="text-lg font-bold text-white mb-2 text-balance">{news.titolo}</h3>
                      <p className="text-white/70 text-sm mb-4 text-pretty">{truncateText(news.contenuto, 120)}</p>
                      <div className="flex items-center gap-3 text-white/60 text-xs">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(news.data_pubblicazione)}</span>
                        </div>
                        {news.autore && (
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{news.autore}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* No News Message */}
          {(!allNews || allNews.length === 0) && (
            <Card className="glass border-white/20">
              <CardContent className="p-12 text-center">
                <Newspaper className="h-16 w-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Nessuna news disponibile</h3>
                <p className="text-white/60">Le ultime notizie del club saranno pubblicate qui.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}
