import type { Course } from "../models/course"

export interface CourseRepository {
  getAllByLanguage(languageId: string): Promise<Course[]>
  getById(id: string): Promise<Course | null>
  getRecommended(userId: string): Promise<Course[]>
}

