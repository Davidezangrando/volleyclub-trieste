import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Trophy, Users, Target, Calendar, MapPin } from "lucide-react"
import { Footer } from "@/components/footer"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Chi Siamo - Storia e Valori",
  description: "Scopri la storia del Volley Club Trieste dal 1976. 40+ anni di passione per la pallavolo a Trieste. Affiliata FIPAV con codice 70310028, registro CONI 45046. Serie D maschile e femminile, Prima Divisione e settore giovanile.",
  keywords: [
    "storia Volley Club Trieste",
    "chi siamo pallavolo Trieste",
    "FIPAV Trieste",
    "associazione sportiva dilettantistica",
    "pallavolo Trieste dal 1976",
    "squadre volley Trieste",
    "CONI Trieste"
  ],
  openGraph: {
    title: "Chi Siamo - Volley Club Trieste",
    description: "40+ anni di storia della pallavolo a Trieste. Scopri i valori, la missione e il percorso del Volley Club Trieste dal 1976 ad oggi.",
    url: "https://www.volleyclub.it/chi-siamo",
    images: [
      {
        url: "/images/storia/storia-1.jpg",
        width: 1200,
        height: 630,
        alt: "Storia del Volley Club Trieste",
      },
    ],
  },
  alternates: {
    canonical: "https://www.volleyclub.it/chi-siamo",
  },
}

export default function ChiSiamoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-black/80 to-gray-900/80">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Chi <span className="text-[var(--color-volleyball-green-light)]">Siamo</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto text-pretty">
              La storia, i valori e la passione che animano il Volley Club Trieste dal 1976. Scopri chi siamo e cosa ci
              muove ogni giorno sui campi da gioco.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <Card className="glass border-white/20">
              <CardContent className="p-8 bg-black/40 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="h-8 w-8 text-[var(--color-volleyball-green-light)]" />
                  <h2 className="text-3xl font-bold text-white">Chi siamo</h2>
                </div>
                <p className="text-white/80 text-lg leading-relaxed text-pretty">
                  Il Volley Club Trieste è una Associazione Sportiva Dilettantistica, cioè un’associazione con finalità sportive senza scopo di lucro, rivolta alla Pallavolo.
                  È iscritta al Registro CONI con tessera numero 45046 ed affiliata alla Federazione Italiana Pallavolo (FIPAV) con codice 70310028
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-white/20">
              <CardContent className="p-8 bg-black/40 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Heart className="h-8 w-8 text-[var(--color-volleyball-green-light)]" />
                  <h2 className="text-3xl font-bold text-white">Le nostre squadre:</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-[var(--color-volleyball-green)] hover:bg-[var(--color-volleyball-green-light)]">
                      Serie D
                    </Badge>
                    <span className="text-white/80">Maschile e femminile</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-[var(--color-volleyball-green)] hover:bg-[var(--color-volleyball-green-light)]">
                      Prima divisione
                    </Badge>
                    <span className="text-white/80">Maschile e femminile</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-[var(--color-volleyball-green)] hover:bg-[var(--color-volleyball-green-light)]">
                      Under
                    </Badge>
                    <span className="text-white/80">Under 17 maschile e under 14 femminile</span>
                  </div>
                  {/* <div className="flex items-center gap-3">
                    <Badge className="bg-[var(--color-volleyball-green)] hover:bg-[var(--color-volleyball-green-light)]">
                      Comunità
                    </Badge>
                    <span className="text-white/80">Legame con il territorio triestino</span>
                  </div> */}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* History */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3">
              <Calendar className="h-8 w-8 text-[var(--color-volleyball-green-light)]" />
              La Nostra Storia
            </h2>

            {/* Testo 1 */}
            <Card className="glass border-white/20 mb-8">
              <CardContent className="p-8 bg-black/40 backdrop-blur-sm">
                <div className="prose prose-invert max-w-none">
                  <p className="text-white/80 text-lg leading-relaxed text-pretty">
                    La società pallavolo Volley Club Trieste nasce nell’ormai lontano 1976 per la ferma volontà di un gruppo di giocatori della squadra di pallavolo del circolo aziendale della Grandi Motori Trieste (G.M.T.), società  che in quell’anno decise di abbandonare la pallavolo, pur avendo il diritto sportivo per il campionato nazionale di serie B. La G.M.T. era l’erede diretta della più gloriosa squadra del C.R.D.A. (Cantieri Riuniti Dell’Adriatico), fondata nel 1946, che vantava al suo attivo diversi campionati di serie A e la convocazione di numerosi suoi atleti nelle squadre nazionali. Ma quelli erano i tempi “eroici” della pallavolo – nel 1976 quello sport era già  molto diverso.
Si giocava ormai totalmente al coperto dopo che per anni si era giocato prevalentemente su campi all’aperto), con una diffusione a livello nazionale molto capillare, dopo un inizio molto difficile (la Federazione Italiana Pallavolo nasce appunto nel 1946) e limitato territorialmente all’Emilia, alla Liguria e al Friuli Venezia Giulia.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Immagine 1 */}
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-8">
              <Image
                src="/images/storia/storia-1.jpg"
                alt="Storia del Volley Club Trieste - Origini"
                fill
                className="object-cover"
              />
            </div>

            {/* Testo 2 */}
            <Card className="glass border-white/20 mb-8">
              <CardContent className="p-8 bg-black/40 backdrop-blur-sm">
                <div className="prose prose-invert max-w-none">
                  <p className="text-white/80 text-lg leading-relaxed text-pretty">
                    Nel 1976 la pallavolo era già popolare e lo sarebbe stata ancor più due anni dopo, quando la squadra italiana conquistò il secondo posto ai Campionati Mondiali di Roma (i “vecchi” di questo sport ricordano le prime telecronache in diretta sulla Rai e il fantastico film documentario sui quei campionati mondiali “Il gabbiano d’argento”).

Ma perché nel 1976 un manipolo di una decina di giocatori decise di “scendere in campo” anche nelle vesti di fondatori, dirigenti e auto finanziatori della propria squadra?
Le motivazioni erano tante: la voglia di stare assieme, l’amicizia, la certezza di riuscire a divertirsi giocando, ma soprattutto la grande, grandissima passione per questo sport, che quando ti prende ti prende per la vita, come un innamoramento forsennato che ti accompagna in ogni giornata.

Chi erano questi pazzi e incoscienti?
Il nucleo storico del Volley Club era rappresentato da Roby Matteucci, Roby Bravin, Cece Rovatti e Rudi Unterweger (con la moglie Antonella, presidente della società dal 1998 al 2013) ai quali si era aggiunto l’ex dirigente della G.M.T. Giorgio Caldarulo, che fu anche il primo presidente della società, e l’indimenticabile amico fraterno Paolo Matteucci, che ci è sempre stato vicino. La prima sede? Una soffitta di via Mazzini. Le maglie? Nere con bordi bianchi. Si erano scelti i colori sociali bianco-neri perché le maglie di quei colori erano le meno costose. I primi palloni? Quelli rimasti dalla G.M.T., da loro richiesti e mai restituiti. La palestra? La mitica “Zandonai” (cioè la palestra della scuola Rossetti a San Sabba). L’allenatore? A turno uno di loro. I soldi per partecipare al campionato, 800.000 lire raccolte tra parenti e amici e il resto di tasca propria, così come è successo sempre per i successivi trent’anni e più.

Dal 1976 in poi la squadra ha partecipato a diversi campionati di serie B e C1, all’epoca campionato nazionale e numerosi sono stati i giocatori che negli anni hanno fatto parte della squadra. Ricordarli tutti è molto difficile, ma qualcuno sì: Aldo Frison, Donatelli, Polenghi (tutti provenienti dalla disciolta Libertas), Di Bin, Claudio Venturi, l’amico Piero Simoniti e poi per un anno Walter Veljak e, molto più in là, anche un anno con Giorgio Manzin giocatore-allenatore e un paio d’anni con Gianni Carlovatti come allenatore: un grande tecnico, ma soprattutto un grande amico.

Nel 1978 la società si allarga avviando le attività giovanili, prima soltanto femminili, poi anche maschili. Nel 1984 la creazione del Centro di avviamento allo sport presso la Zandonai.
La squadra maggiore ha partecipato, come detto, a diversi campionati nazionali, almeno finché è stato possibile tecnicamente e finanziariamente. Poi un anno la decisione di chiudere l’attività maggiore, un tentativo malamente riuscito di fusione con la Libertas Rozzol di Roberto Miserocchi e Fast e l’anno successivo la ripresa con la disputa del campionato di prima divisione, vinto con una sola sconfitta.

Da allora, campionati provinciali e regionali, giovanili, maschili e femminili.

Negli anni Duemila, si sono distinti in panchina Rudi Unterweger, Andrea Carbone (tecnico a lungo nel giro della nazionale pre-juniores) e Roby Matteucci (protagonisti delle promozioni dalla D alla C degli anni 2003, 2008, 2010 e 2014), Matteo Unterweger, artefice di tre promozioni dalla prima divisione in serie D e Giuseppe Cutuli, palleggiatore approdato al Volley Club nel 2004 dopo l’esperienza Adriavolley e più recentemente allenatore della prima squadra in serie C. Ma poi tanti tanti altri atleti che hanno fatto un po’ di storia della pallavolo a Trieste.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Immagine 2 */}
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-8">
              <Image
                src="/images/storia/storia-2.jpg"
                alt="Storia del Volley Club Trieste - Crescita"
                fill
                className="object-cover"
              />
            </div>

            {/* Testo 3 */}
            <Card className="glass border-white/20">
              <CardContent className="p-8 bg-black/40 backdrop-blur-sm">
                <div className="prose prose-invert max-w-none">
                  <p className="text-white/80 text-lg leading-relaxed text-pretty">
                    Per il Volley Club Trieste sono transitati oltre ottocento tra atleti e atlete, in questi anni.
Molti si sono persi per strada o hanno scelto altre vie sportive o di vita, ma tanti, tantissimi sono rimasti appassionati di pallavolo o hanno continuato a operare in altre società nate direttamente o indirettamente proprio dal Volley Club (come la Pallavolo Trieste, diretta discendente della Vecchia pallavolo Trieste, costituita proprio da un gruppo di amici usciti dal Volley Club – Fabio Sattler, Enzo Spinelli, Raffy Morvay – o come il Club Altura dell’ex Volley Maurizio Zamarini).

In quasi quarant’anni tanto è stato seminato, con qualche successo anche sportivo: la Coppa Regione FVG 2016, una Coppa Trieste, diversi piazzamenti nei campionati giovanili, quattro prime divisioni vinte e una persa all’ultima giornata, promozioni nel settore femminile (ultima quella in Serie C della squadra guidata da Andrea Stefini nel 2019), quattro promozioni ai play off dalla serie D alla serie C, un secondo posto in Under 20 regionale, un primo posto a pari merito in Under 17, tanti giocatori delle giovanili forniti alle rappresentative provinciali e regionali.

E oggi?
Grazie al prezioso contributo di molti e molte, tutti accomunati dalla passione per il nostro sport, l’attività dell’Associazione si è allargata tanto, fino a gestire cinque squadre seniores e due juniores, tra settore maschile e femminile, e diversi gruppi amatoriali.
Sono state instaurate felici collaborazioni con le maggiori realtà della pallavolo locale, con l’idea di operare un progressivo ricambio con giovani leve e di offrire l’opportunità di giocare a una vasta comunità di atleti ed atlete.

E’ poco, è tanto?
In amore non si conta, non si misura, non si pesa.
E quello del Volley Club Trieste è prima di tutto un amore totale per lo sport più bello del mondo: la pallavolo! E continuerà ancora così…
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="glass border-white/20 text-center">
              <CardContent className="p-6 bg-black/40 backdrop-blur-sm">
                <Trophy className="h-12 w-12 text-[var(--color-volleyball-green-light)] mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2">40+</h3>
                <p className="text-white/80">Anni di Storia</p>
              </CardContent>
            </Card>
            <Card className="glass border-white/20 text-center">
              <CardContent className="p-6 bg-black/40 backdrop-blur-sm">
                <Users className="h-12 w-12 text-[var(--color-volleyball-green-light)] mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2">4</h3>
                <p className="text-white/80">Squadre Attive</p>
              </CardContent>
            </Card>
            <Card className="glass border-white/20 text-center">
              <CardContent className="p-6 bg-black/40 backdrop-blur-sm">
                <Target className="h-12 w-12 text-[var(--color-volleyball-green-light)] mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2">Serie D</h3>
                <p className="text-white/80">Campionato Regionale</p>
              </CardContent>
            </Card>
            <Card className="glass border-white/20 text-center">
              <CardContent className="p-6 bg-black/40 backdrop-blur-sm">
                <MapPin className="h-12 w-12 text-[var(--color-volleyball-green-light)] mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2">Trieste</h3>
                <p className="text-white/80">La Nostra Casa</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
