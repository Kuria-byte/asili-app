"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface InteractiveButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "outline" | "ghost" | "success"
  size?: "sm" | "md" | "lg"
  className?: string
  disabled?: boolean
  icon?: ReactNode
  iconPosition?: "left" | "right"
  fullWidth?: boolean
  type?: "button" | "submit" | "reset"
  ariaLabel?: string
}

export function InteractiveButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className,
  disabled = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  type = "button",
  ariaLabel,
}: InteractiveButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700"
      case "secondary":
        return "bg-amber-100 text-amber-700 hover:bg-amber-200 active:bg-amber-300"
      case "outline":
        return "bg-white border border-amber-200 text-amber-700 hover:bg-amber-50 active:bg-amber-100"
      case "ghost":
        return "bg-transparent text-amber-700 hover:bg-amber-50 active:bg-amber-100"
      case "success":
        return "bg-green-500 text-white hover:bg-green-600 active:bg-green-700"
      default:
        return "bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700"
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "text-xs px-3 py-1.5 rounded-md"
      case "md":
        return "text-sm px-4 py-2 rounded-lg"
      case "lg":
        return "text-base px-6 py-3 rounded-lg"
      default:
        return "text-sm px-4 py-2 rounded-lg"
    }
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel || typeof children === "string" ? children.toString() : undefined}
      className={cn(
        "font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2",
        getVariantStyles(),
        getSizeStyles(),
        fullWidth ? "w-full" : "",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className,
      )}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <span className="flex items-center justify-center gap-2">
        {icon && iconPosition === "left" && icon}
        {children}
        {icon && iconPosition === "right" && icon}
      </span>
    </motion.button>
  )
}

