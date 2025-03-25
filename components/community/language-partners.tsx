"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Clock, MessageCircle, Calendar, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LanguagePartnersProps {
  filters: {
    language: string
    region: string
    activityType: string
    experienceLevel: string
    availability: string
  }
}

export function LanguagePartners({ filters }: LanguagePartnersProps) {
  const [searchTab, setSearchTab] = useState("find")

  // Mock data for language partners
  const partners = [
    {
      id: 1,
      name: "Wanjiku Kamau",
      avatar: "/placeholder.svg?height=100&width=100",
      location: "Nairobi, Kenya",
      languages: [
        { name: "Kikuyu", level: "Native" },
        { name: "Swahili", level: "Advanced" },
        { name: "English", level: "Fluent" },
      ],
      compatibility: 92,
      availableTimes: ["Mon 7-9pm", "Wed 6-8pm", "Sat 10am-12pm"],
      interests: ["Traditional cooking", "Folk stories", "Music"],
      skills: ["Pronunciation", "Cultural context", "Vocabulary"],
    },
    {
      id: 2,
      name: "Otieno Odhiambo",
      avatar: "/placeholder.svg?height=100&width=100",
      location: "Kisumu, Kenya",
      languages: [
        { name: "Luo", level: "Native" },
        { name: "Swahili", level: "Fluent" },
        { name: "English", level: "Intermediate" },
      ],
      compatibility: 85,
      availableTimes: ["Tue 5-7pm", "Thu 7-9pm", "Sun 2-4pm"],
      interests: ["History", "Fishing traditions", "Poetry"],
      skills: ["Conversation", "Idioms", "Grammar"],
    },
    {
      id: 3,
      name: "Amina Hassan",
      avatar: "/placeholder.svg?height=100&width=100",
      location: "Mombasa, Kenya",
      languages: [
        { name: "Swahili", level: "Native" },
        { name: "Arabic", level: "Intermediate" },
        { name: "English", level: "Advanced" },
      ],
      compatibility: 78,
      availableTimes: ["Mon 4-6pm", "Fri 7-9pm", "Sat 3-5pm"],
      interests: ["Coastal cuisine", "Maritime history", "Traditional dance"],
      skills: ["Accent coaching", "Vocabulary", "Cultural nuances"],
    },
  ]

  // Mock data for active connections
  const activeConnections = [
    {
      id: 101,
      name: "Njeri Wainaina",
      avatar: "/placeholder.svg?height=100&width=100",
      lastInteraction: "Yesterday",
      upcomingSession: {
        date: "Tomorrow",
        time: "6:00 PM - 7:00 PM",
        topic: "Family vocabulary in Kikuyu",
      },
      suggestedTopics: ["Greetings", "Market vocabulary", "Weather expressions"],
    },
    {
      id: 102,
      name: "Kiprop Kibet",
      avatar: "/placeholder.svg?height=100&width=100",
      lastInteraction: "3 days ago",
      upcomingSession: {
        date: "Saturday",
        time: "11:00 AM - 12:00 PM",
        topic: "Kalenjin traditional stories",
      },
      suggestedTopics: ["Numbers", "Colors", "Animals"],
    },
  ]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="find" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="find" onClick={() => setSearchTab("find")}>
            Find Partners
          </TabsTrigger>
          <TabsTrigger value="active" onClick={() => setSearchTab("active")}>
            Active Connections
          </TabsTrigger>
        </TabsList>

        <TabsContent value="find" className="space-y-6">
          {/* Partner Search Widget */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="search-language">I want to practice</Label>
                    <Select defaultValue="kikuyu">
                      <SelectTrigger id="search-language" className="mt-1">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kikuyu">Kikuyu</SelectItem>
                        <SelectItem value="luo">Luo</SelectItem>
                        <SelectItem value="swahili">Swahili</SelectItem>
                        <SelectItem value="kamba">Kamba</SelectItem>
                        <SelectItem value="kalenjin">Kalenjin</SelectItem>
                        <SelectItem value="meru">Meru</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="proficiency">My proficiency level</Label>
                    <Select defaultValue="beginner">
                      <SelectTrigger id="proficiency" className="mt-1">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="native">Native</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="interests">My interests</Label>
                    <Input id="interests" placeholder="e.g., cooking, music, history" className="mt-1" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="availability">I'm available</Label>
                    <Select defaultValue="weekends">
                      <SelectTrigger id="availability" className="mt-1">
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekdays">Weekdays</SelectItem>
                        <SelectItem value="weekends">Weekends</SelectItem>
                        <SelectItem value="mornings">Mornings</SelectItem>
                        <SelectItem value="evenings">Evenings</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="goals">My learning goals</Label>
                    <Input id="goals" placeholder="What do you want to achieve?" className="mt-1" />
                  </div>

                  <div className="pt-4">
                    <Button className="w-full">
                      <Search className="h-4 w-4 mr-2" />
                      Find Language Partners
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Partner Recommendation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.map((partner) => (
              <Card key={partner.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={partner.avatar || "/placeholder.svg"}
                          alt={partner.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-amber-200 dark:border-amber-700"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800"></div>
                      </div>
                      <div>
                        <h3 className="font-medium text-amber-900 dark:text-amber-100">{partner.name}</h3>
                        <p className="text-xs text-amber-700 dark:text-amber-300">{partner.location}</p>
                        <div className="flex items-center mt-1">
                          <div className="text-xs font-medium bg-amber-200 dark:bg-amber-700/50 text-amber-800 dark:text-amber-100 px-2 py-0.5 rounded-full">
                            {partner.compatibility}% Match
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {partner.languages.map((lang, idx) => (
                        <Badge key={idx} variant="outline" className="bg-amber-50 dark:bg-amber-900/20">
                          {lang.name} ({lang.level})
                        </Badge>
                      ))}
                    </div>

                    <div className="mb-3">
                      <div className="text-xs font-medium text-amber-800 dark:text-amber-200 mb-1 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Available Times:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {partner.availableTimes.map((time, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                            {time}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                      <div>
                        <div className="font-medium text-amber-800 dark:text-amber-200 mb-1">Interests:</div>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                          {partner.interests.map((interest, idx) => (
                            <li key={idx}>{interest}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="font-medium text-amber-800 dark:text-amber-200 mb-1">Skills:</div>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                          {partner.skills.map((skill, idx) => (
                            <li key={idx}>{skill}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Button className="w-full">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-6">
          {/* Active Connections Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {activeConnections.map((connection) => (
              <Card key={connection.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={connection.avatar || "/placeholder.svg"}
                      alt={connection.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-amber-200 dark:border-amber-700"
                    />
                    <div>
                      <h3 className="font-medium text-amber-900 dark:text-amber-100">{connection.name}</h3>
                      <p className="text-xs text-amber-700 dark:text-amber-300">
                        Last interaction: {connection.lastInteraction}
                      </p>
                    </div>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-amber-800 dark:text-amber-200 flex items-center">
                        <Calendar className="h-4 w-4 mr-1.5" />
                        Upcoming Session
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                      >
                        Scheduled
                      </Badge>
                    </div>
                    <div className="text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">{connection.upcomingSession.date}</span>
                        <span className="text-gray-600 dark:text-gray-300">{connection.upcomingSession.time}</span>
                      </div>
                      <div className="mt-1 font-medium text-amber-900 dark:text-amber-100">
                        {connection.upcomingSession.topic}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-2">Suggested Topics:</div>
                    <div className="flex flex-wrap gap-1">
                      {connection.suggestedTopics.map((topic, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="cursor-pointer hover:bg-amber-200 dark:hover:bg-amber-700/50"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between mt-4">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-1.5" />
                      Message
                    </Button>
                    <Button variant="ghost" size="sm" className="text-amber-700 dark:text-amber-300">
                      View History
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

