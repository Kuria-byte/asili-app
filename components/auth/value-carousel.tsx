"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ValueCarouselProps {
  onComplete: () => void
}

export function ValueCarousel({ onComplete }: ValueCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Learn 42+ Kenyan Languages",
      description: "From Kikuyu to Swahili, discover the linguistic diversity of Kenya.",
      image: "https://images.unsplash.com/photo-1589825743127-e9b6d0b10525?q=80&w=1000",
    },
    {
      title: "Connect with Cultural Heritage",
      description: "Language is the gateway to understanding traditions, values, and history.",
      image: "https://images.unsplash.com/photo-1604934380103-e397c912e65d?q=80&w=1000",
    },
    {
      title: "Join a Community of Language Preservers",
      description: "Be part of a movement to document and revitalize indigenous languages.",
      image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1000",
    },
    {
      title: "Curriculum-Aligned Learning",
      description: "Structured lessons that align with educational standards and cultural authenticity.",
      image: "https://images.unsplash.com/photo-1596005554384-d293674c91d7?q=80&w=1000",
    },
  ]

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      onComplete()
    } else {
      setCurrentSlide((prev) => prev + 1)
    }
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-white dark:bg-card shadow-lg">
      <div className="relative h-64 w-full">
        <AnimatePresence initial={false} custom={1}>
          <motion.div
            key={currentSlide}
            custom={1}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)

              if (swipe < -swipeConfidenceThreshold) {
                nextSlide()
              } else if (swipe > swipeConfidenceThreshold) {
                prevSlide()
              }
            }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentSlide].image || "/placeholder.svg"}
              alt={slides[currentSlide].title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </motion.div>
        </AnimatePresence>

        <button
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/50"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/50"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-2xl font-serif font-bold text-amber-950 dark:text-amber-100 mb-2">
              {slides[currentSlide].title}
            </h2>

            <p className="text-amber-700 dark:text-amber-300 mb-6">{slides[currentSlide].description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Progress indicators */}
        <div className="flex justify-center space-x-2 mb-6">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentSlide ? "bg-amber-500 w-4" : "bg-amber-200 dark:bg-amber-800"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <Button className="w-full" onClick={nextSlide}>
          {currentSlide === slides.length - 1 ? "Continue" : "Next"}
        </Button>
      </div>
    </div>
  )
}

