import Link from "next/link"
import { ArrowLeft, Volume2, CheckCircle, Clock } from "lucide-react"
import { ModeToggle } from "@/components/theme-toggle"
import { BottomNav } from "@/components/navigation/bottom-nav"

interface LessonPageProps {
  params: {
    id: string
  }
}

export default function LessonPage({ params }: LessonPageProps) {
  // Extract course and lesson IDs from the lesson ID
  const [courseId, lessonNumber] = params.id.split("-")

  // This would normally come from your data source
  const lessons = {
    "1-1": {
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
      content: [
        {
          type: "text",
          content: "In this lesson, you'll learn how to greet people in Kikuyu and introduce yourself.",
        },
        {
          type: "phrase",
          phrase: "Ūhoro waku",
          translation: "How are you",
          audio: "/audio/kikuyu/uhoro-waku.mp3",
        },
        {
          type: "phrase",
          phrase: "Nĩ mwega",
          translation: "I am fine",
          audio: "/audio/kikuyu/ni-mwega.mp3",
        },
        {
          type: "phrase",
          phrase: "Nĩ wega",
          translation: "Thank you",
          audio: "/audio/kikuyu/ni-wega.mp3",
        },
        {
          type: "text",
          content: "Now let's learn how to introduce yourself.",
        },
        {
          type: "phrase",
          phrase: "Ndĩtagwo [name]",
          translation: "My name is [name]",
          audio: "/audio/kikuyu/nditagwo.mp3",
        },
        {
          type: "phrase",
          phrase: "Ndĩ mũgeni",
          translation: "I am a visitor/stranger",
          audio: "/audio/kikuyu/ndi-mugeni.mp3",
        },
      ],
      quiz: [
        {
          question: "How do you say 'How are you' in Kikuyu?",
          options: ["Nĩ mwega", "Ūhoro waku", "Nĩ wega", "Ndĩtagwo"],
          correctAnswer: "Ūhoro waku",
        },
        {
          question: "What does 'Nĩ mwega' mean?",
          options: ["How are you", "I am fine", "Thank you", "My name is"],
          correctAnswer: "I am fine",
        },
      ],
    },
    "1-2": {
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
      content: [
        {
          type: "text",
          content: "Let's learn how to count from 1 to 10 in Kikuyu.",
        },
        {
          type: "phrase",
          phrase: "Ĩmwe",
          translation: "One",
          audio: "/audio/kikuyu/imwe.mp3",
        },
        {
          type: "phrase",
          phrase: "Igĩrĩ",
          translation: "Two",
          audio: "/audio/kikuyu/igiri.mp3",
        },
        {
          type: "phrase",
          phrase: "Ithatũ",
          translation: "Three",
          audio: "/audio/kikuyu/ithatu.mp3",
        },
        {
          type: "phrase",
          phrase: "Inya",
          translation: "Four",
          audio: "/audio/kikuyu/inya.mp3",
        },
        {
          type: "phrase",
          phrase: "Ithano",
          translation: "Five",
          audio: "/audio/kikuyu/ithano.mp3",
        },
        {
          type: "phrase",
          phrase: "Ithatatu",
          translation: "Six",
          audio: "/audio/kikuyu/ithatatu.mp3",
        },
        {
          type: "phrase",
          phrase: "Mũgwanja",
          translation: "Seven",
          audio: "/audio/kikuyu/mugwanja.mp3",
        },
        {
          type: "phrase",
          phrase: "Inyanya",
          translation: "Eight",
          audio: "/audio/kikuyu/inyanya.mp3",
        },
        {
          type: "phrase",
          phrase: "Kenda",
          translation: "Nine",
          audio: "/audio/kikuyu/kenda.mp3",
        },
        {
          type: "phrase",
          phrase: "Ikũmi",
          translation: "Ten",
          audio: "/audio/kikuyu/ikumi.mp3",
        },
      ],
      quiz: [
        {
          question: "What is the Kikuyu word for 'Five'?",
          options: ["Ithano", "Inya", "Ithatũ", "Ikũmi"],
          correctAnswer: "Ithano",
        },
        {
          question: "How do you say 'Seven' in Kikuyu?",
          options: ["Inyanya", "Mũgwanja", "Ithatatu", "Kenda"],
          correctAnswer: "Mũgwanja",
        },
      ],
    },
    "1-3": {
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
      content: [
        {
          type: "text",
          content:
            "In this lesson, we'll learn some basic phrases that will help you in everyday conversations in Kikuyu.",
        },
        {
          type: "phrase",
          phrase: "Ũrĩ hau?",
          translation: "Are you there? (Hello on phone)",
          audio: "/audio/kikuyu/uri-hau.mp3",
        },
        {
          type: "phrase",
          phrase: "Ĩĩ, ndĩ haha",
          translation: "Yes, I am here",
          audio: "/audio/kikuyu/ii-ndi-haha.mp3",
        },
        {
          type: "phrase",
          phrase: "Nĩ ngwenda gũthiĩ",
          translation: "I want to go",
          audio: "/audio/kikuyu/ni-ngwenda-guthii.mp3",
        },
        {
          type: "phrase",
          phrase: "Nĩndakena gũkuona",
          translation: "I'm happy to see you",
          audio: "/audio/kikuyu/nindakena-gukuona.mp3",
        },
        {
          type: "phrase",
          phrase: "Ũrĩ mũhoro?",
          translation: "How are you? (formal)",
          audio: "/audio/kikuyu/uri-muhoro.mp3",
        },
        {
          type: "phrase",
          phrase: "Woka rĩ?",
          translation: "When did you come/arrive?",
          audio: "/audio/kikuyu/woka-ri.mp3",
        },
      ],
      quiz: [
        {
          question: "What does 'Nĩndakena gũkuona' mean?",
          options: ["I want to go", "I'm happy to see you", "When did you come?", "How are you?"],
          correctAnswer: "I'm happy to see you",
        },
        {
          question: "How do you say 'Yes, I am here' in Kikuyu?",
          options: ["Ũrĩ hau?", "Ĩĩ, ndĩ haha", "Nĩ ngwenda gũthiĩ", "Woka rĩ?"],
          correctAnswer: "Ĩĩ, ndĩ haha",
        },
      ],
    },
  }

  const lesson = lessons[params.id as keyof typeof lessons]

  if (!lesson) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-cream">
        <h1 className="text-2xl font-serif text-amber-950">Lesson not found</h1>
        <Link href="/lessons" className="mt-4 text-amber-700 hover:underline">
          Return to lessons
        </Link>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-cream pb-20">
      <header className="sticky top-0 z-10 border-b border-amber-100 bg-cream/95 backdrop-blur-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/lessons" className="inline-flex items-center text-amber-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="text-sm">Back to Lessons</span>
          </Link>
          <ModeToggle />
        </div>
      </header>

      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          {/* Lesson Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs text-amber-700 mb-2">
              <span>{lesson.language}</span>
              <span>•</span>
              <span>{lesson.courseName}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{lesson.duration} min</span>
              </div>
            </div>
            <h1 className="font-serif text-2xl text-amber-950 mb-1">{lesson.title}</h1>
            {lesson.completed ? (
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Completed • {lesson.xpEarned} XP earned</span>
              </div>
            ) : (
              <p className="text-sm text-amber-700">Complete this lesson to earn XP</p>
            )}
          </div>

          {/* Lesson Content */}
          <div className="mb-8 space-y-6">
            {lesson.content.map((item, index) => (
              <div key={index}>
                {item.type === "text" ? (
                  <p className="text-amber-900">{item.content}</p>
                ) : item.type === "phrase" ? (
                  <div className="overflow-hidden rounded-xl border border-amber-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1 phrase-card">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-medium text-amber-950">{item.phrase}</p>
                        <p className="text-sm text-amber-700">{item.translation}</p>
                      </div>
                      <button
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700 transition-all duration-200 hover:bg-amber-200 hover:scale-110 active:scale-95 audio-button"
                        aria-label={`Listen to pronunciation of ${item.phrase}`}
                      >
                        <Volume2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          {/* Quiz Section */}
          {lesson.quiz && (
            <div className="mb-8">
              <h2 className="mb-4 font-serif text-xl text-amber-950">Test Your Knowledge</h2>
              <div className="space-y-6">
                {lesson.quiz.map((quizItem, index) => (
                  <div key={index} className="rounded-xl border border-amber-100 bg-white p-4 shadow-sm">
                    <h3 className="mb-3 font-medium text-amber-950">{quizItem.question}</h3>
                    <div className="space-y-2">
                      {quizItem.options.map((option, optIndex) => {
                        const isCorrect = option === quizItem.correctAnswer
                        return (
                          <div
                            key={optIndex}
                            className={`flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors ${lesson.completed ? (isCorrect ? "bg-green-100" : "bg-white") : "bg-white hover:bg-amber-50"}`}
                          >
                            <span
                              className={
                                lesson.completed && isCorrect ? "font-medium text-green-700" : "text-amber-900"
                              }
                            >
                              {option}
                            </span>
                            {lesson.completed && isCorrect && <CheckCircle className="h-5 w-5 text-green-700" />}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lesson Complete/Next Section */}
          <div className="rounded-xl bg-white p-6 border border-amber-100 text-center">
            {lesson.completed ? (
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700 mx-auto">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h2 className="mb-2 font-serif text-xl text-amber-950">Lesson Completed!</h2>
                <p className="mb-4 text-sm text-amber-700">
                  You've earned {lesson.xpEarned} XP for completing this lesson
                </p>
                <div className="flex justify-center gap-3">
                  <Link
                    href={`/lessons/${Number.parseInt(lessonNumber) + 1 <= 3 ? `${courseId}-${Number.parseInt(lessonNumber) + 1}` : params.id}`}
                    className="inline-block rounded-full bg-amber-700 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-800"
                  >
                    Next Lesson
                  </Link>
                  <Link
                    href="/lessons"
                    className="inline-block rounded-full bg-white px-6 py-2 text-sm font-medium text-amber-700 border border-amber-200 transition-colors hover:bg-amber-50"
                  >
                    All Lessons
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="mb-2 font-serif text-xl text-amber-950">Ready to Test Your Knowledge?</h2>
                <p className="mb-4 text-sm text-amber-700">Complete the quiz to earn XP and track your progress</p>
                <button
                  className="inline-block rounded-full bg-amber-700 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-800"
                  aria-label="Complete lesson"
                >
                  Complete Lesson
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activePath="lessons" />
    </div>
  )
}

