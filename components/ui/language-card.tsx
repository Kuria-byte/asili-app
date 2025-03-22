import type { Language } from "@/lib/domain/models/language"
import { ArrowRight, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

interface LanguageCardProps {
  language: Language
}

export function LanguageCard({ language }: LanguageCardProps) {
  const formatSpeakerCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M speakers`
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K speakers`
    }
    return `${count} speakers`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-300"
      case "intermediate":
        return "bg-amber-100 text-amber-800 border-amber-300"
      case "advanced":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
      <div className="h-3 bg-gradient-to-r from-primary to-secondary" />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            {language.iconUrl ? (
              <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-100 flex items-center justify-center">
                <Image
                  src={language.iconUrl || "/placeholder.svg"}
                  alt={language.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold">
                {language.name.charAt(0)}
              </div>
            )}
            <CardTitle>{language.name}</CardTitle>
          </div>
          <Badge className={`${getDifficultyColor(language.difficulty)} capitalize`}>{language.difficulty}</Badge>
        </div>
        <CardDescription className="text-sm">{language.region}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-neutral-600 line-clamp-3">{language.description}</p>
        <div className="flex items-center gap-1 mt-3 text-xs text-neutral-500">
          <Users size={14} />
          <span>{formatSpeakerCount(language.speakerCount)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/languages/${language.id}`} className="w-full">
          <Button className="w-full group">
            Explore Language
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

