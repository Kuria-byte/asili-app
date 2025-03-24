"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import Image from "next/image"

interface LanguageTimelineProps {
  languageId: string
  languageName: string
}

export function LanguageTimeline({ languageId, languageName }: LanguageTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // This would normally come from your data source based on languageId
  const timelineEvents = {
    kikuyu: [
      {
        period: "Pre-Colonial Era (Before 1890s)",
        title: "Origins and Early Development",
        description:
          "The Kikuyu language developed among agricultural communities in the central highlands of Kenya. Oral traditions were the primary means of cultural transmission, with rich storytelling traditions and ceremonial language.",
        image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1000",
        impact: "Development of specialized vocabulary for agriculture, social organization, and spiritual practices.",
      },
      {
        period: "Early Colonial Period (1890s-1920s)",
        title: "First Written Forms",
        description:
          "Christian missionaries, particularly from the Church of Scotland Mission, developed the first writing system for Kikuyu. The first Kikuyu Bible portions were translated, and literacy in Kikuyu began to spread through mission schools.",
        image: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=1000",
        impact:
          "Standardization of written Kikuyu, introduction of Latin alphabet, and beginning of formal Kikuyu literature.",
      },
      {
        period: "Late Colonial Period (1930s-1963)",
        title: "Cultural Resistance and Preservation",
        description:
          "During the struggle for independence, Kikuyu language became a symbol of cultural identity and resistance. Independent schools movement promoted Kikuyu language education. The Mau Mau uprising used Kikuyu language as a unifying force.",
        image: "https://images.unsplash.com/photo-1596005554384-d293674c91d7?q=80&w=1000",
        impact:
          "Development of political vocabulary, secret codes, and oath terminology. Strengthening of language as cultural identity marker.",
      },
      {
        period: "Post-Independence (1963-1990s)",
        title: "Vernacular Broadcasting and Education",
        description:
          "After independence, Kikuyu language media emerged, including radio broadcasting. However, English and Swahili dominated formal education, leading to concerns about language erosion among younger generations.",
        image: "https://images.unsplash.com/photo-1589825743127-e9b6d0b10525?q=80&w=1000",
        impact: "Adaptation to modern contexts, borrowing from English and Swahili, development of urban dialects.",
      },
      {
        period: "Digital Age (2000s-Present)",
        title: "Digital Revival and Preservation",
        description:
          "Digital technologies have created new platforms for Kikuyu language use, including social media, apps, and online resources. Community efforts to document and preserve the language have increased.",
        image: "https://images.unsplash.com/photo-1627394678694-cd1f98b014c0?q=80&w=1000",
        impact:
          "Development of digital terminology, keyboard layouts, and language learning resources. Integration of Kikuyu into modern technological contexts.",
      },
    ],
    // Add other languages here
    luo: [
      // Luo timeline events
    ],
    swahili: [
      // Swahili timeline events
    ],
  }

  const events = timelineEvents[languageId as keyof typeof timelineEvents] || timelineEvents.kikuyu

  const scrollToNext = () => {
    if (activeIndex < events.length - 1) {
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
      const eventWidth = container.scrollWidth / events.length
      container.scrollTo({
        left: eventWidth * index,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="rounded-xl border border-amber-100 p-4 dark:border-amber-900/30">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-serif text-lg text-amber-950 dark:text-amber-100">{languageName} Language Timeline</h3>
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
            disabled={activeIndex === events.length - 1}
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
          initial={{ width: `${(1 / events.length) * 100}%` }}
          animate={{
            width: `${(1 / events.length) * 100}%`,
            left: `${(activeIndex / events.length) * 100}%`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        {/* Timeline markers */}
        <div className="absolute top-0 w-full flex justify-between">
          {events.map((_, index) => (
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
        {events.map((event, index) => (
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
          {events.map((event, index) => (
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
                {/* <div className="md:w-1/3">
                  <div className="relative h-40 w-full overflow-hidden rounded-lg">
                    <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-xs text-amber-700 dark:text-amber-300">
                    <Calendar size={12} />
                    <span>{event.period}</span>
                  </div>
                </div> */}
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

