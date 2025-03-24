"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface WelcomeScreenProps {
  onGetStarted: () => void
  onLogin: () => void
}

export function WelcomeScreen({ onGetStarted, onLogin }: WelcomeScreenProps) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-white dark:bg-card shadow-lg">
      <div className="relative h-64 w-full">
        <Image
          src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1000"
          alt="Kenyan landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

        {/* Animated clouds */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-10 bg-white/30 rounded-full blur-md"
          animate={{
            x: [0, 30, 0],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute top-20 right-20 w-16 h-8 bg-white/20 rounded-full blur-md"
          animate={{
            x: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h1 className="text-3xl font-serif font-bold text-amber-950 dark:text-amber-100 mb-2">
            Discover Kenya's Rich Linguistic Heritage
          </h1>

          <p className="text-amber-700 dark:text-amber-300 mb-6">
            Preserve and learn authentic vernacular languages through immersive, culturally-rich experiences.
          </p>

          <div className="space-y-3">
            <Button className="w-full" onClick={onGetStarted}>
              Get Started
            </Button>

            <Button variant="outline" className="w-full" onClick={onLogin}>
              Already have an account? Log in
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

