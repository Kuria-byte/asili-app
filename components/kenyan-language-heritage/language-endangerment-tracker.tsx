"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, TrendingDown, TrendingUp, Users, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function LanguageEndangermentTracker() {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

  const endangermentLevels = [
    { id: "safe", name: "Safe", color: "#4CAF50" },
    { id: "vulnerable", name: "Vulnerable", color: "#FFC107" },
    { id: "endangered", name: "Definitely Endangered", color: "#FF9800" },
    { id: "severely", name: "Severely Endangered", color: "#F44336" },
    { id: "critically", name: "Critically Endangered", color: "#D32F2F" },
  ]

  const languages = [
    {
      id: "swahili",
      name: "Swahili",
      status: "safe",
      speakers: 15000000,
      trend: "increasing",
      region: "Coastal Kenya, urban centers",
      initiatives: ["National language policy support", "Media presence", "Educational integration"],
      notes: "Swahili is an official language and widely used in education, media, and government.",
    },
    {
      id: "kikuyu",
      name: "Kikuyu",
      status: "safe",
      speakers: 8500000,
      trend: "stable",
      region: "Central Kenya",
      initiatives: ["Community radio programs", "Cultural festivals", "Local literature"],
      notes: "Strong intergenerational transmission in rural areas, some decline in urban settings.",
    },
    {
      id: "luhya",
      name: "Luhya",
      status: "safe",
      speakers: 6800000,
      trend: "stable",
      region: "Western Kenya",
      initiatives: ["Local media", "Cultural preservation groups"],
      notes: "Comprises several related dialects, some of which are more vulnerable than others.",
    },
    {
      id: "luo",
      name: "Luo",
      status: "safe",
      speakers: 4200000,
      trend: "stable",
      region: "Nyanza",
      initiatives: ["Community language programs", "Music and arts integration"],
      notes: "Strong cultural identity tied to language, but facing urban decline.",
    },
    {
      id: "kamba",
      name: "Kamba",
      status: "safe",
      speakers: 4700000,
      trend: "stable",
      region: "Eastern Kenya",
      initiatives: ["Local schools language programs", "Cultural centers"],
      notes: "Well-maintained in rural areas, some urban decline.",
    },
    {
      id: "kalenjin",
      name: "Kalenjin",
      status: "safe",
      speakers: 5000000,
      trend: "stable",
      region: "Rift Valley",
      initiatives: ["Community language programs", "Cultural festivals"],
      notes: "Group of related languages with varying levels of vitality.",
    },
    {
      id: "somali",
      name: "Somali",
      status: "safe",
      speakers: 2800000,
      trend: "increasing",
      region: "Northeastern Kenya",
      initiatives: ["Cross-border media", "Educational materials"],
      notes: "Strong community use and cross-border support from Somalia.",
    },
    {
      id: "maasai",
      name: "Maasai",
      status: "vulnerable",
      speakers: 1100000,
      trend: "declining",
      region: "Rift Valley, Southern Kenya",
      initiatives: ["Cultural heritage programs", "Tourism-supported language initiatives", "Community schools"],
      notes: "Facing pressure from education and economic factors, but strong cultural identity.",
    },
    {
      id: "turkana",
      name: "Turkana",
      status: "vulnerable",
      speakers: 1200000,
      trend: "stable",
      region: "Northwestern Kenya",
      initiatives: ["Local language committees", "Educational materials development"],
      notes: "Relatively isolated region has helped maintain the language.",
    },
    {
      id: "rendille",
      name: "Rendille",
      status: "endangered",
      speakers: 100000,
      trend: "declining",
      region: "Northern Kenya",
      initiatives: ["Documentation projects", "Community language workshops"],
      notes: "Pressure from neighboring languages and changing lifestyle patterns.",
    },
    {
      id: "elmolo",
      name: "El Molo",
      status: "critically",
      speakers: 700,
      trend: "declining",
      region: "Lake Turkana region",
      initiatives: ["Emergency documentation", "Community revitalization project", "Digital archive creation"],
      notes: "One of Kenya's most endangered languages, with few fluent speakers remaining.",
    },
    {
      id: "omotik",
      name: "Omotik",
      status: "critically",
      speakers: 500,
      trend: "declining",
      region: "Rift Valley",
      initiatives: ["Documentation efforts", "Elder recording programs"],
      notes: "Very few speakers remain, mostly elderly. Language shifting to Maasai.",
    },
    {
      id: "yaaku",
      name: "Yaaku",
      status: "critically",
      speakers: 300,
      trend: "declining",
      region: "Central Kenya",
      initiatives: ["Revitalization project", "School pilot program", "Dictionary development"],
      notes: "Revival efforts underway but facing significant challenges.",
    },
  ]

  // Filter languages by selected status
  const filteredLanguages = selectedStatus ? languages.filter((lang) => lang.status === selectedStatus) : languages

  // Sort languages by number of speakers (descending)
  const sortedLanguages = [...filteredLanguages].sort((a, b) => b.speakers - a.speakers)

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return (
    <div className="mt-6 rounded-xl border border-amber-100 p-4 dark:border-amber-900/30">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-serif text-lg text-amber-950 dark:text-amber-100">Language Endangerment Status Tracker</h3>
      </div>

      {/* Status filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
            selectedStatus === null
              ? "bg-amber-500 text-white dark:bg-amber-600"
              : "bg-white text-amber-700 border border-amber-200 hover:bg-amber-50 dark:bg-card dark:text-amber-300 dark:border-amber-800"
          }`}
          onClick={() => setSelectedStatus(null)}
        >
          All Statuses
        </button>

        {endangermentLevels.map((level) => (
          <button
            key={level.id}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              selectedStatus === level.id
                ? "bg-amber-500 text-white dark:bg-amber-600"
                : "bg-white text-amber-700 border border-amber-200 hover:bg-amber-50 dark:bg-card dark:text-amber-300 dark:border-amber-800"
            }`}
            onClick={() => setSelectedStatus(level.id)}
          >
            {level.name}
          </button>
        ))}
      </div>

      {/* Languages grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedLanguages.map((language) => {
          const statusInfo = endangermentLevels.find((level) => level.id === language.status)

          return (
            <motion.div
              key={language.id}
              className="rounded-lg border border-amber-100 bg-white p-4 dark:border-amber-900/30 dark:bg-card"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-amber-900 dark:text-amber-100">{language.name}</h4>
                  <div className="flex items-center gap-1 text-xs text-amber-700 dark:text-amber-300">
                    <Users size={12} />
                    <span>{formatNumber(language.speakers)} speakers</span>
                  </div>
                </div>
                <div
                  className="rounded-full px-2 py-0.5 text-xs font-medium"
                  style={{
                    backgroundColor: `${statusInfo?.color}20`,
                    color: statusInfo?.color,
                  }}
                >
                  {statusInfo?.name}
                </div>
              </div>

              <div className="mb-3 flex items-center justify-between">
                <div className="text-xs text-amber-700 dark:text-amber-300">
                  <span>Region: {language.region}</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  {language.trend === "increasing" ? (
                    <>
                      <TrendingUp size={14} className="text-green-500" />
                      <span className="text-green-600 dark:text-green-400">Increasing</span>
                    </>
                  ) : language.trend === "declining" ? (
                    <>
                      <TrendingDown size={14} className="text-red-500" />
                      <span className="text-red-600 dark:text-red-400">Declining</span>
                    </>
                  ) : (
                    <span className="text-amber-600 dark:text-amber-400">Stable</span>
                  )}
                </div>
              </div>

              {/* Preservation initiatives */}
              <div className="mb-2">
                <h5 className="mb-1 text-xs font-medium text-amber-900 dark:text-amber-100">
                  Preservation Initiatives:
                </h5>
                <div className="flex flex-wrap gap-1">
                  {language.initiatives.map((initiative, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] text-amber-700 dark:bg-amber-900/20 dark:text-amber-300"
                    >
                      {initiative}
                    </span>
                  ))}
                </div>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex cursor-help items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                      <Info size={12} />
                      <span>More info</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">{language.notes}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          )
        })}
      </div>

      {/* Warning for critically endangered languages */}
      {(selectedStatus === "critically" || selectedStatus === null) && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/30 dark:bg-red-900/10 dark:text-red-300">
          <div className="flex items-start gap-2">
            <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
            <p>
              Critically endangered languages require urgent action. These languages have very few speakers remaining,
              most of whom are elderly. Without immediate intervention, these languages may disappear within a
              generation, taking with them unique cultural knowledge and perspectives.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

