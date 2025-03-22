"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { cn } from "@/lib/utils"

interface PulsingProgressBarProps {
  value: number
  max: number
  pulseThreshold?: number
  className?: string
  barClassName?: string
  progressClassName?: string
  height?: number
  showLabel?: boolean
  labelPosition?: "top" | "right"
}

export function PulsingProgressBar({
  value,
  max,
  pulseThreshold = 90,
  className,
  barClassName,
  progressClassName,
  height = 8,
  showLabel = false,
  labelPosition = "right",
}: PulsingProgressBarProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100))
  const isPulseActive = percent >= pulseThreshold && percent < 100
  const isComplete = percent >= 100

  const controls = useAnimation()

  useEffect(() => {
    if (isPulseActive) {
      controls.start({
        scale: [1, 1.03, 1],
        opacity: [1, 0.8, 1],
        transition: {
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        },
      })
    } else {
      controls.stop()
      controls.set({ scale: 1, opacity: 1 })
    }
  }, [isPulseActive, controls])

  return (
    <div className={cn("w-full", className)}>
      {showLabel && labelPosition === "top" && (
        <div className="mb-1 flex justify-between text-xs">
          <span className="text-amber-700 dark:text-amber-300">Progress</span>
          <span className="font-medium text-amber-900 dark:text-amber-200">{Math.round(percent)}%</span>
        </div>
      )}

      <div className="relative">
        <div
          className={cn("w-full overflow-hidden rounded-full bg-amber-100 dark:bg-amber-900/50", barClassName)}
          style={{ height }}
        >
          <motion.div
            className={cn(
              "h-full rounded-full",
              isComplete ? "bg-green-500 dark:bg-green-400" : "bg-amber-500 dark:bg-amber-400",
              progressClassName,
            )}
            style={{ width: `${percent}%` }}
            initial={{ width: 0 }}
            animate={isPulseActive ? controls : { width: `${percent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {showLabel && labelPosition === "right" && (
          <span className="ml-2 text-xs font-medium text-amber-900 dark:text-amber-200">{Math.round(percent)}%</span>
        )}
      </div>
    </div>
  )
}

