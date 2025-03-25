"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Globe, BookOpen, User, Users } from "lucide-react"

interface BottomNavProps {
  activePath?: "home" | "languages" | "lessons" | "profile" | "community"
}

export function BottomNav({ activePath }: BottomNavProps) {
  // Use the pathname to determine the active route if activePath is not provided
  const pathname = usePathname()

  // Determine active path based on pathname if not explicitly provided
  const currentPath =
    activePath ||
    (pathname === "/"
      ? "home"
      : pathname.startsWith("/languages")
        ? "languages"
        : pathname.startsWith("/lessons")
          ? "lessons"
          : pathname.startsWith("/profile")
            ? "profile"
            : pathname.startsWith("/community")
              ? "community"
              : "home")

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-amber-100 dark:border-amber-900/30 bg-white dark:bg-card py-2 z-40">
      <div className="container mx-auto">
        <div className="flex items-center justify-around">
          {/* Home */}
          <Link
            href="/"
            className={`flex flex-col items-center group ${currentPath === "home" ? "pointer-events-none" : ""}`}
            aria-current={currentPath === "home" ? "page" : undefined}
          >
            <Home
              className={`h-6 w-6 transition-transform duration-200 group-hover:scale-110 ${
                currentPath === "home" ? "text-amber-500 dark:text-amber-400" : "text-amber-700 dark:text-amber-600"
              }`}
            />
            <span
              className={`mt-1 text-xs ${
                currentPath === "home"
                  ? "text-amber-500 dark:text-amber-400 font-medium"
                  : "text-amber-700 dark:text-amber-600"
              }`}
            >
              Home
            </span>
          </Link>

          {/* Languages */}
          <Link
            href="/languages"
            className={`flex flex-col items-center group ${currentPath === "languages" ? "pointer-events-none" : ""}`}
            aria-current={currentPath === "languages" ? "page" : undefined}
          >
            <Globe
              className={`h-6 w-6 transition-transform duration-200 group-hover:scale-110 ${
                currentPath === "languages"
                  ? "text-amber-500 dark:text-amber-400"
                  : "text-amber-700 dark:text-amber-600"
              }`}
            />
            <span
              className={`mt-1 text-xs ${
                currentPath === "languages"
                  ? "text-amber-500 dark:text-amber-400 font-medium"
                  : "text-amber-700 dark:text-amber-600"
              }`}
            >
              Languages
            </span>
          </Link>

          {/* Lessons */}
          <Link
            href="/lessons"
            className={`flex flex-col items-center group ${currentPath === "lessons" ? "pointer-events-none" : ""}`}
            aria-current={currentPath === "lessons" ? "page" : undefined}
          >
            <BookOpen
              className={`h-6 w-6 transition-transform duration-200 group-hover:scale-110 ${
                currentPath === "lessons" ? "text-amber-500 dark:text-amber-400" : "text-amber-700 dark:text-amber-600"
              }`}
            />
            <span
              className={`mt-1 text-xs ${
                currentPath === "lessons"
                  ? "text-amber-500 dark:text-amber-400 font-medium"
                  : "text-amber-700 dark:text-amber-600"
              }`}
            >
              Lessons
            </span>
          </Link>

          {/* Community - New */}
          {/* <Link
            href="/community"
            className={`flex flex-col items-center group ${currentPath === "community" ? "pointer-events-none" : ""}`}
            aria-current={currentPath === "community" ? "page" : undefined}
          >
            <Users
              className={`h-6 w-6 transition-transform duration-200 group-hover:scale-110 ${
                currentPath === "community"
                  ? "text-amber-500 dark:text-amber-400"
                  : "text-amber-700 dark:text-amber-600"
              }`}
            />
            <span
              className={`mt-1 text-xs ${
                currentPath === "community"
                  ? "text-amber-500 dark:text-amber-400 font-medium"
                  : "text-amber-700 dark:text-amber-600"
              }`}
            >
              Community
            </span>
          </Link> */}

          {/* Profile */}
          <Link
            href="/profile"
            className={`flex flex-col items-center group ${currentPath === "profile" ? "pointer-events-none" : ""}`}
            aria-current={currentPath === "profile" ? "page" : undefined}
          >
            <User
              className={`h-6 w-6 transition-transform duration-200 group-hover:scale-110 ${
                currentPath === "profile" ? "text-amber-500 dark:text-amber-400" : "text-amber-700 dark:text-amber-600"
              }`}
            />
            <span
              className={`mt-1 text-xs ${
                currentPath === "profile"
                  ? "text-amber-500 dark:text-amber-400 font-medium"
                  : "text-amber-700 dark:text-amber-600"
              }`}
            >
              Profile
            </span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

