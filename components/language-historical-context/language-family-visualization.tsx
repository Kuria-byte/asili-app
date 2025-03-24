"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ZoomIn, ZoomOut, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface LanguageFamilyVisualizationProps {
  languageId: string
  languageName: string
}

export function LanguageFamilyVisualization({ languageId, languageName }: LanguageFamilyVisualizationProps) {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [showRelated, setShowRelated] = useState(true)
  const [viewMode, setViewMode] = useState<"tree" | "radial">("tree")
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth)
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const zoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 2))
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 0.6))

  // This would normally come from your data source based on languageId
  const languageFamilyData = {
    kikuyu: {
      family: "Niger-Congo",
      subFamily: "Bantu",
      branch: "Central Bantu",
      group: "Kikuyu-Kamba",
      color: "#4CAF50",
      relatedLanguages: [
        { name: "Embu", similarity: "High", speakers: "0.5 million", region: "Eastern Kenya", color: "#66BB6A" },
        { name: "Meru", similarity: "High", speakers: "2.2 million", region: "Eastern Kenya", color: "#66BB6A" },
        { name: "Kamba", similarity: "Medium", speakers: "4.7 million", region: "Eastern Kenya", color: "#81C784" },
        { name: "Gikuyu", similarity: "Dialect", speakers: "0.3 million", region: "Central Kenya", color: "#4CAF50" },
      ],
      comparativeFeatures: [
        {
          feature: "Noun Class System",
          description: "Like other Bantu languages, Kikuyu has a complex noun class system with about 17 classes",
          example: "Mũndũ (person) vs. Andũ (people) - showing class prefixes",
        },
        {
          feature: "Agglutinative Structure",
          description:
            "Words are formed by combining multiple morphemes, with each morpheme representing a distinct meaning",
          example: "Nĩngũthooma - 'I will read it' (combines subject, tense, object, and verb)",
        },
        {
          feature: "Tonal Patterns",
          description: "Kikuyu uses tones to distinguish meaning between otherwise identical words",
          example: "Màrĩà (to eat) vs. Mãrĩà (to forget)",
        },
      ],
      migrationInfo:
        "The Kikuyu people are believed to have migrated from West Africa along with other Bantu-speaking peoples, settling in the fertile highlands of Central Kenya around the 16th century. This migration pattern is reflected in linguistic similarities with other Bantu languages across East Africa.",
    },
    // Add other languages here
  }

  const familyData = languageFamilyData[languageId as keyof typeof languageFamilyData] || languageFamilyData.kikuyu

  // Calculate positions for the radial view
  const calculateRadialPosition = (index: number, total: number, radius: number) => {
    const angle = (index / total) * 2 * Math.PI
    const x = radius * Math.cos(angle)
    const y = radius * Math.sin(angle)
    return { x, y }
  }

  const handleNodeClick = (nodeName: string) => {
    setSelectedNode(selectedNode === nodeName ? null : nodeName)
  }

  const isSmallScreen = containerWidth < 500

  // Calculate spacing for related languages based on container width
  const getRelatedLanguageSpacing = () => {
    if (containerWidth < 350) return 35
    if (containerWidth < 450) return 45
    if (containerWidth < 600) return 60
    return 80
  }

  const relatedLanguageSpacing = getRelatedLanguageSpacing()

  return (
    <div className="rounded-xl border border-amber-100 p-3 sm:p-4 dark:border-amber-900/30" ref={containerRef}>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-serif text-lg text-amber-950 dark:text-amber-100 mb-2 sm:mb-0">
          {languageName} in the Language Family
        </h3>
        <div className="flex items-center gap-2 justify-between sm:justify-end">
          <div className="flex items-center">
            <button
              onClick={() => setViewMode("tree")}
              className={`rounded-l-lg px-2 py-1 text-xs font-medium ${
                viewMode === "tree"
                  ? "bg-amber-500 text-white"
                  : "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300"
              }`}
            >
              Tree
            </button>
            <button
              onClick={() => setViewMode("radial")}
              className={`rounded-r-lg px-2 py-1 text-xs font-medium ${
                viewMode === "radial"
                  ? "bg-amber-500 text-white"
                  : "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300"
              }`}
            >
              Radial
            </button>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={zoomOut}
              className="rounded-full bg-amber-100 p-1.5 text-amber-700 transition-colors hover:bg-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:hover:bg-amber-800"
              aria-label="Zoom out"
            >
              <ZoomOut size={14} />
            </button>
            <button
              onClick={zoomIn}
              className="rounded-full bg-amber-100 p-1.5 text-amber-700 transition-colors hover:bg-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:hover:bg-amber-800"
              aria-label="Zoom in"
            >
              <ZoomIn size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-amber-100 bg-amber-50 p-2 sm:p-4 dark:border-amber-900/30 dark:bg-amber-900/10">
        <div className="mb-4 text-center text-xs sm:text-sm text-amber-700 dark:text-amber-300">
          <p>
            {languageName} belongs to the <span className="font-medium">{familyData.family}</span> language family,
            <span className="font-medium"> {familyData.subFamily}</span> sub-family
          </p>
        </div>

        <div className="relative h-[350px] sm:h-[400px] w-full overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{
              scale: zoomLevel,
              transformOrigin: viewMode === "tree" ? "top center" : "center center",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {viewMode === "tree" ? (
              // Tree View
              <div className="relative h-full w-full">
                {/* Connection Lines */}
                <svg className="absolute inset-0 h-full w-full" style={{ zIndex: 0 }}>
                  {/* Family to SubFamily */}
                  <line
                    x1="50%"
                    y1="40px"
                    x2="50%"
                    y2="100px"
                    stroke="#E6B422"
                    strokeWidth="2"
                    strokeDasharray={selectedNode === familyData.family ? "none" : "4,4"}
                  />

                  {/* SubFamily to Branch */}
                  <line
                    x1="50%"
                    y1="100px"
                    x2="50%"
                    y2="160px"
                    stroke={familyData.color}
                    strokeWidth="2"
                    strokeDasharray={selectedNode === familyData.subFamily ? "none" : "4,4"}
                  />

                  {/* Branch to Group */}
                  <line
                    x1="50%"
                    y1="160px"
                    x2="50%"
                    y2="220px"
                    stroke={familyData.color}
                    strokeWidth="2"
                    strokeDasharray={selectedNode === familyData.branch ? "none" : "4,4"}
                  />

                  {/* Group to Language */}
                  <line
                    x1="50%"
                    y1="220px"
                    x2="50%"
                    y2="280px"
                    stroke={familyData.color}
                    strokeWidth="2"
                    strokeDasharray={selectedNode === familyData.group ? "none" : "4,4"}
                  />

                  {/* Language to Related Languages */}
                  {showRelated &&
                    familyData.relatedLanguages.map((lang, i) => {
                      const totalLangs = familyData.relatedLanguages.length
                      const spacing = relatedLanguageSpacing
                      // Calculate position to ensure even distribution and centering
                      const totalWidth = (totalLangs - 1) * spacing
                      const startX = 50 - totalWidth / 2 + i * spacing

                      return (
                        <g key={lang.name}>
                          <line
                            x1="50%"
                            y1="310px"
                            x2={`${startX}%`}
                            y2="340px"
                            stroke={lang.color || familyData.color}
                            strokeWidth="2"
                            strokeOpacity={lang.similarity === "High" ? 1 : lang.similarity === "Medium" ? 0.7 : 0.5}
                            strokeDasharray={selectedNode === languageName ? "none" : "4,4"}
                          />
                        </g>
                      )
                    })}
                </svg>

                {/* Language Family Tree Nodes */}
                <div className="absolute left-1/2 top-[10px] -translate-x-1/2 transform">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div
                          className="flex flex-col items-center"
                          whileHover={{ scale: 1.05 }}
                          onClick={() => handleNodeClick(familyData.family)}
                        >
                          <div
                            className={`h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg cursor-pointer ${selectedNode === familyData.family ? "ring-2 ring-amber-300 ring-offset-2" : ""}`}
                          >
                            {familyData.family}
                          </div>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Niger-Congo is one of the world's major language families</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Sub-Family Node */}
                <div className="absolute left-1/2 top-[70px] -translate-x-1/2 transform">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div
                          className="flex flex-col items-center"
                          whileHover={{ scale: 1.05 }}
                          onClick={() => handleNodeClick(familyData.subFamily)}
                        >
                          <div
                            className={`h-10 w-10 sm:h-14 sm:w-14 rounded-full text-white flex items-center justify-center text-xs font-bold shadow-md cursor-pointer ${selectedNode === familyData.subFamily ? "ring-2 ring-amber-300 ring-offset-2" : ""}`}
                            style={{ backgroundColor: familyData.color }}
                          >
                            <span className="text-[10px] sm:text-xs text-center">{familyData.subFamily}</span>
                          </div>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Bantu languages are spoken across central and southern Africa</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Branch Node */}
                <div className="absolute left-1/2 top-[130px] -translate-x-1/2 transform">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div
                          className="flex flex-col items-center"
                          whileHover={{ scale: 1.05 }}
                          onClick={() => handleNodeClick(familyData.branch)}
                        >
                          <div
                            className={`h-9 w-9 sm:h-12 sm:w-12 rounded-full text-white flex items-center justify-center shadow-sm cursor-pointer ${selectedNode === familyData.branch ? "ring-2 ring-amber-300 ring-offset-2" : ""}`}
                            style={{ backgroundColor: familyData.color }}
                          >
                            <span className="text-[8px] sm:text-[10px] text-center leading-tight px-1">
                              {familyData.branch}
                            </span>
                          </div>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Central Bantu languages share specific grammatical features</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Group Node */}
                <div className="absolute left-1/2 top-[190px] -translate-x-1/2 transform">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div
                          className="flex flex-col items-center"
                          whileHover={{ scale: 1.05 }}
                          onClick={() => handleNodeClick(familyData.group)}
                        >
                          <div
                            className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full text-white flex items-center justify-center shadow-sm cursor-pointer ${selectedNode === familyData.group ? "ring-2 ring-amber-300 ring-offset-2" : ""}`}
                            style={{ backgroundColor: familyData.color }}
                          >
                            <span className="text-[7px] sm:text-[9px] text-center leading-tight px-1">
                              {familyData.group}
                            </span>
                          </div>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">
                          The Kikuyu-Kamba group includes closely related languages from central Kenya
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Current Language Node */}
                <div className="absolute left-1/2 top-[250px] -translate-x-1/2 transform">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div
                          className="flex flex-col items-center"
                          whileHover={{ scale: 1.05 }}
                          onClick={() => handleNodeClick(languageName)}
                        >
                          <div
                            className={`h-12 w-12 sm:h-16 sm:w-16 rounded-full text-white flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg border-2 border-white cursor-pointer ${selectedNode === languageName ? "ring-2 ring-amber-300 ring-offset-2" : ""}`}
                            style={{ backgroundColor: familyData.color }}
                          >
                            {languageName}
                          </div>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Kikuyu is spoken by over 8 million people, primarily in central Kenya</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Related Languages */}
                {showRelated && (
                  <div className="absolute top-[310px] left-1/2 transform -translate-x-1/2">
                    <div className="flex justify-center w-full">
                      {familyData.relatedLanguages.map((language, index) => {
                        const totalLangs = familyData.relatedLanguages.length
                        const spacing = relatedLanguageSpacing
                        // Calculate position to ensure even distribution and centering
                        const totalWidth = (totalLangs - 1) * spacing
                        const startX = -totalWidth / 2 + index * spacing

                        return (
                          <TooltipProvider key={language.name}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <motion.div
                                  className="flex flex-col items-center"
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, delay: index * 0.1 }}
                                  whileHover={{ scale: 1.1 }}
                                  style={{
                                    position: "absolute",
                                    left: `${startX}px`,
                                    transform: "translateX(-50%)",
                                  }}
                                >
                                  <div
                                    className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full text-white flex items-center justify-center text-[9px] sm:text-xs font-bold shadow-sm cursor-pointer ${
                                      language.similarity === "High"
                                        ? "border-2 border-white"
                                        : language.similarity === "Dialect"
                                          ? "border-dashed border-2 border-white"
                                          : ""
                                    }`}
                                    style={{
                                      backgroundColor: language.color || familyData.color,
                                      opacity:
                                        language.similarity === "High"
                                          ? 0.9
                                          : language.similarity === "Medium"
                                            ? 0.7
                                            : 0.5,
                                    }}
                                  >
                                    {language.name.substring(0, 2)}
                                  </div>
                                  <div className="mt-1 text-center text-[8px] sm:text-[10px] font-medium text-amber-900 dark:text-amber-100 w-12 sm:w-16 whitespace-nowrap">
                                    {language.name}
                                  </div>
                                </motion.div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="p-1">
                                  <p className="font-bold text-xs">{language.name}</p>
                                  <p className="text-[10px]">Similarity: {language.similarity}</p>
                                  <p className="text-[10px]">{language.speakers} speakers</p>
                                  <p className="text-[10px]">{language.region}</p>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Radial View
              <div className="relative h-full w-full">
                <svg className="absolute inset-0 h-full w-full" style={{ zIndex: 0 }}>
                  {/* Center to Family */}
                  <line x1="50%" y1="50%" x2="50%" y2="25%" stroke="#E6B422" strokeWidth="2" />

                  {/* Center to SubFamily */}
                  <line x1="50%" y1="50%" x2="75%" y2="50%" stroke={familyData.color} strokeWidth="2" />

                  {/* Center to Branch */}
                  <line x1="50%" y1="50%" x2="50%" y2="75%" stroke={familyData.color} strokeWidth="2" />

                  {/* Center to Group */}
                  <line x1="50%" y1="50%" x2="25%" y2="50%" stroke={familyData.color} strokeWidth="2" />

                  {/* Related Languages */}
                  {showRelated &&
                    familyData.relatedLanguages.map((lang, i) => {
                      const { x, y } = calculateRadialPosition(
                        i,
                        familyData.relatedLanguages.length,
                        isSmallScreen ? 80 : 100,
                      )
                      const centerX = 50
                      const centerY = 50
                      const endX = centerX + x / 2
                      const endY = centerY + y / 2

                      return (
                        <line
                          key={lang.name}
                          x1={`${centerX}%`}
                          y1={`${centerY}%`}
                          x2={`${endX}%`}
                          y2={`${endY}%`}
                          stroke={lang.color || familyData.color}
                          strokeWidth="1.5"
                          strokeOpacity={lang.similarity === "High" ? 0.9 : lang.similarity === "Medium" ? 0.7 : 0.5}
                          strokeDasharray="3,3"
                        />
                      )
                    })}
                </svg>

                {/* Center Language Node */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div className="flex flex-col items-center" whileHover={{ scale: 1.05 }}>
                          <div
                            className="h-16 w-16 rounded-full text-white flex items-center justify-center text-sm font-bold shadow-lg border-2 border-white cursor-pointer"
                            style={{ backgroundColor: familyData.color }}
                          >
                            {languageName}
                          </div>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Kikuyu is spoken by over 8 million people, primarily in central Kenya</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Family Node (Top) */}
                <div className="absolute left-1/2 top-[15%] -translate-x-1/2 transform">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div className="flex flex-col items-center" whileHover={{ scale: 1.05 }}>
                          <div className="h-12 w-12 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shadow-lg cursor-pointer">
                            {familyData.family}
                          </div>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Niger-Congo is one of the world's major language families</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* SubFamily Node (Right) */}
                <div className="absolute right-[15%] top-1/2 -translate-y-1/2 transform">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div className="flex flex-col items-center" whileHover={{ scale: 1.05 }}>
                          <div
                            className="h-12 w-12 rounded-full text-white flex items-center justify-center text-xs font-bold shadow-md cursor-pointer"
                            style={{ backgroundColor: familyData.color }}
                          >
                            <span className="text-xs text-center">{familyData.subFamily}</span>
                          </div>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Bantu languages are spoken across central and southern Africa</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Branch Node (Bottom) */}
                <div className="absolute left-1/2 bottom-[15%] -translate-x-1/2 transform">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div className="flex flex-col items-center" whileHover={{ scale: 1.05 }}>
                          <div
                            className="h-12 w-12 rounded-full text-white flex items-center justify-center text-xs font-bold shadow-sm cursor-pointer"
                            style={{ backgroundColor: familyData.color }}
                          >
                            <span className="text-[10px] text-center">{familyData.branch}</span>
                          </div>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Central Bantu languages share specific grammatical features</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Group Node (Left) */}
                <div className="absolute left-[15%] top-1/2 -translate-y-1/2 transform">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div className="flex flex-col items-center" whileHover={{ scale: 1.05 }}>
                          <div
                            className="h-12 w-12 rounded-full text-white flex items-center justify-center text-xs font-bold shadow-sm cursor-pointer"
                            style={{ backgroundColor: familyData.color }}
                          >
                            <span className="text-[10px] text-center">{familyData.group}</span>
                          </div>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">
                          The Kikuyu-Kamba group includes closely related languages from central Kenya
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Related Languages */}
                {showRelated &&
                  familyData.relatedLanguages.map((language, index) => {
                    const { x, y } = calculateRadialPosition(
                      index,
                      familyData.relatedLanguages.length,
                      isSmallScreen ? 80 : 100,
                    )

                    return (
                      <div
                        key={language.name}
                        className="absolute"
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <motion.div
                                className="flex flex-col items-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                whileHover={{ scale: 1.1 }}
                              >
                                <div
                                  className={`h-8 w-8 rounded-full text-white flex items-center justify-center text-[9px] font-bold shadow-sm cursor-pointer ${
                                    language.similarity === "High"
                                      ? "border-2 border-white"
                                      : language.similarity === "Dialect"
                                        ? "border-dashed border-2 border-white"
                                        : ""
                                  }`}
                                  style={{
                                    backgroundColor: language.color || familyData.color,
                                    opacity:
                                      language.similarity === "High"
                                        ? 0.9
                                        : language.similarity === "Medium"
                                          ? 0.7
                                          : 0.5,
                                  }}
                                >
                                  {language.name.substring(0, 2)}
                                </div>
                                <div className="mt-1 text-center text-[8px] font-medium text-amber-900 dark:text-amber-100 w-12">
                                  {language.name}
                                </div>
                              </motion.div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="p-1">
                                <p className="font-bold text-xs">{language.name}</p>
                                <p className="text-[10px]">Similarity: {language.similarity}</p>
                                <p className="text-[10px]">{language.speakers} speakers</p>
                                <p className="text-[10px]">{language.region}</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )
                  })}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedNode && (
          <motion.div
            className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-700 dark:bg-amber-900/10 dark:text-amber-300"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-2">
              <Info size={16} className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">
                  {selectedNode === familyData.family && "Niger-Congo Language Family"}
                  {selectedNode === familyData.subFamily && "Bantu Sub-Family"}
                  {selectedNode === familyData.branch && "Central Bantu Branch"}
                  {selectedNode === familyData.group && "Kikuyu-Kamba Language Group"}
                  {selectedNode === languageName && `${languageName} Language`}
                </p>
                <p className="text-xs mt-1">
                  {selectedNode === familyData.family &&
                    "The Niger-Congo family is one of the world's largest language families, covering much of Sub-Saharan Africa with over 1,500 languages."}
                  {selectedNode === familyData.subFamily &&
                    "Bantu languages are characterized by their noun class systems and are spoken by about 350 million people across central and southern Africa."}
                  {selectedNode === familyData.branch &&
                    "Central Bantu languages share specific grammatical features and vocabulary that distinguish them from other Bantu branches."}
                  {selectedNode === familyData.group &&
                    "The Kikuyu-Kamba group includes several closely related languages spoken in central and eastern Kenya, sharing similar grammatical structures."}
                  {selectedNode === languageName &&
                    `${languageName} is spoken by approximately 8 million people, primarily in Kenya's central highlands. It has several dialects and a rich oral tradition.`}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 space-y-3">
        <h4 className="font-medium text-amber-900 dark:text-amber-100">Comparative Linguistic Features</h4>
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-3 md:grid md:grid-cols-3">
            {familyData.comparativeFeatures.map((feature, index) => (
              <div
                key={index}
                className="rounded-lg border border-amber-100 bg-white p-3 dark:border-amber-900/30 dark:bg-card/50 min-w-[250px] md:min-w-0"
              >
                <p className="font-medium text-amber-950 dark:text-amber-100">{feature.feature}</p>
                <p className="text-sm text-amber-700 dark:text-amber-300">{feature.description}</p>
                <p className="mt-1 text-xs italic text-amber-600 dark:text-amber-400">Example: {feature.example}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-700 dark:bg-amber-900/10 dark:text-amber-300">
        <div className="flex items-start gap-2">
          <Info size={16} className="mt-0.5 flex-shrink-0" />
          <p>
            <strong>Migration Patterns:</strong> {familyData.migrationInfo}
          </p>
        </div>
      </div>

      <button
        onClick={() => setShowRelated(!showRelated)}
        className="mt-4 w-full rounded-lg border border-amber-200 bg-amber-50 py-2 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300 dark:hover:bg-amber-900/30"
      >
        {showRelated ? "Hide Related Languages" : "Show Related Languages"}
      </button>
    </div>
  )
}

