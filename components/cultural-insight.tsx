"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface CulturalInsight {
  id: string
  title: string
  content: string
  imageUrl: string
  category: "tradition" | "proverb" | "history" | "art"
  language: string
  region: string
}

interface CulturalInsightProps {
  insights: CulturalInsight[]
  className?: string
}

export function CulturalInsight({ insights, className = "" }: CulturalInsightProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const currentInsight = insights[currentIndex]

  const nextInsight = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % insights.length)
  }

  const prevInsight = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + insights.length) % insights.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  return (
    <div className={`overflow-hidden rounded-xl border border-amber-100 bg-white shadow-sm ${className}`}>
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-serif text-lg text-amber-950">Cultural Insight of the Day</h2>
          <div className="flex items-center gap-1 text-xs text-amber-700">
            <Calendar className="h-3 w-3" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <div className="relative h-[300px]">
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={currentInsight.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-0"
            >
              <div className="relative h-32 w-full overflow-hidden rounded-lg">
                <Image
                  src={currentInsight.imageUrl || "/placeholder.svg"}
                  alt={currentInsight.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 flex items-center gap-2">
                  <span className="rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-amber-900">
                    {currentInsight.language}
                  </span>
                  <span className="rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-amber-900">
                    {currentInsight.region}
                  </span>
                </div>
                <div className="absolute bottom-2 right-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${getCategoryStyle(currentInsight.category)}`}
                  >
                    {getCategoryLabel(currentInsight.category)}
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <h3 className="text-lg font-medium text-amber-950">{currentInsight.title}</h3>
                <p className="mt-2 text-sm text-amber-700">{currentInsight.content}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={prevInsight}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-700 transition-colors hover:bg-amber-200"
            aria-label="Previous insight"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex gap-1">
            {insights.map((_, index) => (
              <span
                key={index}
                className={`block h-2 w-2 rounded-full ${index === currentIndex ? "bg-amber-500" : "bg-amber-200"}`}
              />
            ))}
          </div>

          <button
            onClick={nextInsight}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-700 transition-colors hover:bg-amber-200"
            aria-label="Next insight"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function getCategoryLabel(category: string): string {
  switch (category) {
    case "tradition":
      return "Tradition"
    case "proverb":
      return "Proverb"
    case "history":
      return "History"
    case "art":
      return "Art & Culture"
    default:
      return "Insight"
  }
}

function getCategoryStyle(category: string): string {
  switch (category) {
    case "tradition":
      return "bg-blue-100 text-blue-700"
    case "proverb":
      return "bg-amber-100 text-amber-700"
    case "history":
      return "bg-purple-100 text-purple-700"
    case "art":
      return "bg-green-100 text-green-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}

