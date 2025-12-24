import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { StructuredData } from "@/components/structured-data"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL('https://www.volleyclub.it'),
  title: {
    default: "Volley Club Trieste - Pallavolo a Trieste dal 1976",
    template: "%s | Volley Club Trieste"
  },
  description:
    "Sito ufficiale del Volley Club Trieste. Scopri le nostre squadre, partite, news e sponsor. Pallavolo maschile e femminile Serie D, Prima Divisione e settore giovanile. Storia ultraquarantennale di passione per la pallavolo a Trieste.",
  keywords: [
    "pallavolo Trieste",
    "volleyball Trieste",
    "Volley Club Trieste",
    "Serie D pallavolo",
    "pallavolo femminile Trieste",
    "pallavolo maschile Trieste",
    "sport Trieste",
    "squadre pallavolo Trieste",
    "FIPAV Trieste",
    "Under 17 pallavolo",
    "Under 14 pallavolo",
    "Prima Divisione pallavolo",
    "campionato pallavolo FVG"
  ],
  authors: [{ name: "Volley Club Trieste", url: "https://www.volleyclub.it" }],
  creator: "Volley Club Trieste",
  publisher: "Volley Club Trieste",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/images/vc-logo.png",
    apple: "/images/vc-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://www.volleyclub.it",
    siteName: "Volley Club Trieste",
    title: "Volley Club Trieste - Pallavolo a Trieste dal 1976",
    description: "Sito ufficiale del Volley Club Trieste. Pallavolo maschile e femminile Serie D, Prima Divisione e settore giovanile. Affiliata FIPAV dal 1976.",
    images: [
      {
        url: "/images/vc-logo.png",
        width: 1200,
        height: 630,
        alt: "Volley Club Trieste Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Volley Club Trieste - Pallavolo a Trieste dal 1976",
    description: "Sito ufficiale del Volley Club Trieste. Pallavolo maschile e femminile Serie D e settore giovanile.",
    images: ["/images/vc-logo.png"],
  },
  alternates: {
    canonical: "https://www.volleyclub.it",
  },
  category: "sports",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} relative min-h-screen overflow-x-hidden`}>
        {/* Global background image with blur - extended to prevent white spaces on scroll */}
        <div
          className="fixed bg-cover bg-center bg-no-repeat -z-10"
          style={{
            backgroundImage: `url('/images/cobolli.jpeg')`,
            filter: "blur(4px)",
            transform: "scale(1.15)",
            top: "-10%",
            left: "-10%",
            right: "-10%",
            bottom: "-10%",
            width: "120%",
            height: "120%",
          }}
        />
        {/* Global dark overlay for readability */}
        <div className="fixed inset-0 bg-gradient-to-b from-black/85 via-black/80 to-black/85 -z-10" />

        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <Suspense fallback={null}>{children}</Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
