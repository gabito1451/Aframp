"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Country {
  code: string
  name: string
  flag: string
  currency: string
}

const countries: Country[] = [
  { code: "NG", name: "Nigeria", flag: "🇳🇬", currency: "₦" },
  { code: "KE", name: "Kenya", flag: "🇰🇪", currency: "KSh" },
  { code: "GH", name: "Ghana", flag: "🇬🇭", currency: "₵" },
]

interface CountrySelectorProps {
  selectedCountry: string
  onCountryChange: (code: string) => void
}

export function CountrySelector({ selectedCountry, onCountryChange }: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load saved preference
    const savedCountry = localStorage.getItem("preferredCountry")
    if (savedCountry && savedCountry !== selectedCountry) {
      onCountryChange(savedCountry)
    }
  }, [])

  const selected = countries.find(c => c.code === selectedCountry) || countries[0]

  const handleSelect = (country: Country) => {
    onCountryChange(country.code)
    localStorage.setItem("preferredCountry", country.code)
    setIsOpen(false)
  }

  if (!mounted) {
    return (
      <div className="w-32 h-10 rounded-lg bg-muted animate-pulse"></div>
    )
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-32 justify-between gap-2 h-10 rounded-lg border-border bg-background hover:bg-accent"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <span className="text-lg">{selected.flag}</span>
          <span className="font-medium">{selected.code}</span>
        </span>
        <ChevronDown 
          className={cn(
            "h-4 w-4 transition-transform",
            isOpen && "rotate-180"
          )} 
        />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-border bg-card shadow-xl p-2"
              role="listbox"
            >
              {countries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleSelect(country)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-accent",
                    selectedCountry === country.code && "bg-primary/10 text-primary"
                  )}
                  role="option"
                  aria-selected={selectedCountry === country.code}
                >
                  <span className="text-xl">{country.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium">{country.name}</div>
                    <div className="text-xs text-muted-foreground">{country.currency}</div>
                  </div>
                  {selectedCountry === country.code && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}