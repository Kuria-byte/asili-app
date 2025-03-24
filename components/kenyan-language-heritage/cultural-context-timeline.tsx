"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import Image from "next/image"

export function CulturalContextTimeline() {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const timelineEvents = [
    {
      period: "Pre-Colonial Era (Before 1885)",
      title: "Indigenous Language Development",
      description:
        "Kenyan languages evolved naturally within distinct ethnic communities, developing rich oral traditions, poetry forms, and cultural expressions. Languages were primarily used for cultural transmission and local governance.",
      image: "https://images.unsplash.com/photo-1604934380103-e397c912e65d?q=80&w=1000",
      impact:
        "Languages developed specialized vocabulary for traditional practices, spiritual concepts, and ecological knowledge.",
    },
    {
      period: "Colonial Period (1885-1963)",
      title: "European Influence & Written Forms",
      description:
        "British colonial rule introduced English as the language of administration and education. Missionaries developed writing systems for many Kenyan languages to translate religious texts, creating the first written forms of these languages.",
      image: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=1000",
      impact:
        "Introduction of Latin alphabet for writing Kenyan languages, standardization of some languages, and marginalization of indigenous languages in formal settings.",
    },
    {
      period: "Independence Era (1963-1980s)",
      title: "Nation Building & Language Policy",
      description:
        "After independence, Kenya adopted English and Swahili as official languages. Swahili was promoted as a national language to foster unity across ethnic groups, while English remained dominant in government and education.",
      image: "https://images.unsplash.com/photo-1596005554384-d293674c91d7?q=80&w=1000",
      impact:
        "Strengthening of Swahili as a national lingua franca, continued decline in the use of indigenous languages in formal education.",
    },
    {
      period: "Modern Era (1990s-Present)",
      title: "Digital Age & Revitalization",
      description:
        "Growing recognition of indigenous languages' cultural value has led to revitalization efforts. The 2010 Constitution recognized the promotion of indigenous languages. Digital technologies have created new platforms for language preservation and learning.",
      image: "https://images.unsplash.com/photo-1589825743127-e9b6d0b10525?q=80&w=1000",
      impact:
        "Development of language apps, digital dictionaries, and online learning resources for Kenyan languages. Increased visibility in media and education.",
    },
    {
      period: "Future Outlook",
      title: "Balancing Globalization & Heritage",
      description:
        "Kenya faces the challenge of balancing global connectivity (requiring international languages) with preserving linguistic heritage. Community-led initiatives and educational reforms are working to ensure indigenous languages remain vital.",
      image: "https://images.unsplash.com/photo-1627394678694-cd1f98b014c0?q=80&w=1000",
      impact:
        "Growing awareness of language as cultural heritage, development of multilingual education models, and integration of indigenous knowledge systems.",
    },
  ]

  const scrollToNext = () => {
    if (activeIndex < timelineEvents.length - 1) {
      setActiveIndex(activeIndex + 1)
      scrollToEvent(activeIndex + 1)
    }
  }

  const scrollToPrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
      scrollToEvent(activeIndex - 1)
    }
  }

  const scrollToEvent = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const eventWidth = container.scrollWidth / timelineEvents.length
      container.scrollTo({
        left: eventWidth * index,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="mt-6 rounded-xl border border-amber-100 p-4 dark:border-amber-900/30">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-serif text-lg text-amber-950 dark:text-amber-100">Cultural Context Timeline</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={scrollToPrevious}
            disabled={activeIndex === 0}
            className="rounded-full bg-amber-100 p-2 text-amber-700 transition-colors hover:bg-amber-200 disabled:opacity-50 dark:bg-amber-900/50 dark:text-amber-300 dark:hover:bg-amber-800"
            aria-label="Previous period"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={scrollToNext}
            disabled={activeIndex === timelineEvents.length - 1}
            className="rounded-full bg-amber-100 p-2 text-amber-700 transition-colors hover:bg-amber-200 disabled:opacity-50 dark:bg-amber-900/50 dark:text-amber-300 dark:hover:bg-amber-800"
            aria-label="Next period"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Timeline bar */}
      <div className="relative mb-6 h-2 w-full overflow-hidden rounded-full bg-amber-100 dark:bg-amber-900/50">
        <motion.div
          className="absolute h-full bg-amber-500 dark:bg-amber-400"
          initial={{ width: `${(1 / timelineEvents.length) * 100}%` }}
          animate={{
            width: `${(1 / timelineEvents.length) * 100}%`,
            left: `${(activeIndex / timelineEvents.length) * 100}%`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        {/* Timeline markers */}
        <div className="absolute top-0 w-full flex justify-between">
          {timelineEvents.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${
                index <= activeIndex ? "bg-amber-500 dark:bg-amber-400" : "bg-amber-200 dark:bg-amber-800"
              }`}
              style={{ transform: "translateX(-50%)" }}
              onClick={() => {
                setActiveIndex(index)
                scrollToEvent(index)
              }}
              aria-label={`Go to timeline event ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Timeline periods */}
      <div className="mb-4 flex justify-between text-xs text-amber-700 dark:text-amber-300">
        {timelineEvents.map((event, index) => (
          <div
            key={index}
            className={`w-1/5 text-center ${
              index === activeIndex ? "font-bold text-amber-900 dark:text-amber-100" : ""
            }`}
          >
            {event.period.split(" ")[0]}
          </div>
        ))}
      </div>

      {/* Timeline content */}
      <div ref={scrollContainerRef} className="hide-scrollbar overflow-x-auto">
        <div className="flex w-max">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              className={`w-[calc(100vw-4rem)] max-w-[800px] flex-shrink-0 rounded-lg border p-4 ${
                index === activeIndex
                  ? "border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-900/30"
                  : "border-amber-100 bg-white dark:border-amber-900/30 dark:bg-card"
              }`}
              initial={{ opacity: 0.7, scale: 0.95 }}
              animate={{
                opacity: index === activeIndex ? 1 : 0.7,
                scale: index === activeIndex ? 1 : 0.95,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/3">
                  <div className="relative h-40 w-full overflow-hidden rounded-lg">
                    <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-xs text-amber-700 dark:text-amber-300">
                    <Calendar size={12} />
                    <span>{event.period}</span>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h4 className="mb-2 font-medium text-amber-900 dark:text-amber-100">{event.title}</h4>
                  <p className="mb-3 text-sm text-amber-700 dark:text-amber-300">{event.description}</p>
                  <div className="rounded-lg bg-amber-50 p-2 text-xs text-amber-700 dark:bg-amber-900/20 dark:text-amber-300">
                    <strong>Language Impact:</strong> {event.impact}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

