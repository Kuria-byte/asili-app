import { MockCourseRepository } from "../data/mock/mock-course-repository"
import { MockLanguageRepository } from "../data/mock/mock-language-repository"
import { MockUserRepository } from "../data/mock/mock-user-repository"
import { CourseService } from "../domain/services/course-service"
import { LanguageService } from "../domain/services/language-service"
import { UserService } from "../domain/services/user-service"

// Repositories
const languageRepository = new MockLanguageRepository()
const courseRepository = new MockCourseRepository()
const userRepository = new MockUserRepository()

// Services
const languageService = new LanguageService(languageRepository)
const courseService = new CourseService(courseRepository)
const userService = new UserService(userRepository)

export const container = {
  languageService,
  courseService,
  userService,
}

