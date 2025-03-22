"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, BookOpen, Award, BarChart2 } from "lucide-react"
import { motion } from "framer-motion"
import { BottomNav } from "@/components/navigation/bottom-nav"
import { ClientOnly } from "@/components/client-only"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InteractiveCulturalImage } from "@/components/interactive-cultural-image"
import { DynamicGoalsTracker } from "@/components/dynamic-goals-tracker"
import { TodaysLearning } from "@/components/todays-learning"
import { CulturalInsight } from "@/components/cultural-insight"
import { EnhancedStoryLearning } from "@/components/enhanced-story-learning"
import { CommunitySection } from "@/components/community-section"
import { PageTransition } from "@/components/page-transition"
import { PulsingProgressBar } from "@/components/ui/pulsing-progress-bar"
import { Heading, Text, SectionTitle } from "@/components/ui/typography"
import { EnhancedHeroSection } from "@/components/enhanced-hero-section"
import { XpIcon } from "@/components/ui/xp-icon"
import { StreakIcon } from "@/components/ui/streak-icon"

export default function Home() {
  // Mock data for featured languages
  const featuredLanguages = [
    {
      id: "kikuyu",
      name: "Kikuyu",
      region: "Central Kenya",
      image: "/images/languages/kikuyu.jpg",
      difficulty: "Moderate",
      speakers: "8.5 million",
      progress: 40,
    },
    {
      id: "swahili",
      name: "Swahili",
      region: "Coastal Kenya",
      image: "/images/languages/swahili.jpg",
      difficulty: "Easy",
      speakers: "15 million",
      progress: 25,
    },
    {
      id: "luo",
      name: "Luo",
      region: "Western Kenya",
      image: "/images/lake-victoria-2.jpg",
      difficulty: "Moderate",
      speakers: "4.2 million",
      progress: 0,
    },
  ]

  // Mock data for daily goals
  const dailyGoals = [
    {
      id: "lessons",
      type: "lessons" as const,
      target: 3,
      completed: 2,
      icon: <BookOpen className="h-4 w-4 text-green-700" />,
      color: "bg-green-100 text-green-700",
    },
    {
      id: "words",
      type: "words" as const,
      target: 20,
      completed: 15,
      icon: <Award className="h-4 w-4 text-blue-700" />,
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: "minutes",
      type: "minutes" as const,
      target: 30,
      completed: 20,
      icon: <BarChart2 className="h-4 w-4 text-amber-700" />,
      color: "bg-amber-100 text-amber-700",
    },
  ]

  // Mock data for today's learning activities with authentic images
  const todaysActivities = [
    {
      id: "1",
      type: "lesson" as const,
      title: "Greetings in Kikuyu",
      description: "Learn essential greetings and introductions in Kikuyu language",
      duration: 15,
      xpReward: 25,
      imageUrl: "/images/kikuyu-art.webp",
      href: "/lessons/1-1",
      completed: false,
    },
    {
      id: "2",
      type: "practice" as const,
      title: "Numbers 1-10 Review",
      description: "Practice counting in Kikuyu with interactive exercises",
      duration: 10,
      xpReward: 15,
      imageUrl: "/images/kikuyu-art.webp",
      href: "/practice/numbers",
      completed: true,
    },
    {
      id: "3",
      type: "challenge" as const,
      title: "Daily Vocabulary Challenge",
      description: "Test your knowledge of Kikuyu family terms in this timed challenge",
      duration: 5,
      xpReward: 30,
      imageUrl: "/images/kikuyu-art.webp",
      href: "/challenges/daily",
      completed: false,
    },
    {
      id: "4",
      type: "cultural" as const,
      title: "Kikuyu Wedding Traditions",
      description: "Learn about traditional Kikuyu wedding ceremonies and customs",
      duration: 8,
      xpReward: 20,
      imageUrl: "/images/kikuyu-art.webp",
      href: "/cultural/kikuyu-weddings",
      completed: false,
    },
  ]

  // Mock data for cultural insights with authentic images
  const culturalInsights = [
    {
      id: "1",
      title: "The Symbolism of Samburu Beadwork",
      content:
        "The Samburu people are a semi-nomadic pastoralist tribe residing in the northern regions of Kenya. Beadwork holds a special place in Samburu culture. It denotes a number of things, such as one’s age, social status, wealth, gender, personal stories, and experiences. ",
      imageUrl: "/images/kikuyu-elderly.png",
      category: "art" as const,
      language: "Samburu",
      region: "North Kenya",
    },
    {
      id: "2",
      title: "Luo Proverb: 'Rieko ok dak e wi ng'ato achiel'",
      content:
        "This Luo proverb translates to 'Wisdom does not reside in one person's head.' It emphasizes the importance of collective knowledge and community consultation in decision-making.",
      imageUrl: "/images/lake-victoria-2.jpg",
      category: "proverb" as const,
      language: "Luo",
      region: "Western Kenya",
    },
    {
      id: "3",
      title: "The Significance of the Maasai Shuka",
      content:
        "The iconic red checkered cloth worn by the Maasai, known as a shuka, serves both practical and cultural purposes. Beyond providing warmth and protection, the vibrant red color is believed to scare away lions and symbolizes bravery and strength.",
      imageUrl: "/images/maasai-man2.jpg",
      category: "tradition" as const,
      language: "Maa",
      region: "Rift Valley",
    },
  ]

  // Mock data for enhanced story-based learning with authentic images
  const storyCharacters = [
    {
      id: "kamau",
      name: "Kamau",
      avatarUrl: "/images/kikuyu-man-illustration.jpg",
    },
    {
      id: "wanjiku",
      name: "Wanjiku",
      avatarUrl: "/images/kikuyu-woman-illustaion2.jpg",
    },
    {
      id: "vendor",
      name: "Market Vendor",
      avatarUrl: "/images/kikuyu-vendor.jpg",
    },
  ]

  const storySegments = [
    {
      id: "1",
      character: storyCharacters[0],
      text: "Ũhoro waku, Wanjiku? Nĩ mwega?",
      translation: "How are you, Wanjiku? Are you well?",
      backgroundImageUrl: "/images/market.jpg",
      options: [
        {
          id: "1-1",
          text: "Nĩ mwega, Kamau. Ũrĩ atĩa?",
          response: "I am fine, Kamau. How are you?",
          nextSegmentId: "2",
          vocabularyWords: [
            { word: "Nĩ mwega", translation: "I am fine" },
            { word: "Ũrĩ atĩa", translation: "How are you?" },
          ],
        },
        {
          id: "1-2",
          text: "Nĩndĩrwaru. Ndĩ na mũrimũ.",
          response: "I am sick. I have a cold.",
          nextSegmentId: "3",
          vocabularyWords: [
            { word: "Nĩndĩrwaru", translation: "I am sick" },
            { word: "Mũrimũ", translation: "Cold/illness" },
          ],
        },
      ],
    },
    {
      id: "2",
      character: storyCharacters[0],
      text: "Nĩ mwega mũno. Nĩngũthiĩ thokoni. Ũrenda gũka?",
      translation: "I am very well. I am going to the market. Do you want to come?",
      backgroundImageUrl: "/images/market.jpg",
      options: [
        {
          id: "2-1",
          text: "Ĩĩ, nĩngwenda gũthiĩ nawe.",
          response: "Yes, I want to go with you.",
          nextSegmentId: "4",
        },
        {
          id: "2-2",
          text: "Aca, ndingĩhota. Nĩ ndĩ na wĩra mũingĩ.",
          response: "No, I cannot. I have a lot of work.",
          nextSegmentId: "5",
        },
      ],
    },
    {
      id: "3",
      character: storyCharacters[0],
      text: "Pole sana. Nĩ ngũkũrehere dawa kuuma thokoni.",
      translation: "I'm very sorry. I will bring you medicine from the market.",
      backgroundImageUrl: "/images/market.jpg",
      options: [
        {
          id: "3-1",
          text: "Nĩ wega mũno. Nĩndagũcokeria.",
          response: "Thank you very much. I appreciate it.",
          nextSegmentId: "5",
        },
      ],
    },
    {
      id: "4",
      character: storyCharacters[2],
      text: "Mũriũ na mũirĩtu, karibuni thokoni! Mũrenda kũgũra kĩ?",
      translation: "Young man and young woman, welcome to the market! What do you want to buy?",
      backgroundImageUrl: "/images/market.jpg",
      options: [
        {
          id: "4-1",
          text: "Tũrenda kũgũra matunda na nyeni.",
          response: "We want to buy fruits and vegetables.",
          nextSegmentId: "6",
        },
        {
          id: "4-2",
          text: "Tũrarora tu. Mwĩtĩkĩrĩte?",
          response: "We are just looking. Is that okay?",
          nextSegmentId: "7",
        },
      ],
    },
    {
      id: "5",
      character: storyCharacters[0],
      text: "Nĩ wega. Nĩngũkuona thutha.",
      translation: "That's fine. I will see you later.",
      backgroundImageUrl: "/images/market.jpg",
      isEndpoint: true,
    },
    {
      id: "6",
      character: storyCharacters[2],
      text: "Nĩ ndĩ na matunda mega mũno! Maembe, macungwa, na mananasi.",
      translation: "I have very good fruits! Mangoes, oranges, and pineapples.",
      backgroundImageUrl: "/images/market.jpg",
      isEndpoint: true,
    },
    {
      id: "7",
      character: storyCharacters[2],
      text: "Karibuni mũrore! Mũngĩenda kĩndũ, njĩĩrai.",
      translation: "Welcome to look! If you need anything, tell me.",
      backgroundImageUrl: "/images/market.jpg",
      isEndpoint: true,
    },
  ]

  // Cultural hotspots for interactive image with authentic Kenyan image
  const culturalHotspots = [
    {
      x: 25,
      y: 30,
      title: "Traditional Kikuyu Homestead",
      description:
        "The traditional Kikuyu home (nyumba) was circular with a conical roof, built using locally available materials. The design provided excellent insulation against both heat and cold.",
    },
    {
      x: 60,
      y: 45,
      title: "Sacred Mugumo Tree",
      description:
        "The Mugumo (fig) tree is sacred in Kikuyu culture. It was believed to be a place where Ngai (God) dwelled, and important ceremonies and sacrifices were performed under these trees.",
    },
    {
      x: 80,
      y: 70,
      title: "Traditional Farming Tools",
      description:
        "Agriculture is central to Kikuyu culture. Traditional farming tools like the muhũ (digging stick) and kahiũ (knife) reflect the community's deep connection to the land.",
    },
  ]

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
    <PageTransition>
      <div className="flex min-h-screen flex-col bg-cream">
        {/* Enhanced Hero Section with Integrated Header */}
        <EnhancedHeroSection
          imageUrl="/images/hero-bg-1.jpg"
          title={
            <motion.h1
              className="font-serif text-4xl font-bold md:text-5xl lg:text-6xl mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Preserving Kenya's Rich Linguistic Heritage
            </motion.h1>
          }
          subtitle={
            <motion.p
              className="mt-2 max-w-2xl text-lg md:text-xl text-white/90 mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Immerse yourself in authentic language learning experiences that preserve and celebrate Kenyan culture
            </motion.p>
          }
          height={650}
        />

        <main className="flex-1 -mt-16 relative z-10">
          <div className="container mx-auto px-4 py-6">
            {/* User Greeting & Stats */}
            <div className="mb-8 bg-white rounded-xl shadow-md p-6 border border-amber-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Heading level={2} className="text-2xl">
                    Jambo, Learner!
                  </Heading>
                  <Text size="sm" muted>
                    Keep up your learning journey
                  </Text>
                </div>
                <motion.div
                  className="mt-4 flex items-center gap-3 sm:mt-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-1">
                    <XpIcon type="star" animated />
                    <span className="text-sm font-medium text-amber-900">340 XP</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <StreakIcon animated />
                    <span className="text-sm font-medium text-amber-900">5 day streak</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Dynamic Goals Tracker */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <DynamicGoalsTracker initialGoals={dailyGoals} />
            </motion.div>

            {/* Today's Learning */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <TodaysLearning activities={todaysActivities} />
            </motion.div>

            {/* Enhanced Story-based Learning */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <EnhancedStoryLearning
                title="A Day at the Market"
                language="Kikuyu"
                imageUrl="/images/market.jpg"
                segments={storySegments}
              />
            </motion.div>

            {/* Cultural Insight of the Day */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <CulturalInsight insights={culturalInsights} />
            </motion.div>

            {/* Your Languages */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <SectionTitle
                action={
                  <button
                    onClick={() => {}}
                    className="text-xs text-amber-700 hover:underline focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded"
                    aria-label="View all languages"
                  >
                    View All
                  </button>
                }
              >
                Your Languages
              </SectionTitle>
            </motion.div>

            <motion.div
              className="space-y-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {featuredLanguages.map((language) => (
                <Link key={language.id} href={`/languages/${language.id}`}>
                  <motion.div
                    className="overflow-hidden rounded-xl border border-amber-100 bg-white shadow-sm transition-all hover:shadow-md"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative h-36 w-full">
                      <Image
                        src={language.image || "/placeholder.svg"}
                        alt={language.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-3 left-3 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-amber-900">
                        {language.region}
                      </div>
                      <div className="absolute bottom-3 right-3 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-amber-900">
                        {language.speakers} speakers
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif text-lg text-amber-950">{language.name}</h3>
                          <div
                            className={`rounded-full ${getDifficultyColor(language.difficulty)} px-2 py-0.5 text-xs font-medium`}
                          >
                            {language.difficulty}
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-amber-500" />
                      </div>
                      {language.progress > 0 ? (
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-xs text-amber-700">Progress</span>
                            <span className="text-xs font-medium text-amber-900">{language.progress}%</span>
                          </div>
                          <PulsingProgressBar value={language.progress} max={100} pulseThreshold={80} />
                        </div>
                      ) : (
                        <p className="text-xs text-amber-700">Start learning today</p>
                      )}
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>

            {/* Interactive Cultural Image */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <SectionTitle>Explore Kikuyu Culture</SectionTitle>
              <InteractiveCulturalImage
                imageUrl="/images/kikuyu-hut.jpg"
                altText="Kikuyu cultural scene"
                hotspots={culturalHotspots}
              />
            </motion.div>

            {/* Kenyan Language Heritage - Enhanced with Tabs */}
            <motion.div
              className="mt-8 mb-8 rounded-xl border border-amber-100 bg-white p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <Heading level={2} className="mb-4 text-xl">
                Kenyan Language Heritage
              </Heading>

              <ClientOnly>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="mb-4 grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="culture">Cultural Impact</TabsTrigger>
                    <TabsTrigger value="preservation">Preservation</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-3">
                    <Text size="sm" muted>
                      Kenya is home to over 40 indigenous languages, reflecting the country's rich ethnic diversity.
                      These languages belong to three African language families: Niger-Congo (Bantu), Nilo-Saharan, and
                      Afro-Asiatic, each with unique linguistic features and cultural significance.
                    </Text>
                    <Text size="sm" muted>
                      From the melodic tones of Luo to the rhythmic patterns of Kikuyu, each language carries centuries
                      of oral traditions, proverbs, and cultural wisdom passed down through generations.
                    </Text>
                  </TabsContent>

                  <TabsContent value="history" className="space-y-3">
                    <Text size="sm" muted>
                      Kenya's linguistic landscape has evolved over thousands of years. The Bantu migration around 1000
                      BCE brought languages like Kikuyu and Kamba, while Nilotic languages like Luo and Kalenjin arrived
                      with pastoralist communities from the north.
                    </Text>
                    <Text size="sm" muted>
                      During the colonial era (1895-1963), English and Swahili gained prominence, but indigenous
                      languages remained vital to cultural identity and resistance. Post-independence, efforts to
                      preserve these languages have grown alongside recognition of their importance to Kenya's heritage.
                    </Text>
                  </TabsContent>

                  <TabsContent value="culture" className="space-y-3">
                    <Text size="sm" muted>
                      Kenyan languages are repositories of cultural knowledge, containing unique concepts that often
                      have no direct translation in global languages. They encode traditional ecological knowledge,
                      social norms, and spiritual beliefs.
                    </Text>
                    <Text size="sm" muted>
                      Each language has developed rich oral traditions including proverbs (methali), riddles
                      (vitendawili), and storytelling techniques that reflect the values and worldview of its speakers.
                      These traditions continue to influence Kenyan literature, music, and art today.
                    </Text>
                  </TabsContent>

                  <TabsContent value="preservation" className="space-y-3">
                    <Text size="sm" muted>
                      Many Kenyan languages face challenges from urbanization, globalization, and shifting educational
                      priorities. UNESCO classifies several as endangered, with fewer young speakers becoming fluent.
                    </Text>
                    <Text size="sm" muted>
                      Community-led initiatives, digital documentation projects, and educational programs like Asili are
                      working to reverse this trend. By learning a Kenyan language, you're directly contributing to its
                      preservation and the cultural heritage it represents.
                    </Text>
                  </TabsContent>
                </Tabs>
              </ClientOnly>

              <Link
                href="/about-languages"
                className="mt-4 inline-flex items-center text-sm font-medium text-amber-700 hover:text-amber-800 transition-colors"
              >
                Learn more about Kenya's linguistic diversity
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>

            {/* Community Building with Interactive Role Cards */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <CommunitySection />
            </motion.div>
          </div>
        </main>

        {/* Bottom Navigation */}
        <BottomNav activePath="home" />
      </div>
    </PageTransition>
  )
}

