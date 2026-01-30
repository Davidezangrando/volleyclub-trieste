"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Navigation } from "lucide-react"
import { Footer } from "@/components/footer"
import { useState, FormEvent } from "react"

export default function ContattiPage() {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    oggetto: "",
    messaggio: "",
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const emailBody = `
Nome: ${formData.nome} ${formData.cognome}
Email: ${formData.email}
Telefono: ${formData.telefono || "Non fornito"}

Messaggio:
${formData.messaggio}
    `.trim()

    const mailtoLink = `mailto:info@volleyclub.it?subject=${encodeURIComponent(formData.oggetto)}&body=${encodeURIComponent(emailBody)}`

    window.location.href = mailtoLink
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-black/80 to-gray-900/80">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="text-[var(--color-volleyball-green-light)]">Contatti</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto text-pretty">
              Hai domande sul Volley Club Trieste? Vuoi unirti alle nostre squadre o diventare nostro sponsor?
              Contattaci, saremo felici di risponderti.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="glass border-white/20">
              <CardHeader className="bg-black/40 backdrop-blur-sm">
                <CardTitle className="text-2xl text-white flex items-center gap-3">
                  <Mail className="h-6 w-6 text-[var(--color-volleyball-green-light)]" />
                  Invia un Messaggio
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-black/40 backdrop-blur-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nome" className="text-white">
                        Nome *
                      </Label>
                      <Input
                        id="nome"
                        type="text"
                        required
                        value={formData.nome}
                        onChange={handleChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        placeholder="Il tuo nome"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cognome" className="text-white">
                        Cognome *
                      </Label>
                      <Input
                        id="cognome"
                        type="text"
                        required
                        value={formData.cognome}
                        onChange={handleChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        placeholder="Il tuo cognome"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="la-tua-email@esempio.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefono" className="text-white">
                      Telefono
                    </Label>
                    <Input
                      id="telefono"
                      type="tel"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="+39 123 456 7890"
                    />
                  </div>
                  <div>
                    <Label htmlFor="oggetto" className="text-white">
                      Oggetto *
                    </Label>
                    <Input
                      id="oggetto"
                      type="text"
                      required
                      value={formData.oggetto}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="Di cosa vuoi parlare?"
                    />
                  </div>
                  <div>
                    <Label htmlFor="messaggio" className="text-white">
                      Messaggio *
                    </Label>
                    <Textarea
                      id="messaggio"
                      required
                      rows={5}
                      value={formData.messaggio}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 resize-none"
                      placeholder="Scrivi qui il tuo messaggio..."
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[var(--color-volleyball-green)] hover:bg-[var(--color-volleyball-green-light)] text-white"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Invia Messaggio
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Contact Details */}
              <Card className="glass border-white/20">
                <CardHeader className="bg-black/40 backdrop-blur-sm">
                  <CardTitle className="text-2xl text-white flex items-center gap-3">
                    <Phone className="h-6 w-6 text-[var(--color-volleyball-green-light)]" />
                    Informazioni di Contatto
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 bg-black/40 backdrop-blur-sm space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-[var(--color-volleyball-green-light)] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-white font-semibold mb-1">Campo di gioco principale</h3>
                      <p className="text-white/80">
                        Palestra Cobolli Trieste
                        <br />
                        Via della Valle, 3
                        <br />
                        34124 Trieste (TS)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-[var(--color-volleyball-green-light)] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-white font-semibold mb-1">Telefono</h3>
                      <p className="text-white/80">+39 3805245982</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-[var(--color-volleyball-green-light)] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-white font-semibold mb-1">Email</h3>
                      <p className="text-white/80">info@volleyclub.it</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map - USING OPENSTREETMAP (Provider Alternativo) */}
              <Card className="glass border-white/20">
                <CardHeader className="bg-black/40 backdrop-blur-sm">
                  <CardTitle className="text-2xl text-white flex items-center gap-3">
                    <Navigation className="h-6 w-6 text-[var(--color-volleyball-green-light)]" />
                    Come Raggiungerci
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 bg-black/40 backdrop-blur-sm">
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-800 relative border border-white/10">
                    <iframe 
                        width="100%" 
                        height="100%" 
                        // Link OpenStreetMap centrato su Palestra Cobolli (Via della Valle 3)
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6849.604265671063!2d13.76604637670497!3d45.64611272128212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477b6b7427084f65%3A0xc132832523d8338d!2sPalestra%20Comunale%20Nicol%C3%B2%20Cobolli!5e1!3m2!1sen!2sit!4v1768154095264!5m2!1sen!2sit"
                        style={{ border: 0 }} 
                        allowFullScreen={true} 
                        loading="lazy"
                        title="Mappa Palestra Cobolli"
                        className="grayscale hover:grayscale-0 transition-all duration-500"
                    ></iframe>
                  </div>
                  <p className="text-white/60 text-sm mt-4 text-center">
                    <a 
                        // Link diretto per aprire su sito esterno/app
                        href="https://www.openstreetmap.org/?mlat=45.6233&mlon=13.7971#map=17/45.6233/13.7971" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-[var(--color-volleyball-green-light)] underline decoration-dotted underline-offset-4"
                    >
                        Apri mappa ingrandita
                    </a>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}