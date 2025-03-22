export interface Progress {
  id: string
  userId: string
  lessonId: string
  status: "not_started" | "in_progress" | "completed"
  score: number
  completionDate?: Date
  xpEarned: number
  streakMaintained: boolean
  createdAt: Date
  updatedAt: Date
}

