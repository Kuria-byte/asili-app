"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Calendar, Plus, ZoomIn, ZoomOut, MapIcon, List } from "lucide-react"

interface LearningCirclesProps {
  filters: {
    language: string
    region: string
    activityType: string
    experienceLevel: string
    availability: string
  }
}

export function LearningCircles({ filters }: LearningCirclesProps) {
  const [viewMode, setViewMode] = useState<"map" | "list">("list")

  // Mock data for learning circles
  const circles = [
    {
      id: 1,
      name: "Nairobi Swahili Conversation Club",
      type: "Conversation Practice",
      language: "Swahili",
      level: "Intermediate",
      location: "Nairobi, Kenya",
      isVirtual: false,
      meetingFrequency: "Weekly, Saturdays",
      memberCount: 12,
      capacity: 15,
      description: "A friendly group focused on improving conversational Swahili through weekly practice sessions.",
    },
    {
      id: 2,
      name: "Kikuyu Cultural Reading Group",
      type: "Reading Group",
      language: "Kikuyu",
      level: "All Levels",
      location: "Virtual",
      isVirtual: true,
      meetingFrequency: "Bi-weekly, Wednesdays",
      memberCount: 8,
      capacity: 10,
      description: "We read and discuss Kikuyu literature, focusing on cultural context and vocabulary building.",
    },
    {
      id: 3,
      name: "Luo Language Immersion Circle",
      type: "Cultural Learning",
      language: "Luo",
      level: "Beginner to Advanced",
      location: "Kisumu, Kenya",
      isVirtual: false,
      meetingFrequency: "Monthly, First Sunday",
      memberCount: 15,
      capacity: 20,
      description:
        "Full immersion experience with native speakers, focusing on practical language use in cultural contexts.",
    },
    {
      id: 4,
      name: "Kalenjin Grammar Workshop",
      type: "Grammar Focus",
      language: "Kalenjin",
      level: "Intermediate to Advanced",
      location: "Virtual",
      isVirtual: true,
      meetingFrequency: "Weekly, Mondays",
      memberCount: 6,
      capacity: 8,
      description: "Structured sessions focusing on Kalenjin grammar rules, verb conjugations, and sentence structure.",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-amber-900 dark:text-amber-100">Learning Circles</h2>
        <div className="flex items-center gap-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-1 flex">
            <Button
              variant={viewMode === "map" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("map")}
              className="rounded-r-none"
            >
              <MapIcon className="h-4 w-4 mr-1" />
              Map
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4 mr-1" />
              List
            </Button>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-1.5" />
            Create Circle
          </Button>
        </div>
      </div>

      {viewMode === "map" ? (
        <Card>
          <CardContent className="p-4">
            <div className="relative w-full h-[400px] bg-amber-50 dark:bg-gray-800 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-amber-700 dark:text-amber-300">
                  <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Interactive map would display here with circle locations</p>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {circles.map((circle) => (
            <Card key={circle.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-lg text-amber-900 dark:text-amber-100">{circle.name}</h3>
                  <Badge variant={circle.isVirtual ? "outline" : "default"}>
                    {circle.isVirtual ? "Virtual" : "In-Person"}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-y-2 mb-4 text-sm">
                  <div className="flex items-center text-amber-700 dark:text-amber-300">
                    <Users className="h-4 w-4 mr-1.5" />
                    <span>{circle.type}</span>
                  </div>
                  <div className="flex items-center text-amber-700 dark:text-amber-300">
                    <MapPin className="h-4 w-4 mr-1.5" />
                    <span>{circle.location}</span>
                  </div>
                  <div className="flex items-center text-amber-700 dark:text-amber-300">
                    <Calendar className="h-4 w-4 mr-1.5" />
                    <span>{circle.meetingFrequency}</span>
                  </div>
                  <div>
                    <Badge variant="outline" className="bg-amber-50 dark:bg-amber-900/20">
                      {circle.language}
                    </Badge>
                    <Badge variant="outline" className="ml-1 bg-amber-50 dark:bg-amber-900/20">
                      {circle.level}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{circle.description}</p>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-amber-700 dark:text-amber-300">
                    <span className="font-medium">{circle.memberCount}</span>/{circle.capacity} members
                  </div>
                  <Button>Join Circle</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

