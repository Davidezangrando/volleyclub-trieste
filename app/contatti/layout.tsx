import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contatti",
  description: "Contatta il Volley Club Trieste. Siamo in Via della Valle, 3 a Trieste. Email: info@volleyclub.it, Tel: +39 3805245982. Vuoi unirti alle nostre squadre o diventare sponsor? Scrivici!",
  keywords: [
    "contatti Volley Club Trieste",
    "email pallavolo Trieste",
    "telefono volley Trieste",
    "dove si trova Volley Club Trieste",
    "palestra pallavolo Trieste",
    "iscriversi pallavolo Trieste"
  ],
  openGraph: {
    title: "Contatti - Volley Club Trieste",
    description: "Contattaci per informazioni, iscrizioni o partnership. Via della Valle, 3 - Trieste.",
    url: "https://www.volleyclub.it/contatti",
    type: "website",
  },
  alternates: {
    canonical: "https://www.volleyclub.it/contatti",
  },
}

export default function ContattiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
