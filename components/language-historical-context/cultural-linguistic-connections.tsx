"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Volume2, Info } from "lucide-react"
import Image from "next/image"

interface CulturalLinguisticConnectionsProps {
  languageId: string
  languageName: string
}

export function CulturalLinguisticConnections({ languageId, languageName }: CulturalLinguisticConnectionsProps) {
  const [activeCategory, setActiveCategory] = useState("naming")

  // This would normally come from your data source based on languageId
  const culturalConnections = {
    kikuyu: {
      naming: {
        title: "Traditional Naming Systems",
        description:
          "Kikuyu naming traditions are deeply connected to the circumstances of birth, family history, and social context. Names often reflect the time of day, season, or significant events occurring around birth.",
        examples: [
          {
            term: "Wanjiku",
            meaning: "Born during the rainy season",
            usage: "A common female name given to girls born during the rainy season",
            audio: "/audio/kikuyu/wanjiku.mp3",
          },
          {
            term: "Kamau",
            meaning: "Born when warriors were away",
            usage: "A male name given to boys born when men were away at war or hunting",
            audio: "/audio/kikuyu/kamau.mp3",
          },
          {
            term: "Nyokabi",
            meaning: "Born in the afternoon",
            usage: "A female name given to girls born in the afternoon hours",
            audio: "/audio/kikuyu/nyokabi.mp3",
          },
        ],
        image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1000",
      },
      agriculture: {
        title: "Agricultural Expressions",
        description:
          "As traditionally agricultural people, Kikuyu language contains rich vocabulary related to farming, seasons, and land management. These terms reflect the community's deep connection to the land.",
        examples: [
          {
            term: "Mũgũnda",
            meaning: "Farm or garden",
            usage: "Used to describe cultivated land for growing crops",
            audio: "/audio/kikuyu/mugunda.mp3",
          },
          {
            term: "Mbura",
            meaning: "Rain or rainy season",
            usage: "Used in agricultural planning and seasonal references",
            audio: "/audio/kikuyu/mbura.mp3",
          },
          {
            term: "Mũthĩgĩ",
            meaning: "Harvest season",
            usage: "The time when crops are gathered, associated with celebration",
            audio: "/audio/kikuyu/muthigi.mp3",
          },
        ],
        image: "https://images.unsplash.com/photo-1589825743127-e9b6d0b10525?q=80&w=1000",
      },
      ceremonies: {
        title: "Ceremonial Language",
        description:
          "Kikuyu ceremonies and rites of passage have specific linguistic components, including special vocabulary, ritual phrases, and ceremonial speech patterns.",
        examples: [
          {
            term: "Irua",
            meaning: "Initiation ceremony",
            usage: "Traditional coming-of-age ceremony with specific ritual language",
            audio: "/audio/kikuyu/irua.mp3",
          },
          {
            term: "Kũrathima",
            meaning: "To bless",
            usage: "Used in ceremonial contexts to bestow blessings",
            audio: "/audio/kikuyu/kurathima.mp3",
          },
          {
            term: "Ngurario",
            meaning: "Traditional wedding",
            usage: "The formal marriage ceremony with specific linguistic elements",
            audio: "/audio/kikuyu/ngurario.mp3",
          },
        ],
        image: "https://images.unsplash.com/photo-1596005554384-d293674c91d7?q=80&w=1000",
      },
      proverbs: {
        title: "Historical Proverbs",
        description:
          "Kikuyu proverbs (thimo) encapsulate historical wisdom and cultural values. Many reflect historical events, traditional practices, and social norms.",
        examples: [
          {
            term: "Mũkũrũ wa thigari ndoimagwo njira",
            meaning: "The leader of warriors is not denied the path",
            usage: "Reflects respect for leadership and bravery in historical context",
            audio: "/audio/kikuyu/mukuru-wa-thigari.mp3",
          },
          {
            term: "Mũtĩ mũkũrũ ndũgũtemwo nĩ rũhuho",
            meaning: "An old tree is not easily uprooted by the wind",
            usage: "Speaks to the resilience of elders and traditional knowledge",
            audio: "/audio/kikuyu/muti-mukuru.mp3",
          },
          {
            term: "Kaana ka mũciari gatihakagwo maaĩ",
            meaning: "A parent's child is not denied water",
            usage: "Reflects traditional values of community support and resource sharing",
            audio: "/audio/kikuyu/kaana-ka-muciari.mp3",
          },
        ],
        image: "https://images.unsplash.com/photo-1627394678694-cd1f98b014c0?q=80&w=1000",
      },
      trade: {
        title: "Trade and Contact Words",
        description:
          "Through historical trade and contact with neighboring communities and later with Arabs and Europeans, Kikuyu adopted and adapted words from other languages.",
        examples: [
          {
            term: "Mbeca",
            meaning: "Money",
            usage: "Derived from Swahili 'pesa', reflecting trade connections",
            audio: "/audio/kikuyu/mbeca.mp3",
          },
          {
            term: "Thibitari",
            meaning: "Hospital",
            usage: "Adapted from English during colonial period",
            audio: "/audio/kikuyu/thibitari.mp3",
          },
          {
            term: "Mũthũngũ",
            meaning: "European person",
            usage: "Term that emerged during colonial contact",
            audio: "/audio/kikuyu/muthungu.mp3",
          },
        ],
        image: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=1000",
      },
    },
    // Add other languages here
  }

  const connections =
    culturalConnections[languageId as keyof typeof culturalConnections]?.["naming"] || culturalConnections.kikuyu.naming

  const categories = [
    { id: "naming", label: "Naming Systems" },
    { id: "agriculture", label: "Agricultural Terms" },
    { id: "ceremonies", label: "Ceremonial Language" },
    { id: "proverbs", label: "Historical Proverbs" },
    { id: "trade", label: "Trade Words" },
  ]

  const currentCategory =
    culturalConnections[languageId as keyof typeof culturalConnections]?.[
      activeCategory as keyof (typeof culturalConnections)["kikuyu"]
    ] || culturalConnections.kikuyu[activeCategory as keyof typeof culturalConnections.kikuyu]

  return (
    <div className="rounded-xl border border-amber-100 p-4 dark:border-amber-900/30">
      <h3 className="mb-4 font-serif text-lg text-amber-950 dark:text-amber-100">
        {languageName} Cultural-Linguistic Connections
      </h3>

      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              activeCategory === category.id
                ? "bg-amber-500 text-white dark:bg-amber-600"
                : "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:hover:bg-amber-800"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <motion.div
        key={activeCategory}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="rounded-lg border border-amber-100 p-4 dark:border-amber-900/30"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/3">
            <div className="relative h-40 w-full overflow-hidden rounded-lg">
              <Image
                src={currentCategory.image || "/placeholder.svg"}
                alt={currentCategory.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:w-2/3">
            <h4 className="mb-2 font-medium text-amber-900 dark:text-amber-100">{currentCategory.title}</h4>
            <p className="mb-4 text-sm text-amber-700 dark:text-amber-300">{currentCategory.description}</p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <h5 className="font-medium text-amber-900 dark:text-amber-100">Examples:</h5>
          {currentCategory.examples.map((example, index) => (
            <div
              key={index}
              className="rounded-lg border border-amber-100 bg-white p-3 dark:border-amber-900/30 dark:bg-card/50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-amber-950 dark:text-amber-100">{example.term}</p>
                  <p className="text-sm text-amber-700 dark:text-amber-300">{example.meaning}</p>
                  <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">{example.usage}</p>
                </div>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700 transition-all duration-200 hover:bg-amber-200 hover:scale-110 active:scale-95 dark:bg-amber-900/50 dark:text-amber-300 dark:hover:bg-amber-800"
                  aria-label={`Listen to pronunciation of ${example.term}`}
                >
                  <Volume2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-700 dark:bg-amber-900/10 dark:text-amber-300">
          <div className="flex items-start gap-2">
            <Info size={16} className="mt-0.5 flex-shrink-0" />
            <p>
              These linguistic elements reflect the deep connection between {languageName} language and cultural
              practices, showing how language preserves historical knowledge and cultural values.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

