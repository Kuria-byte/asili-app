"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LanguageTimeline } from "./language-timeline"
import { CulturalLinguisticConnections } from "./cultural-linguistic-connections"
import { LanguageFamilyVisualization } from "./language-family-visualization"
import { HistoricalFigures } from "./historical-figures"
import { Clock, BookOpen, GitBranch, Users } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface LanguageHistoricalContextProps {
  languageId: string
  languageName: string
  className?: string
}

export function LanguageHistoricalContext({
  languageId,
  languageName,
  className = "",
}: LanguageHistoricalContextProps) {
  const [activeTab, setActiveTab] = useState("timeline")

  return (
    <motion.div
      className={`mt-8 mb-8 rounded-xl border border-amber-100 bg-white p-3 sm:p-6 shadow-sm dark:border-amber-900/30 dark:bg-card ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="mb-4 font-serif text-xl text-amber-950 dark:text-amber-100">{languageName} Historical Context</h2>

      <Tabs defaultValue="timeline" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-4 sm:grid-cols-4">
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <TabsTrigger value="timeline" className="flex items-center justify-center gap-2 py-3 sm:py-2">
                  <Clock className="h-5 w-5 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Timeline</span>
                </TabsTrigger>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="sm:hidden">
                <p className="text-xs">Historical Timeline</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <TabsTrigger value="cultural" className="flex items-center justify-center gap-2 py-3 sm:py-2">
                  <BookOpen className="h-5 w-5 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Cultural Connections</span>
                </TabsTrigger>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="sm:hidden">
                <p className="text-xs">Cultural Connections</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <TabsTrigger value="family" className="flex items-center justify-center gap-2 py-3 sm:py-2">
                  <GitBranch className="h-5 w-5 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Language Family</span>
                </TabsTrigger>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="sm:hidden">
                <p className="text-xs">Language Family</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <TabsTrigger value="figures" className="flex items-center justify-center gap-2 py-3 sm:py-2">
                  <Users className="h-5 w-5 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Historical Figures</span>
                </TabsTrigger>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="sm:hidden">
                <p className="text-xs">Key Figures</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TabsList>

        <TabsContent value="timeline" className="space-y-3">
          <LanguageTimeline languageId={languageId} languageName={languageName} />
        </TabsContent>

        <TabsContent value="cultural" className="space-y-3">
          <CulturalLinguisticConnections languageId={languageId} languageName={languageName} />
        </TabsContent>

        <TabsContent value="family" className="space-y-3">
          <LanguageFamilyVisualization languageId={languageId} languageName={languageName} />
        </TabsContent>

        <TabsContent value="figures" className="space-y-3">
          <HistoricalFigures languageId={languageId} languageName={languageName} />
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

