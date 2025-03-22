import Image from "next/image"
import { cn } from "@/lib/utils"

interface MascotProps {
  emotion?: "happy" | "excited" | "thinking" | "celebrating" | "neutral"
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  withSpeechBubble?: boolean
  speechText?: string
}

export function Mascot({
  emotion = "neutral",
  size = "md",
  className,
  withSpeechBubble = false,
  speechText,
}: MascotProps) {
  // Map size to dimensions
  const sizeMap = {
    sm: { width: 60, height: 60 },
    md: { width: 100, height: 100 },
    lg: { width: 150, height: 150 },
    xl: { width: 200, height: 200 },
  }

  // Map emotion to image path
  const emotionMap = {
    happy: "/images/mascot/mascot-happy.svg",
    excited: "/images/mascot/mascot-excited.svg",
    thinking: "/images/mascot/mascot-thinking.svg",
    celebrating: "/images/mascot/mascot-celebrating.svg",
    neutral: "/images/mascot/mascot-neutral.svg",
  }

  const { width, height } = sizeMap[size]
  const imagePath = emotionMap[emotion]

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      {withSpeechBubble && speechText && (
        <div className="mb-2 rounded-2xl bg-white p-3 text-center text-sm font-medium shadow-md">
          {speechText}
          <div className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 transform bg-white"></div>
        </div>
      )}
      <div className={cn("animate-float", size === "sm" ? "animate-none" : "")}>
        <Image
          src={imagePath || "/placeholder.svg"}
          alt="Asili Mascot"
          width={width}
          height={height}
          className="drop-shadow-md"
        />
      </div>
    </div>
  )
}

