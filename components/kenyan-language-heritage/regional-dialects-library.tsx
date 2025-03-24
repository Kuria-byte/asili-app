"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Volume2, Map, AudioWaveformIcon as Waveform } from "lucide-react"

export function RegionalDialectsLibrary() {
  const [activeLanguage, setActiveLanguage] = useState("kikuyu")
  const [activePhrase, setActivePhrase] = useState("greeting")
  const [playingDialect, setPlayingDialect] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const languages = [
    { id: "kikuyu", name: "Kikuyu" },
    { id: "luo", name: "Luo" },
    { id: "swahili", name: "Swahili" },
    { id: "kamba", name: "Kamba" },
  ]

  const phrases = [
    { id: "greeting", text: "Hello, how are you?" },
    { id: "farewell", text: "Goodbye, see you later" },
    { id: "thankyou", text: "Thank you very much" },
    { id: "welcome", text: "You are welcome" },
  ]

  const dialects = {
    kikuyu: [
      {
        id: "central",
        name: "Central Kikuyu",
        region: "Nyeri, Murang'a",
        greeting: "Ũhoro waku",
        farewell: "Tigwo wega",
        thankyou: "Nĩ wega mũno",
        welcome: "Nĩ ũgwetĩkĩrwo",
        audioUrl: "/audio/kikuyu/central/",
        speakerInfo: "Female, 45 years old",
      },
      {
        id: "southern",
        name: "Southern Kikuyu",
        region: "Kiambu",
        greeting: "Ũhoro waku",
        farewell: "Ũgacoka",
        thankyou: "Nĩ wega",
        welcome: "Karibũ",
        audioUrl: "/audio/kikuyu/southern/",
        speakerInfo: "Male, 60 years old",
      },
      {
        id: "eastern",
        name: "Eastern Kikuyu",
        region: "Embu border",
        greeting: "Ũhoro waku",
        farewell: "Gũtigana",
        thankyou: "Nĩ wega mũno",
        welcome: "Ũkaribu",
        audioUrl: "/audio/kikuyu/eastern/",
        speakerInfo: "Female, 35 years old",
      },
    ],
    luo: [
      {
        id: "central",
        name: "Central Luo",
        region: "Kisumu",
        greeting: "Nade",
        farewell: "Oriti",
        thankyou: "Erokamano",
        welcome: "Ibirwa maber",
        audioUrl: "/audio/luo/central/",
        speakerInfo: "Male, 50 years old",
      },
      {
        id: "southern",
        name: "Southern Luo",
        region: "Migori, Homa Bay",
        greeting: "Nadi",
        farewell: "Oriti",
        thankyou: "Erokamano ahinya",
        welcome: "Ibirwa maber",
        audioUrl: "/audio/luo/southern/",
        speakerInfo: "Female, 40 years old",
      },
      {
        id: "northern",
        name: "Northern Luo",
        region: "Siaya",
        greeting: "Nade",
        farewell: "Oriti to",
        thankyou: "Erokamano",
        welcome: "Kar maber",
        audioUrl: "/audio/luo/northern/",
        speakerInfo: "Male, 65 years old",
      },
    ],
    swahili: [
      {
        id: "coastal",
        name: "Coastal Swahili",
        region: "Mombasa",
        greeting: "Habari yako",
        farewell: "Kwaheri",
        thankyou: "Asante sana",
        welcome: "Karibu",
        audioUrl: "/audio/swahili/coastal/",
        speakerInfo: "Female, 55 years old",
      },
      {
        id: "urban",
        name: "Urban Swahili",
        region: "Nairobi",
        greeting: "Sasa",
        farewell: "Tutaonana",
        thankyou: "Asante",
        welcome: "Karibu sana",
        audioUrl: "/audio/swahili/urban/",
        speakerInfo: "Male, 30 years old",
      },
    ],
    kamba: [
      {
        id: "central",
        name: "Central Kamba",
        region: "Machakos",
        greeting: "Uvoo waku",
        farewell: "Ni voo",
        thankyou: "Ni vea muno",
        welcome: "Wi kyaa",
        audioUrl: "/audio/kamba/central/",
        speakerInfo: "Male, 45 years old",
      },
      {
        id: "eastern",
        name: "Eastern Kamba",
        region: "Kitui",
        greeting: "Uvoo waku",
        farewell: "Tiwa nesa",
        thankyou: "Ni vea",
        welcome: "Wi kyaa",
        audioUrl: "/audio/kamba/eastern/",
        speakerInfo: "Female, 50 years old",
      },
    ],
  }

  const playAudio = (dialectId: string) => {
    if (audioRef.current) {
      // In a real implementation, this would play actual audio files
      // For now, we'll simulate audio playback
      if (playingDialect === dialectId) {
        audioRef.current.pause()
        setPlayingDialect(null)
      } else {
        // Simulate loading a new audio source
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.play()
            setPlayingDialect(dialectId)

            // Auto-stop after 3 seconds (simulating short audio clip)
            setTimeout(() => {
              setPlayingDialect(null)
            }, 3000)
          }
        }, 300)
      }
    }
  }

  // Get current dialects based on active language
  const currentDialects = dialects[activeLanguage as keyof typeof dialects] || []

  return (
    <div className="mt-6 rounded-xl border border-amber-100 p-4 dark:border-amber-900/30">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-serif text-lg text-amber-950 dark:text-amber-100">Audio Library of Regional Dialects</h3>
      </div>

      {/* Language selector */}
      <div className="mb-4 flex flex-wrap gap-2">
        {languages.map((language) => (
          <button
            key={language.id}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              activeLanguage === language.id
                ? "bg-amber-500 text-white dark:bg-amber-600"
                : "bg-white text-amber-700 border border-amber-200 hover:bg-amber-50 dark:bg-card dark:text-amber-300 dark:border-amber-800"
            }`}
            onClick={() => setActiveLanguage(language.id)}
          >
            {language.name}
          </button>
        ))}
      </div>

      {/* Phrase selector */}
      <div className="mb-6 flex flex-wrap gap-2">
        {phrases.map((phrase) => (
          <button
            key={phrase.id}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              activePhrase === phrase.id
                ? "bg-amber-100 text-amber-900 border border-amber-300 dark:bg-amber-900/50 dark:text-amber-100 dark:border-amber-700"
                : "bg-white text-amber-700 border border-amber-100 hover:bg-amber-50 dark:bg-card dark:text-amber-300 dark:border-amber-900/30"
            }`}
            onClick={() => setActivePhrase(phrase.id)}
          >
            {phrase.text}
          </button>
        ))}
      </div>

      {/* Dialect comparison */}
      <div className="grid gap-4 md:grid-cols-2">
        {currentDialects.map((dialect) => (
          <motion.div
            key={dialect.id}
            className="rounded-lg border border-amber-100 bg-white p-4 dark:border-amber-900/30 dark:bg-card"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h4 className="font-medium text-amber-900 dark:text-amber-100">{dialect.name}</h4>
                <div className="flex items-center gap-1 text-xs text-amber-700 dark:text-amber-300">
                  <Map size={12} />
                  <span>{dialect.region}</span>
                </div>
              </div>
              <button
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  playingDialect === dialect.id
                    ? "bg-amber-500 text-white dark:bg-amber-600"
                    : "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:hover:bg-amber-800"
                }`}
                onClick={() => playAudio(dialect.id)}
                aria-label={playingDialect === dialect.id ? "Pause audio" : "Play audio"}
              >
                {playingDialect === dialect.id ? <Pause size={18} /> : <Play size={18} />}
              </button>
            </div>

            <div className="mb-3 rounded-lg bg-amber-50 p-3 dark:bg-amber-900/20">
              <div className="flex items-center justify-between">
                <div className="text-lg font-medium text-amber-900 dark:text-amber-100">
                  {dialect[activePhrase as keyof typeof dialect] as string}
                </div>
                <Volume2 size={16} className="text-amber-500 dark:text-amber-400" />
              </div>

              {/* Audio waveform visualization (simulated) */}
              <div className="mt-2 flex h-8 items-center gap-0.5">
                {Array.from({ length: 30 }).map((_, i) => {
                  const height = playingDialect === dialect.id ? Math.random() * 100 : (Math.sin(i * 0.5) + 1) * 50

                  return (
                    <div
                      key={i}
                      className="w-1 bg-amber-300 dark:bg-amber-700"
                      style={{
                        height: `${Math.max(10, height)}%`,
                        opacity: playingDialect === dialect.id ? 1 : 0.5,
                      }}
                    />
                  )
                })}
              </div>
            </div>

            <div className="text-xs text-amber-700 dark:text-amber-300">
              <span>Speaker: {dialect.speakerInfo}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hidden audio element for playback */}
      <audio ref={audioRef} className="hidden" />

      <div className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-700 dark:bg-amber-900/10 dark:text-amber-300">
        <div className="flex items-start gap-2">
          <Waveform size={16} className="mt-0.5 flex-shrink-0" />
          <p>
            Regional dialects showcase the rich diversity within each language. Even within the same language,
            pronunciation, vocabulary, and expressions can vary significantly based on geography, historical influences,
            and cultural practices. These variations are an important part of Kenya's linguistic heritage.
          </p>
        </div>
      </div>
    </div>
  )
}

