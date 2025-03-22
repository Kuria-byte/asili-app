"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/theme-toggle"

export function MainNav({ className }: { className?: string }) {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/courses",
      label: "Courses",
    },
    {
      href: "/learn",
      label: "Learn",
    },
  ]

  return (
    <div className={cn("flex h-14 items-center border-b bg-background", className)}>
      <div className="container flex items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="hidden font-bold sm:inline-block">Asili</span>
        </Link>
        <div className="flex w-full justify-end sm:w-auto">
          <nav className="flex items-center space-x-6 sm:space-x-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground/80",
                  pathname === route.href ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
          <ModeToggle className="ml-2" />
        </div>
      </div>
    </div>
  )
}

