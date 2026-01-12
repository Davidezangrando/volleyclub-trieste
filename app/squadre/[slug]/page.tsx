import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, UserCheck, ArrowLeft, Trophy, Users } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import Image from "next/image"

interface Giocatore {
  id: string
  nome: string
  cognome: string
  numero_maglia: number | null
  ruolo: string | null
  foto_url: string | null
}

interface Squadra {
  id: string
  nome: string
  categoria: string
  descrizione: string | null
  immagine_url: string | null
  allenatore: string | null
  assistente_allenatore: string | null
  slug: string
}

// Helper per evitare errori con le immagini (percorsi relativi/assoluti)
function getSafeImageUrl(url: string | null) {
  if (!url) return "/placeholder.svg";
  if (url.startsWith("http") || url.startsWith("https")) return url;
  if (url.startsWith("/")) return url;
  return `/${url}`;
}

// Funzione helper "intelligente" per normalizzare i ruoli
const getRoleCategory = (ruolo: string | null) => {
  if (!ruolo) return "Altri";
  const r = ruolo.toLowerCase();
  
  if (r.includes("oppost")) return "Opposti";
  if (r.includes("schiacciator") || r.includes("banda") || r.includes("martello") || r.includes("ala")) return "Schiacciatori";
  if (r.includes("central") || r.includes("middle") || r.includes("centro")) return "Centrali";
  if (r.includes("alzator") || r.includes("palleggiator") || r.includes("regista") || r.includes("setter")) return "Alzatori";
  if (r.includes("liber")) return "Liberi";

  return "Altri";
}

// Colori specifici per i badge
const getRoleColorClass = (category: string) => {
  switch(category) {
    case "Alzatori": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
    case "Schiacciatori": return "bg-blue-500/20 text-blue-400 border-blue-500/50";
    case "Opposti": return "bg-orange-500/20 text-orange-400 border-orange-500/50";
    case "Centrali": return "bg-green-500/20 text-green-400 border-green-500/50";
    case "Liberi": return "bg-red-500/20 text-red-400 border-red-500/50";
    default: return "bg-gray-500/20 text-gray-400 border-gray-500/50";
  }
}

// Colori per il bordo sinistro delle sezioni
const getSectionBorderColor = (category: string) => {
  switch(category) {
    case "Alzatori": return "border-yellow-500";
    case "Schiacciatori": return "border-blue-500";
    case "Opposti": return "border-orange-500";
    case "Centrali": return "border-green-500";
    case "Liberi": return "border-red-500";
    default: return "border-gray-500";
  }
}

export default async function SquadraDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  // Recupera i dati della squadra
  const { data: squadra, error: squadraError } = await supabase
    .from("squadre")
    .select("*")
    .eq("slug", slug)
    .single()

  if (squadraError || !squadra) {
    notFound()
  }

  // Recupera i giocatori della squadra
  const { data: giocatori, error: giocatoriError } = await supabase
    .from("giocatori")
    .select("*")
    .eq("squadra_id", squadra.id)
    .order("numero_maglia", { ascending: true, nullsFirst: false })

  if (giocatoriError) {
    console.error("Error fetching players:", giocatoriError)
  }

  const typedSquadra = squadra as Squadra
  const typedGiocatori = (giocatori || []) as Giocatore[]

  const groupedPlayers: Record<string, Giocatore[]> = {
    "Schiacciatori": [],
    "Opposti": [],
    "Centrali": [],
    "Alzatori": [],
    "Liberi": [],
    "Altri": []
  };

  typedGiocatori.forEach(giocatore => {
    const category = getRoleCategory(giocatore.ruolo);
    if (groupedPlayers[category]) {
        groupedPlayers[category].push(giocatore);
    } else {
        groupedPlayers["Altri"].push(giocatore);
    }
  });

  const activeCategories = Object.entries(groupedPlayers).filter(([_, players]) => players.length > 0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <Link href="/squadre">
            <Button variant="ghost" className="text-white hover:text-[var(--color-volleyball-green-light)] mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Torna alle Squadre
            </Button>
          </Link>

          {/* Header Squadra */}
          <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8 shadow-2xl">
            {typedSquadra.immagine_url ? (
              <Image
                src={getSafeImageUrl(typedSquadra.immagine_url)}
                alt={typedSquadra.nome}
                fill
                className="object-cover"
                priority={true}
                sizes="(max-width: 1024px) 100vw, 1200px"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[var(--color-volleyball-green)] to-[var(--color-volleyball-green-light)] flex items-center justify-center">
                <Users className="h-32 w-32 text-white/30" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-3 mb-3">
                <Trophy className="h-8 w-8 text-[var(--color-volleyball-green-light)]" />
                <span className="text-[var(--color-volleyball-green-light)] font-bold text-xl uppercase tracking-wider">
                  {typedSquadra.categoria}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 shadow-black drop-shadow-lg">{typedSquadra.nome}</h1>
              <p className="text-white/90 text-lg max-w-3xl drop-shadow-md">{typedSquadra.descrizione}</p>
            </div>
          </div>

          {/* Info Staff */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {typedSquadra.allenatore && (
              <Card className="glass border-white/20 bg-white/5">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-volleyball-green)]/20 flex items-center justify-center border border-[var(--color-volleyball-green)]/30">
                    <User className="h-6 w-6 text-[var(--color-volleyball-green-light)]" />
                  </div>
                  <div>
                    <p className="text-[var(--color-volleyball-green-light)] font-bold text-xs uppercase tracking-widest">Allenatore</p>
                    <p className="text-white font-bold text-lg">{typedSquadra.allenatore}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {typedSquadra.assistente_allenatore && (
              <Card className="glass border-white/20 bg-white/5">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <UserCheck className="h-6 w-6 text-white/80" />
                  </div>
                  <div>
                    <p className="text-white/50 font-bold text-xs uppercase tracking-widest">
                      Assistente
                    </p>
                    <p className="text-white font-bold text-lg">{typedSquadra.assistente_allenatore}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Sezione Giocatori */}
      <section className="py-8 pb-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
            <Users className="h-8 w-8 text-[var(--color-volleyball-green-light)]" />
            Rosa Giocatori
          </h2>

          {typedGiocatori.length === 0 ? (
            <Card className="glass border-white/20">
              <CardContent className="p-12 text-center">
                <Users className="h-16 w-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/60 text-lg">Nessun giocatore disponibile per questa squadra.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-16">
              {activeCategories.map(([category, players]) => (
                 <div key={category} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className={`flex items-center gap-3 mb-6 pl-4 border-l-4 ${getSectionBorderColor(category)}`}>
                        <h3 className="text-2xl font-bold text-white">{category}</h3>
                        <span className="text-white/40 text-sm font-medium">({players.length})</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {players.map((giocatore) => {
                        // LOGICA CONDIZIONALE: Se c'è la foto, mostra la versione "PHOTO CARD"
                        if (giocatore.foto_url) {
                            return (
                                <Card key={giocatore.id} className="glass border-white/10 overflow-hidden group hover:border-white/30 transition-all duration-300 relative h-[400px]">
                                    <div className="absolute inset-0">
                                        <Image 
                                            src={getSafeImageUrl(giocatore.foto_url)}
                                            alt={`${giocatore.nome} ${giocatore.cognome}`}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                        {/* Gradiente per rendere leggibile il testo sopra la foto */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                                    </div>
                                    
                                    <CardContent className="relative h-full flex flex-col justify-end p-5 z-10">
                                        <div className="flex items-end justify-between w-full">
                                            <div>
                                                 <span className={`inline-block mb-2 px-2 py-1 rounded text-xs font-bold border ${getRoleColorClass(category)} bg-opacity-80 backdrop-blur-sm`}>
                                                    #{giocatore.numero_maglia || "-"}
                                                </span>
                                                <h3 className="text-white font-bold text-2xl leading-none mb-1">
                                                    {giocatore.nome}
                                                </h3>
                                                <p className="text-[var(--color-volleyball-green-light)] font-bold uppercase tracking-wider text-lg">
                                                    {giocatore.cognome}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        }

                        // LOGICA DEFAULT: Se non c'è foto, mostra la versione "NO PHOTO CARD" (Grafica pulita)
                        return (
                            <Card key={giocatore.id} className="glass border-white/10 overflow-hidden group hover:border-white/30 transition-all duration-300 h-full">
                                <CardContent className="p-0 h-full flex flex-col justify-between">
                                    <div className="p-5 flex items-start justify-between relative">
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-2xl border shadow-lg z-10
                                            ${getRoleColorClass(category)}
                                        `}>
                                            {giocatore.numero_maglia || "-"}
                                        </div>
                                        
                                        <div className="text-right z-10">
                                            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">Ruolo</span>
                                            <span className="text-xs font-semibold text-white/80 uppercase">
                                                {category === 'Schiacciatori' ? 'Banda' : 
                                                 category === 'Alzatori' ? 'Palleggiatore' : 
                                                 category.slice(0, -1)}
                                            </span>
                                        </div>

                                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br opacity-20 rounded-bl-full pointer-events-none
                                            ${category === 'Schiacciatori' ? 'from-blue-500 to-transparent' : 
                                              category === 'Opposti' ? 'from-orange-500 to-transparent' :
                                              category === 'Centrali' ? 'from-green-500 to-transparent' :
                                              category === 'Alzatori' ? 'from-yellow-500 to-transparent' :
                                              'from-red-500 to-transparent'}
                                        `}></div>
                                    </div>

                                    <div className="px-5 pb-5 pt-2 mt-auto">
                                        <h3 className="text-white font-bold text-xl truncate group-hover:text-[var(--color-volleyball-green-light)] transition-colors">
                                            {giocatore.nome}
                                        </h3>
                                        <p className="text-white/70 font-medium uppercase tracking-wide text-sm">
                                            {giocatore.cognome}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                    </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}