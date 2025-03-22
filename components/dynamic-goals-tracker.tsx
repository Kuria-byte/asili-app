"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Star, Trophy } from "lucide-react"
import confetti from "canvas-confetti"

interface Goal {
  id: string
  type: "lessons" | "words" | "minutes"
  target: number
  completed: number
  icon: React.ReactNode
  color: string
}

interface DynamicGoalsTrackerProps {
  initialGoals: Goal[]
  className?: string
}

export function DynamicGoalsTracker({ initialGoals, className = "" }: DynamicGoalsTrackerProps) {
  const [goals, setGoals] = useState(initialGoals)
  const [showReward, setShowReward] = useState<string | null>(null)

  const completeGoal = (id: string) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id === id) {
          const newCompleted = Math.min(goal.completed + 1, goal.target)
          const isNewlyCompleted = goal.completed < goal.target && newCompleted >= goal.target

          if (isNewlyCompleted) {
            setShowReward(id)
            // Trigger confetti
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
            })

            // Hide reward after 3 seconds
            setTimeout(() => setShowReward(null), 3000)
          }

          return { ...goal, completed: newCompleted }
        }
        return goal
      }),
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <h2 className="font-serif text-lg text-amber-950">Daily Goals</h2>

      <div className="space-y-3">
        {goals.map((goal) => {
          const percent = Math.round((goal.completed / goal.target) * 100)
          const isComplete = goal.completed >= goal.target

          return (
            <div key={goal.id} className="relative">
              <AnimatePresence>
                {showReward === goal.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute -right-4 -top-4 z-10 rounded-full bg-amber-500 p-2 text-white shadow-lg"
                  >
                    <Trophy className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div
                className={`rounded-xl border ${isComplete ? "border-green-200 bg-green-50" : "border-amber-100 bg-white"} p-4 transition-all`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${goal.color}`}>
                      {goal.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-amber-950 capitalize">{goal.type}</h3>
                        {isComplete && (
                          <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                            <Check className="h-3 w-3" /> Complete
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-amber-700">
                        {goal.completed} of {goal.target} completed
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => completeGoal(goal.id)}
                    disabled={isComplete}
                    className="rounded-full bg-amber-100 p-2 text-amber-700 transition-all hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label={`Add progress to ${goal.type}`}
                  >
                    <Star className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-neutral-100">
                  <motion.div
                    className={`h-full rounded-full ${isComplete ? "bg-green-500" : "bg-amber-500"}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

