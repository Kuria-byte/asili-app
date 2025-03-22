import { cn } from "@/lib/utils"

interface ProgressCircleProps {
  value: number
  max: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  className?: string
}

export function ProgressCircle({ value, max, size = "md", showLabel = true, className }: ProgressCircleProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  // Size mappings
  const sizeMap = {
    sm: {
      width: 40,
      strokeWidth: 4,
      fontSize: "text-xs",
    },
    md: {
      width: 60,
      strokeWidth: 5,
      fontSize: "text-sm",
    },
    lg: {
      width: 80,
      strokeWidth: 6,
      fontSize: "text-base",
    },
  }

  const { width, strokeWidth, fontSize } = sizeMap[size]
  const radius = (width - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg width={width} height={width} viewBox={`0 0 ${width} ${width}`}>
        {/* Background circle */}
        <circle cx={width / 2} cy={width / 2} r={radius} fill="none" stroke="#E5E5E5" strokeWidth={strokeWidth} />

        {/* Progress circle */}
        <circle
          cx={width / 2}
          cy={width / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-primary transition-all duration-500 ease-in-out"
          transform={`rotate(-90 ${width / 2} ${width / 2})`}
        />
      </svg>

      {showLabel && (
        <div className={`absolute flex items-center justify-center ${fontSize} font-bold`}>
          {value}/{max}
        </div>
      )}
    </div>
  )
}

