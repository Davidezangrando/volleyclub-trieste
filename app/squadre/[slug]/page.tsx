import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, ArrowLeft, Trophy, Users } from "lucide-react"
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

// Funzione helper per normalizzare i ruoli
const getRoleCategory = (ruolo: string | null) => {
  if (!ruolo) return "Altri";
  const r = ruolo.toLowerCase();
  
  if (r.includes("alzator") || r.includes("palleggiator") || r.includes("regista") || r.includes("setter")) 
    return "Alzatori";
  
  if (r.includes("schiacciator") || r.includes("oppost") || r.includes("banda") || r.includes("martello") || r.includes("outside") || r.includes("hitter")) 
    return "Schiacciatori & Opposti";
  
  if (r.includes("central") || r.includes("middle")) 
    return "Centrali";
  
  if (r.includes("liber")) 
    return "Liberi";

  return "Altri";
}

// Colori specifici per i badge dei ruoli (per dare un tocco simile allo screenshot ma in dark mode)
const getRoleColorClass = (category: string) => {
  switch(category) {
    case "Alzatori": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
    case "Schiacciatori & Opposti": return "bg-blue-500/20 text-blue-400 border-blue-500/50";
    case "Centrali": return "bg-green-500/20 text-green-400 border-green-500/50";
    case "Liberi": return "bg-red-500/20 text-red-400 border-red-500/50";
    default: return "bg-gray-500/20 text-gray-400 border-gray-500/50";
  }
}

// Colori per il bordo sinistro delle sezioni
const getSectionBorderColor = (category: string) => {
  switch(category) {
    case "Alzatori": return "border-yellow-500";
    case "Schiacciatori & Opposti": return "border-blue-500";
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

  // Raggruppa i giocatori
  const groupedPlayers: Record<string, Giocatore[]> = {
    "Alzatori": [],
    "Schiacciatori & Opposti": [],
    "Centrali": [],
    "Liberi": [],
    "Altri": []
  };

  typedGiocatori.forEach(giocatore => {
    const category = getRoleCategory(giocatore.ruolo);
    groupedPlayers[category].push(giocatore);
  });

  // Rimuovi categorie vuote per il rendering
  const activeCategories = Object.entries(groupedPlayers).filter(([_, players]) => players.length > 0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Header />

      {/* Hero Section Ridotta - Focus sul contenuto testuale */}
      <section className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <Link href="/squadre">
            <Button variant="ghost" className="text-white hover:text-[var(--color-volleyball-green-light)] mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Torna alle Squadre
            </Button>
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-end mb-12">
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                    <Trophy className="h-6 w-6 text-[var(--color-volleyball-green-light)]" />
                    <span className="text-[var(--color-volleyball-green-light)] font-bold text-lg uppercase tracking-wider">
                    {typedSquadra.categoria}
                    </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{typedSquadra.nome}</h1>
                <p className="text-white/70 text-lg max-w-2xl">{typedSquadra.descrizione}</p>
            </div>
            
            {/* Staff Section - Ora in alto come nel design */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
                {typedSquadra.allenatore && (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 min-w-[250px]">
                        <div className="h-12 w-12 rounded-full bg-[var(--color-volleyball-green)]/20 flex items-center justify-center text-[var(--color-volleyball-green-light)]">
                            <User className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs text-[var(--color-volleyball-green-light)] font-bold uppercase">Allenatore</p>
                            <p className="text-white font-bold">{typedSquadra.allenatore}</p>
                        </div>
                    </div>
                )}
                 {typedSquadra.assistente_allenatore && (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 min-w-[250px]">
                        <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-white/70">
                            <Users className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs text-white/50 font-bold uppercase">Assistente</p>
                            <p className="text-white font-bold">{typedSquadra.assistente_allenatore}</p>
                        </div>
                    </div>
                )}
            </div>
          </div>
        </div>
      </section>

      {/* Sezione Rosa Giocatori - Layout a Lista/Gruppi */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-10">
            <Users className="h-8 w-8 text-[var(--color-volleyball-green-light)]" />
            <h2 className="text-3xl font-bold text-white">Rosa Giocatori</h2>
          </div>

          {typedGiocatori.length === 0 ? (
            <Card className="glass border-white/20">
              <CardContent className="p-12 text-center">
                <Users className="h-16 w-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/60 text-lg">Nessun giocatore disponibile per questa squadra.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-12">
                {activeCategories.map(([category, players]) => (
                    <div key={category} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Intestazione Categoria con barra colorata come screenshot */}
                        <div className={`flex items-center gap-3 mb-6 pl-4 border-l-4 ${getSectionBorderColor(category)}`}>
                            <h3 className="text-xl font-bold text-white">{category}</h3>
                        </div>
                        
                        {/* Griglia delle card orizzontali */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {players.map((giocatore) => (
                                <Card key={giocatore.id} className="glass border-white/10 hover:border-white/30 transition-all duration-300 group">
                                    <CardContent className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            {/* Numero Maglia nel cerchio */}
                                            <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg border shadow-lg
                                                ${getRoleColorClass(category)}
                                            `}>
                                                {giocatore.numero_maglia || "-"}
                                            </div>
                                            
                                            {/* Info Giocatore */}
                                            <div className="flex flex-col">
                                                <span className="text-white font-bold text-lg group-hover:text-[var(--color-volleyball-green-light)] transition-colors">
                                                    {giocatore.nome} {giocatore.cognome}
                                                </span>
                                                {/* Se avessimo l'anno di nascita, andrebbe qui. Uso un placeholder se vuoi o nascondo */}
                                                {/* <span className="text-white/40 text-sm">2001</span> */}
                                            </div>
                                        </div>

                                        {/* Ruolo (label destra) */}
                                        <div className="hidden sm:block">
                                            <span className="text-xs font-semibold text-white/30 uppercase tracking-widest">
                                                {giocatore.ruolo ? 
                                                  (giocatore.ruolo === 'Palleggiatore' ? 'SETTER' : 
                                                   giocatore.ruolo === 'Libero' ? 'LIBERO' : 
                                                   giocatore.ruolo === 'Centrale' ? 'MIDDLE' : 'OUTSIDE') 
                                                  : ''}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
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