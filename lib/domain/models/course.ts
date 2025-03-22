export interface Course {
  id: string
  languageId: string
  name: string
  description: string
  level: "beginner" | "intermediate" | "advanced"
  isCurriculumAligned: boolean
  curriculumGrade?: string
  iconUrl?: string
  lessonCount: number
  estimatedHours: number
  createdAt: Date
  updatedAt: Date
}

