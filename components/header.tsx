"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    console.log("Toggle menu called, current:", isMenuOpen)
    setIsMenuOpen(prev => {
      console.log("Changing from", prev, "to", !prev)
      return !prev
    })
  }, [isMenuOpen])

  const closeMenu = useCallback(() => {
    console.log("Closing menu")
    setIsMenuOpen(false)
  }, [])

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Chi Siamo", href: "/chi-siamo" },
    { name: "Squadre", href: "/squadre" },
    { name: "Partite", href: "/partite" },
    { name: "News", href: "/news" },
    { name: "Sponsor", href: "/sponsor" },
    { name: "Contatti", href: "/contatti" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] glass-black dark:glass-black bg-black/90 dark:bg-black/90">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-black">
              <Image
                src="/images/vc-logo.png"
                alt="Volley Club Trieste Logo"
                width={50}
                height={50}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-white dark:text-white whitespace-nowrap">Volley Club Trieste</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm lg:text-base text-white dark:text-white hover:text-gray-200 dark:hover:text-gray-200 transition-colors duration-200 font-medium border-b-2 border-transparent hover:border-white dark:hover:border-white whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div
            className="md:hidden flex items-center justify-center p-2 cursor-pointer relative z-[110]"
            onClick={toggleMenu}
          >
            <button
              type="button"
              className="text-white hover:bg-white/10 h-9 w-9 sm:h-10 sm:w-10 rounded-md flex items-center justify-center transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-3 sm:py-4 bg-black/95 backdrop-blur-xl border border-white/20 rounded-xl mt-2 mx-2 shadow-2xl relative z-[105] animate-in slide-in-from-top-2 fade-in duration-300">
            <nav className="flex flex-col space-y-1 sm:space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm sm:text-base text-white dark:text-white hover:text-gray-200 dark:hover:text-gray-200 transition-colors duration-200 font-medium px-3 sm:px-4 py-2 sm:py-2.5 rounded-md hover:bg-white/10 dark:hover:bg-white/10"
                  onClick={closeMenu}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
