"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, MessageCircle, Volume2, ChevronRight, Check, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { InteractiveButton } from "./ui/interactive-button"

interface Character {
  id: string
  name: string
  avatarUrl: string
}

interface DialogueOption {
  id: string
  text: string
  response: string
  nextSegmentId?: string
  vocabularyWords?: {
    word: string
    translation: string
    audioUrl?: string
  }[]
}

interface StorySegment {
  id: string
  character: Character
  text: string
  translation: string
  audioUrl?: string
  backgroundImageUrl?: string
  options?: DialogueOption[]
  isEndpoint?: boolean
}

interface EnhancedStoryLearningProps {
  title: string
  language: string
  imageUrl: string
  imageClassName?: string
  segments: StorySegment[]
  className?: string
}

export function EnhancedStoryLearning({
  title,
  language,
  imageUrl,
  imageClassName = "",
  segments,
  className = "",
}: EnhancedStoryLearningProps) {
  const [currentSegmentId, setCurrentSegmentId] = useState(segments[0].id)
  const [showTranslation, setShowTranslation] = useState(false)
  const [dialogueHistory, setDialogueHistory] = useState<string[]>([segments[0].id])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [responseText, setResponseText] = useState<string | null>(null)

  const currentSegment = segments.find((s) => s.id === currentSegmentId) || segments[0]

  const handleOptionSelect = (option: DialogueOption) => {
    setSelectedOption(option.id)
    setResponseText(option.response)

    setTimeout(() => {
      if (option.nextSegmentId) {
        setCurrentSegmentId(option.nextSegmentId)
        setDialogueHistory((prev) => [...prev, option.nextSegmentId!])
        setSelectedOption(null)
        setResponseText(null)
        setShowTranslation(false)
      }
    }, 2000)
  }

  const goBack = () => {
    if (dialogueHistory.length > 1) {
      const newHistory = [...dialogueHistory]
      newHistory.pop()
      const previousSegmentId = newHistory[newHistory.length - 1]
      setCurrentSegmentId(previousSegmentId)
      setDialogueHistory(newHistory)
      setSelectedOption(null)
      setResponseText(null)
      setShowTranslation(false)
    }
  }

  return (
    <div className={`overflow-hidden rounded-xl border border-amber-100 bg-white shadow-md ${className}`}>
      <div className="relative h-48 w-full">
        <Image
          src={currentSegment.backgroundImageUrl || imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className={`object-cover ${imageClassName}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <span className="mb-1 inline-block rounded-full bg-amber-500 px-2 py-0.5 text-xs font-medium text-white">
            Interactive Story
          </span>
          <h2 className="font-serif text-xl text-white">{title}</h2>
          <p className="text-sm text-white/80">{language}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-amber-700" />
            <span className="text-sm font-medium text-amber-900">
              Scene {dialogueHistory.length} of {segments.length}
            </span>
          </div>

          {dialogueHistory.length > 1 && (
            <button
              onClick={goBack}
              className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 transition-colors hover:bg-amber-200"
            >
              <ArrowLeft className="h-3 w-3" />
              Back
            </button>
          )}
        </div>

        <div className="mb-4 flex items-start gap-3">
          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-2 border-amber-200">
            <Image
              src={currentSegment.character.avatarUrl || "/placeholder.svg"}
              alt={currentSegment.character.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="mb-1 text-sm font-medium text-amber-900">{currentSegment.character.name}</div>
            <div className="rounded-lg rounded-tl-none bg-amber-50 p-3">
              <div className="flex items-start justify-between">
                <p className="text-amber-900">{currentSegment.text}</p>
                {currentSegment.audioUrl && (
                  <button
                    className="ml-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 transition-colors hover:bg-amber-200"
                    aria-label="Play audio"
                  >
                    <Volume2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              <AnimatePresence>
                {showTranslation && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 text-sm text-amber-700"
                  >
                    {currentSegment.translation}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                onClick={() => setShowTranslation(!showTranslation)}
                className="mt-2 flex items-center gap-1 text-xs font-medium text-amber-700 hover:text-amber-800"
              >
                <MessageCircle className="h-3 w-3" />
                {showTranslation ? "Hide translation" : "Show translation"}
              </button>
            </div>
          </div>
        </div>

        {responseText && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex items-start gap-3 justify-end"
          >
            <div className="flex-1 text-right">
              <div className="inline-block rounded-lg rounded-tr-none bg-green-50 p-3 text-left">
                <p className="text-green-900">{responseText}</p>
              </div>
            </div>

            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-2 border-green-200">
              <Image src="/placeholder.svg?height=100&width=100" alt="You" fill className="object-cover" />
            </div>
          </motion.div>
        )}

        {currentSegment.options && !selectedOption && (
          <div className="mb-4">
            <h3 className="mb-2 text-sm font-medium text-amber-900">How will you respond?</h3>

            <div className="space-y-2">
              {currentSegment.options.map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => handleOptionSelect(option)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-lg border border-amber-100 bg-white p-3 text-left transition-colors hover:bg-amber-50"
                >
                  <p className="text-amber-900">{option.text}</p>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {currentSegment.isEndpoint && (
          <div className="mb-4 rounded-lg bg-green-50 p-4 text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mb-1 font-medium text-green-900">Conversation Complete!</h3>
            <p className="text-sm text-green-700">You've successfully navigated this dialogue.</p>
          </div>
        )}

        {currentSegment.isEndpoint && (
          <div className="flex justify-center">
            <InteractiveButton variant="primary" icon={<ChevronRight className="h-4 w-4" />} iconPosition="right">
              Continue to Next Story
            </InteractiveButton>
          </div>
        )}
      </div>
    </div>
  )
}

