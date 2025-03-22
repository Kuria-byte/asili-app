import type { Course } from "../models/course"
import type { CourseRepository } from "../repositories/course-repository"

export class CourseService {
  constructor(private repository: CourseRepository) {}

  async getCoursesByLanguage(languageId: string): Promise<Course[]> {
    return this.repository.getAllByLanguage(languageId)
  }

  async getCourseById(id: string): Promise<Course | null> {
    return this.repository.getById(id)
  }

  async getRecommendedCourses(userId: string): Promise<Course[]> {
    return this.repository.getRecommended(userId)
  }

  async getCoursesByLevel(languageId: string, level: "beginner" | "intermediate" | "advanced"): Promise<Course[]> {
    const courses = await this.repository.getAllByLanguage(languageId)
    return courses.filter((course) => course.level === level)
  }
}

