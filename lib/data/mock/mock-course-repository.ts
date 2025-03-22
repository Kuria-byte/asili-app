import type { Course } from "@/lib/domain/models/course"
import type { CourseRepository } from "@/lib/domain/repositories/course-repository"

const mockCourses: Course[] = [
  {
    id: "1",
    languageId: "1", // Kikuyu
    name: "Kikuyu Basics",
    description:
      "Learn the fundamentals of Kikuyu language including greetings, introductions, and basic conversation.",
    level: "beginner",
    isCurriculumAligned: true,
    curriculumGrade: "Grade 1-3",
    iconUrl: "/images/courses/kikuyu-basics.svg",
    lessonCount: 12,
    estimatedHours: 6,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "2",
    languageId: "1", // Kikuyu
    name: "Kikuyu Conversations",
    description: "Build on your basic knowledge and learn to have everyday conversations in Kikuyu.",
    level: "intermediate",
    isCurriculumAligned: true,
    curriculumGrade: "Grade 4-6",
    iconUrl: "/images/courses/kikuyu-conversations.svg",
    lessonCount: 15,
    estimatedHours: 10,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "3",
    languageId: "2", // Luo
    name: "Luo Basics",
    description: "Start your journey learning Luo with basic vocabulary, greetings, and simple phrases.",
    level: "beginner",
    isCurriculumAligned: true,
    curriculumGrade: "Grade 1-3",
    iconUrl: "/images/courses/luo-basics.svg",
    lessonCount: 10,
    estimatedHours: 5,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "4",
    languageId: "3", // Swahili
    name: "Swahili Foundations",
    description: "Build a strong foundation in Swahili with this comprehensive beginner course.",
    level: "beginner",
    isCurriculumAligned: true,
    curriculumGrade: "Grade 1-3",
    iconUrl: "/images/courses/swahili-foundations.svg",
    lessonCount: 20,
    estimatedHours: 12,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "5",
    languageId: "3", // Swahili
    name: "Swahili Intermediate",
    description: "Take your Swahili to the next level with more complex grammar and vocabulary.",
    level: "intermediate",
    isCurriculumAligned: true,
    curriculumGrade: "Grade 4-6",
    iconUrl: "/images/courses/swahili-intermediate.svg",
    lessonCount: 18,
    estimatedHours: 15,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "6",
    languageId: "3", // Swahili
    name: "Swahili Advanced",
    description: "Master Swahili with advanced topics, cultural nuances, and complex conversation patterns.",
    level: "advanced",
    isCurriculumAligned: true,
    curriculumGrade: "Grade 7-8",
    iconUrl: "/images/courses/swahili-advanced.svg",
    lessonCount: 15,
    estimatedHours: 20,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
]

export class MockCourseRepository implements CourseRepository {
  async getAllByLanguage(languageId: string): Promise<Course[]> {
    return mockCourses.filter((course) => course.languageId === languageId)
  }

  async getById(id: string): Promise<Course | null> {
    return mockCourses.find((course) => course.id === id) || null
  }

  async getRecommended(userId: string): Promise<Course[]> {
    // In a real implementation, this would use user preferences and progress
    // For mock data, we'll just return a subset of courses
    return mockCourses.slice(0, 3)
  }
}

