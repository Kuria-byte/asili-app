"use client"

import { useState } from "react"
import { CommunityHeader } from "./community-header"
import { CommunityTabs } from "./community-tabs"
import { CommunityFilters } from "./community-filters"
import { LanguagePartners } from "./language-partners"
import { LearningCircles } from "./learning-circles"
import { EventsCalendar } from "./events-calendar"
import { HeritageKeepers } from "./heritage-keepers"
import { CommunityContributions } from "./community-contributions"
import { CommunityImpactDashboard } from "./community-impact-dashboard"

type TabType = "partners" | "circles" | "events" | "keepers" | "contributions"

export function CommunityPage() {
  const [activeTab, setActiveTab] = useState<TabType>("partners")
  const [filters, setFilters] = useState({
    language: "all",
    region: "all",
    activityType: "all",
    experienceLevel: "all",
    availability: "all",
  })

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 mb-16">
      <CommunityHeader />

      <CommunityTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <CommunityFilters filters={filters} onFilterChange={handleFilterChange} />

      <div className="mt-6">
        {activeTab === "partners" && <LanguagePartners filters={filters} />}
        {activeTab === "circles" && <LearningCircles filters={filters} />}
        {activeTab === "events" && <EventsCalendar filters={filters} />}
        {activeTab === "keepers" && <HeritageKeepers filters={filters} />}
        {activeTab === "contributions" && <CommunityContributions filters={filters} />}
      </div>

      <CommunityImpactDashboard />
    </div>
  )
}

