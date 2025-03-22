import Link from "next/link"
import Image from "next/image"
import { Search, BookOpen, Clock, CheckCircle, ChevronRight } from "lucide-react"
import { ModeToggle } from "@/components/theme-toggle"
import { BottomNav } from "@/components/navigation/bottom-nav"

export default function LessonsPage() {
  // Mock data for user's active courses
  const activeCourses = [
    {
      id: "1",
      name: "Kikuyu Basics",
      language: "Kikuyu",
      languageId: "kikuyu",
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1000",
      progress: 40,
      nextLesson: {
        id: "1-3",
        title: "Basic Phrases",
        duration: 25,
      },
    },
    {
      id: "4",
      name: "Swahili Foundations",
      language: "Swahili",
      languageId: "swahili",
      image: "https://images.unsplash.com/photo-1548813831-7aa2d6f4090d?q=80&w=1000",
      progress: 25,
      nextLesson: {
        id: "4-2",
        title: "Common Greetings",
        duration: 20,
      },
    },
  ]

  // Mock data for all available lessons
  const allLessons = [
    {
      id: "1-1",
      courseId: "1",
      title: "Greetings and Introductions",
      language: "Kikuyu",
      languageId: "kikuyu",
      duration: 15,
      completed: true,
      xpEarned: 25,
      courseName: "Kikuyu Basics",
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1000",
    },
    {
      id: "1-2",
      courseId: "1",
      title: "Numbers 1-10",
      language: "Kikuyu",
      languageId: "kikuyu",
      duration: 20,
      completed: true,
      xpEarned: 20,
      courseName: "Kikuyu Basics",
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1000",
    },
    {
      id: "1-3",
      courseId: "1",
      title: "Basic Phrases",
      language: "Kikuyu",
      languageId: "kikuyu",
      duration: 25,
      completed: false,
      xpEarned: 0,
      courseName: "Kikuyu Basics",
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1000",
    },
    {
      id: "4-1",
      courseId: "4",
      title: "Introduction to Swahili",
      language: "Swahili",
      languageId: "swahili",
      duration: 15,
      completed: true,
      xpEarned: 25,
      courseName: "Swahili Foundations",
      image: "https://images.unsplash.com/photo-1548813831-7aa2d6f4090d?q=80&w=1000",
    },
    {
      id: "4-2",
      courseId: "4",
      title: "Common Greetings",
      language: "Swahili",
      languageId: "swahili",
      duration: 20,
      completed: false,
      xpEarned: 0,
      courseName: "Swahili Foundations",
      image: "https://images.unsplash.com/photo-1548813831-7aa2d6f4090d?q=80&w=1000",
    },
  ]

  // Group lessons by course
  const lessonsByLanguage = allLessons.reduce(
    (acc, lesson) => {
      if (!acc[lesson.language]) {
        acc[lesson.language] = []
      }
      acc[lesson.language].push(lesson)
      return acc
    },
    {} as Record<string, typeof allLessons>,
  )

  return (
    <div className="flex min-h-screen flex-col bg-cream pb-20">
      <header className="sticky top-0 z-10 border-b border-amber-100 bg-cream/95 backdrop-blur-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="font-serif text-xl text-amber-950">Lessons</h1>
          <ModeToggle />
        </div>
      </header>

      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="mb-6 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search lessons..."
                className="w-full rounded-full border border-amber-200 bg-white py-2 pl-10 pr-4 text-sm text-amber-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                aria-label="Search lessons"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-400" />
            </div>
          </div>

          {/* Continue Learning */}
          <div className="mb-8">
            <h2 className="mb-4 font-serif text-lg text-amber-950">Continue Learning</h2>
            <div className="space-y-4">
              {activeCourses.map((course) => (
                <div key={course.id} className="overflow-hidden rounded-xl border border-amber-100 bg-white shadow-sm">
                  <div className="relative h-16 sm:h-20">
                    <Image src={course.image || "/placeholder.svg"} alt={course.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center p-4">
                      <div>
                        <h3 className="font-serif text-white">{course.language}</h3>
                        <p className="text-xs text-white/80">{course.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs text-amber-700">Progress: {course.progress}%</span>
                      <span className="text-xs text-amber-700">Next lesson</span>
                    </div>
                    <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-amber-100">
                      <div className="h-full rounded-full bg-amber-500" style={{ width: `${course.progress}%` }}></div>
                    </div>

                    <Link href={`/lessons/${course.nextLesson.id}`}>
                      <div className="flex items-center justify-between rounded-lg bg-amber-50 p-3 transition-colors hover:bg-amber-100">
                        <div>
                          <p className="font-medium text-amber-900">{course.nextLesson.title}</p>
                          <div className="flex items-center gap-2 text-xs text-amber-700">
                            <Clock className="h-3 w-3" />
                            <span>{course.nextLesson.duration} minutes</span>
                          </div>
                        </div>
                        <div className="rounded-full bg-amber-500 p-2 text-white">
                          <BookOpen className="h-4 w-4" />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Lessons */}
          <div>
            <h2 className="mb-4 font-serif text-lg text-amber-950">All Lessons</h2>

            {Object.entries(lessonsByLanguage).map(([language, lessons]) => (
              <div key={language} className="mb-6">
                <h3 className="mb-3 font-medium text-amber-900">{language}</h3>
                <div className="space-y-3">
                  {lessons.map((lesson) => (
                    <Link key={lesson.id} href={`/lessons/${lesson.id}`}>
                      <div
                        className={`overflow-hidden rounded-xl border ${lesson.completed ? "border-green-200 bg-green-50" : "border-amber-100 bg-white"} p-4 shadow-sm transition-all hover:shadow-md`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full ${lesson.completed ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
                            >
                              {lesson.completed ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : (
                                <BookOpen className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-amber-950">{lesson.title}</h4>
                              <p className="text-xs text-amber-700">{lesson.courseName}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-xs text-amber-700">
                              <Clock className="h-3 w-3" />
                              <span>{lesson.duration} min</span>
                            </div>
                            {lesson.completed ? (
                              <div className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                                +{lesson.xpEarned} XP
                              </div>
                            ) : (
                              <ChevronRight className="h-5 w-5 text-amber-500" />
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activePath="lessons" />
    </div>
  )
}

