"use client"
import { Users, Shield, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface CommunityOptInProps {
  userData: {
    communityEnabled: boolean
  }
  onUpdateData: (data: Partial<{ communityEnabled: boolean }>) => void
  onComplete: () => void
}

export function CommunityOptIn({ userData, onUpdateData, onComplete }: CommunityOptInProps) {
  const handleCommunityToggle = (enabled: boolean) => {
    onUpdateData({ communityEnabled: enabled })
  }

  return (
    <div className="rounded-xl bg-white dark:bg-card shadow-lg overflow-hidden">
      <div className="bg-amber-50 dark:bg-amber-900/20 p-6">
        <div className="flex items-center mb-4">
          <Users className="mr-2 h-6 w-6 text-amber-700 dark:text-amber-300" />
          <h2 className="text-xl font-serif font-bold text-amber-950 dark:text-amber-100">Join Our Community</h2>
        </div>
        <p className="text-amber-700 dark:text-amber-300">
          Connect with fellow language learners, native speakers, and cultural experts.
        </p>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-4 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20">
            <UserPlus className="h-5 w-5 mt-0.5 text-amber-700 dark:text-amber-300" />
            <div>
              <h3 className="font-medium text-amber-950 dark:text-amber-100">Language Partners</h3>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Get matched with native speakers and fellow learners for practice conversations.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20">
            <Users className="h-5 w-5 mt-0.5 text-amber-700 dark:text-amber-300" />
            <div>
              <h3 className="font-medium text-amber-950 dark:text-amber-100">Discussion Forums</h3>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Ask questions, share insights, and participate in cultural discussions.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20">
            <Shield className="h-5 w-5 mt-0.5 text-amber-700 dark:text-amber-300" />
            <div>
              <h3 className="font-medium text-amber-950 dark:text-amber-100">Privacy Control</h3>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                You control what you share. Your learning data is always private unless you choose to share it.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between space-x-2 p-4 rounded-lg border border-amber-100 dark:border-amber-900/30">
          <div className="space-y-0.5">
            <Label htmlFor="community-features" className="text-base">
              Enable community features
            </Label>
            <p className="text-sm text-amber-700 dark:text-amber-300">You can change this anytime in settings</p>
          </div>
          <Switch id="community-features" checked={userData.communityEnabled} onCheckedChange={handleCommunityToggle} />
        </div>

        <Button className="w-full" onClick={onComplete}>
          Complete Setup
        </Button>
      </div>
    </div>
  )
}

