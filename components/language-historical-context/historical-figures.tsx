"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import Image from "next/image"

interface HistoricalFiguresProps {
  languageId: string
  languageName: string
}

export function HistoricalFigures({ languageId, languageName }: HistoricalFiguresProps) {
  const [activeFigure, setActiveFigure] = useState<number | null>(null)

  // This would normally come from your data source based on languageId
  const historicalFiguresData = {
    kikuyu: [
      {
        name: "Stanley Kiama Gathigira",
        period: "1884-1958",
        contribution: "Early Kikuyu Literature and Standardization",
        description:
          "Stanley Kiama Gathigira was one of the first Kikuyu authors to publish in the Kikuyu language. His 1933 book 'Miikarire ya Agikuyu' (The Customs of the Kikuyu) was a pioneering work that documented Kikuyu cultural practices and helped standardize written Kikuyu.",
        impact:
          "His work preserved traditional knowledge during a period of rapid cultural change and provided a foundation for Kikuyu literature and language standardization.",
        image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1000",
      },
      {
        name: "Jomo Kenyatta",
        period: "1897-1978",
        contribution: "Cultural Documentation and Advocacy",
        description:
          "While known primarily as Kenya's first president, Jomo Kenyatta made significant contributions to Kikuyu language preservation. His 1938 anthropological work 'Facing Mount Kenya' documented Kikuyu cultural practices and language. He advocated for the value of indigenous languages during a time of colonial suppression.",
        impact:
          "Elevated the status of Kikuyu language and culture on the international stage and inspired pride in linguistic heritage among Kikuyu speakers.",
        image: "https://images.unsplash.com/photo-1596005554384-d293674c91d7?q=80&w=1000",
      },
      {
        name: "Gakaara wa Wanjau",
        period: "1921-2001",
        contribution: "Kikuyu Literature and Publishing",
        description:
          "Gakaara wa Wanjau was a prolific author who wrote extensively in Kikuyu. He established Gakaara Book Service, which published numerous works in Kikuyu. During his detention in the colonial era, he wrote 'Mwandiki wa Mau Mau Ithaamirio-ini' (Mau Mau Author in Detention), documenting his experiences in Kikuyu.",
        impact:
          "Created a substantial body of Kikuyu literature, developed modern Kikuyu vocabulary, and demonstrated the language's capacity for expressing complex contemporary ideas.",
        image: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=1000",
      },
      {
        name: "Leakey Family",
        period: "20th Century",
        contribution: "Linguistic Documentation",
        description:
          "Louis Leakey and his family made significant contributions to documenting the Kikuyu language. Louis Leakey's 'First Kikuyu Dictionary' (1939) and 'Kikuyu Grammar' were important early works in Kikuyu linguistics. His son Richard continued this work with further linguistic studies.",
        impact:
          "Provided systematic documentation of Kikuyu grammar and vocabulary, creating resources that continue to be valuable for language learners and researchers.",
        image: "https://images.unsplash.com/photo-1589825743127-e9b6d0b10525?q=80&w=1000",
      },
      {
        name: "Ngũgĩ wa Thiong'o",
        period: "1938-Present",
        contribution: "Literary Excellence and Language Advocacy",
        description:
          "Internationally acclaimed author Ngũgĩ wa Thiong'o made a pivotal decision in the 1970s to write in Kikuyu rather than English. His novels 'Caitaani mũtharaba-Inĩ' (Devil on the Cross) and 'Matigari ma Njiruungi' demonstrated the literary potential of Kikuyu. He has been a vocal advocate for African languages.",
        impact:
          "Elevated Kikuyu to a language of serious literature, challenged colonial linguistic hierarchies, and inspired a generation of writers to value indigenous languages.",
        image: "https://images.unsplash.com/photo-1627394678694-cd1f98b014c0?q=80&w=1000",
      },
    ],
    // Add other languages here
  }

  const figures =
    historicalFiguresData[languageId as keyof typeof historicalFiguresData] || historicalFiguresData.kikuyu

  return (
    <div className="rounded-xl border border-amber-100 p-4 dark:border-amber-900/30">
      <h3 className="mb-4 font-serif text-lg text-amber-950 dark:text-amber-100">
        Historical Figures in {languageName} Language Development
      </h3>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {figures.map((figure, index) => (
          <motion.div
            key={index}
            className={`cursor-pointer rounded-lg border p-4 transition-all ${
              activeFigure === index
                ? "border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-900/30"
                : "border-amber-100 bg-white hover:border-amber-200 hover:bg-amber-50 dark:border-amber-900/30 dark:bg-card dark:hover:border-amber-800 dark:hover:bg-amber-900/50"
            }`}
            onClick={() => setActiveFigure(activeFigure === index ? null : index)}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* <div className="relative h-32 w-full overflow-hidden rounded-lg mb-3">
              <Image src={figure.image || "/placeholder.svg"} alt={figure.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-2">
                <p className="text-xs font-medium text-white">{figure.period}</p>
              </div>
            </div> */}
            <h4 className="font-medium text-amber-900 dark:text-amber-100">{figure.name}</h4>
            <p className="text-xs text-amber-700 dark:text-amber-300">{figure.period}</p>
            <p className="text-xs text-amber-700 dark:text-amber-300">{figure.contribution}</p>
           
            {activeFigure === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="mt-3"
              >
                <p className="text-sm text-amber-700 dark:text-amber-300 mb-2">{figure.description}</p>
      

                <div className="rounded-lg bg-amber-50 p-2 text-xs text-amber-700 dark:bg-amber-900/20 dark:text-amber-300">
                  <strong>Impact:</strong> {figure.impact}
                </div>
                <button className="mt-3 flex items-center text-xs font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300">
                  Learn more <ExternalLink className="ml-1 h-3 w-3" />
                </button>

              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 rounded-lg bg-amber-50 p-3 text-sm text-amber-700 dark:bg-amber-900/10 dark:text-amber-300">
        <p>
          These individuals played crucial roles in documenting, preserving, and elevating the {languageName} language
          through different historical periods. Their work spans literature, linguistics, education, and cultural
          advocacy, creating a foundation for modern language preservation efforts.
        </p>
      </div>
    </div>
  )
}

