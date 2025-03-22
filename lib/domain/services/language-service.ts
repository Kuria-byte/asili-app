import type { Language } from "../models/language"
import type { LanguageRepository } from "../repositories/language-repository"

export class LanguageService {
  constructor(private repository: LanguageRepository) {}

  async getAllLanguages(): Promise<Language[]> {
    return this.repository.getAll()
  }

  async getLanguageById(id: string): Promise<Language | null> {
    return this.repository.getById(id)
  }

  async getLanguagesByRegion(region: string): Promise<Language[]> {
    return this.repository.getByRegion(region)
  }

  async searchLanguages(query: string): Promise<Language[]> {
    return this.repository.search(query)
  }

  async getPopularLanguages(limit = 5): Promise<Language[]> {
    const languages = await this.repository.getAll()
    return languages.sort((a, b) => b.speakerCount - a.speakerCount).slice(0, limit)
  }

  async getLanguagesByDifficulty(difficulty: "beginner" | "intermediate" | "advanced"): Promise<Language[]> {
    const languages = await this.repository.getAll()
    return languages.filter((lang) => lang.difficulty === difficulty)
  }
}

