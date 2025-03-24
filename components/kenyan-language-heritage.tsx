import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { ClientOnly } from "@/components/client-only"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heading, Text } from "@/components/ui/typography"

export function KenyanLanguageHeritage() {
  return (
    <motion.div
      className="mt-8 mb-8 rounded-xl border border-amber-100 bg-white p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0 }}
    >
      <Heading level={2} className="mb-4 text-xl">
        Kenyan Language Heritage
      </Heading>

      <ClientOnly>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="culture">Cultural </TabsTrigger>
            <TabsTrigger value="preservation">Preservation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-3">
            <Text size="sm" muted>
              Kenya is home to over 40 indigenous languages, reflecting the country's rich ethnic diversity.
              These languages belong to three African language families: Niger-Congo (Bantu), Nilo-Saharan, and
              Afro-Asiatic, each with unique linguistic features and cultural significance.
            </Text>
            <Text size="sm" muted>
              From the melodic tones of Luo to the rhythmic patterns of Kikuyu, each language carries centuries
              of oral traditions, proverbs, and cultural wisdom passed down through generations.
            </Text>
          </TabsContent>

          <TabsContent value="history" className="space-y-3">
            <Text size="sm" muted>
              Kenya's linguistic landscape has evolved over thousands of years. The Bantu migration around 1000
              BCE brought languages like Kikuyu and Kamba, while Nilotic languages like Luo and Kalenjin arrived
              with pastoralist communities from the north.
            </Text>
            <Text size="sm" muted>
              During the colonial era (1895-1963), English and Swahili gained prominence, but indigenous
              languages remained vital to cultural identity and resistance. Post-independence, efforts to
              preserve these languages have grown alongside recognition of their importance to Kenya's heritage.
            </Text>
          </TabsContent>

          <TabsContent value="culture" className="space-y-3">
            <Text size="sm" muted>
              Kenyan languages are repositories of cultural knowledge, containing unique concepts that often
              have no direct translation in global languages. They encode traditional ecological knowledge,
              social norms, and spiritual beliefs.
            </Text>
            <Text size="sm" muted>
              Each language has developed rich oral traditions including proverbs (methali), riddles
              (vitendawili), and storytelling techniques that reflect the values and worldview of its speakers.
              These traditions continue to influence Kenyan literature, music, and art today.
            </Text>
          </TabsContent>

          <TabsContent value="preservation" className="space-y-3">
            <Text size="sm" muted>
              Many Kenyan languages face challenges from urbanization, globalization, and shifting educational
              priorities. UNESCO classifies several as endangered, with fewer young speakers becoming fluent.
            </Text>
            <Text size="sm" muted>
              Community-led initiatives, digital documentation projects, and educational programs like Asili are
              working to reverse this trend. By learning a Kenyan language, you're directly contributing to its
              preservation and the cultural heritage it represents.
            </Text>
          </TabsContent>
        </Tabs>
      </ClientOnly>

      <Link
        href="/about-languages"
        className="mt-4 inline-flex items-center text-sm font-medium text-amber-700 hover:text-amber-800 transition-colors"
      >
        Learn more about Kenya's linguistic diversity
        <ChevronRight className="ml-1 h-4 w-4" />
      </Link>
    </motion.div>
  )
}
