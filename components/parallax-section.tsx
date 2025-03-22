"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

interface ParallaxSectionProps {
  imageUrl: string
  title: string
  subtitle?: string
  height?: number
  className?: string
}

export function ParallaxSection({ imageUrl, title, subtitle, height = 400, className = "" }: ParallaxSectionProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  return (
    <motion.div ref={ref} className={`relative overflow-hidden ${className}`} style={{ height }}>
      <motion.div className="absolute inset-0 z-0" style={{ y, scale }}>
        <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white"
        style={{ opacity }}
      >
        <h2 className="font-serif text-3xl font-bold md:text-4xl">{title}</h2>
        {subtitle && <p className="mt-2 max-w-2xl text-lg text-white/90">{subtitle}</p>}
      </motion.div>
    </motion.div>
  )
}

