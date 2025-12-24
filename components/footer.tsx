import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black/40 backdrop-blur-sm border-t border-white/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo and Description */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shadow-lg">
                <Image
                  src="/images/vc-logo.png"
                  alt="Volley Club Trieste Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                  priority={true}
                />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white dark:text-white">Volley Club Trieste</h3>
              </div>
            </div>
            <p className="text-white/70 dark:text-white/70 text-sm sm:text-base text-pretty max-w-md">
              Pallavolo femminile a Trieste dal 1976. Passione, determinazione e spirito di squadra.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white dark:text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Link Rapidi</h4>
            <ul className="space-y-2 sm:space-y-2.5">
              <li>
                <Link
                  href="/chi-siamo"
                  className="text-white/70 dark:text-white/70 hover:text-[var(--color-volleyball-green-light)] dark:hover:text-[var(--color-volleyball-green-light)] text-sm transition-colors duration-300"
                >
                  Chi Siamo
                </Link>
              </li>
              <li>
                <Link
                  href="/squadre"
                  className="text-white/70 dark:text-white/70 hover:text-[var(--color-volleyball-green-light)] dark:hover:text-[var(--color-volleyball-green-light)] text-sm transition-colors duration-300"
                >
                  Squadre
                </Link>
              </li>
              <li>
                <Link
                  href="/partite"
                  className="text-white/70 dark:text-white/70 hover:text-[var(--color-volleyball-green-light)] dark:hover:text-[var(--color-volleyball-green-light)] text-sm transition-colors duration-300"
                >
                  Partite
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-white/70 dark:text-white/70 hover:text-[var(--color-volleyball-green-light)] dark:hover:text-[var(--color-volleyball-green-light)] text-sm transition-colors duration-300"
                >
                  News
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white dark:text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Contatti</h4>
            <ul className="space-y-2.5 sm:space-y-3">
              <li className="flex items-start gap-2 sm:items-center">
                <MapPin className="h-4 w-4 sm:h-4 sm:w-4 text-[var(--color-volleyball-green-light)] flex-shrink-0 mt-0.5 sm:mt-0" />
                <span className="text-white/70 dark:text-white/70 text-xs sm:text-sm">Via della Valle, 3, 34124 Trieste TS</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 sm:h-4 sm:w-4 text-[var(--color-volleyball-green-light)] flex-shrink-0" />
                <span className="text-white/70 dark:text-white/70 text-xs sm:text-sm">+39 3805245982</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 sm:h-4 sm:w-4 text-[var(--color-volleyball-green-light)] flex-shrink-0" />
                <span className="text-white/70 dark:text-white/70 text-xs sm:text-sm break-all">Marcorigutti@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-white dark:text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Seguici</h4>
            <div className="flex space-x-3 sm:space-x-4">
              <a
                href="https://www.facebook.com/ASDVolleyClubTrieste"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 dark:bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--color-volleyball-green)] dark:hover:bg-[var(--color-volleyball-green)] transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 sm:h-4 sm:w-4 text-white dark:text-white" />
              </a>
              <a
                href="https://www.instagram.com/volleyclubtrieste/"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 dark:bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--color-volleyball-green)] dark:hover:bg-[var(--color-volleyball-green)] transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 sm:h-4 sm:w-4 text-white dark:text-white" />
              </a>
              {/* <a
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 dark:bg-white/10 rounded-full flex items-center justify-center hover:bg-[var(--color-volleyball-green)] dark:hover:bg-[var(--color-volleyball-green)] transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4 sm:h-4 sm:w-4 text-white dark:text-white" />
              </a> */}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 dark:border-white/10 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-white/60 dark:text-white/60 text-xs sm:text-sm px-4 mb-2">
            © 2025 Volley Club Trieste. Tutti i diritti riservati.
          </p>
          <p className="text-white/60 dark:text-white/60 text-xs sm:text-sm px-4">
            Sito web sviluppato da{" "}
            <a
              href="https://www.zangrando.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-volleyball-green-light)] hover:text-[var(--color-volleyball-green)] transition-colors duration-300 font-medium hover:underline"
            >
              Zangrando LTD
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
