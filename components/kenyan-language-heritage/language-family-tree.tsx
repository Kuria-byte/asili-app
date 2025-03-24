"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ZoomIn, ZoomOut, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function LanguageFamilyTree() {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null)

  const zoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 2))
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 0.6))

  const languageFamilies = [
    {
      id: "niger-congo",
      name: "Niger-Congo (Bantu)",
      color: "#4CAF50",
      languages: [
        { name: "Kikuyu", speakers: "8.5 million", region: "Central Kenya" },
        { name: "Luhya", speakers: "6.8 million", region: "Western Kenya" },
        { name: "Kamba", speakers: "4.7 million", region: "Eastern Kenya" },
        { name: "Gusii", speakers: "2.7 million", region: "Nyanza" },
        { name: "Meru", speakers: "2.2 million", region: "Eastern Kenya" },
        { name: "Swahili", speakers: "15 million", region: "Coastal Kenya" },
      ],
    },
    {
      id: "nilo-saharan",
      name: "Nilo-Saharan",
      color: "#2196F3",
      languages: [
        { name: "Luo", speakers: "4.2 million", region: "Western Kenya" },
        { name: "Turkana", speakers: "1.2 million", region: "Northwestern Kenya" },
        { name: "Maasai", speakers: "1.1 million", region: "Rift Valley" },
        { name: "Samburu", speakers: "0.5 million", region: "Northern Kenya" },
      ],
    },
    {
      id: "afro-asiatic",
      name: "Afro-Asiatic",
      color: "#FF9800",
      languages: [
        { name: "Somali", speakers: "2.8 million", region: "Northeastern Kenya" },
        { name: "Rendille", speakers: "0.1 million", region: "Northern Kenya" },
        { name: "Oromo", speakers: "0.2 million", region: "Eastern Kenya" },
      ],
    },
  ]

  return (
    <div className="mt-6 rounded-xl border border-amber-100 p-4 dark:border-amber-900/30">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-serif text-lg text-amber-950 dark:text-amber-100">Interactive Language Family Tree</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            className="rounded-full bg-amber-100 p-2 text-amber-700 transition-colors hover:bg-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:hover:bg-amber-800"
            aria-label="Zoom out"
          >
            <ZoomOut size={16} />
          </button>
          <button
            onClick={zoomIn}
            className="rounded-full bg-amber-100 p-2 text-amber-700 transition-colors hover:bg-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:hover:bg-amber-800"
            aria-label="Zoom in"
          >
            <ZoomIn size={16} />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-amber-100 bg-amber-50 p-4 dark:border-amber-900/30 dark:bg-amber-900/10">
        <div className="mb-4 text-center text-sm text-amber-700 dark:text-amber-300">
          <p>Click on a language family to explore its languages</p>
        </div>

        <motion.div
          className="relative h-[400px] w-full"
          style={{ scale: zoomLevel }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Central node - Kenya */}
          <div className="absolute left-1/2 top-[50px] -translate-x-1/2 transform">
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold shadow-lg">
                Kenya
              </div>
              <div className="mt-2 h-10 w-0.5 bg-amber-300"></div>
            </div>
          </div>

          {/* Language Family Nodes */}
          <div className="absolute left-1/2 top-[140px] -translate-x-1/2 transform">
            <div className="flex items-center justify-center gap-8">
              {languageFamilies.map((family, index) => {
                const positions = [
                  { left: "-250px", top: "0" },
                  { left: "0", top: "0" },
                  { left: "250px", top: "0" },
                ]

                return (
                  <div
                    key={family.id}
                    className="relative"
                    style={{ left: positions[index].left, top: positions[index].top }}
                  >
                    <motion.div
                      className="flex flex-col items-center"
                      whileHover={{ y: -5 }}
                      onClick={() => setSelectedFamily(selectedFamily === family.id ? null : family.id)}
                    >
                      <div
                        className="h-14 w-14 rounded-full text-white flex items-center justify-center font-bold shadow-md cursor-pointer"
                        style={{ backgroundColor: family.color }}
                      >
                        <span className="text-xs text-center">{family.name.split(" ")[0]}</span>
                      </div>
                      <div className="mt-2 h-10 w-0.5" style={{ backgroundColor: family.color }}></div>
                      <div className="text-center text-xs font-medium text-amber-900 dark:text-amber-100 w-24">
                        {family.name}
                      </div>
                    </motion.div>

                    {/* Language nodes for this family */}
                    {selectedFamily === family.id && (
                      <div className="absolute top-[90px] left-1/2 -translate-x-1/2 transform">
                        <div className="flex flex-wrap justify-center gap-4 w-[300px]">
                          {family.languages.map((language) => (
                            <TooltipProvider key={language.name}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <motion.div
                                    className="flex flex-col items-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <div
                                      className="h-10 w-10 rounded-full text-white flex items-center justify-center text-xs font-bold shadow-sm cursor-pointer"
                                      style={{ backgroundColor: family.color }}
                                    >
                                      {language.name.substring(0, 2)}
                                    </div>
                                    <div className="mt-1 text-center text-[10px] font-medium text-amber-900 dark:text-amber-100 w-16">
                                      {language.name}
                                    </div>
                                  </motion.div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <div className="p-1">
                                    <p className="font-bold">{language.name}</p>
                                    <p className="text-xs">{language.speakers} speakers</p>
                                    <p className="text-xs">{language.region}</p>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-700 dark:bg-amber-900/10 dark:text-amber-300">
        <div className="flex items-start gap-2">
          <Info size={16} className="mt-0.5 flex-shrink-0" />
          <p>
            Kenya's languages belong to three major African language families, each with distinct linguistic features.
            The Niger-Congo family (primarily Bantu languages) is the largest, followed by Nilo-Saharan and
            Afro-Asiatic. These language families reflect ancient migration patterns and cultural exchanges across East
            Africa.
          </p>
        </div>
      </div>
    </div>
  )
}

