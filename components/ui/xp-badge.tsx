import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface XpBadgeProps {
  amount: number
  size?: "sm" | "md" | "lg"
  className?: string
}

export function XpBadge({ amount, size = "md", className }: XpBadgeProps) {
  // Size mappings
  const sizeMap = {
    sm: {
      iconSize: 14,
      textSize: "text-xs",
      padding: "px-2 py-0.5",
    },
    md: {
      iconSize: 16,
      textSize: "text-sm",
      padding: "px-2.5 py-1",
    },
    lg: {
      iconSize: 18,
      textSize: "text-base",
      padding: "px-3 py-1.5",
    },
  }

  const { iconSize, textSize, padding } = sizeMap[size]

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full bg-purple-500/10 font-bold text-purple-600",
        padding,
        className,
      )}
    >
      <Star size={iconSize} className="fill-purple-500 text-purple-500" />
      <span className={textSize}>{amount} XP</span>
    </div>
  )
}

