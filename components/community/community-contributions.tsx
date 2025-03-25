"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, BookText, History, Mic, ThumbsUp, Share2, Check, Clock, Plus } from "lucide-react"

interface CommunityContributionsProps {
  filters: {
    language: string
    region: string
    activityType: string
    experienceLevel: string
    availability: string
  }
}

export function CommunityContributions({ filters }: CommunityContributionsProps) {
  const [contributionType, setContributionType] = useState("phrases")

  // Mock data for contributions
  const contributions = [
    {
      id: 1,
      type: "phrases",
      title: "Common Market Phrases in Kikuyu",
      contributor: {
        name: "James Kamau",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      language: "Kikuyu",
      verified: true,
      upvotes: 24,
      date: "2 days ago",
      content:
        "A collection of 15 common phrases used in local markets, with pronunciation guides and cultural context.",
    },
    {
      id: 2,
      type: "cultural",
      title: "Wedding Traditions and Terminology",
      contributor: {
        name: "Wanjiku Mwangi",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      language: "Kikuyu",
      verified: false,
      upvotes: 18,
      date: "1 week ago",
      content:
        "Detailed explanation of traditional Kikuyu wedding customs and the specific vocabulary associated with each ritual.",
    },
    {
      id: 3,
      type: "stories",
      title: "The Hare and the Hyena: A Luo Folktale",
      contributor: {
        name: "Otieno Omondi",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      language: "Luo",
      verified: true,
      upvotes: 32,
      date: "3 days ago",
      content:
        "Traditional Luo folktale with original text, translation, and analysis of cultural metaphors and morals.",
    },
    {
      id: 4,
      type: "pronunciation",
      title: "Swahili Coastal Dialect Pronunciation Guide",
      contributor: {
        name: "Amina Hassan",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      language: "Swahili",
      verified: true,
      upvotes: 27,
      date: "5 days ago",
      content: "Audio recordings and explanations of unique pronunciation features in coastal Swahili dialects.",
    },
    {
      id: 5,
      type: "historical",
      title: "Evolution of Kalenjin Agricultural Terms",
      contributor: {
        name: "Kiprop Kibet",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      language: "Kalenjin",
      verified: false,
      upvotes: 15,
      date: "2 weeks ago",
      content: "Historical analysis of how agricultural terminology in Kalenjin has evolved over the past century.",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-amber-900 dark:text-amber-100">Community Contributions</h2>
        <Button>
          <Plus className="h-4 w-4 mr-1.5" />
          Add Contribution
        </Button>
      </div>

      {/* Contribution Types Navigation */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2">
        {[
          { id: "phrases", label: "Phrases & Expressions", icon: MessageSquare },
          { id: "cultural", label: "Cultural Context", icon: BookText },
          { id: "stories", label: "Stories & Proverbs", icon: BookText },
          { id: "pronunciation", label: "Pronunciation Guides", icon: Mic },
          { id: "historical", label: "Historical Knowledge", icon: History },
        ].map((type) => (
          <Button
            key={type.id}
            variant={contributionType === type.id ? "default" : "outline"}
            className="flex-shrink-0"
            onClick={() => setContributionType(type.id)}
          >
            <type.icon className="h-4 w-4 mr-1.5" />
            {type.label}
          </Button>
        ))}
      </div>

      {/* Recent Contributions Feed */}
      <div className="space-y-4">
        {contributions
          .filter((c) => contributionType === "all" || c.type === contributionType)
          .map((contribution) => (
            <Card key={contribution.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <img
                    src={contribution.contributor.avatar || "/placeholder.svg"}
                    alt={contribution.contributor.name}
                    className="w-10 h-10 rounded-full object-cover border border-amber-200 dark:border-amber-700"
                  />

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-amber-900 dark:text-amber-100">{contribution.title}</h3>
                        <div className="text-sm text-amber-700 dark:text-amber-300">
                          By {contribution.contributor.name} · {contribution.date}
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <Badge variant="outline" className="bg-amber-50 dark:bg-amber-900/20">
                          {contribution.language}
                        </Badge>
                        {contribution.verified ? (
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300"
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            Pending
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mt-2">{contribution.content}</p>

                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" className="text-amber-700 dark:text-amber-300">
                          <ThumbsUp className="h-4 w-4 mr-1.5" />
                          {contribution.upvotes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-amber-700 dark:text-amber-300">
                          <Share2 className="h-4 w-4 mr-1.5" />
                          Share
                        </Button>
                      </div>

                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}

