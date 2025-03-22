"use client"

import { motion } from "framer-motion"
import { Flame } from "lucide-react"
import { cn } from "@/lib/utils"

interface StreakIconProps {
  size?: "sm" | "md" | "lg"
  className?: string
  animated?: boolean
}

export function StreakIcon({ size = "md", className = "", animated = false }: StreakIconProps) {
  const sizeMap = {
    sm: { iconSize: 14, containerSize: "h-6 w-6" },
    md: { iconSize: 16, containerSize: "h-8 w-8" },
    lg: { iconSize: 20, containerSize: "h-10 w-10" },
  }

  const { iconSize, containerSize } = sizeMap[size]

  const container = (
    <div className={cn("flex items-center justify-center rounded-full bg-amber-100", containerSize, className)}>
      <Flame size={iconSize} className="text-amber-700" />
    </div>
  )

  if (animated) {
    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: [1, 1.05, 1],
          transition: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            duration: 1.5,
          },
        }}
      >
        {container}
      </motion.div>
    )
  }

  return container
}

