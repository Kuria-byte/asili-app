import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, MessageCircle, Video, Check, ChevronRight } from "lucide-react"

interface HeritageKeepersProps {
  filters: {
    language: string
    region: string
    activityType: string
    experienceLevel: string
    availability: string
  }
}

export function HeritageKeepers({ filters }: HeritageKeepersProps) {
  // Mock data for heritage keepers
  const experts = [
    {
      id: 1,
      name: "Prof. Wangari Maathai",
      avatar: "/placeholder.svg?height=150&width=150",
      languages: ["Kikuyu", "Swahili"],
      expertise: ["Oral Traditions", "Environmental Terminology", "Cultural Context"],
      verified: true,
      contributions: 47,
      available: true,
      bio: "Professor and environmental activist with deep knowledge of Kikuyu language and its connection to environmental conservation.",
    },
    {
      id: 2,
      name: "Mzee Ojwang",
      avatar: "/placeholder.svg?height=150&width=150",
      languages: ["Luo", "Swahili"],
      expertise: ["Folk Stories", "Traditional Music", "Proverbs"],
      verified: true,
      contributions: 32,
      available: false,
      bio: "Elder and cultural guardian preserving Luo oral traditions and linguistic heritage through storytelling and music.",
    },
    {
      id: 3,
      name: "Dr. Aisha Mohammed",
      avatar: "/placeholder.svg?height=150&width=150",
      languages: ["Swahili", "Arabic"],
      expertise: ["Coastal Dialects", "Historical Linguistics", "Poetry"],
      verified: true,
      contributions: 56,
      available: true,
      bio: "Linguist specializing in the evolution of Swahili dialects along the Kenyan coast and their Arabic influences.",
    },
  ]

  // Featured guardian
  const featuredGuardian = {
    id: 101,
    name: "Mwalimu Kimani Njogu",
    avatar: "/placeholder.svg?height=200&width=200",
    languages: ["Kikuyu", "Swahili", "English"],
    expertise: ["Language Documentation", "Teaching Methodology", "Cultural Integration"],
    verified: true,
    contributions: 78,
    available: true,
    bio: "With over 30 years of experience teaching and documenting Kikuyu language, Mwalimu Kimani has developed innovative methods for preserving endangered dialects and teaching language in cultural context.",
    background:
      "Born in central Kenya, Mwalimu Kimani grew up speaking Kikuyu and developed a passion for language preservation after seeing how quickly younger generations were losing fluency. He has recorded over 500 hours of conversations with elders and created a digital archive of Kikuyu expressions and idioms.",
    testimonials: [
      {
        id: 1,
        name: "James Mwangi",
        text: "Mwalimu Kimani's teaching approach helped me reconnect with my heritage in ways I never thought possible.",
      },
      {
        id: 2,
        name: "Sarah Wanjiru",
        text: "His patience and deep knowledge made learning Kikuyu enjoyable and meaningful.",
      },
    ],
  }

  return (
    <div className="space-y-8">
      {/* Featured Guardian Spotlight */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <h2 className="text-lg font-medium text-amber-900 dark:text-amber-100">Featured Heritage Guardian</h2>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 flex flex-col items-center">
              <img
                src={featuredGuardian.avatar || "/placeholder.svg"}
                alt={featuredGuardian.name}
                className="w-40 h-40 rounded-full object-cover border-4 border-amber-200 dark:border-amber-700 mb-4"
              />

              <h3 className="text-xl font-semibold text-amber-900 dark:text-amber-100 text-center">
                {featuredGuardian.name}
              </h3>

              <div className="flex items-center gap-1 mt-1 mb-3">
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                >
                  <Check className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
                {featuredGuardian.available && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                    Available
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap justify-center gap-1 mb-4">
                {featuredGuardian.languages.map((lang, idx) => (
                  <Badge key={idx} variant="secondary">
                    {lang}
                  </Badge>
                ))}
              </div>

              <div className="text-center text-sm text-amber-700 dark:text-amber-300 mb-4">
                <div className="font-medium">{featuredGuardian.contributions}</div>
                <div>Contributions</div>
              </div>

              <Button className="w-full">
                <MessageCircle className="h-4 w-4 mr-1.5" />
                Contact
              </Button>

              <Button variant="outline" className="w-full mt-2">
                <Video className="h-4 w-4 mr-1.5" />
                Watch Introduction
              </Button>
            </div>

            <div className="md:w-2/3">
              <div className="mb-4">
                <h4 className="text-lg font-medium text-amber-900 dark:text-amber-100">About</h4>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{featuredGuardian.bio}</p>
              </div>

              <div className="mb-4">
                <h4 className="text-lg font-medium text-amber-900 dark:text-amber-100">Background</h4>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{featuredGuardian.background}</p>
              </div>

              <div className="mb-4">
                <h4 className="text-lg font-medium text-amber-900 dark:text-amber-100">Areas of Expertise</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {featuredGuardian.expertise.map((exp, idx) => (
                    <Badge key={idx} variant="outline" className="bg-amber-50 dark:bg-amber-900/20">
                      {exp}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-amber-900 dark:text-amber-100">Testimonials</h4>
                <div className="space-y-3 mt-2">
                  {featuredGuardian.testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-amber-50 dark:bg-amber-900/10 p-3 rounded-lg">
                      <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.text}"</p>
                      <p className="text-sm font-medium text-amber-700 dark:text-amber-300 mt-1">
                        — {testimonial.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expert Directory */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-amber-900 dark:text-amber-100">Heritage Keepers Directory</h2>
          <Button variant="outline">
            Become a Heritage Keeper
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {experts.map((expert) => (
            <Card key={expert.id}>
              <CardContent className="p-4">
                <div className="flex flex-col items-center mb-4">
                  <img
                    src={expert.avatar || "/placeholder.svg"}
                    alt={expert.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-amber-200 dark:border-amber-700 mb-3"
                  />

                  <h3 className="text-lg font-medium text-amber-900 dark:text-amber-100">{expert.name}</h3>

                  <div className="flex items-center gap-1 mt-1">
                    {expert.verified && (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-1">Languages:</div>
                    <div className="flex flex-wrap gap-1">
                      {expert.languages.map((lang, idx) => (
                        <Badge key={idx} variant="secondary">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-1">Expertise:</div>
                    <div className="flex flex-wrap gap-1">
                      {expert.expertise.map((exp, idx) => (
                        <Badge key={idx} variant="outline" className="bg-amber-50 dark:bg-amber-900/20">
                          {exp}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 dark:text-gray-300">{expert.bio}</div>

                  <div className="flex justify-between items-center pt-2">
                    <div className="text-sm text-amber-700 dark:text-amber-300">
                      <span className="font-medium">{expert.contributions}</span> contributions
                    </div>
                    <Button size="sm">
                      <MessageCircle className="h-4 w-4 mr-1.5" />
                      Contact
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

