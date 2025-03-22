"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Progress } from "./ui/progress"

interface RoleRequirement {
  completed: boolean
  text: string
}

interface ColorScheme {
  primary: string
  secondary: string
  accent: string
}

interface InteractiveRoleCardProps {
  title: string
  icon: ReactNode
  description: string
  illustrationUrl: string
  requirements: RoleRequirement[]
  ctaText: string
  ctaLink: string
  color?: "amber" | "green" | "blue" | "purple"
  colorScheme?: ColorScheme
  className?: string
}

export function InteractiveRoleCard({
  title,
  icon,
  description,
  illustrationUrl,
  requirements,
  ctaText,
  ctaLink,
  color = "amber",
  colorScheme,
  className = "",
}: InteractiveRoleCardProps) {
  const completedRequirements = requirements.filter((r) => r.completed).length
  const totalRequirements = requirements.length
  const progress = (completedRequirements / totalRequirements) * 100

  const getColorStyles = () => {
    // If custom color scheme is provided, use it
    if (colorScheme) {
      return {
        border: `border-[${colorScheme.secondary}]/30`,
        iconBg: `bg-[${colorScheme.secondary}]`,
        iconText: `text-[${colorScheme.primary}]`,
        progressBg: `bg-[${colorScheme.secondary}]`,
        progressBar: `bg-[${colorScheme.accent}]`,
        ctaBg: `bg-[${colorScheme.primary}]`,
        ctaHover: `hover:bg-[${colorScheme.accent}]`,
        ctaText: "text-white",
      }
    }

    // Otherwise use predefined colors
    switch (color) {
      case "green":
        return {
          border: "border-green-200 dark:border-green-900",
          iconBg: "bg-green-100 dark:bg-green-900/50",
          iconText: "text-green-700 dark:text-green-400",
          progressBg: "bg-green-100 dark:bg-green-900/50",
          progressBar: "bg-green-500 dark:bg-green-400",
          ctaBg: "bg-green-500 dark:bg-green-600",
          ctaHover: "hover:bg-green-600 dark:hover:bg-green-500",
          ctaText: "text-white",
        }
      case "blue":
        return {
          border: "border-blue-200 dark:border-blue-900",
          iconBg: "bg-blue-100 dark:bg-blue-900/50",
          iconText: "text-blue-700 dark:text-blue-400",
          progressBg: "bg-blue-100 dark:bg-blue-900/50",
          progressBar: "bg-blue-500 dark:bg-blue-400",
          ctaBg: "bg-blue-500 dark:bg-blue-600",
          ctaHover: "hover:bg-blue-600 dark:hover:bg-blue-500",
          ctaText: "text-white",
        }
      case "purple":
        return {
          border: "border-purple-200 dark:border-purple-900",
          iconBg: "bg-purple-100 dark:bg-purple-900/50",
          iconText: "text-purple-700 dark:text-purple-400",
          progressBg: "bg-purple-100 dark:bg-purple-900/50",
          progressBar: "bg-purple-500 dark:bg-purple-400",
          ctaBg: "bg-purple-500 dark:bg-purple-600",
          ctaHover: "hover:bg-purple-600 dark:hover:bg-purple-500",
          ctaText: "text-white",
        }
      case "amber":
      default:
        return {
          border: "border-amber-200 dark:border-amber-900",
          iconBg: "bg-amber-100 dark:bg-amber-900/50",
          iconText: "text-amber-700 dark:text-amber-400",
          progressBg: "bg-amber-100 dark:bg-amber-900/50",
          progressBar: "bg-amber-500 dark:bg-amber-400",
          ctaBg: "bg-amber-500 dark:bg-amber-600",
          ctaHover: "hover:bg-amber-600 dark:hover:bg-amber-500",
          ctaText: "text-white",
        }
    }
  }

  const colors = getColorStyles()

  return (
    <motion.div
      className={`overflow-hidden rounded-xl border ${colors.border} bg-white dark:bg-card shadow-sm ${className}`}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${colors.iconBg} ${colors.iconText}`}
          >
            {icon}
          </div>
          <h3 className="font-serif text-lg font-medium text-amber-950 dark:text-foreground uppercase tracking-wide">
            {title}
          </h3>
        </div>

        <div className="relative h-40 w-full mb-4 rounded-lg overflow-hidden">
          <Image src={illustrationUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        <p className="mb-4 text-sm text-amber-700 dark:text-amber-300">{description}</p>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-amber-900 dark:text-amber-200">Requirements</span>
            <span className="text-xs text-amber-700 dark:text-amber-300">
              {completedRequirements}/{totalRequirements} completed
            </span>
          </div>

          <Progress value={progress} className="h-1.5" />

          <div className="mt-3 space-y-2">
            {requirements.map((req, index) => (
              <div key={index} className="flex items-start gap-2">
                <div
                  className={`mt-0.5 h-4 w-4 flex-shrink-0 rounded-full ${req.completed ? "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400" : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"} flex items-center justify-center`}
                >
                  {req.completed ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8.33334 2.5L3.75001 7.08333L1.66667 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : null}
                </div>
                <span
                  className={`text-xs ${req.completed ? "text-amber-900 dark:text-amber-200" : "text-amber-600 dark:text-amber-400"}`}
                >
                  {req.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Link href={ctaLink}>
          <motion.button
            className={`w-full rounded-lg ${colors.ctaBg} ${colors.ctaHover} ${colors.ctaText} py-2 text-sm font-medium transition-colors`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center justify-center gap-1">
              {ctaText}
              <ChevronRight className="h-4 w-4" />
            </span>
          </motion.button>
        </Link>
      </div>
    </motion.div>
  )
}

