export interface Language {
  id: string
  name: string
  code: string
  region: string
  isActive: boolean
  description: string
  introVideoUrl?: string
  iconUrl?: string
  speakerCount: number
  difficulty: "beginner" | "intermediate" | "advanced"
  createdAt: Date
  updatedAt: Date
}

