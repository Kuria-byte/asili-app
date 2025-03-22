"use client"

import Link from "next/link"
import Image from "next/image"
import { Settings, Award, BarChart2, Calendar, LogOut } from "lucide-react"
import { useState } from "react"
import { ModeToggle } from "@/components/theme-toggle"
import { BottomNav } from "@/components/navigation/bottom-nav"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"stats" | "achievements">("stats")

  // Mock user data
  const user = {
    name: "Jambo Learner",
    email: "learner@example.com",
    joinDate: "January 2023",
    avatar: "/placeholder.svg?height=100&width=100",
    streak: 12,
    totalXp: 1450,
    level: 8,
    wordsLearned: 240,
    minutesSpent: 720,
    languages: [
      { id: "kikuyu", name: "Kikuyu", progress: 40, level: "Beginner" },
      { id: "swahili", name: "Swahili", progress: 25, level: "Beginner" },
    ],
    achievements: [
      { id: "1", name: "First Steps", description: "Complete your first lesson", date: "Jan 15, 2023", icon: "🏆" },
      { id: "2", name: "Week Warrior", description: "Maintain a 7-day streak", date: "Jan 22, 2023", icon: "🔥" },
      { id: "3", name: "Vocabulary Builder", description: "Learn 100 words", date: "Feb 10, 2023", icon: "📚" },
      { id: "4", name: "Dedicated Learner", description: "Study for 10 hours total", date: "Mar 5, 2023", icon: "⏱️" },
    ],
  }

  return (
    <div className="flex min-h-screen flex-col bg-cream pb-20">
      <header className="sticky top-0 z-10 border-b border-amber-100 bg-cream/95 backdrop-blur-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="font-serif text-xl text-amber-950">Profile</h1>
          <ModeToggle />
        </div>
      </header>

      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          {/* User Profile Header */}
          <div className="mb-8 flex flex-col items-center sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col items-center sm:flex-row sm:items-center sm:gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-amber-200 mb-3 sm:mb-0">
                <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-bold text-amber-950">{user.name}</h2>
                <p className="text-sm text-amber-700">{user.email}</p>
                <p className="text-xs text-amber-600">Member since {user.joinDate}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 sm:mt-0">
              <Link
                href="/settings"
                className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-amber-700 border border-amber-200 transition-colors hover:bg-amber-50 group"
              >
                <Settings className="h-4 w-4 transition-transform duration-200 group-hover:rotate-45" />
                <span>Settings</span>
              </Link>
              <button
                className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-red-600 border border-red-100 transition-colors hover:bg-red-50 group"
                aria-label="Logout"
              >
                <LogOut className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-amber-100 bg-white p-4 text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                <BarChart2 className="h-5 w-5 text-amber-700" />
              </div>
              <p className="text-2xl font-bold text-amber-950">{user.totalXp}</p>
              <p className="text-xs text-amber-700">Total XP</p>
            </div>
            <div className="rounded-xl border border-amber-100 bg-white p-4 text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                <Calendar className="h-5 w-5 text-amber-700" />
              </div>
              <p className="text-2xl font-bold text-amber-950">{user.streak}</p>
              <p className="text-xs text-amber-700">Day Streak</p>
            </div>
            <div className="rounded-xl border border-amber-100 bg-white p-4 text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-700"
                >
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                </svg>
              </div>
              <p className="text-2xl font-bold text-amber-950">{user.wordsLearned}</p>
              <p className="text-xs text-amber-700">Words Learned</p>
            </div>
            <div className="rounded-xl border border-amber-100 bg-white p-4 text-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                <Award className="h-5 w-5 text-amber-700" />
              </div>
              <p className="text-2xl font-bold text-amber-950">{user.level}</p>
              <p className="text-xs text-amber-700">Current Level</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="flex border-b border-amber-100">
              <button
                className={`flex-1 py-2 text-center text-sm font-medium ${activeTab === "stats" ? "border-b-2 border-amber-500 text-amber-900" : "text-amber-600"}`}
                onClick={() => setActiveTab("stats")}
                aria-label="View my languages"
              >
                My Languages
              </button>
              <button
                className={`flex-1 py-2 text-center text-sm font-medium ${activeTab === "achievements" ? "border-b-2 border-amber-500 text-amber-900" : "text-amber-600"}`}
                onClick={() => setActiveTab("achievements")}
                aria-label="View my achievements"
              >
                Achievements
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "stats" ? (
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-amber-950">Your Languages</h3>
              {user.languages.map((language) => (
                <Link key={language.id} href={`/languages/${language.id}`}>
                  <div className="overflow-hidden rounded-xl border border-amber-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-amber-950">{language.name}</h4>
                        <p className="text-xs text-amber-700">{language.level}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-amber-900">{language.progress}%</p>
                        <p className="text-xs text-amber-700">completed</p>
                      </div>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-amber-100">
                      <div
                        className="h-full rounded-full bg-amber-500"
                        style={{ width: `${language.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </Link>
              ))}

              <div className="mt-6 text-center">
                <Link
                  href="/languages"
                  className="inline-block rounded-full bg-amber-700 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-800"
                >
                  Explore More Languages
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-amber-950">Your Achievements</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {user.achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="overflow-hidden rounded-xl border border-amber-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-xl">
                        {achievement.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-amber-950">{achievement.name}</h4>
                        <p className="text-xs text-amber-700">{achievement.description}</p>
                        <p className="mt-1 text-xs text-amber-600">Earned on {achievement.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl bg-amber-50 p-6 text-center border border-amber-100">
                <h4 className="mb-2 font-serif text-lg text-amber-950">Keep Learning!</h4>
                <p className="mb-4 text-sm text-amber-700">Complete more lessons to unlock additional achievements</p>
                <Link
                  href="/lessons"
                  className="inline-block rounded-full bg-amber-700 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-800"
                >
                  Continue Learning
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activePath="profile" />
    </div>
  )
}

