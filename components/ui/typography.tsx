import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface HeadingProps {
  children: ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
  serif?: boolean
}

export function Heading({ children, level = 2, className = "", serif = true }: HeadingProps) {
  const baseStyles = cn(serif ? "font-serif" : "font-sans", "font-bold tracking-tight text-amber-950")

  const sizeStyles = {
    1: "text-3xl md:text-4xl",
    2: "text-2xl md:text-3xl",
    3: "text-xl md:text-2xl",
    4: "text-lg md:text-xl",
    5: "text-base md:text-lg",
    6: "text-sm md:text-base",
  }

  const Component = `h${level}` as keyof JSX.IntrinsicElements

  return <Component className={cn(baseStyles, sizeStyles[level], className)}>{children}</Component>
}

interface TextProps {
  children: ReactNode
  size?: "xs" | "sm" | "base" | "lg" | "xl"
  className?: string
  muted?: boolean
}

export function Text({ children, size = "base", className = "", muted = false }: TextProps) {
  const baseStyles = cn("font-sans", muted ? "text-amber-700" : "text-amber-900")

  const sizeStyles = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  }

  return <p className={cn(baseStyles, sizeStyles[size], className)}>{children}</p>
}

interface SectionTitleProps {
  children: ReactNode
  className?: string
  action?: ReactNode
}

export function SectionTitle({ children, className = "", action }: SectionTitleProps) {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)}>
      <h2 className="font-serif text-lg text-amber-950">{children}</h2>
      {action && <div>{action}</div>}
    </div>
  )
}

export function SectionDivider({ className = "" }: { className?: string }) {
  return <div className={cn("my-6 border-t border-amber-100", className)} />
}

