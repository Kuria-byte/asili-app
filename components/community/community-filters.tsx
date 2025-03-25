"use client"

import { useState } from "react"
import { Filter, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CommunityFiltersProps {
  filters: {
    language: string
    region: string
    activityType: string
    experienceLevel: string
    availability: string
  }
  onFilterChange: (filterName: string, value: string) => void
}

export function CommunityFilters({ filters, onFilterChange }: CommunityFiltersProps) {
  const [expanded, setExpanded] = useState(false)

  const languages = [
    { value: "all", label: "All Languages" },
    { value: "swahili", label: "Swahili" },
    { value: "kikuyu", label: "Kikuyu" },
    { value: "luo", label: "Luo" },
    { value: "kamba", label: "Kamba" },
    { value: "kalenjin", label: "Kalenjin" },
    { value: "meru", label: "Meru" },
  ]

  const regions = [
    { value: "all", label: "All Regions" },
    { value: "nairobi", label: "Nairobi" },
    { value: "central", label: "Central" },
    { value: "coast", label: "Coast" },
    { value: "eastern", label: "Eastern" },
    { value: "western", label: "Western" },
    { value: "nyanza", label: "Nyanza" },
    { value: "rift_valley", label: "Rift Valley" },
    { value: "north_eastern", label: "North Eastern" },
    { value: "international", label: "International" },
  ]

  const activityTypes = [
    { value: "all", label: "All Activities" },
    { value: "conversation", label: "Conversation" },
    { value: "reading", label: "Reading" },
    { value: "writing", label: "Writing" },
    { value: "cultural", label: "Cultural" },
    { value: "grammar", label: "Grammar" },
  ]

  const experienceLevels = [
    { value: "all", label: "All Levels" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "native", label: "Native" },
  ]

  const availabilityOptions = [
    { value: "all", label: "Any Time" },
    { value: "weekdays", label: "Weekdays" },
    { value: "weekends", label: "Weekends" },
    { value: "mornings", label: "Mornings" },
    { value: "afternoons", label: "Afternoons" },
    { value: "evenings", label: "Evenings" },
  ]

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-lg shadow-sm p-3 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-amber-700 dark:text-amber-300" />
          <span className="text-sm font-medium text-amber-900 dark:text-amber-100">Filters</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="text-amber-700 dark:text-amber-300"
        >
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      <div
        className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-3 ${expanded ? "block" : "hidden md:grid"}`}
      >
        <Select value={filters.language} onValueChange={(value) => onFilterChange("language", value)}>
          <SelectTrigger className="bg-amber-50 dark:bg-gray-800 border-amber-100 dark:border-amber-900/30">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((language) => (
              <SelectItem key={language.value} value={language.value}>
                {language.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.region} onValueChange={(value) => onFilterChange("region", value)}>
          <SelectTrigger className="bg-amber-50 dark:bg-gray-800 border-amber-100 dark:border-amber-900/30">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region.value} value={region.value}>
                {region.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.activityType} onValueChange={(value) => onFilterChange("activityType", value)}>
          <SelectTrigger className="bg-amber-50 dark:bg-gray-800 border-amber-100 dark:border-amber-900/30">
            <SelectValue placeholder="Activity Type" />
          </SelectTrigger>
          <SelectContent>
            {activityTypes.map((activity) => (
              <SelectItem key={activity.value} value={activity.value}>
                {activity.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.experienceLevel} onValueChange={(value) => onFilterChange("experienceLevel", value)}>
          <SelectTrigger className="bg-amber-50 dark:bg-gray-800 border-amber-100 dark:border-amber-900/30">
            <SelectValue placeholder="Experience Level" />
          </SelectTrigger>
          <SelectContent>
            {experienceLevels.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.availability} onValueChange={(value) => onFilterChange("availability", value)}>
          <SelectTrigger className="bg-amber-50 dark:bg-gray-800 border-amber-100 dark:border-amber-900/30">
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent>
            {availabilityOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

