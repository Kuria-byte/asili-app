import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Crown, MessageCircle, Calendar, Bell } from "lucide-react"

export function CommunityHeader() {
  return (
    <div className="relative rounded-xl overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('/placeholder.svg?height=400&width=800')",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(245, 158, 11, 0.1)",
        }}
      />

      <div className="relative z-10 p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-amber-900 dark:text-amber-100">Asili Community</h1>
            <p className="text-lg text-amber-700 dark:text-amber-300 mt-1">Preserving Kenya's Languages Together</p>
          </div>

          <div className="flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 p-2 rounded-lg shadow-sm">
            <div className="flex items-center gap-1.5">
              <Crown className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium">Contributor</span>
            </div>
            <Badge
              variant="outline"
              className="bg-amber-100/50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200"
            >
              Level 3
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          <Button size="sm" variant="secondary" className="rounded-full">
            <MessageCircle className="h-4 w-4 mr-1.5" />
            Messages
          </Button>
          <Button size="sm" variant="secondary" className="rounded-full">
            <Calendar className="h-4 w-4 mr-1.5" />
            My Events
          </Button>
          <Button size="sm" variant="secondary" className="rounded-full">
            <Bell className="h-4 w-4 mr-1.5" />
            Notifications
          </Button>
        </div>
      </div>
    </div>
  )
}

