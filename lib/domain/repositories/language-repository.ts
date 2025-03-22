import type { Language } from "../models/language"

export interface LanguageRepository {
  getAll(): Promise<Language[]>
  getById(id: string): Promise<Language | null>
  getByRegion(region: string): Promise<Language[]>
  search(query: string): Promise<Language[]>
}

