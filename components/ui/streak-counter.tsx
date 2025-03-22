import { Flame } from "lucide-react"
import { cn } from "@/lib/utils"

interface StreakCounterProps {
  count: number
  size?: "sm" | "md" | "lg"
  className?: string
}

export function StreakCounter({ count, size = "md", className }: StreakCounterProps) {
  // Size mappings
  const sizeMap = {
    sm: {
      iconSize: 16,
      textSize: "text-xs",
      padding: "px-2 py-1",
    },
    md: {
      iconSize: 20,
      textSize: "text-sm",
      padding: "px-3 py-1.5",
    },
    lg: {
      iconSize: 24,
      textSize: "text-base",
      padding: "px-4 py-2",
    },
  }

  const { iconSize, textSize, padding } = sizeMap[size]

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full bg-secondary-500/10 font-bold text-secondary-600",
        padding,
        className,
      )}
    >
      <Flame size={iconSize} className="text-secondary-500" />
      <span className={textSize}>{count}</span>
    </div>
  )
}

