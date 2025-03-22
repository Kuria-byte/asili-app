"use client"

import { motion } from "framer-motion"
import { Star, Award, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface XpIconProps {
  type?: "star" | "award" | "zap"
  size?: "sm" | "md" | "lg"
  className?: string
  animated?: boolean
}

export function XpIcon({ type = "star", size = "md", className = "", animated = false }: XpIconProps) {
  const sizeMap = {
    sm: { iconSize: 14, containerSize: "h-6 w-6" },
    md: { iconSize: 16, containerSize: "h-8 w-8" },
    lg: { iconSize: 20, containerSize: "h-10 w-10" },
  }

  const { iconSize, containerSize } = sizeMap[size]

  const getIcon = () => {
    switch (type) {
      case "award":
        return <Award size={iconSize} className="text-amber-700" />
      case "zap":
        return <Zap size={iconSize} className="text-amber-700" />
      case "star":
      default:
        return <Star size={iconSize} className="text-amber-700" />
    }
  }

  const container = (
    <div className={cn("flex items-center justify-center rounded-full bg-amber-100", containerSize, className)}>
      {getIcon()}
    </div>
  )

  if (animated) {
    return (
      <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }}>
        {container}
      </motion.div>
    )
  }

  return container
}

