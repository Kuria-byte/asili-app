"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, Clock, ChevronRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface LearningActivity {
  id: string
  type: "lesson" | "practice" | "challenge" | "cultural"
  title: string
  description: string
  duration: number
  xpReward: number
  imageUrl: string
  href: string
  completed: boolean
}

interface TodaysLearningProps {
  activities: LearningActivity[]
  className?: string
}

export function TodaysLearning({ activities, className = "" }: TodaysLearningProps) {
  const [activeFilter, setActiveFilter] = useState<string>("lesson")

  const filteredActivities =
    activeFilter === "all" ? activities : activities.filter((activity) => activity.type === activeFilter)

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-lg text-amber-950">Today's Learning</h2>
        <div className="text-xs text-amber-700">
          <span className="font-medium">{new Date().toLocaleDateString("en-US", { weekday: "long" })}</span>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        <button
          onClick={() => setActiveFilter("lesson")}
          className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            activeFilter === "lesson" ? "bg-amber-500 text-white" : "bg-white text-amber-900 border border-amber-200"
          }`}
        >
          Lessons
        </button>
        <button
          onClick={() => setActiveFilter("practice")}
          className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            activeFilter === "practice" ? "bg-amber-500 text-white" : "bg-white text-amber-900 border border-amber-200"
          }`}
        >
          Practice
        </button>
        <button
          onClick={() => setActiveFilter("challenge")}
          className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            activeFilter === "challenge" ? "bg-amber-500 text-white" : "bg-white text-amber-900 border border-amber-200"
          }`}
        >
          Challenges
        </button>
        <button
          onClick={() => setActiveFilter("cultural")}
          className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            activeFilter === "cultural" ? "bg-amber-500 text-white" : "bg-white text-amber-900 border border-amber-200"
          }`}
        >
          Cultural
        </button>
        <button
          onClick={() => setActiveFilter("all")}
          className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            activeFilter === "all" ? "bg-amber-500 text-white" : "bg-white text-amber-900 border border-amber-200"
          }`}
        >
          All Activities
        </button>
      </div>

      <div className="space-y-3">
        {filteredActivities.map((activity) => (
          <Link key={activity.id} href={activity.href}>
            <motion.div
              className={`overflow-hidden rounded-xl border ${
                activity.completed ? "border-green-200 bg-green-50" : "border-amber-100 bg-white"
              } shadow-sm transition-all hover:shadow-md`}
              whileHover={{ y: -4 }}
            >
              <div className="flex">
                <div className="relative h-24 w-24 flex-shrink-0">
                  <Image
                    src={activity.imageUrl || "/placeholder.svg"}
                    alt={activity.title}
                    fill
                    className="object-cover"
                  />
                  <div className={`absolute inset-0 ${getActivityGradient(activity.type)}`} />
                  <div className="absolute bottom-1 left-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] text-white">
                    {getActivityLabel(activity.type)}
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-amber-950">{activity.title}</h3>
                      {activity.completed ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Sparkles className="h-4 w-4 text-amber-500" />
                      )}
                    </div>
                    <p className="text-xs text-amber-700 line-clamp-2">{activity.description}</p>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-xs text-amber-700">
                        <Clock className="h-3 w-3" />
                        <span>{activity.duration} min</span>
                      </div>
                      <div className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                        +{activity.xpReward} XP
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-amber-500" />
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function getActivityLabel(type: string): string {
  switch (type) {
    case "lesson":
      return "Lesson"
    case "practice":
      return "Practice"
    case "challenge":
      return "Challenge"
    case "cultural":
      return "Cultural"
    default:
      return "Activity"
  }
}

function getActivityGradient(type: string): string {
  switch (type) {
    case "lesson":
      return "bg-gradient-to-tr from-amber-500/30 to-transparent"
    case "practice":
      return "bg-gradient-to-tr from-blue-500/30 to-transparent"
    case "challenge":
      return "bg-gradient-to-tr from-purple-500/30 to-transparent"
    case "cultural":
      return "bg-gradient-to-tr from-green-500/30 to-transparent"
    default:
      return "bg-gradient-to-tr from-gray-500/30 to-transparent"
  }
}

