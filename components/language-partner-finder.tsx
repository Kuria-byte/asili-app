"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageCircle, Star, Filter, Search, MapPin } from "lucide-react"
import Image from "next/image"

interface LanguagePartner {
  id: string
  name: string
  avatarUrl: string
  languages: {
    name: string
    level: "beginner" | "intermediate" | "advanced" | "native"
  }[]
  location: string
  bio: string
  rating: number
  interests: string[]
  availability: "morning" | "afternoon" | "evening" | "flexible"
}

interface LanguagePartnerFinderProps {
  partners: LanguagePartner[]
  className?: string
}

export function LanguagePartnerFinder({ partners, className = "" }: LanguagePartnerFinderProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [selectedAvailability, setSelectedAvailability] = useState<string | null>(null)

  // Get unique languages from all partners
  const allLanguages = Array.from(
    new Set(partners.flatMap((partner) => partner.languages.map((lang) => lang.name))),
  ).sort()

  // Filter partners based on search and filters
  const filteredPartners = partners.filter((partner) => {
    // Search term filter
    if (
      searchTerm &&
      !partner.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !partner.bio.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !partner.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !partner.interests.some((interest) => interest.toLowerCase().includes(searchTerm.toLowerCase()))
    ) {
      return false
    }

    // Language filter
    if (selectedLanguage && !partner.languages.some((lang) => lang.name === selectedLanguage)) {
      return false
    }

    // Availability filter
    if (selectedAvailability && partner.availability !== selectedAvailability) {
      return false
    }

    return true
  })

  return (
    <div className={`rounded-xl border border-amber-100 bg-white p-4 shadow-sm ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-serif text-lg text-amber-950">Find a Language Partner</h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 transition-colors hover:bg-amber-200"
        >
          <Filter className="h-3 w-3" />
          Filters
        </button>
      </div>

      <div className="mb-4 relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, location, or interests..."
          className="w-full rounded-full border border-amber-200 bg-white py-2 pl-10 pr-4 text-sm text-amber-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-400" />
      </div>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-4 rounded-lg border border-amber-100 bg-amber-50 p-3"
        >
          <div className="mb-3">
            <label className="mb-1 block text-xs font-medium text-amber-900">Language</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedLanguage(null)}
                className={`rounded-full px-2 py-1 text-xs ${
                  selectedLanguage === null
                    ? "bg-amber-500 text-white"
                    : "bg-white text-amber-700 border border-amber-200"
                }`}
              >
                All
              </button>
              {allLanguages.map((language) => (
                <button
                  key={language}
                  onClick={() => setSelectedLanguage(language)}
                  className={`rounded-full px-2 py-1 text-xs ${
                    selectedLanguage === language
                      ? "bg-amber-500 text-white"
                      : "bg-white text-amber-700 border border-amber-200"
                  }`}
                >
                  {language}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-amber-900">Availability</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedAvailability(null)}
                className={`rounded-full px-2 py-1 text-xs ${
                  selectedAvailability === null
                    ? "bg-amber-500 text-white"
                    : "bg-white text-amber-700 border border-amber-200"
                }`}
              >
                Any time
              </button>
              {["morning", "afternoon", "evening", "flexible"].map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedAvailability(time)}
                  className={`rounded-full px-2 py-1 text-xs capitalize ${
                    selectedAvailability === time
                      ? "bg-amber-500 text-white"
                      : "bg-white text-amber-700 border border-amber-200"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <div className="space-y-3">
        {filteredPartners.length === 0 ? (
          <div className="rounded-lg border border-amber-100 bg-amber-50 p-4 text-center">
            <p className="text-amber-900">No language partners match your criteria.</p>
            <p className="mt-1 text-sm text-amber-700">Try adjusting your filters or search term.</p>
          </div>
        ) : (
          filteredPartners.map((partner) => (
            <motion.div
              key={partner.id}
              whileHover={{ y: -4 }}
              className="overflow-hidden rounded-xl border border-amber-100 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={partner.avatarUrl || "/placeholder.svg"}
                      alt={partner.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-amber-950">{partner.name}</h3>
                        <div className="flex items-center gap-1 text-xs text-amber-700">
                          <MapPin className="h-3 w-3" />
                          <span>{partner.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                        <span>{partner.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <p className="mt-1 text-xs text-amber-700 line-clamp-2">{partner.bio}</p>

                    <div className="mt-2 flex flex-wrap gap-1">
                      {partner.languages.map((language, index) => (
                        <span
                          key={index}
                          className={`rounded-full px-2 py-0.5 text-xs ${getLanguageLevelStyle(language.level)}`}
                        >
                          {language.name} ({language.level})
                        </span>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {partner.interests.slice(0, 3).map((interest, index) => (
                          <span key={index} className="rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-700">
                            {interest}
                          </span>
                        ))}
                        {partner.interests.length > 3 && (
                          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-700">
                            +{partner.interests.length - 3} more
                          </span>
                        )}
                      </div>

                      <button className="flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-amber-600">
                        <MessageCircle className="h-3 w-3" />
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

function getLanguageLevelStyle(level: string): string {
  switch (level) {
    case "beginner":
      return "bg-blue-100 text-blue-700"
    case "intermediate":
      return "bg-green-100 text-green-700"
    case "advanced":
      return "bg-purple-100 text-purple-700"
    case "native":
      return "bg-amber-100 text-amber-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

