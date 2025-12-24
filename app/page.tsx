import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TeamsSection } from "@/components/teams-section"
import { MatchesSection } from "@/components/matches-section"
import { NewsSection } from "@/components/news-section"
import { SponsorsSection } from "@/components/sponsors-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <TeamsSection />
      <MatchesSection />
      <NewsSection />
      <SponsorsSection />
      <Footer />
    </main>
  )
}
