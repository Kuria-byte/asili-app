"use client"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface PersonalizationFormProps {
  userData: {
    language: string
    connection: string
    level: string
  }
  onUpdateData: (data: Partial<UserData>) => void
  onComplete: () => void
  onBack: () => void
}

interface UserData {
  language: string
  connection: string
  level: string
}

export function PersonalizationForm({ userData, onUpdateData, onComplete, onBack }: PersonalizationFormProps) {
  const languages = [
    { id: "kikuyu", name: "Kikuyu", region: "Central Kenya" },
    { id: "swahili", name: "Swahili", region: "Coastal Kenya" },
    { id: "luo", name: "Luo", region: "Western Kenya" },
    { id: "kamba", name: "Kamba", region: "Eastern Kenya" },
    { id: "kalenjin", name: "Kalenjin", region: "Rift Valley" },
    { id: "meru", name: "Meru", region: "Eastern Kenya" },
  ]

  const connections = [
    { id: "heritage", name: "Heritage", description: "This language is part of my cultural background" },
    { id: "interest", name: "Interest", description: "I'm curious about this language and culture" },
    { id: "education", name: "Education", description: "I'm learning for academic purposes" },
    { id: "work", name: "Work", description: "I need this language for professional reasons" },
  ]

  const levels = [
    { id: "beginner", name: "Beginner", description: "I'm just starting out" },
    { id: "some", name: "Some Knowledge", description: "I know a few words and phrases" },
    { id: "conversational", name: "Conversational", description: "I can have basic conversations" },
    { id: "fluent", name: "Fluent", description: "I speak it well but want to improve" },
  ]

  const handleLanguageSelect = (languageId: string) => {
    onUpdateData({ language: languageId })
  }

  const handleConnectionSelect = (connectionId: string) => {
    onUpdateData({ connection: connectionId })
  }

  const handleLevelSelect = (levelId: string) => {
    onUpdateData({ level: levelId })
  }

  const isComplete = userData.language && userData.connection && userData.level

  return (
    <div className="rounded-xl bg-white dark:bg-card shadow-lg overflow-hidden">
      <div className="bg-amber-50 dark:bg-amber-900/20 p-6">
        <div className="flex items-center mb-4">
          <button
            onClick={onBack}
            className="mr-2 rounded-full p-2 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-800/50"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-serif font-bold text-amber-950 dark:text-amber-100">
            Tell us about your language journey
          </h2>
        </div>
        <p className="text-amber-700 dark:text-amber-300">
          We'll personalize your experience based on your interests and goals.
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Language selection */}
        <div>
          <h3 className="text-lg font-medium text-amber-950 dark:text-amber-100 mb-3">
            Which language are you most interested in learning?
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {languages.map((language) => (
              <Card
                key={language.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  userData.language === language.id ? "border-amber-500 bg-amber-50 dark:bg-amber-900/30" : ""
                }`}
                onClick={() => handleLanguageSelect(language.id)}
              >
                <CardContent className="p-3">
                  <h4 className="font-medium text-amber-950 dark:text-amber-100">{language.name}</h4>
                  <p className="text-xs text-amber-700 dark:text-amber-300">{language.region}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Connection selection */}
        <div>
          <h3 className="text-lg font-medium text-amber-950 dark:text-amber-100 mb-3">
            What's your connection to this language?
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {connections.map((connection) => (
              <Card
                key={connection.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  userData.connection === connection.id ? "border-amber-500 bg-amber-50 dark:bg-amber-900/30" : ""
                }`}
                onClick={() => handleConnectionSelect(connection.id)}
              >
                <CardContent className="p-3">
                  <h4 className="font-medium text-amber-950 dark:text-amber-100">{connection.name}</h4>
                  <p className="text-xs text-amber-700 dark:text-amber-300">{connection.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Level selection */}
        <div>
          <h3 className="text-lg font-medium text-amber-950 dark:text-amber-100 mb-3">What's your current level?</h3>
          <div className="grid grid-cols-2 gap-3">
            {levels.map((level) => (
              <Card
                key={level.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  userData.level === level.id ? "border-amber-500 bg-amber-50 dark:bg-amber-900/30" : ""
                }`}
                onClick={() => handleLevelSelect(level.id)}
              >
                <CardContent className="p-3">
                  <h4 className="font-medium text-amber-950 dark:text-amber-100">{level.name}</h4>
                  <p className="text-xs text-amber-700 dark:text-amber-300">{level.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Button className="w-full" onClick={onComplete} disabled={!isComplete}>
          Continue
        </Button>
      </div>
    </div>
  )
}

