"use client"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface ProfileCustomizationProps {
  userData: {
    goals: string[]
  }
  onUpdateData: (data: Partial<ProfileCustomizationProps["userData"]>) => void
  onComplete: () => void
  onSkip: () => void
}

export function ProfileCustomization({ userData, onUpdateData, onComplete, onSkip }: ProfileCustomizationProps) {
  const learningGoals = [
    { id: "conversation", label: "Have conversations with native speakers" },
    { id: "travel", label: "Travel around Kenya" },
    { id: "culture", label: "Understand cultural traditions" },
    { id: "heritage", label: "Connect with my heritage" },
    { id: "education", label: "Support educational goals" },
    { id: "work", label: "Professional development" },
    { id: "preservation", label: "Help preserve endangered languages" },
    { id: "fun", label: "Just for fun and curiosity" },
  ]

  const handleGoalToggle = (goalId: string) => {
    const updatedGoals = userData.goals.includes(goalId)
      ? userData.goals.filter((id) => id !== goalId)
      : [...userData.goals, goalId]

    onUpdateData({ goals: updatedGoals })
  }

  return (
    <div className="rounded-xl bg-white dark:bg-card shadow-lg overflow-hidden">
      <div className="bg-amber-50 dark:bg-amber-900/20 p-6">
        <h2 className="text-xl font-serif font-bold text-amber-950 dark:text-amber-100 mb-2">
          Customize Your Experience
        </h2>
        <p className="text-amber-700 dark:text-amber-300">
          Tell us about your learning goals so we can personalize your journey.
        </p>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-amber-950 dark:text-amber-100">What are your learning goals?</h3>
          <p className="text-sm text-amber-700 dark:text-amber-300">Select all that apply</p>

          <div className="space-y-3">
            {learningGoals.map((goal) => (
              <div key={goal.id} className="flex items-start space-x-2">
                <Checkbox
                  id={goal.id}
                  checked={userData.goals.includes(goal.id)}
                  onCheckedChange={() => handleGoalToggle(goal.id)}
                />
                <Label
                  htmlFor={goal.id}
                  className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {goal.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="flex-1" onClick={onComplete}>
            Continue
          </Button>

          <Button variant="outline" className="flex-1" onClick={onSkip}>
            Skip for now
          </Button>
        </div>

        <p className="text-center text-xs text-amber-700 dark:text-amber-300">
          You can always update your preferences later in your profile settings.
        </p>
      </div>
    </div>
  )
}

