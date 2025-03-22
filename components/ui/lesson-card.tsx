"use client"

import { Check, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

interface LessonCardProps {
  id: string
  title: string
  iconUrl?: string
  status: "locked" | "current" | "completed"
  position?: { top?: string; left?: string; right?: string; bottom?: string }
  xpReward: number
  className?: string
}

export function LessonCard({ id, title, iconUrl, status, position, xpReward, className }: LessonCardProps) {
  const isLocked = status === "locked"
  const isCompleted = status === "completed"
  const isCurrent = status === "current"

  const positionStyles = {
    top: position?.top,
    left: position?.left,
    right: position?.right,
    bottom: position?.bottom,
  }

  return (
    <div style={positionStyles} className={cn("absolute", className)}>
      <Link
        href={isLocked ? "#" : `/lessons/${id}`}
        className={cn(
          "lesson-card group",
          isCompleted && "completed",
          isCurrent && "current",
          isLocked && "locked cursor-not-allowed",
        )}
        onClick={(e) => isLocked && e.preventDefault()}
      >
        {isCompleted ? (
          <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
            <Check size={14} />
          </div>
        ) : isLocked ? (
          <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-300 text-white">
            <Lock size={14} />
          </div>
        ) : null}

        <div className="flex h-12 w-12 items-center justify-center">
          {iconUrl ? (
            <Image
              src={iconUrl || "/placeholder.svg"}
              alt={title}
              width={32}
              height={32}
              className={cn("transition-all duration-200", isLocked && "grayscale opacity-50")}
            />
          ) : (
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-600",
                isLocked && "bg-neutral-200 text-neutral-400",
              )}
            >
              {title.charAt(0)}
            </div>
          )}
        </div>

        <div
          className={cn(
            "absolute -bottom-8 whitespace-nowrap text-center text-xs font-medium",
            isLocked ? "text-neutral-400" : "text-neutral-700",
          )}
        >
          {title}
        </div>

        {!isLocked && (
          <div className="absolute -bottom-16 scale-0 whitespace-nowrap rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-600 transition-all duration-200 group-hover:scale-100">
            +{xpReward} XP
          </div>
        )}
      </Link>
    </div>
  )
}

