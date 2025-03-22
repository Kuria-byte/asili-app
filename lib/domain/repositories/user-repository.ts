import type { User } from "../models/user"

export interface UserRepository {
  getById(id: string): Promise<User | null>
  updatePreferences(id: string, preferences: Partial<User>): Promise<User>
  getProgress(id: string): Promise<any> // We'll define a more specific type later
}

