import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, Play, CheckCircle } from "lucide-react"

interface CoursePageProps {
  params: {
    id: string
  }
}

export default function CoursePage({ params }: CoursePageProps) {
  // This would normally come from your data source
  const courses = {
    "1": {
      id: "1",
      name: "Kikuyu Basics",
      language: "Kikuyu",
      languageId: "kikuyu",
      description:
        "Learn the fundamentals of Kikuyu language including greetings, introductions, and basic conversation.",
      level: "Beginner",
      duration: "6 weeks",
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1000",
      progress: 40,
      lessons: [
        { id: "1-1", title: "Greetings and Introductions", duration: 15, completed: true },
        { id: "1-2", title: "Numbers 1-10", duration: 20, completed: true },
        { id: "1-3", title: "Basic Phrases", duration: 25, completed: false },
        { id: "1-4", title: "Family Members", duration: 30, completed: false },
        { id: "1-5", title: "Food and Dining", duration: 25, completed: false },
      ],
    },
    "2": {
      id: "2",
      name: "Conversational Kikuyu",
      language: "Kikuyu",
      languageId: "kikuyu",
      description: "Build on your basic knowledge and learn to have everyday conversations in Kikuyu.",
      level: "Intermediate",
      duration: "8 weeks",
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1000",
      progress: 0,
      lessons: [
        { id: "2-1", title: "Everyday Conversations", duration: 25, completed: false },
        { id: "2-2", title: "Shopping and Bargaining", duration: 30, completed: false },
        { id: "2-3", title: "Asking for Directions", duration: 20, completed: false },
        { id: "2-4", title: "Weather and Seasons", duration: 25, completed: false },
        { id: "2-5", title: "Celebrations and Traditions", duration: 35, completed: false },
      ],
    },
    "3": {
      id: "3",
      name: "Luo Foundations",
      language: "Luo",
      languageId: "luo",
      description: "Start your journey learning Luo with basic vocabulary, greetings, and simple phrases.",
      level: "Beginner",
      duration: "5 weeks",
      image: "https://images.unsplash.com/photo-1504432842672-1a79f78e4084?q=80&w=1000",
      progress: 20,
      lessons: [
        { id: "3-1", title: "Basic Greetings", duration: 15, completed: true },
        { id: "3-2", title: "Introducing Yourself", duration: 20, completed: false },
        { id: "3-3", title: "Numbers and Counting", duration: 25, completed: false },
        { id: "3-4", title: "Common Questions", duration: 20, completed: false },
        { id: "3-5", title: "Daily Activities", duration: 25, completed: false },
      ],
    },
  }

  const course = courses[params.id as keyof typeof courses]

  if (!course) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-cream">
        <h1 className="text-2xl font-serif text-amber-950">Course not found</h1>
        <Link href="/" className="mt-4 text-amber-700 hover:underline">
          Return home
        </Link>
      </div>
    )
  }

  const completedLessons = course.lessons.filter((lesson) => lesson.completed).length

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <header className="border-b border-amber-100 py-4">
        <div className="container mx-auto px-4">
          <Link href={`/languages/${course.languageId}`} className="inline-flex items-center text-amber-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="text-sm">Back to {course.language}</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="relative mb-8 overflow-hidden rounded-2xl">
            <div className="relative h-48 w-full sm:h-64">
              <Image src={course.image || "/placeholder.svg"} alt={course.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <div className="mb-3 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                  {course.level}
                </div>
                <h1 className="font-serif text-2xl text-white sm:text-3xl">{course.name}</h1>
                <p className="text-sm text-white/80">
                  {course.language} • {course.duration}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="mb-8 rounded-xl border border-amber-100 bg-white p-6">
            <h2 className="mb-3 font-serif text-xl text-amber-950">Your Progress</h2>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-amber-700">
                {completedLessons} of {course.lessons.length} lessons completed
              </span>
              <span className="font-medium text-amber-900">{course.progress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-amber-100">
              <div className="h-full rounded-full bg-amber-500" style={{ width: `${course.progress}%` }}></div>
            </div>

            <div className="mt-4 flex justify-center">
              <Link
                href={`/lessons/${course.lessons.find((l) => !l.completed)?.id || course.lessons[0].id}`}
                className="inline-block rounded-full bg-amber-700 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-800"
              >
                {completedLessons > 0 ? "Continue Learning" : "Start Learning"}
              </Link>
            </div>
          </div>

          {/* Course Description */}
          <div className="mb-8">
            <h2 className="mb-3 font-serif text-xl text-amber-950">About this Course</h2>
            <p className="text-amber-900">{course.description}</p>
          </div>

          {/* Lessons */}
          <div className="mb-8">
            <h2 className="mb-4 font-serif text-xl text-amber-950">Course Content</h2>
            <div className="space-y-3">
              {course.lessons.map((lesson, index) => (
                <Link key={lesson.id} href={`/lessons/${lesson.id}`}>
                  <div
                    className={`overflow-hidden rounded-xl border ${lesson.completed ? "border-green-200 bg-green-50" : "border-amber-100 bg-white"} p-4 shadow-sm transition-all hover:shadow-md`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${lesson.completed ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
                        >
                          {lesson.completed ? <CheckCircle className="h-5 w-5" /> : <span>{index + 1}</span>}
                        </div>
                        <div>
                          <h3 className="font-medium text-amber-950">{lesson.title}</h3>
                          <div className="flex items-center gap-2 text-xs text-amber-700">
                            <Clock className="h-3 w-3" />
                            <span>{lesson.duration} minutes</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                        {lesson.completed ? <Play className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Cultural Context */}
          <div className="mb-8 rounded-xl border border-amber-100 bg-white p-6">
            <h2 className="mb-3 font-serif text-xl text-amber-950">Cultural Context</h2>
            <p className="text-amber-900">
              This course not only teaches you the {course.language} language but also provides insights into the
              cultural context in which it is spoken. You'll learn about traditions, customs, and social norms that will
              help you communicate more effectively and respectfully.
            </p>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-amber-100 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around">
            <Link href="/" className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-amber-700"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span className="mt-1 text-xs text-amber-700">Home</span>
            </Link>

            <Link href="/languages" className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-amber-700"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m2 12 20 0" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span className="mt-1 text-xs text-amber-700">Languages</span>
            </Link>

            <Link href="/lessons" className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-amber-500"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
              <span className="mt-1 text-xs text-amber-500 font-medium">Lessons</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

