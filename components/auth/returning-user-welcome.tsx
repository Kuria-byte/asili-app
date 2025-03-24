"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ReturningUserWelcomeProps {
  onContinue: () => void
}

export function ReturningUserWelcome({ onContinue }: ReturningUserWelcomeProps) {
  // Mock data for a returning user
  const user = {
    name: "Jambo Learner",
    streak: 5,
    lastLesson: "Greetings in Kikuyu",
    newContent: [
      {
        title: "New Cultural Insights",
        description: "Explore new content about Kikuyu wedding traditions",
        image: "https://images.unsplash.com/photo-1583994538127-a22b55a79a89?q=80&w=1000",
      },
      {
        title: "New Vocabulary Pack",
        description: "Learn 20 new words about family relationships",
        image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1000",
      },
    ],
  }

  return (
    <div className="rounded-xl bg-white dark:bg-card shadow-lg overflow-hidden">
      <div className="relative h-40 w-full">
        <Image
          src="https://images.unsplash.com/photo-1589825743127-e9b6d0b10525?q=80&w=1000"
          alt="Welcome back"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <h2 className="text-2xl font-serif font-bold text-white">Welcome back, {user.name}!</h2>
          <p className="text-white/80">You're on a {user.streak}-day streak. Keep it up!</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-medium text-amber-950 dark:text-amber-100 mb-3">Continue where you left off</h3>
          <div className="rounded-lg border border-amber-100 dark:border-amber-900/30 p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-amber-900 dark:text-amber-100">{user.lastLesson}</p>
              <p className="text-sm text-amber-700 dark:text-amber-300">Resume your learning journey</p>
            </div>
            <Button>Continue</Button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-amber-950 dark:text-amber-100 mb-3">New content for you</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {user.newContent.map((content, index) => (
              <motion.div
                key={index}
                className="rounded-lg border border-amber-100 dark:border-amber-900/30 overflow-hidden"
                whileHover={{ y: -5 }}
              >
                <div className="relative h-32 w-full">
                  <Image src={content.image || "/placeholder.svg"} alt={content.title} fill className="object-cover" />
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-amber-900 dark:text-amber-100">{content.title}</h4>
                  <p className="text-xs text-amber-700 dark:text-amber-300">{content.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <Button className="w-full" onClick={onContinue}>
          Continue to Dashboard
        </Button>
      </div>
    </div>
  )
}

