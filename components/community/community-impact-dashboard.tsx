import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, Clock, BookOpen, Award, Sparkles, BarChart3, Globe } from "lucide-react"

export function CommunityImpactDashboard() {
  // Mock data for community impact
  const impactData = {
    activeMembers: 1247,
    languagesRepresented: 12,
    recordedHours: 856,
    documentedWords: 15420,
    milestones: [
      {
        name: "2,000 Active Members",
        progress: 62,
        target: 2000,
        current: 1247,
      },
      {
        name: "1,000 Recorded Hours",
        progress: 85,
        target: 1000,
        current: 856,
      },
      {
        name: "20,000 Documented Words",
        progress: 77,
        target: 20000,
        current: 15420,
      },
    ],
    recentAchievements: [
      {
        id: 1,
        title: "500 Swahili Proverbs Documented",
        date: "Last week",
      },
      {
        id: 2,
        title: "100 Hours of Maa Language Recordings",
        date: "2 weeks ago",
      },
    ],
  }

  return (
    <Card className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800/30">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <h2 className="text-xl font-semibold text-amber-900 dark:text-amber-100">Community Impact</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-sm">
            <Users className="h-8 w-8 mx-auto mb-2 text-amber-500 dark:text-amber-400" />
            <div className="text-2xl font-bold text-amber-900 dark:text-amber-100">
              {impactData.activeMembers.toLocaleString()}
            </div>
            <div className="text-sm text-amber-700 dark:text-amber-300">Active Members</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-sm">
            <Globe className="h-8 w-8 mx-auto mb-2 text-amber-500 dark:text-amber-400" />
            <div className="text-2xl font-bold text-amber-900 dark:text-amber-100">
              {impactData.languagesRepresented}
            </div>
            <div className="text-sm text-amber-700 dark:text-amber-300">Languages Represented</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-sm">
            <Clock className="h-8 w-8 mx-auto mb-2 text-amber-500 dark:text-amber-400" />
            <div className="text-2xl font-bold text-amber-900 dark:text-amber-100">
              {impactData.recordedHours.toLocaleString()}
            </div>
            <div className="text-sm text-amber-700 dark:text-amber-300">Recorded Hours</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-sm">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-amber-500 dark:text-amber-400" />
            <div className="text-2xl font-bold text-amber-900 dark:text-amber-100">
              {impactData.documentedWords.toLocaleString()}
            </div>
            <div className="text-sm text-amber-700 dark:text-amber-300">Documented Words</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-amber-900 dark:text-amber-100 mb-3">Community Milestones</h3>
            <div className="space-y-4">
              {impactData.milestones.map((milestone, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-sm font-medium text-amber-800 dark:text-amber-200">{milestone.name}</div>
                    <div className="text-sm text-amber-700 dark:text-amber-300">
                      {milestone.current.toLocaleString()}/{milestone.target.toLocaleString()}
                    </div>
                  </div>
                  <Progress value={milestone.progress} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-amber-900 dark:text-amber-100 mb-3">Recent Achievements</h3>
            <div className="space-y-3">
              {impactData.recentAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm"
                >
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                    <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <div className="font-medium text-amber-900 dark:text-amber-100">{achievement.title}</div>
                    <div className="text-xs text-amber-700 dark:text-amber-300">{achievement.date}</div>
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-3 bg-gradient-to-r from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 p-3 rounded-lg shadow-sm">
                <div className="bg-amber-50 dark:bg-amber-900/50 p-2 rounded-full">
                  <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <div className="font-medium text-amber-900 dark:text-amber-100">Join the preservation effort!</div>
                  <div className="text-xs text-amber-700 dark:text-amber-300">Your contributions make a difference</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

