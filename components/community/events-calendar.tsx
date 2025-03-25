"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, MapPin, Users, ChevronLeft, ChevronRight, Plus, Bell } from "lucide-react"

interface EventsCalendarProps {
  filters: {
    language: string
    region: string
    activityType: string
    experienceLevel: string
    availability: string
  }
}

export function EventsCalendar({ filters }: EventsCalendarProps) {
  const [calendarView, setCalendarView] = useState<"month" | "week" | "day">("month")
  const [currentMonth, setCurrentMonth] = useState("April 2023")

  // Mock data for events
  const events = [
    {
      id: 1,
      title: "Swahili Poetry Workshop",
      host: "Mwalimu Juma",
      date: "April 15, 2023",
      time: "2:00 PM - 4:00 PM",
      timezone: "EAT",
      location: "Nairobi Cultural Center",
      isVirtual: false,
      category: "workshop",
      language: "Swahili",
      participants: 18,
      capacity: 25,
      description: "Learn the art of Swahili poetry with renowned poet Mwalimu Juma.",
    },
    {
      id: 2,
      title: "Kikuyu Conversation Practice",
      host: "Wanjiku Maina",
      date: "April 18, 2023",
      time: "6:00 PM - 7:30 PM",
      timezone: "EAT",
      location: "Zoom Meeting",
      isVirtual: true,
      category: "practice",
      language: "Kikuyu",
      participants: 12,
      capacity: 20,
      description: "Weekly conversation practice for intermediate Kikuyu learners.",
    },
    {
      id: 3,
      title: "Kenyan Languages Film Festival",
      host: "Asili Cultural Association",
      date: "April 22-23, 2023",
      time: "10:00 AM - 6:00 PM",
      timezone: "EAT",
      location: "Nairobi National Museum",
      isVirtual: false,
      category: "cultural",
      language: "Multiple",
      participants: 45,
      capacity: 100,
      description: "A two-day celebration of films in Kenya's indigenous languages with subtitles.",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-amber-900 dark:text-amber-100">Events Calendar</h2>
        <Button>
          <Plus className="h-4 w-4 mr-1.5" />
          Create Event
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="font-medium">{currentMonth}</div>
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <Tabs defaultValue="month" className="w-auto">
              <TabsList>
                <TabsTrigger value="month" onClick={() => setCalendarView("month")}>
                  Month
                </TabsTrigger>
                <TabsTrigger value="week" onClick={() => setCalendarView("week")}>
                  Week
                </TabsTrigger>
                <TabsTrigger value="day" onClick={() => setCalendarView("day")}>
                  Day
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="bg-amber-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
            <div className="text-center text-amber-700 dark:text-amber-300">
              <CalendarIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Calendar view would display here with event indicators</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-amber-900 dark:text-amber-100">Upcoming Events</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <div
                className={`h-2 ${
                  event.category === "workshop"
                    ? "bg-blue-500"
                    : event.category === "practice"
                      ? "bg-green-500"
                      : "bg-purple-500"
                }`}
              ></div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-lg text-amber-900 dark:text-amber-100">{event.title}</h3>
                  <Badge variant={event.isVirtual ? "outline" : "default"}>
                    {event.isVirtual ? "Virtual" : "In-Person"}
                  </Badge>
                </div>

                <div className="text-sm text-amber-700 dark:text-amber-300 mb-1">Hosted by: {event.host}</div>

                <div className="grid grid-cols-1 gap-y-2 mb-4 text-sm">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <CalendarIcon className="h-4 w-4 mr-1.5" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Clock className="h-4 w-4 mr-1.5" />
                    <span>
                      {event.time} ({event.timezone})
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <MapPin className="h-4 w-4 mr-1.5" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Users className="h-4 w-4 mr-1.5" />
                    <span>
                      {event.participants}/{event.capacity} participants
                    </span>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  <Badge variant="outline" className="bg-amber-50 dark:bg-amber-900/20">
                    {event.language}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`
                      ${
                        event.category === "workshop"
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                          : event.category === "practice"
                            ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                            : "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
                      }
                    `}
                  >
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </Badge>
                </div>

                <div className="flex justify-between">
                  <Button>RSVP</Button>
                  <Button variant="outline" size="icon">
                    <Bell className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

