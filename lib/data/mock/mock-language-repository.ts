import type { Language } from "@/lib/domain/models/language"
import type { LanguageRepository } from "@/lib/domain/repositories/language-repository"

const mockLanguages: Language[] = [
  {
    id: "1",
    name: "Kikuyu",
    code: "kik",
    region: "Central Kenya",
    isActive: true,
    description:
      "Kikuyu is a Bantu language spoken primarily by the Kikuyu people of Kenya. It is one of the most widely spoken indigenous languages in Kenya.",
    iconUrl: "/images/languages/kikuyu.svg",
    speakerCount: 8000000,
    difficulty: "intermediate",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "2",
    name: "Luo",
    code: "luo",
    region: "Western Kenya",
    isActive: true,
    description:
      "Luo is a Nilotic language spoken by the Luo people of western Kenya and parts of Tanzania and Uganda.",
    iconUrl: "/images/languages/luo.svg",
    speakerCount: 4000000,
    difficulty: "intermediate",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "3",
    name: "Swahili",
    code: "swa",
    region: "Coastal Kenya",
    isActive: true,
    description:
      "Swahili is a Bantu language that serves as a lingua franca of the African Great Lakes region and other parts of East Africa.",
    iconUrl: "/images/languages/swahili.svg",
    speakerCount: 15000000,
    difficulty: "beginner",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "4",
    name: "Kalenjin",
    code: "kln",
    region: "Rift Valley",
    isActive: true,
    description:
      "Kalenjin is a group of related languages spoken by the Kalenjin people of Kenya and parts of eastern Uganda.",
    iconUrl: "/images/languages/kalenjin.svg",
    speakerCount: 5000000,
    difficulty: "advanced",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "5",
    name: "Kamba",
    code: "kam",
    region: "Eastern Kenya",
    isActive: true,
    description: "Kamba is a Bantu language spoken by the Kamba people of Kenya.",
    iconUrl: "/images/languages/kamba.svg",
    speakerCount: 4000000,
    difficulty: "intermediate",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "6",
    name: "Meru",
    code: "mer",
    region: "Eastern Kenya",
    isActive: true,
    description: "Meru is a Bantu language spoken by the Meru people of Kenya.",
    iconUrl: "/images/languages/meru.svg",
    speakerCount: 2000000,
    difficulty: "intermediate",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
]

export class MockLanguageRepository implements LanguageRepository {
  async getAll(): Promise<Language[]> {
    return [...mockLanguages]
  }

  async getById(id: string): Promise<Language | null> {
    return mockLanguages.find((lang) => lang.id === id) || null
  }

  async getByRegion(region: string): Promise<Language[]> {
    return mockLanguages.filter((lang) => lang.region === region)
  }

  async search(query: string): Promise<Language[]> {
    const lowerQuery = query.toLowerCase()
    return mockLanguages.filter(
      (lang) =>
        lang.name.toLowerCase().includes(lowerQuery) ||
        lang.description.toLowerCase().includes(lowerQuery) ||
        lang.region.toLowerCase().includes(lowerQuery),
    )
  }
}

