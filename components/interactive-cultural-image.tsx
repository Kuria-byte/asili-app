"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface CulturalHotspot {
  x: number
  y: number
  title: string
  description: string
}

interface InteractiveCulturalImageProps {
  imageUrl: string
  altText: string
  hotspots: CulturalHotspot[]
  className?: string
}

export function InteractiveCulturalImage({
  imageUrl,
  altText,
  hotspots,
  className = "",
}: InteractiveCulturalImageProps) {
  const [activeHotspot, setActiveHotspot] = useState<CulturalHotspot | null>(null)

  return (
    <div className={`relative aspect-video w-full overflow-hidden rounded-xl ${className}`}>
      <Image src={imageUrl || "/placeholder.svg"} alt={altText} fill className="object-cover" />

      {hotspots.map((hotspot, index) => (
        <motion.button
          key={index}
          className="absolute z-10 h-8 w-8 rounded-full bg-amber-500 shadow-lg"
          style={{
            left: `${hotspot.x}%`,
            top: `${hotspot.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setActiveHotspot(hotspot)}
          aria-label={`Learn about ${hotspot.title}`}
        >
          <span className="flex h-full w-full items-center justify-center text-white">{index + 1}</span>
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-amber-500"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
        </motion.button>
      ))}

      <AnimatePresence>
        {activeHotspot && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 right-4 rounded-lg bg-black/80 p-4 text-white backdrop-blur-sm"
          >
            <button
              onClick={() => setActiveHotspot(null)}
              className="absolute right-2 top-2 rounded-full p-1 text-white/80 hover:bg-white/20 hover:text-white"
              aria-label="Close information"
            >
              <X size={16} />
            </button>
            <h3 className="mb-1 text-lg font-bold">{activeHotspot.title}</h3>
            <p className="text-sm text-white/90">{activeHotspot.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

