import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeartsProps {
  current: number
  max: number
  size?: "sm" | "md" | "lg"
  className?: string
}

export function Hearts({ current, max, size = "md", className }: HeartsProps) {
  // Size mappings
  const sizeMap = {
    sm: {
      iconSize: 16,
      gap: "gap-0.5",
    },
    md: {
      iconSize: 20,
      gap: "gap-1",
    },
    lg: {
      iconSize: 24,
      gap: "gap-1.5",
    },
  }

  const { iconSize, gap } = sizeMap[size]

  return (
    <div className={cn("flex items-center", gap, className)}>
      {Array.from({ length: max }).map((_, index) => (
        <Heart
          key={index}
          size={iconSize}
          className={cn(
            "transition-all duration-300",
            index < current ? "fill-destructive text-destructive" : "fill-none text-neutral-300",
          )}
        />
      ))}
    </div>
  )
}

