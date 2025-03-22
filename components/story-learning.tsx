"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, MessageCircle, Volume2, ChevronRight, Check } from "lucide-react"
import Image from "next/image"

interface StorySegment {
  id: string
  text: string
  translation: string
  audioUrl?: string
  vocabularyWords: {
    word: string
    translation: string
    audioUrl?: string
  }[]
  question?: {
    text: string
    options: string[]
    correctIndex: number
  }
}

interface StoryLearningProps {
  title: string
  language: string
  imageUrl: string
  segments: StorySegment[]
  className?: string
}

export function StoryLearning({ title, language, imageUrl, segments, className = "" }: StoryLearningProps) {
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0)
  const [showTranslation, setShowTranslation] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [completedSegments, setCompletedSegments] = useState<string[]>([])

  const currentSegment = segments[currentSegmentIndex]
  const isLastSegment = currentSegmentIndex === segments.length - 1
  const hasQuestion = !!currentSegment.question
  const isSegmentCompleted = completedSegments.includes(currentSegment.id)

  const nextSegment = () => {
    if (currentSegmentIndex < segments.length - 1) {
      setCurrentSegmentIndex((prev) => prev + 1)
      setShowTranslation(false)
      setSelectedAnswer(null)
    }
  }

  const checkAnswer = (index: number) => {
    setSelectedAnswer(index)

    if (currentSegment.question && index === currentSegment.question.correctIndex) {
      if (!completedSegments.includes(currentSegment.id)) {
        setCompletedSegments((prev) => [...prev, currentSegment.id])
      }
    }
  }

  return (
    <div className={`overflow-hidden rounded-xl border border-amber-100 bg-white shadow-md ${className}`}>
      <div className="relative h-40 w-full">
        <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <span className="mb-1 inline-block rounded-full bg-amber-500 px-2 py-0.5 text-xs font-medium text-white">
            Story-based Learning
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
              Segment {currentSegmentIndex + 1} of {segments.length}
            </span>
          </div>

          <div className="flex gap-1">
            {segments.map((segment, index) => (
              <span
                key={segment.id}
                className={`block h-2 w-2 rounded-full ${
                  completedSegments.includes(segment.id)
                    ? "bg-green-500"
                    : index === currentSegmentIndex
                      ? "bg-amber-500"
                      : "bg-amber-200"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mb-4 rounded-lg bg-amber-50 p-4">
          <div className="flex items-start justify-between">
            <p className="text-lg font-medium text-amber-900">{currentSegment.text}</p>
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

        {currentSegment.vocabularyWords.length > 0 && (
          <div className="mb-4">
            <h3 className="mb-2 text-sm font-medium text-amber-900">Key Vocabulary</h3>
            <div className="space-y-2">
              {currentSegment.vocabularyWords.map((word, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg border border-amber-100 p-2">
                  <div>
                    <p className="font-medium text-amber-900">{word.word}</p>
                    <p className="text-xs text-amber-700">{word.translation}</p>
                  </div>
                  {word.audioUrl && (
                    <button
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-700 transition-colors hover:bg-amber-200"
                      aria-label={`Play audio for ${word.word}`}
                    >
                      <Volume2 className="h-3 w-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {hasQuestion && (
          <div className="mb-4">
            <h3 className="mb-2 text-sm font-medium text-amber-900">Comprehension Check</h3>
            <p className="mb-2 text-amber-900">{currentSegment.question!.text}</p>

            <div className="space-y-2">
              {currentSegment.question!.options.map((option, index) => {
                const isCorrect = index === currentSegment.question!.correctIndex
                const isSelected = selectedAnswer === index

                return (
                  <button
                    key={index}
                    onClick={() => checkAnswer(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full rounded-lg border p-3 text-left transition-colors ${
                      isSelected
                        ? isCorrect
                          ? "border-green-200 bg-green-50"
                          : "border-red-200 bg-red-50"
                        : "border-amber-100 bg-white hover:bg-amber-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={isSelected && isCorrect ? "font-medium text-green-700" : "text-amber-900"}>
                        {option}
                      </span>

                      {isSelected &&
                        (isCorrect ? (
                          <Check className="h-5 w-5 text-green-600" />
                        ) : (
                          <span className="text-red-500">✕</span>
                        ))}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={nextSegment}
            disabled={hasQuestion && !isSegmentCompleted}
            className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium ${
              hasQuestion && !isSegmentCompleted
                ? "bg-amber-100 text-amber-400 cursor-not-allowed"
                : "bg-amber-500 text-white hover:bg-amber-600"
            }`}
          >
            {isLastSegment ? "Complete Story" : "Next"}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

