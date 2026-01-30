import { Button } from "@/components/ui/button"
import { Calendar, Trophy, Users, Clock, Building } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white dark:text-white light:text-black mb-6 sm:mb-8 text-balance drop-shadow-2xl leading-tight px-2 animate-fadeInUp">
            <br />
            <br />
            <span className="text-white dark:text-white light:text-black block relative mt-1 sm:mt-2 font-black tracking-tight">
              Volley Club Trieste
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 sm:w-24 md:w-28 lg:w-32 h-1 sm:h-1.5 bg-[var(--color-volleyball-green)] shadow-lg animate-scaleIn animate-delay-300"></span>
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white dark:text-white light:text-black/80 mb-8 sm:mb-10 text-pretty max-w-2xl mx-auto drop-shadow-lg px-4 sm:px-6 font-medium leading-relaxed animate-fadeInUp animate-delay-200">
            Passione, determinazione e spirito di squadra. La pallavolo a Trieste dal 1976.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4 sm:px-0 animate-fadeInUp animate-delay-400">
            <Button
              size="lg"
              className="group bg-black/90 hover:bg-black text-white light:bg-white/90 light:hover:bg-white light:text-black px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg border-2 border-white light:border-black hover:border-[var(--color-volleyball-green)] transition-all duration-300 shadow-xl backdrop-blur-sm hover:scale-105 hover:shadow-2xl relative overflow-hidden w-full sm:w-auto"
              asChild
            >
              <Link href="/squadre">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform duration-300" />
                  Scopri le Squadre
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-volleyball-green)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group border-2 border-white light:border-black text-white light:text-black hover:bg-white hover:text-black light:hover:bg-black light:hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-black/20 light:bg-white/20 backdrop-blur-sm transition-all duration-300 shadow-xl hover:scale-105 hover:shadow-2xl relative overflow-hidden w-full sm:w-auto"
              asChild
            >
              <Link href="/partite">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform duration-300" />
                  Prossime Partite
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 light:from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-2 sm:px-0">
            <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/20 to-white/5 light:from-black/20 light:to-black/5 backdrop-blur-xl border border-white/30 light:border-black/30 p-6 sm:p-8 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[var(--color-volleyball-green)]/20 animate-scaleIn animate-delay-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-volleyball-green)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-br from-[var(--color-volleyball-green)] to-[var(--color-volleyball-green-light)] flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                  <Trophy className="h-7 w-7 sm:h-8 sm:w-8 text-white drop-shadow-lg" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white light:text-black mb-2 drop-shadow-lg group-hover:text-[var(--color-volleyball-green-light)] transition-colors duration-300">
                  Serie D
                </h2>
                <p className="text-sm sm:text-base text-white/90 light:text-black/80 font-medium drop-shadow-md">Campionato Regionale</p>
                <div className="w-12 h-1 bg-gradient-to-r from-[var(--color-volleyball-green)] to-[var(--color-volleyball-green-light)] mx-auto mt-3 sm:mt-4 rounded-full shadow-lg group-hover:w-16 transition-all duration-300"></div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/20 to-white/5 light:from-black/20 light:to-black/5 backdrop-blur-xl border border-white/30 light:border-black/30 p-6 sm:p-8 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[var(--color-volleyball-green)]/20 animate-scaleIn animate-delay-600">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-volleyball-green)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-br from-[var(--color-volleyball-green)] to-[var(--color-volleyball-green-light)] flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500 animate-pulse-slow">
                  <Clock className="h-7 w-7 sm:h-8 sm:w-8 text-white drop-shadow-lg" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white light:text-black mb-2 drop-shadow-lg group-hover:text-[var(--color-volleyball-green-light)] transition-colors duration-300">
                  50+
                </h2>
                <p className="text-sm sm:text-base text-white/90 light:text-black/80 font-medium drop-shadow-md">Anni di Storia</p>
                <div className="w-12 h-1 bg-gradient-to-r from-[var(--color-volleyball-green)] to-[var(--color-volleyball-green-light)] mx-auto mt-3 sm:mt-4 rounded-full shadow-lg group-hover:w-16 transition-all duration-300"></div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/20 to-white/5 light:from-black/20 light:to-black/5 backdrop-blur-xl border border-white/30 light:border-black/30 p-6 sm:p-8 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[var(--color-volleyball-green)]/20 sm:col-span-2 md:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-volleyball-green)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-br from-[var(--color-volleyball-green)] to-[var(--color-volleyball-green-light)] flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                  <Building className="h-7 w-7 sm:h-8 sm:w-8 text-white drop-shadow-lg" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white light:text-black mb-2 drop-shadow-lg group-hover:text-[var(--color-volleyball-green-light)] transition-colors duration-300">
                  Trieste
                </h2>
                <p className="text-sm sm:text-base text-white/90 light:text-black/80 font-medium drop-shadow-md">Palestra Cobolli Trieste</p>
                <div className="w-12 h-1 bg-gradient-to-r from-[var(--color-volleyball-green)] to-[var(--color-volleyball-green-light)] mx-auto mt-3 sm:mt-4 rounded-full shadow-lg group-hover:w-16 transition-all duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}