"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ChevronRight, Users, Filter, Grid3X3, List, SortAsc, SortDesc, Volume2, MapPin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ModeToggle } from "@/components/theme-toggle"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { PageTransition } from "@/components/page-transition"
import { Progress } from "@/components/ui/progress"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function LanguagesPage() {
  // State for UI controls
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"popularity" | "alphabetical" | "progress">("popularity")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [activeAudio, setActiveAudio] = useState<string | null>(null)

  // Mock data for all languages with enhanced information
  const languages = [
    {
      id: "kikuyu",
      name: "Kikuyu",
      region: "Central Kenya",
      image: "https://images.unsplash.com/photo-1589825743127-e9b6d0b10525?q=80&w=1000",
      difficulty: "Moderate",
      speakers: "8.5 million",
      progress: 40,
      description: "Kikuyu is a Bantu language spoken primarily by the Kikuyu people of Kenya.",
      tags: ["bantu", "central-kenya", "tonal"],
      quickFacts: [
        "Second most widely spoken language in Kenya",
        "Rich oral tradition with proverbs and riddles",
        "Five vowel system with length distinction",
      ],
      relatedLanguages: ["kamba", "meru", "embu"],
      activeLearners: 12500,
      greeting: {
        text: "Ũhoro waku",
        translation: "How are you",
        audioUrl: "/audio/kikuyu/uhoro-waku.mp3",
      },
      culturalEvents: [
        {
          name: "Kikuyu Cultural Festival",
          date: "June 15, 2023",
        },
      ],
    },
    {
      id: "swahili",
      name: "Swahili",
      region: "Coastal Kenya",
      image: "https://images.unsplash.com/photo-1596005554384-d293674c91d7?q=80&w=1000",
      difficulty: "Easy",
      speakers: "15 million",
      progress: 25,
      description: "Swahili is a Bantu language that serves as a lingua franca of the East African region.",
      tags: ["bantu", "coastal", "lingua-franca", "trade-language"],
      quickFacts: [
        "Official language in Kenya and Tanzania",
        "Influenced by Arabic, Persian, and Portuguese",
        "Used as a trade language across East Africa",
      ],
      relatedLanguages: ["mijikenda", "comorian", "pokomo"],
      activeLearners: 28000,
      greeting: {
        text: "Habari yako",
        translation: "How are you",
        audioUrl: "/audio/swahili/habari-yako.mp3",
      },
      culturalEvents: [
        {
          name: "Swahili Cultural Week",
          date: "July 7, 2023",
        },
      ],
    },
    {
      id: "luo",
      name: "Luo",
      region: "Western Kenya",
      image: "https://images.unsplash.com/photo-1627394678694-cd1f98b014c0?q=80&w=1000",
      difficulty: "Moderate",
      speakers: "4.2 million",
      progress: 0,
      description: "Luo is a Nilotic language spoken by the Luo people of western Kenya.",
      tags: ["nilotic", "western-kenya", "tonal"],
      quickFacts: [
        "Third most widely spoken language in Kenya",
        "Complex tonal system with three tones",
        "Rich musical and poetic traditions",
      ],
      relatedLanguages: ["dholuo", "acholi", "lango"],
      activeLearners: 7800,
      greeting: {
        text: "Nade",
        translation: "How are you",
        audioUrl: "/audio/luo/nade.mp3",
      },
      culturalEvents: [
        {
          name: "Luo Cultural Day",
          date: "August 22, 2023",
        },
      ],
    },
    {
      id: "kamba",
      name: "Kamba",
      region: "Eastern Kenya",
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1000",
      difficulty: "Moderate",
      speakers: "4 million",
      progress: 0,
      description: "Kamba is a Bantu language spoken by the Kamba people of Kenya.",
      tags: ["bantu", "eastern-kenya"],
      quickFacts: [
        "Fourth most widely spoken language in Kenya",
        "Known for distinctive wood carving traditions",
        "Seven vowel system with length distinction",
      ],
      relatedLanguages: ["kikuyu", "meru", "embu"],
      activeLearners: 5200,
      greeting: {
        text: "Uvoo waku",
        translation: "How are you",
        audioUrl: "/audio/kamba/uvoo-waku.mp3",
      },
      culturalEvents: [
        {
          name: "Kamba Arts Festival",
          date: "September 10, 2023",
        },
      ],
    },
    {
      id: "kalenjin",
      name: "Kalenjin",
      region: "Rift Valley",
      image: "https://images.unsplash.com/photo-1623066798929-648ab0bee90d?q=80&w=1000",
      difficulty: "Difficult",
      speakers: "5 million",
      progress: 0,
      description: "Kalenjin is a group of related languages spoken by the Kalenjin people of Kenya.",
      tags: ["nilotic", "rift-valley", "tonal"],
      quickFacts: [
        "Known for producing world-class long-distance runners",
        "Complex noun class system",
        "Rich pastoral traditions and folklore",
      ],
      relatedLanguages: ["nandi", "kipsigis", "tugen"],
      activeLearners: 6100,
      greeting: {
        text: "Chamgei",
        translation: "Hello",
        audioUrl: "/audio/kalenjin/chamgei.mp3",
      },
      culturalEvents: [
        {
          name: "Kalenjin Heritage Day",
          date: "October 5, 2023",
        },
      ],
    },
    {
      id: "meru",
      name: "Meru",
      region: "Eastern Kenya",
      image: "https://images.unsplash.com/photo-1514462556161-43be6dbd4c8e?q=80&w=1000",
      difficulty: "Moderate",
      speakers: "2 million",
      progress: 0,
      description: "Meru is a Bantu language spoken by the Meru people of Kenya.",
      tags: ["bantu", "eastern-kenya", "mount-kenya"],
      quickFacts: ["Spoken around Mount Kenya region", "Rich agricultural traditions", "Complex verb morphology"],
      relatedLanguages: ["kikuyu", "kamba", "embu"],
      activeLearners: 3200,
      greeting: {
        text: "Muuga ata",
        translation: "How are you",
        audioUrl: "/audio/meru/muuga-ata.mp3",
      },
      culturalEvents: [
        {
          name: "Meru Cultural Exhibition",
          date: "November 12, 2023",
        },
      ],
    },
  ]

  // Get unique regions from all languages
  const regions = Array.from(new Set(languages.map((lang) => lang.region))).sort()

  // Get languages you're learning (with progress > 0)
  const learningLanguages = languages.filter((lang) => lang.progress > 0)

  // Get recommended languages based on what you're learning
  const getRecommendedLanguages = () => {
    if (learningLanguages.length === 0) return languages.slice(0, 3)

    const relatedTags = learningLanguages.flatMap((lang) => lang.tags)
    return languages
      .filter((lang) => lang.progress === 0 && lang.tags.some((tag) => relatedTags.includes(tag)))
      .slice(0, 3)
  }

  const recommendedLanguages = getRecommendedLanguages()

  // Filter and sort languages
  const filteredLanguages = languages.filter((language) => {
    // Search term filter
    if (
      searchTerm &&
      !language.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !language.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !language.region.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !language.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    ) {
      return false
    }

    // Region filter
    if (selectedRegion && language.region !== selectedRegion) {
      return false
    }

    return true
  })

  // Sort languages
  const sortedLanguages = [...filteredLanguages].sort((a, b) => {
    if (sortBy === "alphabetical") {
      return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    } else if (sortBy === "progress") {
      return sortDirection === "asc" ? a.progress - b.progress : b.progress - a.progress
    } else {
      // popularity (by active learners)
      return sortDirection === "asc" ? a.activeLearners - b.activeLearners : b.activeLearners - a.activeLearners
    }
  })

  // Play audio greeting
  const playAudio = (audioUrl: string) => {
    if (activeAudio) {
      // Stop current audio if playing
      const currentAudio = document.getElementById("audio-player") as HTMLAudioElement
      if (currentAudio) {
        currentAudio.pause()
        currentAudio.currentTime = 0
      }
    }

    setActiveAudio(audioUrl)
    setTimeout(() => {
      const audioPlayer = document.getElementById("audio-player") as HTMLAudioElement
      if (audioPlayer) {
        audioPlayer.play()
      }
    }, 100)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400"
      case "moderate":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400"
      case "difficult":
        return "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400"
      default:
        return "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
    }
  }

  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col bg-cream dark:bg-background pb-20">
        <header className="sticky top-0 z-10 border-b border-amber-100 dark:border-amber-900/30 bg-cream/95 dark:bg-background/95 backdrop-blur-sm py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <h1 className="text-center font-serif text-xl text-amber-950 dark:text-amber-100">Languages</h1>
            <ModeToggle />
          </div>
        </header>

        <main className="flex-1 py-6">
          <div className="container mx-auto px-4">
            {/* Search Bar */}
            <div className="mb-6 relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search languages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-full border border-amber-200 dark:border-amber-800 bg-white dark:bg-card py-2 pl-10 pr-4 text-sm text-amber-900 dark:text-amber-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  aria-label="Search languages"
                />
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-400 dark:text-amber-600" />
              </div>
            </div>

            {/* Controls and Filters */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex overflow-x-auto pb-2 hide-scrollbar">
                <button
                  onClick={() => setSelectedRegion(null)}
                  className={`mr-2 whitespace-nowrap rounded-full ${
                    selectedRegion === null
                      ? "bg-amber-500 dark:bg-amber-600 text-white"
                      : "bg-white dark:bg-card text-amber-900 dark:text-amber-100 border border-amber-200 dark:border-amber-800"
                  } px-4 py-1.5 text-xs font-medium`}
                  aria-label="Filter by all languages"
                >
                  All Regions
                </button>

                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`mr-2 whitespace-nowrap rounded-full ${
                      selectedRegion === region
                        ? "bg-amber-500 dark:bg-amber-600 text-white"
                        : "bg-white dark:bg-card text-amber-900 dark:text-amber-100 border border-amber-200 dark:border-amber-800"
                    } px-4 py-1.5 text-xs font-medium`}
                    aria-label={`Filter by ${region} languages`}
                  >
                    {region}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-card border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300"
                  aria-label="Toggle view mode"
                >
                  {viewMode === "grid" ? <List size={16} /> : <Grid3X3 size={16} />}
                </button>

                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      className="flex h-8 items-center gap-1 rounded-full bg-white dark:bg-card border border-amber-200 dark:border-amber-800 px-3 text-xs font-medium text-amber-700 dark:text-amber-300"
                      aria-label="Sort options"
                    >
                      <Filter size={12} />
                      Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-2">
                    <div className="space-y-1">
                      <button
                        onClick={() => setSortBy("popularity")}
                        className={`w-full rounded-md px-2 py-1 text-left text-sm ${
                          sortBy === "popularity"
                            ? "bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-100"
                            : "hover:bg-amber-50 dark:hover:bg-amber-900/10"
                        }`}
                      >
                        Popularity
                      </button>
                      <button
                        onClick={() => setSortBy("alphabetical")}
                        className={`w-full rounded-md px-2 py-1 text-left text-sm ${
                          sortBy === "alphabetical"
                            ? "bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-100"
                            : "hover:bg-amber-50 dark:hover:bg-amber-900/10"
                        }`}
                      >
                        Alphabetical
                      </button>
                      <button
                        onClick={() => setSortBy("progress")}
                        className={`w-full rounded-md px-2 py-1 text-left text-sm ${
                          sortBy === "progress"
                            ? "bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-100"
                            : "hover:bg-amber-50 dark:hover:bg-amber-900/10"
                        }`}
                      >
                        Your Progress
                      </button>
                      <div className="my-1 border-t border-amber-100 dark:border-amber-800"></div>
                      <button
                        onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
                        className="flex w-full items-center gap-1 rounded-md px-2 py-1 text-left text-sm hover:bg-amber-50 dark:hover:bg-amber-900/10"
                      >
                        {sortDirection === "asc" ? <SortAsc size={14} /> : <SortDesc size={14} />}
                        {sortDirection === "asc" ? "Ascending" : "Descending"}
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* My Languages Section */}
            {learningLanguages.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4 font-serif text-lg text-amber-950 dark:text-amber-100">My Languages</h2>
                <div className={viewMode === "grid" ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
                  {learningLanguages.map((language) => (
                    <LanguageCard key={language.id} language={language} viewMode={viewMode} playAudio={playAudio} />
                  ))}
                </div>
              </div>
            )}

            {/* Recommended Languages */}
            <div className="mb-8">
              <h2 className="mb-4 font-serif text-lg text-amber-950 dark:text-amber-100">Recommended For You</h2>
              <div className={viewMode === "grid" ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
                {recommendedLanguages.map((language) => (
                  <LanguageCard
                    key={language.id}
                    language={language}
                    viewMode={viewMode}
                    playAudio={playAudio}
                    isRecommended
                  />
                ))}
              </div>
            </div>

            {/* All Languages */}
            <div>
              <h2 className="mb-4 font-serif text-lg text-amber-950 dark:text-amber-100">All Languages</h2>

              {sortedLanguages.length === 0 ? (
                <div className="rounded-xl border border-amber-100 dark:border-amber-900/30 bg-white dark:bg-card p-8 text-center">
                  <p className="text-amber-900 dark:text-amber-100">No languages match your search criteria.</p>
                  <p className="mt-2 text-sm text-amber-700 dark:text-amber-300">
                    Try adjusting your filters or search term.
                  </p>
                </div>
              ) : (
                <div className={viewMode === "grid" ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
                  {sortedLanguages.map((language) => (
                    <LanguageCard key={language.id} language={language} viewMode={viewMode} playAudio={playAudio} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Audio Player (hidden) */}
        {activeAudio && <audio id="audio-player" src={activeAudio} onEnded={() => setActiveAudio(null)} />}

        {/* Bottom Navigation */}
        <BottomNav activePath="languages" />
      </div>
    </PageTransition>
  )
}

interface LanguageCardProps {
  language: any
  viewMode: "grid" | "list"
  playAudio: (audioUrl: string) => void
  isRecommended?: boolean
}

function LanguageCard({ language, viewMode, playAudio, isRecommended = false }: LanguageCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400"
      case "moderate":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400"
      case "difficult":
        return "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400"
      default:
        return "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
    }
  }

  if (viewMode === "list") {
    return (
      <Link href={`/languages/${language.id}`}>
        <motion.div
          className="overflow-hidden rounded-xl border border-amber-100 dark:border-amber-900/30 bg-white dark:bg-card shadow-sm transition-all duration-300 hover:shadow-md"
          whileHover={{ x: 5 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex">
            <div className="relative h-24 w-32 flex-shrink-0">
              <Image src={language.image || "/placeholder.svg"} alt={language.name} fill className="object-cover" />
              {isRecommended && (
                <div className="absolute top-2 left-2 rounded-full bg-amber-500 dark:bg-amber-600 px-2 py-0.5 text-[10px] text-white">
                  Recommended
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col justify-between p-3">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-lg text-amber-950 dark:text-amber-100">{language.name}</h3>
                    <div
                      className={`rounded-full ${getDifficultyColor(language.difficulty)} px-2 py-0.5 text-xs font-medium`}
                    >
                      {language.difficulty}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      playAudio(language.greeting.audioUrl)
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 transition-colors hover:bg-amber-200 dark:hover:bg-amber-800"
                    aria-label={`Listen to ${language.name} greeting`}
                  >
                    <Volume2 size={14} />
                  </button>
                </div>

                <div className="mt-1 flex items-center gap-1 text-xs text-amber-700 dark:text-amber-300">
                  <MapPin size={12} />
                  <span>{language.region}</span>
                </div>

                <div className="mt-1 flex items-center gap-1 text-xs text-amber-700 dark:text-amber-300">
                  <Users size={12} />
                  <span>{language.speakers} speakers</span>
                </div>
              </div>

              {language.progress > 0 ? (
                <div className="mt-2">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs text-amber-700 dark:text-amber-300">Progress</span>
                    <span className="text-xs font-medium text-amber-900 dark:text-amber-200">{language.progress}%</span>
                  </div>
                  <Progress value={language.progress} className="h-1.5" />
                </div>
              ) : (
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xs text-amber-700 dark:text-amber-300">Start learning today</p>
                  <ChevronRight className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </Link>
    )
  }

  return (
    <Link href={`/languages/${language.id}`}>
      <motion.div
        className="overflow-hidden rounded-xl border border-amber-100 dark:border-amber-900/30 bg-white dark:bg-card shadow-sm transition-all duration-300 hover:shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
      >
        <div className="relative h-36 w-full">
          <Image src={language.image || "/placeholder.svg"} alt={language.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

          {isRecommended && (
            <div className="absolute top-3 left-3 rounded-full bg-amber-500 dark:bg-amber-600 px-2 py-0.5 text-xs font-medium text-white">
              Recommended
            </div>
          )}

          <div className="absolute bottom-3 left-3 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-sm px-3 py-1 text-xs font-medium text-amber-900 dark:text-amber-100">
            {language.region}
          </div>

          <div className="absolute bottom-3 right-3 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-sm px-3 py-1 text-xs font-medium text-amber-900 dark:text-amber-100 flex items-center gap-1">
            <Users size={10} />
            <span>{language.speakers}</span>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-lg text-amber-950 dark:text-amber-100">{language.name}</h3>
              <div
                className={`rounded-full ${getDifficultyColor(language.difficulty)} px-2 py-0.5 text-xs font-medium`}
              >
                {language.difficulty}
              </div>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                playAudio(language.greeting.audioUrl)
              }}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 transition-colors hover:bg-amber-200 dark:hover:bg-amber-800"
              aria-label={`Listen to ${language.name} greeting`}
            >
              <Volume2 size={14} />
            </button>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-3 overflow-hidden"
              >
                <p className="text-sm text-amber-700 dark:text-amber-300 mb-2">{language.description}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-amber-900 dark:text-amber-200">
                    {language.greeting.text}
                  </span>
                  <span className="text-xs text-amber-600 dark:text-amber-400">"{language.greeting.translation}"</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {language.progress > 0 ? (
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs text-amber-700 dark:text-amber-300">Progress</span>
                <span className="text-xs font-medium text-amber-900 dark:text-amber-200">{language.progress}%</span>
              </div>
              <Progress value={language.progress} className="h-1.5" />
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-xs text-amber-700 dark:text-amber-300">Start learning today</p>
              <ChevronRight className="h-4 w-4 text-amber-500 dark:text-amber-400" />
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  )
}

