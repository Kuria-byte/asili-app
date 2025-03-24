"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Lightbulb, Sparkles } from "lucide-react"
import Image from "next/image"

export function CulturalSignificanceModules() {
  const [activeModule, setActiveModule] = useState<string | null>(null)

  const culturalModules = [
    {
      id: "untranslatable",
      title: "Untranslatable Concepts",
      description: "Words and phrases that reveal unique cultural perspectives",
      icon: <Sparkles className="h-5 w-5" />,
      content: [
        {
          language: "Kikuyu",
          concept: "Gĩtheri",
          explanation:
            "More than just a dish of beans and maize, gĩtheri represents community sharing, agricultural heritage, and the value of simple, nourishing food. The preparation and sharing of gĩtheri carries cultural significance beyond its nutritional value.",
          imageUrl: "https://images.unsplash.com/photo-1604934380103-e397c912e65d?q=80&w=1000",
        },
        {
          language: "Luo",
          concept: "Tero",
          explanation:
            "A complex cultural practice involving the inheritance of a widow by her deceased husband's brother. This concept encompasses family responsibility, continuity, and social support systems that don't translate directly into English concepts.",
          imageUrl: "https://images.unsplash.com/photo-1627394678694-cd1f98b014c0?q=80&w=1000",
        },
        {
          language: "Swahili",
          concept: "Harambee",
          explanation:
            "Literally meaning 'pull together,' harambee represents the Kenyan value of community self-help and collective effort. It's both a call to action and a philosophy that emphasizes communal responsibility over individualism.",
          imageUrl: "https://images.unsplash.com/photo-1596005554384-d293674c91d7?q=80&w=1000",
        },
      ],
    },
    {
      id: "worldview",
      title: "Philosophical Worldviews",
      description: "How language structure reflects cultural perspectives",
      icon: <Lightbulb className="h-5 w-5" />,
      content: [
        {
          language: "Maasai",
          concept: "Enkang",
          explanation:
            "The Maasai concept of home (enkang) extends beyond physical structure to encompass the community, cattle, and surrounding environment. The language's extensive vocabulary for cattle reflects their central importance in Maasai worldview and identity.",
          imageUrl: "https://images.unsplash.com/photo-1591377176347-a4e99ba5dd6a?q=80&w=1000",
        },
        {
          language: "Gikuyu",
          concept: "Ngai/Mwene-Nyaga",
          explanation:
            "The Kikuyu concept of God (Ngai or Mwene-Nyaga) is linguistically tied to Mount Kenya (Kirinyaga), reflecting a worldview where the divine is connected to the physical landscape and natural features.",
          imageUrl: "https://images.unsplash.com/photo-1589825743127-e9b6d0b10525?q=80&w=1000",
        },
        {
          language: "Turkana",
          concept: "Akuj",
          explanation:
            "In Turkana language, the concept of God (Akuj) is connected to the sky and rain, reflecting the pastoral community's dependence on rainfall. The language contains nuanced terms for different types of rain and weather patterns crucial for survival.",
          imageUrl: "https://images.unsplash.com/photo-1623066798929-648ab0bee90d?q=80&w=1000",
        },
      ],
    },
    {
      id: "specialized",
      title: "Specialized Vocabulary",
      description: "Unique terminology for cultural practices and knowledge",
      icon: <BookOpen className="h-5 w-5" />,
      content: [
        {
          language: "Samburu",
          concept: "Age-Set Terminology",
          explanation:
            "Samburu language contains an elaborate vocabulary for their age-set system, with specific terms for each stage of life, associated responsibilities, and relationships between age groups that have no direct English equivalents.",
          imageUrl: "https://images.unsplash.com/photo-1623066798929-648ab0bee90d?q=80&w=1000",
        },
        {
          language: "Swahili",
          concept: "Dhow Terminology",
          explanation:
            "Coastal Swahili contains dozens of specialized terms for parts of traditional dhow sailing vessels, sailing techniques, and navigation methods, reflecting centuries of maritime culture and knowledge.",
          imageUrl: "https://images.unsplash.com/photo-1548813831-7aa2d6f4090d?q=80&w=1000",
        },
        {
          language: "Pokot",
          concept: "Livestock Classification",
          explanation:
            "The Pokot language has over 100 terms for cattle based on horn shape, color patterns, and other characteristics - a linguistic reflection of their pastoral expertise and the central role of livestock in their culture.",
          imageUrl: "https://images.unsplash.com/photo-1623066798929-648ab0bee90d?q=80&w=1000",
        },
      ],
    },
  ]

  return (
    <div className="mt-6 rounded-xl border border-amber-100 p-4 dark:border-amber-900/30">
      <div className="mb-4">
        <h3 className="font-serif text-lg text-amber-950 dark:text-amber-100">Cultural Significance of Language</h3>
        <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
          Languages are more than communication tools—they encode unique cultural perspectives and knowledge systems.
        </p>
      </div>

      {/* Module selector */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {culturalModules.map((module) => (
          <motion.div
            key={module.id}
            className={`cursor-pointer rounded-lg border p-4 transition-all ${
              activeModule === module.id
                ? "border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-900/30"
                : "border-amber-100 bg-white hover:border-amber-200 hover:bg-amber-50 dark:border-amber-900/30 dark:bg-card dark:hover:border-amber-800 dark:hover:bg-amber-900/50"
            }`}
            onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
              {module.icon}
            </div>
            <h4 className="mb-1 font-medium text-amber-900 dark:text-amber-100">{module.title}</h4>
            <p className="text-xs text-amber-700 dark:text-amber-300">{module.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Module content */}
      <AnimatePresence>
        {activeModule && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="rounded-lg border border-amber-100 bg-white p-4 dark:border-amber-900/30 dark:bg-card">
              {culturalModules
                .find((m) => m.id === activeModule)
                ?.content.map((item, index) => (
                  <motion.div
                    key={index}
                    className="mb-4 flex flex-col md:flex-row gap-4 last:mb-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="md:w-1/3">
                      <div className="relative h-40 w-full overflow-hidden rounded-lg">
                        <Image
                          src={item.imageUrl || "/placeholder.svg"}
                          alt={item.concept}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="mt-2 text-center">
                        <span className="text-xs font-medium text-amber-700 dark:text-amber-300">{item.language}</span>
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <h5 className="mb-1 font-medium text-amber-900 dark:text-amber-100">{item.concept}</h5>
                      <p className="text-sm text-amber-700 dark:text-amber-300">{item.explanation}</p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-700 dark:bg-amber-900/10 dark:text-amber-300">
        <p>
          Understanding the cultural significance embedded in language is essential for truly appreciating Kenya's
          linguistic heritage. Each language offers unique insights into how communities perceive the world, organize
          social relationships, and preserve traditional knowledge.
        </p>
      </div>
    </div>
  )
}

