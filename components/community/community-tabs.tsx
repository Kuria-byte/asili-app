"use client"

import { Users, CircleUser, Calendar, Award, BookHeart } from "lucide-react"
import { cn } from "@/lib/utils"

type TabType = "partners" | "circles" | "events" | "keepers" | "contributions"

interface CommunityTabsProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export function CommunityTabs({ activeTab, onTabChange }: CommunityTabsProps) {
  const tabs = [
    { id: "partners" as TabType, label: "Language Partners", icon: Users },
    { id: "circles" as TabType, label: "Learning Circles", icon: CircleUser },
    { id: "events" as TabType, label: "Events", icon: Calendar },
    { id: "keepers" as TabType, label: "Heritage Keepers", icon: Award },
    { id: "contributions" as TabType, label: "Contributions", icon: BookHeart },
  ]

  return (
    <div className="border-b border-amber-100 dark:border-amber-900/30">
      <div className="flex overflow-x-auto hide-scrollbar gap-1 md:gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex items-center whitespace-nowrap px-3 md:px-4 py-2 text-sm md:text-base font-medium rounded-t-lg transition-colors",
              activeTab === tab.id
                ? "bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-100"
                : "text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/10",
            )}
            aria-selected={activeTab === tab.id}
          >
            <tab.icon className="h-4 w-4 mr-1.5 md:mr-2" />
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

