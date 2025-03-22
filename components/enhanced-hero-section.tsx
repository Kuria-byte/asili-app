"use client"

import { type ReactNode, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/theme-toggle"
import { Heading } from "@/components/ui/typography"

interface EnhancedHeroSectionProps {
  imageUrl: string
  title: ReactNode
  subtitle?: ReactNode
  height?: number
  className?: string
  headerContent?: ReactNode
  headerClassName?: string
}

export function EnhancedHeroSection({
  imageUrl,
  title,
  subtitle,
  height = 600,
  className = "",
  headerContent,
  headerClassName = "",
}: EnhancedHeroSectionProps) {
  const [scrollY, setScrollY] = useState(0)
  const { scrollYProgress } = useScroll()
  const [isMounted, setIsMounted] = useState(false)

  // Set up parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, 50])

  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isScrolled = scrollY > 50

  return (
    <>
      {/* Fixed Header - Always visible */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-amber-950/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-4",
          headerClassName,
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {headerContent || (
            <>
              <Heading level={1} className="text-xl text-white">
                Asili
              </Heading>
              <ModeToggle />
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative w-full" style={{ height: `${height}px` }}>
        {/* Hero Background Image with Parallax */}
        <motion.div className="absolute inset-0 w-full z-0 overflow-hidden" style={{ y, scale }}>
          <Image src={imageUrl || "/placeholder.svg"} alt="Hero background" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          className={cn(
            "relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4",
            className,
          )}
          style={{ opacity }}
        >
          <motion.div
            style={{ y: titleY }}
            className="max-w-3xl pt-16" // Add padding top to account for header
          >
            {typeof title === "string" ? (
              <h2 className="font-serif text-4xl font-bold md:text-5xl mb-4 text-white">{title}</h2>
            ) : (
              title
            )}

            {subtitle &&
              (typeof subtitle === "string" ? (
                <p className="mt-2 max-w-2xl text-lg text-white/90 mx-auto">{subtitle}</p>
              ) : (
                subtitle
              ))}
          </motion.div>
        </motion.div>

        {/* Visual anchor connecting hero to content */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cream to-transparent z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />
      </div>
    </>
  )
}

