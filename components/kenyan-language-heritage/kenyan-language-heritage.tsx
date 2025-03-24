"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { LanguageFamilyTree } from "./language-family-tree"
import { CulturalContextTimeline } from "./cultural-context-timeline"
import { RegionalDialectsLibrary } from "./regional-dialects-library"
import { LanguageEndangermentTracker } from "./language-endangerment-tracker"
import { CulturalSignificanceModules } from "./cultural-significance-modules"

interface KenyanLanguageHeritageProps {
  className?: string
}

export function KenyanLanguageHeritage({ className = "" }: KenyanLanguageHeritageProps) {
  const [activeFeature, setActiveFeature] = useState<string | null>(null)

  // Function to handle feature selection
  const handleFeatureSelect = (feature: string) => {
    setActiveFeature(activeFeature === feature ? null : feature)
  }

  return (
    <motion.div
      className={`mt-8 mb-8 rounded-xl border border-amber-100 bg-white p-6 shadow-sm dark:border-amber-900/30 dark:bg-card ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="mb-4 font-serif text-xl text-amber-950 dark:text-amber-100">Kenyan Language Heritage</h2>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="families">Language Families</TabsTrigger>
          <TabsTrigger value="timeline">Historical Timeline</TabsTrigger>
          <TabsTrigger value="dialects">Regional Dialects</TabsTrigger>
          <TabsTrigger value="preservation">Preservation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-3">
          <p className="text-sm text-amber-700 dark:text-amber-300">
            Kenya is home to over 40 indigenous languages, reflecting the country's rich ethnic diversity. These
            languages belong to three African language families: Niger-Congo (Bantu), Nilo-Saharan, and Afro-Asiatic,
            each with unique linguistic features and cultural significance.
          </p>
          <p className="text-sm text-amber-700 dark:text-amber-300">
            From the melodic tones of Luo to the rhythmic patterns of Kikuyu, each language carries centuries of oral
            traditions, proverbs, and cultural wisdom passed down through generations.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Language Family Tree"
              description="Explore the relationships between Kenyan languages and their origins"
              isActive={activeFeature === "tree"}
              onClick={() => handleFeatureSelect("tree")}
            />
            <FeatureCard
              title="Cultural Timeline"
              description="Discover how historical events shaped language development"
              isActive={activeFeature === "timeline"}
              onClick={() => handleFeatureSelect("timeline")}
            />
            <FeatureCard
              title="Regional Dialects"
              description="Listen to and compare different regional pronunciations"
              isActive={activeFeature === "dialects"}
              onClick={() => handleFeatureSelect("dialects")}
            />
            <FeatureCard
              title="Endangerment Status"
              description="Learn about language preservation efforts and challenges"
              isActive={activeFeature === "endangerment"}
              onClick={() => handleFeatureSelect("endangerment")}
            />
            <FeatureCard
              title="Cultural Significance"
              description="Understand the unique cultural concepts embedded in languages"
              isActive={activeFeature === "cultural"}
              onClick={() => handleFeatureSelect("cultural")}
            />
          </div>

          {activeFeature === "tree" && <LanguageFamilyTree />}
          {activeFeature === "timeline" && <CulturalContextTimeline />}
          {activeFeature === "dialects" && <RegionalDialectsLibrary />}
          {activeFeature === "endangerment" && <LanguageEndangermentTracker />}
          {activeFeature === "cultural" && <CulturalSignificanceModules />}
        </TabsContent>

        <TabsContent value="families" className="space-y-3">
          <LanguageFamilyTree />
        </TabsContent>

        <TabsContent value="timeline" className="space-y-3">
          <CulturalContextTimeline />
        </TabsContent>

        <TabsContent value="dialects" className="space-y-3">
          <RegionalDialectsLibrary />
        </TabsContent>

        <TabsContent value="preservation" className="space-y-3">
          <LanguageEndangermentTracker />
          <div className="mt-6">
            <CulturalSignificanceModules />
          </div>
        </TabsContent>
      </Tabs>

      <Link
        href="/about-languages"
        className="mt-4 inline-flex items-center text-sm font-medium text-amber-700 hover:text-amber-800 transition-colors dark:text-amber-400 dark:hover:text-amber-300"
      >
        Learn more about Kenya's linguistic diversity
        <ChevronRight className="ml-1 h-4 w-4" />
      </Link>
    </motion.div>
  )
}

interface FeatureCardProps {
  title: string
  description: string
  isActive: boolean
  onClick: () => void
}

function FeatureCard({ title, description, isActive, onClick }: FeatureCardProps) {
  return (
    <motion.div
      className={`cursor-pointer rounded-lg border p-4 transition-all ${
        isActive
          ? "border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-900/30"
          : "border-amber-100 bg-white hover:border-amber-200 hover:bg-amber-50 dark:border-amber-900/30 dark:bg-card dark:hover:border-amber-800 dark:hover:bg-amber-900/50"
      }`}
      onClick={onClick}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <h3 className="mb-1 font-medium text-amber-900 dark:text-amber-100">{title}</h3>
      <p className="text-xs text-amber-700 dark:text-amber-300">{description}</p>
    </motion.div>
  )
}

