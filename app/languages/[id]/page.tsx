import Link from "next/link"
import Image from "next/image"
import { Volume2, ChevronRight } from "lucide-react"
import { ModeToggle } from "@/components/theme-toggle"
import { BottomNav } from "@/components/navigation/bottom-nav"

interface LanguagePageProps {
  params: {
    id: string
  }
}

export default function LanguagePage({ params }: LanguagePageProps) {
  // This would normally come from your data source
  const languages = {
    kikuyu: {
      name: "Kikuyu",
      region: "Central Kenya",
      description:
        "Kikuyu is a Bantu language spoken primarily by the Kikuyu people of Kenya. It is the most widely spoken indigenous language in Kenya, with over 8.5 million speakers. The language is closely related to other Bantu languages in the region and is known for its rich oral tradition and cultural significance.",
      speakers: "8.5 million",
      difficulty: "Moderate",
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1000",
      patternImage: "https://images.unsplash.com/photo-1591377176347-a4e99ba5dd6a?q=80&w=1000",
      culturalImage: "https://images.unsplash.com/photo-1580323956656-26bbb1206e34?q=80&w=1000",
      commonPhrases: [
        { phrase: "Ūhoro waku", meaning: "How are you", audio: "/audio/kikuyu/uhoro-waku.mp3" },
        { phrase: "Nĩ mwega", meaning: "I am fine", audio: "/audio/kikuyu/ni-mwega.mp3" },
        { phrase: "Nĩ wega", meaning: "Thank you", audio: "/audio/kikuyu/ni-wega.mp3" },
      ],
      courses: [
        { id: "1", name: "Kikuyu Basics", level: "Beginner", lessons: 12, duration: "6 weeks" },
        { id: "2", name: "Conversational Kikuyu", level: "Intermediate", lessons: 15, duration: "8 weeks" },
      ],
    },
    luo: {
      name: "Luo",
      region: "Western Kenya",
      description:
        "Luo is a Nilotic language spoken by the Luo people of western Kenya and northern Tanzania. It is the third most widely spoken language in Kenya, with approximately 4.2 million speakers. The language is known for its tonal qualities and rich cultural heritage, including music, poetry, and storytelling.",
      speakers: "4.2 million",
      difficulty: "Moderate",
      image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=1000",
      patternImage: "https://images.unsplash.com/photo-1591377176347-a4e99ba5dd6a?q=80&w=1000",
      culturalImage: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1000",
      commonPhrases: [
        { phrase: "Nade", meaning: "How are you", audio: "/audio/luo/nade.mp3" },
        { phrase: "Aber", meaning: "I am fine", audio: "/audio/luo/aber.mp3" },
        { phrase: "Erokamano", meaning: "Thank you", audio: "/audio/luo/erokamano.mp3" },
      ],
      courses: [{ id: "3", name: "Luo Foundations", level: "Beginner", lessons: 10, duration: "5 weeks" }],
    },
    swahili: {
      name: "Swahili",
      region: "Coastal Kenya",
      description:
        "Swahili is a Bantu language that serves as a lingua franca of the African Great Lakes region and other parts of East Africa. It is one of Kenya's official languages and is widely spoken along the coast. With influences from Arabic, Persian, Portuguese, and other languages, Swahili has a rich vocabulary and cultural heritage.",
      speakers: "15 million",
      difficulty: "Easy",
      image: "https://images.unsplash.com/photo-1548813831-7aa2d6f4090d?q=80&w=1000",
      patternImage: "https://images.unsplash.com/photo-1591377176347-a4e99ba5dd6a?q=80&w=1000",
      culturalImage: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1000",
      commonPhrases: [
        { phrase: "Habari yako", meaning: "How are you", audio: "/audio/swahili/habari-yako.mp3" },
        { phrase: "Nzuri", meaning: "I am fine", audio: "/audio/swahili/nzuri.mp3" },
        { phrase: "Asante", meaning: "Thank you", audio: "/audio/swahili/asante.mp3" },
      ],
      courses: [
        { id: "4", name: "Swahili Basics", level: "Beginner", lessons: 12, duration: "6 weeks" },
        { id: "5", name: "Intermediate Swahili", level: "Intermediate", lessons: 15, duration: "8 weeks" },
        { id: "6", name: "Advanced Swahili", level: "Advanced", lessons: 10, duration: "10 weeks" },
      ],
    },
    kamba: {
      name: "Kamba",
      region: "Eastern Kenya",
      description:
        "Kamba is a Bantu language spoken by the Kamba people of Kenya, primarily in the southeastern part of the country. With approximately 4 million speakers, it is one of Kenya's major languages. The Kamba language is known for its rich vocabulary and expressive idioms that reflect the community's agricultural heritage and cultural practices.",
      speakers: "4 million",
      difficulty: "Moderate",
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1000",
      patternImage: "https://images.unsplash.com/photo-1591377176347-a4e99ba5dd6a?q=80&w=1000",
      culturalImage: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1000",
      commonPhrases: [
        { phrase: "Uvoo waku", meaning: "How are you", audio: "/audio/kamba/uvoo-waku.mp3" },
        { phrase: "Ni museo", meaning: "I am fine", audio: "/audio/kamba/ni-museo.mp3" },
        { phrase: "Ni vea", meaning: "Thank you", audio: "/audio/kamba/ni-vea.mp3" },
      ],
      courses: [{ id: "7", name: "Kamba Essentials", level: "Beginner", lessons: 10, duration: "5 weeks" }],
    },
  }

  const language = languages[params.id as keyof typeof languages]

  if (!language) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-cream">
        <h1 className="text-2xl font-serif text-amber-950">Language not found</h1>
        <Link href="/" className="mt-4 text-amber-700 hover:underline">
          Return home
        </Link>
      </div>
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-700"
      case "moderate":
        return "bg-blue-100 text-blue-700"
      case "difficult":
        return "bg-red-100 text-red-700"
      default:
        return "bg-neutral-100 text-neutral-700"
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-cream pb-20">
      <header className="sticky top-0 z-10 border-b border-amber-100 bg-cream/95 backdrop-blur-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="font-serif text-xl text-amber-950">{language.name}</h1>
          <ModeToggle />
        </div>
      </header>

      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="relative mb-8 overflow-hidden rounded-2xl">
            <div className="relative h-64 w-full sm:h-80">
              <Image
                src={language.image || "/placeholder.svg"}
                alt={`${language.name} landscape`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <div
                  className={`mb-3 inline-block rounded-full px-3 py-1 text-xs font-medium ${getDifficultyColor(language.difficulty)}`}
                >
                  {language.difficulty}
                </div>
                <p className="text-sm text-white/80">{language.region}</p>
                <p className="mt-1 text-sm text-white/80">{language.speakers} native speakers</p>
              </div>
            </div>
          </div>

          {/* Language Description */}
          <div className="mb-8">
            <h2 className="mb-3 font-serif text-xl text-amber-950">About {language.name}</h2>
            <p className="text-amber-900">{language.description}</p>
          </div>

          {/* Common Phrases */}
          <div className="mb-8">
            <h2 className="mb-4 font-serif text-xl text-amber-950">Common Phrases</h2>
            <div className="space-y-3">
              {language.commonPhrases.map((phrase, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border border-amber-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1 phrase-card"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-amber-950">{phrase.phrase}</p>
                      <p className="text-sm text-amber-700">{phrase.meaning}</p>
                    </div>
                    <button
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700 transition-all duration-200 hover:bg-amber-200 hover:scale-110 active:scale-95 audio-button"
                      aria-label={`Listen to pronunciation of ${phrase.phrase}`}
                    >
                      <Volume2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Available Courses */}
          <div className="mb-8">
            <h2 className="mb-4 font-serif text-xl text-amber-950">Available Courses</h2>
            <div className="space-y-3">
              {language.courses.map((course) => (
                <Link key={course.id} href={`/courses/${course.id}`}>
                  <div className="overflow-hidden rounded-xl border border-amber-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-amber-950">{course.name}</h3>
                        <div className="mt-1 flex flex-wrap gap-3">
                          <span className="text-xs text-amber-700">{course.level}</span>
                          <span className="text-xs text-amber-700">{course.lessons} lessons</span>
                          <span className="text-xs text-amber-700">{course.duration}</span>
                        </div>
                      </div>
                      <div className="transition-transform duration-200 group-hover:translate-x-1">
                        <ChevronRight className="h-5 w-5 text-amber-500" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Cultural Context */}
          <div className="mb-8 rounded-xl bg-white p-6 border border-amber-100">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="relative h-full min-h-[200px] rounded-lg overflow-hidden">
                  <Image
                    src={language.culturalImage || "/placeholder.svg"}
                    alt="Cultural context"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="mb-3 font-serif text-xl text-amber-950">Cultural Context</h2>
                <p className="text-amber-900">
                  Learning {language.name} connects you with the rich cultural heritage of the {language.region}. The
                  language reflects the values, traditions, and worldview of its speakers, offering insights into their
                  way of life, social structures, and historical experiences.
                </p>
                <p className="mt-3 text-amber-900">
                  By mastering {language.name}, you'll gain a deeper understanding of Kenyan culture and be able to
                  engage more meaningfully with native speakers and their communities.
                </p>
              </div>
            </div>
          </div>

          {/* Start Learning CTA */}
          <div className="rounded-xl bg-amber-50 p-6 text-center border border-amber-100">
            <h2 className="mb-2 font-serif text-xl text-amber-950">Ready to start learning {language.name}?</h2>
            <p className="mb-4 text-sm text-amber-700">
              Choose a course to begin your journey with this beautiful language
            </p>
            <Link
              href={`/courses/${language.courses[0].id}`}
              className="inline-block rounded-full bg-amber-700 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-800"
            >
              Start Learning
            </Link>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activePath="languages" />
    </div>
  )
}

